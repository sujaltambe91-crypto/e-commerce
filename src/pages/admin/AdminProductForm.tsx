import React, { useState, useEffect } from 'react';
import { Product } from '../../types/index.ts';
import { useAdminAuth } from '../../context/AdminAuthContext.tsx';
import { useStore } from '../../context/StoreContext.tsx';
import { navigateTo } from '../../lib/router.ts';
import {
  ArrowLeft,
  Upload,
  Link,
  Plus,
  Trash2,
  Sparkles,
  ExternalLink,
  AlertCircle,
  Check,
  Image as ImageIcon,
  Cpu,
  Monitor,
  Camera,
  BatteryCharging,
  Wifi,
  Terminal,
  Maximize2,
  ShieldCheck,
  Truck,
  PackageCheck,
  CreditCard,
  Tag,
} from 'lucide-react';

interface AdminProductFormProps {
  productId?: string;
}

export const AdminProductForm: React.FC<AdminProductFormProps> = ({ productId }) => {
  const { authFetch } = useAdminAuth();
  const { categories, settings, showToast } = useStore();

  const isEdit = Boolean(productId);

  // 1. PRODUCT BASIC
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [brand, setBrand] = useState('Apple');
  const [categoryId, setCategoryId] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  const [newAddImageUrl, setNewAddImageUrl] = useState('');
  const [has3DModel, setHas3DModel] = useState(true);
  const [model3DType, setModel3DType] = useState<'smartphone' | 'laptop' | 'tv' | 'headphones' | 'pc'>('smartphone');

  // 2. PRICING
  const [price, setPrice] = useState<string>('');
  const [originalPrice, setOriginalPrice] = useState<string>('');
  const [emiStartsAt, setEmiStartsAt] = useState<string>('');
  const [offersInput, setOffersInput] = useState<string>('');
  const [amazonAffiliateUrl, setAmazonAffiliateUrl] = useState('');

  // 3. HARDWARE
  const [processor, setProcessor] = useState('');
  const [ram, setRam] = useState('');
  const [storage, setStorage] = useState('');
  const [graphics, setGraphics] = useState('');
  const [motherboard, setMotherboard] = useState('');

  // 4. DISPLAY
  const [screenSize, setScreenSize] = useState('');
  const [resolution, setResolution] = useState('');
  const [panelType, setPanelType] = useState('');
  const [refreshRate, setRefreshRate] = useState('');
  const [hdr, setHdr] = useState('');

  // 5. CAMERA
  const [frontCamera, setFrontCamera] = useState('');
  const [rearCamera, setRearCamera] = useState('');
  const [videoResolution, setVideoResolution] = useState('');
  const [cameraFeatures, setCameraFeatures] = useState('');

  // 6. BATTERY
  const [batteryCapacity, setBatteryCapacity] = useState('');
  const [charging, setCharging] = useState('');
  const [batteryLife, setBatteryLife] = useState('');

  // 7. CONNECTIVITY
  const [wifi, setWifi] = useState('');
  const [bluetooth, setBluetooth] = useState('');
  const [usb, setUsb] = useState('');
  const [hdmi, setHdmi] = useState('');
  const [otherPorts, setOtherPorts] = useState('');

  // 8. SOFTWARE
  const [os, setOs] = useState('');
  const [osVersion, setOsVersion] = useState('');

  // 9. PHYSICAL & VARIANTS
  const [dimensions, setDimensions] = useState('');
  const [weight, setWeight] = useState('');
  const [material, setMaterial] = useState('');
  const [colorsInput, setColorsInput] = useState('');
  const [sizesInput, setSizesInput] = useState('');
  const [modelsInput, setModelsInput] = useState('');

  // 10. INVENTORY, WARRANTY, STOCK, DELIVERY, DESCRIPTION
  const [sku, setSku] = useState('');
  const [warrantyInfo, setWarrantyInfo] = useState('1 Year Official Brand Warranty');
  const [stockStatus, setStockStatus] = useState<'in_stock' | 'low_stock' | 'out_of_stock'>('in_stock');
  const [stockQuantity, setStockQuantity] = useState('45');
  const [deliveryInfo, setDeliveryInfo] = useState('Express Delivery by Tomorrow 10:00 AM');
  const [shippingCost, setShippingCost] = useState('FREE Express Delivery');
  const [returnPeriod, setReturnPeriod] = useState('7-Day Replacement Guarantee');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState<'active' | 'inactive'>('active');

  const [activeTab, setActiveTab] = useState<'general' | 'pricing' | 'hardware' | 'display' | 'camera' | 'battery' | 'connectivity' | 'software' | 'physical' | 'delivery'>('general');

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [error, setError] = useState<string | null>(null);

  // Default category
  useEffect(() => {
    if (!categoryId && categories.length > 0) {
      setCategoryId(categories[0].id);
    }
  }, [categories, categoryId]);

  // Load product if editing
  useEffect(() => {
    if (!productId) return;
    const loadProd = async () => {
      setFetching(true);
      try {
        const res = await authFetch(`/api/admin/products`);
        if (res.ok) {
          const list: Product[] = await res.json();
          const target = list.find((p) => p.id === productId);
          if (target) {
            setName(target.name);
            setSlug(target.slug);
            setBrand(target.brand || 'Apple');
            setCategoryId(target.category_id);
            setSubCategory(target.subcategory || '');
            setPrice(target.price !== undefined ? String(target.price) : '');
            setOriginalPrice(target.original_price !== undefined ? String(target.original_price) : '');
            setEmiStartsAt(target.emi_starts_at ? String(target.emi_starts_at) : '');
            setOffersInput(target.offers ? target.offers.join('\n') : '');
            setAmazonAffiliateUrl(target.amazon_affiliate_url || target.affiliate_url || '');
            setImageUrl(target.image_url);
            setAdditionalImages(target.additional_images || []);
            setHas3DModel(target.has_3d_model !== false);
            setModel3DType(target.model_3d_type || 'smartphone');

            // Specs
            const sp = target.specs || {};
            setProcessor(String(sp.processor || target.hardware?.processor || ''));
            setRam(String(sp.ram || target.hardware?.ram || (target.ram_options ? target.ram_options.join(', ') : '')));
            setStorage(String(sp.storage || target.hardware?.storage || (target.storage_options ? target.storage_options.join(', ') : '')));
            setGraphics(String(sp.graphics || target.hardware?.graphics || ''));
            setMotherboard(String(sp.motherboard || target.hardware?.motherboard || ''));

            setScreenSize(String(sp.screen_size || target.display?.screen_size || ''));
            setResolution(String(sp.resolution || target.display?.resolution || ''));
            setPanelType(String(sp.panel_type || target.display?.panel_type || ''));
            setRefreshRate(String(sp.refresh_rate || target.display?.refresh_rate || ''));
            setHdr(String(sp.hdr || target.display?.hdr || ''));

            setFrontCamera(String(sp.front_camera || target.camera?.front_camera || ''));
            setRearCamera(String(sp.rear_camera || sp.camera || target.camera?.rear_camera || ''));
            setVideoResolution(String(sp.video_resolution || target.camera?.video_resolution || ''));
            setCameraFeatures(String(sp.camera_features || target.camera?.features || ''));

            setBatteryCapacity(String(sp.capacity || sp.battery || target.battery?.capacity || ''));
            setCharging(String(sp.charging || target.battery?.charging || ''));
            setBatteryLife(String(sp.battery_life || target.battery?.battery_life || ''));

            setWifi(String(sp.wifi || target.connectivity?.wifi || ''));
            setBluetooth(String(sp.bluetooth || target.connectivity?.bluetooth || ''));
            setUsb(String(sp.usb || target.connectivity?.usb || ''));
            setHdmi(String(sp.hdmi || target.connectivity?.hdmi || ''));
            setOtherPorts(String(sp.ports || sp.other_ports || target.connectivity?.other_ports || ''));

            setOs(String(sp.os || target.software?.os || ''));
            setOsVersion(String(sp.version || target.software?.version || ''));

            setDimensions(String(sp.dimensions || target.physical?.dimensions || ''));
            setWeight(String(sp.weight || target.physical?.weight || ''));
            setMaterial(target.material || (sp.material as string) || '');
            setColorsInput(
              (target.color_options && target.color_options.join(', ')) ||
              (target.physical?.colors && target.physical.colors.join(', ')) ||
              ''
            );
            setSizesInput(target.size_options ? target.size_options.join(', ') : '');
            setModelsInput(target.model_options ? target.model_options.join(', ') : '');

            setSku(target.sku || '');
            setWarrantyInfo(target.warranty || target.warranty_info || '1 Year Official Brand Warranty');
            setStockStatus(target.stock_status || 'in_stock');
            setStockQuantity(String(target.stock_quantity ?? target.stock ?? 45));
            setDeliveryInfo(target.delivery_date || target.delivery_info || 'Express Delivery by Tomorrow 10:00 AM');
            setShippingCost(target.shipping_cost ? String(target.shipping_cost) : 'FREE Express Delivery');
            setReturnPeriod(target.return_period || target.return_policy || '7-Day Replacement Guarantee');
            setShortDescription(target.short_description || '');
            setFullDescription(target.full_description || '');
            setFeatured(target.featured || false);
            setStatus(target.status || 'active');
          } else {
            setError('Product not found to edit.');
          }
        }
      } catch (err) {
        console.error('Error fetching product for edit', err);
      } finally {
        setFetching(false);
      }
    };
    loadProd();
  }, [productId]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    if (!isEdit) {
      setSlug(
        newName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      );
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isMain = true) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be under 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      if (isMain) {
        setImageUrl(base64String);
      } else {
        setAdditionalImages((prev) => [...prev, base64String]);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddImage = () => {
    if (newAddImageUrl.trim()) {
      setAdditionalImages((prev) => [...prev, newAddImageUrl.trim()]);
      setNewAddImageUrl('');
    }
  };

  const handleRemoveAddImage = (index: number) => {
    setAdditionalImages((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Discount calculation
  const numPrice = Number(price) || 0;
  const numOriginal = Number(originalPrice) || 0;
  const calculatedDiscount =
    numPrice && numOriginal && numOriginal > numPrice
      ? Math.round(((numOriginal - numPrice) / numOriginal) * 100)
      : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Product title is required.');
      return;
    }
    if (!categoryId) {
      setError('Please select a category.');
      return;
    }
    if (!amazonAffiliateUrl.trim()) {
      setError('Affiliate destination URL is required.');
      return;
    }

    // Build unified specs object
    const specsObj: Record<string, string> = {
      processor: processor.trim(),
      ram: ram.trim(),
      storage: storage.trim(),
      graphics: graphics.trim(),
      motherboard: motherboard.trim(),

      screen_size: screenSize.trim(),
      resolution: resolution.trim(),
      panel_type: panelType.trim(),
      refresh_rate: refreshRate.trim(),
      hdr: hdr.trim(),

      front_camera: frontCamera.trim(),
      rear_camera: rearCamera.trim(),
      video_resolution: videoResolution.trim(),
      camera_features: cameraFeatures.trim(),

      capacity: batteryCapacity.trim(),
      charging: charging.trim(),
      battery_life: batteryLife.trim(),

      wifi: wifi.trim(),
      bluetooth: bluetooth.trim(),
      usb: usb.trim(),
      hdmi: hdmi.trim(),
      other_ports: otherPorts.trim(),

      os: os.trim(),
      version: osVersion.trim(),

      dimensions: dimensions.trim(),
      weight: weight.trim(),
    };

    const colorArr = colorsInput
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);

    const offersArr = offersInput
      .split('\n')
      .map((o) => o.trim())
      .filter(Boolean);

    const payload = {
      name: name.trim(),
      slug: slug.trim(),
      brand: brand.trim(),
      category_id: categoryId,
      subcategory: subCategory.trim() || undefined,
      price: numPrice,
      original_price: numOriginal || undefined,
      discount_percentage: calculatedDiscount,
      emi_starts_at: emiStartsAt ? Number(emiStartsAt) : Math.round(numPrice / 12),
      offers: offersArr,
      currency: settings.currency || '₹',
      amazon_affiliate_url: amazonAffiliateUrl.trim(),
      affiliate_url: amazonAffiliateUrl.trim(),
      image_url: imageUrl.trim() || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
      additional_images: additionalImages,
      has_3d_model: has3DModel,
      model_3d_type: model3DType,
      short_description: shortDescription.trim(),
      full_description: fullDescription.trim(),
      featured,
      status,
      sku: sku.trim() || undefined,
      material: material.trim() || undefined,
      stock_status: stockStatus,
      stock_quantity: Number(stockQuantity) || 45,
      warranty: warrantyInfo.trim(),
      warranty_info: warrantyInfo.trim(),
      delivery_date: deliveryInfo.trim(),
      delivery_info: deliveryInfo.trim(),
      shipping_cost: shippingCost.trim() || undefined,
      return_period: returnPeriod.trim() || undefined,
      color_options: colorArr.length > 0 ? colorArr : undefined,
      size_options: sizesInput
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      model_options: modelsInput
        .split(',')
        .map((m) => m.trim())
        .filter(Boolean),
      specs: {
        ...specsObj,
        material: material.trim() || undefined,
      },
    };

    setLoading(true);
    try {
      const url = isEdit ? `/api/admin/products/${productId}` : '/api/admin/products';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await authFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to save product');
        return;
      }

      showToast(isEdit ? 'Product updated successfully' : 'New product created');
      navigateTo('/admin/products');
    } catch {
      setError('Connection error while saving product');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="py-24 text-center text-xs text-neutral-500">
        Loading product data...
      </div>
    );
  }

  const sections = [
    { id: 'general', label: '1. Basic Info & 3D', icon: Sparkles },
    { id: 'pricing', label: '2. Pricing & Offers', icon: CreditCard },
    { id: 'hardware', label: '3. Hardware', icon: Cpu },
    { id: 'display', label: '4. Display', icon: Monitor },
    { id: 'camera', label: '5. Camera', icon: Camera },
    { id: 'battery', label: '6. Battery', icon: BatteryCharging },
    { id: 'connectivity', label: '7. Connectivity', icon: Wifi },
    { id: 'software', label: '8. Software', icon: Terminal },
    { id: 'physical', label: '9. Physical', icon: Maximize2 },
    { id: 'delivery', label: '10. Stock & Warranty', icon: ShieldCheck },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigateTo('/admin/products')}
            className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="font-display text-2xl font-bold text-white tracking-tight">
              {isEdit ? 'Edit Product Architecture' : 'Create New Product'}
            </h1>
            <p className="text-xs text-neutral-400">
              Configure complete hardware, display, camera, battery, and affiliate pricing specifications.
            </p>
          </div>
        </div>

        {/* Quick action buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigateTo('/admin/products')}
            className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-neutral-950 font-extrabold text-xs rounded-xl shadow-lg transition-all"
          >
            {loading ? 'Saving...' : isEdit ? 'Save Changes' : 'Publish Product'}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Navigation tabs for the 10 Sections */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin bg-neutral-900/60 p-2 rounded-2xl border border-neutral-800">
        {sections.map((sec) => {
          const Icon = sec.icon;
          const active = activeTab === sec.id;
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => setActiveTab(sec.id as any)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                active
                  ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/80'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{sec.label}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. BASIC INFORMATION & 3D MODEL */}
        {activeTab === 'general' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/70 border border-neutral-800 space-y-6 animate-in fade-in-50">
            <h3 className="text-sm font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Product Identity & 3D Visualization</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Product Name <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={handleNameChange}
                  placeholder="e.g. Apple iPhone 16 Pro Max (Titanium)"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Brand <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="e.g. Apple, Samsung, Sony, ASUS ROG, Dell"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  URL Slug
                </label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Category <span className="text-amber-500">*</span>
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Sub Category
                </label>
                <input
                  type="text"
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  placeholder="e.g. Flagship Smartphones, Gaming Laptops, OLED TVs"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* 3D Model Configuration */}
            <div className="pt-4 border-t border-neutral-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Maximize2 className="w-4 h-4 text-amber-500" />
                    <span>3D Model & 360° Interactive Inspection</span>
                  </h4>
                  <p className="text-[11px] text-neutral-400">
                    Enable WebGL 3D rendering for this product on the Home Page and Product Detail Page.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={has3DModel}
                  onChange={(e) => setHas3DModel(e.target.checked)}
                  className="w-5 h-5 accent-amber-500 cursor-pointer"
                />
              </div>

              {has3DModel && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-neutral-950/60 p-4 rounded-2xl border border-neutral-800">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      3D Model Archetype
                    </label>
                    <select
                      value={model3DType}
                      onChange={(e) => setModel3DType(e.target.value as any)}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2 text-xs text-white"
                    >
                      <option value="smartphone">Titanium Smartphone (360° & Exploded View)</option>
                      <option value="laptop">Pro Laptop / Ultrabook</option>
                      <option value="tv">4K OLED Curved Display</option>
                      <option value="pc">Liquid-Cooled Desktop Tower</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Product Images */}
            <div className="pt-4 border-t border-neutral-800 space-y-3">
              <label className="block text-xs font-semibold text-neutral-300">
                Primary Product Image URL <span className="text-amber-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
                <label className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold rounded-xl cursor-pointer flex items-center gap-1.5 shrink-0">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, true)}
                    className="hidden"
                  />
                </label>
              </div>

              {imageUrl && (
                <div className="w-24 h-24 rounded-2xl overflow-hidden border border-neutral-700 bg-neutral-950">
                  <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>
        )}

        {/* 2. PRICING & OFFERS */}
        {activeTab === 'pricing' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/70 border border-neutral-800 space-y-6 animate-in fade-in-50">
            <h3 className="text-sm font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              <span>Pricing, EMI & Affiliate Redirect</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  MRP (Original Price in ₹)
                </label>
                <input
                  type="number"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  placeholder="159900"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Selling Price (Offer Price in ₹) <span className="text-amber-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="144900"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Calculated Discount %
                </label>
                <div className="px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs font-mono font-bold text-emerald-400">
                  {calculatedDiscount}% OFF
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Monthly EMI Starts At (₹/month)
                </label>
                <input
                  type="number"
                  value={emiStartsAt}
                  onChange={(e) => setEmiStartsAt(e.target.value)}
                  placeholder="6890"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Amazon / Affiliate Buy Link <span className="text-amber-500">*</span>
                </label>
                <input
                  type="url"
                  required
                  value={amazonAffiliateUrl}
                  onChange={(e) => setAmazonAffiliateUrl(e.target.value)}
                  placeholder="https://amazon.in/dp/B0DFX...&tag=youraffiliate-21"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Bank & Exchange Offers (One offer per line)
                </label>
                <textarea
                  rows={3}
                  value={offersInput}
                  onChange={(e) => setOffersInput(e.target.value)}
                  placeholder="Instant ₹5,000 Discount on HDFC & ICICI Credit Cards&#10;No Cost EMI up to 12 Months&#10;Free 3-Month Apple Music Subscription"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 resize-none font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* 3. HARDWARE SPECIFICATIONS */}
        {activeTab === 'hardware' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/70 border border-neutral-800 space-y-6 animate-in fade-in-50">
            <h3 className="text-sm font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              <span>HARDWARE: Silicon, Memory & Processing</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Processor</label>
                <input
                  type="text"
                  value={processor}
                  onChange={(e) => setProcessor(e.target.value)}
                  placeholder="e.g. Apple A18 Pro 3nm / Snapdragon 8 Elite / M4 Max"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">RAM</label>
                <input
                  type="text"
                  value={ram}
                  onChange={(e) => setRam(e.target.value)}
                  placeholder="e.g. 16GB Unified LPDDR5X"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Storage</label>
                <input
                  type="text"
                  value={storage}
                  onChange={(e) => setStorage(e.target.value)}
                  placeholder="e.g. 512GB NVMe PCIe 4.0 SSD"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Graphics / GPU</label>
                <input
                  type="text"
                  value={graphics}
                  onChange={(e) => setGraphics(e.target.value)}
                  placeholder="e.g. NVIDIA GeForce RTX 4090 16GB GDDR6X"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Motherboard / Chipset</label>
                <input
                  type="text"
                  value={motherboard}
                  onChange={(e) => setMotherboard(e.target.value)}
                  placeholder="e.g. Custom High-Thermal Efficiency Substrate"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* 4. DISPLAY SPECIFICATIONS */}
        {activeTab === 'display' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/70 border border-neutral-800 space-y-6 animate-in fade-in-50">
            <h3 className="text-sm font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <Monitor className="w-4 h-4" />
              <span>DISPLAY: Screen, Resolution & Panel</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Screen Size</label>
                <input
                  type="text"
                  value={screenSize}
                  onChange={(e) => setScreenSize(e.target.value)}
                  placeholder="e.g. 6.9-inch / 16.2-inch / 65-inch"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Resolution</label>
                <input
                  type="text"
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value)}
                  placeholder="e.g. 2868 x 1320 pixels at 460 ppi"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Panel Type</label>
                <input
                  type="text"
                  value={panelType}
                  onChange={(e) => setPanelType(e.target.value)}
                  placeholder="e.g. Super Retina XDR OLED / Mini-LED / Fast-IPS"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Refresh Rate</label>
                <input
                  type="text"
                  value={refreshRate}
                  onChange={(e) => setRefreshRate(e.target.value)}
                  placeholder="e.g. 120Hz ProMotion / 240Hz Gaming"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-neutral-300 mb-1">HDR Certification</label>
                <input
                  type="text"
                  value={hdr}
                  onChange={(e) => setHdr(e.target.value)}
                  placeholder="e.g. Dolby Vision, HDR10+, 2000 nits Peak Brightness"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* 5. CAMERA */}
        {activeTab === 'camera' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/70 border border-neutral-800 space-y-6 animate-in fade-in-50">
            <h3 className="text-sm font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <Camera className="w-4 h-4" />
              <span>CAMERA: Optics, Lenses & Video Modes</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Front Camera</label>
                <input
                  type="text"
                  value={frontCamera}
                  onChange={(e) => setFrontCamera(e.target.value)}
                  placeholder="e.g. 12MP TrueDepth Camera with Autofocus"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Rear Camera System</label>
                <input
                  type="text"
                  value={rearCamera}
                  onChange={(e) => setRearCamera(e.target.value)}
                  placeholder="e.g. 48MP Fusion + 48MP Ultra-Wide + 12MP 5x Telephoto"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Video Resolution</label>
                <input
                  type="text"
                  value={videoResolution}
                  onChange={(e) => setVideoResolution(e.target.value)}
                  placeholder="e.g. 4K 120 fps Dolby Vision, ProRes LOG"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Camera Features</label>
                <input
                  type="text"
                  value={cameraFeatures}
                  onChange={(e) => setCameraFeatures(e.target.value)}
                  placeholder="e.g. Optical Image Stabilization, Night Mode, Macro"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* 6. BATTERY */}
        {activeTab === 'battery' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/70 border border-neutral-800 space-y-6 animate-in fade-in-50">
            <h3 className="text-sm font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <BatteryCharging className="w-4 h-4" />
              <span>BATTERY: Capacity, Charging & Endurance</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Capacity</label>
                <input
                  type="text"
                  value={batteryCapacity}
                  onChange={(e) => setBatteryCapacity(e.target.value)}
                  placeholder="e.g. 4,685 mAh / 99.6 Wh"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Charging Standard</label>
                <input
                  type="text"
                  value={charging}
                  onChange={(e) => setCharging(e.target.value)}
                  placeholder="e.g. 45W Fast Wired + 25W MagSafe"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Battery Life</label>
                <input
                  type="text"
                  value={batteryLife}
                  onChange={(e) => setBatteryLife(e.target.value)}
                  placeholder="e.g. Up to 33 hours video playback"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* 7. CONNECTIVITY */}
        {activeTab === 'connectivity' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/70 border border-neutral-800 space-y-6 animate-in fade-in-50">
            <h3 className="text-sm font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <Wifi className="w-4 h-4" />
              <span>CONNECTIVITY: Wi-Fi, Bluetooth & Port Interfaces</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Wi-Fi</label>
                <input
                  type="text"
                  value={wifi}
                  onChange={(e) => setWifi(e.target.value)}
                  placeholder="e.g. Wi-Fi 7 (802.11be) with 2x2 MIMO"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Bluetooth</label>
                <input
                  type="text"
                  value={bluetooth}
                  onChange={(e) => setBluetooth(e.target.value)}
                  placeholder="e.g. Bluetooth 5.4 LE Audio"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">USB</label>
                <input
                  type="text"
                  value={usb}
                  onChange={(e) => setUsb(e.target.value)}
                  placeholder="e.g. USB-C (Thunderbolt 4 up to 40Gbps)"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">HDMI</label>
                <input
                  type="text"
                  value={hdmi}
                  onChange={(e) => setHdmi(e.target.value)}
                  placeholder="e.g. HDMI 2.1 (4K 144Hz support)"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Other Ports</label>
                <input
                  type="text"
                  value={otherPorts}
                  onChange={(e) => setOtherPorts(e.target.value)}
                  placeholder="e.g. SDXC card slot, 3.5mm headphone jack, Ethernet RJ45"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* 8. SOFTWARE */}
        {activeTab === 'software' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/70 border border-neutral-800 space-y-6 animate-in fade-in-50">
            <h3 className="text-sm font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span>SOFTWARE: Operating System & Update Support</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Operating System</label>
                <input
                  type="text"
                  value={os}
                  onChange={(e) => setOs(e.target.value)}
                  placeholder="e.g. iOS 18 / macOS Sequoia / Windows 11 Pro"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Version & Roadmap</label>
                <input
                  type="text"
                  value={osVersion}
                  onChange={(e) => setOsVersion(e.target.value)}
                  placeholder="e.g. Version 2026 with 7 Years Guaranteed Security Updates"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* 9. PHYSICAL & VARIANTS */}
        {activeTab === 'physical' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#111F33] border border-[#2563EB]/30 space-y-6 animate-in fade-in-50">
            <h3 className="text-sm font-extrabold text-[#06B6D4] uppercase tracking-wider flex items-center gap-2">
              <Maximize2 className="w-4 h-4 text-[#06B6D4]" />
              <span>PHYSICAL & VARIANTS: Material, Dimensions, Weight, Sizes, Colors & Models</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Chassis Material</label>
                <input
                  type="text"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  placeholder="e.g. Grade 5 Aerospace Titanium & Ceramic Shield"
                  className="w-full bg-[#0D1B2A] border border-[#2563EB]/30 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#06B6D4]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Dimensions</label>
                <input
                  type="text"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  placeholder="e.g. 163.0 x 77.6 x 8.25 mm"
                  className="w-full bg-[#0D1B2A] border border-[#2563EB]/30 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#06B6D4]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Weight</label>
                <input
                  type="text"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g. 227 grams / 1.6 kg"
                  className="w-full bg-[#0D1B2A] border border-[#2563EB]/30 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#06B6D4]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Size Options (Comma-separated)
                </label>
                <input
                  type="text"
                  value={sizesInput}
                  onChange={(e) => setSizesInput(e.target.value)}
                  placeholder="e.g. 6.9-inch OLED, 6.3-inch OLED, 16-inch Display, 55-inch"
                  className="w-full bg-[#0D1B2A] border border-[#2563EB]/30 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#06B6D4]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Model Editions (Comma-separated)
                </label>
                <input
                  type="text"
                  value={modelsInput}
                  onChange={(e) => setModelsInput(e.target.value)}
                  placeholder="e.g. Wi-Fi + Cellular (5G), Wi-Fi Only, Pro Max Edition"
                  className="w-full bg-[#0D1B2A] border border-[#2563EB]/30 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#06B6D4]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Color Options (Comma-separated)
                </label>
                <input
                  type="text"
                  value={colorsInput}
                  onChange={(e) => setColorsInput(e.target.value)}
                  placeholder="e.g. Natural Titanium, Black Titanium, White Titanium, Desert Titanium"
                  className="w-full bg-[#0D1B2A] border border-[#2563EB]/30 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#06B6D4]"
                />
              </div>
            </div>
          </div>
        )}

        {/* 10. STOCK, SKU, WARRANTY & DELIVERY */}
        {activeTab === 'delivery' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#111F33] border border-[#2563EB]/30 space-y-6 animate-in fade-in-50">
            <h3 className="text-sm font-extrabold text-[#06B6D4] uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#06B6D4]" />
              <span>Inventory (SKU, Stock), Delivery & Official Warranty</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Product SKU Code</label>
                <input
                  type="text"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  placeholder="e.g. ELC-APL-16PM-256"
                  className="w-full bg-[#0D1B2A] border border-[#2563EB]/30 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#06B6D4]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Stock Status</label>
                <select
                  value={stockStatus}
                  onChange={(e) => setStockStatus(e.target.value as any)}
                  className="w-full bg-[#0D1B2A] border border-[#2563EB]/30 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#06B6D4]"
                >
                  <option value="in_stock">In Stock (Available)</option>
                  <option value="low_stock">Low Stock (Limited Units)</option>
                  <option value="out_of_stock">Out of Stock</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Stock Quantity</label>
                <input
                  type="number"
                  value={stockQuantity}
                  onChange={(e) => setStockQuantity(e.target.value)}
                  className="w-full bg-[#0D1B2A] border border-[#2563EB]/30 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#06B6D4]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Official Brand Warranty</label>
                <input
                  type="text"
                  value={warrantyInfo}
                  onChange={(e) => setWarrantyInfo(e.target.value)}
                  placeholder="1 Year Official Brand Warranty with Doorstep Service"
                  className="w-full bg-[#0D1B2A] border border-[#2563EB]/30 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#06B6D4]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Delivery Timeframe</label>
                <input
                  type="text"
                  value={deliveryInfo}
                  onChange={(e) => setDeliveryInfo(e.target.value)}
                  placeholder="Express Delivery by Tomorrow 11:00 AM"
                  className="w-full bg-[#0D1B2A] border border-[#2563EB]/30 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#06B6D4]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Shipping Cost</label>
                <input
                  type="text"
                  value={shippingCost}
                  onChange={(e) => setShippingCost(e.target.value)}
                  placeholder="FREE Express Delivery"
                  className="w-full bg-[#0D1B2A] border border-[#2563EB]/30 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#06B6D4]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Return Period & Policy</label>
                <input
                  type="text"
                  value={returnPeriod}
                  onChange={(e) => setReturnPeriod(e.target.value)}
                  placeholder="7-Day Replacement Guarantee with doorstep pickup"
                  className="w-full bg-[#0D1B2A] border border-[#2563EB]/30 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#06B6D4]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Short Description</label>
                <input
                  type="text"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Brief one-sentence elevator pitch..."
                  className="w-full bg-[#0D1B2A] border border-[#2563EB]/30 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#06B6D4]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Full Description</label>
                <textarea
                  rows={4}
                  value={fullDescription}
                  onChange={(e) => setFullDescription(e.target.value)}
                  placeholder="Comprehensive technical writeup and customer benefits..."
                  className="w-full bg-[#0D1B2A] border border-[#2563EB]/30 rounded-xl p-3 text-xs text-white resize-none focus:outline-none focus:border-[#06B6D4]"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-neutral-200">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-4 h-4 accent-[#2563EB] rounded cursor-pointer"
                  />
                  <span>Mark as Featured Product</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-neutral-200">
                  <input
                    type="checkbox"
                    checked={status === 'active'}
                    onChange={(e) => setStatus(e.target.checked ? 'active' : 'inactive')}
                    className="w-4 h-4 accent-[#22C55E] rounded cursor-pointer"
                  />
                  <span>Active & Live in Storefront</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Footer save strip */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>All 10 hardware sections mapped to database schema</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-neutral-950 font-black text-xs rounded-xl shadow-xl transition-all"
          >
            {loading ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
};
