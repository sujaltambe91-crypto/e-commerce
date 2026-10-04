import React from 'react';
import {
  Globe,
  Server,
  ShoppingBag,
  CreditCard,
  Truck,
  Smartphone,
  MessageCircle,
  Layout,
  Package,
  ClipboardList,
  Users,
  Shield,
  Headphones,
  Check,
} from 'lucide-react';

interface FeatureItem {
  title: string;
  subtitle: string;
  icon: React.ElementType;
}

const FEATURES: FeatureItem[] = [
  {
    title: 'FREE DOMAIN • 1 YEAR',
    subtitle: 'Custom .com or .in domain registration included with DNS setup',
    icon: Globe,
  },
  {
    title: 'FREE HOSTING • 1 YEAR',
    subtitle: 'High-speed cloud SSD server with SSL security and 99.9% uptime',
    icon: Server,
  },
  {
    title: 'WOOCOMMERCE STORE',
    subtitle: 'Battle-tested flexible e-commerce architecture tailored to your catalog',
    icon: ShoppingBag,
  },
  {
    title: 'PAYMENT GATEWAY',
    subtitle: 'Razorpay, Stripe, Cashfree, UPI, Credit/Debit cards & NetBanking ready',
    icon: CreditCard,
  },
  {
    title: 'SHIPPING INTEGRATION',
    subtitle: 'Shiprocket, Delhivery, BlueDart automated label printing and tracking',
    icon: Truck,
  },
  {
    title: 'APP INTEGRATION',
    subtitle: 'Progressive Web App (PWA) with native mobile install capability',
    icon: Smartphone,
  },
  {
    title: 'WHATSAPP INTEGRATION',
    subtitle: 'Direct 1-click WhatsApp order confirmation and customer chat trigger',
    icon: MessageCircle,
  },
  {
    title: 'MOBILE RESPONSIVE',
    subtitle: 'Pixel-perfect UX on iPhone, Android, iPad, and desktop viewports',
    icon: Layout,
  },
  {
    title: 'PRODUCT MANAGEMENT',
    subtitle: 'Easy admin control to add, edit, duplicate, and organize products',
    icon: Package,
  },
  {
    title: 'ORDER MANAGEMENT',
    subtitle: 'Real-time order statuses, customer invoices, and shipment tracking',
    icon: ClipboardList,
  },
  {
    title: 'CUSTOMER MANAGEMENT',
    subtitle: 'User profiles, order histories, saved addresses, and wishlists',
    icon: Users,
  },
  {
    title: 'ADMIN DASHBOARD',
    subtitle: 'Complete analytics, sales reports, inventory counts, and site settings',
    icon: Shield,
  },
  {
    title: '1 YEAR SUPPORT',
    subtitle: 'Continuous technical maintenance, security updates, and bug fixes',
    icon: Headphones,
  },
];

export const FeaturesGrid: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-extrabold uppercase tracking-widest text-orange-500">
          Everything Included In Your Package
        </span>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Everything You Need To Sell Anything, Anywhere
        </h2>
        <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
          No hidden fees or surprise costs. We provide a turn-key enterprise-grade e-commerce foundation configured to generate sales from day one.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {FEATURES.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/90 hover:border-orange-500/50 transition-all duration-200 group flex items-start gap-4"
            >
              {/* Distinctive Orange Circle Checkmark from the flyer */}
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-neutral-950 flex items-center justify-center shrink-0 shadow-md shadow-orange-500/20 group-hover:scale-110 transition-transform">
                <Check className="w-5 h-5 stroke-[3]" />
              </div>

              <div className="space-y-1 min-w-0">
                <h3 className="font-display text-sm font-bold text-white tracking-wide group-hover:text-amber-400 transition-colors uppercase">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {item.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
