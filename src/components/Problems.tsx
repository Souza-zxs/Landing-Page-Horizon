import { motion } from "framer-motion";
import SectionTag from "./SectionTag";

const PROBLEMS = [
  {
    title: "Processos manuais",
    description:
      "Planilhas, mensagens e controles feitos à mão consomem o tempo de quem deveria estar decidindo e executando.",
  },
  {
    title: "Retrabalho",
    description:
      "A mesma informação digitada em lugares diferentes, conferências repetidas e correções que ninguém previu.",
  },
  {
    title: "Sistemas desconectados",
    description:
      "CRM, financeiro, atendimento e operação cada um numa ponta, sem conversar entre si.",
  },
  {
    title: "Falta de visibilidade",
    description:
      "Os números existem, mas chegam tarde ou divergem. No fim, decide-se por percepção.",
  },
  {
    title: "Gargalos comerciais",
    description:
      "Leads que esfriam, propostas lentas e um funil que ninguém consegue acompanhar de ponta a ponta.",
  },
];

export default function Problems() {
  return (
    <section id="problemas" className="relative py-16 sm:py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-20">
        <div className="lg:sticky lg:top-12 lg:self-start">
          <div className="mb-6 sm:mb-8">
            <SectionTag index={1} label="O que trava a operação" variant="dark" />
          </div>
          <h2 className="text-[clamp(1.75rem,5vw,3.4rem)] font-medium leading-[1.08] tracking-[-0.03em] text-white mb-5">
            O gargalo quase nunca está onde a empresa{" "}
            <span className="text-horizon-orange">acha que está.</span>
          </h2>
          <p className="text-[15px] sm:text-base leading-relaxed text-white/70 max-w-md">
            Antes de falar de sistema ou automação, a Horizon procura o ponto da operação que limita o crescimento. Estes são os mais comuns.
          </p>
        </div>

        <ol className="flex flex-col">
          {PROBLEMS.map((problem, i) => (
            <motion.li
              key={problem.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
              className={`flex gap-5 sm:gap-8 border-t border-white/15 py-6 sm:py-8 ${
                i % 2 === 1 ? "lg:pl-10" : ""
              }`}
            >
              <span
                aria-hidden="true"
                className="shrink-0 text-[clamp(2rem,4vw,3rem)] font-medium leading-none tracking-tight text-horizon-orange/80 tabular-nums w-14 sm:w-20"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-lg sm:text-2xl font-semibold tracking-tight text-white mb-2">
                  {problem.title}
                </h3>
                <p className="text-[14px] sm:text-[15px] leading-relaxed text-white/65 max-w-lg">
                  {problem.description}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
