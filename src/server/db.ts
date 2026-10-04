import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import {
  AdminUser,
  AffiliateClick,
  Category,
  ContactMessage,
  HeroSlide,
  Product,
  SiteSettings,
  Order,
  Coupon,
  Customer,
  PromotionalOffer,
  AdminReview,
} from '../types/index.ts';

interface DatabaseSchema {
  admins: Array<AdminUser & { password_hash: string }>;
  categories: Category[];
  products: Product[];
  hero_slides: HeroSlide[];
  affiliate_clicks: AffiliateClick[];
  contact_messages: ContactMessage[];
  orders: Order[];
  coupons: Coupon[];
  offers?: PromotionalOffer[];
  reviews?: AdminReview[];
  site_settings: SiteSettings;
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.resolve(DATA_DIR, 'db.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DEFAULT_PASSWORD_HASH = bcrypt.hashSync('password123', 10);

const DEFAULT_SETTINGS: SiteSettings = {
  id: 'site-settings-1',
  brand_name: 'ElectroPulse 3D',
  logo_url: '',
  favicon_url: '',
  website_description:
    'Premier Next-Gen Electronics E-Commerce Platform. Explore cutting-edge 3D interactive showcases of flagship smartphones, gaming laptops, OLED TVs, computing rigs, and studio audio.',
  contact_email: 'support@electropulse.store',
  contact_phone: '+91 6355776735',
  social_links: {
    twitter: 'https://twitter.com/electropulse',
    instagram: 'https://instagram.com/electropulse',
    facebook: 'https://facebook.com/electropulse',
    youtube: 'https://youtube.com/@electropulse',
  },
  footer_text: '© 2026 ElectroPulse Inc. All rights reserved. Precision electronics engineering.',
  seo_title: 'ElectroPulse 3D | Premier Electronics Store & 3D Tech Hub',
  seo_description:
    'Shop smartphones, gaming laptops, 4K OLED TVs, studio headphones, and high-performance monitors with 3D product previews and instant EMI deals.',
  amazon_affiliate_tag: 'electropulse-21',
  currency: '₹',
  updated_at: new Date().toISOString(),
};

const DEFAULT_CATEGORIES: Category[] = [
  {
    id: 'cat-fashion',
    name: 'Fashion',
    slug: 'fashion',
    image_url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    description: "Men's fashion, women's couture, designer footwear, sneakers, luxury watches, and accessories.",
    subcategories: ["Men's Fashion", "Women's Fashion", 'Footwear & Sneakers', 'Watches & Accessories'],
    status: 'active',
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'cat-electronics',
    name: 'Electronics',
    slug: 'electronics',
    image_url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    description: 'Next-gen smartphones, M4 laptops, 4K OLED TVs, studio headphones, and high-performance hardware.',
    subcategories: ['Smartphones', 'Laptops & PCs', 'TV & Audio', 'Monitors & Gaming', 'Accessories'],
    status: 'active',
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'cat-home-kitchen',
    name: 'Home & Kitchen',
    slug: 'home-kitchen',
    image_url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    description: 'Designer cookware, luxury 600TC bedsheets, ambient lighting, kitchen appliances, and storage.',
    subcategories: ['Bedsheets & Curtains', 'Cookware & Dinner Sets', 'Lighting & Clocks', 'Kitchen Organizers'],
    status: 'active',
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'cat-beauty',
    name: 'Beauty & Personal Care',
    slug: 'beauty',
    image_url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    description: 'Luxury French perfumes, dermatological serums, personal grooming trimmers, and organic skincare.',
    subcategories: ['Skincare & Serums', 'Haircare', 'Luxury Perfumes', 'Makeup Kits', 'Men Grooming'],
    status: 'active',
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'cat-books-stationery',
    name: 'Books & Stationery',
    slug: 'books-stationery',
    image_url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
    description: 'Bestseller hardcover novels, Moleskine smart notebooks, art markers, and ergonomic executive backpacks.',
    subcategories: ['Bestseller Books', 'Smart Writing & Notebooks', 'Art Supplies', 'Calculators & Office'],
    status: 'active',
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'cat-sports-fitness',
    name: 'Sports & Fitness',
    slug: 'sports-fitness',
    image_url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    description: 'English willow cricket bats, high-density alignment yoga mats, gym essentials, and performance sportswear.',
    subcategories: ['Cricket & Football', 'Badminton & Tennis', 'Yoga & Cardio', 'Gym Bags & Accessories'],
    status: 'active',
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'cat-toys-kids',
    name: 'Toys & Kids',
    slug: 'toys-kids',
    image_url: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&w=800&q=80',
    description: 'STEM robotics kits, high-speed 4WD RC buggies, educational board games, and premium baby essentials.',
    subcategories: ['STEM & Building Blocks', 'RC Cars & Drones', 'Board Games & Puzzles', 'Baby Care'],
    status: 'active',
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'cat-grocery',
    name: 'Grocery & Gourmet',
    slug: 'grocery',
    image_url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    description: 'Aged basmati rice, cold-pressed oils, artisanal single-origin coffee, California dry fruits, and spices.',
    subcategories: ['Aged Rice & Grains', 'Artisanal Coffee & Tea', 'Dry Fruits & Spices', 'Gourmet Snacks'],
    status: 'active',
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'cat-smartphones',
    name: 'Smartphones',
    slug: 'smartphones',
    image_url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    description: 'Flagship Apple iPhone, Samsung Galaxy, OnePlus, and Google Pixel smartphones with cutting-edge AI chips.',
    subcategories: ['Apple', 'Samsung', 'OnePlus', 'Google', 'Xiaomi', 'Motorola'],
    status: 'active',
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'cat-laptops',
    name: 'Laptops',
    slug: 'laptops',
    image_url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
    description: 'Ultra-thin MacBooks, gaming battlestations, and executive ultrabooks from ASUS, Dell, HP, and Lenovo.',
    subcategories: ['Apple MacBook', 'Dell', 'HP', 'Lenovo', 'ASUS', 'Acer'],
    status: 'active',
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'cat-computers',
    name: 'Desktop Computers',
    slug: 'computers',
    image_url: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&w=800&q=80',
    description: 'Liquid-cooled gaming rigs, all-in-one workspaces, Mac Studio, and precision workstation towers.',
    subcategories: ['Gaming PCs', 'All-in-One', 'Mini PCs', 'Workstations'],
    status: 'active',
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'cat-tvs',
    name: 'TVs & Entertainment',
    slug: 'tvs',
    image_url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80',
    description: 'True-black OLED, Quantum-Dot QLED, Mini-LED, and 4K 144Hz gaming smart televisions.',
    subcategories: ['OLED TV', 'QLED TV', '4K UHD TV', 'Smart TV', 'Soundbars'],
    status: 'active',
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'cat-tablets',
    name: 'Tablets',
    slug: 'tablets',
    image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
    description: 'Apple iPad Pro M4, Samsung Galaxy Tab Ultra, and stylus-powered drawing digital canvases.',
    subcategories: ['iPad', 'Android Tablets', 'Graphics Tablets'],
    status: 'active',
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'cat-monitors',
    name: 'Monitors',
    slug: 'monitors',
    image_url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    description: 'Curved super-ultrawide, 240Hz esports OLED displays, and color-accurate 5K creator monitors.',
    subcategories: ['Gaming Monitors', '4K Monitors', 'Curved Ultrawide', 'Creator Displays'],
    status: 'active',
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'cat-gaming',
    name: 'Gaming Gear',
    slug: 'gaming',
    image_url: 'https://images.unsplash.com/photo-1612287232230-038e8eb426e8?auto=format&fit=crop&w=800&q=80',
    description: 'Mechanical hot-swappable keyboards, lightweight esports mice, VR headsets, and pro gamepads.',
    subcategories: ['Keyboards', 'Mice', 'Controllers', 'Headsets', 'Racing Wheels'],
    status: 'active',
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'cat-audio',
    name: 'Headphones & Audio',
    slug: 'audio',
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    description: 'Studio-grade acoustic monitors, hybrid active noise-cancelling headphones, and audiophile DACs.',
    subcategories: ['ANC Headphones', 'Wireless Earbuds', 'Studio Monitors', 'Microphones'],
    status: 'active',
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'cat-cameras',
    name: 'Cameras & Optics',
    slug: 'cameras',
    image_url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    description: 'Mirrorless full-frame cinema bodies, stabilized 4K action cameras, and prime optical lenses.',
    subcategories: ['Mirrorless', 'Action Cams', 'Vlog Cameras', 'Lenses'],
    status: 'active',
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'cat-accessories',
    name: 'Accessories',
    slug: 'accessories',
    image_url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    description: '140W GaN fast chargers, Thunderbolt 4 docks, MagSafe battery packs, and ergonomic stands.',
    subcategories: ['Chargers & Cables', 'Docks & Hubs', 'Power Banks', 'Cases'],
    status: 'active',
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z',
  },
];

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'prod-iphone-16-pro-max',
    name: 'Apple iPhone 16 Pro Max (Titanium)',
    slug: 'apple-iphone-16-pro-max',
    brand: 'Apple',
    category_id: 'cat-smartphones',
    category_name: 'Smartphones',
    category_slug: 'smartphones',
    subcategory: 'Apple',
    image_url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
    additional_images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=900&q=80',
    ],
    short_description: 'Grade 5 Titanium design with A18 Pro 3nm silicon, Camera Control tactile button, and 48MP Fusion quad-pixel camera system.',
    full_description:
      'iPhone 16 Pro Max introduces a stunning Grade 5 Titanium chassis with thinner borders around the expansive 6.9-inch Super Retina XDR Always-On display. Powered by the groundbreaking A18 Pro processor with 6-core GPU and hardware-accelerated ray tracing for console-grade gaming.\n\nTake total creative control with the dedicated Camera Control button, recording cinematic 4K 120 fps video in Dolby Vision with studio-quality studio mics for Spatial Audio capture.',
    price: 144900,
    original_price: 159900,
    discount_percentage: 9,
    currency: '₹',
    rating: 4.9,
    reviews_count: 342,
    stock_status: 'in_stock',
    stock_quantity: 45,
    emi_starts_at: 6890,
    featured: true,
    is_trending: true,
    is_best_seller: true,
    status: 'active',
    click_count: 890,
    created_at: '2026-01-10T10:00:00.000Z',
    updated_at: '2026-03-28T14:20:00.000Z',
    color_options: ['Natural Titanium', 'Black Titanium', 'White Titanium', 'Desert Titanium'],
    ram_options: ['8GB Unified RAM'],
    storage_options: ['256GB', '512GB', '1TB'],
    specs: {
      processor: 'Apple A18 Pro (3nm, 6-Core CPU + 6-Core GPU + 16-Core Neural Engine)',
      ram: '8GB LPDDR5X',
      storage: '256GB / 512GB / 1TB NVMe',
      display: '6.9" Super Retina XDR OLED Always-On ProMotion 120Hz',
      resolution: '2868 x 1320 pixels at 460 ppi',
      refresh_rate: '120Hz Adaptive ProMotion',
      camera: '48MP Main Fusion + 48MP Ultra-Wide + 12MP 5x Telephoto',
      battery: '4,685 mAh (Up to 33 hours video playback)',
      charging: '45W USB-C Wired + 25W MagSafe Wireless',
      os: 'iOS 18 with Apple Intelligence',
      connectivity: '5G (sub-6 GHz and mmWave), Wi-Fi 7, Bluetooth 5.3',
      dimensions: '163.0 x 77.6 x 8.25 mm',
      weight: '227 grams',
    },
    whats_in_the_box: ['iPhone 16 Pro Max', 'USB-C to USB-C Woven Cable (1m)', 'Documentation'],
    warranty_info: '1 Year Apple International Warranty with optional AppleCare+',
    delivery_info: 'Express Delivery by Tomorrow 10:00 AM (Free Shipping)',
    offers: [
      'Instant ₹5,000 Discount on HDFC & ICICI Credit Cards',
      'No Cost EMI up to 12 Months',
      'Free 3-Month Apple Music & Apple TV+ Subscription',
    ],
  },
  {
    id: 'prod-galaxy-s25-ultra',
    name: 'Samsung Galaxy S25 Ultra 5G AI',
    slug: 'samsung-galaxy-s25-ultra',
    brand: 'Samsung',
    category_id: 'cat-smartphones',
    category_name: 'Smartphones',
    category_slug: 'smartphones',
    subcategory: 'Samsung',
    image_url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&q=80',
    additional_images: [
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=900&q=80',
    ],
    short_description: 'Built-in S Pen stylus, Qualcomm Snapdragon 8 Elite, 200MP Quad-Telephoto camera, and flat anti-reflective Gorilla Armor glass.',
    full_description:
      'Galaxy S25 Ultra represents the pinnacle of Android smartphone innovation. Featuring a reinforced titanium frame, an integrated low-latency S Pen, and an expansive 6.8-inch Dynamic AMOLED 2X display with revolutionary anti-reflective coating.\n\nGalaxy AI supercharges your day with live voice call translation, instant Circle to Search, and generative AI photo editing. Powered by Snapdragon 8 Elite with vapor chamber thermal architecture.',
    price: 129999,
    original_price: 139999,
    discount_percentage: 7,
    currency: '₹',
    rating: 4.8,
    reviews_count: 289,
    stock_status: 'in_stock',
    stock_quantity: 38,
    emi_starts_at: 6199,
    featured: true,
    is_deal_of_the_day: true,
    status: 'active',
    click_count: 740,
    created_at: '2026-01-12T10:00:00.000Z',
    updated_at: '2026-03-29T10:00:00.000Z',
    color_options: ['Titanium Gray', 'Titanium Black', 'Titanium Violet', 'Titanium Yellow'],
    ram_options: ['12GB RAM', '16GB RAM'],
    storage_options: ['256GB', '512GB', '1TB'],
    specs: {
      processor: 'Snapdragon 8 Elite Mobile Platform for Galaxy (4.32GHz Octa-Core)',
      ram: '12GB / 16GB LPDDR5X',
      storage: '256GB / 512GB / 1TB UFS 4.0',
      display: '6.8" Dynamic AMOLED 2X (1-120Hz LTPO) 2600 nits',
      resolution: '3120 x 1440 (Quad HD+)',
      refresh_rate: '120Hz Adaptive',
      camera: '200MP Main + 50MP 5x Periscope + 50MP Ultra-Wide + 10MP 3x Telephoto',
      battery: '5,000 mAh',
      charging: '45W Super Fast Charging 2.0 + 15W Wireless',
      os: 'One UI 7 (Android 15) with 7 Years OS Updates',
      dimensions: '162.3 x 79.0 x 8.6 mm',
      weight: '232 grams',
    },
    whats_in_the_box: ['Samsung Galaxy S25 Ultra', 'S Pen', 'USB-C Cable', 'SIM Ejector'],
    warranty_info: '1 Year Manufacturer Warranty with Samsung Care+',
    delivery_info: 'Standard 2-Day Delivery (Free Shipping)',
    offers: ['Flat ₹7,000 Instant Discount with SBI Credit Cards', 'Exchange Bonus up to ₹10,000'],
  },
  {
    id: 'prod-macbook-pro-16-m4',
    name: 'Apple MacBook Pro 16" (M4 Max Silicon)',
    slug: 'apple-macbook-pro-16-m4-max',
    brand: 'Apple',
    category_id: 'cat-laptops',
    category_name: 'Laptops',
    category_slug: 'laptops',
    subcategory: 'Apple MacBook',
    image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
    additional_images: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=900&q=80',
    ],
    short_description: '16.2" Liquid Retina XDR Nano-Texture Display, M4 Max chip with 16-Core CPU & 40-Core GPU, up to 128GB Unified Memory.',
    full_description:
      'The most powerful pro laptop in Apple history. MacBook Pro 16" with M4 Max delivers monstrous performance for 3D simulation, 8K video timelines, and local LLM fine-tuning. The Liquid Retina XDR screen reaches 1,600 nits peak HDR brightness.\n\nEnjoy up to 24 hours of industry-leading battery life, three Thunderbolt 5 ports with 120Gbps bandwidth, HDMI 2.1, and an integrated high-fidelity 6-speaker sound system with Spatial Audio.',
    price: 349900,
    original_price: 379900,
    discount_percentage: 8,
    currency: '₹',
    rating: 5.0,
    reviews_count: 144,
    stock_status: 'in_stock',
    stock_quantity: 18,
    emi_starts_at: 16650,
    featured: true,
    is_best_seller: true,
    status: 'active',
    click_count: 920,
    created_at: '2026-01-15T10:00:00.000Z',
    updated_at: '2026-03-30T10:00:00.000Z',
    color_options: ['Space Black', 'Silver'],
    ram_options: ['36GB Unified', '48GB Unified', '128GB Unified'],
    storage_options: ['1TB SSD', '2TB SSD', '4TB SSD'],
    specs: {
      processor: 'Apple M4 Max (16-Core CPU, 40-Core GPU, 16-Core Neural Engine)',
      ram: '36GB / 48GB / 128GB Unified Memory (546 GB/s bandwidth)',
      storage: '1TB / 2TB / 4TB Superfast PCIe NVMe SSD',
      display: '16.2" Liquid Retina XDR mini-LED (3456 x 2234) 120Hz ProMotion',
      ports: '3x Thunderbolt 5 (USB-C), HDMI 2.1, SDXC Slot, MagSafe 3',
      battery: '100 Wh Lithium-Polymer (Up to 24 Hours)',
      charging: '140W USB-C Power Adapter (50% in 30 mins)',
      os: 'macOS Sequoia with Apple Intelligence',
      dimensions: '35.57 x 24.81 x 1.68 cm',
      weight: '2.14 kg',
    },
    whats_in_the_box: ['MacBook Pro 16"', '140W USB-C Power Adapter', 'USB-C to MagSafe 3 Cable (2m)'],
    warranty_info: '1 Year Apple Official Limited Warranty',
    delivery_info: 'Free Next-Day Air Shipping with Signature Required',
    offers: ['₹10,000 Instant Card Cashback', 'Free Pro Apps Bundle for Education'],
  },
  {
    id: 'prod-asus-rog-zephyrus-g16',
    name: 'ASUS ROG Zephyrus G16 OLED Gaming Laptop',
    slug: 'asus-rog-zephyrus-g16-oled',
    brand: 'ASUS',
    category_id: 'cat-laptops',
    category_name: 'Laptops',
    category_slug: 'laptops',
    subcategory: 'ASUS',
    image_url: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=900&q=80',
    additional_images: [
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=900&q=80',
    ],
    short_description: 'Intel Core Ultra 9, NVIDIA GeForce RTX 4080 (12GB), 16" 2.5K 240Hz 0.2ms OLED display, CNC aluminum chassis with Slash Lighting.',
    full_description:
      'Sleek, ultra-thin, and devastatingly powerful. The ROG Zephyrus G16 merges an aerospace-grade CNC aluminum chassis with an NVIDIA GeForce RTX 4080 and Intel Core Ultra 9 with dedicated NPU acceleration.\n\nThe world’s first 240Hz OLED gaming display on a 16-inch laptop features 0.2ms response time, 100% DCI-P3 color gamut, and VESA DisplayHDR True Black 500 certification.',
    price: 269990,
    original_price: 299990,
    discount_percentage: 10,
    currency: '₹',
    rating: 4.8,
    reviews_count: 98,
    stock_status: 'in_stock',
    stock_quantity: 12,
    emi_starts_at: 12850,
    featured: true,
    is_trending: true,
    status: 'active',
    click_count: 610,
    created_at: '2026-01-20T10:00:00.000Z',
    updated_at: '2026-03-25T10:00:00.000Z',
    color_options: ['Eclipse Gray', 'Platinum White'],
    ram_options: ['32GB LPDDR5X'],
    storage_options: ['1TB PCIe 4.0 SSD', '2TB PCIe 4.0 SSD'],
    specs: {
      processor: 'Intel Core Ultra 9 185H (16 Cores, 22 Threads, up to 5.1GHz)',
      graphics: 'NVIDIA GeForce RTX 4080 Laptop GPU 12GB GDDR6 (115W TGP)',
      ram: '32GB LPDDR5X-7467 MHz',
      storage: '1TB / 2TB M.2 NVMe PCIe 4.0 SSD',
      display: '16" 2.5K (2560 x 1600) ROG Nebula OLED, 240Hz, 0.2ms, G-SYNC',
      ports: 'Thunderbolt 4, USB-C 3.2 Gen 2, 2x USB-A, HDMI 2.1 FRL, SD Card reader',
      battery: '90 Wh, 4-cell Li-ion (Supports 100W USB-C PD Charging)',
      os: 'Windows 11 Home',
      weight: '1.85 kg',
    },
    whats_in_the_box: ['ROG Zephyrus G16', '240W AC Adapter', 'ROG Sleeve & Gaming Mouse'],
    warranty_info: '2 Years ASUS Onsite Warranty with Accidental Damage Protection',
    delivery_info: 'Dispatched in 24 Hours with insured courier',
    offers: ['3 Months PC Game Pass included', 'Free ROG Backpack'],
  },
  {
    id: 'prod-lg-c4-oled-65',
    name: 'LG 65" 4K Smart OLED evo TV (C4 Series)',
    slug: 'lg-c4-oled-65-inch-tv',
    brand: 'LG',
    category_id: 'cat-tvs',
    category_name: 'TVs & Entertainment',
    category_slug: 'tvs',
    subcategory: 'OLED TV',
    image_url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=900&q=80',
    additional_images: [
      'https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&w=900&q=80',
    ],
    short_description: 'Self-lit OLED pixels with Brightness Booster, α9 AI Processor Gen7, native 144Hz refresh rate, Dolby Vision IQ, and 4x HDMI 2.1.',
    full_description:
      'Experience infinite contrast, absolute 0-nit blacks, and over 8.3 million self-lit OLED pixels with the LG C4 OLED evo TV. The α9 AI Processor Gen7 analyzes video frame by frame to enhance depth and acoustic clarity.\n\nEquipped with 4 full-bandwidth HDMI 2.1 ports running 4K at 144Hz with NVIDIA G-Sync, AMD FreeSync Premium, and VRR for flawless next-gen PS5, Xbox Series X, and PC gaming.',
    price: 184990,
    original_price: 249990,
    discount_percentage: 26,
    currency: '₹',
    rating: 4.9,
    reviews_count: 215,
    stock_status: 'in_stock',
    stock_quantity: 20,
    emi_starts_at: 8800,
    featured: true,
    is_deal_of_the_day: true,
    status: 'active',
    click_count: 530,
    created_at: '2026-01-22T10:00:00.000Z',
    updated_at: '2026-03-27T10:00:00.000Z',
    specs: {
      display: '65" 4K OLED evo Panel (Self-Lit Pixels)',
      resolution: '3840 x 2160 pixels (4K Ultra HD)',
      refresh_rate: '144Hz Native (VRR, G-Sync, FreeSync)',
      processor: 'α9 AI Processor Gen7 with AI Picture Pro & AI Sound Pro',
      hdr: 'Dolby Vision IQ, HDR10, HLG, Filmmaker Mode',
      audio: '40W 2.2 Channel with Dolby Atmos & AI Sound Pro 9.1.2 Virtual',
      ports: '4x HDMI 2.1 (eARC, 48Gbps), 3x USB 2.0, Optical Out, Ethernet',
      os: 'webOS 24 with 5 Years webOS Upgrades Guarantee',
    },
    whats_in_the_box: ['LG 65" C4 OLED TV', 'Magic Remote Control', 'Table Stand & Wall Mount Bracket', 'Power Cable'],
    warranty_info: '3 Years Comprehensive Manufacturer Panel Warranty',
    delivery_info: 'Free Professional Wall Mount Installation within 48 Hours',
    offers: ['Instant ₹12,000 Bank Cashback', 'Free 1-Year OTT Subscription Bundle'],
  },
  {
    id: 'prod-samsung-odyssey-oled-g9',
    name: 'Samsung Odyssey OLED G9 49" Curved Gaming Monitor',
    slug: 'samsung-odyssey-oled-g9',
    brand: 'Samsung',
    category_id: 'cat-monitors',
    category_name: 'Monitors',
    category_slug: 'monitors',
    subcategory: 'Curved Ultrawide',
    image_url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=80',
    additional_images: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80',
    ],
    short_description: 'Dual QHD 5120x1440 32:9 Super Ultrawide, 240Hz refresh rate, 0.03ms response time, Neo Quantum Processor Pro, and CoreSync lighting.',
    full_description:
      'Immerse your entire field of view in glorious 1800R curved OLED imagery equivalent to dual 27-inch QHD monitors side by side without any bezel gap. The Odyssey OLED G9 boasts a staggering 0.03ms GtG response time and buttery 240Hz refresh rate.\n\nCrafted with a premium slim metal frame and rear CoreSync ambient RGB illumination that projects in-game colors onto your room walls.',
    price: 139999,
    original_price: 179999,
    discount_percentage: 22,
    currency: '₹',
    rating: 4.8,
    reviews_count: 87,
    stock_status: 'in_stock',
    stock_quantity: 15,
    emi_starts_at: 6660,
    featured: true,
    is_trending: true,
    status: 'active',
    click_count: 480,
    created_at: '2026-01-25T10:00:00.000Z',
    updated_at: '2026-03-28T10:00:00.000Z',
    specs: {
      display: '49" OLED Curved 1800R (32:9 Aspect Ratio)',
      resolution: 'Dual QHD (5120 x 1440)',
      refresh_rate: '240Hz',
      response_time: '0.03ms (GtG)',
      brightness: '250 cd/m2 (Peak 1000 nits)',
      ports: 'DisplayPort 1.4, HDMI 2.1, Micro HDMI 2.1, USB Hub',
      features: 'AMD FreeSync Premium Pro, VESA DisplayHDR True Black 400',
    },
    whats_in_the_box: ['Odyssey OLED G9 Monitor', 'Height-Adjustable Stand', 'DisplayPort Cable', 'HDMI Cable'],
    warranty_info: '3 Years Samsung Official Warranty with Burn-In Coverage',
    delivery_info: 'Heavy Fragile Express Delivery with Wooden Crate Protection',
    offers: ['Flat 10% Instant Discount on All Credit Cards'],
  },
  {
    id: 'prod-sony-wh1000xm5',
    name: 'Sony WH-1000XM5 Wireless ANC Studio Headphones',
    slug: 'sony-wh-1000xm5-headphones',
    brand: 'Sony',
    category_id: 'cat-audio',
    category_name: 'Headphones & Audio',
    category_slug: 'audio',
    subcategory: 'ANC Headphones',
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
    additional_images: [
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=80',
    ],
    short_description: 'Dual QN1 processors with 8 microphones, 30mm carbon fiber drivers, LDAC Hi-Res Audio wireless, and 30-hour battery life.',
    full_description:
      'The industry gold standard for active noise cancellation. Sony WH-1000XM5 features dual integrated processors managing eight microphones to eliminate mid and high-frequency sounds like street noise and airplanes.\n\nPrecision-engineered 30mm carbon composite drivers deliver breathtaking Hi-Res Audio. Soft-fit leather headband ensures luxurious all-day comfort with multipoint Bluetooth 5.2 pairing.',
    price: 26990,
    original_price: 34990,
    discount_percentage: 23,
    currency: '₹',
    rating: 4.8,
    reviews_count: 512,
    stock_status: 'in_stock',
    stock_quantity: 60,
    emi_starts_at: 1285,
    featured: true,
    is_best_seller: true,
    status: 'active',
    click_count: 670,
    created_at: '2026-01-28T10:00:00.000Z',
    updated_at: '2026-03-29T10:00:00.000Z',
    color_options: ['Midnight Black', 'Silver Platinum', 'Smoky Navy'],
    specs: {
      driver: '30mm Carbon Fiber Composite Dome',
      frequency: '4Hz - 40,000Hz (Hi-Res Audio Certified)',
      anc: 'Dual Processor (HD Noise Cancelling Processor QN1 + V1) with 8 Microphones',
      battery: '30 Hours (ANC On) / 40 Hours (ANC Off)',
      charging: 'USB-PD Fast Charge (3 mins = 3 hours playback)',
      codecs: 'LDAC, AAC, SBC, DSEE Extreme',
      weight: '250 grams',
    },
    whats_in_the_box: ['Sony WH-1000XM5 Headphones', 'Collapsible Carrying Case', 'Audio Cable 1.2m', 'USB-C Cable'],
    warranty_info: '1 Year Sony India Warranty',
    delivery_info: 'Next Day Free Delivery',
    offers: ['Get 6 Months No Cost EMI with Zero Downpayment'],
  },
  {
    id: 'prod-sony-alpha-7-iv',
    name: 'Sony Alpha 7 IV Full-Frame Mirrorless Camera Body',
    slug: 'sony-alpha-7-iv-camera',
    brand: 'Sony',
    category_id: 'cat-cameras',
    category_name: 'Cameras & Optics',
    category_slug: 'cameras',
    subcategory: 'Mirrorless',
    image_url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80',
    additional_images: [
      'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?auto=format&fit=crop&w=900&q=80',
    ],
    short_description: '33MP Exmor R CMOS Sensor, BIONZ XR engine, 4K 60p 10-bit 4:2:2 video, Real-time Eye AF for Humans/Animals/Birds, and 5.5-step 5-axis IBIS.',
    full_description:
      'The definitive hybrid camera for professional photography and cinematic videography. Sony Alpha 7 IV incorporates a 33-megapixel back-illuminated Exmor R sensor paired with BIONZ XR processing.\n\nEnjoy 759 phase-detection AF points with AI Real-time tracking, 4K 60p 10-bit recording with S-Cinetone color profile, breathing compensation, and side-opening vari-angle LCD touchscreen.',
    price: 214990,
    original_price: 242990,
    discount_percentage: 12,
    currency: '₹',
    rating: 4.9,
    reviews_count: 178,
    stock_status: 'in_stock',
    stock_quantity: 14,
    emi_starts_at: 10250,
    featured: true,
    is_new_arrival: true,
    status: 'active',
    click_count: 420,
    created_at: '2026-02-01T10:00:00.000Z',
    updated_at: '2026-03-29T10:00:00.000Z',
    specs: {
      sensor: '33.0 MP 35mm Full-Frame Back-Illuminated Exmor R CMOS',
      processor: 'BIONZ XR Image Processor (8x faster)',
      video: '4K 60p in Super 35 / 4K 30p full sensor readout without pixel binning',
      stabilization: '5-Axis Optical In-Body Image Stabilization (5.5-step advantage)',
      viewfinder: '3.68 million-dot Quad-VGA OLED with 120fps display',
      storage: 'Dual Slots (Slot 1: CFexpress Type A / SD, Slot 2: SD UHS-II)',
      weight: '658 grams (with battery & memory card)',
    },
    whats_in_the_box: ['Sony Alpha 7 IV Body', 'NP-FZ100 Rechargeable Battery', 'Body Cap', 'Shoulder Strap'],
    warranty_info: '2 + 1 Years Extended Sony India Warranty on Registration',
    delivery_info: 'High-Value Fragile Insured Dispatch within 24 Hours',
    offers: ['Free 64GB High-Speed SDXC Card & Camera Bag'],
  },
  {
    id: 'prod-apple-ipad-pro-13-m4',
    name: 'Apple iPad Pro 13" (M4 Ultra Retina XDR OLED)',
    slug: 'apple-ipad-pro-13-m4',
    brand: 'Apple',
    category_id: 'cat-tablets',
    category_name: 'Tablets',
    category_slug: 'tablets',
    subcategory: 'iPad',
    image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=900&q=80',
    additional_images: [
      'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=900&q=80',
    ],
    short_description: 'The thinnest Apple product ever made at 5.1mm. Tandem OLED Ultra Retina XDR display, M4 3nm chip, Apple Pencil Pro support.',
    full_description:
      'Impossibly thin at just 5.1mm yet equipped with jaw-dropping processing capabilities. The all-new 13-inch iPad Pro features a world-first Tandem OLED display combining two OLED panels for 1,000 nits full-screen brightness and 1,600 nits HDR peak.\n\nM4 chip delivers next-level GPU performance with hardware ray tracing, while the repositioned landscape front camera with Center Stage makes video meetings feel natural.',
    price: 129900,
    original_price: 139900,
    discount_percentage: 7,
    currency: '₹',
    rating: 4.9,
    reviews_count: 130,
    stock_status: 'in_stock',
    stock_quantity: 22,
    emi_starts_at: 6190,
    featured: true,
    is_trending: true,
    status: 'active',
    click_count: 590,
    created_at: '2026-02-05T10:00:00.000Z',
    updated_at: '2026-03-30T10:00:00.000Z',
    color_options: ['Space Black', 'Silver'],
    storage_options: ['256GB', '512GB', '1TB', '2TB'],
    specs: {
      processor: 'Apple M4 Chip (9-Core or 10-Core CPU, 10-Core GPU, 16-Core Neural Engine)',
      display: '13" Tandem OLED Ultra Retina XDR (2752 x 2064) ProMotion 120Hz',
      brightness: '1000 nits full screen / 1600 nits peak HDR',
      camera: '12MP Wide back camera with LiDAR scanner + 12MP Landscape Ultra Wide front camera',
      battery: 'Up to 10 hours on Wi-Fi',
      thickness: '5.1 mm',
      weight: '579 grams',
    },
    whats_in_the_box: ['iPad Pro 13"', 'USB-C Charge Cable (1m)', '20W USB-C Power Adapter'],
    warranty_info: '1 Year Apple Official Limited Warranty',
    delivery_info: 'Free Express Doorstep Delivery',
    offers: ['₹4,000 Instant Card Cashback on HDFC & Axis Cards'],
  },
  {
    id: 'prod-oneplus-13-5g',
    name: 'OnePlus 13 5G Flagship (Hasselblad Camera)',
    slug: 'oneplus-13-5g-flagship',
    brand: 'OnePlus',
    category_id: 'cat-smartphones',
    category_name: 'Smartphones',
    category_slug: 'smartphones',
    subcategory: 'OnePlus',
    image_url: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=900&q=80',
    additional_images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80',
    ],
    short_description: 'Snapdragon 8 Elite, 6000mAh Glacier silicon-carbon battery with 100W SUPERVOOC, 2K 120Hz Oriental Screen, IP68/IP69 rating.',
    full_description:
      'The speed powerhouse returns. OnePlus 13 pairs Qualcomm’s Snapdragon 8 Elite with a monstrous 6,000mAh Glacier battery and 100W wired + 50W wireless charging.\n\nTriple 50MP Hasselblad camera system with Sony LYT-808 primary sensor captures natural color depth, while the quad-curved 2K 120Hz display features Glove Touch and Rain Water touch technologies.',
    price: 69999,
    original_price: 79999,
    discount_percentage: 12,
    currency: '₹',
    rating: 4.7,
    reviews_count: 245,
    stock_status: 'in_stock',
    stock_quantity: 40,
    emi_starts_at: 3340,
    featured: true,
    is_deal_of_the_day: true,
    status: 'active',
    click_count: 510,
    created_at: '2026-02-10T10:00:00.000Z',
    updated_at: '2026-03-29T10:00:00.000Z',
    color_options: ['Midnight Ocean (Microfiber Leather)', 'Black Obsidian', 'Arctic White'],
    ram_options: ['12GB RAM', '16GB RAM', '24GB RAM'],
    storage_options: ['256GB', '512GB', '1TB'],
    specs: {
      processor: 'Snapdragon 8 Elite (3nm, up to 4.32GHz)',
      ram: '12GB / 16GB / 24GB LPDDR5X',
      storage: '256GB / 512GB / 1TB UFS 4.0',
      display: '6.82" 2K (3168 x 1440) Oriental Screen LTPO 120Hz, 4500 nits peak',
      camera: '50MP Sony LYT-808 + 50MP 3x Periscope Telephoto + 50MP Ultra-Wide',
      battery: '6,000 mAh Silicon-Carbon Dual Cell',
      charging: '100W SUPERVOOC (1-100% in 36 mins) + 50W AIRVOOC Wireless',
      water_resistance: 'IP68 & IP69 (Hot water jet protection)',
    },
    whats_in_the_box: ['OnePlus 13', '100W SUPERVOOC Power Adapter', 'Type-C Cable', 'Protective Case'],
    warranty_info: '1 Year Manufacturer Warranty with Red Cable Club benefits',
    delivery_info: 'Next Day Free Delivery',
    offers: ['Instant ₹4,000 Discount with ICICI Cards', 'Free OnePlus Buds Pro 2 on pre-order'],
  },
  {
    id: 'prod-nike-cyber-sneakers',
    name: 'Nike Air Cyber Pulse 3D Sneaker',
    slug: 'nike-air-cyber-pulse-3d-sneaker',
    brand: 'Nike',
    category_id: 'cat-fashion',
    category_name: 'Fashion',
    category_slug: 'fashion',
    subcategory: 'Footwear & Sneakers',
    image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    additional_images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=80',
    ],
    short_description: 'Precision engineered running sneaker with responsive Air cushioning, breathable mesh, and high-traction futuristic outsole.',
    full_description: 'Designed for athletes and street style icons, the Nike Air Cyber Pulse features lightweight composite foam and impact-absorbing air pockets.',
    price: 12995,
    original_price: 15995,
    discount_percentage: 19,
    currency: '₹',
    rating: 4.8,
    reviews_count: 512,
    stock_status: 'in_stock',
    stock_quantity: 60,
    emi_starts_at: 1100,
    featured: true,
    is_trending: true,
    is_best_seller: true,
    status: 'active',
    click_count: 940,
    created_at: '2026-01-15T10:00:00.000Z',
    updated_at: '2026-03-29T10:00:00.000Z',
    color_options: ['Cyber Crimson', 'Triple Black', 'Electric Blue'],
    specs: {
      material: 'Engineered Flyknit Mesh + TPU Overlays',
      sole: 'Air Zoom Unit + Carbon Rubber Tread',
      closure: 'Adaptive Speed Lacing',
      weight: '280 grams',
    },
  },
  {
    id: 'prod-italian-leather-jacket',
    name: "Men's Italian Biker Leather Jacket",
    slug: 'mens-italian-biker-leather-jacket',
    brand: 'Armani Exchange',
    category_id: 'cat-fashion',
    category_name: 'Fashion',
    category_slug: 'fashion',
    subcategory: "Men's Fashion",
    image_url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80',
    short_description: 'Handcrafted full-grain Italian lambskin leather jacket with asymmetrical heavy-duty metallic zippers and quilted thermal lining.',
    full_description: 'Pure Italian craftsmanship tailored with precision stitch lines, zippered cuffs, and weather-resistant treated leather.',
    price: 24990,
    original_price: 34990,
    discount_percentage: 28,
    currency: '₹',
    rating: 4.9,
    reviews_count: 180,
    stock_status: 'in_stock',
    stock_quantity: 25,
    emi_starts_at: 2150,
    featured: true,
    status: 'active',
    click_count: 670,
    created_at: '2026-01-20T10:00:00.000Z',
    updated_at: '2026-03-29T10:00:00.000Z',
    color_options: ['Obsidian Black', 'Vintage Cognac'],
  },
  {
    id: 'prod-silk-kurti-set',
    name: "Women's Royal Banarasi Silk Anarkali Set",
    slug: 'womens-royal-banarasi-silk-anarkali-set',
    brand: 'Biba',
    category_id: 'cat-fashion',
    category_name: 'Fashion',
    category_slug: 'fashion',
    subcategory: "Women's Fashion",
    image_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
    short_description: 'Regal Banarasi zari weave Anarkali silhouette with organza dupatta and tailored silk palazzos.',
    full_description: 'Exquisite festive wear featuring woven zari motifs, round neckline with potli button accents, and breathable pure silk blend.',
    price: 8490,
    original_price: 12990,
    discount_percentage: 35,
    currency: '₹',
    rating: 4.7,
    reviews_count: 220,
    stock_status: 'in_stock',
    stock_quantity: 35,
    emi_starts_at: 720,
    status: 'active',
    click_count: 420,
    created_at: '2026-02-01T10:00:00.000Z',
    updated_at: '2026-03-29T10:00:00.000Z',
    color_options: ['Royal Emerald', 'Deep Crimson', 'Cobalt Blue'],
  },
  {
    id: 'prod-nordic-smart-lamp',
    name: 'Nordic Minimalist Smart Ambient Table Lamp',
    slug: 'nordic-minimalist-smart-ambient-table-lamp',
    brand: 'Philips Hue',
    category_id: 'cat-home-kitchen',
    category_name: 'Home & Kitchen',
    category_slug: 'home-kitchen',
    subcategory: 'Lighting & Clocks',
    image_url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80',
    short_description: '16 Million colors, smart app control, circadian rhythm sync, and brushed anodized aluminum architectural stand.',
    full_description: 'Transform your bedroom or executive desk with stepless touch dimming and seamless integration with Alexa, Apple HomeKit, and Google Home.',
    price: 6499,
    original_price: 8999,
    discount_percentage: 27,
    currency: '₹',
    rating: 4.8,
    reviews_count: 310,
    stock_status: 'in_stock',
    stock_quantity: 45,
    emi_starts_at: 550,
    featured: true,
    status: 'active',
    click_count: 530,
    created_at: '2026-01-25T10:00:00.000Z',
    updated_at: '2026-03-29T10:00:00.000Z',
  },
  {
    id: 'prod-triply-cookware-set',
    name: 'Prestige Deluxe 5-Piece Tri-Ply Stainless Steel Cookware Set',
    slug: 'prestige-deluxe-5-piece-tri-ply-stainless-steel-cookware-set',
    brand: 'Prestige',
    category_id: 'cat-home-kitchen',
    category_name: 'Home & Kitchen',
    category_slug: 'home-kitchen',
    subcategory: 'Cookware & Dinner Sets',
    image_url: 'https://images.unsplash.com/photo-1584990347449-399d863f6280?auto=format&fit=crop&w=900&q=80',
    short_description: 'Professional grade 3-layer construction (SS 304 + Aluminum Core + Magnetic SS 430) with tempered glass lids and stay-cool handles.',
    full_description: 'Induction and gas compatible, zero hot-spots, even heat conduction for gourmet frying, simmering, and boiling.',
    price: 11490,
    original_price: 15990,
    discount_percentage: 28,
    currency: '₹',
    rating: 4.7,
    reviews_count: 195,
    stock_status: 'in_stock',
    stock_quantity: 30,
    emi_starts_at: 980,
    status: 'active',
    click_count: 390,
    created_at: '2026-02-05T10:00:00.000Z',
    updated_at: '2026-03-29T10:00:00.000Z',
  },
  {
    id: 'prod-sauvage-elixir',
    name: 'Dior Sauvage Elixir Eau de Parfum (100ml)',
    slug: 'dior-sauvage-elixir-eau-de-parfum-100ml',
    brand: 'Dior',
    category_id: 'cat-beauty',
    category_name: 'Beauty & Personal Care',
    category_slug: 'beauty',
    subcategory: 'Luxury Perfumes',
    image_url: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80',
    short_description: 'An extraordinarily concentrated fragrance steeped in the iconic freshness of Sauvage with an intoxicating heart of spices and rich woods.',
    full_description: 'Notes of Grapefruit, Cinnamon, Nutmeg, Cardamom, AOP Lavender from Nyons, and rich Ambery woods in a midnight-blue lacquered glass vial.',
    price: 16500,
    original_price: 18500,
    discount_percentage: 10,
    currency: '₹',
    rating: 4.9,
    reviews_count: 420,
    stock_status: 'in_stock',
    stock_quantity: 40,
    emi_starts_at: 1400,
    featured: true,
    is_best_seller: true,
    status: 'active',
    click_count: 850,
    created_at: '2026-01-18T10:00:00.000Z',
    updated_at: '2026-03-29T10:00:00.000Z',
  },
  {
    id: 'prod-sonic-trimmer',
    name: 'Philips Series 9000 Prestige Laser Precision Beard Trimmer',
    slug: 'philips-series-9000-prestige-laser-precision-beard-trimmer',
    brand: 'Philips',
    category_id: 'cat-beauty',
    category_name: 'Beauty & Personal Care',
    category_slug: 'beauty',
    subcategory: 'Men Grooming',
    image_url: 'https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=900&q=80',
    short_description: 'Self-sharpening full metal blades with built-in laser guidance for symmetrical, razor-sharp styling lines and 120-min cordless runtime.',
    full_description: 'Waterproof IPX7 rating, LED battery percentage indicator, steel comb attachment with 0.2mm precision step increments.',
    price: 7999,
    original_price: 10999,
    discount_percentage: 27,
    currency: '₹',
    rating: 4.7,
    reviews_count: 280,
    stock_status: 'in_stock',
    stock_quantity: 50,
    emi_starts_at: 680,
    status: 'active',
    click_count: 490,
    created_at: '2026-02-12T10:00:00.000Z',
    updated_at: '2026-03-29T10:00:00.000Z',
  },
  {
    id: 'prod-atomic-habits',
    name: "Atomic Habits: Collector's Deluxe Hardcover Edition",
    slug: 'atomic-habits-collectors-deluxe-hardcover-edition',
    brand: 'Penguin Random House',
    category_id: 'cat-books-stationery',
    category_name: 'Books & Stationery',
    category_slug: 'books-stationery',
    subcategory: 'Bestseller Books',
    image_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=900&q=80',
    short_description: 'The definitive #1 New York Times bestseller by James Clear on an easy and proven way to build good habits and break bad ones.',
    full_description: 'Collector edition with ribbon bookmark, premium acid-free paper, gold foil stamping on spine, and exclusive implementation exercises.',
    price: 999,
    original_price: 1499,
    discount_percentage: 33,
    currency: '₹',
    rating: 4.9,
    reviews_count: 1240,
    stock_status: 'in_stock',
    stock_quantity: 120,
    emi_starts_at: 0,
    is_best_seller: true,
    status: 'active',
    click_count: 1420,
    created_at: '2026-01-10T10:00:00.000Z',
    updated_at: '2026-03-29T10:00:00.000Z',
  },
  {
    id: 'prod-cricket-bat-pro',
    name: 'SS Ton Matrix Pro Grade 1 English Willow Cricket Bat',
    slug: 'ss-ton-matrix-pro-grade-1-english-willow-cricket-bat',
    brand: 'SS Cricket',
    category_id: 'cat-sports-fitness',
    category_name: 'Sports & Fitness',
    category_slug: 'sports-fitness',
    subcategory: 'Cricket & Football',
    image_url: 'https://images.unsplash.com/photo-1531415074868-036b1c57e329?auto=format&fit=crop&w=900&q=80',
    short_description: 'Handcrafted unbleached Grade 1 English Willow with massive 40mm contoured edges, dynamic sweet spot, and Sarawak cane handle.',
    full_description: 'Engineered for maximum power hitting and balanced pickup, protected with factory toe guard and anti-scuff sheet.',
    price: 29990,
    original_price: 36990,
    discount_percentage: 19,
    currency: '₹',
    rating: 4.8,
    reviews_count: 145,
    stock_status: 'in_stock',
    stock_quantity: 20,
    emi_starts_at: 2550,
    featured: true,
    status: 'active',
    click_count: 610,
    created_at: '2026-01-28T10:00:00.000Z',
    updated_at: '2026-03-29T10:00:00.000Z',
  },
  {
    id: 'prod-stem-robot-kit',
    name: 'CyberRobotics 12-in-1 Programmable STEM Building Blocks Kit',
    slug: 'cyberrobotics-12-in-1-programmable-stem-building-blocks-kit',
    brand: 'LEGO & Tech',
    category_id: 'cat-toys-kids',
    category_name: 'Toys & Kids',
    category_slug: 'toys-kids',
    subcategory: 'STEM & Building Blocks',
    image_url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=900&q=80',
    short_description: '949 Building bricks with Bluetooth core module, ultrasonic distance sensor, optical color detector, and drag-and-drop Scratch coding app.',
    full_description: 'Empowers kids and teens to build walking robots, robotic arms, obstacle-avoiding cars, and smart animatronics.',
    price: 18990,
    original_price: 24990,
    discount_percentage: 24,
    currency: '₹',
    rating: 4.9,
    reviews_count: 310,
    stock_status: 'in_stock',
    stock_quantity: 35,
    emi_starts_at: 1600,
    featured: true,
    status: 'active',
    click_count: 730,
    created_at: '2026-02-02T10:00:00.000Z',
    updated_at: '2026-03-29T10:00:00.000Z',
  },
  {
    id: 'prod-daawat-basmati',
    name: 'Daawat Ultima Royal Reserve Aged Basmati Rice (5kg)',
    slug: 'daawat-ultima-royal-reserve-aged-basmati-rice-5kg',
    brand: 'Daawat',
    category_id: 'cat-grocery',
    category_name: 'Grocery & Gourmet',
    category_slug: 'grocery',
    subcategory: 'Aged Rice & Grains',
    image_url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=80',
    short_description: 'Aged for two continuous years to perfection with extra-long slender grains, pearl white luster, and royal aroma.',
    full_description: 'Elongates up to 2.5 times upon cooking, non-sticky grains, ideal for authentic biryani, pulao, and festive feasts.',
    price: 1250,
    original_price: 1550,
    discount_percentage: 19,
    currency: '₹',
    rating: 4.8,
    reviews_count: 850,
    stock_status: 'in_stock',
    stock_quantity: 150,
    emi_starts_at: 0,
    is_best_seller: true,
    status: 'active',
    click_count: 980,
    created_at: '2026-01-12T10:00:00.000Z',
    updated_at: '2026-03-29T10:00:00.000Z',
  },
  {
    id: 'prod-arabica-coffee',
    name: 'Blue Tokai Estate Organic Dark Roast Arabica Beans (1kg)',
    slug: 'blue-tokai-estate-organic-dark-roast-arabica-beans-1kg',
    brand: 'Blue Tokai',
    category_id: 'cat-grocery',
    category_name: 'Grocery & Gourmet',
    category_slug: 'grocery',
    subcategory: 'Artisanal Coffee & Tea',
    image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80',
    short_description: '100% Specialty Arabica beans slow-roasted to bring out rich dark chocolate, roasted almond, and caramel tasting notes.',
    full_description: 'Shade-grown in the high altitudes of Chikmagalur, Karnataka. Nitrogen flushed valve packaging ensures farm-to-cup aroma.',
    price: 1750,
    original_price: 2100,
    discount_percentage: 16,
    currency: '₹',
    rating: 4.9,
    reviews_count: 670,
    stock_status: 'in_stock',
    stock_quantity: 80,
    emi_starts_at: 0,
    status: 'active',
    click_count: 820,
    created_at: '2026-01-22T10:00:00.000Z',
    updated_at: '2026-03-29T10:00:00.000Z',
  },
];

