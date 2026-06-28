import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Shield,
  Sparkles,
  Check,
  Terminal,
  AlertTriangle,
  Lock,
} from "lucide-react";
import { PACKAGES, BONUS } from "@/components/landing/Pricing";
import CyberBackground from "@/components/landing/CyberBackground";
import LegalConsent, {
  EMPTY_CONSENT,
  getMissingConsentErrors,
} from "@/components/landing/LegalConsent";

function WhopEmbed({ planId, testid }) {
  const ref = useRef(null);

  useEffect(() => {
    // Re-trigger loader scan once the placeholder is in DOM
    const loader = window.wco;
    if (loader && typeof loader.process === "function") {
      try {
        loader.process();
      } catch (_) {
        /* noop */
      }
    }
  }, [planId]);

  return (
    <div
      ref={ref}
      data-testid={testid}
      data-whop-checkout-plan-id={planId}
      data-whop-checkout-theme="dark"
      className="w-full min-h-[640px] rounded-xl overflow-hidden bg-black/40 border border-white/5"
    />
  );
}

export default function Purchase() {
  const [consent, setConsent] = useState({ ...EMPTY_CONSENT });
  const [errors, setErrors] = useState([]);
  const allAccepted =
    consent.kvkk && consent.uyelik && consent.gizlilik;

  const handleConsentChange = (key, checked) => {
    setConsent((prev) => ({ ...prev, [key]: checked }));
    if (checked) setErrors([]);
  };

  const handleUnlock = () => {
    const missing = getMissingConsentErrors(consent);
    setErrors(missing);
    if (missing.length === 0) {
      // Re-trigger Whop loader to mount the newly-rendered placeholders
      setTimeout(() => {
        const loader = window.wco;
        if (loader && typeof loader.process === "function") {
          try {
            loader.process();
          } catch (_) {
            // loader will pick up via MutationObserver
          }
        }
      }, 120);
    }
  };

  useEffect(() => {
    document.title = "Paket Satın Al · PrivyAlgo WallStreet Terminal";
    // smooth scroll to anchor when arriving with hash
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el)
          el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 250);
    }
  }, []);

  return (
    <div
      data-testid="purchase-page"
      className="relative min-h-screen bg-black text-white overflow-hidden"
    >
      <CyberBackground />

      <div className="relative z-10">
        {/* Mini header */}
        <header className="border-b border-white/5 bg-black/60 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
            <Link
              to="/"
              data-testid="purchase-back"
              className="flex items-center gap-2 group"
            >
              <ArrowLeft className="h-4 w-4 text-amber-400 group-hover:-translate-x-1 transition-transform" />
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-md border border-amber-500/40 bg-amber-500/10 flex items-center justify-center">
                  <Terminal className="h-4 w-4 text-amber-400" strokeWidth={2.5} />
                </div>
                <div className="font-mono">
                  <div className="text-[14px] font-bold tracking-tight text-white leading-none">
                    PrivyAlgo
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-amber-500/80 leading-none mt-1">
                    Paket Satın Al
                  </div>
                </div>
              </div>
            </Link>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
              <Shield className="h-3.5 w-3.5 text-teal-400" />
              <span>Whop Güvenli Ödeme · TLS 1.3</span>
            </div>
          </div>
        </header>

        {/* Hero strip */}
        <section className="pt-14 pb-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber-500 mb-4">
              // güvenli ödeme · whop
            </div>
            <h1 className="font-mono font-black tracking-tighter text-4xl md:text-5xl lg:text-6xl text-white leading-[1.02]">
              Paketinizi seçin.
              <br />
              <span className="text-amber-400 text-glow-amber">
                Terminale anında erişin.
              </span>
            </h1>
            <p className="mt-5 text-zinc-400 max-w-2xl text-base md:text-lg leading-relaxed">
              Whop tarafından sağlanan güvenli ödeme altyapısı ile kart
              bilgileriniz şifrelenir ve PrivyAlgo&apos;ya iletilmez. Ödeme
              tamamlandığında terminal erişiminiz otomatik olarak açılır.
            </p>

            {/* Bonus banner */}
            <div className="mt-8 glass rounded-2xl p-5 flex flex-col md:flex-row md:items-center gap-4 border-amber-500/25">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl border border-amber-500/40 bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-400 font-bold">
                    BONUS · ÜCRETSİZ DAHİL
                  </div>
                  <div className="font-mono text-base font-semibold text-white mt-1">
                    {BONUS.title}
                  </div>
                  <div className="text-xs text-zinc-400 mt-1 max-w-xl">
                    {BONUS.description}
                  </div>
                </div>
              </div>
              <div className="md:ml-auto font-mono text-[10px] uppercase tracking-[0.22em] text-teal-400 border border-teal-400/30 bg-teal-400/10 px-3 py-1.5 rounded-full whitespace-nowrap">
                Her iki pakete dahil
              </div>
            </div>

            {/* Legal consent gate */}
            <div
              data-testid="purchase-consent-block"
              className={`mt-6 glass rounded-2xl p-6 lg:p-8 ${
                allAccepted ? "border-teal-400/30" : "border-amber-500/30"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="md:max-w-md">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-500 mb-2">
                    // Yasal Onaylar · Ödeme öncesi
                  </div>
                  <h3 className="font-mono font-bold text-lg md:text-xl text-white">
                    Devam etmeden önce üç belgeyi onaylayın
                  </h3>
                  <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                    Ödeme ekranlarının aktifleşmesi için aşağıdaki yasal
                    belgelerin tamamını okuyup onaylamanız zorunludur. Onay
                    vermeden ödeme alınamaz.
                  </p>
                  {allAccepted && (
                    <div className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-teal-400 border border-teal-400/30 bg-teal-400/10 px-3 py-1.5 rounded-full">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      Tüm onaylar tamamlandı · Ödeme açık
                    </div>
                  )}
                </div>
                <div className="flex-1 md:max-w-md">
                  <LegalConsent
                    value={consent}
                    onChange={handleConsentChange}
                    errors={errors}
                    testIdPrefix="purchase"
                  />
                  {!allAccepted && (
                    <button
                      type="button"
                      onClick={handleUnlock}
                      data-testid="purchase-consent-unlock"
                      className="mt-4 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-amber-500 text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition-colors active:scale-95"
                    >
                      <Lock className="h-4 w-4" />
                      Onayla ve Ödeme Ekranlarını Aç
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Two checkouts side by side */}
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {PACKAGES.map((p) => (
                <article
                  key={p.id}
                  id={p.id}
                  data-testid={`purchase-card-${p.id}`}
                  className={`relative glass rounded-3xl p-6 lg:p-8 scroll-mt-24 ${
                    p.featured
                      ? "border-amber-500/40 glow-amber-strong"
                      : "border-white/10"
                  }`}
                >
                  {p.featured && (
                    <div className="absolute -top-3 left-8 px-4 py-1.5 rounded-full bg-amber-500 text-black font-mono text-[10px] uppercase tracking-[0.22em] font-bold">
                      En çok tercih edilen
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                        {p.tagline}
                      </div>
                      <h2 className="mt-1 font-mono font-bold text-2xl md:text-3xl text-white">
                        {p.name}
                      </h2>
                      <div className="mt-3 flex items-baseline gap-2">
                        <span
                          className={`font-mono font-black text-3xl md:text-4xl tracking-tighter ${
                            p.featured ? "text-amber-400" : "text-white"
                          }`}
                        >
                          {p.price}
                        </span>
                        <span className="font-mono text-sm text-zinc-400">
                          {p.currency}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                          / {p.period} · {p.note}
                        </span>
                      </div>
                    </div>
                    {p.savings && (
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-teal-400 border border-teal-400/30 bg-teal-400/10 px-2.5 py-1 rounded-full whitespace-nowrap">
                        {p.savings}
                      </span>
                    )}
                  </div>

                  {/* Mini feature list */}
                  <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 border-t border-white/5 pt-5">
                    {p.features.slice(0, 6).map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check
                          className={`h-3.5 w-3.5 mt-1 flex-shrink-0 ${
                            p.featured ? "text-amber-400" : "text-teal-400"
                          }`}
                          strokeWidth={3}
                        />
                        <span className="text-xs text-zinc-400 leading-snug">
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Whop iframe (gated by consent) */}
                  <div className="mt-6">
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 mb-2">
                      // güvenli ödeme · whop checkout
                    </div>
                    {allAccepted ? (
                      <WhopEmbed
                        planId={p.planId}
                        testid={`whop-embed-${p.id}`}
                      />
                    ) : (
                      <div
                        data-testid={`whop-locked-${p.id}`}
                        className="w-full min-h-[280px] rounded-xl border border-amber-500/20 bg-amber-500/[0.04] flex flex-col items-center justify-center text-center p-6 gap-3"
                      >
                        <div className="h-12 w-12 rounded-full border border-amber-500/40 bg-amber-500/10 flex items-center justify-center">
                          <Lock className="h-5 w-5 text-amber-400" />
                        </div>
                        <div className="font-mono text-sm font-bold text-white">
                          Ödeme ekranı kilitli
                        </div>
                        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400 max-w-xs leading-relaxed">
                          Devam etmek için sayfanın üst kısmındaki yasal
                          onayları tamamlayın.
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>

            {/* Trust strip */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  title: "Whop ile şifreli ödeme",
                  desc: "Kart bilgileri TLS 1.3 ile uçtan uca şifrelenir.",
                  icon: Shield,
                },
                {
                  title: "Anında erişim",
                  desc: "Ödeme tamamlandığında terminal hesabınız otomatik açılır.",
                  icon: Terminal,
                },
                {
                  title: "İptal & Yenileme",
                  desc: "Aboneliğinizi Whop panelinden istediğiniz zaman yönetin.",
                  icon: Check,
                },
              ].map((t) => {
                const Icon = t.icon;
                return (
                  <div
                    key={t.title}
                    className="glass rounded-xl p-4 flex items-start gap-3"
                  >
                    <Icon className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-mono text-sm font-bold text-white">
                        {t.title}
                      </div>
                      <div className="text-xs text-zinc-400 mt-1 leading-relaxed">
                        {t.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Disclaimer */}
            <div
              data-testid="purchase-disclaimer"
              className="mt-8 rounded-xl border border-amber-500/15 bg-amber-500/[0.03] p-5"
            >
              <div className="flex gap-3">
                <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-500 leading-relaxed">
                  <span className="text-amber-400">Finansal Risk Uyarısı:</span>{" "}
                  Opsiyon ve türev araçların ticareti yüksek risk içerir.
                  PrivyAlgo WallStreet Terminal&apos;in sağladığı veriler ve
                  Opsiyon 101 eğitim paketi yalnızca eğitim ve analiz amaçlıdır;
                  yatırım tavsiyesi niteliği taşımaz.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
