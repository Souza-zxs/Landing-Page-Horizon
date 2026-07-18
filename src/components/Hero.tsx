import { ArrowRight } from "lucide-react";
import Navbar from "./Navbar";
import RollButton from "./RollButton";
import { smoothScrollToElement } from "../lib/smoothScroll";

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex flex-col overflow-hidden">
      <Navbar />

      <div className="flex-1" />

      <div className="relative max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-12 pb-14 sm:pb-16 lg:pb-20">
        <p className="text-[13px] sm:text-sm text-white/70 tracking-wide mb-5 sm:mb-8">
          Horizon · Tecnologia B2B e B2B2C
        </p>
        <h1 className="text-[clamp(1.75rem,7vw,4.2rem)] sm:text-[clamp(2.5rem,5vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-white">
          Software sob medida e{" "}
          <span className="text-horizon-orange">automações</span>
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          para processos que não podem
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          esperar.
        </h1>

        <p className="mt-5 sm:mt-7 text-[15px] sm:text-lg leading-relaxed text-white/70 max-w-xl">
          Da arquitetura ao deploy, cuidamos do código, das integrações e da
          operação — pra sua equipe parar de apagar incêndio e voltar a focar
          no que faz o negócio crescer.
        </p>

        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
          <RollButton
            label="Iniciar um projeto"
            className="bg-horizon-orange hover:bg-[#e55f00] text-white pl-5 sm:pl-6 pr-2 py-2 gap-3 shadow-[0_10px_30px_-6px_rgba(255,106,0,0.55)] hover:shadow-[0_14px_36px_-6px_rgba(255,106,0,0.65)] hover:-translate-y-0.5 transition-all duration-300"
            textWrapperClassName="text-[13px] sm:text-sm font-medium"
            circleClassName="w-7 h-7 sm:w-8 sm:h-8 bg-navy"
            icon={<ArrowRight size={14} className="text-white" />}
            onClick={() => smoothScrollToElement(document.querySelector("#contato"))}
          />
        </div>
      </div>
    </section>
  );
}
