export type AnaliseFase = {
  periodo?: string;
  titulo?: string;
  descricao?: string;
};

export type AnaliseComercial = {
  client?: {
    company_name?: string;
    segment?: string;
    location?: string;
    size?: string;
  };
  decision_maker?: { name?: string; role?: string };
  diagnosis?: {
    main_problem?: string;
    secondary_problems?: string[];
    current_process?: string;
    impact?: string[];
    desired_outcome?: string;
    evidence?: string[];
    hypotheses?: string[];
  };
  recommendation?: {
    primary_product?: string;
    complementary_products?: string[];
    reason?: string;
    opportunity?: string;
  };
  scope?: { included?: string[]; excluded?: string[] };
  delivery?: { estimated_deadline?: string; phases?: (AnaliseFase | string)[] };
  investment?: {
    implementation?: number | null;
    monthly_recurring?: number | null;
    payment_terms?: string;
    status?: string;
  };
  proposal?: {
    headline?: string;
    context?: string;
    challenge?: string;
    solution?: string;
    expected_results?: string[];
    next_steps?: string[];
  };
  commercial?: {
    objections?: string[];
    missing_information?: string[];
    confidence?: number;
  };
};
