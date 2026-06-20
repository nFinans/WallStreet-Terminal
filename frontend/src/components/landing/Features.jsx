import React from "react";
import { Activity, Grid3x3, Zap, BarChart2, ArrowUpRight } from "lucide-react";

const features = [
  {
    id: "opus-wall",
    title: "Opus Wall & Cockpit",
    subtitle: "Piyasa rejimi · Net GEX · Vanna",
    description:
      "Gerçek zamanlı piyasa rejimi, Net GEX ve Vanna (VEX) dinamikleri. Piyasanın yönünü belirleyen algoritmik seviyeleri tek ekranda okuyun.",
    icon: Activity,
    color: "amber",
    metrics: [
      { label: "REJİM", value: "POZ. GAMMA" },
      { label: "NET GEX", value: "+1.42B" },
      { label: "VANNA", value: "-0.18" },
    ],
    span: "md:col-span-2 md:row-span-2",
    big: true,
  },
  {
    id: "greeks",
    title: "Greeks Heatmap",
    subtitle: "Vade yapısı · Likidite duvarları",
    description:
      "Uzaysal vade yapısı ve likidite duvarları. Opsiyon piyasasındaki gizli destek ve direnç bölgelerini haritalayın.",
    icon: Grid3x3,
    color: "teal",
    span: "md:col-span-2",
  },
  {
    id: "0dte",
    title: "0DTE Map",
    subtitle: "Gün içi baskı · Gamma seviyeleri",
    description:
      "Gün içi baskı ve 0DTE gamma seviyeleri ile volatilite patlamalarını önceden tespit edin.",
    icon: Zap,
    color: "purple",
    span: "md:col-span-2",
  },
  {
    id: "interval",
    title: "Interval Map",
    subtitle: "Hacim profili · Zaman analizi",
    description:
      "Fiyat hareketi üzerine bindirilmiş hacim ve zaman profilleri. Kurumsal ayak izlerini saniye saniye takip edin.",
    icon: BarChart2,
    color: "amber",
    span: "md:col-span-4",
    wide: true,
  },
];

const colorMap = {
  amber: {
    text: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    glow: "from-amber-500/20",
  },
  teal: {
    text: "text-teal-400",
    bg: "bg-teal-400/10",
    border: "border-teal-400/30",
    glow: "from-teal-500/20",
  },
  purple: {
    text: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    glow: "from-purple-500/20",
  },
};

function MiniHeatmap({ color }) {
  return (
    <div className="grid grid-cols-10 gap-0.5 mt-4">
      {Array.from({ length: 40 }).map((_, i) => {
        const intensity = Math.abs(
          Math.sin(i * 1.13) * Math.cos(i * 0.47)
        );
        const palette =
          color === "teal"
            ? "45,212,191"
            : color === "purple"
            ? "168,85,247"
            : "245,158,11";
        return (
          <div
            key={i}
            className="h-3 rounded-[2px]"
            style={{
              background: `rgba(${palette}, ${0.1 + intensity * 0.6})`,
            }}
          />
        );
      })}
    </div>
  );
}

function GammaProfile({ color }) {
  const palette =
    color === "teal" ? "#2dd4bf" : color === "purple" ? "#a855f7" : "#f59e0b";
  return (
    <svg viewBox="0 0 200 60" className="w-full h-16 mt-4">
      <defs>
        <linearGradient id={`prof-${color}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={palette} stopOpacity="0.6" />
          <stop offset="100%" stopColor={palette} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0,50 Q20,30 40,38 T80,20 T120,42 T160,28 T200,38 L200,60 L0,60 Z"
        fill={`url(#prof-${color})`}
      />
      <path
        d="M0,50 Q20,30 40,38 T80,20 T120,42 T160,28 T200,38"
        fill="none"
        stroke={palette}
        strokeWidth="1.6"
        opacity="0.9"
      />
    </svg>
  );
}

function IntervalChart() {
  const bars = Array.from({ length: 36 });
  return (
    <div className="mt-5 h-32 flex items-end gap-1">
      {bars.map((_, i) => {
        const v = 30 + Math.abs(Math.sin(i * 0.7) * 60) + (i % 5 === 0 ? 20 : 0);
        const isAccent = i % 7 === 3;
        const c = isAccent ? "rgba(245,158,11,0.85)" : "rgba(45,212,191,0.45)";
        return (
          <div
            key={i}
            className="flex-1 rounded-sm bar-anim"
            style={{
              height: `${v}%`,
              background: `linear-gradient(180deg, ${c}, transparent)`,
              animationDelay: `${i * 0.05}s`,
            }}
          />
        );
      })}
    </div>
  );
}

export default function Features() {
  return (
    <section
      id="features"
      data-testid="features-section"
      className="relative py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <div className="max-w-3xl mb-16">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber-500 mb-4">
            // KANTİTATİF MODÜLLER
          </div>
          <h2 className="font-mono font-black tracking-tighter text-4xl md:text-5xl lg:text-6xl text-white">
            Wall Street&apos;in <span className="text-amber-400">Kara Kutusu</span>,
            <br />
            tek ekranda.
          </h2>
          <p className="mt-5 text-zinc-400 text-base md:text-lg max-w-2xl">
            Dört kantitatif modül. Milyonlarca opsiyon kontratı. Piyasa Yapıcı
            risk dinamiklerini saniye altı çözünürlükle haritalayan
            algoritmalar.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-min gap-5">
          {features.map((f) => {
            const Icon = f.icon;
            const c = colorMap[f.color];
            return (
              <article
                key={f.id}
                data-testid={`feature-card-${f.id}`}
                className={`relative glass glass-hover rounded-2xl p-6 md:p-7 overflow-hidden group ${f.span}`}
              >
                {/* hover glow */}
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${c.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative flex items-start justify-between mb-5">
                  <div
                    className={`h-11 w-11 rounded-lg border ${c.border} ${c.bg} flex items-center justify-center`}
                  >
                    <Icon className={`h-5 w-5 ${c.text}`} strokeWidth={2.2} />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-zinc-600 group-hover:text-amber-400 transition-colors" />
                </div>

                <div className="relative">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 mb-2">
                    {f.subtitle}
                  </div>
                  <h3 className="font-mono font-bold text-xl md:text-2xl text-white tracking-tight">
                    {f.title}
                  </h3>
                  <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                    {f.description}
                  </p>

                  {/* Per-card visualization */}
                  {f.big && (
                    <>
                      <div className="mt-5 grid grid-cols-3 gap-2">
                        {f.metrics.map((m) => (
                          <div
                            key={m.label}
                            className="rounded-md border border-white/5 bg-black/40 p-2.5"
                          >
                            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500">
                              {m.label}
                            </div>
                            <div className={`font-mono text-xs font-bold ${c.text} mt-1`}>
                              {m.value}
                            </div>
                          </div>
                        ))}
                      </div>
                      <GammaProfile color={f.color} />
                    </>
                  )}

                  {!f.big && !f.wide && <MiniHeatmap color={f.color} />}

                  {f.wide && <IntervalChart />}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
