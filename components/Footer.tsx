"use client";

import React from "react";
import { useLang } from "./LanguageProvider";

export default function Footer() {
  const { dict } = useLang();

  return (
    <footer className="w-full py-6 px-6 md:px-12 border-t border-zinc-200 dark:border-zinc-800/60 glass-panel mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
        {/* Bottom Left: Copyright notice matching reference */}
        <div className="space-y-0.5">
          <p className="font-medium tracking-wide text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
            {dict.footer.rights}
          </p>
          <p className="text-[11px] text-zinc-400 dark:text-zinc-500 hidden sm:block">{dict.footer.madeBy}</p>
        </div>

        {/* Bottom Right: Social media initials matching reference */}
        <div className="flex items-center gap-6 font-semibold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase">
          <a
            href="https://www.instagram.com/rey_tidur/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            IN
          </a>
          <a
            href="https://www.linkedin.com/in/made-ray-joseph-hendrawan"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            LI
          </a>
        </div>
      </div>
    </footer>
  );
}
