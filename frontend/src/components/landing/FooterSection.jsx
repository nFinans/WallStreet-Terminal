import React from "react";
import { Link } from "react-router-dom";
import { Terminal, AlertTriangle, MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/905415478141";

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
          <div className="md:col-span-4">
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

          {/* Platform */}
          <div className="md:col-span-2">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-500 mb-3">
              Platform
            </div>
            <ul className="space-y-2 font-mono text-sm text-zinc-400">
              <li>
                <a
                  href="/#features"
                  data-testid="footer-link-modules"
                  className="hover:text-amber-400 transition-colors"
                >
                  Modüller
                </a>
              </li>
              <li>
                <a
                  href="/#technology"
                  data-testid="footer-link-infra"
                  className="hover:text-amber-400 transition-colors"
                >
                  Altyapı
                </a>
              </li>
              <li>
                <a
                  href="/#pricing"
                  data-testid="footer-link-pricing"
                  className="hover:text-amber-400 transition-colors"
                >
                  Paketler
                </a>
              </li>
              <li>
                <a
                  href="/#community"
                  data-testid="footer-link-community"
                  className="hover:text-amber-400 transition-colors"
                >
                  Topluluk
                </a>
              </li>
            </ul>
          </div>

          {/* Yasal */}
          <div className="md:col-span-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-500 mb-3">
              Yasal
            </div>
            <ul className="space-y-2 font-mono text-sm text-zinc-400">
              <li>
                <Link
                  to="/kvkk"
                  data-testid="footer-link-kvkk"
                  className="hover:text-amber-400 transition-colors"
                >
                  KVKK Aydınlatma Metni
                </Link>
              </li>
              <li>
                <Link
                  to="/uyelik-sozlesmesi"
                  data-testid="footer-link-uyelik"
                  className="hover:text-amber-400 transition-colors"
                >
                  Üyelik Sözleşmesi
                </Link>
              </li>
              <li>
                <Link
                  to="/gizlilik-politikasi"
                  data-testid="footer-link-gizlilik"
                  className="hover:text-amber-400 transition-colors"
                >
                  Gizlilik Politikamız
                </Link>
              </li>
            </ul>
          </div>

          {/* Destek */}
          <div className="md:col-span-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-500 mb-3">
              Destek
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-whatsapp"
              className="group flex items-center gap-3 rounded-lg border border-white/5 bg-black/40 hover:border-teal-400/40 hover:bg-zinc-900 transition-all p-3"
            >
              <div className="h-10 w-10 rounded-lg border border-teal-400/30 bg-teal-400/10 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="h-5 w-5 text-teal-400" strokeWidth={2} />
              </div>
              <div className="min-w-0">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                  WhatsApp Destek
                </div>
                <div className="font-mono text-sm font-bold text-white truncate">
                  +90 541 547 81 41
                </div>
              </div>
            </a>
            <div className="mt-3 rounded-lg border border-white/5 bg-black/40 p-3 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">WebSocket</span>
                <span className="flex items-center gap-2 text-teal-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-400 live-dot" />
                  AKTİF
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Opra Option Chain</span>
                <span className="text-teal-400">AKTİF</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Alpaca · Deribit</span>
                <span className="text-teal-400">AKTİF</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Data Controller */}
        <div
          data-testid="footer-data-controller"
          className="mt-12 rounded-xl border border-teal-500/15 bg-teal-500/[0.03] p-5"
        >
          <div className="flex gap-3">
            <ShieldCheck className="h-4 w-4 text-teal-400 mt-0.5 flex-shrink-0" />
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-500 leading-relaxed">
              <span className="text-teal-400">Veri Sorumlusu:</span> NFİNANS FİNANSAL BİLGİ TEKNOLOJİLERİ DANIŞMANLIK EĞİTİM VE TİCARET LİMİTED ŞİRKETİ, MERSİS No: 0631208828100001
            </p>
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
            PrivyAlgo: Predictive Complex Data Analytics
          </div>
        </div>
      </div>
    </footer>
  );
}
