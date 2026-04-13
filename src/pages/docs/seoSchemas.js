export const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "smart-i18n-auto",
    "operatingSystem": "Java 21+",
    "applicationCategory": "DeveloperApplication",
    "softwareVersion": "1.0.0",
    "description": "Plug-and-play automatic internationalization middleware for Spring Boot 4.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };
  
  export const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does it automatically know the user's language?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It intercepts the Accept-Language header from incoming HTTP requests. You don't need to manually read headers or pass Locales around."
        }
      },
      {
        "@type": "Question",
        "name": "Is it safe to use LLM APIs directly in the response cycle?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, because of the powerful dual-layer caching (Caffeine and batching). Only new, unseen strings actually trigger a network call."
        }
      },
      {
        "@type": "Question",
        "name": "What if I have nested objects in my DTO?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The interceptor uses deep reflection to recursively traverse nested objects and lists."
        }
      }
    ]
  };
  
