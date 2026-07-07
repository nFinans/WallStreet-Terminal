import React, { useState } from "react";
import { Terminal, Menu, X } from "lucide-react";

const links = [
  { label: "Modüller", href: "#features" },
  { label: "Altyapı", href: "#technology" },
  { label: "Paketler", href: "#pricing" },
  { label: "Topluluk", href: "#community" },
  { label: "Blog", href: "https://blog.privyalgo.com", external: true },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      data-testid="navbar"
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/60 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#top"
            data-testid="navbar-logo"
            className="flex items-center gap-2.5 group"
          >
            <div className="relative">
              <div className="h-8 w-8 rounded-md border border-amber-500/40 bg-amber-500/10 flex items-center justify-center glow-amber">
                <Terminal className="h-4 w-4 text-amber-400" strokeWidth={2.5} />
              </div>
              <div className="absolute -inset-1 rounded-md bg-amber-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="font-mono">
              <div className="text-[15px] font-bold tracking-tight text-white leading-none">
                PrivyAlgo
              </div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-amber-500/80 leading-none mt-1">
                WallStreet Terminal
              </div>
            </div>
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-testid={`navbar-link-${l.href.replace("#", "")}`}
                className="font-mono text-[13px] uppercase tracking-[0.15em] text-zinc-400 hover:text-amber-400 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-500">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-400 live-dot" />
              LIVE
            </div>
            <a
              href="https://wallstreet.privyalgo.com/app"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="navbar-cta"
              className="font-mono text-[13px] font-semibold px-4 py-2 rounded-md bg-amber-500 text-black hover:bg-amber-400 transition-colors"
            >
              Sisteme Eriş
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            data-testid="navbar-mobile-toggle"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden h-9 w-9 rounded-md border border-white/10 flex items-center justify-center text-white"
            aria-label="Menüyü aç"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div
            data-testid="navbar-mobile-menu"
            className="md:hidden pb-4 flex flex-col gap-3 border-t border-white/5 pt-4"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-mono text-sm text-zinc-300 hover:text-amber-400"
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://wallstreet.privyalgo.com/app"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="font-mono text-sm font-semibold px-4 py-2 rounded-md bg-amber-500 text-black w-fit"
            >
              Sisteme Eriş
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
