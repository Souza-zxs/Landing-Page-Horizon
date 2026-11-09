import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowRight, MessageCircle } from "lucide-react";
import AmbientBackground from "../AmbientBackground";
import Navbar from "../Navbar";
import Footer from "../Footer";
import RollButton from "../RollButton";
import SectionTag from "../SectionTag";
import SolucaoCard from "./SolucaoCard";
import SolucaoModal from "./SolucaoModal";
import { CATEGORIAS, FLUXO_HORIZON, SOLUCOES } from "../../data/solucoes";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { smoothScrollToElement } from "../../lib/smoothScroll";
import { openWhatsapp } from "../../lib/whatsapp";

const URL_CANONICA = "https://horizonlabs.com.br/solucoes";
const TITULO = "Soluções Horizon — CRM, agentes de IA e inteligência para empresas";
const DESCRICAO =
  "Conheça o portfólio da Horizon: inteligência comercial, atendimento e conversão com IA, operação e gestão. Tecnologia, inteligência e automação para empresas que querem escalar.";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: TITULO,
  url: URL_CANONICA,
  description: DESCRICAO,
  isPartOf: { "@type": "WebSite", name: "Horizon", url: "https://horizonlabs.com.br/" },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: SOLUCOES.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.nome,
      description: s.descricao,
    })),
  },
};