const DEFAULT_COUPONS: Coupon[] = [
  {
    code: 'TECH10',
    discount_percentage: 10,
    max_discount: 3000,
    min_spend: 10000,
    description: 'Instant 10% off up to ₹3,000 on electronic orders above ₹10,000',
    active: true,
  },
  {
    code: 'FLASH500',
    discount_percentage: 5,
    max_discount: 500,
    min_spend: 2000,
    description: 'Flat ₹500 off on any electronics gear',
    active: true,
  },
  {
    code: 'ELECTRO2026',
    discount_percentage: 15,
    max_discount: 5000,
    min_spend: 25000,
    description: 'Mega 15% discount up to ₹5,000 on flagship computers and TVs',
    active: true,
  },
];

const DEFAULT_ORDERS: Order[] = [
  {
    id: 'ord-101',
    order_number: 'EP-2026-8812',
    customer_name: 'Rahul Sharma',
    customer_email: 'rahul.s@example.com',
    customer_phone: '+91 98765 43210',
    shipping_address: {
      street: 'Flat 402, High-Tech Towers, Worli',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400018',
    },
    items: [
      {
        product_id: 'prod-iphone-16-pro-max',
        product_name: 'Apple iPhone 16 Pro Max (Titanium)',
        product_image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=300&q=80',
        quantity: 1,
        price: 144900,
        selected_color: 'Desert Titanium',
        selected_storage: '256GB',
      },
    ],
    subtotal: 144900,
    discount: 3000,
    delivery_fee: 0,
    grand_total: 141900,
    payment_method: 'upi',
    payment_status: 'paid',
    order_status: 'shipped',
    created_at: '2026-03-31T14:20:00.000Z',
    estimated_delivery: '2026-04-03T18:00:00.000Z',
  },
  {
    id: 'ord-102',
    order_number: 'EP-2026-8813',
    customer_name: 'Pooja Verma',
    customer_email: 'pooja.v@example.com',
    customer_phone: '+91 98220 88765',
    shipping_address: {
      street: 'Villa 14, Palm Meadows, Whitefield',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560066',
    },
    items: [
      {
        product_id: 'prod-sony-wh1000xm5',
        product_name: 'Sony WH-1000XM5 Wireless ANC Headphones',
        product_image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80',
        quantity: 1,
        price: 26990,
        selected_color: 'Midnight Black',
      },
    ],
    subtotal: 26990,
    discount: 500,
    delivery_fee: 0,
    grand_total: 26490,
    payment_method: 'card',
    payment_status: 'paid',
    order_status: 'delivered',
    created_at: '2026-03-29T11:15:00.000Z',
    estimated_delivery: '2026-03-31T16:00:00.000Z',
  },
];

