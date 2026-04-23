import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, url, jsonLdSchema, noindex }) => {
  const defaultTitle = 'Dev Tamakuwala — Portfolio';
  const defaultDesc = 'Senior Tech Lead specializing in building robust, user-centric, and scalable software solutions. Explore my projects, skills, and experience.';
  
  const finalTitle = title ? `${title} | Dev Tamakuwala` : defaultTitle;
  const finalDesc = description || defaultDesc;
  const finalUrl = url ? `https://devtamakuwala.in${url}` : 'https://devtamakuwala.in';

  return (
    <Helmet>
      {/* Standard SEO Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDesc} />
      <link rel="canonical" href={finalUrl} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph Tags */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDesc} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:type" content="website" />

      {/* Twitter Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDesc} />

      {/* JSON-LD Structured Data */}
      {jsonLdSchema && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLdSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
