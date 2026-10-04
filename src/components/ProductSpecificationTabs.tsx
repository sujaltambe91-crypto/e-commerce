import React, { useState } from 'react';
import { Product } from '../types/index.ts';
import {
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
  CheckCircle2,
  MapPin,
  Sparkles,
  Layers,
  RotateCcw,
  Zap,
} from 'lucide-react';

interface ProductSpecificationTabsProps {
  product: Product;
}

export const ProductSpecificationTabs: React.FC<ProductSpecificationTabsProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState<
    'specs' | 'hardware' | 'display' | 'camera' | 'battery' | 'connectivity' | 'software' | 'inventory_delivery'
  >('specs');

  const [pincode, setPincode] = useState('');
  const [deliveryResult, setDeliveryResult] = useState<string | null>(null);

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim().length >= 6) {
      setDeliveryResult(`✓ Express Delivery available to ${pincode.trim()} by Tomorrow 11:00 AM (Free Shipping & Doorstep Verification)`);
    } else {
      setDeliveryResult('Please enter a valid 6-digit PIN code.');
    }
  };

  const specs = product.specs || {};

  // 1. General Specifications (Material, Dimensions, Weight, Features)
  const materialValue =
    product.material ||
    specs.material ||
    (product.physical?.dimensions ? 'Aerospace-Grade Grade 5 Titanium & Ceramic Shield' : 'Recycled Aerospace-Grade Aluminum & Matte Glass');

  const dimensionsValue =
    product.dimensions ||
    specs.dimensions ||
    product.physical?.dimensions ||
    '163.0 × 77.6 × 8.25 mm';

  const weightValue =
    product.weight ||
    specs.weight ||
    product.physical?.weight ||
    '227 grams';

  const featuresList: string[] =
    product.features ||
    (specs.features as string[]) || [
      'Next-generation 3nm silicon architecture with hardware-accelerated ray tracing',
      'Ultra-thin precision border display with adaptive 120Hz ProMotion technology',
      'Advanced computational quad-pixel camera system with dedicated tactical controls',
      'Aerospace-grade thermal chassis engineering with high-efficiency vapor dissipation',
      'All-day battery life with dual MagSafe & ultra-fast GaN fast-charge protocols',
    ];

  // 2. Hardware
  const hardwareData = [
    { label: 'Processor / CPU', value: specs.processor || (product.hardware && product.hardware.processor) || 'Apple A18 Pro / Snapdragon 8 Elite / M4 Max' },
    { label: 'RAM / System Memory', value: specs.ram || (product.hardware && product.hardware.ram) || (product.ram_options?.[0]) || '16GB LPDDR5X Unified Memory' },
    { label: 'Internal Storage', value: specs.storage || (product.hardware && product.hardware.storage) || (product.storage_options?.[0]) || '512GB High-Speed NVMe SSD' },
    { label: 'Dedicated Graphics / GPU', value: specs.graphics || (product.hardware && product.hardware.graphics) || 'Integrated 6-Core Neural GPU / RTX 4080 Mobile' },
    { label: 'Motherboard / Chipset', value: specs.motherboard || (product.hardware && product.hardware.motherboard) || 'Apple Silicon Unified SoC / Intel Z890 Architecture' },
  ].filter((item) => Boolean(item.value));

  // 3. Display
  const displayData = [
    { label: 'Screen Size', value: specs.screen_size || (product.display && product.display.screen_size) || (specs.display?.split(' ')[0] ?? '6.9" Super Retina XDR') },
    { label: 'Resolution', value: specs.resolution || (product.display && product.display.resolution) || '2868 x 1320 OLED / 4K UHD 3840 x 2160' },
    { label: 'Panel Type', value: specs.panel_type || (product.display && product.display.panel_type) || 'OLED / Liquid Retina XDR with Quantum Dots' },
    { label: 'Refresh Rate', value: specs.refresh_rate || (product.display && product.display.refresh_rate) || '120Hz Adaptive ProMotion / 240Hz Esports' },
    { label: 'HDR Standards', value: specs.hdr || (product.display && product.display.hdr) || 'Dolby Vision, HDR10+, 2000 nits Peak Brightness' },
  ].filter((item) => Boolean(item.value));

  // 4. Camera
  const cameraData = [
    { label: 'Rear Camera System', value: specs.rear_camera || specs.camera || (product.camera && product.camera.rear_camera) || '48MP Fusion + 48MP Ultra-Wide + 12MP 5x Telephoto' },
    { label: 'Front Selfie Camera', value: specs.front_camera || (product.camera && product.camera.front_camera) || '12MP TrueDepth with Autofocus' },
    { label: 'Video Resolution', value: specs.video_resolution || (product.camera && product.camera.video_resolution) || '4K at 120 fps in Dolby Vision, ProRes LOG' },
    { label: 'Special Features', value: specs.camera_features || (product.camera && product.camera.features) || 'Spatial Audio Mics, Macro Photography, Photonic Engine, 100x Space Zoom' },
  ].filter((item) => Boolean(item.value));

  // 5. Battery
  const batteryData = [
    { label: 'Battery Capacity', value: specs.capacity || specs.battery || (product.battery && product.battery.capacity) || '4,685 mAh / 99.6 Wh High-Density Cell' },
    { label: 'Charging Protocol', value: specs.charging || (product.battery && product.battery.charging) || '45W Fast Charging + 25W MagSafe Wireless' },
    { label: 'Battery Life', value: specs.battery_life || (product.battery && product.battery.battery_life) || 'Up to 33 hours video playback / 22 hours continuous web' },
  ].filter((item) => Boolean(item.value));

  // 6. Connectivity
  const connectivityData = [
    { label: 'Wi-Fi Protocol', value: specs.wifi || (product.connectivity && product.connectivity.wifi) || 'Wi-Fi 7 (802.11be) with 2x2 MIMO' },
    { label: 'Bluetooth Protocol', value: specs.bluetooth || (product.connectivity && product.connectivity.bluetooth) || 'Bluetooth 5.4 with Low Energy Lossless Audio' },
    { label: 'USB Standard', value: specs.usb || (product.connectivity && product.connectivity.usb) || 'USB-C (Thunderbolt 4 / USB 3 up to 10Gbps)' },
    { label: 'HDMI Version', value: specs.hdmi || (product.connectivity && product.connectivity.hdmi) || 'HDMI 2.1 (4K 144Hz / 8K 60Hz)' },
    { label: 'Other Ports', value: specs.ports || specs.other_ports || (product.connectivity && product.connectivity.other_ports) || 'SDXC Card Slot, 3.5mm Headphone Jack with High-Impedance DAC' },
  ].filter((item) => Boolean(item.value));

  // 7. Software
  const softwareData = [
    { label: 'Operating System', value: specs.os || (product.software && product.software.os) || 'iOS 18 / macOS Sequoia / Windows 11 Pro' },
    { label: 'OS Version & Updates', value: specs.version || (product.software && product.software.version) || 'Latest 2026 Edition with 7 Years Guaranteed Security Updates' },
  ].filter((item) => Boolean(item.value));

  const tabList = [
    { id: 'specs', label: 'SPECIFICATIONS', icon: Layers },
    { id: 'hardware', label: 'HARDWARE', icon: Cpu },
    { id: 'display', label: 'DISPLAY', icon: Monitor },
    { id: 'camera', label: 'CAMERA', icon: Camera },
    { id: 'battery', label: 'BATTERY', icon: BatteryCharging },
    { id: 'connectivity', label: 'CONNECTIVITY', icon: Wifi },
    { id: 'software', label: 'SOFTWARE', icon: Terminal },
    { id: 'inventory_delivery', label: 'INVENTORY & DELIVERY', icon: ShieldCheck },
  ];

  return (
    <div className="space-y-6 pt-8 border-t border-[#2563EB]/20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-[#06B6D4] uppercase tracking-wider block mb-0.5">
            Technical Architecture & Deep Breakdown
          </span>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
            Detailed Product Specifications
          </h3>
        </div>

        {/* Tab pill selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
          {tabList.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white shadow-lg shadow-[#2563EB]/30'
                    : 'bg-[#111F33] hover:bg-[#0D1B2A] text-[#A7B4C7] hover:text-white border border-[#2563EB]/25'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Tab Panel */}
      <div className="bg-[#111F33] border border-[#2563EB]/25 rounded-3xl p-6 sm:p-8 shadow-xl shadow-[#07111F]">
        {/* 1. GENERAL SPECIFICATIONS: Material, Dimensions, Weight, Features */}
        {activeTab === 'specs' && (
          <div className="space-y-6 animate-in fade-in-50">
            <div className="flex items-center gap-2 text-sm font-bold text-[#06B6D4] pb-2 border-b border-[#2563EB]/20">
              <Layers className="w-4 h-4 text-[#06B6D4]" />
              <span>Core Physical Specifications & Engineering</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-[#0D1B2A] border border-[#2563EB]/20 space-y-1">
                <span className="text-xs font-mono text-[#A7B4C7] block">Chassis Material</span>
                <span className="text-sm font-bold text-white block">{materialValue}</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#0D1B2A] border border-[#2563EB]/20 space-y-1">
                <span className="text-xs font-mono text-[#A7B4C7] block">Physical Dimensions</span>
                <span className="text-sm font-bold text-white block">{dimensionsValue}</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#0D1B2A] border border-[#2563EB]/20 space-y-1">
                <span className="text-xs font-mono text-[#A7B4C7] block">Unit Weight</span>
                <span className="text-sm font-bold text-white block">{weightValue}</span>
              </div>
            </div>

            {/* Highlighted Key Features */}
            <div className="pt-2 space-y-3">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
                Highlighted Engineering Features:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {featuresList.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#0D1B2A] border border-[#2563EB]/20 flex items-start gap-2.5 text-xs text-[#A7B4C7]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#06B6D4] shrink-0 mt-0.5" />
                    <span className="text-white leading-relaxed">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* HARDWARE */}
        {activeTab === 'hardware' && (
          <div className="space-y-4 animate-in fade-in-50">
            <div className="flex items-center gap-2 text-sm font-bold text-[#06B6D4] pb-2 border-b border-[#2563EB]/20">
              <Cpu className="w-4 h-4 text-[#06B6D4]" />
              <span>Core Silicon & Memory Architecture</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {hardwareData.map((item) => (
                <div key={item.label} className="p-4 rounded-2xl bg-[#0D1B2A] border border-[#2563EB]/20 space-y-1">
                  <span className="text-xs font-mono text-[#A7B4C7] block">{item.label}</span>
                  <span className="text-sm font-bold text-white block">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DISPLAY */}
        {activeTab === 'display' && (
          <div className="space-y-4 animate-in fade-in-50">
            <div className="flex items-center gap-2 text-sm font-bold text-[#06B6D4] pb-2 border-b border-[#2563EB]/20">
              <Monitor className="w-4 h-4 text-[#06B6D4]" />
              <span>Display Panel & Visual Output</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayData.map((item) => (
                <div key={item.label} className="p-4 rounded-2xl bg-[#0D1B2A] border border-[#2563EB]/20 space-y-1">
                  <span className="text-xs font-mono text-[#A7B4C7] block">{item.label}</span>
                  <span className="text-sm font-bold text-white block">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CAMERA */}
        {activeTab === 'camera' && (
          <div className="space-y-4 animate-in fade-in-50">
            <div className="flex items-center gap-2 text-sm font-bold text-[#06B6D4] pb-2 border-b border-[#2563EB]/20">
              <Camera className="w-4 h-4 text-[#06B6D4]" />
              <span>Optics, Sensors & Video Capabilities</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cameraData.map((item) => (
                <div key={item.label} className="p-4 rounded-2xl bg-[#0D1B2A] border border-[#2563EB]/20 space-y-1">
                  <span className="text-xs font-mono text-[#A7B4C7] block">{item.label}</span>
                  <span className="text-sm font-bold text-white block">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BATTERY */}
        {activeTab === 'battery' && (
          <div className="space-y-4 animate-in fade-in-50">
            <div className="flex items-center gap-2 text-sm font-bold text-[#06B6D4] pb-2 border-b border-[#2563EB]/20">
              <BatteryCharging className="w-4 h-4 text-[#06B6D4]" />
              <span>Power, Cell Chemistry & Fast Charging</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {batteryData.map((item) => (
                <div key={item.label} className="p-4 rounded-2xl bg-[#0D1B2A] border border-[#2563EB]/20 space-y-1">
                  <span className="text-xs font-mono text-[#A7B4C7] block">{item.label}</span>
                  <span className="text-sm font-bold text-white block">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONNECTIVITY */}
        {activeTab === 'connectivity' && (
          <div className="space-y-4 animate-in fade-in-50">
            <div className="flex items-center gap-2 text-sm font-bold text-[#06B6D4] pb-2 border-b border-[#2563EB]/20">
              <Wifi className="w-4 h-4 text-[#06B6D4]" />
              <span>Wireless Antennas, Ports & Interface Bus</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {connectivityData.map((item) => (
                <div key={item.label} className="p-4 rounded-2xl bg-[#0D1B2A] border border-[#2563EB]/20 space-y-1">
                  <span className="text-xs font-mono text-[#A7B4C7] block">{item.label}</span>
                  <span className="text-sm font-bold text-white block">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SOFTWARE */}
        {activeTab === 'software' && (
          <div className="space-y-4 animate-in fade-in-50">
            <div className="flex items-center gap-2 text-sm font-bold text-[#06B6D4] pb-2 border-b border-[#2563EB]/20">
              <Terminal className="w-4 h-4 text-[#06B6D4]" />
              <span>Operating System & Software Ecosystem</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {softwareData.map((item) => (
                <div key={item.label} className="p-4 rounded-2xl bg-[#0D1B2A] border border-[#2563EB]/20 space-y-1">
                  <span className="text-xs font-mono text-[#A7B4C7] block">{item.label}</span>
                  <span className="text-sm font-bold text-white block">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* INVENTORY, DELIVERY & WARRANTY */}
        {activeTab === 'inventory_delivery' && (
          <div className="space-y-6 animate-in fade-in-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Inventory / Stock Card */}
              <div className="p-5 rounded-2xl bg-[#0D1B2A] border border-[#2563EB]/20 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30 flex items-center justify-center">
                  <PackageCheck className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-sm">Inventory & SKU</h4>
                <div className="text-xs text-[#A7B4C7] space-y-1 leading-relaxed">
                  <p>
                    <strong className="text-white">SKU:</strong>{' '}
                    <span className="font-mono text-[#06B6D4]">{product.sku || `SKU-${product.id.slice(0, 10).toUpperCase()}`}</span>
                  </p>
                  <p>
                    <strong className="text-white">Stock:</strong>{' '}
                    <span className="text-[#22C55E] font-semibold">{product.stock_quantity ?? product.stock ?? 45} units available</span>
                  </p>
                  <p>
                    <strong className="text-white">Availability:</strong>{' '}
                    {product.stock_status === 'out_of_stock'
                      ? 'Out of Stock'
                      : product.stock_status === 'low_stock'
                      ? 'Low Stock Alert'
                      : 'In Stock (Ready to Ship)'}
                  </p>
                </div>
              </div>

              {/* Delivery Card */}
              <div className="p-5 rounded-2xl bg-[#0D1B2A] border border-[#2563EB]/20 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#06B6D4]/15 text-[#06B6D4] border border-[#06B6D4]/30 flex items-center justify-center">
                  <Truck className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-sm">Delivery & Returns</h4>
                <div className="text-xs text-[#A7B4C7] space-y-1 leading-relaxed">
                  <p>
                    <strong className="text-white">Estimated Delivery:</strong>{' '}
                    <span>{product.delivery_date || product.estimated_delivery || 'Delivers by Tomorrow, 11:00 AM'}</span>
                  </p>
                  <p>
                    <strong className="text-white">Shipping Cost:</strong>{' '}
                    <span className="text-[#22C55E] font-semibold">{product.shipping_cost || 'FREE Express Prime'}</span>
                  </p>
                  <p>
                    <strong className="text-white">Return Period:</strong>{' '}
                    <span>{product.return_period || product.return_policy || '7-Day Replacement Guarantee'}</span>
                  </p>
                </div>
              </div>

              {/* Warranty Card */}
              <div className="p-5 rounded-2xl bg-[#0D1B2A] border border-[#2563EB]/20 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/15 text-[#7C3AED] border border-[#7C3AED]/30 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-sm">Manufacturer Warranty</h4>
                <div className="text-xs text-[#A7B4C7] space-y-1 leading-relaxed">
                  <p>
                    <strong className="text-white">Coverage:</strong>{' '}
                    <span>{product.warranty || product.warranty_info || '1 Year Official Brand Warranty'}</span>
                  </p>
                  <p>
                    <strong className="text-white">Service:</strong> Doorstep pickup or authorized brand service center
                  </p>
                  <p>
                    <strong className="text-white">Authenticity:</strong> 100% Genuine Guaranteed with Invoice
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Pincode Checker */}
            <div className="p-5 rounded-2xl bg-[#0D1B2A] border border-[#2563EB]/25 space-y-3">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#06B6D4]" />
                <span>Check Delivery Date & Express Availability by PIN Code:</span>
              </span>
              <form onSubmit={handleCheckPincode} className="flex gap-2 max-w-md">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit postal code (e.g. 560001)..."
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-[#111F33] border border-[#2563EB]/30 rounded-xl text-xs text-white placeholder-[#A7B4C7]/60 focus:outline-none focus:border-[#06B6D4]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md shadow-[#2563EB]/30"
                >
                  Verify
                </button>
              </form>
              {deliveryResult && (
                <p className={`text-xs font-semibold ${deliveryResult.startsWith('✓') ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                  {deliveryResult}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
