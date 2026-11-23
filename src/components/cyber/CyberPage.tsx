import { ArrowDown, Check, MessageCircle, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import AmbientBackground from "../AmbientBackground";
import Navbar from "../Navbar";
import Footer from "../Footer";
import RollButton from "../RollButton";
import SectionTag from "../SectionTag";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { smoothScrollToElement } from "../../lib/smoothScroll";
import { openWhatsapp } from "../../lib/whatsapp";
import { AREAS, BENEFICIOS, ESCOPO, ETAPAS, PRINCIPIOS } from "./data";

const URL_CANONICA = "https://horizonlabs.com.br/cyber";
const TITULO = "Horizon Labs Cyber — Cyber Assessment e diagnóstico de segurança digital";
const DESCRICAO =
  "A Horizon Cyber, da Horizon Labs, avalia a segurança da sua estrutura tecnológica: vulnerabilidades, aplicações, APIs e riscos. Conheça o Cyber Assessment, diagnóstico de segurança digital da Horizon.";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: TITULO,
  url: URL_CANONICA,
  description: DESCRICAO,
  isPartOf: { "@type": "WebSite", name: "Horizon", url: "https://horizonlabs.com.br/" },
};

const EASE = [0.25, 0.1, 0.25, 1] as const;

const CARD = "rounded-2xl border border-white/12 bg-white/[0.05] backdrop-blur-md";

