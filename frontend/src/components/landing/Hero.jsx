import React from "react";
import { Terminal, PlayCircle, ArrowRight } from "lucide-react";
import TerminalMockup from "@/components/landing/TerminalMockup";
import VolatilitySurface from "@/components/landing/VolatilitySurface";

const tickers = [
  { sym: "SPX", val: "4,508.32", chg: "+0.42%", up: true },
  { sym: "QQQ", val: "382.11", chg: "+1.08%", up: true },
  { sym: "VIX", val: "13.84", chg: "-3.21%", up: false },
  { sym: "GEX·NET", val: "+1.42B", chg: "POZ", up: true },
  { sym: "0DTE WGT", val: "62%", chg: "↑", up: true },
  { sym: "DEX·NET", val: "-820M", chg: "NEG", up: false },
  { sym: "VANNA", val: "-0.18", chg: "FLOW", up: false },
  { sym: "BTC", val: "104,250", chg: "+2.14%", up: true },
];

export default function Hero() {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative pt-32 pb-20 lg:pt-40 lg:pb-28"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Pill tag */}
        <div className="fade-up flex justify-center mb-8">
          <div
            data-testid="hero-pill"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/5 backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-teal-400 live-dot" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber-300">
              Privy Neural Algo · v3.0 · WallStreet
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1
          data-testid="hero-headline"
          className="fade-up delay-1 font-mono font-black tracking-tighter text-center text-white text-5xl md:text-6xl lg:text-7xl leading-[0.95]"
        >
          Piyasa Mekaniklerini
          <br />
          <span className="text-amber-400 text-glow-amber">Yeniden Tanımla.</span>
        </h1>

        {/* Sub-headline */}
        <p
          data-testid="hero-subheadline"
          className="fade-up delay-2 mt-7 max-w-3xl mx-auto text-center text-zinc-400 text-base md:text-lg leading-relaxed"
        >
          Gerçek zamanlı kurumsal emir akışı, <span className="text-teal-300">sıfır gecikmeli</span> WebSocket altyapısı ve
          <span className="text-purple-300"> kantitatif opsiyon modelleri</span> ile Wall Street&apos;in kara kutusunu aydınlatın.
          GEX, VEX, DEX ve 0DTE dinamiklerini saniye saniye okuyun.
        </p>

        {/* CTAs */}
        <div
          id="cta"
          className="fade-up delay-3 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://wallstreet.privyalgo.com"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="hero-cta-primary"
            className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-amber-500 text-black font-mono font-bold text-sm uppercase tracking-wider hover:bg-amber-400 transition-all glow-amber-strong active:scale-95"
          >
            <Terminal className="h-4 w-4" strokeWidth={2.5} />
            Sisteme Eriş
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="https://www.youtube.com/@NFinans"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="hero-cta-secondary"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-white/10 bg-zinc-900/60 backdrop-blur text-white font-mono font-medium text-sm uppercase tracking-wider hover:border-amber-500/50 hover:bg-zinc-900 transition-all active:scale-95"
          >
            <PlayCircle className="h-4 w-4 text-amber-400" />
            Eğitimleri İzle
          </a>
        </div>

        {/* Ticker tape */}
        <div className="fade-up delay-4 mt-12 relative">
          <div className="overflow-hidden border-y border-white/5 bg-black/40 backdrop-blur">
            <div className="marquee flex gap-10 py-3 whitespace-nowrap">
              {[...tickers, ...tickers].map((t, i) => (
                <div key={i} className="flex items-center gap-3 font-mono text-xs">
                  <span className="text-zinc-500 uppercase tracking-[0.2em]">{t.sym}</span>
                  <span className="text-white font-semibold">{t.val}</span>
                  <span
                    className={
                      t.up ? "text-teal-400" : "text-purple-400"
                    }
                  >
                    {t.chg}
                  </span>
                  <span className="text-zinc-700">·</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dual visual stack */}
        <div className="fade-up delay-5 mt-14 grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
          <div className="lg:col-span-3" data-testid="hero-terminal">
            <TerminalMockup />
          </div>
          <div className="lg:col-span-2" data-testid="hero-surface">
            <VolatilitySurface />
          </div>
        </div>
      </div>
    </section>
  );
}
