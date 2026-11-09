import { ArrowRight } from "lucide-react";
import SectionTag from "./SectionTag";
import { CATEGORIAS } from "../data/solucoes";

// Apenas apresenta o portfólio e direciona para /solucoes; o catálogo
// completo mora lá e não é duplicado aqui.
export default function SolutionsTeaser() {
  return (
    <section id="solucoes" className="relative px-4 sm:px-6 lg:px-10 py-8 sm:py-10 lg:py-14">
      <div className="max-w-[1360px] mx-auto rounded-[28px] sm:rounded-[40px] bg-navy relative overflow-hidden px-6 sm:px-12 lg:px-16 py-12 sm:py-16">
        <div aria-hidden="true" className="absolute -top-20 -right-16 w-72 h-72 rounded-full bg-horizon-orange/20 blur-3xl pointer-events-none" />

        <div className="relative grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center">
          <div>
            <div className="mb-6">
              <SectionTag index={4} label="Soluções e produtos" variant="dark" />
            </div>
            <h2 className="text-[clamp(1.6rem,4.5vw,3rem)] font-medium leading-[1.1] tracking-[-0.03em] text-white mb-5">
              Além de projetos sob medida, a Horizon mantém um{" "}
              <span className="text-horizon-orange">portfólio de soluções.</span>
            </h2>
            <p className="text-[15px] sm:text-base leading-relaxed text-white/70 max-w-lg mb-8">
              Soluções para inteligência comercial, atendimento e conversão, e operação e gestão. Veja cada uma, o problema que resolve e como funciona.
            </p>
            <a
              href="/solucoes"
              className="group inline-flex min-h-[48px] items-center gap-3 rounded-full bg-horizon-orange hover:bg-[#e55f00] text-white pl-6 pr-2 py-2 text-sm font-medium shadow-[0_10px_28px_-8px_rgba(255,106,0,0.5)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              Conhecer as soluções
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white transition-transform duration-500 group-hover:-rotate-45">
                <ArrowRight size={14} aria-hidden="true" className="text-navy" />
              </span>
            </a>
          </div>

          <ul className="flex flex-col gap-3">
            {CATEGORIAS.map((c) => (
              <li key={c.id}>
                <a
                  href="/solucoes"
                  className="flex min-h-[44px] items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-md px-5 py-4 hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-horizon-orange"
                >
                  <span className="text-[11px] font-semibold text-horizon-orange tabular-nums">
                    {String(c.indice).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] sm:text-base font-medium text-white">{c.titulo}</span>
                  <ArrowRight size={14} aria-hidden="true" className="ml-auto text-white/40" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
