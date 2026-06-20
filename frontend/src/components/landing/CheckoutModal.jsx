import React, { useEffect, useRef } from "react";
import { X, Shield, Sparkles } from "lucide-react";

export default function CheckoutModal({ open, onClose, pkg }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    // Lock body scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Re-trigger Whop loader to mount iframe inside the freshly-rendered placeholder
    const tryProcess = () => {
      const loader = window.wco;
      if (loader && typeof loader.process === "function") {
        try {
          loader.process();
        } catch (_) {
          // loader not yet ready; auto MutationObserver will catch it
        }
      }
    };
    const t1 = setTimeout(tryProcess, 60);
    const t2 = setTimeout(tryProcess, 400);

    // Close on ESC
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, pkg]);

  if (!open || !pkg) return null;

  return (
    <div
      data-testid="checkout-modal"
      className="fixed inset-0 z-[100] flex items-start md:items-center justify-center p-3 md:p-6"
      role="dialog"
      aria-modal="true"
    >
      {/* backdrop */}
      <div
        onClick={onClose}
        data-testid="checkout-modal-backdrop"
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        aria-hidden="true"
      />

      {/* panel */}
      <div className="relative w-full max-w-3xl max-h-[94vh] overflow-y-auto rounded-3xl border border-amber-500/30 bg-zinc-950/95 backdrop-blur-xl shadow-[0_0_120px_rgba(245,158,11,0.18)]">
        {/* header */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-5 md:px-7 py-4 border-b border-white/5 bg-zinc-950/95 backdrop-blur-xl">
          <div className="min-w-0">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-500">
              // güvenli ödeme · whop
            </div>
            <h3 className="mt-1 font-mono font-bold text-base md:text-lg text-white truncate">
              {pkg.name} ·{" "}
              <span className={pkg.featured ? "text-amber-400" : "text-teal-400"}>
                {pkg.price} {pkg.currency}
              </span>
            </h3>
          </div>
          <button
            onClick={onClose}
            data-testid="checkout-modal-close"
            aria-label="Kapat"
            className="h-9 w-9 rounded-md border border-white/10 hover:border-amber-500/50 hover:bg-zinc-900 flex items-center justify-center transition-colors"
          >
            <X className="h-4 w-4 text-zinc-400" />
          </button>
        </div>

        {/* Bonus banner */}
        <div className="mx-5 md:mx-7 mt-5 rounded-xl border border-amber-500/25 bg-amber-500/[0.05] p-4 flex items-start gap-3">
          <Sparkles className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
          <div className="min-w-0">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-400 font-bold">
              BONUS · ÜCRETSİZ DAHİL
            </div>
            <div className="font-mono text-sm font-semibold text-white mt-1">
              Opsiyon 101 Eğitim Paketi
            </div>
          </div>
        </div>

        {/* Whop embed */}
        <div ref={containerRef} className="p-5 md:p-7">
          <div
            data-testid={`whop-embed-modal-${pkg.id}`}
            data-whop-checkout-plan-id={pkg.planId}
            data-whop-checkout-theme="dark"
            className="w-full min-h-[640px] rounded-xl overflow-hidden bg-black/40 border border-white/5"
          />
        </div>

        {/* footer */}
        <div className="px-5 md:px-7 pb-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          <Shield className="h-3.5 w-3.5 text-teal-400" />
          <span>TLS 1.3 · Kart bilgileriniz PrivyAlgo&apos;ya iletilmez</span>
        </div>
      </div>
    </div>
  );
}
