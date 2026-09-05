import React, { useState, useEffect } from "react";
import { X, ShieldCheck, ArrowRight, Loader2, AlertCircle, Settings, MessageCircle, Sparkles } from "lucide-react";

const COUNTRY_CODES = [
  { code: "+90", label: "Türkiye (+90)" },
  { code: "+1", label: "ABD / Kanada (+1)" },
  { code: "+44", label: "İngiltere (+44)" },
  { code: "+49", label: "Almanya (+49)" },
  { code: "OTHER", label: "Diğer (Manuel Gir)" }
];

export default function CheckoutModal({ open, onClose, pkg }) {
  // 🟢 WALLSTREET CANLIYA GEÇİŞ ŞALTERİ 🟢
  const IS_PAYMENT_ACTIVE = false;

  const [formData, setFormData] = useState({
    name: "", surname: "", email: "", countryCode: "+90", manualCountryCode: "",
    gsmNumber: "", identityNumber: "", address: "", district: "", city: "", username: "", password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose?.(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open || !pkg) return null;
  const accent = "#f59e0b"; // WallStreet Amber Rengi

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)/;
    if (!passwordRegex.test(formData.password)) {
      setError("Terminal şifresi en az bir harf ve bir rakam içermelidir.");
      setLoading(false);
      return;
    }

    const activePrefix = formData.countryCode === "OTHER" 
      ? (formData.manualCountryCode.startsWith("+") ? formData.manualCountryCode : `+${formData.manualCountryCode}`)
      : formData.countryCode;

    const fullGsm = `${activePrefix}${formData.gsmNumber.replace(/^0+/, "")}`;
    const numericPrice = pkg.price ? pkg.price.replace(/[^\d]/g, '') : "0";

    try {
      const response = await fetch("/api/payment/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: pkg.planId || pkg.id || "ws_plan",
          planName: pkg.name,
          price: numericPrice,
          name: formData.name,
          surname: formData.surname,
          email: formData.email,
          gsmNumber: fullGsm,
          identityNumber: formData.identityNumber,
          address: formData.address,
          district: formData.district,
          city: formData.city,
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (data.status === "success" && data.paymentPageUrl) {
        window.location.href = data.paymentPageUrl;
      } else {
        setError(data.detail || "Ödeme başlatılırken bir hata oluştu.");
        setLoading(false);
      }
    } catch (err) {
      setError("Sunucuya bağlanılamadı. Lütfen tekrar deneyin.");
      setLoading(false);
    }
  };

  // --------------------------------------------------------
  // SENARYO 1: BAKIM / WHATSAPP EKRANI (Şu an aktif olan)
  // --------------------------------------------------------
  if (!IS_PAYMENT_ACTIVE) {
    const whatsappNumber = "905415478141";
    const whatsappMessage = encodeURIComponent(
      `Merhaba, WallStreet ${pkg.name} paketi ile ilgileniyorum. Gerekli tecrübeye sahibim ve güncellemeleri beklemeden altyapıya dahil olmak istiyorum.`
    );
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(10px)" }} onClick={onClose}>
        <div className="relative w-full max-w-lg overflow-y-auto rounded-3xl p-8 md:p-10 text-center" style={{ background: "rgba(11,14,20,0.98)", border: `1px solid ${accent}40`, boxShadow: `0 30px 100px rgba(0,0,0,0.8), 0 0 60px ${accent}20` }} onClick={(e) => e.stopPropagation()}>
          <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-zinc-400 hover:bg-white/10 hover:text-white transition-all"><X className="w-4 h-4" /></button>
          
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-xl opacity-40 animate-pulse" style={{ background: accent }}></div>
              <div className="relative h-20 w-20 rounded-full flex items-center justify-center bg-zinc-950" style={{ border: `2px solid ${accent}80` }}>
                <Settings className="h-9 w-9 animate-[spin_4s_linear_infinite]" style={{ color: accent }} />
              </div>
            </div>
          </div>

          <div className="font-mono text-[11px] uppercase tracking-[0.3em] mb-3" style={{ color: accent }}>// ALTYAPI GÜNCELLEMESİ</div>
          <h3 className="font-mono font-black text-2xl text-white mb-6 tracking-tight">WallStreet {pkg.name}</h3>

          <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 mb-8 text-[15px] text-zinc-300 leading-relaxed font-sans text-left shadow-inner">
            <p className="mb-5">WallStreet terminal altyapımız <strong>v3.0</strong> sürümüne güncellenmekte ve kantitatif model testlerimiz devam etmektedir. Şimdilik bu süreç tamamlanana kadar yeni üyelik alımı durdurulmuştur.</p>
            <p>Ancak <span className="text-white font-medium">"Gerekli teknik birikime ve tecrübeye sahibim, v3.0 paketini hemen almak istiyorum"</span> derseniz, lütfen <strong style={{ color: "#2dd4bf" }}>+90 541 547 81 41</strong> numaralı WhatsApp danışma hattımızdan bize ulaşın.</p>
          </div>

          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-mono font-bold text-sm uppercase tracking-wider transition-all hover:-translate-y-1 hover:shadow-lg" style={{ background: accent, color: "#0b0e14", boxShadow: "0 10px 25px -5px rgba(245, 158, 11, 0.4)" }}>
            <MessageCircle className="w-5 h-5" /> WhatsApp'tan Ulaşın
          </a>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------
  // SENARYO 2: GERÇEK İYZİCO ÖDEME EKRANI
  // --------------------------------------------------------
  return (
    <div data-testid="checkout-modal" className="fixed inset-0 z-[100] flex items-start md:items-center justify-center p-3 md:p-6" role="dialog" aria-modal="true">
      <div onClick={onClose} data-testid="checkout-modal-backdrop" className="absolute inset-0 bg-black/80 backdrop-blur-md" aria-hidden="true" />
      <div className="relative w-full max-w-3xl max-h-[94vh] overflow-y-auto rounded-3xl border border-amber-500/30 bg-zinc-950/95 backdrop-blur-xl p-6 md:p-8 shadow-[0_0_120px_rgba(245,158,11,0.18)]">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: accent }}>// GÜVENLİ İYZİCO ÖDEMESİ</div>
            <h3 className="mt-1 font-mono font-bold text-base md:text-lg text-white">{pkg.name} · <span className="text-amber-400">{pkg.price} {pkg.currency}</span></h3>
          </div>
          <button onClick={onClose} data-testid="checkout-modal-close" className="h-9 w-9 rounded-md border border-white/10 hover:border-amber-500/50 hover:bg-zinc-900 flex items-center justify-center transition-colors"><X className="h-4 w-4 text-zinc-400" /></button>
        </div>

        {error && <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-red-300 text-xs font-mono"><AlertCircle className="w-4 h-4 shrink-0" /><span>{error}</span></div>}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block font-mono text-[11px] text-zinc-400 mb-1">Ad</label><input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400 font-mono" /></div>
            <div><label className="block font-mono text-[11px] text-zinc-400 mb-1">Soyad</label><input type="text" name="surname" required value={formData.surname} onChange={handleChange} className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400 font-mono" /></div>
          </div>
          <div><label className="block font-mono text-[11px] text-zinc-400 mb-1">E-posta Adresi</label><input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400 font-mono" /></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block font-mono text-[11px] text-zinc-400 mb-1">Cep Telefonu</label>
              <div className="flex gap-1.5">
                <select name="countryCode" value={formData.countryCode} onChange={handleChange} className="bg-zinc-900 border border-white/10 rounded-lg px-2 py-2 text-xs text-amber-400 focus:outline-none font-mono shrink-0 max-w-[110px]">
                  {COUNTRY_CODES.map((c) => <option key={c.code} value={c.code} className="bg-zinc-900 text-white">{c.label.split(" ")[0]}</option>)}
                </select>
                <input type="text" name="gsmNumber" required value={formData.gsmNumber} onChange={handleChange} className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400 font-mono" placeholder="5XX XXX XX XX" />
              </div>
            </div>
            <div><label className="block font-mono text-[11px] text-zinc-400 mb-1">TC Kimlik No (Fatura için)</label><input type="text" name="identityNumber" required maxLength={11} value={formData.identityNumber} onChange={handleChange} className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400 font-mono" /></div>
          </div>

          <div className="space-y-3">
            <div><label className="block font-mono text-[11px] text-zinc-400 mb-1">Fatura Adresi</label><input type="text" name="address" required value={formData.address} onChange={handleChange} className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400 font-mono" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block font-mono text-[11px] text-zinc-400 mb-1">İlçe</label><input type="text" name="district" required value={formData.district} onChange={handleChange} className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400 font-mono" /></div>
              <div><label className="block font-mono text-[11px] text-zinc-400 mb-1">Şehir (İl)</label><input type="text" name="city" required value={formData.city} onChange={handleChange} className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400 font-mono" /></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10">
            <div><label className="block font-mono text-[11px] text-zinc-400 mb-1">Terminal Kullanıcı Adı</label><input type="text" name="username" required value={formData.username} onChange={handleChange} className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400 font-mono" /></div>
            <div><label className="block font-mono text-[11px] text-zinc-400 mb-1">Terminal Şifresi</label><input type="password" name="password" required value={formData.password} onChange={handleChange} className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400 font-mono" /></div>
          </div>

          <button type="submit" disabled={loading} className="mt-5 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-mono font-bold text-sm uppercase tracking-wider transition-all cursor-pointer" style={{ background: `linear-gradient(135deg, ${accent} 0%, #b45309 100%)`, color: "#0b0e14" }}>
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Ödeme Hazırlanıyor...</> : <>Ödemeye Geç ({pkg.price} {pkg.currency}) <ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>
      </div>
    </div>
  );
}
