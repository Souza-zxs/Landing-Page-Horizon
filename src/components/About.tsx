import { ArrowRight, Quote } from "lucide-react";
import { motion } from "framer-motion";
import RollButton from "./RollButton";
import SectionTag from "./SectionTag";
import { smoothScrollToElement } from "../lib/smoothScroll";

const SIGNALS = [
  "A operação depende de planilhas, mensagens e pessoas-chave para funcionar.",
  "Os sistemas que a empresa usa não conversam entre si.",
  "O crescimento aumentou o volume de trabalho, mas os processos continuam os mesmos.",
  "Falta visibilidade para o gestor decidir com segurança.",
];

export default function About() {
  return (
    <section id="sobre" className="relative px-4 sm:px-6 lg:px-10 py-8 sm:py-10 lg:py-14">
      <div className="max-w-[1360px] mx-auto rounded-[28px] sm:rounded-[40px] bg-white/70 backdrop-blur-lg shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] overflow-hidden pt-14 sm:pt-16 lg:pt-24 pb-12 sm:pb-16 lg:pb-20">
        <div className="px-5 sm:px-8 lg:px-12 mb-6 sm:mb-8">
          <SectionTag index={2} label="Para quem faz sentido" variant="light" />
        </div>

        <h2 className="px-5 sm:px-8 lg:px-12 text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 mb-10 sm:mb-14 max-w-4xl">
          Feito para empresas que cresceram mais rápido do que{" "}
          <span className="text-horizon-orange">seus processos.</span>
        </h2>

        <div className="px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-start">
          <div>
            <p className="text-[15px] sm:text-[17px] leading-[1.6] font-medium text-gray-900 mb-5">
              A Horizon trabalha com donos, diretores e gestores que percebem que a operação virou um limite para o crescimento, em empresas de serviços, clínicas, agências e operações comerciais.
            </p>
            <p className="text-[14px] sm:text-[15px] leading-relaxed text-gray-600 mb-8 max-w-lg">
              Atuamos tanto para o time interno (processos, dados, automações) quanto para a experiência do cliente final, sempre a partir do problema, não de uma tecnologia escolhida de antemão.
            </p>
            <RollButton
              label="Ver como resolvemos"
              className="bg-navy hover:bg-navy-light text-white pl-5 sm:pl-6 pr-2 py-2 shadow-[0_10px_25px_-8px_rgba(10,31,68,0.35)] hover:shadow-[0_14px_32px_-8px_rgba(10,31,68,0.45)] hover:-translate-y-0.5 transition-all duration-300"
              textWrapperClassName="text-[13px] sm:text-sm font-medium"
              circleClassName="w-7 h-7 sm:w-8 sm:h-8 bg-horizon-orange"
              icon={<ArrowRight size={14} className="text-white" />}
              onClick={() => smoothScrollToElement(document.querySelector("#servicos"))}
            />
          </div>

          <div className="rounded-3xl bg-navy p-6 sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-horizon-orange mb-4">
              Sinais de que é hora de conversar
            </p>
            <ul className="flex flex-col gap-3.5">
              {SIGNALS.map((signal, i) => (
                <motion.li
                  key={signal}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.45, delay: i * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
                  className="flex gap-3 text-[14px] sm:text-[15px] leading-relaxed text-white/80"
                >
                  <span aria-hidden="true" className="mt-2.5 w-1.5 h-1.5 rounded-full bg-horizon-orange shrink-0" />
                  {signal}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        <div className="px-5 sm:px-8 lg:px-12 mt-14 sm:mt-20">
          <div className="relative border-l-2 border-horizon-orange/40 pl-6 sm:pl-8 max-w-2xl">
            <Quote
              size={40}
              aria-hidden="true"
              className="absolute -top-2 -left-[21px] sm:-left-[25px] text-white fill-horizon-orange stroke-horizon-orange"
            />
            <p className="text-lg sm:text-2xl font-medium italic leading-snug text-navy tracking-[-0.01em]">
              Não vendemos horas de desenvolvimento. Vendemos processos que param de travar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
