/**
 * SEO Configuration
 * Centralized configuration for SEO-related settings
 */

export const SEO_CONFIG = {
  BASE_URL: "https://vtax.com.vn",
  SITE_NAME: "VTAX",
  SITE_DESCRIPTION: "VTAX - Chuyên cung cấp dịch vụ kế toán, báo cáo thuế và tư vấn doanh nghiệp uy tín",
  COMPANY_NAME: "CÔNG TY DỊCH VỤ KẾ TOÁN VTAX",
  
  // Default Images
  DEFAULT_OG_IMAGE: "/images/about.svg",
  DEFAULT_ARTICLE_IMAGE: "/images/default-article.svg",
  LOGO_IMAGE: "/images/logo.png",
  
  // Social Media
  FACEBOOK_URL: "https://www.facebook.com/VTAX",
  YOUTUBE_URL: "https://www.youtube.com/VTAX",
  
  // Contact
  PHONE: "+84-xxx-xxx-xxx",
  EMAIL: "contact@VTAX.com.vn",
  
  // Image Dimensions
  OG_IMAGE_WIDTH: 1200,
  OG_IMAGE_HEIGHT: 630,
  
  // Locale
  LOCALE: "vi_VN",
  LANGUAGE: "vi",
  
  // SEO Keywords
  CORE_KEYWORDS: [
    "kế toán",
    "dịch vụ kế toán",
    "báo cáo thuế",
    "thành lập doanh nghiệp",
    "quyết toán thuế",
    "tư vấn thuế",
    "kế toán trọn gói",
    "VTAX"
  ],
  
  // Pages
  PAGES: {
    HOME: { path: "/", keywords: [] },
    SERVICES: { path: "/dich-vu", keywords: ["dịch vụ", "kế toán trọn gói", "báo cáo thuế"] },
    ABOUT: { path: "/gioi-thieu", keywords: ["giới thiệu", "về chúng tôi"] },
    NEWS: { path: "/tin-tuc", keywords: ["tin tức", "sự kiện"] },
    KNOWLEDGE: { path: "/kien-thuc", keywords: ["kiến thức", "thuế", "luật doanh nghiệp"] },
    LOOKUP: { path: "/tra-cuu", keywords: ["tra cứu", "ngành nghề kinh doanh"] },
    CONTACT: { path: "/lien-he", keywords: ["liên hệ", "tư vấn"] },
  },
};

/**
 * Generate OpenGraph image URL with dynamic text
 * Can be used with services like og-image-gen or similar
 */
export function generateOGImageUrl(
  title: string,
  description?: string,
  theme?: "primary" | "secondary" | "accent"
): string {
  // Return default image - in production, you could use a dynamic OG image generation service
  return SEO_CONFIG.DEFAULT_OG_IMAGE;
}

/**
 * Get page keywords with core keywords
 */
export function getPageKeywords(pageKeywords: string[]): string {
  return [...new Set([...pageKeywords, ...SEO_CONFIG.CORE_KEYWORDS])].join(", ");
}
