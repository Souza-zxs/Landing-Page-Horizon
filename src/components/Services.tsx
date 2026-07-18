import {
  BadgeCheck,
  BarChart3,
  Code2,
  MessageCircle,
  Smartphone,
  Workflow,
} from "lucide-react";
import { motion } from "framer-motion";
import SectionTag from "./SectionTag";

const SERVICES = [
  {
    icon: MessageCircle,
    title: "Integração WhatsApp ↔ CRM",
    description:
      "Fluxo de conversas ponta a ponta, direto no CRM da sua operação — sem depender de planilha ou app paralelo.",
    featured: true,
    points: ["Disparos em massa", "Webhook em tempo real", "Fila com rate limit"],
    badge: "WhatsApp Cloud API · 100% oficial Meta",
  },
  {
    icon: Code2,
    title: "Software sob medida",
    description:
      "Sistemas desenvolvidos de ponta a ponta para as necessidades reais do seu negócio, não para um molde genérico.",
    tag: "Arquitetura sob medida",
  },
  {
    icon: Workflow,
    title: "Automações inteligentes",
    description:
      "Eliminamos disparos manuais, copiar-e-colar e retrabalho operacional com automações que rodam sozinhas.",
    tag: "Zero retrabalho manual",
  },
  {
    icon: Smartphone,
    title: "Ecossistemas de apps",
    description:
      "Aplicativos iOS e Android integrados ao seu backend, como no ecossistema completo construído para a GMTrack.",
    tag: "Caso real: GMTrack",
  },
  {
    icon: BarChart3,
    title: "Dashboards & analytics",
    description:
      "Painéis de métricas para acompanhar entrega, leitura, resposta e o que mais importa para o seu time.",
    tag: "Métricas em tempo real",
  },
];

export default function Services() {
  return (
    <section id="servicos" className="relative py-16 sm:py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="mb-6 sm:mb-8">
          <SectionTag index={2} label="O que fazemos" variant="dark" />
        </div>

        <h2 className="text-[clamp(1.75rem,6vw,3.6rem)] font-medium leading-[1.08] tracking-[-0.03em] text-white mb-4 sm:mb-5 max-w-2xl">
          Da ideia ao deploy, sem
          <br className="hidden sm:block" /> gargalos no meio do caminho.
        </h2>
        <p className="text-[15px] sm:text-base leading-relaxed text-white/70 max-w-xl mb-10 sm:mb-14 lg:mb-16">
          Cada frente abaixo pode rodar isolada ou em conjunto — o time da
          Horizon entra onde o seu processo está mais travado hoje.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {SERVICES.map(
            ({ icon: Icon, title, description, featured, points, badge, tag }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.06,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className={`glass-card rounded-3xl p-7 sm:p-8 ${
                  featured ? "lg:col-span-2" : ""
                }`}
              >
                <div
                  className={`rounded-2xl bg-gradient-to-br from-horizon-orange to-[#ff9640] shadow-[0_8px_20px_-4px_rgba(255,106,0,0.55)] flex items-center justify-center mb-7 ${
                    featured ? "w-14 h-14" : "w-12 h-12"
                  }`}
                >
                  <Icon size={featured ? 22 : 20} className="text-white" />
                </div>
                <p
                  className={`font-semibold text-navy tracking-tight mb-2.5 ${
                    featured ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"
                  }`}
                >
                  {title}
                </p>
                <p className="text-[14px] sm:text-[15px] leading-relaxed text-gray-600 max-w-md">
                  {description}
                </p>

                {featured && points && (
                  <div className="flex flex-wrap gap-2 mt-5">
                    {points.map((point) => (
                      <span
                        key={point}
                        className="inline-flex items-center gap-1.5 rounded-full bg-navy/5 border border-navy/10 px-3 py-1.5 text-[12.5px] font-medium text-navy/80"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-horizon-orange" />
                        {point}
                      </span>
                    ))}
                  </div>
                )}
                {featured && badge && (
                  <div className="inline-flex items-center gap-1.5 mt-5 text-[12.5px] font-medium text-horizon-orange">
                    <BadgeCheck size={15} />
                    {badge}
                  </div>
                )}
                {!featured && tag && (
                  <div className="inline-block mt-5 text-[12px] font-medium text-horizon-orange bg-horizon-orange/10 rounded-full px-3 py-1">
                    {tag}
                  </div>
                )}
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
