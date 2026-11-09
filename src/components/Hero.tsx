import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Navbar from "./Navbar";
import RollButton from "./RollButton";
import { smoothScrollToElement } from "../lib/smoothScroll";

const CTA_LONGO = "Vamos identificar o que está limitando sua operação.";
const CTA_CURTO = "Identificar o que limita minha operação";

// O RollButton não quebra linha: no mobile usa a versão curta do mesmo CTA.
function useIsSmUp() {
  const [isSmUp, setIsSmUp] = useState(() => window.matchMedia("(min-width: 640px)").matches);
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 640px)");
    const onChange = (e: MediaQueryListEvent) => setIsSmUp(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return isSmUp;
}

export default function Hero() {
  const isSmUp = useIsSmUp();

  return (
    <section className="relative min-h-screen w-full flex flex-col">
      <Navbar />

      <div className="flex-1" />

      <div className="relative max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-12 pt-12 pb-14 sm:pb-16 lg:pb-20">
        <p className="text-[13px] sm:text-sm text-white/70 tracking-wide mb-5 sm:mb-8">
          Horizon · Tecnologia que orquestra resultados
        </p>
        <h1 className="text-[clamp(1.75rem,6vw,3.9rem)] font-medium leading-[1.08] tracking-[-0.03em] text-white max-w-5xl">
          Sua empresa não precisa de mais tecnologia.{" "}
          <span className="text-horizon-orange">Precisa de uma operação que funcione melhor.</span>
        </h1>

        <p className="mt-5 sm:mt-7 text-[15px] sm:text-lg leading-relaxed text-white/80 max-w-2xl">
          A Horizon identifica gargalos, estrutura processos e desenvolve soluções inteligentes para empresas que querem operar melhor e crescer com consistência.
        </p>
        <p className="mt-3 text-[14px] sm:text-base leading-relaxed text-white/60 max-w-2xl">
          Desenvolvemos software, automações, integrações e inteligência operacional conectados aos desafios reais do seu negócio.
        </p>

        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <RollButton
            label={isSmUp ? CTA_LONGO : CTA_CURTO}
            className="bg-horizon-orange hover:bg-[#e55f00] text-white pl-5 sm:pl-6 pr-2 py-2 gap-3 shadow-[0_10px_30px_-6px_rgba(255,106,0,0.55)] hover:shadow-[0_14px_36px_-6px_rgba(255,106,0,0.65)] hover:-translate-y-0.5 transition-all duration-300 self-start"
            textWrapperClassName="text-[13px] sm:text-sm font-medium"
            circleClassName="w-7 h-7 sm:w-8 sm:h-8 bg-navy"
            icon={<ArrowRight size={14} className="text-white" />}
            onClick={() => smoothScrollToElement(document.querySelector("#contato"))}
          />
          <a
            href="/solucoes"
            className="group inline-flex min-h-[44px] items-center gap-2 text-[13px] sm:text-sm font-medium text-white/90 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-horizon-orange rounded-full px-1"
          >
            <span className="border-b border-white/40 group-hover:border-horizon-orange pb-0.5 transition-colors">
              Conhecer nossas soluções
            </span>
            <ArrowRight size={14} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
