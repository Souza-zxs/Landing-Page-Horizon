import { ArrowRight } from "lucide-react";
import RollButton from "./RollButton";

function AboutButton() {
  return (
    <RollButton
      label="Conhecer a Horizon"
      className="bg-navy hover:bg-navy-light text-white pl-5 sm:pl-6 pr-2 py-2"
      textWrapperClassName="text-[13px] sm:text-sm font-medium"
      circleClassName="w-7 h-7 sm:w-8 sm:h-8 bg-horizon-orange"
      icon={<ArrowRight size={14} className="text-white" />}
      onClick={() =>
        document.querySelector("#servicos")?.scrollIntoView({ behavior: "smooth" })
      }
    />
  );
}

function MarkPanel({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-[#050D1F] flex items-center justify-center ${className}`}
    >
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-horizon-orange/20" />
      <div className="absolute -bottom-14 -left-5 w-36 h-36 rounded-full bg-navy-light/40" />
      <img
        src="/horizon-icon.png"
        alt="Marca Horizon"
        className="relative z-10 w-24 sm:w-32 object-contain"
      />
    </div>
  );
}

export default function About() {
  return (
    <section id="sobre" className="relative px-4 sm:px-6 lg:px-10 py-8 sm:py-10 lg:py-14">
      <div className="max-w-[1360px] mx-auto rounded-[28px] sm:rounded-[40px] bg-white/70 backdrop-blur-lg shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] overflow-hidden pt-14 sm:pt-16 lg:pt-24 pb-12 sm:pb-16 lg:pb-20">
        <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-navy text-white flex items-center justify-center text-[11px] sm:text-xs font-semibold">
            1
          </div>
          <div className="text-xs sm:text-[13px] font-medium border border-navy/20 text-navy rounded-full px-3 sm:px-4 py-1 sm:py-1.5">
            Quem é a Horizon
          </div>
        </div>

        <h2 className="px-5 sm:px-8 lg:px-12 text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 mb-12 sm:mb-16 lg:mb-20">
          Tecnologia robusta e automações
          <br />
          inteligentes, do primeiro commit ao{" "}
          <span className="text-horizon-orange">go-live</span>.
        </h2>

        <div className="px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          <MarkPanel className="w-full aspect-[438/346] lg:aspect-[4/3]" />
          <div>
            <p className="text-[15px] sm:text-[17px] lg:text-lg leading-[1.6] font-medium text-gray-900 mb-8">
              Somos uma empresa de tecnologia B2B e B2B2C focada em
              transformar processos através de software sob medida e
              automações inteligentes — entregando soluções de ponta a
              ponta.
            </p>
            <AboutButton />
          </div>
        </div>
      </div>
    </section>
  );
}
