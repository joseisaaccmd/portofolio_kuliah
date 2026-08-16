"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Maximize2, X, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import Reveal from "@/components/Reveal";
import { useLang } from "@/components/LanguageProvider";

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  src: string;
  description: string;
}

export default function GaleriPage() {
  const { dict } = useLang();
  const g = dict.galeri;
  const [selectedFilter, setSelectedFilter] = useState<string>(g.filters[0]);
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

  const galleryItems: GalleryItem[] = g.items.map((item, idx) => ({
    id: idx + 1,
    title: item.title,
    category: item.category,
    src: ["/images/photo-1.jpg", "/images/photo-2.jpg", "/images/photo-kegiatan-group.jpg"][idx],
    description: item.description,
  }));

  const filteredItems =
    selectedFilter === g.filters[0]
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedFilter);

  const openLightbox = (index: number) => {
    setActiveItemIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setActiveItemIndex(null);
  }, []);

  const nextImage = useCallback(() => {
    setActiveItemIndex((prev) =>
      prev === null ? prev : (prev + 1) % filteredItems.length
    );
  }, [filteredItems.length]);

  const prevImage = useCallback(() => {
    setActiveItemIndex((prev) =>
      prev === null ? prev : (prev - 1 + filteredItems.length) % filteredItems.length
    );
  }, [filteredItems.length]);

  // Keyboard navigation + body scroll lock for the lightbox
  useEffect(() => {
    if (activeItemIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowRight") nextImage();
      else if (e.key === "ArrowLeft") prevImage();
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeItemIndex, closeLightbox, nextImage, prevImage]);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 space-y-10">
      {/* ===== Header Title ===== */}
      <Reveal className="text-center">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill border border-zinc-200 dark:border-zinc-700/60 text-zinc-700 dark:text-zinc-300 text-xs font-semibold tracking-wide">
            <Camera className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
            <span>{g.badge}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            {g.title} <span className="text-zinc-600 dark:text-zinc-300">{g.titleAccent}</span>
          </h1>

          <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base max-w-xl mx-auto font-medium">
            {g.desc}
          </p>
        </div>
      </Reveal>

      {/* ===== Filter Tabs ===== */}
      <Reveal delay={80}>
        <div className="flex justify-center items-center gap-2 flex-wrap">
          {g.filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-5 py-2 rounded-full text-xs font-medium active:scale-95 transition-all duration-300 ${
                selectedFilter === filter
                  ? "btn-primary text-white font-semibold shadow-lg"
                  : "glass-pill text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </Reveal>

      {/* ===== Bento Gallery Grid ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:auto-rows-[260px] lg:auto-rows-[300px]">
        {filteredItems.map((item, idx) => {
          const isFeatured = idx === 0;
          return (
            <Reveal
              key={item.id}
              delay={160 + idx * 140}
              className={`${
                isFeatured ? "sm:col-span-2 sm:row-span-2" : ""
              }`}
            >
              <button
                type="button"
                onClick={() => openLightbox(idx)}
                className="group glass-panel rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-700/70 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-zinc-200 dark:hover:shadow-black/40 cursor-pointer shadow-lg relative w-full h-full text-left flex flex-col"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] sm:aspect-auto sm:flex-1 sm:min-h-0 w-full overflow-hidden bg-zinc-50 dark:bg-zinc-900">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top group-hover:scale-108 transition-transform duration-700 ease-out"
                  />

                  {/* Dark Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Hover Zoom Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/30 backdrop-blur-xs">
                    <div className="w-12 h-12 rounded-full glass-pill border border-zinc-300 dark:border-zinc-500 flex items-center justify-center text-zinc-900 dark:text-white shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-300 ease-out">
                      <Maximize2 className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 z-10 glass-pill px-3 py-1 rounded-full text-[11px] font-semibold text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700/60 shadow-md">
                    {item.category}
                  </div>

                  {/* Featured Label */}
                  {isFeatured && (
                    <div className="absolute top-3 right-3 z-10 glass-pill px-3 py-1 rounded-full text-[11px] font-semibold text-white border border-white/40 shadow-md bg-zinc-900/50">
                      {g.featured}
                    </div>
                  )}
                </div>

                {/* Caption */}
                <div className="p-4 space-y-1 bg-zinc-50/70 dark:bg-zinc-900/70 transition-colors duration-300 group-hover:bg-zinc-100/80 dark:group-hover:bg-zinc-800/80">
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors duration-300 line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </button>
            </Reveal>
          );
        })}
      </div>

      {/* ===== Lightbox Modal ===== */}
      {activeItemIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md modal-backdrop">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 z-50 w-11 h-11 rounded-full bg-white/90 border border-white/40 text-zinc-900 flex items-center justify-center hover:bg-white active:scale-95 transition-all duration-300"
            aria-label={g.close}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev Button */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-white/90 border border-white/40 text-zinc-900 flex items-center justify-center hover:bg-white active:scale-95 transition-all duration-300"
            aria-label={g.prev}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-white/90 border border-white/40 text-zinc-900 flex items-center justify-center hover:bg-white active:scale-95 transition-all duration-300"
            aria-label={g.next}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Active Image Box */}
          <div className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center glass-panel rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-700/70 p-3 shadow-2xl modal-content">
            <div className="relative w-full h-[65vh] rounded-2xl overflow-hidden bg-black/40">
              <Image
                key={activeItemIndex}
                src={filteredItems[activeItemIndex].src}
                alt={filteredItems[activeItemIndex].title}
                fill
                sizes="(max-width: 1024px) 100vw, 64rem"
                className="object-contain lightbox-image"
              />
            </div>

            <div className="w-full pt-4 pb-2 px-4 text-center space-y-1">
              <div className="flex items-center justify-center gap-2">
                <span className="inline-block px-3 py-0.5 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700">
                  {filteredItems[activeItemIndex].category}
                </span>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-zinc-900 text-white">
                  {activeItemIndex + 1} / {filteredItems.length}
                </span>
              </div>
              <h3 className="text-base md:text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {filteredItems[activeItemIndex].title}
              </h3>
              <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 font-medium max-w-xl mx-auto">
                {filteredItems[activeItemIndex].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
