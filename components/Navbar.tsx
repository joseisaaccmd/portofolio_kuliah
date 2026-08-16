"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import PageTransitionLink, {
  navigateWithTransition,
} from "./PageTransitionLink";
import { useLang } from "./LanguageProvider";
import { useTheme } from "./ThemeProvider";
import {
  Search,
  Menu,
  X,
  ChevronDown,
  User,
  ExternalLink,
  Globe,
  Share2,
  Mail,
  Code,
  Languages,
  Sun,
  Moon,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { lang, dict, setLang } = useLang();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navLinks = [
    { name: dict.nav.home, href: "/" },
    { name: dict.nav.biodata, href: "/biodata" },
    { name: dict.nav.galeri, href: "/galeri" },
  ];

  // Live filtered search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return dict.nav.searchIndex.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );
  }, [searchQuery, dict.nav.searchIndex]);

  const handleSelectSearchResult = (href: string) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    navigateWithTransition(href, (h) => router.push(h), pathname);
  };

  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className="sticky top-0 left-0 right-0 z-50 w-full bg-white/90 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 px-4 py-3 md:px-10 shadow-xl shadow-zinc-100/60 dark:shadow-black/30 transition-all"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Brand Logo */}
        <PageTransitionLink href="/" className="group flex items-center gap-2">
          <span className="text-xl md:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white group-hover:text-black dark:group-hover:text-zinc-300 transition-colors">
            Joseph
          </span>
        </PageTransitionLink>

        {/* Center: Floating Navigation Pill */}
        <nav className="hidden md:flex items-center gap-1 rounded-full px-4 py-1.5 border border-zinc-700 bg-zinc-900 shadow-lg shadow-black/30">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <PageTransitionLink
                key={link.name}
                href={link.href}
                className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-1.5 ${
                  isActive
                    ? "bg-white/10 text-white border border-white/20 font-semibold"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.name}
                {link.name === "Biodata" && (
                  <ChevronDown className="w-3.5 h-3.5 opacity-75" />
                )}
              </PageTransitionLink>
            );
          })}
        </nav>

        {/* Right: Action Controls (Search, Language, Theme & Menu Icons) */}
        <div className="flex items-center gap-2.5">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full glass-pill flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-95 transition-all duration-300 focus:outline-none"
            aria-label={theme === "light" ? dict.nav.themeDark : dict.nav.themeLight}
            title={theme === "light" ? dict.nav.themeDark : dict.nav.themeLight}
          >
            {theme === "light" ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
          </button>

          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === "id" ? "en" : "id")}
            className="h-10 pl-3 pr-2 rounded-full glass-pill flex items-center gap-2 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-95 transition-all duration-300 focus:outline-none"
            aria-label="Ganti Bahasa"
            title={lang === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
          >
            <Languages className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
            <span className="text-xs font-bold tracking-wide flex items-center gap-1">
              <span className={lang === "id" ? "text-zinc-900 dark:text-white" : "text-zinc-400 dark:text-zinc-500"}>ID</span>
              <span className="text-zinc-300 dark:text-zinc-600">/</span>
              <span className={lang === "en" ? "text-zinc-900 dark:text-white" : "text-zinc-400 dark:text-zinc-500"}>EN</span>
            </span>
          </button>

          {/* Search Button */}
          <button
            onClick={() => {
              setIsSearchOpen(!isSearchOpen);
              if (isMobileMenuOpen) setIsMobileMenuOpen(false);
            }}
            className={`w-10 h-10 rounded-full glass-pill flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-95 transition-all duration-300 focus:outline-none ${
              isSearchOpen ? "border-zinc-400 dark:border-zinc-500 text-zinc-900 dark:text-white" : ""
            }`}
            aria-label={dict.nav.search}
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              if (isSearchOpen) setIsSearchOpen(false);
            }}
            className={`w-10 h-10 rounded-full glass-pill flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-95 transition-all duration-300 focus:outline-none ${
              isMobileMenuOpen ? "border-zinc-400 dark:border-zinc-500 text-zinc-900 dark:text-white" : ""
            }`}
            aria-label={dict.nav.toggleMenu}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Live Search Popup Overlay */}
      {isSearchOpen && (
        <div className="max-w-2xl mx-auto mt-3 px-2 modal-drop">
          <div className="glass-panel rounded-2xl p-3 border border-zinc-200 dark:border-zinc-700/60 shadow-2xl space-y-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-zinc-50/80 dark:bg-zinc-900/80 rounded-xl border border-zinc-200 dark:border-zinc-800/70">
              <Search className="w-5 h-5 text-zinc-500 dark:text-zinc-400 shrink-0" />
              <input
                type="text"
                placeholder={dict.nav.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none w-full"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-xs text-zinc-400 hover:text-zinc-900 dark:hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Live Search Results Dropdown */}
            {searchQuery.trim() !== "" && (
              <div className="max-h-72 overflow-y-auto space-y-1.5 pr-1 pt-1">
                {searchResults.length > 0 ? (
                  searchResults.map((result, index) => (
                    <div
                      key={index}
                      onClick={() => handleSelectSearchResult(result.href)}
                      className="p-3 rounded-xl glass-pill hover:bg-zinc-50 dark:hover:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-800/60 cursor-pointer flex items-center justify-between transition-all duration-200 group"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-700">
                            {result.category}
                          </span>
                          <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
                            {result.title}
                          </h4>
                        </div>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium pl-0.5">
                          {result.description}
                        </p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 shrink-0" />
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-zinc-500 dark:text-zinc-400">
                    {dict.nav.noResults} &quot;<span className="text-zinc-900 dark:text-zinc-100 font-semibold">{searchQuery}</span>&quot;
                  </div>
                )}
              </div>
            )}

            {/* Quick Search Tag Suggestions */}
            {!searchQuery && (
              <div className="flex items-center gap-2 flex-wrap pt-1 px-1">
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400">{dict.nav.suggestionsLabel}</span>
                {dict.nav.suggestions.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="text-xs glass-pill px-2.5 py-1 rounded-lg text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-zinc-700"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Rich Mobile Drawer Menu (Enriched & Feature-Packed) */}
      {isMobileMenuOpen && (
        <div className="mt-3 max-w-lg mx-auto glass-panel rounded-3xl p-6 border border-zinc-200 dark:border-zinc-700/60 shadow-2xl modal-drop space-y-6">
          
          {/* Menu Header Card with Ray's Profile Summary */}
          <div className="flex items-center gap-4 p-4 rounded-2xl glass-pill border border-zinc-200 dark:border-zinc-800/60">
            <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700/70 shrink-0">
              <Image
                src="/images/photo-biodata.jpg"
                alt="Made Ray Joseph Hendrawan"
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-zinc-900 dark:text-zinc-100">
                Made Ray Joseph Hendrawan
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-300 font-medium flex items-center gap-1">
                <Code className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" /> {dict.biodata.nim}
              </p>
              <span className="inline-block text-[10px] font-semibold text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-700">
                {dict.nav.kelompokBadge}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1.5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 px-2">
              {dict.nav.navLabel}
            </p>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <PageTransitionLink
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${
                    isActive
                      ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-700 font-semibold shadow-md"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
                >
                  <span>{link.name}</span>
                  <ExternalLink className="w-4 h-4 opacity-50" />
                </PageTransitionLink>
              );
            })}
          </div>

          {/* Social Media & Contact Quick Buttons inside Drawer */}
          <div className="space-y-2 pt-2 border-t border-zinc-200 dark:border-zinc-800/60">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 px-2">
              {dict.nav.socialLabel}
            </p>
            <div className="grid grid-cols-3 gap-2">
              <a
                href="https://github.com/sosuhenk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl glass-pill text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600"
              >
                <Globe className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                <span>{dict.biodata.github}</span>
              </a>
              <a
                href="https://www.instagram.com/rey_tidur/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl glass-pill text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600"
              >
                <Share2 className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                <span>{dict.biodata.instagram}</span>
              </a>
              <a
                href="mailto:rayjosephxx@gmail.com"
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl glass-pill text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600"
              >
                <Mail className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                <span>{dict.biodata.email}</span>
              </a>
            </div>
          </div>

          {/* Bottom Drawer Quick CTA */}
          <div className="pt-1">
            <PageTransitionLink
              href="/biodata"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full btn-primary text-white py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>{dict.nav.viewBiodata}</span>
            </PageTransitionLink>
          </div>

        </div>
      )}
    </header>
  );
}
