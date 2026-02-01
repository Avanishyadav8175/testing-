'use client';

import { useSettings } from '@/lib/settings-context';
import { useEffect } from 'react';

export default function DynamicMetadata() {
  const { settings, loading } = useSettings();

  useEffect(() => {
    if (!loading && settings) {
      // Update document title
      document.title = settings.meta_title || settings.site_name;

      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', settings.meta_description);
      }

      // Update meta keywords
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords && settings.meta_keywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      if (metaKeywords && settings.meta_keywords) {
        metaKeywords.setAttribute('content', settings.meta_keywords);
      }

      // Update favicon
      if (settings.favicon) {
        let favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
        if (!favicon) {
          favicon = document.createElement('link');
          favicon.rel = 'icon';
          document.head.appendChild(favicon);
        }
        favicon.href = settings.favicon;
      }

      // Update Open Graph tags
      const updateMetaProperty = (property: string, content: string) => {
        let meta = document.querySelector(`meta[property="${property}"]`);
        if (!meta && content) {
          meta = document.createElement('meta');
          meta.setAttribute('property', property);
          document.head.appendChild(meta);
        }
        if (meta && content) {
          meta.setAttribute('content', content);
        }
      };

      updateMetaProperty('og:title', settings.og_title || settings.meta_title || settings.site_name);
      updateMetaProperty('og:description', settings.og_description || settings.meta_description);
      updateMetaProperty('og:image', settings.og_image);
      updateMetaProperty('og:site_name', settings.site_name);

      // Update Twitter Card tags
      const updateMetaName = (name: string, content: string) => {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta && content) {
          meta = document.createElement('meta');
          meta.setAttribute('name', name);
          document.head.appendChild(meta);
        }
        if (meta && content) {
          meta.setAttribute('content', content);
        }
      };

      updateMetaName('twitter:card', settings.twitter_card);
      updateMetaName('twitter:site', settings.twitter_site);
      updateMetaName('twitter:title', settings.og_title || settings.meta_title || settings.site_name);
      updateMetaName('twitter:description', settings.og_description || settings.meta_description);
      updateMetaName('twitter:image', settings.og_image);

      // Add analytics scripts
      if (settings.google_analytics_id && !document.querySelector(`script[src*="${settings.google_analytics_id}"]`)) {
        // Google Analytics
        const gaScript = document.createElement('script');
        gaScript.async = true;
        gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${settings.google_analytics_id}`;
        document.head.appendChild(gaScript);

        const gaConfigScript = document.createElement('script');
        gaConfigScript.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${settings.google_analytics_id}');
        `;
        document.head.appendChild(gaConfigScript);
      }

      if (settings.google_tag_manager_id && !document.querySelector(`script[src*="${settings.google_tag_manager_id}"]`)) {
        // Google Tag Manager
        const gtmScript = document.createElement('script');
        gtmScript.innerHTML = `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${settings.google_tag_manager_id}');
        `;
        document.head.appendChild(gtmScript);
      }

      if (settings.facebook_pixel_id && !document.querySelector(`script[src*="connect.facebook.net"]`)) {
        // Facebook Pixel
        const fbScript = document.createElement('script');
        fbScript.innerHTML = `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${settings.facebook_pixel_id}');
          fbq('track', 'PageView');
        `;
        document.head.appendChild(fbScript);
      }
    }
  }, [settings, loading]);

  return null;
}