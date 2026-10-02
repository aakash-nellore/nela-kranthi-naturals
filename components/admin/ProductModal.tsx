"use client";

import React, { useState, useEffect } from "react";
import { Product, ProductCategory } from "@/types";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
}

const CATEGORIES: ProductCategory[] = [
  "Fruit Powders",
  "Leaf Powders",
  "Vegetable Powders",
  "Dehydrated Foods",
];

interface ProductFormContentProps {
  product?: Product | null;
  onClose: () => void;
}

function ProductFormContent({ product, onClose }: ProductFormContentProps) {
  const isEditing = Boolean(product);

  const [name, setName] = useState(product?.name ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [category, setCategory] = useState<ProductCategory>(
    product?.category ?? "Fruit Powders"
  );
  const [unit, setUnit] = useState(product?.unit ?? "100g / 250g / 500g");
  const [imageUrl, setImageUrl] = useState(product?.image ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [isActive, setIsActive] = useState(product?.available ?? true);

  // Security notification state
  const [feedback, setFeedback] = useState<{
    type: "info" | "warning";
    message: string;
  } | null>(null);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Security check: Explain that write operations are locked pending full authentication
    setFeedback({
      type: "warning",
      message:
        "Authorization Required: Direct product mutations (INSERT / UPDATE) are locked. Supabase Row Level Security restricts public/anonymous writes. To commit persistent changes, authenticated admin credentials must be configured.",
    });
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
          className="p-2 text-[#7d6c56] hover:text-[#1b4332] hover:bg-[#f3ede3] rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-[#2d6a4f]"
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
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
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
                Admin Foundation Security Notice:
              </strong>{" "}
              Anonymous write access is prohibited by Supabase Row Level Security (RLS).
              Full database write capability requires an authenticated admin session before production deployment.
            </div>
          </div>
        </div>

        {/* Form Feedback */}
        {feedback && (
          <div
            className={`p-4 rounded-2xl text-xs sm:text-sm border ${
              feedback.type === "warning"
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
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#ded5c5] bg-white text-sm text-[#1b4332] placeholder-[#8d7c68] focus:border-[#2d6a4f] focus:outline-hidden focus:ring-2 focus:ring-[#2d6a4f]/20 transition-all"
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
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#ded5c5] bg-[#fdfbf7] text-sm text-[#1b4332] font-mono placeholder-[#8d7c68] focus:border-[#2d6a4f] focus:outline-hidden focus:ring-2 focus:ring-[#2d6a4f]/20 transition-all"
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
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#ded5c5] bg-white text-sm text-[#1b4332] focus:border-[#2d6a4f] focus:outline-hidden focus:ring-2 focus:ring-[#2d6a4f]/20 transition-all"
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
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#ded5c5] bg-white text-sm text-[#1b4332] placeholder-[#8d7c68] focus:border-[#2d6a4f] focus:outline-hidden focus:ring-2 focus:ring-[#2d6a4f]/20 transition-all"
            />
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label
            htmlFor="product-image"
            className="block text-xs font-semibold uppercase tracking-wider text-[#3f4e46] mb-1.5"
          >
            Image URL / Path
          </label>
          <input
            id="product-image"
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="/images/products/banana-powder.jpg"
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#ded5c5] bg-white text-sm text-[#1b4332] placeholder-[#8d7c68] focus:border-[#2d6a4f] focus:outline-hidden focus:ring-2 focus:ring-[#2d6a4f]/20 transition-all"
          />
          <p className="text-[11px] text-[#7d6c56] mt-1">
            Supports public directory paths (e.g. /images/products/slug.jpg) or external HTTPS image links.
          </p>
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
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#ded5c5] bg-white text-sm text-[#1b4332] placeholder-[#8d7c68] focus:border-[#2d6a4f] focus:outline-hidden focus:ring-2 focus:ring-[#2d6a4f]/20 transition-all"
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
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-[#ded5c5] text-xs sm:text-sm font-semibold text-[#4a5750] hover:bg-[#f3ede3] transition-colors"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#2d6a4f] text-[#fcfaf6] text-xs sm:text-sm font-semibold hover:bg-[#1b4332] transition-colors shadow-xs focus-visible:outline-2 focus-visible:outline-[#2d6a4f]"
          >
            {isEditing ? "Save Changes" : "Create Product"}
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
        />
      </div>
    </div>
  );
}
