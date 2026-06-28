import React, { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, Terminal, FileText, Shield } from "lucide-react";
import CyberBackground from "@/components/landing/CyberBackground";
import FooterSection from "@/components/landing/FooterSection";
import { LEGAL_DOCS } from "@/legal/legalContent";

function renderBody(body) {
  // simple markdown-ish rendering: headings (##), bold (**...**), bullet (- )
  const lines = body.split("\n");
  const out = [];
  let listBuffer = [];

  const flushList = () => {
    if (listBuffer.length > 0) {
      out.push(
        <ul
          key={`ul-${out.length}`}
          className="my-4 space-y-2 list-disc pl-6 marker:text-amber-500"
        >
          {listBuffer.map((item, i) => (
            <li
              key={i}
              className="text-zinc-300 text-[15px] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: inlineFmt(item) }}
            />
          ))}
        </ul>
      );
      listBuffer = [];
    }
  };

  const inlineFmt = (txt) =>
    txt.replace(
      /\*\*(.+?)\*\*/g,
      '<strong class="text-white font-semibold">$1</strong>'
    );

  lines.forEach((raw, idx) => {
    const line = raw.trimEnd();
    if (line.startsWith("## ")) {
      flushList();
      out.push(
        <h2
          key={`h-${idx}`}
          className="mt-10 mb-4 font-mono font-bold text-xl md:text-2xl text-amber-400 tracking-tight border-l-2 border-amber-500/60 pl-4"
        >
          {line.replace(/^##\s+/, "")}
        </h2>
      );
    } else if (line.startsWith("- ")) {
      listBuffer.push(line.replace(/^-\s+/, ""));
    } else if (line.trim() === "") {
      flushList();
      // blank line spacer
    } else {
      flushList();
      out.push(
        <p
          key={`p-${idx}`}
          className="my-3 text-zinc-300 text-[15px] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: inlineFmt(line) }}
        />
      );
    }
  });
  flushList();
  return out;
}

export default function LegalPage() {
  const { slug } = useParams();
  const doc = LEGAL_DOCS[slug];

  useEffect(() => {
    if (doc) document.title = `${doc.title} · PrivyAlgo`;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [doc]);

  if (!doc) return <Navigate to="/" replace />;

  return (
    <div
      data-testid={`legal-page-${doc.slug}`}
      className="relative min-h-screen bg-black text-white overflow-hidden"
    >
      <CyberBackground />
      <div className="relative z-10">
        {/* mini header */}
        <header className="border-b border-white/5 bg-black/60 backdrop-blur-xl">
          <div className="max-w-5xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
            <Link
              to="/"
              data-testid="legal-back"
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
                    Yasal Belge
                  </div>
                </div>
              </div>
            </Link>
            <div className="hidden md:flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
              <Shield className="h-3.5 w-3.5 text-teal-400" />
              <span>Yasal Doküman</span>
            </div>
          </div>
        </header>

        {/* content */}
        <article className="max-w-5xl mx-auto px-6 lg:px-10 py-14 lg:py-20">
          <div className="flex items-start gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg border border-amber-500/40 bg-amber-500/10 flex items-center justify-center flex-shrink-0">
              <FileText className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber-500">
                {doc.tag}
              </div>
              <h1 className="mt-1 font-mono font-black tracking-tighter text-3xl md:text-5xl text-white leading-[1.05]">
                {doc.title}
              </h1>
            </div>
          </div>

          <div
            data-testid="legal-content"
            className="glass rounded-2xl p-6 md:p-10 mt-6"
          >
            {renderBody(doc.body)}
          </div>

          {/* other docs nav */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.values(LEGAL_DOCS)
              .filter((d) => d.slug !== doc.slug)
              .map((d) => (
                <Link
                  key={d.slug}
                  to={`/${d.slug}`}
                  data-testid={`legal-other-${d.slug}`}
                  className="glass glass-hover rounded-xl p-4 flex items-center gap-3"
                >
                  <FileText className="h-4 w-4 text-amber-400 flex-shrink-0" />
                  <div className="font-mono text-sm font-medium text-white">
                    {d.title}
                  </div>
                </Link>
              ))}
          </div>
        </article>
      </div>
      <FooterSection />
    </div>
  );
}
