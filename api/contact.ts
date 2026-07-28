import { getSupabaseAdmin } from "./_supabase.js";

type VercelRequest = {
  method?: string;
  body: unknown;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
};

function readField(body: Record<string, unknown>, key: string): string {
  const value = body[key];
  return typeof value === "string" ? value.trim() : "";
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const body = (req.body ?? {}) as Record<string, unknown>;
  const nome = readField(body, "nome");
  const telefone = readField(body, "telefone");
  const empresa = readField(body, "empresa");
  const email = readField(body, "email");
  const mensagem = readField(body, "mensagem");

  if (!nome || !telefone || !email || !mensagem) {
    res.status(400).json({ error: "Campos obrigatórios faltando." });
    return;
  }

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("axion_landing_leads").insert({
      nome,
      telefone,
      empresa: empresa || null,
      email,
      mensagem,
    });

    if (error) throw error;

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Erro ao salvar lead:", err);
    res.status(500).json({ error: "Não foi possível salvar sua mensagem." });
  }
}