const DEFAULT_OFFERS: PromotionalOffer[] = [
  {
    id: 'off-1',
    title: 'Flash Tech Fest 2026',
    subtitle: 'Flat 15% Instant Cashback on All RTX 40-Series Gaming Laptops',
    discount_badge: '15% OFF',
    code: 'NEXTGEN15',
    category_slug: 'gaming',
    banner_image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    status: 'active',
  },
  {
    id: 'off-2',
    title: 'OLED Cinema Showcase',
    subtitle: 'Save up to ₹25,000 on LG & Sony 4K 144Hz OLED TVs + Free Soundbar',
    discount_badge: 'FREE SOUNDBAR',
    code: 'CINEMA2026',
    category_slug: 'tvs',
    banner_image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=1200&q=80',
    status: 'active',
  },
  {
    id: 'off-3',
    title: 'Pro Creator Gear Bonus',
    subtitle: 'Free Studio Headphones + Extended 2-Year AppleCare with MacBook Pro',
    discount_badge: 'FREE APPLECARE',
    code: 'CREATOR2026',
    category_slug: 'laptops',
    banner_image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
    status: 'active',
  },
];

const DEFAULT_REVIEWS: AdminReview[] = [
  {
    id: 'rev-1',
    product_id: 'prod-iphone-16-pro-max',
    product_name: 'Apple iPhone 16 Pro Max (Titanium)',
    customer_name: 'Vikramaditya Roy',
    rating: 5,
    review_text: 'The 5x telephoto and A18 Pro benchmark numbers are astounding. Battery lasts two full days of intensive creator workload.',
    status: 'approved',
    created_at: '2026-03-24T10:14:00.000Z',
  },
  {
    id: 'rev-2',
    product_id: 'prod-rog-scar-18',
    product_name: 'ASUS ROG Strix SCAR 18 (2026)',
    customer_name: 'Devraj Sen',
    rating: 5,
    review_text: 'Desktop-grade power on a laptop. Cyberpunk runs ultra with full Path Tracing above 110fps smoothly.',
    status: 'approved',
    created_at: '2026-03-26T14:32:00.000Z',
  },
  {
    id: 'rev-3',
    product_id: 'prod-sony-wh1000xm5',
    product_name: 'Sony WH-1000XM5 Wireless Headphones',
    customer_name: 'Aanya Sharma',
    rating: 5,
    review_text: 'Best active noise cancellation on the market. Inflight engine rumble disappears completely.',
    status: 'approved',
    created_at: '2026-03-28T09:12:00.000Z',
  },
];

