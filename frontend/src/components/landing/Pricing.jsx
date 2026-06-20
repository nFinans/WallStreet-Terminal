import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Sparkles, ArrowRight, BookOpen } from "lucide-react";
import CheckoutModal from "@/components/landing/CheckoutModal";

export const PACKAGES = [
  {
    id: "6-aylik",
    planId: "plan_Qbox6n2EjRRLY",
    name: "6 Aylık Erişim",
    tagline: "Yarım sezon · Kurumsal odak",
    price: "12.000",
    currency: "TRY",
    period: "6 ay",
    note: "KDV Dahil",
    featured: false,
    cta: "6 Aylık Paketi Satın Al",
    features: [
      "Opus Wall & Cockpit — gerçek zamanlı piyasa rejimi, Net GEX & Vanna",
      "Greeks Heatmap — vade yapısı ve likidite duvarları",
      "0DTE Map — gün içi gamma & volatilite patlaması tespiti",
      "Interval Map — kurumsal ayak izi hacim profilleri",
      "ThetaData · Alpaca · Deribit canlı veri akışları",
      "Sıfır gecikmeli WebSocket altyapısı",
      "nFinans topluluk erişimi",
    ],
  },
  {
    id: "yillik",
    planId: "plan_QbVjw794ciU1n",
    name: "Yıllık Erişim",
    tagline: "Tam sezon · En çok tercih edilen",
    price: "16.000",
    currency: "TRY",
    period: "12 ay",
    note: "KDV Dahil",
    featured: true,
    savings: "33% Tasarruf",
    cta: "Yıllık Paketi Satın Al",
    features: [
      "Opus Wall & Cockpit — gerçek zamanlı piyasa rejimi, Net GEX & Vanna",
      "Greeks Heatmap — vade yapısı ve likidite duvarları",
      "0DTE Map — gün içi gamma & volatilite patlaması tespiti",
      "Interval Map — kurumsal ayak izi hacim profilleri",
      "ThetaData · Alpaca · Deribit canlı veri akışları",
      "Sıfır gecikmeli WebSocket altyapısı",
      "nFinans topluluk erişimi",
      "Öncelikli destek & yeni modüllere erken erişim",
    ],
  },
];

export const BONUS = {
  title: "Opsiyon 101 Eğitim Paketi",
  subtitle: "Her iki pakete ÜCRETSİZ dahildir",
  description:
    "Opsiyonların temellerinden GEX/VEX okumalarına kadar; Greeks, hedge mantığı, IV ve piyasa yapıcı dinamiklerini sıfırdan öğrenin. Terminalden maksimum verimi almak için tasarlandı.",
};

