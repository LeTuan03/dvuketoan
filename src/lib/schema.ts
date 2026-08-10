/**
 * JSON-LD Schema Helpers for SEO
 * Provides structured data markup for search engines
 */

const BASE_URL = "https://vtax.com.vn";

/**
 * Organization Schema
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": BASE_URL,
  name: "VTAX",
  alternateName: "VTAX Accounting",
  description: "Dịch vụ kế toán, tư vấn thuế chuyên nghiệp và uy tín",
  url: BASE_URL,
  logo: `${BASE_URL}/images/logo.png`,
  image: `${BASE_URL}/images/about.svg`,
  sameAs: [
    "https://www.facebook.com/VTAX",
    "https://www.youtube.com/VTAX",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Support",
    telephone: "+84-xxx-xxx-xxx",
    email: "contact@VTAX.com.vn",
  },
  areaServed: "VN",
  knowsAbout: ["Accounting", "Tax Consulting", "Business Registration", "Financial Advisory"],
  founder: {
    "@type": "Organization",
    name: "VTAX",
  },
};

/**
 * Breadcrumb Schema
 */
export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Article Schema
 */
export function articleSchema(article: {
  title: string;
  description: string;
  content?: string;
  image?: string;
  author?: string;
  publishDate: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `${BASE_URL}/kien-thuc/${article.slug}`,
    headline: article.title,
    description: article.description,
    image: article.image || `${BASE_URL}/images/default-article.svg`,
    datePublished: article.publishDate,
    dateModified: article.publishDate,
    author: {
      "@type": "Organization",
      name: article.author || "VTAX Editorial Team",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "VTAX",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/kien-thuc/${article.slug}`,
    },
  };
}


/**
 * FAQ Schema
 */
export function faqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Local Business Schema
 */
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": BASE_URL,
  name: "VTAX",
  image: `${BASE_URL}/images/logo.png`,
  description: "Công ty dịch vụ kế toán và tư vấn thuế uy tín",
  url: BASE_URL,
  telephone: "+84-xxx-xxx-xxx",
  address: {
    "@type": "PostalAddress",
    addressCountry: "VN",
    addressRegion: "Vietnam",
  },
  sameAs: [
    "https://www.facebook.com/VTAX",
    "https://www.youtube.com/VTAX",
  ],
};

/**
 * Schema.org markup component helper
 */
export function getSchemaMarkup(schema: any) {
  return `
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(${JSON.stringify(schema)}),
      }}
    />
  `;
}
