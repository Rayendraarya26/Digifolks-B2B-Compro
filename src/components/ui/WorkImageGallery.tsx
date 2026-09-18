"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  RotateCcw,
  X,
  ChevronLeft,
  ChevronRight,
  Expand,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface WorkImageGalleryProps {
  coverImage: string;
  galleryImages: string[];
  projectTitle: string;
  labels?: {
    galleryTitle?: string;
    galleryDesc?: string;
    noGallery?: string;
    zoomHint?: string;
    coverLabel?: string;
    screenshotLabel?: string;
  };
}

export function WorkImageGallery({
  coverImage,
  galleryImages,
  projectTitle,
  labels = {},
}: WorkImageGalleryProps) {
  // Combine all images: cover image is index 0, followed by gallery screenshots
  const allImages = React.useMemo(() => {
    const list = [{ url: coverImage, label: labels.coverLabel || "Cover" }];
    galleryImages.forEach((img, idx) => {
      if (img !== coverImage) {
        list.push({
          url: img,
          label: `${labels.screenshotLabel || "Screenshot"} ${idx + 1}`,
        });
      }
    });
    return list;
  }, [coverImage, galleryImages, labels.coverLabel, labels.screenshotLabel]);

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const dragStartRef = useRef({ x: 0, y: 0 });
  const panStartRef = useRef({ x: 0, y: 0 });
  const hasMovedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Open modal at specific image
  const openModal = (index: number) => {
    setCurrentIndex(index);
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setIsOpen(true);
  };

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  // Reset zoom & pan
  const resetZoom = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + 0.5, 4));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % allImages.length);
    resetZoom();
  }, [allImages.length, resetZoom]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    resetZoom();
  }, [allImages.length, resetZoom]);

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Double click toggles between 1x and 2.5x zoom
  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (zoom > 1) {
      resetZoom();
    } else {
      setZoom(2.5);
    }
  };

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      // Zoom in
      setZoom((prev) => Math.min(prev + 0.25, 4));
    } else {
      // Zoom out
      setZoom((prev) => {
        const next = Math.max(prev - 0.25, 1);
        if (next === 1) setPan({ x: 0, y: 0 });
        return next;
      });
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    hasMovedRef.current = false;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    panStartRef.current = { ...pan };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoom <= 1) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      hasMovedRef.current = true;
    }
    setPan({
      x: panStartRef.current.x + dx,
      y: panStartRef.current.y + dy,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch drag handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (zoom <= 1 || e.touches.length !== 1) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    panStartRef.current = { ...pan };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || zoom <= 1 || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - dragStartRef.current.x;
    const dy = e.touches[0].clientY - dragStartRef.current.y;
    setPan({
      x: panStartRef.current.x + dx,
      y: panStartRef.current.y + dy,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Keyboard navigation & lock scroll
  useEffect(() => {
    if (!isOpen) return;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "+" || e.key === "=") {
        handleZoomIn();
      } else if (e.key === "-" || e.key === "_") {
        handleZoomOut();
      } else if (e.key === "0" || e.key === "r" || e.key === "R") {
        resetZoom();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeModal, handleNext, handlePrev, handleZoomIn, handleZoomOut, resetZoom]);

  const activeImage = allImages[currentIndex];
  const zoomHint = labels.zoomHint || "Click to zoom";

  return (
    <>
      {/* Cover Image — Clickable & Full Width */}
      <div className="mb-6">
        <div
          role="button"
          tabIndex={0}
          onClick={() => openModal(0)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") openModal(0);
          }}
          className="relative group block rounded-2xl overflow-hidden border border-border-flat shadow-lg bg-navy-base cursor-zoom-in transition-all duration-300 hover:shadow-2xl hover:border-accent-emerald/40 focus:outline-none focus:ring-2 focus:ring-accent-emerald"
          aria-label={`View ${projectTitle} cover image fullscreen`}
        >
          <img
            src={coverImage}
            alt={`${projectTitle} — Cover`}
            className="w-full h-auto object-cover max-h-[500px] group-hover:scale-[1.02] transition-transform duration-500"
          />
          {/* Subtle dark gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-base/80 via-navy-base/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-navy-base/90 backdrop-blur-md text-text-pure text-xs md:text-sm font-medium border border-white/20 shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <Expand className="w-4 h-4 text-accent-emerald" />
              <span>{zoomHint}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Grid — Clickable Items */}
      {galleryImages.length > 0 ? (
        <div className="columns-1 md:columns-2 gap-6 space-y-6">
          {galleryImages.map((imgSrc, idx) => {
            const imageIndex = allImages.findIndex((item) => item.url === imgSrc);
            const targetIndex = imageIndex >= 0 ? imageIndex : idx + 1;

            return (
              <div
                key={idx}
                role="button"
                tabIndex={0}
                onClick={() => openModal(targetIndex)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") openModal(targetIndex);
                }}
                className="rounded-2xl overflow-hidden border border-border-flat shadow-sm bg-navy-base relative group break-inside-avoid cursor-zoom-in transition-all duration-300 hover:shadow-xl hover:border-accent-emerald/40 focus:outline-none focus:ring-2 focus:ring-accent-emerald"
                aria-label={`View ${projectTitle} screenshot ${idx + 1} fullscreen`}
              >
                <img
                  src={imgSrc}
                  alt={`${projectTitle} — Screenshot ${idx + 1}`}
                  className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-base/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-base/90 backdrop-blur-md text-text-pure text-xs font-medium border border-white/20 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <ZoomIn className="w-3.5 h-3.5 text-accent-emerald" />
                    <span>{zoomHint}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        labels.noGallery && (
          <p className="text-sm text-text-muted italic py-4">
            {labels.noGallery}
          </p>
        )
      )}

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {isOpen && activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] flex flex-col bg-[#070e1c]/95 backdrop-blur-2xl text-text-pure select-none overflow-hidden"
          >
            {/* Top Bar Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 z-20 border-b border-white/10 bg-navy-base/50 backdrop-blur-md">
              {/* Left info */}
              <div className="flex items-center gap-3 min-w-0 pr-4">
                <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/10 text-xs font-mono text-accent-emerald font-semibold flex-shrink-0">
                  {currentIndex + 1} / {allImages.length}
                </span>
                <div className="min-w-0 truncate">
                  <h3 className="text-sm font-semibold text-text-pure truncate">
                    {projectTitle}
                  </h3>
                  <p className="text-[11px] text-text-off-white/60 font-mono truncate">
                    {activeImage.label}
                  </p>
                </div>
              </div>

              {/* Center Floating Zoom Controls (Desktop / Tablet) */}
              <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full bg-navy-light/90 border border-white/15 shadow-2xl backdrop-blur-xl">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  disabled={zoom <= 1}
                  className="p-1.5 rounded-full text-text-off-white/80 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                  title="Zoom Out (-)"
                  aria-label="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => (zoom > 1 ? resetZoom() : setZoom(2))}
                  className="px-2.5 py-0.5 text-xs font-mono font-medium rounded text-accent-emerald hover:bg-accent-emerald/10 transition-colors"
                  title="Toggle Zoom"
                >
                  {Math.round(zoom * 100)}%
                </button>

                <button
                  type="button"
                  onClick={handleZoomIn}
                  disabled={zoom >= 4}
                  className="p-1.5 rounded-full text-text-off-white/80 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                  title="Zoom In (+)"
                  aria-label="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>

                <div className="w-[1px] h-4 bg-white/20 mx-1" />

                <button
                  type="button"
                  onClick={resetZoom}
                  disabled={zoom === 1 && pan.x === 0 && pan.y === 0}
                  className="p-1.5 rounded-full text-text-off-white/80 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                  title="Reset Zoom (0 / R)"
                  aria-label="Reset Zoom"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Right actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="hidden md:inline-flex p-2 rounded-lg text-text-off-white/70 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10 transition-all"
                  title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                  aria-label="Toggle Fullscreen"
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={closeModal}
                  className="p-2 rounded-lg text-text-off-white/80 hover:text-white bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 transition-all group"
                  title="Close (Esc)"
                  aria-label="Close Lightbox"
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
                </button>
              </div>
            </div>

            {/* Main Interactive Stage */}
            <div
              ref={containerRef}
              className={`relative flex-1 flex items-center justify-center overflow-hidden p-4 md:p-8 select-none ${
                zoom > 1
                  ? isDragging
                    ? "cursor-grabbing"
                    : "cursor-grab"
                  : "cursor-zoom-in"
              }`}
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onClick={(e) => {
                // If clicked backdrop (and not dragging/moving), close modal if zoom is 1
                if (e.target === containerRef.current && !hasMovedRef.current) {
                  closeModal();
                }
              }}
            >
              {/* Previous Button */}
              {allImages.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-navy-base/80 hover:bg-accent-emerald hover:text-navy-base text-text-pure border border-white/15 backdrop-blur-md shadow-2xl transition-all duration-200 hover:scale-110 active:scale-95"
                  aria-label="Previous Image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              {/* Next Button */}
              {allImages.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-navy-base/80 hover:bg-accent-emerald hover:text-navy-base text-text-pure border border-white/15 backdrop-blur-md shadow-2xl transition-all duration-200 hover:scale-110 active:scale-95"
                  aria-label="Next Image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}

              {/* Centered Image with Smooth Zoom & Drag Transform */}
              <div
                className="relative max-w-full max-h-full flex items-center justify-center"
                style={{
                  transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
                  transition: isDragging ? "none" : "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                  transformOrigin: "center center",
                }}
                onDoubleClick={handleDoubleClick}
              >
                <img
                  src={activeImage.url}
                  alt={`${projectTitle} — ${activeImage.label}`}
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  className="max-w-[90vw] max-h-[75vh] md:max-h-[80vh] w-auto h-auto object-contain rounded-lg shadow-2xl pointer-events-auto select-none"
                />
              </div>

              {/* Mobile Zoom Controls Overlay Bar */}
              <div className="sm:hidden absolute bottom-24 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 px-3 py-1.5 rounded-full bg-navy-base/90 border border-white/20 backdrop-blur-xl shadow-2xl">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleZoomOut();
                  }}
                  disabled={zoom <= 1}
                  className="p-2 rounded-full text-white disabled:opacity-30"
                  aria-label="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="px-2 text-xs font-mono text-accent-emerald">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleZoomIn();
                  }}
                  disabled={zoom >= 4}
                  className="p-2 rounded-full text-white disabled:opacity-30"
                  aria-label="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    resetZoom();
                  }}
                  className="p-2 rounded-full text-white/80"
                  aria-label="Reset Zoom"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Bottom Thumbnail Strip */}
            {allImages.length > 1 && (
              <div className="px-4 py-3 z-20 border-t border-white/10 bg-navy-base/60 backdrop-blur-md flex items-center justify-center">
                <div className="flex items-center gap-2 max-w-full overflow-x-auto py-1 px-2 no-scrollbar">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setCurrentIndex(idx);
                        resetZoom();
                      }}
                      className={`relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        currentIndex === idx
                          ? "border-accent-emerald scale-105 shadow-[0_0_12px_rgba(0,223,137,0.3)]"
                          : "border-white/20 opacity-60 hover:opacity-100 hover:border-white/40"
                      }`}
                      aria-label={`Switch to ${img.label}`}
                    >
                      <img
                        src={img.url}
                        alt={img.label}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
