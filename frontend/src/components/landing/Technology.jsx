import React from "react";
import { Cpu, Zap, Database, Shield } from "lucide-react";

const partners = [
  { name: "ThetaData", tag: "Options Chain · Tick" },
  { name: "Alpaca API", tag: "US Equities · Snapshots" },
  { name: "Deribit", tag: "Crypto Options · OI" },
  { name: "Yahoo Finance", tag: "OHLC · Historical" },
];

const stats = [
  { value: "1.2M+", label: "Opsiyon kontratı / saniye", icon: Cpu },
  { value: "<60ms", label: "WebSocket gecikme", icon: Zap },
  { value: "24/7", label: "Veri akışı", icon: Database },
  { value: "TLS 1.3", label: "Şifreli kanal", icon: Shield },
];

export default function Technology() {
  return (
    <section
      id="technology"
      data-testid="technology-section"
      className="relative py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: copy */}
          <div className="lg:col-span-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber-500 mb-4">
              // ALTYAPI & VERİ
            </div>
            <h2 className="font-mono font-black tracking-tighter text-4xl md:text-5xl text-white leading-[1.02]">
              Sıfır gecikme.
              <br />
              <span className="text-amber-400">Sınırsız veri.</span>
            </h2>
            <p className="mt-5 text-zinc-400 text-base leading-relaxed">
              Milisaniyeler içinde milyonlarca opsiyon kontratını işleyerek
              Piyasa Yapıcı (Market Maker) riskten korunma duvarlarını tespit
              ediyoruz. ThetaData&apos;nın tick-level zincirleri, Alpaca&apos;nın
              kurumsal anlık görüntüleri ve Deribit&apos;in türev verileri tek bir
              akış halinde birleşir.
            </p>

            {/* Stat grid */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {stats.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.label}
                    data-testid={`tech-stat-${s.label}`}
                    className="glass rounded-xl p-4"
                  >
                    <Icon className="h-4 w-4 text-amber-400 mb-2" />
                    <div className="font-mono text-2xl font-bold text-white">
                      {s.value}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500 mt-1">
                      {s.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Partner showcase */}
          <div className="lg:col-span-7">
            <div className="relative glass rounded-2xl p-6 lg:p-8 overflow-hidden">
              {/* Animated wire */}
              <svg
                className="absolute inset-0 w-full h-full opacity-50"
                viewBox="0 0 600 400"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="wire" x1="0" x2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0" />
                    <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M-20,80 Q150,140 300,80 T620,120"
                  stroke="url(#wire)"
                  strokeWidth="1"
                  fill="none"
                />
                <path
                  d="M-20,200 Q150,140 300,220 T620,180"
                  stroke="url(#wire)"
                  strokeWidth="1"
                  fill="none"
                />
                <path
                  d="M-20,320 Q150,260 300,320 T620,280"
                  stroke="url(#wire)"
                  strokeWidth="1"
                  fill="none"
                />
              </svg>

              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                    // veri sağlayıcıları
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-400 live-dot" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-teal-400">
                      streams_active
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {partners.map((p) => (
                    <div
                      key={p.name}
                      data-testid={`partner-${p.name}`}
                      className="group relative glass-hover rounded-xl border border-white/5 bg-black/40 p-5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-mono font-bold text-lg text-white tracking-tight">
                          {p.name}
                        </div>
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400 live-dot" />
                      </div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 mt-2">
                        {p.tag}
                      </div>
                      {/* mini wave */}
                      <svg viewBox="0 0 200 30" className="w-full h-5 mt-3 opacity-70">
                        <path
                          d="M0,15 Q25,5 50,15 T100,15 T150,15 T200,15"
                          stroke="#f59e0b"
                          strokeWidth="1"
                          fill="none"
                        />
                      </svg>
                    </div>
                  ))}
                </div>

                {/* Bottom strip */}
                <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                  <span>throughput</span>
                  <span className="text-amber-400">1.24M evt/s</span>
                  <span>latency</span>
                  <span className="text-teal-400">42ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
