import React from 'react';
import {
  ShieldCheck,
  Lock,
  Truck,
  RotateCcw,
  Award,
  Sparkles,
  Headphones,
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const guarantees = [
    {
      icon: ShieldCheck,
      title: 'Genuine Products',
      description: '100% authentic electronics sourced directly from authorized brand distributors with genuine serial numbers.',
      accent: 'text-[#22C55E]',
      border: 'border-[#22C55E]/30',
      bg: 'bg-[#22C55E]/10',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Priority courier dispatch with tamper-proof packaging, 24-48h express transit, and live GPS tracking.',
      accent: 'text-[#06B6D4]',
      border: 'border-[#06B6D4]/30',
      bg: 'bg-[#06B6D4]/10',
    },
    {
      icon: Lock,
      title: 'Secure Payment',
      description: 'Bank-grade 256-bit encryption supporting UPI, Cards, Net Banking, EMI, and Cash on Delivery.',
      accent: 'text-[#2563EB]',
      border: 'border-[#2563EB]/30',
      bg: 'bg-[#2563EB]/10',
    },
    {
      icon: RotateCcw,
      title: 'Easy Returns',
      description: '7-day hassle-free replacement with doorstep pickup if your device has any transit damage or defects.',
      accent: 'text-[#7C3AED]',
      border: 'border-[#7C3AED]/30',
      bg: 'bg-[#7C3AED]/10',
    },
    {
      icon: Headphones,
      title: 'Warranty Support',
      description: 'Complete 1-3 year official brand warranty assistance and dedicated technician setup guidance.',
      accent: 'text-[#F59E0B]',
      border: 'border-[#F59E0B]/30',
      bg: 'bg-[#F59E0B]/10',
    },
  ];

  return (
    <section className="space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/15 border border-[#2563EB]/30 text-[#06B6D4] text-xs font-mono font-bold uppercase tracking-wider">
          <Award className="w-3.5 h-3.5" />
          <span>The ElectroPulse Standard</span>
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight">
          Why Choose Us
        </h2>
        <p className="text-xs sm:text-sm text-[#A7B4C7]">
          Every purchase is backed by authentic brand guarantees, rapid fulfillment, and verified technical support.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {guarantees.map((g) => {
          const Icon = g.icon;
          return (
            <div
              key={g.title}
              className="p-5 rounded-2xl bg-[#111F33] border border-[#2563EB]/25 hover:border-[#7C3AED] hover:shadow-[0_0_20px_rgba(124,58,237,0.25)] transition-all duration-300 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className={`w-11 h-11 rounded-xl ${g.bg} border ${g.border} flex items-center justify-center ${g.accent}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white text-sm">
                  {g.title}
                </h3>
                <p className="text-xs text-[#A7B4C7] leading-relaxed">
                  {g.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
