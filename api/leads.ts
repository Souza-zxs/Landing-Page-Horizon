/// <reference types="node" />
import { timingSafeEqual } from "node:crypto";
import { getSupabaseAdmin } from "./_supabase.js";

type VercelRequest = {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
};

function isAuthorized(req: VercelRequest): boolean {
  const expected = process.env.DASHBOARD_PASSWORD;
  if (!expected) return false;

  const provided = req.headers["x-dashboard-password"];
  const value = Array.isArray(provided) ? provided[0] : provided;
  if (!value) return false;

  const a = Buffer.from(value);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!isAuthorized(req)) {
    res.status(401).json({ error: "Não autorizado." });
    return;
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("axion_landing_leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.status(200).json({ leads: data ?? [] });
  } catch (err) {
    console.error("Erro ao buscar leads:", err);
    res.status(500).json({ error: "Não foi possível carregar os leads." });
  }
}
