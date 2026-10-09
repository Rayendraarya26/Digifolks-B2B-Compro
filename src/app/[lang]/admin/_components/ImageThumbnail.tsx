"use client";

import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";

export function ImageThumbnail({
  src,
  alt,
  fallbackText,
}: {
  src?: string | null;
  alt: string;
  fallbackText?: string;
}) {
  const [error, setError] = useState(false);

  // If no src or error occurred, show clean placeholder
  if (!src || error) {
    return (
      <div className="h-12 w-16 rounded-lg bg-navy-base border border-border-flat/20 flex flex-col items-center justify-center text-text-off-white/40">
        <ImageIcon className="h-4 w-4 opacity-50" />
        {fallbackText && (
          <span className="text-[9px] font-mono mt-0.5 truncate max-w-[50px] uppercase">
            {fallbackText.slice(0, 3)}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="h-12 w-16 rounded-lg bg-navy-base border border-border-flat/10 overflow-hidden flex items-center justify-center relative group">
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        onError={() => setError(true)}
      />
    </div>
  );
}
