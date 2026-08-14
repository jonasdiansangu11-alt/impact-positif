import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export default function Seo({ 
  title = "IMPACT POSITIF - Agence d'Expérience de Marque & Événementiel RDC", 
  description = "Créée en 2015, IMPACT POSITIF est une agence créative globale. Nous concevons des expériences de marque inoubliables pour propulser votre entreprise.", 
  image = "/images/logo.png", 
  url = "https://impactpositif.com",
  type = "website" 
}: SeoProps) {
  
  // Format the title if it's not the default
  const formattedTitle = title.includes('IMPACT POSITIF') ? title : `${title} | IMPACT POSITIF`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{formattedTitle}</title>
      <meta name="title" content={formattedTitle} />
      <meta name="description" content={description} />
      
      {/* Viewport & Charset */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={formattedTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Schema.org JSON-LD for Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "IMPACT POSITIF",
          "url": "https://impactpositif.com",
          "logo": "https://impactpositif.com/images/logo.png",
          "description": "Agence d'Expérience de Marque & Événementiel en RDC",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Gombe",
            "addressLocality": "Kinshasa",
            "addressCountry": "CD"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer support",
            "email": "hello@impactpositif.com"
          }
        })}
      </script>
    </Helmet>
  );
}
