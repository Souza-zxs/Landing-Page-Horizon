import { ArrowUpRight, Check } from "lucide-react";
import type { Solucao } from "../../data/solucoes";

type Props = {
  solucao: Solucao;
  onOpen: (slug: string) => void;
};

export default function SolucaoCard({ solucao, onOpen }: Props) {
  const { nome, icone: Icone, descricao, problema, aplicacoes, beneficios, slug } = solucao;

  return (
    <article className="group relative flex flex-col rounded-3xl bg-white/80 ring-1 ring-navy/10 p-6 sm:p-7 shadow-[0_20px_50px_-25px_rgba(10,31,68,0.45)] transition-transform duration-300 hover:-translate-y-1">
      <div className="flex items-start gap-4 mb-4">
        <span className="shrink-0 flex items-center justify-center w-12 h-12 rounded-2xl bg-navy text-white">
          <Icone size={22} aria-hidden="true" />
        </span>
        <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-navy leading-tight pt-1">
          {nome}
        </h3>
      </div>

      <p className="text-[15px] leading-relaxed text-gray-700 mb-5">{descricao}</p>

      <div className="mb-5 rounded-2xl bg-horizon-orange/[0.08] px-4 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#B34A00] mb-1">
          Problema que resolve
        </p>
        <p className="text-sm leading-relaxed text-gray-800">{problema}</p>
      </div>

      <div className="mb-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-navy/50 mb-2">
          Aplicações práticas
        </p>
        <ul className="flex flex-col gap-1.5">
          {aplicacoes.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
              <span aria-hidden="true" className="mt-2 w-1.5 h-1.5 rounded-full bg-horizon-orange shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-navy/50 mb-2">
          Benefícios
        </p>
        <ul className="flex flex-col gap-1.5">
          {beneficios.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
              <Check size={15} aria-hidden="true" className="text-horizon-orange shrink-0 mt-1" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={() => onOpen(slug)}
        aria-haspopup="dialog"
        aria-label={`Conhecer solução ${nome}`}
        className="mt-auto inline-flex min-h-[44px] items-center justify-between gap-3 rounded-full bg-navy hover:bg-navy-light text-white pl-5 pr-2 py-2 text-sm font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-horizon-orange focus-visible:ring-offset-2"
      >
        Conhecer solução
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-horizon-orange transition-transform duration-500 group-hover:-rotate-45">
          <ArrowUpRight size={14} aria-hidden="true" />
        </span>
      </button>
    </article>
  );
}
