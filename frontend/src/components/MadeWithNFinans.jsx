import React from "react";

// Small floating "Made with nFinans" badge, replaces the Emergent watermark.
export default function MadeWithNFinans() {
  return (
    <a
      href="https://www.nfinans.net"
      target="_blank"
      rel="noopener noreferrer"
      data-testid="made-with-nfinans"
      className="fixed bottom-4 right-4 z-[60] group inline-flex items-center gap-2 pl-3 pr-3.5 py-2 rounded-full bg-black/80 backdrop-blur-md border border-amber-500/30 hover:border-amber-500/70 transition-all shadow-[0_0_30px_rgba(245,158,11,0.2)] hover:shadow-[0_0_40px_rgba(245,158,11,0.35)]"
      aria-label="Made with nFinans"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75 animate-ping" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-400 group-hover:text-white transition-colors">
        Made with
      </span>
      <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-amber-400 group-hover:text-amber-300 transition-colors">
        nFinans
      </span>
    </a>
  );
}
