import { useEffect, useState } from "react";
import { useDashboardPassword } from "../hooks/useDashboardPassword";
import PasswordGate from "./PasswordGate";
import DashboardNav from "./DashboardNav";

type Lead = {
  id: string;
  created_at: string;
  nome: string;
  telefone: string;
  empresa: string | null;
  email: string;
  mensagem: string;
};

export default function Dashboard() {
  const { password, setPassword, clearPassword } = useDashboardPassword();
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!password) return;

    setLoading(true);
    setError("");

    fetch("/api/leads", {
      headers: { "x-dashboard-password": password },
    })
      .then(async (res) => {
        if (res.status === 401) {
          clearPassword();
          throw new Error("Senha incorreta.");
        }
        if (!res.ok) throw new Error("Falha ao carregar leads.");
        return res.json();
      })
      .then((data) => setLeads(data.leads))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [password, clearPassword]);

  if (!password) {
    return (
      <PasswordGate
        title="Dashboard de leads"
        error={error}
        onSubmit={setPassword}
      />
    );
  }

  return (
    <div className="min-h-screen bg-navy px-5 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-medium text-white">
              Leads da landing page
            </h1>
            <DashboardNav active="leads" />
          </div>
          <button
            onClick={() => {
              clearPassword();
              setLeads(null);
            }}
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            Sair
          </button>
        </div>

        {loading && <p className="text-white/60 text-sm">Carregando...</p>}
        {error && <p className="text-red-400 text-sm">{error}</p>}

        {leads && (
          <div className="bg-white rounded-2xl overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="border-b border-gray-200 text-gray-500">
                <tr>
                  <th className="px-4 py-3 whitespace-nowrap">Data</th>
                  <th className="px-4 py-3 whitespace-nowrap">Nome</th>
                  <th className="px-4 py-3 whitespace-nowrap">Telefone</th>
                  <th className="px-4 py-3 whitespace-nowrap">Empresa</th>
                  <th className="px-4 py-3 whitespace-nowrap">E-mail</th>
                  <th className="px-4 py-3">Mensagem</th>
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-6 text-center text-gray-400">
                      Nenhum lead ainda.
                    </td>
                  </tr>
                )}
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-gray-100 last:border-0">
                    <td className="px-4 py-3 whitespace-nowrap text-gray-500">
                      {new Date(lead.created_at).toLocaleString("pt-BR")}
                    </td>
                    <td className="px-4 py-3 text-gray-900">{lead.nome}</td>
                    <td className="px-4 py-3 text-gray-900">{lead.telefone}</td>
                    <td className="px-4 py-3 text-gray-900">
                      {lead.empresa || "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-900">{lead.email}</td>
                    <td className="px-4 py-3 text-gray-900 max-w-xs">
                      {lead.mensagem}
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
