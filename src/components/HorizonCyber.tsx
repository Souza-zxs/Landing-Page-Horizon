import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import RollButton from "./RollButton";
import SectionTag from "./SectionTag";
import { smoothScrollToElement } from "../lib/smoothScroll";

const AREAS = [
  "Cyber Assessment",
  "Avaliação de vulnerabilidades",
  "Segurança de aplicações",
  "Segurança de APIs",
  "Análise de riscos",
];

const BENEFICIOS = [
  "Identificação de vulnerabilidades e pontos de exposição.",
  "Análise dos principais riscos digitais.",
  "Avaliação da estrutura tecnológica.",
  "Relatório com os achados identificados.",
  "Recomendações priorizadas para evolução da segurança.",
];

const EASE = [0.25, 0.1, 0.25, 1] as const;

export default function HorizonCyber() {
  const scrollToContato = () => {
    const alvo = document.querySelector("#contato");
    if (alvo) smoothScrollToElement(alvo);
    else window.location.href = "/#contato";
  };

  return (
    <section id="cyber" className="relative py-16 sm:py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="mb-6 sm:mb-8">
          <SectionTag index={4} label="Horizon Cyber" variant="dark" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-start">
          <div>
            <h2 className="text-[clamp(1.75rem,6vw,3.6rem)] font-medium leading-[1.08] tracking-[-0.03em] text-white mb-4 sm:mb-5">
              Segurança digital como parte da{" "}
              <span className="text-horizon-orange">evolução do seu negócio.</span>
            </h2>
            <p className="text-[15px] sm:text-base leading-relaxed text-white/70 max-w-xl mb-8">
              Avaliamos a segurança da sua estrutura tecnológica para identificar vulnerabilidades, compreender riscos e
              orientar melhorias antes que problemas se transformem em incidentes.
            </p>

            <ul className="flex flex-wrap gap-2.5" aria-label="Frentes da Horizon Cyber">
              {AREAS.map((area, i) => (
                <motion.li
                  key={area}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.45, delay: i * 0.05, ease: EASE }}
                  className="rounded-full border border-white/15 bg-white/5 backdrop-blur-md px-4 py-2 text-[13px] sm:text-sm text-white/85"
                >
                  {area}
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="glass-card rounded-3xl p-7 sm:p-10"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-horizon-orange to-[#ff9640] shadow-[0_8px_20px_-4px_rgba(255,106,0,0.55)] flex items-center justify-center mb-7">
              <ShieldCheck size={20} aria-hidden="true" className="text-white" />
            </div>
            <p className="text-[12px] font-medium text-horizon-orange mb-2">Cyber Assessment</p>
            <h3 className="text-xl sm:text-3xl font-semibold text-navy tracking-tight mb-3">
              Descubra o nível de segurança da sua operação digital.
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-relaxed text-gray-600 max-w-lg mb-6">
              O Cyber Assessment é um diagnóstico estruturado para identificar fragilidades, avaliar riscos e apresentar
              recomendações práticas para fortalecer a segurança do negócio.
            </p>

            <ul className="flex flex-col gap-3 mb-8">
              {BENEFICIOS.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[14px] sm:text-[15px] text-navy/85">
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-horizon-orange/15 flex items-center justify-center">
                    <Check size={12} aria-hidden="true" className="text-horizon-orange" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <RollButton
              label="Solicitar um Cyber Assessment"
              className="min-h-[48px] bg-navy hover:bg-navy-light text-white pl-6 pr-2 py-2 shadow-[0_10px_25px_-8px_rgba(10,31,68,0.5)] hover:-translate-y-0.5 transition-all duration-300"
              textWrapperClassName="text-[13px] sm:text-sm font-medium"
              circleClassName="w-8 h-8 bg-horizon-orange"
              icon={<ArrowRight size={14} className="text-white" />}
              onClick={scrollToContato}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
