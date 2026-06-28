import React from "react";
import { Link } from "react-router-dom";
import { AlertCircle, Check } from "lucide-react";

export const LEGAL_KEYS = [
  {
    key: "kvkk",
    label: "KVKK Aydınlatma Metni'ni",
    href: "/kvkk",
    missingMsg: "KVKK Aydınlatma Metni'ni onaylamalısınız.",
  },
  {
    key: "uyelik",
    label: "Üyelik Sözleşmesi'ni",
    href: "/uyelik-sozlesmesi",
    missingMsg: "Üyelik Sözleşmesi'ni onaylamalısınız.",
  },
  {
    key: "gizlilik",
    label: "Gizlilik Politikası'nı",
    href: "/gizlilik-politikasi",
    missingMsg: "Gizlilik Politikası'nı onaylamalısınız.",
  },
];

/**
 * Renders a vertical list of 3 legal consent checkboxes.
 * Props:
 *   value: { kvkk:boolean, uyelik:boolean, gizlilik:boolean }
 *   onChange(key, checked)
 *   errors: string[]   — list of error messages to display in red
 *   testIdPrefix: string (e.g. 'pricing-6-aylik' or 'satinal')
 */
export default function LegalConsent({
  value,
  onChange,
  errors = [],
  testIdPrefix = "consent",
}) {
  return (
    <div className="space-y-2.5">
      {LEGAL_KEYS.map((item) => {
        const checked = !!value[item.key];
        return (
          <label
            key={item.key}
            data-testid={`${testIdPrefix}-consent-${item.key}-label`}
            className="flex items-start gap-3 cursor-pointer group"
          >
            <span className="relative mt-0.5 flex-shrink-0">
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(item.key, e.target.checked)}
                data-testid={`${testIdPrefix}-consent-${item.key}`}
                className="peer absolute inset-0 w-5 h-5 opacity-0 cursor-pointer"
                aria-label={`${item.label} onayı`}
              />
              <span
                className={`h-5 w-5 rounded-md border flex items-center justify-center transition-colors ${
                  checked
                    ? "bg-amber-500 border-amber-500"
                    : "bg-zinc-950 border-white/15 group-hover:border-amber-500/50"
                }`}
              >
                {checked && (
                  <Check className="h-3.5 w-3.5 text-black" strokeWidth={3.5} />
                )}
              </span>
            </span>
            <span className="text-[12px] text-zinc-400 leading-relaxed">
              <Link
                to={item.href}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                className="text-amber-400 hover:text-amber-300 underline underline-offset-2 font-medium"
              >
                {item.label}
              </Link>{" "}
              okudum, anladım ve onaylıyorum.
            </span>
          </label>
        );
      })}

      {errors.length > 0 && (
        <div
          data-testid={`${testIdPrefix}-consent-errors`}
          className="mt-3 rounded-lg border border-red-500/30 bg-red-500/10 p-3 space-y-1"
        >
          {errors.map((msg, i) => (
            <div key={i} className="flex items-start gap-2">
              <AlertCircle className="h-3.5 w-3.5 text-red-400 mt-0.5 flex-shrink-0" />
              <span className="font-mono text-[11px] text-red-300 leading-snug">
                {msg}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function getMissingConsentErrors(consent) {
  return LEGAL_KEYS.filter((k) => !consent[k.key]).map((k) => k.missingMsg);
}

export const EMPTY_CONSENT = { kvkk: false, uyelik: false, gizlilik: false };
