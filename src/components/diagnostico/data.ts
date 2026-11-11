export interface Problema {
  n: string;
  titulo: string;
  texto: string[];
  consequencia: string;
  nota?: string;
}

export interface Diagnostico {
  slug: string;
  empresa: string;
  concorrente: string;
  data: string;
  lojasAtuais: number;
  lojasDesejadas: number;
  contexto: string[];
  empresaPontos: string[];
  concorrentePontos: string[];
  problemas: Problema[];
  eixos: { nome: string; problemas: string[] }[];
}

export const itamaraca: Diagnostico = {
  slug: "itamaraca",
  empresa: "Distribuidora de Colchões Itamaracá",
  concorrente: "Eu Quero Colchão",
  data: "Novembro 2026",
  lojasAtuais: 2,
  lojasDesejadas: 10,
  contexto: [
    "Duas unidades físicas em operação",
    "Estoque próprio",
    "Atendimento presencial e digital",
    "Um funcionário responsável pelas vendas e pelo atendimento em cada unidade",
    "WhatsApp individual por funcionário",
    "Proprietário acompanha os resultados comerciais",
    "Ambição de expansão para dez unidades",
  ],
  empresaPontos: [
    "Identidade comercial pouco desenvolvida.",
    "Comunicação baseada em imagens produzidas por IA e ofertas.",
    "Pouca demonstração da estrutura real da empresa.",
    "Ausência de uma narrativa comercial consistente.",
    "Diferenciação pouco evidente para o consumidor.",
  ],
  concorrentePontos: [
    "Posicionamento visual mais desenvolvido, conforme análise comparativa apresentada.",
    "Comunicação mais próxima do consumidor.",
    "Maior exploração de vídeos e apresentação de produtos.",
    "Presença humana e construção de confiança.",
    "Comunicação comercial mais estruturada.",
  ],
  problemas: [
    {
      n: "01",
      titulo: "Ausência de diferenciação competitiva",
      texto: [
        "A empresa ainda não comunica com clareza por que o consumidor deveria escolhê-la em vez de outra loja.",
      ],
      consequencia:
        "Maior dependência de preço, descontos e condições comerciais.",
    },
    {
      n: "02",
      titulo: "Marca sem identidade comercial consolidada",
      texto: [
        "A comunicação não apresenta uma personalidade consistente nem constrói reconhecimento e lembrança de marca.",
      ],
      consequencia: "Dificuldade de criar preferência e valor percebido.",
    },
    {
      n: "03",
      titulo: "Comunicação artificial e pouco autêntica",
      texto: [
        "O uso de imagens geradas por IA substitui a demonstração de pessoas, produtos, lojas e experiências reais.",
      ],
      consequencia:
        "Oportunidades perdidas de gerar familiaridade, confiança e credibilidade.",
    },
    {
      n: "04",
      titulo: "Instagram tratado como vitrine",
      texto: [
        "A presença digital concentra-se na divulgação de produtos e ofertas, sem responder suficientemente às dúvidas e motivações que influenciam a compra.",
      ],
      consequencia:
        "O consumidor pode visualizar a publicação sem desenvolver confiança ou intenção de compra.",
    },
    {
      n: "05",
      titulo: "Subestimação da força competitiva dos concorrentes",
      texto: [
        "A empresa corre o risco de acreditar que mais publicações ou anúncios serão suficientes para disputar mercado.",
      ],
      consequencia:
        "Competir por atenção sem construir preferência, autoridade e diferenciação.",
    },
    {
      n: "06",
      titulo: "Intenção de investir em tráfego sem estrutura estratégica consolidada",
      texto: [
        "O proprietário pretende iniciar anúncios e capacitar os funcionários para assumir essa frente.",
        "Entretanto, os funcionários já acumulam atendimento presencial, atendimento digital e vendas.",
      ],
      consequencia:
        "Sobrecarga da equipe e possibilidade de gerar contatos sem capacidade adequada de atendimento e conversão.",
      nota: "Não há campanhas pagas em andamento nem resultados anteriores informados. Este ponto trata de preparo, não de desempenho.",
    },
    {
      n: "07",
      titulo: "Estrutura comercial potencialmente limitada",
      texto: [
        "Cada funcionário atende presencialmente e pelo próprio WhatsApp.",
      ],
      consequencia:
        "Consequência potencial: divisão de atenção, demora no atendimento, falta de acompanhamento e dependência do desempenho individual.",
      nota: "Risco a validar. Não se trata de perda de vendas comprovada.",
    },
  ],
  eixos: [
    { nome: "Posicionamento", problemas: ["01", "05"] },
    { nome: "Marca", problemas: ["02"] },
    { nome: "Comunicação", problemas: ["03", "04"] },
    { nome: "Competitividade", problemas: ["01", "05"] },
    { nome: "Marketing", problemas: ["04", "06"] },
    { nome: "Comercial", problemas: ["06", "07"] },
    { nome: "Gestão", problemas: ["06", "07"] },
  ],
};
