import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'What is WooCommerce?',
    answer:
      'WooCommerce is the most popular, open-source e-commerce platform globally, powering over 28% of all online stores. It provides full control over your product inventory, customer accounts, payment processors, tax rules, and order fulfillment without monthly subscription fees taken from your sales revenue.',
  },
  {
    question: 'How long does development take?',
    answer:
      'Our turnkey deployment process takes approximately 3 to 5 business days from receiving your branding, domain choice, and initial product catalog. Once configured and verified on our staging server, your website goes live immediately.',
  },
  {
    question: 'Is domain included?',
    answer:
      'Yes! We provide 1 full year of custom .com or .in domain registration completely free as part of our package. If you already own an existing domain, our team will link and configure the DNS for you at no additional cost.',
  },
  {
    question: 'Is hosting included?',
    answer:
      'Yes! Your package includes 1 year of high-speed cloud SSD hosting with automated SSL encryption, daily backups, DDoS protection, and 99.9% guaranteed uptime.',
  },
  {
    question: 'Can I manage products myself?',
    answer:
      'Absolutely. You receive full credentials to the intuitive, mobile-friendly WordPress and WooCommerce admin control panel where you can add new products, edit descriptions, adjust prices, run discount coupons, and view real-time sales reports without needing any coding skills.',
  },
  {
    question: 'Can I accept online payments?',
    answer:
      'Yes! We seamlessly integrate leading payment gateways including Razorpay, Stripe, Cashfree, UPI (Google Pay, PhonePe, Paytm), NetBanking, Debit/Credit cards, and Cash on Delivery (COD) based on your target market.',
  },
  {
    question: 'Can WhatsApp be integrated?',
    answer:
      'Yes! We configure a floating 1-click WhatsApp order trigger on product pages and in the shopping cart so customers can chat directly with your sales representatives or confirm orders with a single tap.',
  },
  {
    question: 'Is the website mobile responsive?',
    answer:
      '100% responsive. Over 75% of e-commerce traffic originates from mobile devices. Your website is thoroughly tested across Apple iOS, Android, tablets, and widescreen desktop monitors.',
  },
  {
    question: 'Do you provide support?',
    answer:
      'Yes! You receive 1 full year of dedicated technical support and website maintenance covering security patches, plugin updates, performance optimizations, and technical troubleshooting.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="text-center space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-widest text-orange-500">
          Frequently Asked Questions
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Everything You Need To Know
        </h2>
        <p className="text-sm text-neutral-400">
          Got questions about our ₹10,999 WooCommerce package? Here are direct answers.
        </p>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl bg-neutral-900/60 border border-neutral-800/80 overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-neutral-100 hover:text-amber-400 transition-colors"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-orange-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/60 pt-3 animate-in fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
