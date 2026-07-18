import {
  ArrowRight,
  BarChart3,
  Building2,
  CreditCard,
  Database,
  Globe,
  Layers,
  MessageCircle,
  Quote,
  Smartphone,
  Users,
  Wrench,
} from "lucide-react";
import { motion } from "framer-motion";
import RollButton from "./RollButton";
import SectionTag from "./SectionTag";
import { smoothScrollToElement } from "../lib/smoothScroll";

const PILLARS = [
  {
    icon: Wrench,
    title: "Sob medida",
    description:
      "Cada sistema nasce do processo real do seu negócio — nada de molde genérico que sobra ou falta.",
  },
  {
    icon: Layers,
    title: "Ponta a ponta",
    description:
      "Da arquitetura ao deploy, o mesmo time acompanha o projeto do início ao fim, sem repasses entre fornecedores.",
  },
  {
    icon: Users,
    title: "Parceria técnica",
    description:
      "Atuamos lado a lado com o seu time (ou no lugar dele), como uma extensão da própria operação.",
  },
];

const SEGMENTS = [
  {
    icon: Building2,
    tag: "B2B",
    title: "Para o seu time interno",
    description:
      "ERPs, dashboards e automações que destravam a operação de dentro pra fora.",
  },
  {
    icon: Globe,
    tag: "B2B2C",
    title: "Para o cliente do seu cliente",
    description:
      "Apps e integrações que chegam até o usuário final do seu cliente.",
  },
];

const INTEGRATIONS = [
  { icon: MessageCircle, label: "WhatsApp Cloud API" },
  { icon: Database, label: "ERPs" },
  { icon: CreditCard, label: "Gateways de pagamento" },
  { icon: Smartphone, label: "iOS & Android" },
  { icon: BarChart3, label: "Dashboards & CRM" },
];

function AboutButton() {
  return (
    <RollButton
      label="Conhecer a Horizon"
      className="bg-navy hover:bg-navy-light text-white pl-5 sm:pl-6 pr-2 py-2 shadow-[0_10px_25px_-8px_rgba(10,31,68,0.35)] hover:shadow-[0_14px_32px_-8px_rgba(10,31,68,0.45)] hover:-translate-y-0.5 transition-all duration-300"
      textWrapperClassName="text-[13px] sm:text-sm font-medium"
      circleClassName="w-7 h-7 sm:w-8 sm:h-8 bg-horizon-orange"
      icon={<ArrowRight size={14} className="text-white" />}
      onClick={() => smoothScrollToElement(document.querySelector("#servicos"))}
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
        <div className="px-5 sm:px-8 lg:px-12 mb-6 sm:mb-8">
          <SectionTag index={1} label="Quem é a Horizon" variant="light" />
        </div>

        <h2 className="px-5 sm:px-8 lg:px-12 text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 mb-12 sm:mb-16 lg:mb-20">
          Software que se encaixa no seu processo,
          <br />
          não o contrário — do commit ao{" "}
          <span className="text-horizon-orange">go-live</span>.
        </h2>

        <div className="px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          <MarkPanel className="w-full aspect-[438/346] lg:aspect-[4/3]" />
          <div>
            <p className="text-[15px] sm:text-[17px] lg:text-lg leading-[1.6] font-medium text-gray-900 mb-4">
              A Horizon é uma empresa de tecnologia B2B e B2B2C. Construímos
              sistemas e automações que resolvem o gargalo real da sua
              operação — não o que cabe num pacote fechado.
            </p>
            <p className="text-[14px] sm:text-[15px] leading-relaxed text-gray-600 mb-8 max-w-md">
              Atuamos lado a lado com o time técnico do cliente — ou no
              lugar dele — da arquitetura do sistema até a integração com o
              que a operação já usa: WhatsApp, ERPs, gateways de pagamento.
            </p>
            <AboutButton />
          </div>
        </div>

        <div className="px-5 sm:px-8 lg:px-12 mt-14 sm:mt-20 lg:mt-24">
          <div className="relative border-l-2 border-horizon-orange/40 pl-6 sm:pl-8 max-w-2xl">
            <Quote
              size={40}
              className="absolute -top-2 -left-[21px] sm:-left-[25px] text-white fill-horizon-orange stroke-horizon-orange"
            />
            <p className="text-lg sm:text-2xl font-medium italic leading-snug text-navy tracking-[-0.01em]">
              Não vendemos horas de desenvolvimento. Vendemos processos que
              param de travar.
            </p>
          </div>
        </div>

        <div className="px-5 sm:px-8 lg:px-12 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-10 sm:mt-12">
          {SEGMENTS.map(({ icon: Icon, tag, title, description }, i) => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              className="rounded-2xl bg-navy p-6 sm:p-7"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-white" />
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-horizon-orange">
                  {tag}
                </span>
              </div>
              <p className="text-base sm:text-lg font-semibold text-white mb-1.5">
                {title}
              </p>
              <p className="text-[13px] sm:text-[14px] leading-relaxed text-white/60">
                {description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="px-5 sm:px-8 lg:px-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mt-10 sm:mt-12">
          {PILLARS.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              className="rounded-2xl border border-navy/10 bg-navy/[0.03] p-6"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-navy to-navy-light flex items-center justify-center mb-4">
                <Icon size={18} className="text-white" />
              </div>
              <p className="text-base font-semibold text-navy mb-1.5">{title}</p>
              <p className="text-[13px] leading-relaxed text-gray-600">
                {description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="px-5 sm:px-8 lg:px-12 mt-10 sm:mt-12">
          <p className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.14em] text-navy/40 mb-3.5">
            Conectamos com o que sua operação já usa
          </p>
          <div className="flex flex-wrap items-center gap-2.5">
            {INTEGRATIONS.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white px-3.5 py-2 text-[13px] font-medium text-navy/80 shadow-[0_2px_8px_-2px_rgba(10,31,68,0.12)]"
              >
                <Icon size={14} className="text-horizon-orange" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