function slugDoHash() {
  const slug = window.location.hash.replace(/^#/, "");
  return SOLUCOES.some((s) => s.slug === slug) ? slug : null;
}

export default function SolucoesPage() {
  const [aberta, setAberta] = useState<string | null>(slugDoHash);

  useDocumentMeta({ title: TITULO, description: DESCRICAO, canonical: URL_CANONICA, jsonLd: JSON_LD });

  const abrir = useCallback((slug: string) => {
    setAberta(slug);
    history.replaceState(null, "", `#${slug}`);
  }, []);

  const fechar = useCallback(() => {
    setAberta(null);
    history.replaceState(null, "", window.location.pathname);
  }, []);

  useEffect(() => {
    const onHash = () => setAberta(slugDoHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const solucaoAberta = useMemo(() => SOLUCOES.find((s) => s.slug === aberta) ?? null, [aberta]);

  const irPara = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    smoothScrollToElement(document.getElementById(id));
  };

  return (
    <>
      <AmbientBackground />
      <div className="relative z-10">
        <header>
          <Navbar />
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-16 sm:pt-24 lg:pt-32 pb-12 sm:pb-16">
            <p className="text-[13px] sm:text-sm text-white/70 tracking-wide mb-5 sm:mb-8">
              Horizon · Tecnologia que orquestra resultados
            </p>
            <h1 className="text-[clamp(2rem,7vw,4.6rem)] font-medium leading-[1.05] tracking-[-0.03em] text-white max-w-4xl">
              Soluções para empresas que querem{" "}
              <span className="text-horizon-orange">escalar.</span>
            </h1>
            <p className="mt-5 sm:mt-7 text-[15px] sm:text-lg leading-relaxed text-white/70 max-w-xl">
              Tecnologia, inteligência e automação para transformar processos empresariais em operações mais eficientes e escaláveis.
            </p>
            <div className="mt-8 sm:mt-10">
              <RollButton
                label="Explorar soluções"
                className="bg-horizon-orange hover:bg-[#e55f00] text-white pl-5 sm:pl-6 pr-2 py-2 shadow-[0_10px_30px_-6px_rgba(255,106,0,0.55)] hover:-translate-y-0.5 transition-all duration-300"
                textWrapperClassName="text-[13px] sm:text-sm font-medium"
                circleClassName="w-7 h-7 sm:w-8 sm:h-8 bg-navy"
                icon={<ArrowDown size={14} className="text-white" />}
                onClick={() => smoothScrollToElement(document.getElementById(CATEGORIAS[0].id))}
              />
            </div>
          </div>

          <nav aria-label="Categorias de soluções" className="sticky top-2 z-30 px-3 sm:px-6 lg:px-10">
            <ul className="max-w-[1360px] mx-auto flex gap-2 overflow-x-auto rounded-full bg-white/90 backdrop-blur-lg p-1.5 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.5)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {CATEGORIAS.map((c) => (
                <li key={c.id} className="shrink-0">
                  <a
                    href={`#${c.id}`}
                    onClick={(e) => irPara(e, c.id)}
                    className="flex min-h-[44px] items-center gap-2.5 rounded-full px-4 text-[13px] sm:text-sm font-medium text-navy hover:bg-navy hover:text-white transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-horizon-orange"
                  >
                    <span className="text-[11px] font-semibold text-horizon-orange tabular-nums">
                      {String(c.indice).padStart(2, "0")}
                    </span>
                    {c.titulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <main>
          {CATEGORIAS.map((categoria, idx) => {
            const itens = SOLUCOES.filter((s) => s.categoria === categoria.id);
            return (
              <section
                key={categoria.id}
                id={categoria.id}
                aria-labelledby={`${categoria.id}-titulo`}
                className="relative px-4 sm:px-6 lg:px-10 pt-10 sm:pt-14"
              >
                <div
                  className={`max-w-[1360px] mx-auto rounded-[28px] sm:rounded-[40px] bg-[#F5F5F5]/70 backdrop-blur-lg shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] px-5 sm:px-8 lg:px-12 py-12 sm:py-16 ${
                    idx % 2 === 1 ? "lg:ml-10" : "lg:mr-10"
                  }`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-6 lg:gap-12 items-end mb-10 sm:mb-12">
                    <div>
                      <SectionTag index={categoria.indice} total={CATEGORIAS.length} label="Categoria" variant="light" />
                      <h2
                        id={`${categoria.id}-titulo`}
                        className="mt-5 text-[clamp(1.75rem,5vw,3.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-navy"
                      >
                        {categoria.titulo}
                      </h2>
                    </div>
                    <p className="text-[15px] sm:text-base leading-relaxed text-gray-600 max-w-lg">
                      {categoria.chamada}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                    {itens.map((s) => (
                      <SolucaoCard key={s.slug} solucao={s} onOpen={abrir} />
                    ))}
                  </div>
                </div>
              </section>
            );
          })}

          <section
            aria-labelledby="institucional-titulo"
            className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28"
          >
            <h2
              id="institucional-titulo"
              className="text-[clamp(1.75rem,6vw,3.6rem)] font-medium leading-[1.08] tracking-[-0.03em] text-white mb-5 max-w-2xl"
            >
              Tecnologia começa com <span className="text-horizon-orange">entendimento.</span>
            </h2>
            <p className="text-[15px] sm:text-base leading-relaxed text-white/70 max-w-xl mb-10 sm:mb-14">
              Na Horizon, não desenvolvemos tecnologia apenas por desenvolver. Entendemos os desafios de cada operação, estruturamos processos e construímos soluções que ajudam empresas a trabalhar melhor e crescer.
            </p>
            <ol className="flex flex-col md:flex-row md:items-center gap-3 md:gap-2">
              {FLUXO_HORIZON.map((etapa, i) => (
                <li key={etapa} className="flex md:flex-1 items-center gap-2">
                  <span
                    className={`flex-1 rounded-full border px-5 py-3 text-center text-sm font-medium ${
                      i === FLUXO_HORIZON.length - 1
                        ? "border-horizon-orange bg-horizon-orange text-white"
                        : "border-white/15 bg-white/[0.05] text-white backdrop-blur-md"
                    }`}
                  >
                    {etapa}
                  </span>
                  {i < FLUXO_HORIZON.length - 1 && (
                    <ArrowRight size={16} aria-hidden="true" className="hidden md:block shrink-0 text-white/40" />
                  )}
                </li>
              ))}
            </ol>
          </section>

          <section id="contato" aria-labelledby="cta-titulo" className="relative px-4 sm:px-6 lg:px-10 pb-6">
            <div className="max-w-[1360px] mx-auto rounded-[28px] sm:rounded-[40px] bg-navy px-6 sm:px-12 py-14 sm:py-20 overflow-hidden relative">
              <div aria-hidden="true" className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-horizon-orange/20 blur-3xl pointer-events-none" />
              <h2
                id="cta-titulo"
                className="relative text-[clamp(1.75rem,5vw,3.2rem)] font-medium leading-[1.1] tracking-[-0.03em] text-white mb-5 max-w-2xl"
              >
                Vamos encontrar a solução certa para sua operação?
              </h2>
              <p className="relative text-[15px] sm:text-base leading-relaxed text-white/70 max-w-xl mb-8">
                Cada empresa possui desafios diferentes. Converse com a Horizon e descubra como podemos contribuir para o crescimento do seu negócio.
              </p>
              <div className="relative">
                <RollButton
                  label="Falar com a Horizon"
                  className="bg-horizon-orange hover:bg-[#e55f00] text-white pl-5 sm:pl-6 pr-2 py-2 shadow-[0_10px_28px_-8px_rgba(255,106,0,0.5)] hover:-translate-y-0.5 transition-all duration-300"
                  textWrapperClassName="text-[13px] sm:text-sm font-medium"
                  circleClassName="w-7 h-7 sm:w-8 sm:h-8 bg-white"
                  icon={<MessageCircle size={14} className="text-navy" />}
                  onClick={() => openWhatsapp("Olá! Vim pela página de soluções e quero conversar com a Horizon.")}
                />
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>

      {solucaoAberta && <SolucaoModal solucao={solucaoAberta} onClose={fechar} />}
    </>
  );
}
