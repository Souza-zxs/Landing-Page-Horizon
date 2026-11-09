import { BarChart3, Bot, Layers, Plug, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import SectionTag from "./SectionTag";

type Frente = {
  icon: LucideIcon;
  title: string;
  description: string;
  resolve: string;
  wide?: boolean;
};

const FRENTES: Frente[] = [
  {
    icon: Bot,
    title: "Inteligência e automação",
    description:
      "Automações e agentes de IA que assumem tarefas repetitivas, como atendimento inicial, qualificação e rotinas operacionais, para a equipe focar no que exige decisão.",
    resolve: "Processos manuais e gargalos comerciais",
    wide: true,
  },
  {
    icon: Layers,
    title: "Sistemas e plataformas",
    description:
      "Sistemas sob medida, desenhados a partir do processo real da empresa, quando nenhuma ferramenta de prateleira resolve.",
    resolve: "Retrabalho e processos fora do padrão",
  },
  {
    icon: Plug,
    title: "Integrações e ecossistemas",
    description:
      "Conexão entre o que a operação já usa, como WhatsApp, CRM, ERP e financeiro, para a informação circular sem digitação manual.",
    resolve: "Sistemas desconectados",
  },
  {
    icon: BarChart3,
    title: "Dados e inteligência operacional",
    description:
      "Dashboards e indicadores que reúnem os dados da operação e dão ao gestor visibilidade para decidir com base em fatos.",
    resolve: "Falta de visibilidade",
    wide: true,
  },
];

export default function Services() {
  return (
    <section id="servicos" className="relative py-16 sm:py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="mb-6 sm:mb-8">
          <SectionTag index={3} label="Como resolvemos" variant="dark" />
        </div>

        <h2 className="text-[clamp(1.75rem,6vw,3.6rem)] font-medium leading-[1.08] tracking-[-0.03em] text-white mb-4 sm:mb-5 max-w-3xl">
          Quatro frentes, um mesmo objetivo: uma operação que{" "}
          <span className="text-horizon-orange">funciona melhor.</span>
        </h2>
        <p className="text-[15px] sm:text-base leading-relaxed text-white/70 max-w-xl mb-10 sm:mb-14 lg:mb-16">
          Cada frente pode atuar isolada ou em conjunto. A Horizon entra onde o gargalo da sua operação está hoje.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {FRENTES.map(({ icon: Icon, title, description, resolve, wide }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
              className={`glass-card rounded-3xl p-7 sm:p-8 flex flex-col ${wide ? "lg:col-span-2" : ""}`}
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-horizon-orange to-[#ff9640] shadow-[0_8px_20px_-4px_rgba(255,106,0,0.55)] flex items-center justify-center mb-7">
                <Icon size={20} aria-hidden="true" className="text-white" />
              </div>
              <h3 className="text-lg sm:text-2xl font-semibold text-navy tracking-tight mb-2.5">{title}</h3>
              <p className="text-[14px] sm:text-[15px] leading-relaxed text-gray-600 max-w-lg">{description}</p>
              <p className="mt-auto pt-5 text-[12px] font-medium text-horizon-orange">
                <span className="text-navy/50">Ajuda a resolver: </span>
                {resolve}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