export class Database {
  private data: DatabaseSchema;

  constructor() {
    this.data = this.load();
  }

  private load(): DatabaseSchema {
    if (fs.existsSync(DB_FILE)) {
      try {
        const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(fileContent);
        if (parsed.admins && parsed.categories && parsed.products) {
          // ensure orders and coupons exist
          if (!parsed.orders) parsed.orders = DEFAULT_ORDERS;
          if (!parsed.coupons) parsed.coupons = DEFAULT_COUPONS;
          if (!parsed.offers) parsed.offers = DEFAULT_OFFERS;
          if (!parsed.reviews) parsed.reviews = DEFAULT_REVIEWS;
          // check if universal categories exist (e.g. fashion, grocery)
          if (!parsed.categories.some((c: Category) => c.slug === 'fashion')) {
            parsed.categories = DEFAULT_CATEGORIES;
            const existingIds = new Set(parsed.products.map((p: Product) => p.id));
            for (const dp of DEFAULT_PRODUCTS) {
              if (!existingIds.has(dp.id)) {
                parsed.products.push(dp);
              }
            }
          }
          return parsed;
        }
      } catch (err) {
        console.error('Error reading database file:', err);
      }
    }

    const initial: DatabaseSchema = {
      admins: [
        {
          id: 'admin-1',
          username: 'admin',
          password_hash: DEFAULT_PASSWORD_HASH,
          created_at: '2026-01-01T00:00:00.000Z',
          last_login: new Date().toISOString(),
        },
      ],
      categories: DEFAULT_CATEGORIES,
      products: DEFAULT_PRODUCTS,
      hero_slides: [],
      affiliate_clicks: [],
      contact_messages: [],
      orders: DEFAULT_ORDERS,
      coupons: DEFAULT_COUPONS,
      offers: DEFAULT_OFFERS,
      reviews: DEFAULT_REVIEWS,
      site_settings: DEFAULT_SETTINGS,
    };
    this.saveDirect(initial);
    return initial;
  }