export default function CyberPage() {
  useDocumentMeta({ title: TITULO, description: DESCRICAO, canonical: URL_CANONICA, jsonLd: JSON_LD });

  const irParaContato = () => smoothScrollToElement(document.getElementById("contato"));

  return (
    <>
      <AmbientBackground />
      <div className="relative z-10">
        <header>
          <Navbar />
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-16 sm:pt-24 lg:pt-32 pb-12 sm:pb-16">
            <p className="text-[13px] sm:text-sm text-white/70 tracking-wide mb-5 sm:mb-8">Horizon · Horizon Cyber</p>
            <h1 className="text-[clamp(2rem,7vw,4.6rem)] font-medium leading-[1.05] tracking-[-0.03em] text-white max-w-4xl">
              Segurança digital como parte da{" "}
              <span className="text-horizon-orange">evolução do seu negócio.</span>
            </h1>
            <p className="mt-5 sm:mt-7 text-[15px] sm:text-lg leading-relaxed text-white/70 max-w-2xl">
              Avaliamos a segurança da sua estrutura tecnológica para identificar vulnerabilidades, compreender riscos e
              orientar melhorias antes que problemas se transformem em incidentes.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2.5" aria-label="Frentes da Horizon Cyber">
              {AREAS.map((area) => (
                <li
                  key={area}
                  className="rounded-full border border-white/15 bg-white/5 backdrop-blur-md px-4 py-2 text-[13px] sm:text-sm text-white/85"
                >
                  {area}
                </li>
              ))}
            </ul>
            <div className="mt-8 sm:mt-10">
              <RollButton
                label="Solicitar um Cyber Assessment"
                className="bg-horizon-orange hover:bg-[#e55f00] text-white pl-5 sm:pl-6 pr-2 py-2 min-h-[48px] shadow-[0_10px_30px_-6px_rgba(255,106,0,0.55)] hover:-translate-y-0.5 transition-all duration-300"
                textWrapperClassName="text-[13px] sm:text-sm font-medium"
                circleClassName="w-7 h-7 sm:w-8 sm:h-8 bg-navy"
                icon={<ArrowDown size={14} className="text-white" />}
                onClick={irParaContato}
              />
            </div>
          </div>
        </header>

        <main>
          <section aria-labelledby="assessment-titulo" className="relative pb-16 sm:pb-20 lg:pb-24">
            <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
              <div className="mb-6 sm:mb-8">
                <SectionTag index={1} label="Cyber Assessment" variant="dark" />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="glass-card rounded-3xl p-7 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-horizon-orange to-[#ff9640] shadow-[0_8px_20px_-4px_rgba(255,106,0,0.55)] flex items-center justify-center mb-7">
                    <ShieldCheck size={20} aria-hidden="true" className="text-white" />
                  </div>
                  <h2 id="assessment-titulo" className="text-2xl sm:text-4xl font-semibold text-navy tracking-tight mb-4">
                    Descubra o nível de segurança da sua operação digital.
                  </h2>
                  <p className="text-[14px] sm:text-[15px] leading-relaxed text-gray-600 max-w-lg">
                    O Cyber Assessment é um diagnóstico estruturado para identificar fragilidades, avaliar riscos e
                    apresentar recomendações práticas para fortalecer a segurança do negócio.
                  </p>
                </div>
                <ul className="flex flex-col gap-3.5 lg:pt-2">
                  {BENEFICIOS.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-[14px] sm:text-[15px] text-navy/85">
                      <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-horizon-orange/15 flex items-center justify-center">
                        <Check size={12} aria-hidden="true" className="text-horizon-orange" />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </section>

          <section aria-labelledby="escopo-titulo" className="relative pb-16 sm:pb-20 lg:pb-24">
            <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
              <div className="mb-6 sm:mb-8">
                <SectionTag index={2} label="O que avaliamos" variant="dark" />
              </div>
              <h2
                id="escopo-titulo"
                className="text-[clamp(1.5rem,4.5vw,2.6rem)] font-medium leading-[1.12] tracking-[-0.02em] text-white mb-3 max-w-2xl"
              >
                O que o Cyber Assessment <span className="text-horizon-orange">olha na sua operação.</span>
              </h2>
              <p className="text-[15px] leading-relaxed text-white/70 max-w-xl mb-8 sm:mb-10">
                O escopo é definido junto com você, de acordo com o que sua empresa usa e o que mais importa proteger.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {ESCOPO.map(({ title, text }, i) => (
                  <motion.li
                    key={title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.45, delay: (i % 3) * 0.06, ease: EASE }}
                    className={`${CARD} p-6`}
                  >
                    <h3 className="text-[16px] font-semibold text-white mb-2">{title}</h3>
                    <p className="text-[14px] leading-relaxed text-white/65">{text}</p>
                  </motion.li>
                ))}
              </ul>
            </div>
          </section>

          <section aria-labelledby="atuacao-titulo" className="relative pb-16 sm:pb-20 lg:pb-24">
            <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
              <div className="mb-6 sm:mb-8">
                <SectionTag index={3} label="Como atuamos" variant="dark" />
              </div>
              <h2
                id="atuacao-titulo"
                className="text-[clamp(1.5rem,4.5vw,2.6rem)] font-medium leading-[1.12] tracking-[-0.02em] text-white mb-8 sm:mb-10 max-w-2xl"
              >
                Como atuamos, <span className="text-horizon-orange">do escopo às recomendações.</span>
              </h2>
              <ol className="flex flex-col">
                {ETAPAS.map(({ title, fazemos, recebe }, i) => (
                  <motion.li
                    key={title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="grid grid-cols-1 md:grid-cols-[72px_0.8fr_1.4fr_1fr] gap-x-6 gap-y-2 border-t border-white/20 py-6 sm:py-7"
                  >
                    <span className="text-[13px] font-medium text-horizon-orange md:pt-1.5">0{i + 1}</span>
                    <h3 className="text-[18px] sm:text-xl font-semibold text-white tracking-tight">{title}</h3>
                    <p className="text-[14px] sm:text-[15px] leading-relaxed text-white/70">{fazemos}</p>
                    <p className="text-[13px] sm:text-[14px] leading-relaxed text-white/90">
                      <span className="block text-[12px] text-horizon-orange mb-1">Você recebe</span>
                      {recebe}
                    </p>
                  </motion.li>
                ))}
              </ol>
            </div>
          </section>

          <section aria-labelledby="principios-titulo" className="relative pb-16 sm:pb-20 lg:pb-24">
            <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
              <div className="mb-6 sm:mb-8">
                <SectionTag index={4} label="Como conduzimos" variant="dark" />
              </div>
              <h2
                id="principios-titulo"
                className="text-[clamp(1.5rem,4.5vw,2.6rem)] font-medium leading-[1.12] tracking-[-0.02em] text-white mb-8 sm:mb-10 max-w-2xl"
              >
                Como a Horizon <span className="text-horizon-orange">conduz o trabalho.</span>
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {PRINCIPIOS.map(({ title, text }) => (
                  <li key={title} className={`${CARD} p-6 sm:p-7`}>
                    <h3 className="text-[16px] sm:text-[17px] font-semibold text-white mb-2">{title}</h3>
                    <p className="text-[14px] leading-relaxed text-white/65">{text}</p>
                  </li>
                ))}
              </ul>

              <div className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
                <div className="rounded-3xl border border-white/12 bg-white/[0.05] backdrop-blur-md p-7 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Para quem faz sentido</h3>
                  <p className="text-[14px] sm:text-[15px] leading-relaxed text-white/70">
                    Empresas que dependem de sistemas, aplicações ou APIs para operar, que lidam com dados de clientes
                    ou que estão crescendo e querem saber onde estão expostas antes que isso vire um problema.
                  </p>
                </div>
                <div className="rounded-3xl border border-white/12 bg-white/[0.05] backdrop-blur-md p-7 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">O que é, e o que não é</h3>
                  <p className="text-[14px] sm:text-[15px] leading-relaxed text-white/70">
                    O Cyber Assessment é um diagnóstico: mostra onde estão os riscos e o que fazer primeiro. Não é um
                    serviço de monitoramento contínuo nem de resposta a incidentes.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="contato" aria-labelledby="cta-titulo" className="relative px-4 sm:px-6 lg:px-10 pb-6">
            <div className="max-w-[1360px] mx-auto rounded-[28px] sm:rounded-[40px] bg-navy px-6 sm:px-12 py-14 sm:py-20 overflow-hidden relative">
              <div
                aria-hidden="true"
                className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-horizon-orange/20 blur-3xl pointer-events-none"
              />
              <h2
                id="cta-titulo"
                className="relative text-[clamp(1.75rem,5vw,3.2rem)] font-medium leading-[1.1] tracking-[-0.03em] text-white mb-5 max-w-2xl"
              >
                Quer saber como está a segurança da sua operação?
              </h2>
              <p className="relative text-[15px] sm:text-base leading-relaxed text-white/70 max-w-xl mb-8">
                Converse com a Horizon e solicite um Cyber Assessment. Definimos juntos o escopo e o melhor ponto de
                partida para o seu negócio.
              </p>
              <div className="relative">
                <RollButton
                  label="Solicitar um Cyber Assessment"
                  className="bg-horizon-orange hover:bg-[#e55f00] text-white pl-5 sm:pl-6 pr-2 py-2 min-h-[48px] shadow-[0_10px_28px_-8px_rgba(255,106,0,0.5)] hover:-translate-y-0.5 transition-all duration-300"
                  textWrapperClassName="text-[13px] sm:text-sm font-medium"
                  circleClassName="w-7 h-7 sm:w-8 sm:h-8 bg-white"
                  icon={<MessageCircle size={14} className="text-navy" />}
                  onClick={() =>
                    openWhatsapp("Olá! Vim pela página da Horizon Cyber e quero solicitar um Cyber Assessment.")
                  }
                />
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
