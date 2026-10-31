"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Product, ProductCategory } from "@/types";
import { saveProductAction, uploadProductImageAction } from "@/lib/product-actions";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  onSaved?: (savedProduct: Product) => void;
}

const CATEGORIES: ProductCategory[] = [
  "Leaf Powders",
  "Flower & Petal Products",
  "Fruit Powders",
  "Vegetable Powders",
  "Roots, Spices & Specialty Botanicals",
  "Dehydrated Foods",
];

interface ProductFormContentProps {
  product?: Product | null;
  onClose: () => void;
  onSaved?: (savedProduct: Product) => void;
}

function ProductFormContent({ product, onClose, onSaved }: ProductFormContentProps) {
  const isEditing = Boolean(product);

  const [name, setName] = useState(product?.name ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [category, setCategory] = useState<ProductCategory>(
    product?.category ?? "Leaf Powders"
  );
  const [shortDescription, setShortDescription] = useState(
    product?.shortDescription ?? ""
  );
  const [description, setDescription] = useState(product?.description ?? "");
  const [unit, setUnit] = useState(product?.unit ?? "100g / 250g / 500g");
  const [imageUrl, setImageUrl] = useState(product?.image ?? "");
  const [isActive, setIsActive] = useState(product?.available ?? true);

  // Submission and upload states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Security and validation feedback state
  const [feedback, setFeedback] = useState<{
    type: "info" | "warning" | "success";
    message: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-generate slug from name if adding new product
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    if (!isEditing) {
      setSlug(
        newName
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_-]+/g, "-")
          .replace(/^-+|-+$/g, "")
      );
    }
  };

  // Client-safe preview URL resolver
  const getPreviewUrl = (raw?: string | null): string => {
    if (!raw || typeof raw !== "string" || !raw.trim()) return "";
    const trimmed = raw.trim();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\/$/, "");
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
    if (trimmed.startsWith("/") && !trimmed.startsWith("/storage/")) return trimmed;
    if (trimmed.startsWith("/storage/v1/object/public/") && supabaseUrl) return `${supabaseUrl}${trimmed}`;
    if (trimmed.replace(/^\//, "").startsWith("product-images/") && supabaseUrl) {
      return `${supabaseUrl}/storage/v1/object/public/${trimmed.replace(/^\//, "")}`;
    }
    if (!trimmed.includes("/") && supabaseUrl && /\.(jpe?g|png|webp|avif|gif|svg)$/i.test(trimmed)) {
      return `${supabaseUrl}/storage/v1/object/public/product-images/${encodeURIComponent(trimmed)}`;
    }
    return "";
  };

  const resolvedPreviewUrl = getPreviewUrl(imageUrl);

  // Direct image file upload handler
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("slug", slug || "product");

      const result = await uploadProductImageAction(formData);

      if (result.success && result.filename) {
        setImageUrl(result.filename);
        setFeedback({
          type: "info",
          message: `Image "${file.name}" uploaded successfully to product-images bucket.`,
        });
      } else {
        setUploadError(result.error || "Failed to upload image.");
      }
    } catch (err: unknown) {
      setUploadError(err instanceof Error ? err.message : "Image upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const result = await saveProductAction({
        id: product?.id,
        name,
        slug,
        category,
        unit,
        imageUrl,
        shortDescription,
        description,
        isActive,
      });

      if (!result.success) {
        setFeedback({
          type: "warning",
          message: result.error || "Failed to save product.",
        });
      } else {
        setFeedback({
          type: "success",
          message: result.message || "Product saved successfully.",
        });
        if (result.product && onSaved) {
          onSaved(result.product);
        }
        setTimeout(() => {
          onClose();
        }, 1200);
      }
    } catch (err: unknown) {
      setFeedback({
        type: "warning",
        message: err instanceof Error ? err.message : "An unexpected error occurred.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Modal Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#eee7db] bg-[#fcfaf6]">
        <div>
          <span className="text-[11px] font-semibold tracking-wider uppercase text-[#2d6a4f] bg-[#e9f1ed] px-2.5 py-0.5 rounded-full border border-[#cfe1d7]">
            {isEditing ? "Edit Product" : "New Catalogue Entry"}
          </span>
          <h2
            id="product-modal-title"
            className="font-serif text-xl sm:text-2xl font-bold text-[#1b4332] mt-1"
          >
            {isEditing ? `Edit ${product?.name}` : "Add New Product"}
          </h2>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-[#7d6c56] hover:text-[#1b4332] hover:bg-[#f3ede3] rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-[#2d6a4f]"
          aria-label="Close modal"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Modal Body / Form */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 max-h-[80vh] overflow-y-auto">
        {/* Security Banner Notice */}
        <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-950 text-xs sm:text-sm">
          <div className="flex items-start gap-2.5">
            <svg
              className="w-5 h-5 text-amber-700 shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z"
              />
            </svg>
            <div>
              <strong className="font-semibold text-amber-900">
                Admin Security & Authorization:
              </strong>{" "}
              Changes are validated server-side and executed under verified administrator credentials.
              Anonymous and untrusted writes are strictly denied by PostgreSQL Row Level Security (RLS).
            </div>
          </div>
        </div>

        {/* Form Feedback */}
        {feedback && (
          <div
            className={`p-4 rounded-2xl text-xs sm:text-sm border ${
              feedback.type === "success"
                ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                : feedback.type === "warning"
                ? "bg-amber-100/70 border-amber-300 text-amber-900"
                : "bg-blue-50 border-blue-200 text-blue-900"
            }`}
          >
            {feedback.message}
          </div>
        )}

        {/* Two-column Grid for Core Metadata */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Product Name */}
          <div>
            <label
              htmlFor="product-name"
              className="block text-xs font-semibold uppercase tracking-wider text-[#3f4e46] mb-1.5"
            >
              Product Name *
            </label>
            <input
              id="product-name"
              type="text"
              required
              value={name}
              onChange={handleNameChange}
              placeholder="e.g. Banana Powder"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#ded5c5] bg-white text-base sm:text-sm text-[#1b4332] placeholder-[#8d7c68] focus:border-[#2d6a4f] focus:outline-hidden focus:ring-2 focus:ring-[#2d6a4f]/20 transition-all"
            />
          </div>

          {/* Product Slug */}
          <div>
            <label
              htmlFor="product-slug"
              className="block text-xs font-semibold uppercase tracking-wider text-[#3f4e46] mb-1.5"
            >
              Slug (URL identifier) *
            </label>
            <input
              id="product-slug"
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. banana-powder"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#ded5c5] bg-[#fdfbf7] text-base sm:text-sm text-[#1b4332] font-mono placeholder-[#8d7c68] focus:border-[#2d6a4f] focus:outline-hidden focus:ring-2 focus:ring-[#2d6a4f]/20 transition-all"
            />
          </div>
        </div>

        {/* Two-column Grid for Category & Unit */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Category */}
          <div>
            <label
              htmlFor="product-category"
              className="block text-xs font-semibold uppercase tracking-wider text-[#3f4e46] mb-1.5"
            >
              Category *
            </label>
            <select
              id="product-category"
              value={category}
              onChange={(e) => setCategory(e.target.value as ProductCategory)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#ded5c5] bg-white text-base sm:text-sm text-[#1b4332] focus:border-[#2d6a4f] focus:outline-hidden focus:ring-2 focus:ring-[#2d6a4f]/20 transition-all"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Available Unit */}
          <div>
            <label
              htmlFor="product-unit"
              className="block text-xs font-semibold uppercase tracking-wider text-[#3f4e46] mb-1.5"
            >
              Available Unit Packaging *
            </label>
            <input
              id="product-unit"
              type="text"
              required
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="e.g. 100g / 250g / 500g"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#ded5c5] bg-white text-base sm:text-sm text-[#1b4332] placeholder-[#8d7c68] focus:border-[#2d6a4f] focus:outline-hidden focus:ring-2 focus:ring-[#2d6a4f]/20 transition-all"
            />
          </div>
        </div>

        {/* Image Reference & Upload */}
        <div className="space-y-3">
          <label
            htmlFor="product-image"
            className="block text-xs font-semibold uppercase tracking-wider text-[#3f4e46]"
          >
            Product Image (Supabase Storage / URL)
          </label>
          <div className="flex flex-col sm:flex-row items-start gap-3">
            <div className="flex-1 w-full space-y-2">
              <input
                id="product-image"
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="e.g. Banana-Flour-550x550.webp or /images/products/banana-powder.jpg"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#ded5c5] bg-white text-base sm:text-sm text-[#1b4332] placeholder-[#8d7c68] focus:border-[#2d6a4f] focus:outline-hidden focus:ring-2 focus:ring-[#2d6a4f]/20 transition-all"
              />

              {/* Direct File Upload Trigger */}
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageFileChange}
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  className="hidden"
                />
                <button
                  type="button"
                  disabled={isUploading}
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#ded5c5] bg-[#f8f5ee] text-xs font-medium text-[#1b4332] hover:bg-[#ede5d8] transition-colors disabled:opacity-50"
                >
                  <svg
                    className="w-3.5 h-3.5 text-[#2d6a4f]"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                  <span>{isUploading ? "Uploading..." : "Upload New Image"}</span>
                </button>
                <span className="text-[11px] text-[#7d6c56]">
                  Max 5MB (JPG, PNG, WebP, AVIF)
                </span>
              </div>

              {uploadError && (
                <p className="text-[11px] text-red-600 font-medium">
                  {uploadError}
                </p>
              )}
            </div>

            {/* Thumbnail Preview Box */}
            <div className="w-16 h-16 rounded-xl border border-[#ded5c5] bg-[#f8f5ee] overflow-hidden shrink-0 flex items-center justify-center relative">
              {resolvedPreviewUrl ? (
                <Image
                  src={resolvedPreviewUrl}
                  alt={name || "Preview"}
                  fill
                  className="object-cover"
                  unoptimized={resolvedPreviewUrl.startsWith("http")}
                />
              ) : (
                <svg
                  className="w-6 h-6 text-[#ded5c5]"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* Short Description */}
        <div>
          <label
            htmlFor="product-short-description"
            className="block text-xs font-semibold uppercase tracking-wider text-[#3f4e46] mb-1.5"
          >
            Short Summary (Catalogue Card Preview)
          </label>
          <input
            id="product-short-description"
            type="text"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            placeholder="Brief 1-sentence product summary displayed on catalogue cards."
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#ded5c5] bg-white text-base sm:text-sm text-[#1b4332] placeholder-[#8d7c68] focus:border-[#2d6a4f] focus:outline-hidden focus:ring-2 focus:ring-[#2d6a4f]/20 transition-all"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="product-description"
            className="block text-xs font-semibold uppercase tracking-wider text-[#3f4e46] mb-1.5"
          >
            Full Description *
          </label>
          <textarea
            id="product-description"
            rows={4}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detailed description of product sourcing, solar dehydration process, and culinary/usage details."
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#ded5c5] bg-white text-base sm:text-sm text-[#1b4332] placeholder-[#8d7c68] focus:border-[#2d6a4f] focus:outline-hidden focus:ring-2 focus:ring-[#2d6a4f]/20 transition-all"
          />
        </div>

        {/* Active Status Checkbox */}
        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#f8f5ee] border border-[#eee7db]">
          <input
            id="product-is-active"
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="w-4 h-4 rounded-sm text-[#2d6a4f] border-[#ded5c5] focus:ring-[#2d6a4f]"
          />
          <label
            htmlFor="product-is-active"
            className="text-xs sm:text-sm font-medium text-[#1b4332] cursor-pointer"
          >
            Active in Public Catalogue (Visible to website visitors)
          </label>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[#eee7db] flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-3 sm:py-2.5 min-h-[44px] sm:min-h-0 rounded-full border border-[#ded5c5] text-xs sm:text-sm font-semibold text-[#4a5750] hover:bg-[#f3ede3] transition-colors inline-flex items-center justify-center disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-6 py-3 sm:py-2.5 min-h-[44px] sm:min-h-0 rounded-full bg-[#2d6a4f] text-[#fcfaf6] text-xs sm:text-sm font-semibold hover:bg-[#1b4332] transition-colors shadow-xs focus-visible:outline-2 focus-visible:outline-[#2d6a4f] inline-flex items-center justify-center disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                <span>Saving...</span>
              </span>
            ) : isEditing ? (
              "Save Changes"
            ) : (
              "Create Product"
            )}
          </button>
        </div>
      </form>
    </>
  );
}

export default function ProductModal({
  isOpen,
  onClose,
  product,
  onSaved,
}: ProductModalProps) {
  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#ded5c5] overflow-hidden my-8">
        <ProductFormContent
          key={product?.id ?? "new-product"}
          product={product}
          onClose={onClose}
          onSaved={onSaved}
        />
      </div>
    </div>
  );
}
