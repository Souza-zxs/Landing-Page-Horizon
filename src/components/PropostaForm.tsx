import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { ArrowRight, Check, Copy, Plus, Trash2 } from "lucide-react";
import { useDashboardPassword } from "../hooks/useDashboardPassword";
import PasswordGate from "./PasswordGate";
import DashboardNav from "./DashboardNav";
import RollButton from "./RollButton";
import SectionTag from "./SectionTag";

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 caret-navy outline-none focus:border-horizon-orange focus:ring-2 focus:ring-horizon-orange/25 transition-all";

const labelClass = "text-xs font-medium text-gray-500 mb-1.5 block";

type EscopoRow = { key: string; titulo: string; descricao: string };
type CronogramaRow = { key: string; periodo: string; titulo: string; descricao: string };

function newKey() {
  return crypto.randomUUID();
}

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(new RegExp("[\\u0300-\\u036f]", "g"), "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export default function PropostaForm() {
  const { password, setPassword, clearPassword } = useDashboardPassword();

  const [clienteNome, setClienteNome] = useState("");
  const [clienteEmpresa, setClienteEmpresa] = useState("");
  const [tituloProjeto, setTituloProjeto] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [resumo, setResumo] = useState("");
  const [contexto, setContexto] = useState("");
  const [validadeDias, setValidadeDias] = useState("7");

  const [escopo, setEscopo] = useState<EscopoRow[]>([
    { key: newKey(), titulo: "", descricao: "" },
  ]);
  const [cronograma, setCronograma] = useState<CronogramaRow[]>([
    { key: newKey(), periodo: "", titulo: "", descricao: "" },
  ]);

  const [stackText, setStackText] = useState("");
  const [entregaveisText, setEntregaveisText] = useState("");

  const [investimentoValor, setInvestimentoValor] = useState("");
  const [investimentoEntrada, setInvestimentoEntrada] = useState("");
  const [investimentoSaldo, setInvestimentoSaldo] = useState("");
  const [investimentoPrazo, setInvestimentoPrazo] = useState("");
  const [investimentoNota, setInvestimentoNota] = useState("");
  const [foraEscopo, setForaEscopo] = useState("");

  const [contatoNome, setContatoNome] = useState("");
  const [contatoEmail, setContatoEmail] = useState("");
  const [contatoTelefone, setContatoTelefone] = useState("");

  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState("");
  const [createdSlug, setCreatedSlug] = useState<string | null>(null);

  useEffect(() => {
    if (slugTouched) return;
    setSlug(slugify(`${clienteNome} ${tituloProjeto}`));
  }, [clienteNome, tituloProjeto, slugTouched]);

  if (!password) {
    return (
      <PasswordGate
        title="Dashboard de propostas"
        onSubmit={setPassword}
      />
    );
  }

  if (createdSlug) {
    const url = `${window.location.origin}/proposta/${createdSlug}`;
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center px-5">
        <div className="glass-card rounded-3xl p-8 sm:p-10 w-full max-w-lg text-center">
          <div className="w-12 h-12 mx-auto rounded-full bg-horizon-orange flex items-center justify-center mb-5">
            <Check size={22} className="text-white" />
          </div>
          <h1 className="text-xl font-semibold text-navy mb-2">
            Proposta criada!
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            Envie este link para o cliente acompanhar a proposta.
          </p>
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 mb-6">
            <span className="flex-1 text-sm text-gray-700 truncate text-left">
              {url}
            </span>
            <button
              onClick={() => navigator.clipboard.writeText(url)}
              className="shrink-0 text-navy/60 hover:text-horizon-orange transition-colors"
              aria-label="Copiar link"
            >
              <Copy size={16} />
            </button>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/dashboard/propostas"
              className="rounded-lg bg-horizon-orange text-white py-3 px-5 text-sm font-medium hover:bg-[#e55f00] transition-colors"
            >
              Ver todas as propostas
            </a>
            <a
              href="/dashboard/propostas/nova"
              className="rounded-lg border border-gray-200 text-gray-700 py-3 px-5 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Criar outra proposta
            </a>
          </div>
        </div>
      </div>
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    const validEscopo = escopo
      .map((row) => ({ titulo: row.titulo.trim(), descricao: row.descricao.trim() }))
      .filter((row) => row.titulo !== "");

    if (!clienteNome.trim() || !tituloProjeto.trim() || !resumo.trim() || !contexto.trim()) {
      setError("Preencha os campos obrigatórios de cliente e projeto.");
      return;
    }
    if (validEscopo.length === 0) {
      setError("Adicione ao menos um item de escopo.");
      return;
    }
    if (!investimentoValor.trim() || !investimentoPrazo.trim()) {
      setError("Preencha o valor e o prazo do investimento.");
      return;
    }

    const validCronograma = cronograma
      .map((row) => ({
        periodo: row.periodo.trim(),
        titulo: row.titulo.trim(),
        descricao: row.descricao.trim(),
      }))
      .filter((row) => row.periodo !== "" || row.titulo !== "");

    const body = {
      clienteNome: clienteNome.trim(),
      clienteEmpresa: clienteEmpresa.trim() || undefined,
      tituloProjeto: tituloProjeto.trim(),
      slug: slug.trim() || undefined,
      resumo: resumo.trim(),
      contexto: contexto.trim(),
      validadeDias: Number(validadeDias) || 7,
      escopo: validEscopo,
      stack: stackText.split("\n").map((s) => s.trim()).filter(Boolean),
      entregaveis: entregaveisText.split("\n").map((s) => s.trim()).filter(Boolean),
      cronograma: validCronograma,
      investimentoValor: Number(investimentoValor),
      investimentoEntrada: investimentoEntrada.trim() ? Number(investimentoEntrada) : undefined,
      investimentoSaldo: investimentoSaldo.trim() ? Number(investimentoSaldo) : undefined,
      investimentoPrazo: investimentoPrazo.trim(),
      investimentoNota: investimentoNota.trim() || undefined,
      foraEscopo: foraEscopo.trim() || undefined,
      contatoNome: contatoNome.trim() || undefined,
      contatoEmail: contatoEmail.trim() || undefined,
      contatoTelefone: contatoTelefone.trim() || undefined,
    };

    setStatus("submitting");

    try {
      const res = await fetch("/api/propostas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-dashboard-password": password,
        },
        body: JSON.stringify(body),
      });

      if (res.status === 401) {
        clearPassword();
        throw new Error("Senha incorreta.");
      }
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Não foi possível criar a proposta.");
      }

      const data = await res.json();
      setCreatedSlug(data.proposta.slug);
      setStatus("idle");
    } catch (err) {
      setError((err as Error).message);
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-navy px-5 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-medium text-white">Nova proposta</h1>
            <DashboardNav active="propostas" />
          </div>
          <a
            href="/dashboard/propostas"
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            Cancelar
          </a>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#F5F5F5] rounded-3xl p-6 sm:p-8 flex flex-col gap-8"
        >
          <div>
            <SectionTag index={1} total={6} label="Cliente & projeto" variant="light" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className={labelClass}>Nome do cliente *</label>
                <input
                  className={inputClass}
                  value={clienteNome}
                  onChange={(e) => setClienteNome(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Empresa</label>
                <input
                  className={inputClass}
                  value={clienteEmpresa}
                  onChange={(e) => setClienteEmpresa(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4">
              <label className={labelClass}>Título do projeto *</label>
              <input
                className={inputClass}
                value={tituloProjeto}
                onChange={(e) => setTituloProjeto(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label className={labelClass}>Identificador da URL</label>
              <input
                className={inputClass}
                value={slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""));
                }}
                placeholder="identificador-da-proposta"
              />
              <p className="text-xs text-gray-400 mt-1.5">
                /proposta/{slug || "identificador-da-proposta"}
              </p>
            </div>
            <div className="mt-4">
              <label className={labelClass}>Resumo *</label>
              <textarea
                className={`${inputClass} resize-none`}
                rows={2}
                value={resumo}
                onChange={(e) => setResumo(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label className={labelClass}>Contexto *</label>
              <textarea
                className={`${inputClass} resize-none`}
                rows={4}
                value={contexto}
                onChange={(e) => setContexto(e.target.value)}
                required
              />
            </div>
            <div className="mt-4 max-w-[160px]">
              <label className={labelClass}>Validade (dias)</label>
              <input
                type="number"
                min={1}
                className={inputClass}
                value={validadeDias}
                onChange={(e) => setValidadeDias(e.target.value)}
              />
            </div>
          </div>

          <div>
            <SectionTag index={2} total={6} label="Escopo do projeto" variant="light" />
            <div className="flex flex-col gap-3 mt-4">
              {escopo.map((row, i) => (
                <div key={row.key} className="flex gap-2 items-start">
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-2">
                    <input
                      className={inputClass}
                      placeholder="Título"
                      value={row.titulo}
                      onChange={(e) => {
                        const next = [...escopo];
                        next[i] = { ...next[i], titulo: e.target.value };
                        setEscopo(next);
                      }}
                    />
                    <input
                      className={inputClass}
                      placeholder="Descrição"
                      value={row.descricao}
                      onChange={(e) => {
                        const next = [...escopo];
                        next[i] = { ...next[i], descricao: e.target.value };
                        setEscopo(next);
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setEscopo(escopo.filter((_, idx) => idx !== i))}
                    disabled={escopo.length === 1}
                    className="shrink-0 h-[46px] w-[46px] flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-red-600 hover:border-red-200 transition-colors disabled:opacity-40 disabled:hover:text-gray-400 disabled:hover:border-gray-200"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setEscopo([...escopo, { key: newKey(), titulo: "", descricao: "" }])}
                className="inline-flex items-center gap-1.5 self-start text-sm font-medium text-horizon-orange hover:text-[#e55f00] transition-colors"
              >
                <Plus size={15} />
                Adicionar item
              </button>
            </div>
          </div>

          <div>
            <SectionTag index={3} total={6} label="Stack & entregáveis" variant="light" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className={labelClass}>Stack técnica (um item por linha)</label>
                <textarea
                  className={`${inputClass} resize-none`}
                  rows={4}
                  value={stackText}
                  onChange={(e) => setStackText(e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Entregáveis (um item por linha)</label>
                <textarea
                  className={`${inputClass} resize-none`}
                  rows={4}
                  value={entregaveisText}
                  onChange={(e) => setEntregaveisText(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <SectionTag index={4} total={6} label="Cronograma" variant="light" />
            <div className="flex flex-col gap-3 mt-4">
              {cronograma.map((row, i) => (
                <div key={row.key} className="flex gap-2 items-start">
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-[0.6fr_0.8fr_1.6fr] gap-2">
                    <input
                      className={inputClass}
                      placeholder="Período (ex: Semana 1)"
                      value={row.periodo}
                      onChange={(e) => {
                        const next = [...cronograma];
                        next[i] = { ...next[i], periodo: e.target.value };
                        setCronograma(next);
                      }}
                    />
                    <input
                      className={inputClass}
                      placeholder="Título"
                      value={row.titulo}
                      onChange={(e) => {
                        const next = [...cronograma];
                        next[i] = { ...next[i], titulo: e.target.value };
                        setCronograma(next);
                      }}
                    />
                    <input
                      className={inputClass}
                      placeholder="Descrição"
                      value={row.descricao}
                      onChange={(e) => {
                        const next = [...cronograma];
                        next[i] = { ...next[i], descricao: e.target.value };
                        setCronograma(next);
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setCronograma(cronograma.filter((_, idx) => idx !== i))}
                    className="shrink-0 h-[46px] w-[46px] flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-red-600 hover:border-red-200 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setCronograma([...cronograma, { key: newKey(), periodo: "", titulo: "", descricao: "" }])
                }
                className="inline-flex items-center gap-1.5 self-start text-sm font-medium text-horizon-orange hover:text-[#e55f00] transition-colors"
              >
                <Plus size={15} />
                Adicionar etapa
              </button>
            </div>
          </div>

          <div>
            <SectionTag index={5} total={6} label="Investimento" variant="light" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div>
                <label className={labelClass}>Valor total (R$) *</label>
                <input
                  type="number"
                  step="0.01"
                  min={0}
                  className={inputClass}
                  value={investimentoValor}
                  onChange={(e) => setInvestimentoValor(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Entrada (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  min={0}
                  className={inputClass}
                  value={investimentoEntrada}
                  onChange={(e) => setInvestimentoEntrada(e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Saldo (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  min={0}
                  className={inputClass}
                  value={investimentoSaldo}
                  onChange={(e) => setInvestimentoSaldo(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4">
              <label className={labelClass}>Prazo de investimento *</label>
              <input
                className={inputClass}
                placeholder="ex: entrada + saldo na entrega"
                value={investimentoPrazo}
                onChange={(e) => setInvestimentoPrazo(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label className={labelClass}>Nota sobre o investimento</label>
              <textarea
                className={`${inputClass} resize-none`}
                rows={2}
                value={investimentoNota}
                onChange={(e) => setInvestimentoNota(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label className={labelClass}>Fora do escopo</label>
              <textarea
                className={`${inputClass} resize-none`}
                rows={2}
                value={foraEscopo}
                onChange={(e) => setForaEscopo(e.target.value)}
              />
            </div>
          </div>

          <div>
            <SectionTag index={6} total={6} label="Contato do cliente" variant="light" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div>
                <label className={labelClass}>Nome</label>
                <input
                  className={inputClass}
                  value={contatoNome}
                  onChange={(e) => setContatoNome(e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>E-mail</label>
                <input
                  type="email"
                  className={inputClass}
                  value={contatoEmail}
                  onChange={(e) => setContatoEmail(e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Telefone</label>
                <input
                  className={inputClass}
                  value={contatoTelefone}
                  onChange={(e) => setContatoTelefone(e.target.value)}
                />
              </div>
            </div>
          </div>

          {error && <p className="text-sm font-medium text-red-600">{error}</p>}

          <RollButton
            type="submit"
            disabled={status === "submitting"}
            label={status === "submitting" ? "Criando..." : "Criar proposta"}
            className="self-start bg-horizon-orange hover:bg-[#e55f00] text-white pl-5 sm:pl-6 pr-2 py-2 shadow-[0_10px_28px_-8px_rgba(255,106,0,0.5)] hover:shadow-[0_14px_34px_-8px_rgba(255,106,0,0.6)] hover:-translate-y-0.5 transition-all duration-300"
            textWrapperClassName="text-[13px] sm:text-sm font-medium"
            circleClassName="w-7 h-7 sm:w-8 sm:h-8 bg-white"
            icon={<ArrowRight size={14} className="text-navy" />}
          />
        </form>
      </div>
    </div>
  );
}
