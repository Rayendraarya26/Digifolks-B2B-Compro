"use client";

import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { UploadCloud, Image as ImageIcon, Trash2, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  bucket?: string;
  folder?: string;
  label?: string;
  description?: string;
}

export function ImageUploader({
  value,
  onChange,
  bucket = "portfolio-images",
  folder = "covers",
  label = "Cover Image",
  description = "Drag and drop your image here, or browse from computer. Supports PNG, JPG, WEBP up to 10MB.",
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File) => {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (PNG, JPG, WEBP, GIF, SVG).");
      return;
    }

    // Validate size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("Image size exceeds 10MB limit.");
      return;
    }

    setUploading(true);
    setError(null);

    // Instant local preview
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);

    try {
      const supabase = createClient();
      
      // Clean filename
      const fileExt = file.name.split(".").pop();
      const sanitizedName = file.name
        .replace(/\.[^/.]+$/, "")
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-");
      const fileName = `${folder}/${Date.now()}-${sanitizedName}.${fileExt}`;

      // Upload to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(fileName);
      const publicUrl = urlData.publicUrl;

      setPreview(publicUrl);
      onChange(publicUrl);
    } catch (err: any) {
      console.error("Storage upload failed:", err);
      setError(err.message || "Failed to upload image. Please check your Supabase Storage permissions.");
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      uploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      uploadFile(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70">
          {label}
        </label>
      )}

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Preview or Drop Area */}
      {preview ? (
        <div className="relative rounded-2xl border border-border-flat/20 bg-navy-base p-3 overflow-hidden group">
          <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-navy-base/80 border border-border-flat/10 flex items-center justify-center">
            <img
              src={preview}
              alt="Uploaded preview"
              className="h-full w-full object-cover"
              onError={() => setError("Preview image could not be loaded")}
            />

            {uploading && (
              <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-2 backdrop-blur-xs">
                <Loader2 className="h-6 w-6 text-accent-emerald animate-spin" />
                <span className="text-xs font-mono text-text-pure">Uploading to Supabase Storage...</span>
              </div>
            )}

            {!uploading && (
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-xs">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-1.5 rounded-xl bg-accent-emerald text-navy-base text-xs font-semibold hover:bg-accent-emerald/90 transition-all cursor-pointer shadow-lg"
                >
                  Change Image
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="p-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30 transition-all cursor-pointer"
                  title="Remove Image"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* Current URL Display */}
          <div className="mt-2.5 flex items-center justify-between px-1 text-[11px] text-text-off-white/50 font-mono">
            <span className="truncate max-w-sm">{preview}</span>
            <span className="text-accent-emerald flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" /> Ready
            </span>
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative rounded-2xl border-2 border-dashed p-8 transition-all cursor-pointer text-center flex flex-col items-center justify-center gap-3 ${
            isDragging
              ? "border-accent-emerald bg-accent-emerald/10 shadow-[0_0_25px_rgba(0,223,137,0.15)]"
              : "border-border-flat/20 bg-[#0F1E36]/40 hover:border-accent-emerald/50 hover:bg-[#0F1E36]/80"
          }`}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2 py-4">
              <Loader2 className="h-8 w-8 text-accent-emerald animate-spin" />
              <span className="text-xs font-mono text-text-off-white/80">Uploading to Supabase Storage...</span>
            </div>
          ) : (
            <>
              <div className="p-3.5 rounded-2xl bg-accent-emerald/10 border border-accent-emerald/20 text-accent-emerald">
                <UploadCloud className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-text-pure">
                  <span className="text-accent-emerald">Click to upload</span> or drag and drop
                </p>
                <p className="text-[11px] text-text-off-white/50 max-w-xs leading-relaxed">
                  {description}
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
