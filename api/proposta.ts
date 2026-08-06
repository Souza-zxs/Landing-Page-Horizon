/// <reference types="node" />
import { getSupabaseAdmin } from "./_supabase.js";
import { toProposta, type PropostaRow } from "./_propostas.js";

type VercelRequest = {
  method?: string;
  query: Record<string, string | string[] | undefined>;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const rawSlug = req.query.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;

  if (!slug) {
    res.status(400).json({ error: "Slug obrigatório." });
    return;
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("axion_propostas")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      res.status(404).json({ error: "Proposta não encontrada." });
      return;
    }

    res.status(200).json({ proposta: toProposta(data as PropostaRow) });
  } catch (err) {
    console.error("Erro ao buscar proposta:", err);
    res.status(500).json({ error: "Não foi possível carregar a proposta." });
  }
}
