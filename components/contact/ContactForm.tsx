"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { supabase, EnquirySubmission } from "@/lib/supabase";

function ContactFormInner() {
  const searchParams = useSearchParams();
  const initialInquiry = searchParams.get("inquiry") || "";

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    requirement: initialInquiry,
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent duplicate submissions
    if (status === "submitting") return;

    // Validate required fields
    if (!formData.fullName.trim() || !formData.phoneNumber.trim()) {
      setStatus("error");
      setErrorMessage("Please provide both your Full Name and Phone Number.");
      return;
    }

    // Optional email validation
    if (
      formData.emailAddress.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress.trim())
    ) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      if (!supabase) {
        // Supabase credentials not configured in environment
        setStatus("error");
        setErrorMessage(
          "Sorry, we couldn't submit your enquiry right now. Please try again or contact us directly on WhatsApp or phone."
        );
        return;
      }

      const payload: EnquirySubmission = {
        name: formData.fullName.trim(),
        phone: formData.phoneNumber.trim(),
        email: formData.emailAddress.trim() || null,
        product: formData.requirement.trim() || null,
        message: formData.message.trim() || null,
        status: "new",
      };

      const { error } = await supabase.from("enquiries").insert([payload]);

      if (error) {
        // Do not expose database errors or SQL details to the client
        setStatus("error");
        setErrorMessage(
          "Sorry, we couldn't submit your enquiry right now. Please try again or contact us directly on WhatsApp or phone."
        );
        return;
      }

      // Success
      setStatus("success");
      setFormData({
        fullName: "",
        phoneNumber: "",
        emailAddress: "",
        requirement: "",
        message: "",
      });
    } catch {
      // Safe generic error handling
      setStatus("error");
      setErrorMessage(
        "Sorry, we couldn't submit your enquiry right now. Please try again or contact us directly on WhatsApp or phone."
      );
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-[#e8dfd1] shadow-xl">
      <div className="border-b border-[#f0eae0] pb-4 mb-6">
        <h3 className="font-serif text-2xl font-bold text-[#1b4332]">
          Send an Enquiry
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-[#52796f]">
          Fill in your details below and we will get back to you promptly.
        </p>
      </div>

      {/* Success Notification Banner */}
      {status === "success" && (
        <div
          role="status"
          className="mb-6 p-4 rounded-2xl bg-[#e9f1ed] border border-[#cfe1d7] text-[#1b4332] text-sm flex items-start gap-3 shadow-2xs animate-in fade-in duration-300"
        >
          <div className="w-6 h-6 rounded-full bg-[#2d6a4f] text-[#fcfaf6] flex items-center justify-center shrink-0 mt-0.5">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="3"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
          </div>
          <div>
            <p className="font-bold text-[#1b4332]">
              Enquiry Submitted Successfully!
            </p>
            <p className="mt-1 text-xs sm:text-sm text-[#3f4e46] leading-relaxed">
              Thank you! Your enquiry has been submitted successfully. We&apos;ll
              get in touch with you soon.
            </p>
          </div>
        </div>
      )}

      {/* Error Notification Banner */}
      {status === "error" && (
        <div
          role="alert"
          className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-sm flex items-start gap-3 shadow-2xs animate-in fade-in duration-300"
        >
          <div className="w-6 h-6 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-amber-950">Notice</p>
            <p className="mt-0.5 text-xs sm:text-sm text-amber-900 leading-relaxed">
              {errorMessage ||
                "Sorry, we couldn't submit your enquiry right now. Please try again or contact us directly on WhatsApp or phone."}
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label
            htmlFor="fullName"
            className="block text-xs font-bold uppercase tracking-wider text-[#1b4332] mb-1.5"
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g. Rajesh Kumar"
            disabled={status === "submitting"}
            className="w-full px-4 py-3 rounded-xl border border-[#ded5c5] bg-[#fdfcf9] text-sm text-[#1b4332] placeholder-[#a39887] focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          />
        </div>

        {/* Grid: Phone & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Phone Number */}
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-xs font-bold uppercase tracking-wider text-[#1b4332] mb-1.5"
            >
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              required
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="+91 XXXXX XXXXX"
              disabled={status === "submitting"}
              className="w-full px-4 py-3 rounded-xl border border-[#ded5c5] bg-[#fdfcf9] text-sm text-[#1b4332] placeholder-[#a39887] focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>

          {/* Email Address */}
          <div>
            <label
              htmlFor="emailAddress"
              className="block text-xs font-bold uppercase tracking-wider text-[#1b4332] mb-1.5"
            >
              Email Address
            </label>
            <input
              type="email"
              id="emailAddress"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleChange}
              placeholder="you@example.com"
              disabled={status === "submitting"}
              className="w-full px-4 py-3 rounded-xl border border-[#ded5c5] bg-[#fdfcf9] text-sm text-[#1b4332] placeholder-[#a39887] focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* Product / Requirement */}
        <div>
          <label
            htmlFor="requirement"
            className="block text-xs font-bold uppercase tracking-wider text-[#1b4332] mb-1.5"
          >
            Product / Requirement
          </label>
          <input
            type="text"
            id="requirement"
            name="requirement"
            value={formData.requirement}
            onChange={handleChange}
            placeholder="e.g. Banana Powder, Moringa Powder, Bulk Enquiry..."
            disabled={status === "submitting"}
            className="w-full px-4 py-3 rounded-xl border border-[#ded5c5] bg-[#fdfcf9] text-sm text-[#1b4332] placeholder-[#a39887] focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          />
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-xs font-bold uppercase tracking-wider text-[#1b4332] mb-1.5"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="Share your requirements or questions with us..."
            disabled={status === "submitting"}
            className="w-full px-4 py-3 rounded-xl border border-[#ded5c5] bg-[#fdfcf9] text-sm text-[#1b4332] placeholder-[#a39887] focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent transition-all resize-y disabled:opacity-60 disabled:cursor-not-allowed"
          />
        </div>

        {/* Submit Action Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#2d6a4f] text-[#fcfaf6] font-semibold text-base hover:bg-[#1b4332] transition-all shadow-md hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2d6a4f] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "submitting" ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Submitting Enquiry...</span>
              </>
            ) : (
              <>
                <span>Send Enquiry</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </>
            )}
          </button>
        </div>

        <p className="mt-3 text-xs text-center text-[#7d6c56] leading-relaxed">
          Your details are used only to respond to your inquiry directly.
        </p>
      </form>
    </div>
  );
}

export default function ContactForm() {
  return (
    <Suspense
      fallback={
        <div className="bg-white rounded-3xl p-8 border border-[#e8dfd1] shadow-xl text-center py-16">
          <div className="w-8 h-8 mx-auto border-2 border-[#2d6a4f] border-t-transparent rounded-full animate-spin" />
          <p className="mt-3 text-sm text-[#52796f]">Loading enquiry form...</p>
        </div>
      }
    >
      <ContactFormInner />
    </Suspense>
  );
}