  private saveDirect(dataToSave: DatabaseSchema) {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(dataToSave, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to write database file:', err);
    }
  }

  private persist() {
    this.saveDirect(this.data);
  }

  // Admin
  getAdminByUsername(username: string) {
    return this.data.admins.find((a) => a.username.toLowerCase() === username.toLowerCase());
  }

  getAdminById(id: string) {
    return this.data.admins.find((a) => a.id === id);
  }

  updateAdminLogin(id: string) {
    const admin = this.data.admins.find((a) => a.id === id);
    if (admin) {
      admin.last_login = new Date().toISOString();
      this.persist();
    }
  }

  updateAdminCredentials(id: string, newUsername?: string, newPasswordHash?: string) {
    const admin = this.data.admins.find((a) => a.id === id);
    if (!admin) return false;
    if (newUsername) admin.username = newUsername;
    if (newPasswordHash) admin.password_hash = newPasswordHash;
    this.persist();
    return true;
  }

  // Settings
  getSettings(): SiteSettings {
    return this.data.site_settings;
  }

  updateSettings(settings: Partial<SiteSettings>): SiteSettings {
    this.data.site_settings = {
      ...this.data.site_settings,
      ...settings,
      updated_at: new Date().toISOString(),
    };
    this.persist();
    return this.data.site_settings;
  }

