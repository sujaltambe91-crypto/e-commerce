export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  image_url: string;
  description: string;
  subcategories?: string[];
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
  product_count?: number;
}

export interface HardwareSpecs {
  processor?: string;
  ram?: string;
  storage?: string;
  graphics?: string;
  motherboard?: string;
}

export interface DisplaySpecs {
  screen_size?: string;
  resolution?: string;
  panel_type?: string;
  refresh_rate?: string;
  hdr?: string;
}

export interface CameraSpecs {
  front_camera?: string;
  rear_camera?: string;
  video_resolution?: string;
  features?: string;
}

export interface BatterySpecs {
  capacity?: string;
  charging?: string;
  battery_life?: string;
}

export interface ConnectivitySpecs {
  wifi?: string;
  bluetooth?: string;
  usb?: string;
  hdmi?: string;
  other_ports?: string;
}

export interface SoftwareSpecs {
  os?: string;
  version?: string;
}

export interface PhysicalSpecs {
  dimensions?: string;
  weight?: string;
  colors?: string[];
}

export interface ProductSpecs extends HardwareSpecs, DisplaySpecs, CameraSpecs, BatterySpecs, ConnectivitySpecs, SoftwareSpecs, PhysicalSpecs {
  expandable_storage?: string;
  ports?: string;
  camera?: string;
  battery?: string;
  charging?: string;
  connectivity?: string;
  display?: string;
  [key: string]: string | string[] | undefined;
}

export interface ProductReview {
  id: string;
  user_name: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface ProductQA {
  id: string;
  question: string;
  answer: string;
  asked_by: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand?: string;
  affiliate_url?: string;
  amazon_affiliate_url?: string;
  category_id: string;
  category_name?: string;
  category_slug?: string;
  subcategory?: string;
  image_url: string;
  additional_images?: string[];
  video_url?: string;
  short_description: string;
  full_description: string;
  price: number;
  selling_price?: number;
  original_price?: number;
  mrp?: number;
  discount_percentage?: number;
  currency: string;
  rating: number;
  reviews_count: number;
  // INVENTORY
  sku?: string;
  stock?: number;
  stock_quantity?: number;
  stock_status: 'in_stock' | 'low_stock' | 'out_of_stock';
  min_quantity?: number;
  max_quantity?: number;

  // PRICE
  price: number;
  selling_price?: number;
  original_price?: number;
  mrp?: number;
  discount_percentage?: number;
  currency: string;
  coupon_code?: string;
  coupon_discount?: number;
  applicable_coupons?: Array<{
    code: string;
    discount_amount: number;
    description: string;
    min_spend?: number;
  }>;
  emi?: string | number;
  emi_starts_at?: number;
  emi_options?: Array<{
    tenure: string;
    monthly: number;
    bank: string;
    no_cost: boolean;
  }>;

  // RATINGS & REVIEWS
  rating: number;
  reviews_count: number;
  rating_breakdown?: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  reviews?: ProductReview[];
  qas?: ProductQA[];

  // DELIVERY
  delivery?: string;
  delivery_date?: string;
  estimated_delivery?: string;
  shipping_cost?: number | string;
  return_period?: string;
  return_policy?: string;

  // WARRANTY
  warranty?: string;
  warranty_period?: string;
  warranty_info?: string;

  featured?: boolean;
  is_trending?: boolean;
  is_best_seller?: boolean;
  is_deal_of_the_day?: boolean;
  is_new_arrival?: boolean;
  status: 'active' | 'inactive';
  click_count: number;
  created_at: string;
  updated_at: string;

  // 3D Model / 360° View
  has_3d_model?: boolean;
  model_3d_type?: 'smartphone' | 'laptop' | 'tv' | 'headphones' | 'pc';

  // VARIANTS
  color_options?: string[];
  size_options?: string[];
  model_options?: string[];
  ram_options?: string[];
  storage_options?: string[];

  // SPECIFICATIONS
  material?: string;
  dimensions?: string;
  weight?: string;
  features?: string[];
  category_specs?: Record<string, string | number>;

  // Grouped Technical Specifications
  hardware?: HardwareSpecs;
  display?: DisplaySpecs;
  camera?: CameraSpecs;
  battery?: BatterySpecs;
  connectivity?: ConnectivitySpecs;
  software?: SoftwareSpecs;
  physical?: PhysicalSpecs;

  // Detailed Specifications (Unified)
  specs?: ProductSpecs;
  whats_in_the_box?: string[];
  delivery_info?: string;
  offers?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selected_color?: string;
  selected_size?: string;
  selected_model?: string;
  selected_ram?: string;
  selected_storage?: string;
  added_at: string;
}

export interface OrderItem {
  product_id: string;
  product_name: string;
  product_image: string;
  quantity: number;
  price: number;
  selected_color?: string;
  selected_ram?: string;
  selected_storage?: string;
}

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: OrderItem[];
  subtotal: number;
  discount: number;
  delivery_fee: number;
  grand_total: number;
  payment_method: 'upi' | 'card' | 'netbanking' | 'emi' | 'wallet' | 'cod';
  payment_status: 'paid' | 'pending';
  order_status: 'placed' | 'confirmed' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled';
  created_at: string;
  estimated_delivery: string;
}

export interface Coupon {
  id?: string;
  code: string;
  discount_percentage: number;
  max_discount: number;
  min_spend: number;
  description: string;
  active: boolean;
  expires_at?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  state?: string;
  total_orders: number;
  total_spent: number;
  last_order_date: string;
  status: 'active' | 'vip' | 'inactive';
}

export interface PromotionalOffer {
  id: string;
  title: string;
  subtitle: string;
  discount_badge: string;
  code?: string;
  category_slug?: string;
  banner_image: string;
  status: 'active' | 'inactive';
  expires_at?: string;
}

export interface AdminReview {
  id: string;
  product_id: string;
  product_name: string;
  customer_name: string;
  rating: number;
  review_text: string;
  status: 'approved' | 'pending' | 'rejected';
  created_at: string;
}

export interface HeroSlide {
  id: string;
  image_url: string;
  title: string;
  description: string;
  cta_text: string;
  cta_url: string;
  display_order: number;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface AffiliateClick {
  id: string;
  product_id: string;
  product_name: string;
  product_slug: string;
  clicked_at: string;
  referrer?: string;
  ip_hash?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  business_name?: string;
  service?: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface SiteSettings {
  id: string;
  brand_name: string;
  logo_url: string;
  favicon_url: string;
  website_description: string;
  contact_email: string;
  contact_phone: string;
  social_links: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
  footer_text: string;
  seo_title: string;
  seo_description: string;
  amazon_affiliate_tag: string;
  currency: string;
  updated_at: string;
}

export interface AdminUser {
  id: string;
  username: string;
  created_at: string;
  last_login?: string;
}

export interface AnalyticsSummary {
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;
  totalClicks: number;
  todayClicks: number;
  yesterdayClicks: number;
  thisWeekClicks: number;
  thisMonthClicks: number;
  topProducts: Array<{
    id: string;
    name: string;
    slug: string;
    image_url: string;
    category_name: string;
    click_count: number;
    last_clicked: string | null;
  }>;
  clicksByDate: Array<{
    date: string;
    clicks: number;
  }>;
  recentClicks: AffiliateClick[];
}
