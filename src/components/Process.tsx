import { motion } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "Diagnóstico",
    description:
      "Mapeamos o processo que trava o time, entendemos as regras de negócio e definimos um escopo técnico realista — sem promessas genéricas.",
  },
  {
    number: "02",
    title: "Prototipagem",
    description:
      "Alinhamos telas, fluxos e integrações com você antes de qualquer linha de código entrar em produção.",
  },
  {
    number: "03",
    title: "Desenvolvimento",
    description:
      "Sprints curtos, entregas incrementais e comunicação direta com quem está de fato construindo o seu projeto.",
  },
  {
    number: "04",
    title: "Deploy & suporte",
    description:
      "Colocamos no ar com monitoramento ativo e seguimos por perto pra ajustar o que for preciso no dia a dia.",
  },
];

export default function Process() {
  return (
    <section id="metodologia" className="relative py-16 sm:py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-horizon-orange text-white flex items-center justify-center text-[11px] sm:text-xs font-semibold">
            3
          </div>
          <div className="text-xs sm:text-[13px] font-medium border border-white/25 text-white/70 rounded-full px-3 sm:px-4 py-1 sm:py-1.5">
            Como trabalhamos
          </div>
        </div>

        <h2 className="text-[clamp(1.75rem,6vw,3.6rem)] font-medium leading-[1.08] tracking-[-0.03em] text-white mb-4 sm:mb-5 max-w-2xl">
          Um processo claro, do primeiro
          <br className="hidden sm:block" /> diagnóstico ao suporte contínuo.
        </h2>
        <p className="text-[15px] sm:text-base leading-relaxed text-white/70 max-w-xl mb-10 sm:mb-14 lg:mb-16">
          Sem caixa-preta: cada etapa do projeto tem um responsável claro e um
          entregável visível, pra você acompanhar o andamento sem depender de
          reuniões de status.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="glass-card rounded-3xl p-7 sm:p-8"
            >
              <p className="text-3xl sm:text-4xl font-semibold text-horizon-orange/60 tracking-tight mb-6">
                {step.number}
              </p>
              <p className="text-lg sm:text-xl font-semibold text-navy tracking-tight mb-2.5">
                {step.title}
              </p>
              <p className="text-[14px] sm:text-[15px] leading-relaxed text-gray-600">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
