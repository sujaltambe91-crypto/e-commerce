import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Zap,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext.tsx';

export const ContactSection: React.FC = () => {
  const { showToast } = useStore();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [service, setService] = useState('WooCommerce E-Commerce Website (₹10,999 Offer)');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !phone.trim() || !email.trim()) {
      setError('Please provide your name, phone number, and email.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          business_name: businessName.trim(),
          service: service.trim(),
          message: message.trim() || `Inquiry for ${service}`,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to submit inquiry.');
        return;
      }

      setSubmitted(true);
      setName('');
      setPhone('');
      setEmail('');
      setBusinessName('');
      setMessage('');
      showToast('Thank you! Marketingwalaa team will reach out within 2 hours.');
    } catch {
      setError('Connection error while sending inquiry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="contact" className="space-y-12 scroll-mt-24">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-extrabold uppercase tracking-widest text-orange-500">
          Book Your Store Consultation
        </span>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Ready To Start Selling Online?
        </h2>
        <p className="text-sm text-neutral-400">
          Fill out the form below or contact us directly on WhatsApp for instant booking.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Info Card (5 cols) */}
        <div className="lg:col-span-5 p-8 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-8 shadow-xl">
          <div>
            <span className="text-xs font-bold text-orange-500 uppercase tracking-widest block mb-1">
              Direct Contact Channels
            </span>
            <h3 className="font-display text-2xl font-bold text-white">
              Speak With An E-Commerce Specialist
            </h3>
            <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
              We respond promptly during business hours. Available for WhatsApp call or direct cellular discussion.
            </p>
          </div>

          <div className="space-y-5 text-xs">
            {/* Phone */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase font-bold">Call Us Direct</span>
                <a
                  href="tel:+916355776735"
                  className="text-base font-bold text-white font-mono hover:text-orange-400 transition-colors"
                >
                  +91 6355776735
                </a>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase font-bold">Instant WhatsApp</span>
                <a
                  href="https://wa.me/916355776735?text=Hello%20Marketingwalaa,%20I%20am%20interested%20in%20launching%20my%20WooCommerce%20E-Commerce%20website."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-emerald-400 hover:underline"
                >
                  Chat on WhatsApp (+91 6355776735)
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase font-bold">Official Email</span>
                <a
                  href="mailto:info@marketingwalaa.com"
                  className="text-sm font-semibold text-neutral-200 hover:text-white"
                >
                  info@marketingwalaa.com
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase font-bold">Headquarters</span>
                <span className="text-xs font-semibold text-neutral-300">
                  Gujarat, India • Serving Clients Nationwide & Globally
                </span>
              </div>
            </div>
          </div>

          {/* Flyer badge snippet */}
          <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between text-xs">
            <span className="text-neutral-400">Offer Package:</span>
            <span className="font-mono font-bold text-orange-400 text-sm">₹10,999 All-Inclusive</span>
          </div>
        </div>

        {/* Lead Submission Form (7 cols) */}
        <div className="lg:col-span-7 p-8 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-xl">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white">Inquiry Received!</h3>
              <p className="text-xs text-neutral-300 max-w-sm mx-auto leading-relaxed">
                Thank you for choosing Marketingwalaa. One of our technical store architects will call you on your phone within 2 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-xl"
              >
                Send Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Your Name <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Manish Sharma"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-neutral-100 focus:outline-none focus:border-orange-500/60"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Phone / WhatsApp Number <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-neutral-100 font-mono focus:outline-none focus:border-orange-500/60"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Email Address <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-neutral-100 focus:outline-none focus:border-orange-500/60"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Business / Brand Name
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Apex Fashion"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-neutral-100 focus:outline-none focus:border-orange-500/60"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Select Required Solution
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-neutral-100 focus:outline-none focus:border-orange-500/60"
                >
                  <option value="WooCommerce E-Commerce Website (₹10,999 Offer)">
                    WooCommerce E-Commerce Website (₹10,999 Special Offer)
                  </option>
                  <option value="Custom E-Commerce Store with PWA">
                    Custom E-Commerce Store with Mobile App (PWA)
                  </option>
                  <option value="E-Commerce Redesign & UI/UX Upgrade">
                    E-Commerce Redesign & UI/UX Upgrade
                  </option>
                  <option value="Payment Gateway & Shipping Integration Only">
                    Payment Gateway & Shipping Integration Only
                  </option>
                  <option value="Digital Marketing & SEO Package">
                    Digital Marketing & SEO Package
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Message / Specific Requirements
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about the products you sell, your target launch date, and any special features..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-neutral-100 focus:outline-none focus:border-orange-500/60 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 hover:from-orange-400 hover:to-amber-400 text-neutral-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-orange-500/25 transition-all active:scale-98 flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>{loading ? 'Submitting Details...' : 'GET STARTED WITH ₹10,999 OFFER'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
