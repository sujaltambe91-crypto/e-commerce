import React, { useState } from 'react';
import { useStore } from '../context/StoreContext.tsx';
import { SeoHead } from '../components/SeoHead.tsx';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { settings, showToast } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in your name, email, and message.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          message: message.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to send message. Please try again.');
        return;
      }

      setSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      showToast('Your message has been dispatched successfully!');
    } catch {
      setError('Connection error while sending your message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-6">
      <SeoHead
        title="Contact Editorial & Support"
        description={`Get in touch with the editorial and partner support team at ${settings.brand_name}.`}
      />

      <div className="text-center space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">
          We're Here To Help
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Get In Touch With Us
        </h1>
        <p className="text-neutral-400 text-sm max-w-xl mx-auto">
          Have a product recommendation, question about a deal, or want to collaborate with {settings.brand_name}? Send us a message below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Contact Info Sidebar */}
        <div className="md:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-6">
            <h3 className="text-base font-bold text-white">Contact Information</h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-neutral-800/80 text-amber-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-neutral-500 block">Email Us</span>
                  <a
                    href={`mailto:${settings.contact_email}`}
                    className="font-medium text-neutral-200 hover:text-amber-400 transition-colors"
                  >
                    {settings.contact_email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-neutral-800/80 text-amber-400 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-neutral-500 block">Phone Support</span>
                  <a
                    href={`tel:${settings.contact_phone}`}
                    className="font-medium text-neutral-200 hover:text-amber-400 transition-colors"
                  >
                    {settings.contact_phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-neutral-800/80 text-amber-400 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-neutral-500 block">Editorial Hours</span>
                  <span className="text-neutral-300">Mon - Fri: 9:00 AM - 6:00 PM IST</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800 text-[11px] text-neutral-500 leading-relaxed">
              Note: For order delivery status, returns, or warranty claims on items purchased via Amazon, please consult your Amazon account orders section directly.
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-7">
          <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-xl">
            {success ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Message Received!</h3>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out. Our editorial team reviews every inquiry and will respond to your email within 24 business hours.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-200 rounded-xl transition-colors"
                >
                  Send Another Message
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

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Your Name <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500/60"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Email Address <span className="text-amber-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500/60"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500/60"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Message <span className="text-amber-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we assist you?"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500/60 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-6 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-neutral-950 font-bold text-xs rounded-xl transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Sending Message...' : 'Submit Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
