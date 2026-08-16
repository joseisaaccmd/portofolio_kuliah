"use client";

import React from "react";
import Image from "next/image";
import {
  Hash,
  MapPin,
  BookOpen,
  Target,
  Sparkles,
  ArrowRight,
  HeartHandshake,
  Dumbbell,
  Trophy,
  GraduationCap,
  Code,
  Globe,
  Share2,
  Mail,
  School,
  Users,
  Quote,
  BadgeCheck,
  Cpu,
  Layers,
  Wrench,
} from "lucide-react";
import PageTransitionLink from "@/components/PageTransitionLink";
import Reveal from "@/components/Reveal";
import { useLang } from "@/components/LanguageProvider";

interface InfoRowProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: React.ReactNode;
  valueClassName?: string;
}

function InfoRow({ icon: Icon, label, value, valueClassName = "text-zinc-900 dark:text-zinc-100" }: InfoRowProps) {
  return (
    <li className="flex items-center justify-between gap-3 py-3 border-b border-zinc-200 dark:border-zinc-800 last:border-b-0">
      <span className="flex items-center gap-2.5 text-zinc-500 dark:text-zinc-400 text-sm">
        <span className="w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-500 dark:text-zinc-400 dark:text-zinc-400 shrink-0">
          <Icon className="w-3.5 h-3.5" />
        </span>
        {label}
      </span>
      <span className={`text-sm font-semibold text-right leading-snug ${valueClassName}`}>
        {value}
      </span>
    </li>
  );
}

