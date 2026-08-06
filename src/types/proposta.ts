export type PropostaEscopoItem = {
  titulo: string;
  descricao: string;
};

export type PropostaCronogramaItem = {
  periodo: string;
  titulo: string;
  descricao: string;
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
