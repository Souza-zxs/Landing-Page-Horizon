import { FileCheck } from "lucide-react";
import { motion } from "framer-motion";
import SectionTag from "./SectionTag";

const STEPS = [
  {
    title: "Problema",
    description:
      "Mapeamos onde a operação trava: quem faz o quê, onde o trabalho se repete e o que o gestor não consegue enxergar.",
    focus: "Entender antes de propor",
  },
  {
    title: "Processo",
    description:
      "Estruturamos o fluxo ideal, com responsáveis e regras do negócio definidos, antes de pensar em ferramenta.",
    focus: "Fluxo desenhado",
  },
  {
    title: "Tecnologia",
    description:
      "Escolhemos a tecnologia que serve ao processo: automação, sistema, integração ou dados, na medida do necessário.",
    focus: "Só o que faz sentido",
  },
  {
    title: "Solução",
    description:
      "Construímos e ajustamos a solução com a sua equipe, em entregas acompanhadas, sem caixa-preta.",
    focus: "Entrega acompanhada",
  },
  {
    title: "Resultado",
    description:
      "Acompanhamos o uso no dia a dia para a mudança se sustentar e a operação ganhar consistência.",
    focus: "Acompanhamento contínuo",
  },
];

export default function Process() {
  return (
    <section id="metodologia" className="relative py-16 sm:py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="mb-6 sm:mb-8">
          <SectionTag index={6} label="Método Horizon" variant="dark" />
        </div>

        <h2 className="text-[clamp(1.75rem,6vw,3.6rem)] font-medium leading-[1.08] tracking-[-0.03em] text-white mb-4 sm:mb-5 max-w-2xl">
          Problema, processo, tecnologia,
          <br className="hidden sm:block" /> solução e <span className="text-horizon-orange">resultado.</span>
        </h2>
        <p className="text-[15px] sm:text-base leading-relaxed text-white/70 max-w-xl mb-10 sm:mb-14 lg:mb-16">
          Tecnologia entra no meio do caminho, não no começo. Cada etapa tem
          um objetivo claro, para você acompanhar o andamento sem depender de
          reuniões de status.
        </p>

        <div className="relative">
          <div className="hidden lg:block absolute left-[10%] right-[10%] top-[52px] sm:top-[56px] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="glass-card rounded-3xl p-6 sm:p-7 flex flex-col h-full"
              >
                <div className="w-10 h-10 rounded-full bg-horizon-orange text-white flex items-center justify-center text-sm font-semibold shadow-[0_6px_16px_-4px_rgba(255,106,0,0.6)] mb-6 relative z-10">
                  {i + 1}
                </div>
                <p className="text-lg sm:text-xl font-semibold text-navy tracking-tight mb-2.5">
                  {step.title}
                </p>
                <p className="text-[14px] sm:text-[15px] leading-relaxed text-gray-600">
                  {step.description}
                </p>
                <div className="mt-auto pt-5">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-navy/5 border border-navy/10 px-3 py-1.5 text-[12px] font-medium text-navy/70">
                    <FileCheck size={13} className="text-horizon-orange shrink-0" />
                    {step.focus}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
