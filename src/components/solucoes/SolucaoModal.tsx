import { useEffect, useRef } from "react";
import { MessageCircle, X } from "lucide-react";
import type { Solucao } from "../../data/solucoes";
import { openWhatsapp } from "../../lib/whatsapp";

type Props = {
  solucao: Solucao;
  onClose: () => void;
};

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function Bloco({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="mb-7">
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-horizon-orange mb-2.5">
        {titulo}
      </h3>
      {children}
    </section>
  );
}

export default function SolucaoModal({ solucao, onClose }: Props) {
  const { nome, icone: Icone, visaoGeral, problema, comoFunciona, aplicacoes, beneficios } = solucao;
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center sm:p-6">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="solucao-modal-titulo"
        className="relative w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-[28px] sm:rounded-[32px] bg-[#F5F5F5] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] px-6 sm:px-10 pt-8 pb-8"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Fechar detalhes"
          className="absolute top-4 right-4 flex items-center justify-center w-11 h-11 rounded-full bg-navy text-white hover:bg-navy-light transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-horizon-orange"
        >
          <X size={18} aria-hidden="true" />
        </button>

        <div className="flex items-center gap-4 mb-6 pr-12">
          <span className="shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl bg-navy text-white">
            <Icone size={26} aria-hidden="true" />
          </span>
          <h2 id="solucao-modal-titulo" className="text-2xl sm:text-3xl font-semibold tracking-tight text-navy leading-tight">
            {nome}
          </h2>
        </div>

        <Bloco titulo="Visão geral">
          <p className="text-[15px] leading-relaxed text-gray-700">{visaoGeral}</p>
        </Bloco>

        <Bloco titulo="Problema que resolve">
          <p className="text-[15px] leading-relaxed text-gray-700">{problema}</p>
        </Bloco>

        <Bloco titulo="Como funciona">
          <ol className="flex flex-col gap-3">
            {comoFunciona.map((passo, i) => (
              <li key={passo.titulo} className="flex gap-3.5">
                <span className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-horizon-orange text-white text-xs font-semibold tabular-nums">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy">{passo.titulo}</p>
                  <p className="text-sm leading-relaxed text-gray-600">{passo.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </Bloco>

        <Bloco titulo="Aplicações empresariais">
          <ul className="flex flex-col gap-1.5">
            {aplicacoes.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
                <span aria-hidden="true" className="mt-2 w-1.5 h-1.5 rounded-full bg-horizon-orange shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </Bloco>

        <Bloco titulo="Benefícios esperados">
          <ul className="flex flex-col gap-1.5">
            {beneficios.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
                <span aria-hidden="true" className="mt-2 w-1.5 h-1.5 rounded-full bg-navy shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </Bloco>

        <button
          type="button"
          onClick={() => openWhatsapp(`Olá! Quero conversar sobre a solução ${nome} da Horizon.`)}
          className="w-full sm:w-auto inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-full bg-horizon-orange hover:bg-[#e55f00] text-white px-7 py-3 text-sm font-medium shadow-[0_10px_28px_-8px_rgba(255,106,0,0.5)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
        >
          <MessageCircle size={16} aria-hidden="true" />
          Conversar com a Horizon
        </button>
      </div>
    </div>
  );
}
