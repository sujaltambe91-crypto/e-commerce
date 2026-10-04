import React, { useState } from 'react';
import { ExternalLink, ShoppingBag, Eye, Layers } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  technologies: string[];
}

const PROJECTS: Project[] = [
  {
    id: 'p-1',
    name: 'Aura Luxury Fashion & Streetwear',
    category: 'Fashion Store',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    description: 'High-end apparel storefront with variant swatches, sizing guides, and automated lookbook collections.',
    technologies: ['WooCommerce', 'React PWA', 'Razorpay', 'Shiprocket'],
  },
  {
    id: 'p-2',
    name: 'NexPulse Smart Audio & Wearables',
    category: 'Electronics Store',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    description: 'Tech store featuring 3D product renders, comparison matrices, and Amazon affiliate hybrid checkout.',
    technologies: ['WooCommerce', 'Tailwind CSS', 'Amazon Associates', 'Stripe'],
  },
  {
    id: 'p-3',
    name: 'Nordic Craft Minimal Interiors',
    category: 'Furniture Store',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    description: 'Architectural furniture showroom with custom dimensions calculator and white-glove delivery scheduling.',
    technologies: ['WooCommerce', 'PostgreSQL', 'Delhivery', 'WhatsApp Cart'],
  },
  {
    id: 'p-4',
    name: 'Botanica Clean Clinical Skincare',
    category: 'Beauty Store',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    description: 'DTC organic skincare boutique with recurring subscriptions and personalized regimen quiz.',
    technologies: ['WooCommerce', 'Subscription Engine', 'Cashfree', 'SMS Alerts'],
  },
  {
    id: 'p-5',
    name: 'FarmFresh Organic Daily Market',
    category: 'Grocery Store',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    description: 'Hyperlocal express grocery with morning delivery slots, barcode lookups, and WhatsApp order dispatch.',
    technologies: ['WooCommerce', 'Hyperlocal Map', 'UPI AutoPay', 'PWA'],
  },
  {
    id: 'p-6',
    name: 'Vanguard Urban Leather & Gear',
    category: 'Lifestyle Store',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
    description: 'Handcrafted leather goods shop with embossing customization preview and international multi-currency.',
    technologies: ['WooCommerce', 'PayPal / Stripe', 'FedEx API', 'Customizer'],
  },
];

interface PortfolioSectionProps {
  onOpenStoreModal?: () => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onOpenStoreModal }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="space-y-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-800 pb-6">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-orange-500">
            Recent Client Deployments
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            Proven Store Designs Across Diverse Niches
          </h2>
        </div>
        <p className="text-xs text-neutral-400 max-w-sm">
          Every client receives custom branded UI/UX, optimized database indexing, and integrated payment gateways.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="group rounded-3xl bg-neutral-900 border border-neutral-800 overflow-hidden hover:border-orange-500/50 transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-xl"
          >
            {/* Image */}
            <div className="relative aspect-16/10 w-full bg-neutral-950 overflow-hidden">
              <img
                src={project.image}
                alt={project.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-neutral-950/80 border border-neutral-800 text-[11px] font-bold text-amber-400">
                {project.category}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-display text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                  {project.name}
                </h3>
                <p className="mt-1 text-xs text-neutral-400 leading-relaxed line-clamp-2">
                  {project.description}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 2).map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono text-neutral-400 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <span className="flex items-center gap-1 text-xs font-bold text-orange-400 group-hover:text-orange-300 transition-colors">
                  <span>View Details</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-xl p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                {selectedProject.category}
              </span>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <img
              src={selectedProject.image}
              alt={selectedProject.name}
              referrerPolicy="no-referrer"
              className="w-full h-56 rounded-2xl object-cover bg-neutral-950"
            />

            <div>
              <h3 className="font-display text-2xl font-bold text-white">
                {selectedProject.name}
              </h3>
              <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
                {selectedProject.description}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block">
                Integrated Technology Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg bg-neutral-950 border border-neutral-800 text-xs font-mono text-neutral-300"
                  >
                    ✓ {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
              <button
                onClick={() => {
                  setSelectedProject(null);
                  if (onOpenStoreModal) onOpenStoreModal();
                }}
                className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-neutral-950 font-bold text-xs rounded-xl shadow-md"
              >
                Preview Live Storefront Demo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
