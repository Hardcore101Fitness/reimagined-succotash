"use client";

import { useState } from "react";

const navLinks = [
  { label: "Programs", href: "#programs" },
  { label: "Results", href: "#results" },
  { label: "Facility", href: "#facility" },
  { label: "Coaches", href: "#coaches" },
  { label: "FAQ", href: "#faq" },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-900/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent rounded-lg flex items-center justify-center font-bold text-white text-lg sm:text-xl tracking-tight">
              HF
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-bold text-sm tracking-wider uppercase">
                Hardcore Fitness
              </div>
              <div className="text-gold text-[10px] tracking-[0.25em] uppercase">
                Est. Since Day One
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-brand-300 hover:text-white text-sm tracking-wide uppercase transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#cta"
              className="bg-accent hover:bg-accent-dark text-white px-6 py-2.5 rounded text-sm font-semibold tracking-wide uppercase transition-colors duration-200"
            >
              Book Free Trial
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-brand-900/98 backdrop-blur-md border-t border-white/10">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-brand-200 hover:text-white text-base tracking-wide uppercase transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#cta"
              onClick={() => setMobileOpen(false)}
              className="block text-center bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded text-sm font-semibold tracking-wide uppercase transition-colors mt-4"
            >
              Book Free Trial
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
