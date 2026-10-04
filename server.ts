import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { db } from './src/server/db.ts';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === 'production';

// In-memory active session tokens
const sessionTokens = new Map<string, { adminId: string; expiresAt: number }>();
const AUTH_SECRET = process.env.AUTH_SECRET || 'shopkart-secret-session-key-2026';

function generateSessionToken(adminId: string): string {
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
  sessionTokens.set(token, { adminId, expiresAt });
  return token;
}

function verifySessionToken(token?: string): string | null {
  if (!token) return null;
  const session = sessionTokens.get(token);
  if (!session) return null;
  if (Date.now() > session.expiresAt) {
    sessionTokens.delete(token);
    return null;
  }
  return session.adminId;
}

// Authentication middleware
function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;
  const adminId = verifySessionToken(token || undefined);

  if (!adminId) {
    res.status(401).json({ error: 'Unauthorized: valid admin session required' });
    return;
  }
  const admin = db.getAdminById(adminId);
  if (!admin) {
    res.status(401).json({ error: 'Admin user not found' });
    return;
  }
  (req as any).admin = admin;
  next();
}

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ----------------------------------------------------
// AFFILIATE REDIRECT & CLICK TRACKING
// Route: /go/:slug (Internal redirect route with click tracking)
// ----------------------------------------------------
app.get('/go/:slug', (req, res) => {
  const slug = req.params.slug;
  const referrer = req.get('Referer') || 'Direct';
  const ip = req.ip || req.socket.remoteAddress || 'anon';
  const ipHash = crypto.createHash('sha256').update(ip).digest('hex').substring(0, 10);

  const result = db.recordClick(slug, referrer, ipHash);
  if (!result) {
    res.status(404).send('Product not found for affiliate redirect');
    return;
  }

  // HTTP 302 redirect directly to Amazon affiliate link
  res.redirect(302, result.amazonUrl);
});

// JSON API endpoint to track click and get the affiliate URL for async client navigation
app.post('/api/track-click/:slug', (req, res) => {
  const slug = req.params.slug;
  const referrer = req.get('Referer') || 'Storefront';
  const ip = req.ip || req.socket.remoteAddress || 'anon';
  const ipHash = crypto.createHash('sha256').update(ip).digest('hex').substring(0, 10);

  const result = db.recordClick(slug, referrer, ipHash);
  if (!result) {
    res.status(404).json({ error: 'Product not found' });
    return;
  }

  res.json({
    success: true,
    amazonUrl: result.amazonUrl,
    click_count: result.product.click_count,
  });
});

// ----------------------------------------------------
// PUBLIC STOREFRONT APIs
// ----------------------------------------------------

// Site Settings (Public)
app.get('/api/settings', (req, res) => {
  const settings = db.getSettings();
  res.json({
    brand_name: settings.brand_name,
    logo_url: settings.logo_url,
    favicon_url: settings.favicon_url,
    website_description: settings.website_description,
    contact_email: settings.contact_email,
    contact_phone: settings.contact_phone,
    social_links: settings.social_links,
    footer_text: settings.footer_text,
    seo_title: settings.seo_title,
    seo_description: settings.seo_description,
    currency: settings.currency,
  });
});

// Categories (Public - Active only)
app.get('/api/categories', (req, res) => {
  const categories = db.getCategories(true);
  res.json(categories);
});

// Hero Slides (Public - Active only)
app.get('/api/hero-slides', (req, res) => {
  const slides = db.getHeroSlides(true);
  res.json(slides);
});

// Products (Public - Active only with rich electronics filters)
app.get('/api/products', (req, res) => {
  const {
    category,
    brand,
    featured,
    trending,
    bestSeller,
    dealOfTheDay,
    newArrival,
    search,
    minPrice,
    maxPrice,
    ram,
    storage,
    rating,
    sortBy,
  } = req.query;

  const products = db.getProducts({
    status: 'active',
    category: category ? String(category) : undefined,
    brand: brand ? String(brand) : undefined,
    featured: featured !== undefined ? featured === 'true' : undefined,
    trending: trending !== undefined ? trending === 'true' : undefined,
    bestSeller: bestSeller !== undefined ? bestSeller === 'true' : undefined,
    dealOfTheDay: dealOfTheDay !== undefined ? dealOfTheDay === 'true' : undefined,
    newArrival: newArrival !== undefined ? newArrival === 'true' : undefined,
    search: search ? String(search) : undefined,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    ram: ram ? String(ram) : undefined,
    storage: storage ? String(storage) : undefined,
    rating: rating ? Number(rating) : undefined,
    sortBy: sortBy as any,
  });
  res.json(products);
});

