"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

interface PageTransitionLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

function routeDepth(path: string): number {
  if (path === "/") return 0;
  return path.split("/").filter(Boolean).length;
}

function getPageShell(): HTMLElement | null {
  return document.getElementById("page-shell");
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function clearTransitionClasses() {
  document.documentElement.classList.remove("vt-forward", "vt-back");
}

function clearExitClass() {
  getPageShell()?.classList.remove("page-exit");
}

let navigating = false;

/**
 * Navigate to `href` with a smooth transition.
 * - Uses the browser View Transitions API when available (Chrome/Edge/Safari/Firefox baru).
 * - Falls back to a pure CSS exit animation that works in every browser.
 */
export function navigateWithTransition(
  href: string,
  push: (href: string) => void,
  currentPath: string
) {
  if (navigating || href === currentPath) return;
  clearExitClass();

  const doc = document as Document & {
    startViewTransition?: (callback: () => void | Promise<void>) => {
      finished: Promise<void>;
    };
  };

  if (!doc.startViewTransition || prefersReducedMotion()) {
    const shell = getPageShell();
    if (shell) {
      navigating = true;
      shell.classList.add("page-exit");
      setTimeout(() => {
        clearExitClass();
        navigating = false;
        push(href);
      }, 360);
    } else {
      push(href);
    }
    return;
  }

  const html = document.documentElement;
  clearTransitionClasses();
  const targetDepth = routeDepth(href);
  const currentDepth = routeDepth(currentPath);
  if (targetDepth > currentDepth) html.classList.add("vt-forward");
  else if (targetDepth < currentDepth) html.classList.add("vt-back");

  navigating = true;
  const transition = doc.startViewTransition(async () => {
    push(href);
    await new Promise((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(resolve))
    );
  });
  transition.finished
    .catch(() => {})
    .finally(() => {
      navigating = false;
      clearTransitionClasses();
      clearExitClass();
    });
}

export default function PageTransitionLink({
  href,
  children,
  className,
  onClick,
}: PageTransitionLinkProps) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    clearExitClass();
  }, [pathname]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    navigateWithTransition(href, (h) => router.push(h), pathname);
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
