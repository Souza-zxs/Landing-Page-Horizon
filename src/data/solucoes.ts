import {
  ChartColumn,
  FileText,
  Handshake,
  LayoutDashboard,
  MessageCircle,
  MessagesSquare,
  PhoneCall,
  Radar,
  Stethoscope,
  Users,
  type LucideIcon,
} from "lucide-react";

/**
 * Catálogo da rota /solucoes.
 *
 * Para adicionar um produto: inclua um item em SOLUCOES com `categoria`
 * apontando para um id de CATEGORIAS. Para adicionar uma categoria: inclua em
 * CATEGORIAS. A página, a navegação e o modal se montam a partir daqui.
 *
 * Regra de conteúdo: só descrever o que está documentado. Sem preços, sem
 * métricas, sem clientes e sem afirmar que algo está em produção.
 */

export type CategoriaId = "inteligencia-comercial" | "atendimento-conversao" | "operacao-gestao";

export type Categoria = {
  id: CategoriaId;
  indice: number;
  titulo: string;
  chamada: string;
};

export type Solucao = {
  slug: string;
  categoria: CategoriaId;
  nome: string;
  icone: LucideIcon;
  /** Descrição objetiva (card). */
  descricao: string;
  /** Problema empresarial que resolve (card + modal). */
  problema: string;
  aplicacoes: string[];
  beneficios: string[];
  /** Conteúdo extra, exibido só no detalhamento. */
  visaoGeral: string;
  comoFunciona: { titulo: string; texto: string }[];
};

export const CATEGORIAS: Categoria[] = [
  {
    id: "inteligencia-comercial",
    indice: 1,
    titulo: "Inteligência Comercial",
    chamada: "Para vender com mais critério: saber quem priorizar, o que o cliente disse e o que propor.",
  },
  {
    id: "atendimento-conversao",
    indice: 2,
    titulo: "Atendimento e Conversão",
    chamada: "Para responder rápido, qualificar bem e não deixar oportunidade esfriar.",
  },
  {
    id: "operacao-gestao",
    indice: 3,
    titulo: "Operação e Gestão",
    chamada: "Para enxergar a operação inteira e decidir com base em dados, não em achismo.",
  },
];

// Passos genéricos de entrega, comuns a todo produto Horizon: descrevem a
// condução do trabalho, não funcionalidades técnicas.
const passos = (foco: string) => [
  {
    titulo: "Entendimento da operação",
    texto: `Começamos mapeando como ${foco} funciona hoje na sua empresa: onde trava, quem participa e o que precisa melhorar.`,
  },
  {
    titulo: "Estruturação do processo",
    texto: "Antes de tecnologia, definimos o fluxo ideal e as regras do seu negócio, para que a solução reflita a realidade da operação.",
  },
  {
    titulo: "Construção e ajuste",
    texto: "A solução é configurada para o seu cenário e ajustada com a sua equipe, em vez de ser entregue como pacote fechado.",
  },
];

