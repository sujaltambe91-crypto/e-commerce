import { useEffect } from 'react';
import { useStore } from '../context/StoreContext.tsx';
import { Product } from '../types/index.ts';

interface SeoHeadProps {
  title?: string;
  description?: string;
  product?: Product;
}

export const SeoHead: React.FC<SeoHeadProps> = ({ title, description, product }) => {
  const { settings } = useStore();

  useEffect(() => {
    const finalTitle = title
      ? `${title} | ${settings.brand_name}`
      : settings.seo_title || `${settings.brand_name} - Curated Deals`;

    const finalDesc = description || product?.short_description || settings.seo_description;

    document.title = finalTitle;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', finalDesc);

    // Update OpenGraph
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', finalTitle);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', finalDesc);

    let ogImage = document.querySelector('meta[property="og:image"]');
    if (product?.image_url) {
      if (!ogImage) {
        ogImage = document.createElement('meta');
        ogImage.setAttribute('property', 'og:image');
        document.head.appendChild(ogImage);
      }
      ogImage.setAttribute('content', product.image_url);
    }

    // Injected Schema.org Product Structured Data
    const scriptId = 'jsonld-product-schema';
    const existingScript = document.getElementById(scriptId);
    if (existingScript) existingScript.remove();

    if (product) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        '@context': 'https://schema.org/',
        '@type': 'Product',
        name: product.name,
        image: [product.image_url, ...(product.additional_images || [])],
        description: product.short_description || product.full_description,
        sku: product.id,
        offers: {
          '@type': 'Offer',
          url: window.location.href,
          priceCurrency: product.currency === '₹' ? 'INR' : 'USD',
          price: product.price || 0,
          availability: 'https://schema.org/InStock',
          seller: {
            '@type': 'Organization',
            name: settings.brand_name,
          },
        },
      });
      document.head.appendChild(script);
    }
  }, [title, description, product, settings]);

  return null;
};