  // Categories
  getCategories(onlyActive = false): Category[] {
    const cats = onlyActive ? this.data.categories.filter((c) => c.status === 'active') : this.data.categories;
    return cats.map((cat) => ({
      ...cat,
      product_count: this.data.products.filter(
        (p) => p.category_id === cat.id && (onlyActive ? p.status === 'active' : true)
      ).length,
    }));
  }

  getCategoryBySlug(slug: string): Category | undefined {
    return this.data.categories.find((c) => c.slug === slug);
  }

  createCategory(category: Omit<Category, 'id' | 'created_at' | 'updated_at'>): Category {
    const id = `cat-${Date.now()}`;
    const newCat: Category = {
      ...category,
      id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.data.categories.push(newCat);
    this.persist();
    return newCat;
  }

  updateCategory(id: string, updates: Partial<Category>): Category | null {
    const index = this.data.categories.findIndex((c) => c.id === id);
    if (index === -1) return null;
    this.data.categories[index] = {
      ...this.data.categories[index],
      ...updates,
      updated_at: new Date().toISOString(),
    };
    this.persist();
    return this.data.categories[index];
  }

  deleteCategory(id: string): { success: boolean; error?: string } {
    const index = this.data.categories.findIndex((c) => c.id === id);
    if (index === -1) return { success: false, error: 'Category not found' };
    const hasProducts = this.data.products.some((p) => p.category_id === id);
    if (hasProducts) {
      return { success: false, error: 'Cannot delete category: products are assigned to it.' };
    }
    this.data.categories.splice(index, 1);
    this.persist();
    return { success: true };
  }

  // Products
  getProducts(options?: {
    category?: string;
    brand?: string;
    featured?: boolean;
    trending?: boolean;
    bestSeller?: boolean;
    dealOfTheDay?: boolean;
    newArrival?: boolean;
    search?: string;
    status?: 'active' | 'inactive' | 'all';
    minPrice?: number;
    maxPrice?: number;
    ram?: string;
    storage?: string;
    rating?: number;
    sortBy?: 'popular' | 'price-asc' | 'price-desc' | 'newest' | 'rating' | 'discount';
  }): Product[] {
    let prods = [...this.data.products];

    const status = options?.status ?? 'active';
    if (status !== 'all') {
      prods = prods.filter((p) => p.status === status);
    }

    if (options?.category && options.category !== 'all') {
      const catSlug = options.category.toLowerCase();
      if (catSlug === 'computing') {
        const computingCatIds = this.data.categories
          .filter((c) => c.slug === 'laptops' || c.slug === 'computers')
          .map((c) => c.id);
        prods = prods.filter((p) => computingCatIds.includes(p.category_id));
      } else if (catSlug === 'tv' || catSlug === 'tvs') {
        const tvCat = this.data.categories.find((c) => c.slug === 'tvs');
        if (tvCat) prods = prods.filter((p) => p.category_id === tvCat.id);
      } else {
        const cat = this.data.categories.find(
          (c) => c.slug.toLowerCase() === catSlug || c.id === options.category
        );
        if (cat) {
          prods = prods.filter((p) => p.category_id === cat.id);
        } else {
          prods = prods.filter(
            (p) =>
              (p.category_slug && p.category_slug.toLowerCase() === catSlug) ||
              (p.subcategory && p.subcategory.toLowerCase().includes(catSlug)) ||
              p.name.toLowerCase().includes(catSlug)
          );
        }
      }
    }

    if (options?.brand && options.brand !== 'all') {
      prods = prods.filter((p) => p.brand ? p.brand.toLowerCase() === options.brand!.toLowerCase() : false);
    }

    if (options?.featured !== undefined) {
      prods = prods.filter((p) => p.featured === options.featured);
    }
    if (options?.trending) {
      prods = prods.filter((p) => p.is_trending);
    }
    if (options?.bestSeller) {
      prods = prods.filter((p) => p.is_best_seller);
    }
    if (options?.dealOfTheDay) {
      prods = prods.filter((p) => p.is_deal_of_the_day);
    }
    if (options?.newArrival) {
      prods = prods.filter((p) => p.is_new_arrival);
    }

    if (options?.minPrice !== undefined) {
      prods = prods.filter((p) => p.price >= options.minPrice!);
    }
    if (options?.maxPrice !== undefined) {
      prods = prods.filter((p) => p.price <= options.maxPrice!);
    }

    if (options?.ram && options.ram !== 'all') {
      prods = prods.filter(
        (p) =>
          p.ram_options?.some((r) => r.toLowerCase().includes(options.ram!.toLowerCase())) ||
          p.specs?.ram?.toLowerCase().includes(options.ram!.toLowerCase())
      );
    }

    if (options?.storage && options.storage !== 'all') {
      prods = prods.filter(
        (p) =>
          p.storage_options?.some((s) => s.toLowerCase().includes(options.storage!.toLowerCase())) ||
          p.specs?.storage?.toLowerCase().includes(options.storage!.toLowerCase())
      );
    }

    if (options?.rating !== undefined && options.rating > 0) {
      prods = prods.filter((p) => p.rating >= options.rating!);
    }

    if (options?.search) {
      const q = options.search.toLowerCase().trim();
      prods = prods.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.brand ? p.brand.toLowerCase().includes(q) : false) ||
          p.short_description.toLowerCase().includes(q) ||
          (p.category_name && p.category_name.toLowerCase().includes(q)) ||
          (p.specs && Object.values(p.specs).some((val) => typeof val === 'string' && val.toLowerCase().includes(q)))
      );
    }

