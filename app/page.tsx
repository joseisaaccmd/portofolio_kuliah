"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import PageTransitionLink from "@/components/PageTransitionLink";
import { useLang } from "@/components/LanguageProvider";

export default function Home() {
  const { dict } = useLang();

  return (
    <div className="relative flex-1 flex flex-col justify-between overflow-hidden px-4 md:px-8 pt-6 pb-0 animate-fade-in">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] md:w-[1100px] md:h-[1100px] hero-radial-glow pointer-events-none rounded-full blur-3xl opacity-80 animate-pulse-glow" />

      {/* Main Grid Content */}
      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-2 items-end my-auto z-10 pt-4 pb-0 relative">

        {/* Left Column */}
        <div className="lg:col-span-3 flex flex-col items-start space-y-5 text-left order-2 lg:order-1 z-20 self-center py-6">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill border border-zinc-200 dark:border-zinc-700/60 text-zinc-700 dark:text-zinc-300 text-xs font-semibold tracking-wide shadow-md animate-blur-in"
            style={{ animationDelay: "150ms" }}
          >
            <Sparkles className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
            <span>{dict.home.badgeLeft}</span>
          </div>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.1] animate-blur-in"
            style={{ animationDelay: "280ms" }}
          >
            {dict.home.firstName} <br />
            <span className="text-gradient">{dict.home.lastName}</span>
          </h1>

          <p
            className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm md:text-base leading-relaxed max-w-sm font-medium animate-blur-in"
            style={{ animationDelay: "420ms" }}
          >
            {dict.home.intro}
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-wrap items-center gap-3 pt-2 animate-fade-in"
            style={{ animationDelay: "560ms" }}
          >
            <PageTransitionLink
              href="/biodata"
              className="btn-primary text-white px-7 py-3.5 rounded-xl font-medium text-sm flex items-center gap-2 group active:scale-95 transition-all duration-300"
            >
              <span>{dict.home.btnBiodata}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300 ease-out" />
            </PageTransitionLink>

            <PageTransitionLink
              href="/galeri"
              className="px-6 py-3.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-sm font-medium active:scale-95 transition-all duration-300 ease-out shadow-sm hover:shadow-zinc-200/60 dark:hover:shadow-black/40"
            >
              {dict.home.btnGaleri}
            </PageTransitionLink>
          </div>
        </div>

        {/* Center Column: MASSIVE Hero Character Image */}
        <div className="lg:col-span-6 flex flex-col items-center justify-end order-1 lg:order-2 z-10 relative overflow-visible mb-0 pb-0 self-end animate-hero-rise" style={{ animationDelay: "200ms" }}>

          {/* Character Cutout Container */}
          <div className="relative w-full max-w-[520px] sm:max-w-[660px] md:max-w-[800px] lg:max-w-[920px] h-[560px] sm:h-[580px] md:h-[680px] lg:h-[760px] flex items-end justify-center mb-0">
            {/* Soft Ambient Light Disk behind character */}
            <div className="absolute bottom-0 w-96 h-96 md:w-[500px] md:h-[500px] bg-black/10 dark:bg-white/5 rounded-full blur-3xl -z-10 animate-pulse-glow" />

            <Image
              src="/images/hero-gemini.png"
              alt="Made Ray Joseph Hendrawan Character"
              fill
              priority
              className="object-contain object-bottom drop-shadow-[0_30px_50px_rgba(0,0,0,0.25)] filter contrast-[1.05] scale-105 md:scale-110 lg:scale-125 origin-bottom transform smooth-img-hover"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-3 flex flex-col items-start lg:items-start space-y-5 text-left order-3 z-20 self-center py-6">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill border border-zinc-200 dark:border-zinc-700/60 text-zinc-700 dark:text-zinc-300 text-xs font-semibold tracking-wide shadow-md animate-blur-in"
            style={{ animationDelay: "500ms" }}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
            <span>{dict.home.badgeRight}</span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.1] animate-blur-in"
            style={{ animationDelay: "620ms" }}
          >
            {dict.home.roleFirst} <br />
            <span className="text-gradient">{dict.home.roleLast}</span>
          </h2>

          <p
            className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm md:text-base leading-relaxed max-w-sm font-medium animate-blur-in"
            style={{ animationDelay: "740ms" }}
          >
            {dict.home.roleText}
          </p>

          {/* CTA Button */}
          <div
            className="pt-2 animate-fade-in"
            style={{ animationDelay: "860ms" }}
          >
            <PageTransitionLink
              href="/biodata"
              className="btn-primary text-white px-8 py-3.5 rounded-xl font-medium text-sm inline-flex items-center gap-2 active:scale-95 transition-all duration-300 ease-out"
            >
              <span>{dict.home.btnMore}</span>
              <ArrowRight className="w-4 h-4" />
            </PageTransitionLink>
          </div>
        </div>

      </div>
    </div>
  );
}