// Product Detail by Slug
app.get('/api/products/:slug', (req, res) => {
  const slug = req.params.slug;
  const product = db.getProductBySlug(slug);
  if (!product || product.status !== 'active') {
    res.status(404).json({ error: 'Product not found' });
    return;
  }

  // Get related products from same category or brand
  const related = db
    .getProducts({
      status: 'active',
      category: product.category_id,
    })
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  res.json({ product, related });
});

// Validate Coupon
app.post('/api/coupons/validate', (req, res) => {
  const { code, subtotal } = req.body;
  if (!code) {
    res.status(400).json({ valid: false, message: 'Please enter a coupon code.' });
    return;
  }
  const result = db.validateCoupon(code, Number(subtotal) || 0);
  res.json(result);
});

// Orders (Checkout creation)
app.post('/api/orders', (req, res) => {
  const {
    customer_name,
    customer_email,
    customer_phone,
    shipping_address,
    items,
    subtotal,
    discount,
    delivery_fee,
    grand_total,
    payment_method,
  } = req.body;

  if (!customer_name || !customer_email || !customer_phone || !shipping_address || !items || items.length === 0) {
    res.status(400).json({ error: 'Missing required order fields.' });
    return;
  }

  const estDays = 2 + Math.floor(Math.random() * 2);
  const estDate = new Date(Date.now() + estDays * 24 * 60 * 60 * 1000).toISOString();

  const newOrder = db.createOrder({
    customer_name,
    customer_email,
    customer_phone,
    shipping_address,
    items,
    subtotal: Number(subtotal) || 0,
    discount: Number(discount) || 0,
    delivery_fee: Number(delivery_fee) || 0,
    grand_total: Number(grand_total) || 0,
    payment_method: payment_method || 'upi',
    payment_status: payment_method === 'cod' ? 'pending' : 'paid',
    order_status: 'confirmed',
    estimated_delivery: estDate,
  });

  res.json({ success: true, order: newOrder });
});

// Get Order by Order Number or ID (for tracking & success page)
app.get('/api/orders/:idOrNumber', (req, res) => {
  const order = db.getOrderById(req.params.idOrNumber);
  if (!order) {
    res.status(404).json({ error: 'Order not found' });
    return;
  }
  res.json(order);
});

// List User Orders by Email
app.get('/api/user/orders', (req, res) => {
  const email = req.query.email ? String(req.query.email).trim().toLowerCase() : '';
  const allOrders = db.getOrders();
  if (!email) {
    res.json(allOrders.slice(0, 10));
    return;
  }
  const userOrders = allOrders.filter((o) => o.customer_email.toLowerCase() === email);
  res.json(userOrders);
});

// Contact Submission (Storefront & Marketingwalaa Agency Leads)
app.post('/api/contact', (req, res) => {
  const { name, email, phone, business_name, service, message } = req.body;
  if (!name || !email || !message) {
    res.status(400).json({ error: 'Name, email, and message are required.' });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ error: 'Invalid email address.' });
    return;
  }

  const created = db.createContactMessage({
    name: String(name).trim(),
    email: String(email).trim(),
    phone: phone ? String(phone).trim() : '',
    business_name: business_name ? String(business_name).trim() : undefined,
    service: service ? String(service).trim() : undefined,
    message: String(message).trim(),
  });

  res.json({ success: true, message: 'Thank you! Your inquiry has been received.', data: created });
});

// ----------------------------------------------------
// AUTHENTICATION APIs
// ----------------------------------------------------