    // Sort
    const sort = options?.sortBy ?? 'popular';
    if (sort === 'popular') {
      prods.sort((a, b) => b.click_count - a.click_count);
    } else if (sort === 'price-asc') {
      prods.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      prods.sort((a, b) => b.price - a.price);
    } else if (sort === 'newest') {
      prods.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else if (sort === 'rating') {
      prods.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'discount') {
      prods.sort((a, b) => (b.discount_percentage ?? 0) - (a.discount_percentage ?? 0));
    }

    return prods;
  }

  getProductBySlug(slug: string): Product | undefined {
    return this.data.products.find((p) => p.slug === slug);
  }

  getProductById(id: string): Product | undefined {
    return this.data.products.find((p) => p.id === id);
  }

  createProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at' | 'click_count'>): Product {
    const id = `prod-${Date.now()}`;
    let discount = product.discount_percentage;
    if (product.price && product.original_price && product.original_price > product.price) {
      discount = Math.round(((product.original_price - product.price) / product.original_price) * 100);
    }

    const cat = this.data.categories.find((c) => c.id === product.category_id);

    const newProd: Product = {
      ...product,
      id,
      discount_percentage: discount,
      category_name: cat ? cat.name : '',
      category_slug: cat ? cat.slug : '',
      click_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.data.products.unshift(newProd);
    this.persist();
    return newProd;
  }

  updateProduct(id: string, updates: Partial<Product>): Product | null {
    const index = this.data.products.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const current = this.data.products[index];
    const category_id = updates.category_id ?? current.category_id;
    const cat = this.data.categories.find((c) => c.id === category_id);

    let price = updates.price !== undefined ? updates.price : current.price;
    let original_price = updates.original_price !== undefined ? updates.original_price : current.original_price;
    let discount = updates.discount_percentage ?? current.discount_percentage;

    if (price && original_price && original_price > price) {
      discount = Math.round(((original_price - price) / original_price) * 100);
    }

    this.data.products[index] = {
      ...current,
      ...updates,
      price,
      original_price,
      discount_percentage: discount,
      category_id,
      category_name: cat ? cat.name : current.category_name,
      category_slug: cat ? cat.slug : current.category_slug,
      updated_at: new Date().toISOString(),
    };
    this.persist();
    return this.data.products[index];
  }

  deleteProduct(id: string): boolean {
    const index = this.data.products.findIndex((p) => p.id === id);
    if (index === -1) return false;
    this.data.products.splice(index, 1);
    this.persist();
    return true;
  }

  duplicateProduct(id: string): Product | null {
    const prod = this.getProductById(id);
    if (!prod) return null;
    const newSlug = `${prod.slug}-copy-${Date.now().toString().slice(-4)}`;
    return this.createProduct({
      ...prod,
      name: `${prod.name} (Copy)`,
      slug: newSlug,
      status: 'inactive',
    });
  }

  // Hero Slides
  getHeroSlides(activeOnly = true): HeroSlide[] {
    if (activeOnly) {
      return this.data.hero_slides.filter((s) => s.status === 'active').sort((a, b) => a.display_order - b.display_order);
    }
    return [...this.data.hero_slides].sort((a, b) => a.display_order - b.display_order);
  }

  createHeroSlide(slide: Omit<HeroSlide, 'id' | 'created_at' | 'updated_at'>): HeroSlide {
    const newSlide: HeroSlide = {
      ...slide,
      id: `slide-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.data.hero_slides.push(newSlide);
    this.persist();
    return newSlide;
  }

  updateHeroSlide(id: string, updates: Partial<HeroSlide>): HeroSlide | null {
    const idx = this.data.hero_slides.findIndex((s) => s.id === id);
    if (idx === -1) return null;
    this.data.hero_slides[idx] = {
      ...this.data.hero_slides[idx],
      ...updates,
      updated_at: new Date().toISOString(),
    };
    this.persist();
    return this.data.hero_slides[idx];
  }

  deleteHeroSlide(id: string): boolean {
    const idx = this.data.hero_slides.findIndex((s) => s.id === id);
    if (idx === -1) return false;
    this.data.hero_slides.splice(idx, 1);
    this.persist();
    return true;
  }

  // Affiliate Clicks
  recordClick(slug: string, referrer?: string, ipHash?: string): { amazonUrl: string; product: Product } | null {
    const product = this.data.products.find((p) => p.slug === slug || p.id === slug);
    if (!product) return null;

    product.click_count = (product.click_count || 0) + 1;

    const click: AffiliateClick = {
      id: `clk-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      product_id: product.id,
      product_name: product.name,
      product_slug: product.slug,
      referrer: referrer || 'Direct',
      ip_hash: ipHash || '',
      clicked_at: new Date().toISOString(),
    };

    this.data.affiliate_clicks.unshift(click);
    this.persist();

    const amazonUrl =
      product.amazon_affiliate_url ||
      product.affiliate_url ||
      `https://amazon.in/dp/example?tag=${this.data.site_settings.amazon_affiliate_tag || 'electropulse-21'}`;

    return { amazonUrl, product };
  }

