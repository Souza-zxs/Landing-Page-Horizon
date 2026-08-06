import { useEffect, useState } from "react";
import { Check, Copy, Plus } from "lucide-react";
import { useDashboardPassword } from "../hooks/useDashboardPassword";
import PasswordGate from "./PasswordGate";
import DashboardNav from "./DashboardNav";
import RollButton from "./RollButton";
import type { Proposta } from "../types/proposta";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const STATUS_LABELS: Record<string, string> = {
  rascunho: "Rascunho",
  enviada: "Enviada",
  aprovada: "Aprovada",
  recusada: "Recusada",
};

function CopyLinkButton({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      onClick={async () => {
        const url = `${window.location.origin}/proposta/${slug}`;
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="inline-flex items-center gap-1.5 rounded-full bg-navy/5 border border-navy/10 px-3 py-1.5 text-xs font-medium text-navy/70 hover:bg-navy/10 transition-colors"
    >
      {copied ? (
        <>
          <Check size={13} className="text-horizon-orange" />
          Copiado
        </>
      ) : (
        <>
          <Copy size={13} />
          Copiar link
        </>
      )}
    </button>
  );
}

export default function PropostasList() {
  const { password, setPassword, clearPassword } = useDashboardPassword();
  const [propostas, setPropostas] = useState<Proposta[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!password) return;

    setLoading(true);
    setError("");

    fetch("/api/propostas", {
      headers: { "x-dashboard-password": password },
    })
      .then(async (res) => {
        if (res.status === 401) {
          clearPassword();
          throw new Error("Senha incorreta.");
        }
        if (!res.ok) throw new Error("Falha ao carregar propostas.");
        return res.json();
      })
      .then((data) => setPropostas(data.propostas))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [password, clearPassword]);

  if (!password) {
    return (
      <PasswordGate
        title="Dashboard de propostas"
        error={error}
        onSubmit={setPassword}
      />
    );
  }

  return (
    <div className="min-h-screen bg-navy px-5 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-medium text-white">
              Propostas comerciais
            </h1>
            <DashboardNav active="propostas" />
          </div>
          <div className="flex items-center gap-5">
            <RollButton
              label="Nova proposta"
              onClick={() => {
                window.location.href = "/dashboard/propostas/nova";
              }}
              icon={<Plus size={16} />}
              className="bg-horizon-orange text-white pl-5 pr-1.5 py-1.5"
              circleClassName="w-8 h-8 bg-white/15"
            />
            <button
              onClick={() => {
                clearPassword();
                setPropostas(null);
              }}
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Sair
            </button>
          </div>
        </div>

        {loading && <p className="text-white/60 text-sm">Carregando...</p>}
        {error && <p className="text-red-400 text-sm">{error}</p>}

        {propostas && (
          <div className="bg-white rounded-2xl overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="border-b border-gray-200 text-gray-500">
                <tr>
                  <th className="px-4 py-3 whitespace-nowrap">Número</th>
                  <th className="px-4 py-3 whitespace-nowrap">Cliente</th>
                  <th className="px-4 py-3 whitespace-nowrap">Projeto</th>
                  <th className="px-4 py-3 whitespace-nowrap">Valor</th>
                  <th className="px-4 py-3 whitespace-nowrap">Status</th>
                  <th className="px-4 py-3 whitespace-nowrap">Data</th>
                  <th className="px-4 py-3 whitespace-nowrap">Link</th>
                </tr>
              </thead>
              <tbody>
                {propostas.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-6 text-center text-gray-400">
                      Nenhuma proposta ainda.
                    </td>
                  </tr>
                )}
                {propostas.map((proposta) => (
                  <tr key={proposta.id} className="border-b border-gray-100 last:border-0">
                    <td className="px-4 py-3 whitespace-nowrap text-gray-500 tabular-nums">
                      {proposta.numero}
                    </td>
                    <td className="px-4 py-3 text-gray-900">
                      {proposta.clienteNome}
                      {proposta.clienteEmpresa && (
                        <span className="text-gray-400"> · {proposta.clienteEmpresa}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-900 max-w-xs">
                      {proposta.tituloProjeto}
                    </td>
                    <td className="px-4 py-3 text-gray-900 whitespace-nowrap tabular-nums">
                      {currencyFormatter.format(proposta.investimentoValor)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="inline-flex items-center rounded-full bg-navy/5 border border-navy/10 px-2.5 py-1 text-xs font-medium text-navy/70">
                        {STATUS_LABELS[proposta.status] ?? proposta.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-500">
                      {new Date(proposta.createdAt).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <CopyLinkButton slug={proposta.slug} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
