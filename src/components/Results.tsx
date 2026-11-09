import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import SectionTag from "./SectionTag";

// Resultado em termos de mudança na operação. Sem números: métricas só entram
// aqui com fonte e contexto validados.
const MUDANCAS = [
  {
    tema: "Processos manuais",
    antes: "Tarefas repetitivas feitas à mão, dependendo de quem lembra de fazer.",
    depois: "Rotinas automatizadas, com a equipe focada em decisão e relacionamento.",
  },
  {
    tema: "Retrabalho",
    antes: "A mesma informação digitada e conferida em vários lugares.",
    depois: "Informação registrada uma vez e circulando entre as áreas.",
  },
  {
    tema: "Sistemas desconectados",
    antes: "Cada área com sua ferramenta, sem visão do conjunto.",
    depois: "Sistemas integrados, com o dado seguindo o fluxo da operação.",
  },
  {
    tema: "Falta de visibilidade",
    antes: "Decisões baseadas em percepção e em relatórios atrasados.",
    depois: "Indicadores acompanhados em um só lugar, para decidir com mais segurança.",
  },
  {
    tema: "Gargalos comerciais",
    antes: "Leads que esfriam e propostas que demoram a sair.",
    depois: "Primeiro contato rápido, funil visível e propostas mais ágeis.",
  },
];

export default function Results() {
  return (
    <section id="resultados" className="relative py-16 sm:py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="mb-6 sm:mb-8">
          <SectionTag index={6} label="Resultado" variant="dark" />
        </div>

        <h2 className="text-[clamp(1.75rem,6vw,3.6rem)] font-medium leading-[1.08] tracking-[-0.03em] text-white mb-4 sm:mb-5 max-w-3xl">
          O que muda quando o gargalo{" "}
          <span className="text-horizon-orange">é resolvido.</span>
        </h2>
        <p className="text-[15px] sm:text-base leading-relaxed text-white/70 max-w-xl mb-10 sm:mb-14">
          O resultado de um projeto Horizon aparece na rotina da operação: menos trabalho repetido, informação confiável e tempo da equipe voltado ao que faz o negócio crescer.
        </p>

        <ul className="flex flex-col">
          {MUDANCAS.map((m, i) => (
            <motion.li
              key={m.tema}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
              className="grid grid-cols-1 lg:grid-cols-[0.7fr_1fr_auto_1.2fr] gap-3 lg:gap-8 items-start lg:items-center border-t border-white/15 py-6 sm:py-7"
            >
              <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-horizon-orange">
                {m.tema}
              </p>
              <p className="text-[14px] sm:text-[15px] leading-relaxed text-white/50">
                <span className="sr-only">Antes: </span>
                {m.antes}
              </p>
              <ArrowRight size={18} aria-hidden="true" className="hidden lg:block text-white/30" />
              <p className="text-[15px] sm:text-lg font-medium leading-snug text-white">
                <span className="sr-only">Depois: </span>
                {m.depois}
              </p>
            </motion.li>
          ))}
        </ul>

        <p className="border-t border-white/15 pt-6 text-[13px] sm:text-sm text-white/50 max-w-2xl">
          O ganho varia de operação para operação. Na primeira conversa, definimos com você o que faz sentido medir.
        </p>
      </div>
    </section>
  );
}
