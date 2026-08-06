/// <reference types="node" />

export type PropostaEscopoItem = {
  titulo: string;
  descricao: string;
};

export type PropostaCronogramaItem = {
  periodo: string;
  titulo: string;
  descricao: string;
};

export type PropostaRow = {
  id: string;
  created_at: string;
  updated_at: string;
  slug: string;
  numero: string;
  status: string;
  cliente_nome: string;
  cliente_empresa: string | null;
  titulo_projeto: string;
  resumo: string;
  validade_dias: number;
  contexto: string;
  escopo: PropostaEscopoItem[];
  stack: string[];
  entregaveis: string[];
  cronograma: PropostaCronogramaItem[];
  investimento_valor: number;
  investimento_entrada: number | null;
  investimento_saldo: number | null;
  investimento_prazo: string;
  investimento_nota: string | null;
  fora_escopo: string | null;
  contato_nome: string | null;
  contato_email: string | null;
  contato_telefone: string | null;
};

export type Proposta = {
  id: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  numero: string;
  status: string;
  clienteNome: string;
  clienteEmpresa: string | null;
  tituloProjeto: string;
  resumo: string;
  validadeDias: number;
  contexto: string;
  escopo: PropostaEscopoItem[];
  stack: string[];
  entregaveis: string[];
  cronograma: PropostaCronogramaItem[];
  investimentoValor: number;
  investimentoEntrada: number | null;
  investimentoSaldo: number | null;
  investimentoPrazo: string;
  investimentoNota: string | null;
  foraEscopo: string | null;
  contatoNome: string | null;
  contatoEmail: string | null;
  contatoTelefone: string | null;
};

export function toProposta(row: PropostaRow): Proposta {
  return {
    id: row.id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    slug: row.slug,
    numero: row.numero,
    status: row.status,
    clienteNome: row.cliente_nome,
    clienteEmpresa: row.cliente_empresa,
    tituloProjeto: row.titulo_projeto,
    resumo: row.resumo,
    validadeDias: row.validade_dias,
    contexto: row.contexto,
    escopo: row.escopo ?? [],
    stack: row.stack ?? [],
    entregaveis: row.entregaveis ?? [],
    cronograma: row.cronograma ?? [],
    investimentoValor: row.investimento_valor,
    investimentoEntrada: row.investimento_entrada,
    investimentoSaldo: row.investimento_saldo,
    investimentoPrazo: row.investimento_prazo,
    investimentoNota: row.investimento_nota,
    foraEscopo: row.fora_escopo,
    contatoNome: row.contato_nome,
    contatoEmail: row.contato_email,
    contatoTelefone: row.contato_telefone,
  };
}

export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(new RegExp("[\\u0300-\\u036f]", "g"), "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}
