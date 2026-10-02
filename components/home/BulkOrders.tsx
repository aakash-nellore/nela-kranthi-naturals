import React from "react";

interface BenefitItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const benefits: BenefitItem[] = [
  {
    id: "bulk-quantities",
    title: "Bulk Quantities",
    description:
      "Discuss your required quantity and product requirements with us.",
    icon: (
      <svg
        className="w-5 h-5 text-emerald-300"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </svg>
    ),
  },
  {
    id: "wholesale-enquiries",
    title: "Wholesale Enquiries",
    description:
      "Suitable for retailers, distributors and food businesses.",
    icon: (
      <svg
        className="w-5 h-5 text-emerald-300"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
        <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.79 1.1L21 9" />
        <path d="M12 3v6" />
      </svg>
    ),
  },
  {
    id: "product-selection",
    title: "Product Selection",
    description:
      "Enquire about available fruits, vegetables, leafy greens and food powders.",
    icon: (
      <svg
        className="w-5 h-5 text-emerald-300"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    ),
  },
  {
    id: "direct-contact",
    title: "Direct Contact",
    description:
      "Speak with us directly about your requirements and delivery needs.",
    icon: (
      <svg
        className="w-5 h-5 text-emerald-300"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
];

export default function BulkOrders() {
  return (
    <section
      id="bulk-orders"
      aria-labelledby="bulk-orders-heading"
      className="py-16 sm:py-20 lg:py-24 bg-[#1b4332] text-[#f4efe6] relative overflow-hidden"
    >
      {/* Background Decorative Ambient Glow */}
      <div
        className="absolute top-0 right-0 -z-10 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 -z-10 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Heading, Supporting Text & Guidance Note */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2d6a4f] border border-emerald-600/40 text-emerald-100 text-xs font-semibold mb-4 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Bulk &amp; Wholesale</span>
            </div>

            {/* Main Heading */}
            <h2
              id="bulk-orders-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight"
            >
              Looking for Natural Foods in Bulk?
            </h2>

            {/* Supporting Copy */}
            <p className="mt-5 text-base sm:text-lg text-emerald-100/90 leading-relaxed">
              We welcome enquiries from retailers, distributors, food businesses,
              hotels, restaurants and other buyers looking for naturally
              processed food products in bulk quantities.
            </p>

            {/* Enquiry Guidance Note */}
            <div className="mt-6 w-full p-4 sm:p-5 rounded-2xl bg-[#245742] border border-emerald-700/60 text-xs sm:text-sm text-emerald-100 flex items-start gap-3 shadow-inner">
              <div className="w-6 h-6 rounded-full bg-emerald-700/60 flex items-center justify-center shrink-0 mt-0.5">
                <svg
                  className="w-3.5 h-3.5 text-emerald-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" />
                </svg>
              </div>
              <p className="leading-relaxed">
                Please share the product name, approximate quantity and your
                location when enquiring.
              </p>
            </div>
          </div>

          {/* Right Column: 4 Benefits & Contact Actions */}
          <div className="lg:col-span-7 w-full flex flex-col gap-6">
            {/* 4 Benefits 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#245742]/80 rounded-2xl p-5 border border-emerald-700/50 shadow-2xs hover:border-emerald-500/60 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-800/80 flex items-center justify-center mb-3">
                      {item.icon}
                    </div>
                    <h3 className="font-serif text-lg font-bold text-white leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct Contact CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              {/* Primary WhatsApp CTA */}
              <a
                href="https://wa.me/917207717966"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-[#25D366] text-[#0a2e1c] font-bold text-sm sm:text-base hover:bg-[#20bd5a] transition-all shadow-md hover:shadow-lg focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                aria-label="Send WhatsApp message for bulk enquiry at +91 72077 17966"
              >
                {/* WhatsApp SVG Icon */}
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.301-.15-1.781-.879-2.057-.98-.276-.1-.477-.15-.678.15-.201.3-.778.98-.954 1.18-.175.2-.351.226-.652.075-.301-.15-1.272-.469-2.424-1.496-.895-.799-1.5-1.787-1.675-2.088-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.201-.301.301-.502.1-.201.05-.376-.025-.526-.075-.15-.678-1.634-.929-2.238-.244-.588-.493-.509-.678-.518l-.578-.01c-.201 0-.527.075-.803.376s-1.054 1.03-1.054 2.511c0 1.482 1.079 2.911 1.23 3.112.15.201 2.124 3.243 5.145 4.548.719.311 1.281.497 1.719.636.722.23 1.378.197 1.898.12.579-.086 1.781-.728 2.032-1.431.251-.703.251-1.305.176-1.431-.076-.126-.277-.201-.578-.351zM12.04 2C6.495 2 2 6.495 2 12.04c0 1.85.5 3.585 1.372 5.083L2 22l5.025-1.317a9.99 9.99 0 0 0 5.015 1.357c5.545 0 10.04-4.495 10.04-10.04C22.08 6.495 17.585 2 12.04 2zm0 18.243a8.195 8.195 0 0 1-4.18-1.144l-.3-.178-3.107.815.83-3.029-.196-.312A8.188 8.188 0 0 1 3.847 12.04c0-4.52 3.674-8.193 8.193-8.193 4.52 0 8.193 3.673 8.193 8.193 0 4.52-3.673 8.203-8.193 8.203z" />
                </svg>
                <span>WhatsApp for Enquiry</span>
              </a>

              {/* Secondary Phone CTA */}
              <a
                href="tel:+917207717966"
                className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-transparent border-2 border-emerald-400/50 text-emerald-100 hover:text-white hover:bg-emerald-800/60 transition-colors font-semibold text-sm sm:text-base focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                aria-label="Call +91 72077 17966"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
                </svg>
                <span>Call +91 72077 17966</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
