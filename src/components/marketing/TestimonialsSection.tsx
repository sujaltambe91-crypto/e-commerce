import React from 'react';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  image: string;
  rating: number;
  review: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Rajesh Singhania',
    role: 'Managing Director',
    company: 'Singhania Footwear & Leather',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    review:
      'Marketingwalaa delivered our complete e-commerce store in just 4 days. The WhatsApp integration alone generates over 35 orders daily from our regional customers. Phenomenal value for ₹10,999!',
  },
  {
    name: 'Ananya Deshmukh',
    role: 'Founder & Formulator',
    company: 'Aura Skincare Organics',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    review:
      'As a non-technical founder, I was anxious about managing products. The admin dashboard is so clean and simple to use on my phone. Their 1-year support team is always responsive on WhatsApp.',
  },
  {
    name: 'Vikram Patel',
    role: 'Director',
    company: 'Apex Gadgets & Electronics',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    review:
      'We switched from Shopify to save monthly overhead. With Marketingwalaa’s WooCommerce setup, we pay zero platform commission and our site loads in under 1 second. Highly recommend!',
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-extrabold uppercase tracking-widest text-orange-500">
          Client Success Stories
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Trusted By 500+ Growing Indian Businesses
        </h2>
        <p className="text-sm text-neutral-400">
          Read genuine feedback from business owners who launched their stores with Marketingwalaa.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between space-y-6 hover:border-orange-500/40 transition-colors"
          >
            <div className="space-y-4">
              {/* Star Rating */}
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              {/* Review Quote */}
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                "{t.review}"
              </p>
            </div>

            {/* Author */}
            <div className="pt-4 border-t border-neutral-800/80 flex items-center gap-3">
              <img
                src={t.image}
                alt={t.name}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover bg-neutral-800 shrink-0"
              />
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-white truncate">{t.name}</h4>
                <p className="text-[11px] text-neutral-400 truncate">
                  {t.role}, {t.company}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
