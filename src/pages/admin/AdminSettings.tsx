import React, { useState, useEffect } from 'react';
import { SiteSettings } from '../../types/index.ts';
import { useAdminAuth } from '../../context/AdminAuthContext.tsx';
import { useStore } from '../../context/StoreContext.tsx';
import {
  Settings,
  Shield,
  Lock,
  Globe,
  Tag,
  Mail,
  Phone,
  Save,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Share2,
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { authFetch, changeCredentials, adminUser } = useAdminAuth();
  const { refreshSettings, showToast } = useStore();

  const [activeTab, setActiveTab] = useState<'site' | 'security'>('site');

  // Site Settings Form
  const [brandName, setBrandName] = useState('');
  const [websiteDesc, setWebsiteDesc] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [amazonAffiliateTag, setAmazonAffiliateTag] = useState('');
  const [currency, setCurrency] = useState('₹');
  const [footerText, setFooterText] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDesc, setSeoDesc] = useState('');

  // Socials
  const [twitter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  const [youtube, setYoutube] = useState('');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Security Credentials Form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newUsername, setNewUsername] = useState(adminUser?.username || 'admin');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [credError, setCredError] = useState<string | null>(null);
  const [credSuccess, setCredSuccess] = useState<string | null>(null);
  const [credSaving, setCredSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await authFetch('/api/admin/settings');
        if (res.ok) {
          const s: SiteSettings = await res.json();
          setBrandName(s.brand_name || '');
          setWebsiteDesc(s.website_description || '');
          setContactEmail(s.contact_email || '');
          setContactPhone(s.contact_phone || '');
          setAmazonAffiliateTag(s.amazon_affiliate_tag || '');
          setCurrency(s.currency || '₹');
          setFooterText(s.footer_text || '');
          setSeoTitle(s.seo_title || '');
          setSeoDesc(s.seo_description || '');

          if (s.social_links) {
            setTwitter(s.social_links.twitter || '');
            setInstagram(s.social_links.instagram || '');
            setFacebook(s.social_links.facebook || '');
            setYoutube(s.social_links.youtube || '');
          }
        }
      } catch (err) {
        console.error('Error fetching admin settings', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSaveSiteSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload: Partial<SiteSettings> = {
      brand_name: brandName.trim(),
      website_description: websiteDesc.trim(),
      contact_email: contactEmail.trim(),
      contact_phone: contactPhone.trim(),
      amazon_affiliate_tag: amazonAffiliateTag.trim(),
      currency: currency.trim() || '₹',
      footer_text: footerText.trim(),
      seo_title: seoTitle.trim(),
      seo_description: seoDesc.trim(),
      social_links: {
        twitter: twitter.trim(),
        instagram: instagram.trim(),
        facebook: facebook.trim(),
        youtube: youtube.trim(),
      },
    };

    try {
      const res = await authFetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showToast('Site settings updated live across storefront');
        refreshSettings();
      } else {
        showToast('Failed to save settings', 'error');
      }
    } catch {
      showToast('Network error saving settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setCredError(null);
    setCredSuccess(null);

    if (!currentPassword) {
      setCredError('Please provide your current admin password.');
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      setCredError('New passwords do not match.');
      return;
    }

    if (newPassword && newPassword.length < 6) {
      setCredError('New password must be at least 6 characters long.');
      return;
    }

    setCredSaving(true);
    try {
      const res = await changeCredentials(
        currentPassword,
        newUsername !== adminUser?.username ? newUsername : undefined,
        newPassword || undefined
      );

      if (res.success) {
        setCredSuccess('Admin profile credentials successfully updated and hashed!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        showToast('Admin credentials updated');
      } else {
        setCredError(res.error || 'Failed to update credentials');
      }
    } catch {
      setCredError('Network error updating credentials');
    } finally {
      setCredSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center text-xs text-neutral-500 animate-pulse">
        Loading settings...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="border-b border-neutral-800 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight">
            Settings & Security
          </h1>
          <p className="mt-1 text-xs text-neutral-400">
            Storefront branding, Amazon affiliate tags, SEO metadata, and admin access control.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex bg-neutral-900 p-1 rounded-xl border border-neutral-800 shrink-0">
          <button
            onClick={() => setActiveTab('site')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'site'
                ? 'bg-amber-500 text-neutral-950 shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Site Configuration</span>
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'security'
                ? 'bg-amber-500 text-neutral-950 shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Admin Profile & Security</span>
          </button>
        </div>
      </div>

      {activeTab === 'site' ? (
        <form onSubmit={handleSaveSiteSettings} className="space-y-6">
          {/* Brand & Affiliate Tag */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Tag className="w-4 h-4 text-amber-500" />
              <span>Branding & Amazon Partner Tag</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1">
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Brand Name <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="ShopKart"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-neutral-100 focus:outline-none focus:border-amber-500/60 font-semibold"
                />
              </div>

              <div className="sm:col-span-1">
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Amazon Affiliate Tag <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={amazonAffiliateTag}
                  onChange={(e) => setAmazonAffiliateTag(e.target.value)}
                  placeholder="shopkart-21"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-neutral-100 font-mono focus:outline-none focus:border-amber-500/60"
                />
              </div>

              <div className="sm:col-span-1">
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Display Currency Symbol
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-neutral-100 focus:outline-none focus:border-amber-500/60 font-mono"
                >
                  <option value="₹">₹ (INR - Indian Rupee)</option>
                  <option value="$">$ (USD - US Dollar)</option>
                  <option value="€">€ (EUR - Euro)</option>
                  <option value="£">£ (GBP - British Pound)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Website Tagline / Description
              </label>
              <textarea
                rows={2}
                value={websiteDesc}
                onChange={(e) => setWebsiteDesc(e.target.value)}
                placeholder="Curated affiliate e-commerce deals platform..."
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2 text-xs text-neutral-100 focus:outline-none focus:border-amber-500/60 resize-none"
              />
            </div>
          </div>

          {/* Contact Details */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-500" />
              <span>Contact Channels & Footer Notice</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Official Support Email
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="support@shopkart.store"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-neutral-100 focus:outline-none focus:border-amber-500/60"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Support Phone / Hotline
                </label>
                <input
                  type="text"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="+91 6355776735"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-neutral-100 focus:outline-none focus:border-amber-500/60"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Footer Copyright Text
              </label>
              <input
                type="text"
                value={footerText}
                onChange={(e) => setFooterText(e.target.value)}
                placeholder="© 2026 ShopKart Inc. All rights reserved."
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-neutral-100 focus:outline-none focus:border-amber-500/60"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Share2 className="w-4 h-4 text-amber-500" />
              <span>Social Media Channels</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  X / Twitter URL
                </label>
                <input
                  type="url"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  placeholder="https://x.com/shopkart"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2 text-xs text-neutral-100 focus:outline-none focus:border-amber-500/60 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Instagram URL
                </label>
                <input
                  type="url"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="https://instagram.com/shopkart"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2 text-xs text-neutral-100 focus:outline-none focus:border-amber-500/60 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Facebook URL
                </label>
                <input
                  type="url"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  placeholder="https://facebook.com/shopkart"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2 text-xs text-neutral-100 focus:outline-none focus:border-amber-500/60 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  YouTube Channel URL
                </label>
                <input
                  type="url"
                  value={youtube}
                  onChange={(e) => setYoutube(e.target.value)}
                  placeholder="https://youtube.com/@shopkart"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2 text-xs text-neutral-100 focus:outline-none focus:border-amber-500/60 font-mono"
                />
              </div>
            </div>
          </div>

          {/* SEO Defaults */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Globe className="w-4 h-4 text-amber-500" />
              <span>Global Search Engine Optimization (SEO)</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Default Meta Title Tag
              </label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="ShopKart | Curated Deals & Verified Affiliate Store"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-neutral-100 focus:outline-none focus:border-amber-500/60"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Default Meta Description Tag
              </label>
              <textarea
                rows={2}
                value={seoDesc}
                onChange={(e) => setSeoDesc(e.target.value)}
                placeholder="Shop the finest hand-curated trending electronics, fashion, and lifestyle items..."
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2 text-xs text-neutral-100 focus:outline-none focus:border-amber-500/60 resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-neutral-950 font-bold text-xs rounded-xl transition-all shadow-md active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Updating Storefront...' : 'Save Site Settings'}</span>
            </button>
          </div>
        </form>
      ) : (
        /* Admin Profile & Password Change Form */
        <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-6">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-500" />
              <span>Change Admin Credentials</span>
            </h3>
            <p className="text-xs text-neutral-400">
              Passwords are automatically hashed with bcrypt before saving to database. Plaintext passwords are never stored.
            </p>
          </div>

          {credSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{credSuccess}</span>
            </div>
          )}

          {credError && (
            <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{credError}</span>
            </div>
          )}

          <form onSubmit={handleUpdateCredentials} className="space-y-4 max-w-md">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Current Password <span className="text-amber-500">* (required to verify)</span>
              </label>
              <div className="relative">
                <input
                  type={showCurrentPass ? 'text' : 'password'}
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password (default: password123)"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-4 pr-10 py-2.5 text-xs text-neutral-100 font-mono focus:outline-none focus:border-amber-500/60"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPass(!showCurrentPass)}
                  className="p-1.5 text-neutral-500 hover:text-neutral-300 absolute right-2.5 top-1/2 -translate-y-1/2"
                >
                  {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Admin Username
              </label>
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="admin"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-neutral-100 focus:outline-none focus:border-amber-500/60"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                New Password (leave blank to keep current)
              </label>
              <div className="relative">
                <input
                  type={showNewPass ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New strong password"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-4 pr-10 py-2.5 text-xs text-neutral-100 font-mono focus:outline-none focus:border-amber-500/60"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPass(!showNewPass)}
                  className="p-1.5 text-neutral-500 hover:text-neutral-300 absolute right-2.5 top-1/2 -translate-y-1/2"
                >
                  {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {newPassword && (
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-neutral-100 font-mono focus:outline-none focus:border-amber-500/60"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={credSaving}
              className="py-2.5 px-5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-neutral-950 font-bold text-xs rounded-xl transition-all shadow-md active:scale-95"
            >
              {credSaving ? 'Updating Credentials...' : 'Save New Credentials'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
