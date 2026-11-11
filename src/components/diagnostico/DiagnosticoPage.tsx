import { useEffect, useRef, type ReactNode } from "react";
import horizonIcon from "../../assets/horizon-icon.png";
import type { Diagnostico } from "./data";
import "./diagnostico.css";

type Tag = "div" | "li" | "p";

function Reveal({
  children,
  as = "div",
  className = "",
}: {
  children: ReactNode;
  as?: Tag;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Component = as as "div";
  return (
    <Component
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`dg-reveal ${className}`}
    >
      {children}
    </Component>
  );
}

function Arc({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 118 C 300 10, 900 10, 1200 118"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export default function DiagnosticoPage({ d }: { d: Diagnostico }) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `Diagnóstico competitivo — ${d.empresa} | Horizon`;
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    const desc = document.querySelector('meta[name="description"]');
    const prevDesc = desc?.getAttribute("content");
    desc?.setAttribute(
      "content",
      "Análise preliminar de posicionamento, presença digital e competitividade, elaborada pela Horizon.",
    );
    return () => {
      document.title = prevTitle;
      meta.remove();
      if (desc && prevDesc != null) desc.setAttribute("content", prevDesc);
    };
  }, [d.empresa]);

  const lojas = Array.from(
    { length: d.lojasDesejadas },
    (_, i) => i < d.lojasAtuais,
  );

  const irParaProblema = (n: string) => {
    document
      .querySelectorAll(".dg-problem")
      [Number(n) - 1]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <main className="dg">
      {/* A. Capa */}
      <header className="dg-cover">
        <div className="dg-wrap">
          <div className="dg-cover-top">
            <span className="dg-brand">
              <img src={horizonIcon} alt="" width={40} height={30} />
              <span>HORIZON</span>
            </span>
            <span className="dg-tag">Análise executiva | {d.data}</span>
          </div>

          <div className="dg-cover-body">
            <p className="dg-eyebrow">Relatório confidencial</p>
            <h1 className="dg-title">
              Diagnóstico
              <br />
              competitivo
            </h1>
            <p className="dg-company">{d.empresa}</p>
            <p className="dg-sub">
              Análise preliminar de posicionamento, presença digital e
              competitividade.
            </p>
          </div>

          <div className="dg-cover-foot">
            <span>
              <strong>HORIZON</strong> — Estratégia, tecnologia e crescimento
              empresarial.
            </span>
            <button
              type="button"
              className="dg-print"
              onClick={() => window.print()}
            >
              Imprimir / salvar PDF
            </button>
          </div>
        </div>
        <Arc className="dg-cover-arc" />
      </header>

      {/* B. Contexto */}
      <section className="dg-section" aria-labelledby="dg-contexto">
        <div className="dg-wrap dg-split">
          <Reveal className="dg-side">
            <p className="dg-eyebrow">Contexto empresarial</p>
            <h2 id="dg-contexto" className="dg-h2">
              O cenário conhecido
            </h2>
          </Reveal>
          <div className="dg-main">
            <Reveal as="p" className="dg-lead">
              A empresa já possui uma estrutura comercial em funcionamento.
              Entretanto, sua presença competitiva precisa acompanhar a
              dimensão da ambição de crescimento.
            </Reveal>
            <ul className="dg-facts">
              {d.contexto.map((c, i) => (
                <Reveal
                  as="li"
                  key={c}
                  className={i === d.contexto.length - 1 ? "is-accent" : ""}
                >
                  {c}
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* C. Comparativo */}
      <section className="dg-section dg-tint" aria-labelledby="dg-comp">
        <div className="dg-wrap">
          <Reveal className="dg-head">
            <p className="dg-eyebrow">Comparativo competitivo</p>
            <h2 id="dg-comp" className="dg-h2">
              Duas formas de ocupar a mesma categoria
            </h2>
          </Reveal>

          <div className="dg-compare">
            <Reveal className="dg-col dg-col-a">
              <h3>{d.empresa}</h3>
              <ul>
                {d.empresaPontos.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="dg-col dg-col-b">
              <h3>{d.concorrente}</h3>
              <ul>
                {d.concorrentePontos.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal as="p" className="dg-pull">
            O objetivo não é reproduzir o concorrente. É compreender a
            diferença de posicionamento e reconhecer onde a Itamaracá está
            perdendo força competitiva.
          </Reveal>
          <p className="dg-note">
            Leitura qualitativa, baseada em análise comparativa de comunicação.
            Não foram usadas métricas, faturamento ou participação de mercado do
            concorrente.
          </p>
        </div>
      </section>

      {/* D. Problemas */}
      <section className="dg-section" aria-labelledby="dg-prob">
        <div className="dg-wrap">
          <Reveal className="dg-head">
            <p className="dg-eyebrow">Diagnóstico</p>
            <h2 id="dg-prob" className="dg-h2">
              Sete problemas estratégicos identificados
            </h2>
          </Reveal>

          <ol className="dg-problems">
            {d.problemas.map((p) => (
              <li key={p.n} className="dg-problem">
                <Reveal className="dg-num">
                  <span aria-hidden="true">{p.n}</span>
                </Reveal>
                <Reveal className="dg-pbody">
                  <h3>
                    <span className="dg-sr">Problema {Number(p.n)}: </span>
                    {p.titulo}
                  </h3>
                  {p.texto.map((t) => (
                    <p key={t}>{t}</p>
                  ))}
                  <div className="dg-conseq">
                    <span>Consequência empresarial</span>
                    <p>{p.consequencia}</p>
                  </div>
                  {p.nota && <p className="dg-pnote">{p.nota}</p>}
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* E. Risco de crescer */}
      <section className="dg-risk" aria-labelledby="dg-risk">
        <div className="dg-wrap">
          <Reveal>
            <p className="dg-eyebrow dg-eyebrow-light">
              O risco de crescer sem estrutura
            </p>
            <h2 id="dg-risk" className="dg-risk-title">
              Duas lojas são uma operação. Dez lojas exigem um modelo de
              gestão.
            </h2>
          </Reveal>

          <Reveal className="dg-stores">
            <div
              role="img"
              aria-label={`${d.lojasAtuais} lojas atuais, ${d.lojasDesejadas} lojas desejadas`}
            >
              <ul className="dg-store-row" aria-hidden="true">
                {lojas.map((on, i) => (
                  <li key={i} className={on ? "on" : ""}>
                    <svg viewBox="0 0 40 44">
                      <path
                        d="M2 18 L20 4 L38 18 V42 H2 Z M15 42 V28 H25 V42"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </li>
                ))}
              </ul>
            </div>
            <div className="dg-evo">
              <span>
                <b>{d.lojasAtuais}</b> lojas atuais
              </span>
              <i aria-hidden="true" />
              <span>
                <b>{d.lojasDesejadas}</b> lojas desejadas
              </span>
            </div>
          </Reveal>

          <Reveal as="p" className="dg-risk-text">
            A ambição de expansão exige mais do que abertura de novas
            unidades. Exige consistência de marca, gestão comercial, processos
            replicáveis, indicadores e capacidade operacional.
          </Reveal>
          <p className="dg-risk-note">
            Esta leitura não projeta resultados nem questiona a viabilidade da
            expansão: indica que a estrutura atual precisa ser compreendida
            antes de ser replicada.
          </p>
        </div>
      </section>

      {/* F. Síntese */}
      <section className="dg-section" aria-labelledby="dg-sint">
        <div className="dg-wrap">
          <Reveal className="dg-head">
            <p className="dg-eyebrow">Síntese executiva</p>
            <h2 id="dg-sint" className="dg-h2">
              Sete eixos, um mesmo ponto de partida
            </h2>
          </Reveal>

          <ul className="dg-axes">
            {d.eixos.map((e) => (
              <Reveal as="li" key={e.nome}>
                <span className="dg-axis-name">{e.nome}</span>
                <span className="dg-axis-refs">
                  {e.problemas.map((n) => (
                    <button
                      type="button"
                      key={n}
                      aria-label={`Ver problema ${Number(n)}`}
                      onClick={() => irParaProblema(n)}
                    >
                      {n}
                    </button>
                  ))}
                </span>
              </Reveal>
            ))}
          </ul>
          <p className="dg-note">
            Os números indicam os problemas que tocam cada eixo.
          </p>

          <Reveal as="p" className="dg-closing-text">
            A Distribuidora de Colchões Itamaracá já possui estrutura física e
            presença comercial. O desafio está em desenvolver uma posição
            competitiva compatível com sua ambição de crescimento.
          </Reveal>

          <Reveal as="p" className="dg-final">
            A empresa não precisa simplesmente aparecer mais. Precisa ser
            percebida como uma marca mais forte, confiável e preparada para
            competir.
          </Reveal>
        </div>
      </section>

      <footer className="dg-foot">
        <div className="dg-wrap">
          <img src={horizonIcon} alt="" width={48} height={36} />
          <div>
            <strong>HORIZON</strong>
            <span>Estratégia, tecnologia e crescimento empresarial.</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
