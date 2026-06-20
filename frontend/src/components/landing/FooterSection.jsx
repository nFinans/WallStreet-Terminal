import React from "react";
import { Terminal, AlertTriangle } from "lucide-react";

export default function FooterSection() {
  return (
    <footer
      data-testid="footer"
      className="relative border-t border-white/5 bg-black/80 backdrop-blur"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-md border border-amber-500/40 bg-amber-500/10 flex items-center justify-center">
                <Terminal className="h-4 w-4 text-amber-400" strokeWidth={2.5} />
              </div>
              <div className="font-mono">
                <div className="text-[15px] font-bold tracking-tight text-white leading-none">
                  PrivyAlgo AI
                </div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-amber-500/80 leading-none mt-1">
                  WallStreet Terminal · v3.0
                </div>
              </div>
            </div>
            <p className="mt-5 text-sm text-zinc-500 leading-relaxed max-w-md">
              Kurumsal opsiyon zekası, kantitatif modeller ve sıfır gecikmeli
              veri akışları üreten kantitatif analiz platformu.
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-6">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-500 mb-3">
                Platform
              </div>
              <ul className="space-y-2 font-mono text-sm text-zinc-400">
                <li><a href="#features" data-testid="footer-link-modules" className="hover:text-amber-400 transition-colors">Modüller</a></li>
                <li><a href="#technology" data-testid="footer-link-infra" className="hover:text-amber-400 transition-colors">Altyapı</a></li>
                <li><a href="#community" data-testid="footer-link-community" className="hover:text-amber-400 transition-colors">Topluluk</a></li>
              </ul>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-500 mb-3">
                Yasal
              </div>
              <ul className="space-y-2 font-mono text-sm text-zinc-400">
                <li><a href="#" data-testid="footer-link-terms" className="hover:text-amber-400 transition-colors">Kullanım Şartları</a></li>
                <li><a href="#" data-testid="footer-link-privacy" className="hover:text-amber-400 transition-colors">Gizlilik Politikası</a></li>
                <li><a href="#" data-testid="footer-link-contact" className="hover:text-amber-400 transition-colors">İletişim</a></li>
              </ul>
            </div>
          </div>

          {/* Status */}
          <div className="md:col-span-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-500 mb-3">
              Sistem Durumu
            </div>
            <div className="rounded-lg border border-white/5 bg-black/40 p-4 space-y-2.5 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">WebSocket</span>
                <span className="flex items-center gap-2 text-teal-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-400 live-dot" />
                  AKTİF
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">ThetaData</span>
                <span className="text-teal-400">AKTİF</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Alpaca</span>
                <span className="text-teal-400">AKTİF</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Deribit</span>
                <span className="text-teal-400">AKTİF</span>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div
          data-testid="footer-disclaimer"
          className="mt-12 rounded-xl border border-amber-500/15 bg-amber-500/[0.03] p-5"
        >
          <div className="flex gap-3">
            <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-500 leading-relaxed">
              <span className="text-amber-400">Finansal Risk Uyarısı:</span>{" "}
              Opsiyon ve türev araçların ticareti yüksek risk içerir ve tüm
              yatırımcılar için uygun olmayabilir. PrivyAlgo WallStreet Terminal
              tarafından sağlanan veriler, göstergeler ve analizler yalnızca
              eğitim ve araştırma amaçlıdır; yatırım tavsiyesi niteliği
              taşımaz. Geçmiş performans gelecekteki sonuçların garantisi
              değildir.
            </p>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="font-mono text-[11px] text-zinc-500">
            © 2026 <span className="text-white">PrivyAlgo AI</span>. Tüm Hakları Saklıdır.
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-600">
            Built with discipline. Powered by mathematics.
          </div>
        </div>
      </div>
    </footer>
  );
}
