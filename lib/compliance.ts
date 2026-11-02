/**
 * Nela Kranthi Naturals — Product Regulatory & Compliance Service
 *
 * Enforces legal, FSSAI, and AYUSH regulatory distinctions across the product catalogue.
 * Certain botanical species cannot be sold as ordinary retail food products or make
 * unverified therapeutic, medicinal, or platelet-related claims.
 */

export const COMPLIANCE_REVIEW_SLUGS = [
  "papaya-leaf-powder",
  "jamun-leaf-powder",
  "neem-leaf-powder",
  "marigold-petals-dried",
  "safed-musli-root-powder",
] as const;

export type ComplianceReviewSlug = (typeof COMPLIANCE_REVIEW_SLUGS)[number];

/**
 * Checks whether a product slug is flagged for regulatory review.
 */
export function isComplianceRestricted(slug: string): boolean {
  return COMPLIANCE_REVIEW_SLUGS.includes(slug as ComplianceReviewSlug);
}

export interface ProductComplianceInfo {
  isRestricted: boolean;
  statusLabel: string;
  badgeLabel: string;
  badgeClass: string;
  availabilityLabel: string;
  availabilitySubtext: string;
  noticeHeading: string;
  noticeBody: string;
  ctaText: string;
  whatsappMessage: string;
  contactUrlParam: string;
}

/**
 * Returns compliance presentation metadata for a given product slug.
 */
export function getProductComplianceInfo(
  slug: string,
  productName: string
): ProductComplianceInfo {
  const isRestricted = isComplianceRestricted(slug);

  if (isRestricted) {
    return {
      isRestricted: true,
      statusLabel: "Regulatory Review",
      badgeLabel: "Enquiry Only",
      badgeClass: "bg-amber-50 text-amber-900 border-amber-300/80",
      availabilityLabel: "Commercial Enquiry Only",
      availabilitySubtext: "Specialty botanical • Technical review",
      noticeHeading: "Regulatory & Commercial Enquiry Notice",
      noticeBody:
        "This specialty botanical is catalogued strictly for commercial inquiry, technical specification review, and formulation research. It is not currently offered for general retail food consumption. No therapeutic, medicinal, or dietary claims are made.",
      ctaText: "Enquire for Details",
      whatsappMessage: `Hello, I would like to make a commercial enquiry regarding ${productName}.`,
      contactUrlParam: "commercial-botanical",
    };
  }

  return {
    isRestricted: false,
    statusLabel: "Approved Catalogue",
    badgeLabel: "In Stock",
    badgeClass: "bg-emerald-50 text-emerald-800 border-emerald-200",
    availabilityLabel: "Available",
    availabilitySubtext: "Based on seasonal harvest",
    noticeHeading: "",
    noticeBody: "",
    ctaText: "View Product",
    whatsappMessage: `Hello, I would like to enquire about ${productName}.`,
    contactUrlParam: "general",
  };
}