// Admin Login
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ error: 'Username and password are required' });
    return;
  }

  const admin = db.getAdminByUsername(String(username));
  if (!admin) {
    res.status(401).json({ error: 'Invalid username or password' });
    return;
  }

  const isMatch = bcrypt.compareSync(String(password), admin.password_hash);
  if (!isMatch) {
    res.status(401).json({ error: 'Invalid username or password' });
    return;
  }

  db.updateAdminLogin(admin.id);
  const token = generateSessionToken(admin.id);

  res.json({
    success: true,
    token,
    user: {
      id: admin.id,
      username: admin.username,
      last_login: admin.last_login,
    },
  });
});

// Admin Verify Session
app.get('/api/auth/verify', requireAdmin, (req, res) => {
  const admin = (req as any).admin;
  res.json({
    authenticated: true,
    user: {
      id: admin.id,
      username: admin.username,
      last_login: admin.last_login,
    },
  });
});

// Admin Change Password / Profile
app.post('/api/auth/change-credentials', requireAdmin, (req, res) => {
  const admin = (req as any).admin;
  const { currentPassword, newUsername, newPassword } = req.body;

  if (!currentPassword) {
    res.status(400).json({ error: 'Current password is required to make changes' });
    return;
  }

  const isMatch = bcrypt.compareSync(String(currentPassword), admin.password_hash);
  if (!isMatch) {
    res.status(401).json({ error: 'Incorrect current password' });
    return;
  }

  let newHash: string | undefined;
  if (newPassword) {
    if (String(newPassword).length < 6) {
      res.status(400).json({ error: 'New password must be at least 6 characters' });
      return;
    }
    newHash = bcrypt.hashSync(String(newPassword), 10);
  }

  const updated = db.updateAdminCredentials(admin.id, newUsername ? String(newUsername).trim() : undefined, newHash);
  if (!updated) {
    res.status(500).json({ error: 'Failed to update credentials' });
    return;
  }

  res.json({ success: true, message: 'Admin credentials successfully updated' });
});

// Admin Logout
app.post('/api/auth/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;
  if (token) {
    sessionTokens.delete(token);
  }
  res.json({ success: true });
});

// ----------------------------------------------------
// PROTECTED ADMIN APIs
// ----------------------------------------------------

// Admin Dashboard Summary
app.get('/api/admin/dashboard-stats', requireAdmin, (req, res) => {
  const analytics = db.getAnalytics();
  const allProducts = db.getProducts({ status: 'all' });
  const activeProducts = allProducts.filter((p) => p.status === 'active');
  const featuredProducts = allProducts.filter((p) => p.featured);
  const categories = db.getCategories(false);
  const messages = db.getContactMessages();
  const unreadMessages = messages.filter((m) => !m.is_read);

  res.json({
    totalProducts: activeProducts.length,
    allProductsCount: allProducts.length,
    featuredCount: featuredProducts.length,
    totalClicks: analytics.totalClicks,
    todayClicks: analytics.todayClicks,
    yesterdayClicks: analytics.yesterdayClicks,
    categoriesCount: categories.length,
    unreadMessagesCount: unreadMessages.length,
    topProducts: analytics.topProducts.slice(0, 5),
    recentClicks: analytics.recentClicks.slice(0, 8),
  });
});

// Products Admin CRUD
app.get('/api/admin/products', requireAdmin, (req, res) => {
  const { category, search, sortBy } = req.query;
  const products = db.getProducts({
    status: 'all',
    category: category ? String(category) : undefined,
    search: search ? String(search) : undefined,
    sortBy: sortBy as any,
  });
  res.json(products);
});

