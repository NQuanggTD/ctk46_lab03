"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const themeStorageKey = "theme";

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return false;
    }

    const savedTheme = window.localStorage.getItem(themeStorageKey);
    if (savedTheme) {
      return savedTheme === "dark";
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((currentValue) => {
      const nextValue = !currentValue;
      document.documentElement.classList.toggle("dark", nextValue);
      window.localStorage.setItem(
        themeStorageKey,
        nextValue ? "dark" : "light",
      );
      return nextValue;
    });
  };

  return (
    <nav className="border-b border-slate-200/70 bg-white/85 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="container mx-auto flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-slate-950 dark:text-white"
        >
          Portfolio
        </Link>
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <Link
            href="/"
            className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-brand-violet dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            Trang chu
          </Link>
          <Link
            href="/about"
            className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-brand-violet dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            Gioi thieu
          </Link>
          <Link
            href="/blog"
            className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-brand-violet dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            Blog
          </Link>
          <Link
            href="/projects"
            className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-brand-violet dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            Du an
          </Link>
          <Link
            href="/guestbook"
            className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-brand-violet dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            Luu but
          </Link>
          <Link
            href="/contact"
            className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-brand-violet dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            Lien he
          </Link>
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-brand-violet hover:text-brand-violet dark:border-slate-700 dark:text-slate-100 dark:hover:border-brand-emerald dark:hover:text-brand-emerald"
            aria-pressed={isDarkMode}
          >
            {isDarkMode ? "Light mode" : "Dark mode"}
          </button>
        </div>
      </div>
    </nav>
  );
}
