import React from "react";
import ContactForm from "@/components/contact/ContactForm";

export default function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-16 sm:py-20 lg:py-24 bg-[#fcfaf6] border-b border-[#e8dfd1]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column: Contact Information & Direct Channels */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e9f1ed] border border-[#cfe1d7] text-[#1b4332] text-xs font-semibold mb-4 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]" />
              <span>Get In Touch</span>
            </div>

            {/* Main Heading */}
            <h2
              id="contact-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1b4332] tracking-tight leading-tight"
            >
              We&apos;d Love to Hear From You
            </h2>

            {/* Supporting Text */}
            <p className="mt-5 text-base sm:text-lg text-[#3f4e46] leading-relaxed">
              Have a question about our products or want to discuss a bulk
              requirement? Get in touch with Nela Kranthi Naturals and share your
              requirements with us.
            </p>

            {/* Contact Details Cards */}
            <div className="mt-8 space-y-4 w-full">
              {/* Business & Location */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-[#e8dfd1] shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-[#2d6a4f]/10 text-[#2d6a4f] flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#7d6c56]">
                    Nela Kranthi Naturals
                  </p>
                  <p className="text-sm font-semibold text-[#1b4332] mt-0.5">
                    Sydapuram, Nellore District, Andhra Pradesh, India
                  </p>
                </div>
              </div>

              {/* Phone Channel */}
              <a
                href="tel:+917207717966"
                className="flex items-center justify-between p-4 rounded-2xl bg-white border border-[#e8dfd1] shadow-2xs hover:border-[#2d6a4f]/60 hover:bg-[#faf7f0] transition-colors group"
                aria-label="Call +91 72077 17966"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#2d6a4f]/10 text-[#2d6a4f] flex items-center justify-center shrink-0">
                    <svg
                      className="w-5 h-5"
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
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#7d6c56]">
                      Phone Call
                    </p>
                    <p className="text-sm font-semibold text-[#1b4332] mt-0.5 group-hover:text-[#2d6a4f] transition-colors">
                      +91 72077 17966
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#2d6a4f]">Call →</span>
              </a>

              {/* WhatsApp Channel */}
              <a
                href="https://wa.me/917207717966"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl bg-white border border-[#e8dfd1] shadow-2xs hover:border-emerald-500/60 hover:bg-[#eef8f2] transition-colors group"
                aria-label="Chat on WhatsApp at +91 72077 17966"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 text-[#1b8a43] flex items-center justify-center shrink-0">
                    <svg
                      className="w-5 h-5 fill-current"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M17.472 14.382c-.301-.15-1.781-.879-2.057-.98-.276-.1-.477-.15-.678.15-.201.3-.778.98-.954 1.18-.175.2-.351.226-.652.075-.301-.15-1.272-.469-2.424-1.496-.895-.799-1.5-1.787-1.675-2.088-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.201-.301.301-.502.1-.201.05-.376-.025-.526-.075-.15-.678-1.634-.929-2.238-.244-.588-.493-.509-.678-.518l-.578-.01c-.201 0-.527.075-.803.376s-1.054 1.03-1.054 2.511c0 1.482 1.079 2.911 1.23 3.112.15.201 2.124 3.243 5.145 4.548.719.311 1.281.497 1.719.636.722.23 1.378.197 1.898.12.579-.086 1.781-.728 2.032-1.431.251-.703.251-1.305.176-1.431-.076-.126-.277-.201-.578-.351zM12.04 2C6.495 2 2 6.495 2 12.04c0 1.85.5 3.585 1.372 5.083L2 22l5.025-1.317a9.99 9.99 0 0 0 5.015 1.357c5.545 0 10.04-4.495 10.04-10.04C22.08 6.495 17.585 2 12.04 2zm0 18.243a8.195 8.195 0 0 1-4.18-1.144l-.3-.178-3.107.815.83-3.029-.196-.312A8.188 8.188 0 0 1 3.847 12.04c0-4.52 3.674-8.193 8.193-8.193 4.52 0 8.193 3.673 8.193 8.193 0 4.52-3.673 8.203-8.193 8.203z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#7d6c56]">
                      WhatsApp Chat
                    </p>
                    <p className="text-sm font-semibold text-[#1b4332] mt-0.5 group-hover:text-[#1b8a43] transition-colors">
                      +91 72077 17966
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#1b8a43]">Message →</span>
              </a>
            </div>
          </div>

          {/* Right Column: Clean Enquiry Form Component */}
          <div className="lg:col-span-7 w-full">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
