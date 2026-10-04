import React, { useState, useEffect } from 'react';
import { HeroSlide } from '../../types/index.ts';
import { useAdminAuth } from '../../context/AdminAuthContext.tsx';
import { useStore } from '../../context/StoreContext.tsx';
import {
  Plus,
  Edit,
  Trash2,
  Upload,
  ArrowUp,
  ArrowDown,
  X,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

export const AdminHeroSlides: React.FC = () => {
  const { authFetch } = useAdminAuth();
  const { showToast } = useStore();

  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [ctaText, setCtaText] = useState('Shop Now');
  const [ctaUrl, setCtaUrl] = useState('/shop');
  const [displayOrder, setDisplayOrder] = useState<number>(1);
  const [status, setStatus] = useState<'active' | 'inactive'>('active');

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSlides = async () => {
    setLoading(true);
    try {
      const res = await authFetch('/api/admin/hero-slides');
      if (res.ok) {
        const data = await res.json();
        setSlides(data);
      }
    } catch (err) {
      console.error('Failed to load slides', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSlides();
  }, []);

  const openAddModal = () => {
    setEditingSlide(null);
    setTitle('');
    setDescription('');
    setImageUrl('');
    setCtaText('Shop Now');
    setCtaUrl('/shop');
    setDisplayOrder(slides.length + 1);
    setStatus('active');
    setError(null);
    setModalOpen(true);
  };

  const openEditModal = (slide: HeroSlide) => {
    setEditingSlide(slide);
    setTitle(slide.title);
    setDescription(slide.description);
    setImageUrl(slide.image_url);
    setCtaText(slide.cta_text);
    setCtaUrl(slide.cta_url);
    setDisplayOrder(slide.display_order);
    setStatus(slide.status);
    setError(null);
    setModalOpen(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required.');
      return;
    }
    if (!imageUrl.trim()) {
      setError('Slide image URL or file upload is required.');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const url = editingSlide
        ? `/api/admin/hero-slides/${editingSlide.id}`
        : '/api/admin/hero-slides';
      const method = editingSlide ? 'PUT' : 'POST';

      const res = await authFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          image_url: imageUrl.trim(),
          cta_text: ctaText.trim() || 'Shop Now',
          cta_url: ctaUrl.trim() || '/shop',
          display_order: Number(displayOrder),
          status,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to save slide');
        return;
      }

      showToast(editingSlide ? 'Slide updated' : 'Hero slide created');
      setModalOpen(false);
      loadSlides();
    } catch {
      setError('Connection error saving hero slide');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = async (slide: HeroSlide) => {
    const nextStatus = slide.status === 'active' ? 'inactive' : 'active';
    try {
      const res = await authFetch(`/api/admin/hero-slides/${slide.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (res.ok) {
        setSlides((prev) =>
          prev.map((s) => (s.id === slide.id ? { ...s, status: nextStatus } : s))
        );
        showToast(`Slide set to ${nextStatus}`);
      }
    } catch {
      showToast('Failed to toggle slide status', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this hero slide?')) return;
    try {
      const res = await authFetch(`/api/admin/hero-slides/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setSlides((prev) => prev.filter((s) => s.id !== id));
        showToast('Hero slide removed');
      }
    } catch {
      showToast('Failed to delete slide', 'error');
    }
  };

  const handleMoveOrder = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= slides.length) return;

    const currentSlide = slides[index];
    const targetSlide = slides[targetIndex];

    const currentOrder = currentSlide.display_order;
    const targetOrder = targetSlide.display_order;

    try {
      await Promise.all([
        authFetch(`/api/admin/hero-slides/${currentSlide.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ display_order: targetOrder }),
        }),
        authFetch(`/api/admin/hero-slides/${targetSlide.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ display_order: currentOrder }),
        }),
      ]);
      loadSlides();
      showToast('Slide order updated');
    } catch {
      showToast('Failed to update slide order', 'error');
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight">
            Hero Slider Management
          </h1>
          <p className="mt-1 text-xs text-neutral-400">
            Control the homepage carousel banners, promotional headlines, CTA buttons, and slide sequence.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl transition-all shadow-md active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add Hero Slide</span>
        </button>
      </div>

      {/* Slides Grid / List */}
      <div className="space-y-4">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 rounded-2xl bg-neutral-900/60 animate-pulse" />
            ))}
          </div>
        ) : slides.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-neutral-900/40 border border-neutral-800 text-neutral-500">
            No hero slides created yet. Add one above.
          </div>
        ) : (
          slides.map((slide, idx) => (
            <div
              key={slide.id}
              className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-neutral-700 transition-colors"
            >
              <div className="flex items-center gap-4 min-w-0 flex-1">
                {/* Reorder Buttons */}
                <div className="flex flex-col gap-1 text-neutral-500">
                  <button
                    disabled={idx === 0}
                    onClick={() => handleMoveOrder(idx, 'up')}
                    className="p-1 hover:text-white disabled:opacity-30"
                    title="Move Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    disabled={idx === slides.length - 1}
                    onClick={() => handleMoveOrder(idx, 'down')}
                    className="p-1 hover:text-white disabled:opacity-30"
                    title="Move Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Thumbnail */}
                <img
                  src={slide.image_url}
                  alt={slide.title}
                  referrerPolicy="no-referrer"
                  className="w-24 h-16 rounded-xl object-cover bg-neutral-950 shrink-0"
                />

                {/* Details */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold text-amber-500">
                      Order #{slide.display_order}
                    </span>
                    <button
                      onClick={() => handleToggleStatus(slide)}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        slide.status === 'active'
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
                      }`}
                    >
                      {slide.status}
                    </button>
                  </div>
                  <h3 className="font-bold text-white text-sm truncate mt-1">
                    {slide.title}
                  </h3>
                  <p className="text-xs text-neutral-400 truncate max-w-lg">
                    {slide.description}
                  </p>
                </div>
              </div>

              {/* CTA link & Actions */}
              <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                <span className="text-xs text-neutral-400 bg-neutral-950 px-3 py-1.5 rounded-lg border border-neutral-800">
                  CTA: <strong className="text-white">{slide.cta_text}</strong> ({slide.cta_url})
                </span>

                <button
                  onClick={() => openEditModal(slide)}
                  className="p-2 text-neutral-400 hover:text-amber-400 rounded-lg hover:bg-neutral-800 transition-colors"
                  title="Edit Slide"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(slide.id)}
                  className="p-2 text-neutral-400 hover:text-rose-400 rounded-lg hover:bg-neutral-800 transition-colors"
                  title="Delete Slide"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg p-6 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="text-base font-bold text-white">
                {editingSlide ? 'Edit Hero Slide' : 'Add Hero Slide'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Headline Title <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Upgrade Your Shopping Experience"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500/60"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Sub-description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short engaging paragraph for banner..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500/60 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Background Banner Image <span className="text-amber-500">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://... or upload local image file"
                    className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500/60"
                  />
                  <label className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-xl cursor-pointer flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    CTA Button Label
                  </label>
                  <input
                    type="text"
                    value={ctaText}
                    onChange={(e) => setCtaText(e.target.value)}
                    placeholder="Shop Now"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2 text-xs text-neutral-100 focus:outline-none focus:border-amber-500/60"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    CTA Target URL
                  </label>
                  <input
                    type="text"
                    value={ctaUrl}
                    onChange={(e) => setCtaUrl(e.target.value)}
                    placeholder="/shop"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2 text-xs text-neutral-100 font-mono focus:outline-none focus:border-amber-500/60"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Display Sequence Order
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2 text-xs text-neutral-100 font-mono focus:outline-none focus:border-amber-500/60"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2 text-xs text-neutral-200"
                  >
                    <option value="active">Active (Visible)</option>
                    <option value="inactive">Inactive (Draft)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-neutral-950 font-bold text-xs rounded-xl transition-all shadow-md"
                >
                  {saving ? 'Saving...' : 'Save Hero Slide'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