export default function BiodataPage() {
  const { dict } = useLang();
  const b = dict.biodata;

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 space-y-10">
      {/* ===== Slim Hero Header ===== */}
      <Reveal>
        <div className="glass-panel rounded-3xl p-6 md:p-8 border border-zinc-200 dark:border-zinc-700/60 relative overflow-hidden shadow-xl">
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-zinc-400/10 dark:bg-zinc-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-24 w-72 h-72 rounded-full bg-zinc-500/10 dark:bg-zinc-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill border border-zinc-200 dark:border-zinc-700/60 text-zinc-900 dark:text-zinc-100 dark:text-zinc-100 text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400 dark:text-zinc-400" />
                <span>{b.badgeProfile}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-[1.1]">
                {b.firstName} <span className="text-gradient">{b.lastName}</span>
              </h1>

              <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base font-medium leading-relaxed">
                {b.intro} <span className="text-zinc-900 dark:text-zinc-100 font-semibold">{b.nickname}</span>.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <span className="glass-pill px-4 py-2 rounded-xl text-xs font-semibold text-zinc-900 dark:text-zinc-100 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700/60 shadow-md flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400 dark:text-zinc-400" /> {b.nim}
              </span>
              <span className="glass-pill px-4 py-2 rounded-xl text-xs font-semibold text-zinc-900 dark:text-zinc-100 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700/60 shadow-md flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400 dark:text-zinc-400" /> {b.kelompok}
              </span>
              <span className="glass-pill px-4 py-2 rounded-xl text-xs font-semibold text-zinc-900 dark:text-zinc-100 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700/60 shadow-md flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400 dark:text-zinc-400" /> {b.prodi}
              </span>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ===== Main Grid: Sticky Sidebar + Content ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* --- Left: Sticky Profile Card --- */}
        <Reveal as="aside" className="lg:col-span-4 lg:sticky lg:top-24" delay={60}>
          <div className="glass-panel rounded-3xl p-6 border border-zinc-200 dark:border-zinc-700/60 shadow-xl space-y-5">
            {/* Photo */}
            <div className="relative w-full aspect-[3/4] max-h-[420px] rounded-2xl overflow-hidden border-2 border-zinc-300 dark:border-zinc-700/70 shadow-lg shadow-zinc-200 dark:shadow-black/40 bg-zinc-50 dark:bg-zinc-900 group">
              <Image
                src="/images/photo-biodata.jpg"
                alt="Foto Made Ray Joseph Hendrawan"
                fill
                priority
                className="object-cover object-[center_60%] filter contrast-[1.05] group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-900/70 via-transparent to-transparent p-4 pt-10">
                <p className="text-white text-sm font-bold">{b.firstName} {b.lastName}</p>
                <p className="text-zinc-200 dark:text-zinc-600 dark:text-zinc-400 text-xs font-medium flex items-center gap-1">
                  <BadgeCheck className="w-3.5 h-3.5" /> {b.roleLine}
                </p>
              </div>
            </div>

            {/* Contact */}
            <div>
              <p className="section-label mb-2.5">{b.contactLabel}</p>
              <div className="grid grid-cols-3 gap-2">
                <a
                  href="https://github.com/sosuhenk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1 p-3 rounded-xl glass-pill border border-zinc-200 dark:border-zinc-800/60 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:text-zinc-100 hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300"
                >
                  <Globe className="w-4 h-4 text-zinc-500 dark:text-zinc-400 dark:text-zinc-400" />
                  <span className="text-[10px] font-semibold">{b.github}</span>
                </a>
                <a
                  href="https://www.instagram.com/rey_tidur/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1 p-3 rounded-xl glass-pill border border-zinc-200 dark:border-zinc-800/60 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:text-zinc-100 hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300"
                >
                  <Share2 className="w-4 h-4 text-zinc-500 dark:text-zinc-400 dark:text-zinc-400" />
                  <span className="text-[10px] font-semibold">{b.instagram}</span>
                </a>
                <a
                  href="mailto:rayjosephxx@gmail.com"
                  className="flex flex-col items-center gap-1 p-3 rounded-xl glass-pill border border-zinc-200 dark:border-zinc-800/60 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:text-zinc-100 hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300"
                >
                  <Mail className="w-4 h-4 text-zinc-500 dark:text-zinc-400 dark:text-zinc-400" />
                  <span className="text-[10px] font-semibold">{b.email}</span>
                </a>
              </div>
            </div>

            {/* Hobbies */}
            <div className="border-t border-zinc-200 dark:border-zinc-800/60 pt-4">
              <p className="section-label mb-2.5">{b.hobbiesLabel}</p>
              <div className="flex flex-wrap gap-2">
                <span className="glass-pill px-3 py-1.5 rounded-xl text-[11px] font-semibold text-zinc-900 dark:text-zinc-100 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700/70 flex items-center gap-1.5">
                  <Dumbbell className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400 dark:text-zinc-400" /> {b.hobbyBadminton}
                </span>
                <span className="glass-pill px-3 py-1.5 rounded-xl text-[11px] font-semibold text-zinc-900 dark:text-zinc-100 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700/70 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400 dark:text-zinc-400" /> {b.hobbyCoding}
                </span>
                <span className="glass-pill px-3 py-1.5 rounded-xl text-[11px] font-semibold text-zinc-900 dark:text-zinc-100 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700/70 flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400 dark:text-zinc-400" /> {b.hobbyEngineer}
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* --- Right: Detail Content --- */}
        <div className="lg:col-span-8 space-y-6">
          {/* Row: Identitas + Latar Belakang */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Reveal delay={120}>
              <div className="glass-panel rounded-2xl p-6 border border-zinc-200 dark:border-zinc-700/70 space-y-3 hover:border-zinc-400 dark:hover:border-zinc-600 hover:-translate-y-1.5 transition-all duration-500 shadow-lg hover:shadow-zinc-200 dark:hover:shadow-black/40 h-full">
                <div className="flex items-center gap-3 text-zinc-500 dark:text-zinc-400 dark:text-zinc-400">
                  <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                    <Hash className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{b.identitasTitle}</h3>
                </div>

                <ul>
                  <InfoRow icon={Hash} label={b.rowNim} value="2615051089" />
                  <InfoRow icon={Users} label={b.rowKelompok} value="25" />
                  <InfoRow icon={Code} label={b.rowNamaKelompok} value={<span className="text-zinc-900 dark:text-zinc-100 dark:text-zinc-100">{b.valueVarchar}</span>} />
                </ul>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="glass-panel rounded-2xl p-6 border border-zinc-200 dark:border-zinc-700/70 space-y-3 hover:border-zinc-400 dark:hover:border-zinc-600 hover:-translate-y-1.5 transition-all duration-500 shadow-lg hover:shadow-zinc-200 dark:hover:shadow-black/40 h-full">
                <div className="flex items-center gap-3 text-zinc-500 dark:text-zinc-400 dark:text-zinc-400">
                  <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{b.latarTitle}</h3>
                </div>

                <ul>
                  <InfoRow icon={MapPin} label={b.rowAlamat} value={b.valueBlimbing} />
                  <InfoRow icon={School} label={b.rowSekolah} value={b.valueSekolah} />
                  <InfoRow
                    icon={GraduationCap}
                    label={b.rowProdi}
                    value={<span className="text-zinc-900 dark:text-zinc-100 dark:text-zinc-100">{b.valueProdi}</span>}
                  />
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Minat & Cita-cita */}
          <Reveal delay={280}>
            <div className="glass-panel rounded-2xl p-6 md:p-7 border border-zinc-200 dark:border-zinc-700/70 space-y-5 hover:border-zinc-400 dark:hover:border-zinc-600 hover:-translate-y-1.5 transition-all duration-500 shadow-lg hover:shadow-zinc-200 dark:hover:shadow-black/40">
              <div className="flex items-center gap-3 text-zinc-500 dark:text-zinc-400 dark:text-zinc-400">
                <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{b.minatTitle}</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="glass-pill p-4 rounded-xl border border-zinc-200 dark:border-zinc-700/70 space-y-1.5 hover:border-zinc-400 dark:hover:border-zinc-600 hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 dark:text-zinc-100 font-semibold text-sm">
                    <span className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center">
                      <Dumbbell className="w-4 h-4 text-zinc-500 dark:text-zinc-400 dark:text-zinc-400" />
                    </span>
                    {b.hobiUtama}
                  </div>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 font-semibold">{b.hobiValue}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{b.hobiDesc}</p>
                </div>

                <div className="glass-pill p-4 rounded-xl border border-zinc-200 dark:border-zinc-700/70 bg-zinc-50/60 dark:bg-zinc-900/60 space-y-1.5 hover:border-zinc-400 dark:hover:border-zinc-600 hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 dark:text-zinc-100 font-semibold text-sm">
                    <span className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center">
                      <Trophy className="w-4 h-4 text-zinc-500 dark:text-zinc-400 dark:text-zinc-400" />
                    </span>
                    {b.citaTitle}
                  </div>
                  <p className="text-sm text-zinc-900 dark:text-zinc-100 font-bold">{b.citaValue}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{b.citaDesc}</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Alasan Memilih TI & PTI */}
          <Reveal delay={360}>
            <div className="glass-panel rounded-3xl p-6 md:p-8 border border-zinc-200 dark:border-zinc-700/60 space-y-6 shadow-xl transition-all duration-500 hover:border-zinc-400 dark:hover:border-zinc-600">
              <div className="flex items-center gap-3 text-zinc-500 dark:text-zinc-400 dark:text-zinc-400">
                <div className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                  <BookOpen className="w-6 h-6 text-zinc-500 dark:text-zinc-400 dark:text-zinc-400" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white">
                    {b.alasanTitle} <span className="text-zinc-900 dark:text-zinc-100 dark:text-zinc-100">{b.alasanTitleAccent}</span>
                  </h2>
                  <p className="text-xs text-zinc-900 dark:text-zinc-100 dark:text-zinc-100">{b.alasanSubtitle}</p>
                </div>
              </div>

              <div className="relative">
                <Quote className="absolute -top-1 -left-1 w-8 h-8 text-zinc-200 dark:text-zinc-600 dark:text-zinc-400 rotate-180" />
                <p className="pl-5 text-zinc-700 dark:text-zinc-300 text-sm md:text-base leading-relaxed font-medium">
                  {b.alasanParagraph}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="glass-pill p-4 rounded-xl border border-zinc-200 dark:border-zinc-700/70 space-y-2 hover:border-zinc-400 dark:hover:border-zinc-600 hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 dark:text-zinc-100 font-semibold text-sm">
                    <Sparkles className="w-4 h-4 text-zinc-500 dark:text-zinc-400 dark:text-zinc-400" />
                    <span>{b.tile1Title}</span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{b.tile1Text}</p>
                </div>

                <div className="glass-pill p-4 rounded-xl border border-zinc-200 dark:border-zinc-700/70 space-y-2 hover:border-zinc-400 dark:hover:border-zinc-600 hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 dark:text-zinc-100 font-semibold text-sm">
                    <HeartHandshake className="w-4 h-4 text-zinc-500 dark:text-zinc-400 dark:text-zinc-400" />
                    <span>{b.tile2Title}</span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{b.tile2Text}</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Keahlian & Teknologi */}
          <Reveal delay={440}>
            <div className="glass-panel rounded-3xl p-6 md:p-8 border border-zinc-200 dark:border-zinc-700/60 space-y-6 shadow-xl transition-all duration-500 hover:border-zinc-400 dark:hover:border-zinc-600">
              <div className="flex items-center gap-3 text-zinc-500 dark:text-zinc-400 dark:text-zinc-400">
                <div className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                  <Cpu className="w-6 h-6 text-zinc-500 dark:text-zinc-400 dark:text-zinc-400" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white">{b.skillsTitle}</h2>
                  <p className="text-xs text-zinc-900 dark:text-zinc-100 dark:text-zinc-100">{b.skillsSubtitle}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass-pill p-4 rounded-xl border border-zinc-200 dark:border-zinc-700/70 space-y-2.5 hover:border-zinc-400 dark:hover:border-zinc-600 hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 dark:text-zinc-100 font-semibold text-sm">
                    <Code className="w-4 h-4 text-zinc-500 dark:text-zinc-400 dark:text-zinc-400" />
                    <span>{b.skillsGroupLanguage}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {b.skillsLanguageItems.map((skill) => (
                      <span key={skill} className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 bg-white/60 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700/70 px-2.5 py-1 rounded-lg">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="glass-pill p-4 rounded-xl border border-zinc-200 dark:border-zinc-700/70 space-y-2.5 hover:border-zinc-400 dark:hover:border-zinc-600 hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 dark:text-zinc-100 font-semibold text-sm">
                    <Layers className="w-4 h-4 text-zinc-500 dark:text-zinc-400 dark:text-zinc-400" />
                    <span>{b.skillsGroupWeb}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {b.skillsWebItems.map((skill) => (
                      <span key={skill} className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 bg-white/60 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700/70 px-2.5 py-1 rounded-lg">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="glass-pill p-4 rounded-xl border border-zinc-200 dark:border-zinc-700/70 space-y-2.5 hover:border-zinc-400 dark:hover:border-zinc-600 hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 dark:text-zinc-100 font-semibold text-sm">
                    <Wrench className="w-4 h-4 text-zinc-500 dark:text-zinc-400 dark:text-zinc-400" />
                    <span>{b.skillsGroupTools}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {b.skillsToolsItems.map((skill) => (
                      <span key={skill} className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 bg-white/60 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700/70 px-2.5 py-1 rounded-lg">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Galeri Preview */}
          <Reveal delay={520}>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white">
                    {b.galeriTitle} <span className="text-zinc-900 dark:text-zinc-100 dark:text-zinc-100">{b.galeriTitleAccent}</span>
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{b.galeriSubtitle}</p>
                </div>

                <PageTransitionLink
                  href="/galeri"
                  className="btn-primary text-xs text-white px-4 py-2 rounded-xl flex items-center gap-1.5 active:scale-95 transition-all duration-300"
                >
                  <span>{b.btnAllPhotos}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </PageTransitionLink>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <PageTransitionLink
                  href="/galeri"
                  className="group glass-panel rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-700/70 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-500 hover:-translate-y-1.5 shadow-lg"
                >
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src="/images/photo-biodata.jpg"
                      alt="Made Ray - Outdoors Balinese Building"
                      fill
                      className="object-cover object-[center_60%] group-hover:scale-108 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-3 left-3 text-xs text-white font-medium">
                      {b.cap1}
                    </div>
                  </div>
                </PageTransitionLink>

                <PageTransitionLink
                  href="/galeri"
                  className="group glass-panel rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-700/70 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-500 hover:-translate-y-1.5 shadow-lg"
                >
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src="/images/photo-2.jpg"
                      alt="Made Ray - Casual Blue Shirt"
                      fill
                      className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-3 left-3 text-xs text-white font-medium">
                      {b.cap2}
                    </div>
                  </div>
                </PageTransitionLink>

                <PageTransitionLink
                  href="/galeri"
                  className="group glass-panel rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-700/70 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-500 hover:-translate-y-1.5 shadow-lg"
                >
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src="/images/photo-kegiatan-group.jpg"
                      alt="Made Ray - Kegiatan Bersama"
                      fill
                      className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-3 left-3 text-xs text-white font-medium">
                      {b.cap3}
                    </div>
                  </div>
                </PageTransitionLink>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
