import React, { useState } from 'react';
import {
  HelpCircle,
  MessageSquare,
  Mail,
  Phone,
  Truck,
  RotateCcw,
  ShieldCheck,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Send,
  X,
  CheckCircle2,
} from 'lucide-react';
import { SeoHead } from '../components/SeoHead.tsx';
import { useStore } from '../context/StoreContext.tsx';

export const SupportPage: React.FC = () => {
  const { showToast } = useStore();
  const [activeTab, setActiveTab] = useState<'contact' | 'live_chat' | 'faq' | 'shipping' | 'returns' | 'refund' | 'warranty'>('contact');

  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  // Live Chat State
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string; time: string }>>([
    { sender: 'bot', text: 'Hello! Welcome to ElectroPulse 3D Live Support. How can we help you with hardware specifications or tracking today?', time: 'Just now' },
  ]);
  const [chatInput, setChatInput] = useState('');

  // FAQ Expanded State
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const faqs = [
    { q: 'How does the 3D Interactive Model inspection work?', a: 'You can orbit any smartphone, laptop, or OLED TV in full 360° by clicking and dragging with your mouse or touch screen. In addition, our CAD wireframe mode lets you inspect internal chassis dimensions and component placements.' },
    { q: 'Are all devices backed by official manufacturer warranties?', a: 'Yes. Every unit is 100% brand new, factory sealed, and sourced through official brand distribution networks. The serial number validates directly on the manufacturer support portal for full warranty coverage.' },
    { q: 'How quickly will my order be dispatched?', a: 'Orders placed before 2:00 PM are dispatched on the same business day via BlueDart / Delhivery Express Air Courier with guaranteed 24-48h doorstep delivery in metro cities.' },
    { q: 'What is the 7-day replacement procedure?', a: 'If your device arrives damaged in transit or displays any hardware defect, simply request a replacement from your account dashboard. Our courier will pick it up from your doorstep at zero cost.' },
    { q: 'How do No-Cost EMI plans operate?', a: 'We offer 0% interest and zero processing fee EMI plans across HDFC, ICICI, SBI, Axis, and Kotak credit cards for tenures of 3, 6, 9, and 12 months.' },
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactName && contactEmail && contactMessage) {
      showToast('Support ticket submitted! An engineer will reach out within 2 hours.', 'success');
      setContactName('');
      setContactEmail('');
      setContactSubject('');
      setContactMessage('');
    }
  };

  const handleChatSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = { sender: 'user' as const, text: chatInput.trim(), time: 'Just now' };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');

    setTimeout(() => {
      let botResponse = "Thank you for reaching out! A technical specialist has been notified and will assist you shortly. In the meantime, you can track orders live under the Track Order tab.";
      if (chatInput.toLowerCase().includes('warranty')) {
        botResponse = "All hardware includes 1 to 3 years of official brand warranty. Serial numbers can be validated directly on the official brand website.";
      } else if (chatInput.toLowerCase().includes('delivery') || chatInput.toLowerCase().includes('track')) {
        botResponse = "Express deliveries typically arrive in 24-48 hours. You can enter your Order ID in our live GPS tracking screen for real-time transit status.";
      }
      setChatMessages((prev) => [...prev, { sender: 'bot', text: botResponse, time: 'Just now' }]);
    }, 800);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <SeoHead
        title="Customer Support & Help Center | ElectroPulse 3D"
        description="Get live technician assistance, explore FAQs, track shipments, and learn about warranty and return policies."
      />

      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/15 border border-[#2563EB]/30 text-[#06B6D4] text-xs font-mono font-bold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>24/7 CUSTOMER CARE</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
          Help & Support Center
        </h1>
        <p className="text-xs sm:text-sm text-[#A7B4C7] max-w-lg mx-auto">
          Need help choosing hardware, tracking a delivery, or claiming your manufacturer warranty? We are here for you.
        </p>
      </div>

      {/* Navigation Tabs: Contact, Live Chat, FAQ, Shipping, Returns, Refund, Warranty */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
        {[
          { id: 'contact', label: 'Contact Us', icon: Mail },
          { id: 'live_chat', label: 'Live Chat', icon: MessageSquare },
          { id: 'faq', label: 'FAQs', icon: HelpCircle },
          { id: 'shipping', label: 'Shipping', icon: Truck },
          { id: 'returns', label: 'Returns', icon: RotateCcw },
          { id: 'refund', label: 'Refund', icon: DollarSign },
          { id: 'warranty', label: 'Warranty', icon: ShieldCheck },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                active
                  ? 'bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white shadow-md shadow-[#2563EB]/25'
                  : 'bg-[#111F33] text-[#A7B4C7] hover:text-white border border-[#2563EB]/20 hover:bg-[#0D1B2A]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#111F33] border border-[#2563EB]/30 shadow-xl">
        {/* 1. CONTACT */}
        {activeTab === 'contact' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start animate-in fade-in-50">
            <div className="md:col-span-5 space-y-4 text-xs">
              <h3 className="font-display text-xl font-bold text-white">Get in Touch</h3>
              <p className="text-[#A7B4C7] leading-relaxed">
                Our support team is available 24 hours a day, 7 days a week to help with orders and technical inquiries.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#0D1B2A] border border-[#2563EB]/20">
                  <Mail className="w-5 h-5 text-[#06B6D4]" />
                  <div>
                    <span className="text-[#A7B4C7] block">Email Support</span>
                    <strong className="text-white">support@electropulse.store</strong>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#0D1B2A] border border-[#2563EB]/20">
                  <Phone className="w-5 h-5 text-[#2563EB]" />
                  <div>
                    <span className="text-[#A7B4C7] block">Toll-Free Helpline</span>
                    <strong className="text-white">+91 6355776735</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-7">
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-[#A7B4C7]">Your Name</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Sujal Tambe"
                      className="w-full px-3.5 py-2.5 bg-[#0D1B2A] border border-[#2563EB]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#06B6D4]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-[#A7B4C7]">Your Email</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="sujal@example.com"
                      className="w-full px-3.5 py-2.5 bg-[#0D1B2A] border border-[#2563EB]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#06B6D4]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-[#A7B4C7]">Subject</label>
                  <input
                    type="text"
                    required
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    placeholder="e.g. Question about MacBook Pro M4 Max RAM options"
                    className="w-full px-3.5 py-2.5 bg-[#0D1B2A] border border-[#2563EB]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#06B6D4]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-[#A7B4C7]">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Describe how we can assist you..."
                    className="w-full px-3.5 py-2.5 bg-[#0D1B2A] border border-[#2563EB]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#06B6D4]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-xs font-bold rounded-xl shadow transition-all flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Support Ticket</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* 2. LIVE CHAT */}
        {activeTab === 'live_chat' && (
          <div className="space-y-4 max-w-2xl mx-auto animate-in fade-in-50">
            <div className="flex items-center justify-between pb-3 border-b border-[#2563EB]/20">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-[#22C55E] animate-pulse" />
                <h3 className="font-bold text-sm text-white">Live Electronics Advisor Active</h3>
              </div>
              <span className="text-[10px] font-mono text-[#06B6D4]">Average Response: &lt; 1 min</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#0D1B2A] border border-[#2563EB]/20 h-72 overflow-y-auto space-y-3">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#2563EB] text-white rounded-br-none'
                        : 'bg-[#111F33] text-neutral-200 border border-[#2563EB]/30 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] font-mono text-neutral-500 mt-1 px-1">{msg.time}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleChatSend} className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about specs, delivery times, or compatibility..."
                className="flex-1 px-4 py-2.5 bg-[#0D1B2A] border border-[#2563EB]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#06B6D4]"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:from-[#1d4ed8] hover:to-[#6d28d9] text-white font-bold text-xs rounded-xl shadow transition-all"
              >
                Send
              </button>
            </form>
          </div>
        )}

        {/* 3. FAQ */}
        {activeTab === 'faq' && (
          <div className="space-y-4 max-w-3xl mx-auto animate-in fade-in-50">
            <h3 className="font-display text-xl font-bold text-white pb-2 border-b border-[#2563EB]/20">
              Frequently Asked Questions
            </h3>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = expandedFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl bg-[#0D1B2A] border border-[#2563EB]/20 overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setExpandedFaq(isOpen ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-bold text-white hover:text-[#06B6D4]"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-[#06B6D4] shrink-0" /> : <ChevronDown className="w-4 h-4 text-[#A7B4C7] shrink-0" />}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs text-[#A7B4C7] leading-relaxed border-t border-[#2563EB]/15 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 4. SHIPPING */}
        {activeTab === 'shipping' && (
          <div className="space-y-4 text-xs animate-in fade-in-50">
            <h3 className="font-display text-xl font-bold text-white pb-2 border-b border-[#2563EB]/20">
              Shipping & Air Courier Transit
            </h3>
            <p className="text-[#A7B4C7] leading-relaxed">
              We partner exclusively with BlueDart Express Aviation, Delhivery, and FedEx to deliver all electronics with guaranteed tamper-proof anti-static packaging.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#0D1B2A] border border-[#2563EB]/20 space-y-1">
                <span className="font-bold text-[#06B6D4] block">Express Prime</span>
                <span className="text-white block font-medium">24-48 Hours</span>
                <span className="text-[11px] text-[#A7B4C7]">Free on all orders above ₹10,000</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#0D1B2A] border border-[#2563EB]/20 space-y-1">
                <span className="font-bold text-[#22C55E] block">Insured Transit</span>
                <span className="text-white block font-medium">100% Covered</span>
                <span className="text-[11px] text-[#A7B4C7]">Full value coverage against loss or shock damage</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#0D1B2A] border border-[#2563EB]/20 space-y-1">
                <span className="font-bold text-[#7C3AED] block">Live Tracking</span>
                <span className="text-white block font-medium">Real-Time GPS</span>
                <span className="text-[11px] text-[#A7B4C7]">SMS and WhatsApp status updates</span>
              </div>
            </div>
          </div>
        )}

        {/* 5. RETURNS */}
        {activeTab === 'returns' && (
          <div className="space-y-4 text-xs animate-in fade-in-50">
            <h3 className="font-display text-xl font-bold text-white pb-2 border-b border-[#2563EB]/20">
              7-Day Doorstep Replacement Policy
            </h3>
            <p className="text-[#A7B4C7] leading-relaxed">
              If your delivered item has any physical defects, missing accessories, or hardware malfunctions, you may initiate a return within 7 calendar days of delivery.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[#A7B4C7]">
              <li>Keep original packaging, serial number labels, warranty card, and accessories intact.</li>
              <li>A courier agent will inspect the outer condition and complete pickup at your address.</li>
              <li>A replacement unit is dispatched immediately once the return pickup scan is registered.</li>
            </ul>
          </div>
        )}

        {/* 6. REFUND */}
        {activeTab === 'refund' && (
          <div className="space-y-4 text-xs animate-in fade-in-50">
            <h3 className="font-display text-xl font-bold text-white pb-2 border-b border-[#2563EB]/20">
              Refund Timeline & Processing
            </h3>
            <p className="text-[#A7B4C7] leading-relaxed">
              In cases where an identical replacement model is out of stock, full monetary refunds are processed directly back to the original payment source:
            </p>
            <div className="space-y-2 pt-2 text-[#A7B4C7]">
              <div className="p-3 rounded-xl bg-[#0D1B2A] border border-[#2563EB]/20 flex justify-between">
                <span className="text-white font-medium">UPI / Instant Transfer</span>
                <span className="text-[#22C55E] font-bold">2 - 4 Hours</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0D1B2A] border border-[#2563EB]/20 flex justify-between">
                <span className="text-white font-medium">Credit / Debit Cards</span>
                <span className="text-[#06B6D4] font-bold">3 - 5 Business Days</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0D1B2A] border border-[#2563EB]/20 flex justify-between">
                <span className="text-white font-medium">Net Banking</span>
                <span className="text-[#7C3AED] font-bold">2 - 4 Business Days</span>
              </div>
            </div>
          </div>
        )}

        {/* 7. WARRANTY */}
        {activeTab === 'warranty' && (
          <div className="space-y-4 text-xs animate-in fade-in-50">
            <h3 className="font-display text-xl font-bold text-white pb-2 border-b border-[#2563EB]/20">
              Official Manufacturer Warranty Protection
            </h3>
            <p className="text-[#A7B4C7] leading-relaxed">
              Every device purchased on ElectroPulse 3D comes with a minimum 1-Year Official Brand International Warranty (up to 3 years on select gaming monitors and custom PC towers).
            </p>
            <div className="p-4 rounded-2xl bg-[#0D1B2A] border border-[#22C55E]/30 text-[#22C55E] flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs">
                <strong className="text-white block font-bold">How to validate warranty coverage:</strong>
                <p className="text-[#A7B4C7]">
                  Check the invoice sent to your email after delivery. Use the printed serial number (IMEI or Service Tag) on Apple, Samsung, Dell, or LG official portals to activate full service privileges.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