app.post('/api/admin/products', requireAdmin, (req, res) => {
  const {
    name,
    slug,
    image_url,
    additional_images,
    short_description,
    full_description,
    category_id,
    price,
    original_price,
    currency,
    amazon_affiliate_url,
    featured,
    status,
    specs,
  } = req.body;

  if (!name || !category_id || !amazon_affiliate_url) {
    res.status(400).json({ error: 'Name, Category, and Amazon Affiliate URL are required.' });
    return;
  }

  const generatedSlug = (slug || name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  // Check unique slug
  let finalSlug = generatedSlug;
  const existing = db.getProductBySlug(finalSlug);
  if (existing) {
    finalSlug = `${generatedSlug}-${Date.now().toString().slice(-4)}`;
  }

  const newProd = db.createProduct({
    ...req.body,
    name: String(name).trim(),
    slug: finalSlug,
    brand: req.body.brand ? String(req.body.brand).trim() : 'ElectroPulse',
    subcategory: req.body.subcategory ? String(req.body.subcategory).trim() : undefined,
    category_id: String(category_id),
    image_url: image_url || '',
    additional_images: Array.isArray(additional_images) ? additional_images : [],
    short_description: short_description ? String(short_description).trim() : '',
    full_description: full_description ? String(full_description).trim() : '',
    price: Number(price) || 0,
    original_price: original_price !== undefined && original_price !== '' ? Number(original_price) : undefined,
    currency: currency || db.getSettings().currency || '₹',
    affiliate_url: String(amazon_affiliate_url || req.body.affiliate_url || '').trim(),
    amazon_affiliate_url: String(amazon_affiliate_url || req.body.affiliate_url || '').trim(),
    featured: Boolean(featured),
    status: status === 'inactive' ? 'inactive' : 'active',
    rating: Number(req.body.rating) || 5.0,
    reviews_count: Number(req.body.reviews_count) || 1,
    stock_status: req.body.stock_status || 'in_stock',
    stock_quantity: req.body.stock_quantity ? Number(req.body.stock_quantity) : 45,
    emi_starts_at: req.body.emi_starts_at ? Number(req.body.emi_starts_at) : undefined,
    has_3d_model: req.body.has_3d_model !== undefined ? Boolean(req.body.has_3d_model) : true,
    model_3d_type: req.body.model_3d_type || 'smartphone',
    color_options: Array.isArray(req.body.color_options) ? req.body.color_options : [],
    ram_options: Array.isArray(req.body.ram_options) ? req.body.ram_options : [],
    storage_options: Array.isArray(req.body.storage_options) ? req.body.storage_options : [],
    offers: Array.isArray(req.body.offers) ? req.body.offers : [],
    warranty_info: req.body.warranty_info ? String(req.body.warranty_info).trim() : '1 Year Official Brand Warranty',
    delivery_info: req.body.delivery_info ? String(req.body.delivery_info).trim() : 'Express Delivery by Tomorrow 10:00 AM',
    specs: specs || {},
  });

  res.json(newProd);
});

app.put('/api/admin/products/:id', requireAdmin, (req, res) => {
  const id = req.params.id;
  const updated = db.updateProduct(id, req.body);
  if (!updated) {
    res.status(404).json({ error: 'Product not found' });
    return;
  }
  res.json(updated);
});

app.delete('/api/admin/products/:id', requireAdmin, (req, res) => {
  const id = req.params.id;
  const deleted = db.deleteProduct(id);
  if (!deleted) {
    res.status(404).json({ error: 'Product not found' });
    return;
  }
  res.json({ success: true });
});

app.post('/api/admin/products/:id/duplicate', requireAdmin, (req, res) => {
  const id = req.params.id;
  const duplicated = db.duplicateProduct(id);
  if (!duplicated) {
    res.status(404).json({ error: 'Product not found to duplicate' });
    return;
  }
  res.json(duplicated);
});

app.patch('/api/admin/products/:id/status', requireAdmin, (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  if (status !== 'active' && status !== 'inactive') {
    res.status(400).json({ error: 'Status must be active or inactive' });
    return;
  }
  const updated = db.updateProduct(id, { status });
  if (!updated) {
    res.status(404).json({ error: 'Product not found' });
    return;
  }
  res.json(updated);
});

// Categories Admin CRUD
app.get('/api/admin/categories', requireAdmin, (req, res) => {
  res.json(db.getCategories(false));
});

app.post('/api/admin/categories', requireAdmin, (req, res) => {
  const { name, slug, image_url, description, status } = req.body;
  if (!name) {
    res.status(400).json({ error: 'Category name is required' });
    return;
  }

  const generatedSlug = (slug || name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  const newCat = db.createCategory({
    name: String(name).trim(),
    slug: generatedSlug,
    image_url: image_url || '',
    description: description ? String(description).trim() : '',
    status: status === 'inactive' ? 'inactive' : 'active',
  });
  res.json(newCat);
});

app.put('/api/admin/categories/:id', requireAdmin, (req, res) => {
  const id = req.params.id;
  const updated = db.updateCategory(id, req.body);
  if (!updated) {
    res.status(404).json({ error: 'Category not found' });
    return;
  }
  res.json(updated);
});

app.delete('/api/admin/categories/:id', requireAdmin, (req, res) => {
  const id = req.params.id;
  const result = db.deleteCategory(id);
  if (!result.success) {
    res.status(400).json({ error: result.error });
    return;
  }
  res.json({ success: true });
});

// Hero Slides Admin CRUD
app.get('/api/admin/hero-slides', requireAdmin, (req, res) => {
  res.json(db.getHeroSlides(false));
});

app.post('/api/admin/hero-slides', requireAdmin, (req, res) => {
  const { title, description, image_url, cta_text, cta_url, display_order, status } = req.body;
  if (!title) {
    res.status(400).json({ error: 'Slide title is required' });
    return;
  }
  const newSlide = db.createHeroSlide({
    title: String(title).trim(),
    description: description ? String(description).trim() : '',
    image_url: image_url || '',
    cta_text: cta_text || 'Shop Now',
    cta_url: cta_url || '/shop',
    display_order: display_order ? Number(display_order) : 1,
    status: status === 'inactive' ? 'inactive' : 'active',
  });
  res.json(newSlide);
});

app.put('/api/admin/hero-slides/:id', requireAdmin, (req, res) => {
  const id = req.params.id;
  const updated = db.updateHeroSlide(id, req.body);
  if (!updated) {
    res.status(404).json({ error: 'Hero slide not found' });
    return;
  }
  res.json(updated);
});

app.delete('/api/admin/hero-slides/:id', requireAdmin, (req, res) => {
  const id = req.params.id;
  const deleted = db.deleteHeroSlide(id);
  if (!deleted) {
    res.status(404).json({ error: 'Hero slide not found' });
    return;
  }
  res.json({ success: true });
});

// Analytics Admin
app.get('/api/admin/analytics', requireAdmin, (req, res) => {
  const analytics = db.getAnalytics();
  res.json(analytics);
});

// Contact Messages Admin
app.get('/api/admin/messages', requireAdmin, (req, res) => {
  res.json(db.getContactMessages());
});

app.patch('/api/admin/messages/:id/read', requireAdmin, (req, res) => {
  const id = req.params.id;
  const { is_read } = req.body;
  const success = db.markMessageRead(id, Boolean(is_read));
  if (!success) {
    res.status(404).json({ error: 'Message not found' });
    return;
  }
  res.json({ success: true });
});

app.delete('/api/admin/messages/:id', requireAdmin, (req, res) => {
  const id = req.params.id;
  const success = db.deleteContactMessage(id);
  if (!success) {
    res.status(404).json({ error: 'Message not found' });
    return;
  }
  res.json({ success: true });
});

// Site Settings Admin
app.get('/api/admin/settings', requireAdmin, (req, res) => {
  res.json(db.getSettings());
});

app.put('/api/admin/settings', requireAdmin, (req, res) => {
  const updated = db.updateSettings(req.body);
  res.json(updated);
});

// Admin Orders Management
app.get('/api/admin/orders', requireAdmin, (req, res) => {
  res.json(db.getOrders());
});

app.patch('/api/admin/orders/:id/status', requireAdmin, (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  const success = db.updateOrderStatus(id, status);
  if (!success) {
    res.status(404).json({ error: 'Order not found' });
    return;
  }
  res.json({ success: true, status });
});

app.delete('/api/admin/orders/:id', requireAdmin, (req, res) => {
  const id = req.params.id;
  const success = db.deleteOrder(id);
  if (!success) {
    res.status(404).json({ error: 'Order not found' });
    return;
  }
  res.json({ success: true });
});

// Admin Customers Management
app.get('/api/admin/customers', requireAdmin, (req, res) => {
  res.json(db.getCustomers());
});

// Admin Inventory Management
app.get('/api/admin/inventory', requireAdmin, (req, res) => {
  res.json(db.getInventory());
});

app.patch('/api/admin/inventory/:id', requireAdmin, (req, res) => {
  const id = req.params.id;
  const { stock_status, stock_quantity } = req.body;
  const success = db.updateInventoryStock(id, stock_status, Number(stock_quantity) || 0);
  if (!success) {
    res.status(404).json({ error: 'Product not found for inventory update' });
    return;
  }
  res.json({ success: true });
});

// Admin Coupons Management
app.get('/api/admin/coupons', requireAdmin, (req, res) => {
  res.json(db.getCoupons());
});

app.post('/api/admin/coupons', requireAdmin, (req, res) => {
  const { code, discount_percentage, max_discount, min_spend, description, active } = req.body;
  if (!code || !discount_percentage) {
    res.status(400).json({ error: 'Coupon code and discount percentage are required' });
    return;
  }
  const coupon = db.createCoupon({
    code: String(code).trim().toUpperCase(),
    discount_percentage: Number(discount_percentage),
    max_discount: Number(max_discount) || 5000,
    min_spend: Number(min_spend) || 0,
    description: description ? String(description).trim() : '',
    active: active !== undefined ? Boolean(active) : true,
  });
  res.json(coupon);
});

app.delete('/api/admin/coupons/:code', requireAdmin, (req, res) => {
  const code = req.params.code;
  const success = db.deleteCoupon(code);
  if (!success) {
    res.status(404).json({ error: 'Coupon not found' });
    return;
  }
  res.json({ success: true });
});

// Admin Promotional Offers Management
app.get('/api/admin/offers', requireAdmin, (req, res) => {
  res.json(db.getOffers());
});

app.post('/api/admin/offers', requireAdmin, (req, res) => {
  const { title, subtitle, discount_badge, code, category_slug, banner_image, status } = req.body;
  if (!title) {
    res.status(400).json({ error: 'Offer title is required' });
    return;
  }
  const offer = db.createOffer({
    id: `off-${Date.now()}`,
    title: String(title).trim(),
    subtitle: subtitle ? String(subtitle).trim() : '',
    discount_badge: discount_badge || 'SPECIAL DEAL',
    code: code ? String(code).trim().toUpperCase() : undefined,
    category_slug: category_slug || 'all',
    banner_image: banner_image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    status: status === 'inactive' ? 'inactive' : 'active',
  });
  res.json(offer);
});

app.delete('/api/admin/offers/:id', requireAdmin, (req, res) => {
  const id = req.params.id;
  const success = db.deleteOffer(id);
  if (!success) {
    res.status(404).json({ error: 'Offer not found' });
    return;
  }
  res.json({ success: true });
});

// Admin Reviews Management
app.get('/api/admin/reviews', requireAdmin, (req, res) => {
  res.json(db.getReviews());
});

app.patch('/api/admin/reviews/:id/approve', requireAdmin, (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  const success = db.approveReview(id, status === 'rejected' ? 'rejected' : 'approved');
  if (!success) {
    res.status(404).json({ error: 'Review not found' });
    return;
  }
  res.json({ success: true });
});

app.delete('/api/admin/reviews/:id', requireAdmin, (req, res) => {
  const id = req.params.id;
  const success = db.deleteReview(id);
  if (!success) {
    res.status(404).json({ error: 'Review not found' });
    return;
  }
  res.json({ success: true });
});

// ----------------------------------------------------
// SEO: SITEMAP & ROBOTS.TXT
// ----------------------------------------------------
app.get('/robots.txt', (req, res) => {
  const settings = db.getSettings();
  const host = req.get('host') || 'localhost:3000';
  const protocol = req.protocol || 'http';
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/*
Disallow: /api/*
Disallow: /go/*

Sitemap: ${protocol}://${host}/sitemap.xml
`);
});

app.get('/sitemap.xml', (req, res) => {
  const host = req.get('host') || 'localhost:3000';
  const protocol = req.protocol || 'http';
  const baseUrl = `${protocol}://${host}`;

  const products = db.getProducts({ status: 'active' });
  const categories = db.getCategories(true);

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/shop</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/categories</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`;

  for (const cat of categories) {
    xml += `
  <url>
    <loc>${baseUrl}/shop?category=${cat.slug}</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`;
  }

  for (const p of products) {
    xml += `
  <url>
    <loc>${baseUrl}/product/${p.slug}</loc>
    <lastmod>${p.updated_at.split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }

  xml += `
</urlset>`;

  res.type('application/xml');
  res.send(xml);
});

// ----------------------------------------------------
// VITE INTEGRATION / STATIC SERVING
// ----------------------------------------------------
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