export default function Pricing() {
  const [activePkg, setActivePkg] = useState(null);

  return (
    <section
      id="pricing"
      data-testid="pricing-section"
      className="relative py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber-500 mb-4">
            // PAKETLER & ABONELİK
          </div>
          <h2 className="font-mono font-black tracking-tighter text-4xl md:text-5xl lg:text-6xl text-white leading-[1.02]">
            Bir terminal.
            <br />
            <span className="text-amber-400 text-glow-amber">İki ayrıcalıklı paket.</span>
          </h2>
          <p className="mt-5 text-zinc-400 text-base md:text-lg max-w-2xl">
            Her iki paket de tüm kantitatif modüllere sınırsız erişim sağlar.
            Yıllık paket en iyi değer için tasarlandı —{" "}
            <span className="text-white font-medium">Opsiyon 101</span> eğitim
            paketi hediye olarak dahildir.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PACKAGES.map((p) => (
            <article
              key={p.id}
              data-testid={`pricing-card-${p.id}`}
              className={`relative glass rounded-3xl p-7 lg:p-10 group transition-all duration-500 ${
                p.featured
                  ? "border-amber-500/40 glow-amber-strong"
                  : "border-white/10 glass-hover"
              }`}
            >
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-amber-500 text-black font-mono text-[10px] uppercase tracking-[0.22em] font-bold">
                  En çok tercih edilen
                </div>
              )}

              <div className="flex items-start justify-between">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500">
                    {p.tagline}
                  </div>
                  <h3 className="mt-2 font-mono font-bold text-2xl md:text-3xl text-white">
                    {p.name}
                  </h3>
                </div>
                {p.savings && (
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-teal-400 border border-teal-400/30 bg-teal-400/10 px-2.5 py-1 rounded-full">
                    {p.savings}
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="mt-7 pb-7 border-b border-white/5 flex items-baseline gap-2">
                <span
                  className={`font-mono font-black text-5xl md:text-6xl tracking-tighter ${
                    p.featured ? "text-amber-400 text-glow-amber" : "text-white"
                  }`}
                >
                  {p.price}
                </span>
                <span className="font-mono text-base text-zinc-400">
                  {p.currency}
                </span>
                <span className="ml-auto font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                  / {p.period} · {p.note}
                </span>
              </div>

              {/* Features */}
              <ul className="mt-7 space-y-3">
                {p.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 flex-shrink-0 h-5 w-5 rounded-full ${
                        p.featured
                          ? "bg-amber-500/20 border border-amber-500/40"
                          : "bg-teal-400/10 border border-teal-400/30"
                      } flex items-center justify-center`}
                    >
                      <Check
                        className={`h-3 w-3 ${
                          p.featured ? "text-amber-400" : "text-teal-400"
                        }`}
                        strokeWidth={3}
                      />
                    </span>
                    <span className="text-sm text-zinc-300 leading-relaxed">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Bonus row */}
              <div className="mt-6 p-4 rounded-xl border border-amber-500/25 bg-amber-500/[0.05] flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-400 font-bold">
                    BONUS · ÜCRETSİZ DAHİL
                  </div>
                  <div className="font-mono text-sm font-semibold text-white mt-1">
                    Opsiyon 101 Eğitim Paketi
                  </div>
                </div>
              </div>

              {/* CTA - opens modal */}
              <button
                type="button"
                onClick={() => setActivePkg(p)}
                data-testid={`pricing-cta-${p.id}`}
                className={`mt-8 w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-mono font-bold text-sm uppercase tracking-wider transition-all active:scale-95 ${
                  p.featured
                    ? "bg-amber-500 text-black hover:bg-amber-400 glow-amber"
                    : "bg-zinc-900/80 border border-white/10 text-white hover:border-amber-500/50 hover:bg-zinc-800"
                }`}
              >
                {p.cta}
                <ArrowRight className="h-4 w-4" />
              </button>

              {/* Alt link to side-by-side page */}
              <Link
                to={`/satinal#${p.id}`}
                data-testid={`pricing-altlink-${p.id}`}
                className="mt-3 block text-center font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 hover:text-amber-400 transition-colors"
              >
                ya da paketleri yan yana karşılaştır →
              </Link>
            </article>
          ))}
        </div>

        {/* Bonus highlight strip */}
        <div className="mt-10 relative glass rounded-2xl p-6 lg:p-8 overflow-hidden">
          <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-5">
            <div className="h-14 w-14 rounded-xl border border-amber-500/40 bg-amber-500/10 flex items-center justify-center flex-shrink-0">
              <BookOpen className="h-6 w-6 text-amber-400" />
            </div>
            <div className="flex-1">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-400">
                Bonus · Her iki pakete dahil
              </div>
              <h3 className="mt-1 font-mono font-bold text-xl md:text-2xl text-white">
                {BONUS.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed max-w-3xl">
                {BONUS.description}
              </p>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-teal-400 border border-teal-400/30 bg-teal-400/10 px-3 py-1.5 rounded-full whitespace-nowrap">
              + Ücretsiz Bonus
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <CheckoutModal
        open={!!activePkg}
        onClose={() => setActivePkg(null)}
        pkg={activePkg}
      />
    </section>
  );
}
