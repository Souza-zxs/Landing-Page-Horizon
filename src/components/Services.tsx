import {
  BarChart3,
  Code2,
  MessageCircle,
  Smartphone,
  Workflow,
} from "lucide-react";

const SERVICES = [
  {
    icon: Code2,
    title: "Software sob medida",
    description:
      "Sistemas desenvolvidos de ponta a ponta para as necessidades reais do seu negócio, não para um molde genérico.",
  },
  {
    icon: Workflow,
    title: "Automações inteligentes",
    description:
      "Eliminamos disparos manuais, copiar-e-colar e retrabalho operacional com automações que rodam sozinhas.",
  },
  {
    icon: MessageCircle,
    title: "Integração WhatsApp ↔ CRM",
    description:
      "Disparos em massa, webhook em tempo real e fila com rate limit — via WhatsApp Cloud API 100% oficial Meta.",
  },
  {
    icon: Smartphone,
    title: "Ecossistemas de apps",
    description:
      "Aplicativos iOS e Android integrados ao seu backend, como no ecossistema completo construído para a GMTrack.",
  },
  {
    icon: BarChart3,
    title: "Dashboards & analytics",
    description:
      "Painéis de métricas para acompanhar entrega, leitura, resposta e o que mais importa para o seu time.",
  },
];

export default function Services() {
  return (
    <section id="servicos" className="relative py-16 sm:py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-horizon-orange text-white flex items-center justify-center text-[11px] sm:text-xs font-semibold">
            2
          </div>
          <div className="text-xs sm:text-[13px] font-medium border border-white/25 text-white/70 rounded-full px-3 sm:px-4 py-1 sm:py-1.5">
            O que fazemos
          </div>
        </div>

        <h2 className="text-[clamp(1.75rem,6vw,3.6rem)] font-medium leading-[1.08] tracking-[-0.03em] text-white mb-10 sm:mb-14 lg:mb-16 max-w-2xl">
          Da ideia ao deploy, sem
          <br className="hidden sm:block" /> gargalos no meio do caminho.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {SERVICES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl bg-white/60 backdrop-blur-lg shadow-[0_20px_50px_-15px_rgba(0,0,0,0.4)] p-6 sm:p-7 hover:bg-white/80 transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-horizon-orange/15 flex items-center justify-center mb-6">
                <Icon size={18} className="text-horizon-orange" />
              </div>
              <p className="text-[15px] sm:text-base font-semibold text-gray-900 mb-2">
                {title}
              </p>
              <p className="text-[13px] sm:text-sm leading-relaxed text-gray-600">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
