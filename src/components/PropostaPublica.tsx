import { useEffect, useRef, useState } from "react";
import { CheckCircle2, MessageCircle } from "lucide-react";
import AmbientBackground from "./AmbientBackground";
import SectionTag from "./SectionTag";
import RollButton from "./RollButton";
import Footer from "./Footer";
import { ensureScrollTrigger, prefersReducedMotion } from "../lib/scrolltrigger";
import type { Proposta, PropostaEscopoItem } from "../types/proposta";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

// Distância de scroll (em vh) dedicada a cada passo enquanto a seção fica
// pinada — controla o "ritmo" do scroll-jack, não o layout em si.
const STEP_SCROLL_VH = 0.9;

function EscopoStepper({ items }: { items: PropostaEscopoItem[] }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [reduced] = useState(() => prefersReducedMotion());
  // Scroll-jack (pin longo) tende a ficar instável/frustrante em touch —
  // libera o efeito só a partir do breakpoint sm do Tailwind (640px),
  // reativo pra acompanhar rotação de tela em celulares maiores.
  const [isSmUp, setIsSmUp] = useState(() => window.matchMedia("(min-width: 640px)").matches);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 640px)");
    const handleChange = (e: MediaQueryListEvent) => setIsSmUp(e.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  const showFallback = reduced || !isSmUp || items.length <= 1;

  useEffect(() => {
    if (showFallback || !panelRef.current) return;

    const ScrollTrigger = ensureScrollTrigger();
    const trigger = ScrollTrigger.create({
      trigger: panelRef.current,
      start: "top top",
      end: () => `+=${(items.length - 1) * window.innerHeight * STEP_SCROLL_VH}`,
      pin: true,
      onUpdate: (self) => {
        const idx = Math.min(items.length - 1, Math.floor(self.progress * items.length));
        setActiveStep(idx);
      },
    });

    const handleOrientationChange = () => ScrollTrigger.refresh();
    window.addEventListener("orientationchange", handleOrientationChange);

    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
      trigger.kill();
    };
  }, [showFallback, items.length]);

  if (showFallback) {
    return (
      <div className="mt-6 flex flex-col gap-6 sm:gap-8">
        {items.map((item, i) => (
          <div
            key={`${item.titulo}-${i}`}
            className="glass-card rounded-3xl p-7 sm:p-10 flex gap-5 sm:gap-6"
          >
            <span className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-horizon-orange text-white flex items-center justify-center text-base sm:text-lg font-semibold shadow-[0_6px_16px_-4px_rgba(255,106,0,0.6)]">
              {i + 1}
            </span>
            <div>
              <p className="text-lg sm:text-xl font-semibold text-navy tracking-tight mb-2.5">
                {item.titulo}
              </p>
              {item.descricao && (
                <p className="text-sm sm:text-[15px] leading-relaxed text-gray-600">
                  {item.descricao}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={panelRef}
      className="mt-6 relative glass-card rounded-3xl overflow-hidden h-[72vh] sm:h-[75vh] px-6 sm:px-14"
    >
      {items.map((item, i) => (
        <div
          key={`${item.titulo}-${i}`}
          className={`absolute inset-0 flex items-center px-6 sm:px-14 transition-opacity duration-500 ${
            i === activeStep ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex items-start gap-6 sm:gap-10">
            <span className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-horizon-orange text-white flex items-center justify-center text-2xl sm:text-3xl font-semibold shadow-[0_10px_28px_-6px_rgba(255,106,0,0.55)] tabular-nums">
              {i + 1}
            </span>
            <div>
              <p className="text-xl sm:text-3xl font-semibold text-navy tracking-tight mb-3">
                {item.titulo}
              </p>
              {item.descricao && (
                <p className="text-sm sm:text-base leading-relaxed text-gray-600 max-w-xl">
                  {item.descricao}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}

      <div className="absolute left-6 sm:left-14 bottom-8 sm:bottom-10 flex items-center gap-2">
        {items.map((_, i) => (
          <span
            key={i}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === activeStep ? "w-8 bg-horizon-orange" : "w-4 bg-navy/15"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

type PropostaPublicaProps = {
  slug: string;
};

export default function PropostaPublica({ slug }: PropostaPublicaProps) {
  const [proposta, setProposta] = useState<Proposta | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);

    fetch(`/api/proposta?slug=${encodeURIComponent(slug)}`)
      .then(async (res) => {
        if (res.status === 404) {
          setNotFound(true);
          return null;
        }
        if (!res.ok) throw new Error("Falha ao carregar proposta.");
        return res.json();
      })
      .then((data) => {
        if (data) setProposta(data.proposta);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <>
        <AmbientBackground />
        <div className="relative z-10 min-h-screen flex items-center justify-center px-5">
          <p className="text-white/60 text-sm">Carregando proposta...</p>
        </div>
      </>
    );
  }

  if (notFound || !proposta) {
    return (
      <>
        <AmbientBackground />
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-5 text-center">
          <img
            src="/horizon-icon.png"
            alt="Horizon"
            className="w-14 h-14 object-contain mb-6 opacity-80"
          />
          <h1 className="text-xl sm:text-2xl font-medium text-white mb-2">
            Proposta não encontrada
          </h1>
          <p className="text-sm text-white/60 max-w-sm">
            O link pode ter expirado ou estar incorreto. Fale com a Horizon
            pra receber um novo.
          </p>
        </div>
      </>
    );
  }

  const validadeData = new Date(proposta.createdAt);
  validadeData.setDate(validadeData.getDate() + proposta.validadeDias);

  const whatsappUrl = `https://wa.me/5583987999393?text=${encodeURIComponent(
    `Olá! Vim pela proposta ${proposta.numero} (${proposta.tituloProjeto}).`,
  )}`;

  return (
    <>
      <AmbientBackground />
      <div className="relative z-10">
        <div className="max-w-[900px] mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-8">
          <div className="flex items-center gap-2.5 mb-8 sm:mb-10">
            <img
              src="/horizon-icon.png"
              alt="Horizon"
              className="w-8 h-8 object-contain"
            />
            <span className="text-base font-semibold text-white">Horizon</span>
          </div>

          <p className="text-[13px] sm:text-sm text-white/60 tracking-wide mb-3">
            Proposta comercial para
          </p>
          <h1 className="text-[clamp(1.75rem,5vw,3rem)] font-medium leading-[1.1] tracking-[-0.03em] text-white mb-6">
            {proposta.clienteNome}
            {proposta.clienteEmpresa && (
              <span className="text-white/50"> · {proposta.clienteEmpresa}</span>
            )}
          </h1>

          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md px-3.5 py-1.5 text-xs font-medium text-white/70 tabular-nums">
              {proposta.numero}
            </span>
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md px-3.5 py-1.5 text-xs font-medium text-white/70">
              Válida até {validadeData.toLocaleDateString("pt-BR")}
            </span>
          </div>
        </div>

        <div className="px-4 sm:px-6 lg:px-10 pb-4 sm:pb-6">
          <div className="max-w-[900px] mx-auto rounded-[28px] sm:rounded-[40px] bg-white/70 backdrop-blur-lg shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] overflow-hidden px-5 sm:px-10 lg:px-14 py-12 sm:py-16">
            <section>
              <SectionTag index={1} total={6} label="Contexto" variant="light" />
              <p className="mt-5 text-[15px] sm:text-base leading-relaxed text-gray-700 whitespace-pre-line">
                {proposta.contexto}
              </p>
            </section>
          </div>
        </div>

        {/* Fora do card branco (que tem backdrop-blur + overflow-hidden): esse
            ancestral criaria um containing block pro pin position:fixed do
            GSAP e cortaria/prenderia o painel pinado dentro do card. */}
        <div className="px-4 sm:px-6 lg:px-10 pb-4 sm:pb-6">
          <div className="max-w-[900px] mx-auto">
            <SectionTag index={2} total={6} label="Escopo do projeto" variant="dark" />
            <EscopoStepper items={proposta.escopo} />
          </div>
        </div>

        <div className="px-4 sm:px-6 lg:px-10 pb-8 sm:pb-10">
          <div className="max-w-[900px] mx-auto rounded-[28px] sm:rounded-[40px] bg-white/70 backdrop-blur-lg shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] overflow-hidden px-5 sm:px-10 lg:px-14 py-12 sm:py-16 flex flex-col gap-12 sm:gap-16">
            {proposta.stack.length > 0 && (
              <section>
                <SectionTag index={3} total={6} label="Stack técnica" variant="light" />
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {proposta.stack.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center rounded-full border border-navy/10 bg-navy/[0.03] px-3.5 py-2 text-[13px] font-medium text-navy/80"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {proposta.entregaveis.length > 0 && (
              <section>
                <SectionTag index={4} total={6} label="Entregáveis" variant="light" />
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {proposta.entregaveis.map((item) => (
                    <div key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 size={17} className="text-horizon-orange shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {proposta.cronograma.length > 0 && (
              <section>
                <SectionTag index={5} total={6} label="Cronograma" variant="light" />
                <div className="mt-5 flex flex-col gap-3">
                  {proposta.cronograma.map((item, i) => (
                    <div
                      key={`${item.periodo}-${i}`}
                      className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-4 rounded-xl border border-navy/10 bg-navy/[0.02] px-4 sm:px-5 py-3.5"
                    >
                      <span className="shrink-0 sm:w-32 text-[11px] font-semibold uppercase tracking-[0.1em] text-horizon-orange">
                        {item.periodo}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-navy">{item.titulo}</p>
                        {item.descricao && (
                          <p className="text-[13px] leading-relaxed text-gray-600 mt-0.5">
                            {item.descricao}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section>
              <SectionTag index={6} total={6} label="Investimento" variant="light" />
              <div className="mt-6 relative overflow-hidden rounded-3xl bg-navy px-6 sm:px-10 py-8 sm:py-10">
                <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-horizon-orange/10 blur-3xl pointer-events-none" />
                <p className="relative text-xs font-medium uppercase tracking-[0.14em] text-white/50 mb-2">
                  Investimento total
                </p>
                <p className="relative text-[clamp(2rem,6vw,3.2rem)] font-semibold tracking-[-0.02em] text-horizon-orange mb-4">
                  {currencyFormatter.format(proposta.investimentoValor)}
                </p>
                <div className="relative flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/70">
                  {proposta.investimentoEntrada !== null && (
                    <span>
                      Entrada:{" "}
                      <span className="text-white font-medium">
                        {currencyFormatter.format(proposta.investimentoEntrada)}
                      </span>
                    </span>
                  )}
                  {proposta.investimentoSaldo !== null && (
                    <span>
                      Saldo:{" "}
                      <span className="text-white font-medium">
                        {currencyFormatter.format(proposta.investimentoSaldo)}
                      </span>
                    </span>
                  )}
                  <span>
                    Prazo:{" "}
                    <span className="text-white font-medium">
                      {proposta.investimentoPrazo}
                    </span>
                  </span>
                </div>
                {proposta.investimentoNota && (
                  <p className="relative text-[13px] leading-relaxed text-white/50 mt-5 max-w-lg">
                    {proposta.investimentoNota}
                  </p>
                )}
              </div>
            </section>

            {proposta.foraEscopo && (
              <section>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-navy/40 mb-3">
                  Fora do escopo
                </p>
                <p className="text-sm leading-relaxed text-gray-600 whitespace-pre-line">
                  {proposta.foraEscopo}
                </p>
              </section>
            )}

            <div className="flex justify-center pt-2">
              <RollButton
                label="Falar com a Horizon"
                onClick={() => window.open(whatsappUrl, "_blank")}
                className="bg-horizon-orange hover:bg-[#e55f00] text-white pl-5 sm:pl-6 pr-2 py-2 shadow-[0_10px_28px_-8px_rgba(255,106,0,0.5)] hover:shadow-[0_14px_34px_-8px_rgba(255,106,0,0.6)] hover:-translate-y-0.5 transition-all duration-300"
                textWrapperClassName="text-[13px] sm:text-sm font-medium"
                circleClassName="w-7 h-7 sm:w-8 sm:h-8 bg-white"
                icon={<MessageCircle size={14} className="text-navy" />}
              />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
