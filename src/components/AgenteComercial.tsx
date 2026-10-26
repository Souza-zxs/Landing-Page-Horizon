import { useState } from "react";
import { Sparkles } from "lucide-react";
import type { AnaliseComercial } from "../types/analiseComercial";

type AgenteComercialProps = {
  onApply: (analise: AnaliseComercial) => void;
};

function Lista({ titulo, itens }: { titulo: string; itens?: string[] }) {
  const validos = (itens ?? []).filter((i) => i && i.trim() !== "");
  if (validos.length === 0) return null;
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
        {titulo}
      </p>
      <ul className="flex flex-col gap-1 text-sm text-gray-700 list-disc pl-4 marker:text-horizon-orange">
        {validos.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function AgenteComercial({ onApply }: AgenteComercialProps) {
  const [aberto, setAberto] = useState(false);
  const [texto, setTexto] = useState("");
  const [error, setError] = useState("");
  const [analise, setAnalise] = useState<AnaliseComercial | null>(null);
  const [aplicada, setAplicada] = useState(false);

  function carregar() {
    setError("");
    setAnalise(null);
    setAplicada(false);
    try {
      const start = texto.indexOf("{");
      const end = texto.lastIndexOf("}");
      if (start === -1 || end <= start) throw new Error("sem JSON");
      setAnalise(JSON.parse(texto.slice(start, end + 1)) as AnaliseComercial);
    } catch {
      setError("JSON inválido. Cole exatamente o JSON gerado pelo agente comercial.");
    }
  }

  const rec = analise?.recommendation;
  const com = analise?.commercial;
  const dx = analise?.diagnosis;

  return (
    <section className="rounded-3xl border border-horizon-orange/30 bg-white/[0.04] p-5 sm:p-6 mb-6">
      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        aria-expanded={aberto}
        className="w-full min-h-[44px] flex items-center gap-3 text-left"
      >
        <span className="w-9 h-9 shrink-0 rounded-full bg-horizon-orange flex items-center justify-center">
          <Sparkles size={16} className="text-white" />
        </span>
        <span className="flex-1">
          <span className="block text-sm font-medium text-white">
            Importar análise da reunião
          </span>
          <span className="block text-xs text-white/60">
            Cole o JSON gerado pelo agente comercial e revise a proposta antes de criar.
          </span>
        </span>
        <span className="text-xs text-white/60">{aberto ? "Fechar" : "Abrir"}</span>
      </button>

      {aberto && (
        <div className="mt-5 flex flex-col gap-4">
          <textarea
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            rows={9}
            placeholder='Cole aqui o JSON da proposta ({ "client": ..., "proposal": ... })'
            aria-label="JSON da análise comercial"
            className="w-full rounded-lg border border-white/15 bg-white px-4 py-3 font-mono text-xs text-gray-900 placeholder:text-gray-400 caret-navy outline-none focus:border-horizon-orange focus:ring-2 focus:ring-horizon-orange/25 resize-y"
          />

          <div>
            <button
              type="button"
              onClick={carregar}
              disabled={texto.trim().length < 2}
              className="min-h-[44px] rounded-lg bg-horizon-orange px-5 text-sm font-medium text-white hover:bg-[#e55f00] transition-colors disabled:opacity-50"
            >
              Ler análise
            </button>
          </div>

          {error && (
            <p className="text-sm font-medium text-red-300" role="alert">
              {error}
            </p>
          )}

          {analise && (
            <div className="rounded-2xl bg-[#F5F5F5] p-5 flex flex-col gap-5">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1">
                  Produto recomendado
                </p>
                <p className="text-base font-semibold text-navy">
                  {rec?.primary_product || "não informado"}
                </p>
                {(rec?.complementary_products?.length ?? 0) > 0 && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    + {rec?.complementary_products?.join(", ")}
                  </p>
                )}
                {rec?.reason && <p className="text-sm text-gray-700 mt-2">{rec.reason}</p>}
              </div>

              {dx?.main_problem && (
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    Dor principal
                  </p>
                  <p className="text-sm text-gray-700">{dx.main_problem}</p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Lista titulo="Evidências da call" itens={dx?.evidence} />
                <Lista titulo="Hipóteses (não confirmadas)" itens={dx?.hypotheses} />
                <Lista titulo="Informações faltando" itens={com?.missing_information} />
                <Lista titulo="Possíveis objeções" itens={com?.objections} />
              </div>

              {analise.investment?.implementation == null && (
                <p className="text-sm font-semibold text-red-600">
                  REVISÃO NECESSÁRIA: o preço não pôde ser determinado com segurança.
                </p>
              )}

              <div className="flex items-center gap-4 flex-wrap border-t border-gray-200 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    onApply(analise);
                    setAplicada(true);
                  }}
                  className="min-h-[44px] rounded-lg bg-navy px-5 text-sm font-medium text-white hover:bg-navy/90 transition-colors"
                >
                  Preencher formulário
                </button>
                {typeof com?.confidence === "number" && (
                  <span className="text-xs text-gray-500">
                    Confiança do agente: {Math.round(com.confidence)}%
                  </span>
                )}
                {aplicada && (
                  <span className="text-xs font-medium text-green-700" role="status">
                    Formulário preenchido. Revise tudo antes de criar a proposta.
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