export const SOLUCOES: Solucao[] = [
  // ── Inteligência Comercial ────────────────────────────────────────────
  {
    slug: "zyra",
    categoria: "inteligencia-comercial",
    nome: "ZYRA",
    icone: Users,
    descricao: "CRM, automação e inteligência comercial para organizar operações de vendas e relacionamento.",
    problema: "Contatos espalhados em planilhas e conversas, sem visão clara do funil e do histórico de cada cliente.",
    aplicacoes: [
      "Organização de contatos e oportunidades em um só lugar",
      "Acompanhamento do funil de vendas pela equipe",
      "Automação de rotinas comerciais repetitivas",
      "Relacionamento com clientes ao longo do tempo",
    ],
    beneficios: [
      "Visão única da operação comercial",
      "Menos informação perdida entre vendedores",
      "Mais tempo da equipe dedicado a vender",
    ],
    visaoGeral:
      "A ZYRA é o CRM da Horizon, voltado a empresas que precisam organizar vendas e relacionamento com apoio de automação e inteligência comercial.",
    comoFunciona: passos("o processo comercial"),
  },
  {
    slug: "lead-intelligence",
    categoria: "inteligencia-comercial",
    nome: "LEAD INTELLIGENCE",
    icone: Radar,
    descricao: "Qualificação, análise e priorização de oportunidades comerciais.",
    problema: "A equipe gasta energia com leads de baixo potencial enquanto oportunidades melhores esperam.",
    aplicacoes: [
      "Qualificação de leads antes do contato comercial",
      "Análise de oportunidades para apoiar a priorização",
      "Direcionamento do time para quem tem mais chance de avançar",
    ],
    beneficios: [
      "Critério claro para decidir quem atender primeiro",
      "Esforço comercial concentrado onde faz diferença",
      "Menos desperdício com contatos fora do perfil",
    ],
    visaoGeral:
      "Apoia a decisão de onde investir o tempo comercial, a partir da qualificação e análise das oportunidades que chegam à empresa.",
    comoFunciona: passos("a captação e o tratamento de leads"),
  },
  {
    slug: "conversation-intelligence",
    categoria: "inteligencia-comercial",
    nome: "CONVERSATION INTELLIGENCE",
    icone: MessagesSquare,
    descricao: "Análise de conversas comerciais, identificação de objeções e extração de informações estratégicas.",
    problema: "O que o cliente diz nas conversas fica perdido: objeções, necessidades e sinais de compra não viram informação útil.",
    aplicacoes: [
      "Análise de conversas e reuniões comerciais",
      "Identificação de objeções recorrentes",
      "Extração de informações para alimentar o CRM e as propostas",
    ],
    beneficios: [
      "Aprendizado comercial a partir de conversas reais",
      "Informações estratégicas registradas sem trabalho manual",
      "Base melhor para as próximas abordagens",
    ],
    visaoGeral:
      "Transforma conversas comerciais em informação estruturada, para que objeções e necessidades do cliente orientem as próximas decisões.",
    comoFunciona: passos("a condução das conversas comerciais"),
  },
  {
    slug: "proposal-engine",
    categoria: "inteligencia-comercial",
    nome: "PROPOSAL ENGINE",
    icone: FileText,
    descricao: "Transformação de informações comerciais e diagnósticos em propostas estruturadas.",
    problema: "Montar propostas é lento e inconsistente: cada uma sai de um jeito e o aprendizado da reunião não chega ao documento.",
    aplicacoes: [
      "Geração de propostas a partir do diagnóstico do cliente",
      "Padronização do formato e da linguagem das propostas",
      "Proposta pública compartilhável por link",
    ],
    beneficios: [
      "Proposta mais rápida entre a reunião e o envio",
      "Padrão consistente em toda a equipe",
      "Linguagem compreensível por quem decide, não só por técnicos",
    ],
    visaoGeral:
      "Converte as informações levantadas com o cliente em uma proposta organizada, partindo do problema e chegando ao resultado esperado.",
    comoFunciona: passos("a elaboração de propostas"),
  },

  // ── Atendimento e Conversão ───────────────────────────────────────────
  {
    slug: "ai-whatsapp-agent",
    categoria: "atendimento-conversao",
    nome: "AI WHATSAPP AGENT",
    icone: MessageCircle,
    descricao: "Agentes inteligentes para atendimento, qualificação e relacionamento pelo WhatsApp.",
    problema: "Mensagens demoram a ser respondidas e o atendimento depende de alguém disponível o tempo todo.",
    aplicacoes: [
      "Atendimento inicial de clientes e interessados",
      "Qualificação de contatos antes de chegar ao time",
      "Relacionamento contínuo pelo canal que o cliente já usa",
    ],
    beneficios: [
      "Resposta mais rápida ao primeiro contato",
      "Equipe atende conversas já qualificadas",
      "Menos oportunidades perdidas por demora",
    ],
    visaoGeral:
      "Um agente de IA que conversa com clientes pelo WhatsApp, configurado conforme o processo de atendimento de cada empresa.",
    comoFunciona: passos("o atendimento pelo WhatsApp"),
  },
  {
    slug: "ai-voice-agent",
    categoria: "atendimento-conversao",
    nome: "AI VOICE AGENT",
    icone: PhoneCall,
    descricao: "Agentes de voz para atendimento telefônico e operações de comunicação.",
    problema: "Ligações sem atendimento ou operações de contato por telefone que consomem muito tempo da equipe.",
    aplicacoes: [
      "Atendimento telefônico",
      "Operações de comunicação por voz",
    ],
    beneficios: [
      "Ligações atendidas com padrão de conversa definido",
      "Equipe liberada de contatos repetitivos",
    ],
    visaoGeral:
      "Agentes de voz para empresas que precisam atender ou se comunicar por telefone com consistência.",
    comoFunciona: passos("o atendimento por telefone"),
  },
  {
    slug: "ai-clinic-secretary",
    categoria: "atendimento-conversao",
    nome: "AI CLINIC SECRETARY",
    icone: Stethoscope,
    descricao: "Assistente inteligente para clínicas, organização de atendimentos e solicitações de agendamento.",
    problema: "A recepção fica sobrecarregada com mensagens e pedidos de agendamento, e pacientes ficam sem retorno.",
    aplicacoes: [
      "Recebimento de solicitações de agendamento",
      "Organização dos atendimentos da clínica",
      "Primeiro contato com pacientes",
    ],
    beneficios: [
      "Recepção com menos carga operacional",
      "Pacientes com retorno mais rápido",
      "Agenda e solicitações mais organizadas",
    ],
    visaoGeral:
      "Assistente pensado para a rotina de clínicas, que organiza atendimentos e recebe solicitações de agendamento.",
    comoFunciona: passos("a recepção e a agenda da clínica"),
  },
  {
    slug: "ai-sdr",
    categoria: "atendimento-conversao",
    nome: "AI SDR",
    icone: Handshake,
    descricao: "Agente de desenvolvimento comercial para primeiro contato, identificação de necessidades e qualificação de leads.",
    problema: "O primeiro contato com leads é demorado ou inconsistente, e o time comercial perde tempo descobrindo o básico.",
    aplicacoes: [
      "Primeiro contato com novos leads",
      "Identificação das necessidades do potencial cliente",
      "Qualificação para repasse ao time comercial",
    ],
    beneficios: [
      "Leads abordados sem atraso",
      "Vendedores entram quando já existe contexto",
      "Processo de qualificação padronizado",
    ],
    visaoGeral:
      "Faz o papel de pré-vendas: aborda, entende a necessidade e qualifica o lead antes de passá-lo ao time.",
    comoFunciona: passos("a pré-venda"),
  },

  // ── Operação e Gestão ─────────────────────────────────────────────────
  {
    slug: "horizon-ops",
    categoria: "operacao-gestao",
    nome: "HORIZON OPS",
    icone: LayoutDashboard,
    descricao: "Soluções para centralização, acompanhamento e organização de processos empresariais.",
    problema: "Processos espalhados em ferramentas, planilhas e pessoas, sem acompanhamento claro do que está acontecendo.",
    aplicacoes: [
      "Centralização de processos internos",
      "Acompanhamento do andamento das rotinas",
      "Organização de fluxos que hoje dependem de controles manuais",
    ],
    beneficios: [
      "Operação mais organizada e visível",
      "Menos retrabalho manual",
      "Base sólida para escalar sem perder controle",
    ],
    visaoGeral:
      "Soluções operacionais sob medida: partem do processo real da empresa para centralizá-lo e torná-lo acompanhável.",
    comoFunciona: passos("a operação"),
  },
  {
    slug: "business-intelligence",
    categoria: "operacao-gestao",
    nome: "BUSINESS INTELLIGENCE",
    icone: ChartColumn,
    descricao: "Dashboards e inteligência de dados para acompanhamento de indicadores e decisões gerenciais.",
    problema: "Os números existem, mas estão dispersos e chegam tarde, então decisões são tomadas sem dados confiáveis.",
    aplicacoes: [
      "Dashboards de indicadores do negócio",
      "Acompanhamento gerencial da operação",
      "Apoio a decisões com base em dados",
    ],
    beneficios: [
      "Indicadores reunidos em um só lugar",
      "Decisões gerenciais mais embasadas",
      "Menos tempo montando relatórios manualmente",
    ],
    visaoGeral:
      "Reúne os dados da operação em painéis e análises que ajudam gestores a acompanhar indicadores e decidir.",
    comoFunciona: passos("o acompanhamento de indicadores"),
  },
];

export const FLUXO_HORIZON = ["Problema", "Processo", "Tecnologia", "Solução", "Resultado"] as const;