  getAffiliateClicks(limit = 100): AffiliateClick[] {
    return this.data.affiliate_clicks.slice(0, limit);
  }

  // Orders
  getOrders(): Order[] {
    return this.data.orders;
  }

  getOrderById(idOrNumber: string): Order | undefined {
    return this.data.orders.find(
      (o) => o.id === idOrNumber || o.order_number.toLowerCase() === idOrNumber.toLowerCase()
    );
  }

  createOrder(orderData: Omit<Order, 'id' | 'order_number' | 'created_at'>): Order {
    const id = `ord-${Date.now()}`;
    const order_number = `EP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      ...orderData,
      id,
      order_number,
      created_at: new Date().toISOString(),
    };
    this.data.orders.unshift(newOrder);
    this.persist();
    return newOrder;
  }

  updateOrderStatus(orderId: string, status: Order['order_status']): boolean {
    const order = this.data.orders.find((o) => o.id === orderId);
    if (!order) return false;
    order.order_status = status;
    this.persist();
    return true;
  }

  // Coupons
  getCoupons(): Coupon[] {
    return this.data.coupons;
  }

  validateCoupon(code: string, subtotal: number): { valid: boolean; discount: number; message: string; coupon?: Coupon } {
    const coupon = this.data.coupons.find(
      (c) => c.code.toUpperCase() === code.toUpperCase().trim() && c.active
    );
    if (!coupon) {
      return { valid: false, discount: 0, message: 'Invalid or expired coupon code.' };
    }
    if (subtotal < coupon.min_spend) {
      return {
        valid: false,
        discount: 0,
        message: `Coupon requires minimum spend of ₹${coupon.min_spend.toLocaleString('en-IN')}`,
      };
    }
    const rawDiscount = (subtotal * coupon.discount_percentage) / 100;
    const discount = Math.min(rawDiscount, coupon.max_discount);
    return {
      valid: true,
      discount,
      message: `Coupon ${coupon.code} applied! Saved ₹${discount.toLocaleString('en-IN')}`,
      coupon,
    };
  }

  // Analytics
  getAnalytics() {
    const totalSales = this.data.orders.reduce((sum, o) => sum + o.grand_total, 0);
    const totalOrders = this.data.orders.length;
    const totalCustomers = new Set(this.data.orders.map((o) => o.customer_email)).size + 150;
    const totalClicks = this.data.affiliate_clicks.length;

    const now = new Date();
    const todayStr = now.toISOString().slice(0, 10);
    const yesterday = new Date(Date.now() - 86400000);
    const yesterdayStr = yesterday.toISOString().slice(0, 10);

    const todayClicks = this.data.affiliate_clicks.filter((c) => c.clicked_at.startsWith(todayStr)).length;
    const yesterdayClicks = this.data.affiliate_clicks.filter((c) => c.clicked_at.startsWith(yesterdayStr)).length;

    return {
      totalSales,
      totalOrders,
      totalCustomers,
      totalClicks,
      todayClicks,
      yesterdayClicks,
      recentClicks: this.data.affiliate_clicks.slice(0, 10),
      totalProducts: this.data.products.length,
      recentOrders: this.data.orders.slice(0, 8),
      topProducts: this.data.products.slice(0, 6),
    };
  }

  // Contact
  createContactMessage(msg: Omit<ContactMessage, 'id' | 'is_read' | 'created_at'>): ContactMessage {
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      is_read: false,
      created_at: new Date().toISOString(),
    };
    this.data.contact_messages.unshift(newMsg);
    this.persist();
    return newMsg;
  }

  getContactMessages(): ContactMessage[] {
    return this.data.contact_messages;
  }

  markMessageRead(id: string, is_read: boolean): boolean {
    const msg = this.data.contact_messages.find((m) => m.id === id);
    if (!msg) return false;
    msg.is_read = is_read;
    this.persist();
    return true;
  }

  deleteContactMessage(id: string): boolean {
    const index = this.data.contact_messages.findIndex((m) => m.id === id);
    if (index === -1) return false;
    this.data.contact_messages.splice(index, 1);
    this.persist();
    return true;
  }

  // Admin Order Deletion
  deleteOrder(id: string): boolean {
    const idx = this.data.orders.findIndex((o) => o.id === id);
    if (idx === -1) return false;
    this.data.orders.splice(idx, 1);
    this.persist();
    return true;
  }

  // Admin Customers
  getCustomers(): Customer[] {
    const customerMap = new Map<string, Customer>();

    // Seed base VIP customers
    const defaultCust: Customer[] = [
      {
        id: 'cust-1',
        name: 'Sujal Tambe',
        email: 'sujaltambe91@gmail.com',
        phone: '+91 9876543210',
        city: 'Bangalore',
        state: 'Karnataka',
        total_orders: 4,
        total_spent: 389900,
        last_order_date: '2026-03-29T11:15:00.000Z',
        status: 'vip',
      },
      {
        id: 'cust-2',
        name: 'Priya Sharma',
        email: 'priya.sharma@techcorp.in',
        phone: '+91 9811223344',
        city: 'Mumbai',
        state: 'Maharashtra',
        total_orders: 2,
        total_spent: 189990,
        last_order_date: '2026-03-22T14:20:00.000Z',
        status: 'active',
      },
      {
        id: 'cust-3',
        name: 'Karan Malhotra',
        email: 'karan.m@esportsarena.com',
        phone: '+91 9723456789',
        city: 'Delhi NCR',
        state: 'Delhi',
        total_orders: 5,
        total_spent: 549900,
        last_order_date: '2026-03-28T09:45:00.000Z',
        status: 'vip',
      },
    ];

    defaultCust.forEach((c) => customerMap.set(c.email.toLowerCase(), c));

    // Aggregate from real orders
    for (const order of this.data.orders) {
      const email = order.customer_email.toLowerCase();
      if (customerMap.has(email)) {
        const existing = customerMap.get(email)!;
        existing.total_orders += 1;
        existing.total_spent += order.grand_total;
        existing.last_order_date = order.created_at;
      } else {
        customerMap.set(email, {
          id: `cust-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          name: order.customer_name,
          email: order.customer_email,
          phone: order.customer_phone,
          city: order.shipping_address?.city || 'Bangalore',
          state: order.shipping_address?.state || 'Karnataka',
          total_orders: 1,
          total_spent: order.grand_total,
          last_order_date: order.created_at,
          status: 'active',
        });
      }
    }

    return Array.from(customerMap.values());
  }

  // Admin Inventory
  getInventory() {
    return this.data.products.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      brand: p.brand || 'Flagship',
      category_name: p.category_name,
      price: p.price,
      stock_status: p.stock_status,
      stock_quantity: p.stock_quantity ?? 30,
      image_url: p.image_url,
    }));
  }

  updateInventoryStock(id: string, stock_status: string, stock_quantity: number): boolean {
    const prod = this.data.products.find((p) => p.id === id);
    if (!prod) return false;
    prod.stock_status = stock_status as any;
    prod.stock_quantity = stock_quantity;
    prod.updated_at = new Date().toISOString();
    this.persist();
    return true;
  }

  // Admin Coupons
  createCoupon(coupon: Coupon): Coupon {
    const existingIdx = this.data.coupons.findIndex(
      (c) => c.code.toUpperCase() === coupon.code.toUpperCase()
    );
    if (existingIdx !== -1) {
      this.data.coupons[existingIdx] = coupon;
    } else {
      this.data.coupons.push(coupon);
    }
    this.persist();
    return coupon;
  }

  deleteCoupon(code: string): boolean {
    const idx = this.data.coupons.findIndex((c) => c.code.toUpperCase() === code.toUpperCase());
    if (idx === -1) return false;
    this.data.coupons.splice(idx, 1);
    this.persist();
    return true;
  }

  // Admin Promotional Offers
  getOffers(): PromotionalOffer[] {
    return this.data.offers || DEFAULT_OFFERS;
  }

  createOffer(offer: PromotionalOffer): PromotionalOffer {
    if (!this.data.offers) this.data.offers = [...DEFAULT_OFFERS];
    const newOffer = {
      ...offer,
      id: offer.id || `off-${Date.now()}`,
    };
    this.data.offers.unshift(newOffer);
    this.persist();
    return newOffer;
  }

  deleteOffer(id: string): boolean {
    if (!this.data.offers) return false;
    const idx = this.data.offers.findIndex((o) => o.id === id);
    if (idx === -1) return false;
    this.data.offers.splice(idx, 1);
    this.persist();
    return true;
  }

  // Admin Reviews
  getReviews(): AdminReview[] {
    return this.data.reviews || DEFAULT_REVIEWS;
  }

  approveReview(id: string, status: 'approved' | 'rejected'): boolean {
    if (!this.data.reviews) this.data.reviews = [...DEFAULT_REVIEWS];
    const rev = this.data.reviews.find((r) => r.id === id);
    if (!rev) return false;
    rev.status = status;
    this.persist();
    return true;
  }

  deleteReview(id: string): boolean {
    if (!this.data.reviews) return false;
    const idx = this.data.reviews.findIndex((r) => r.id === id);
    if (idx === -1) return false;
    this.data.reviews.splice(idx, 1);
    this.persist();
    return true;
  }
}

export const db = new Database();
