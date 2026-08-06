/// <reference types="node" />
import { randomBytes, timingSafeEqual } from "node:crypto";
import { getSupabaseAdmin } from "./_supabase.js";
import { slugify, toProposta, type PropostaRow } from "./_propostas.js";

type VercelRequest = {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body: unknown;
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

function readString(body: Record<string, unknown>, key: string): string {
  const value = body[key];
  return typeof value === "string" ? value.trim() : "";
}

function readOptionalString(
  body: Record<string, unknown>,
  key: string,
): string | null {
  const value = readString(body, key);
  return value || null;
}

function readNumber(body: Record<string, unknown>, key: string): number | null {
  const value = body[key];
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "" && Number.isFinite(Number(value))) {
    return Number(value);
  }
  return null;
}

function readStringArray(body: Record<string, unknown>, key: string): string[] {
  const value = body[key];
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string" && item.trim() !== "");
}

function readEscopo(
  body: Record<string, unknown>,
): { titulo: string; descricao: string }[] {
  const value = body["escopo"];
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is Record<string, unknown> => typeof item === "object" && item !== null)
    .map((item) => ({
      titulo: typeof item.titulo === "string" ? item.titulo.trim() : "",
      descricao: typeof item.descricao === "string" ? item.descricao.trim() : "",
    }))
    .filter((item) => item.titulo !== "");
}

function readCronograma(
  body: Record<string, unknown>,
): { periodo: string; titulo: string; descricao: string }[] {
  const value = body["cronograma"];
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is Record<string, unknown> => typeof item === "object" && item !== null)
    .map((item) => ({
      periodo: typeof item.periodo === "string" ? item.periodo.trim() : "",
      titulo: typeof item.titulo === "string" ? item.titulo.trim() : "",
      descricao: typeof item.descricao === "string" ? item.descricao.trim() : "",
    }))
    .filter((item) => item.periodo !== "" || item.titulo !== "");
}

const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

async function nextNumero(
  supabase: ReturnType<typeof getSupabaseAdmin>,
): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `HZ-${year}-`;

  const { count, error } = await supabase
    .from("axion_propostas")
    .select("id", { count: "exact", head: true })
    .like("numero", `${prefix}%`);

  if (error) throw error;

  const seq = (count ?? 0) + 1;
  return `${prefix}${String(seq).padStart(4, "0")}`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!isAuthorized(req)) {
    res.status(401).json({ error: "Não autorizado." });
    return;
  }

  const supabase = getSupabaseAdmin();

  if (req.method === "GET") {
    try {
      const { data, error } = await supabase
        .from("axion_propostas")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const propostas = ((data ?? []) as PropostaRow[]).map(toProposta);
      res.status(200).json({ propostas });
    } catch (err) {
      console.error("Erro ao buscar propostas:", err);
      res.status(500).json({ error: "Não foi possível carregar as propostas." });
    }
    return;
  }

  if (req.method === "POST") {
    const body = (req.body ?? {}) as Record<string, unknown>;

    const clienteNome = readString(body, "clienteNome");
    const tituloProjeto = readString(body, "tituloProjeto");
    const resumo = readString(body, "resumo");
    const contexto = readString(body, "contexto");
    const escopo = readEscopo(body);
    const investimentoValor = readNumber(body, "investimentoValor");
    const investimentoPrazo = readString(body, "investimentoPrazo");

    if (
      !clienteNome ||
      !tituloProjeto ||
      !resumo ||
      !contexto ||
      escopo.length === 0 ||
      investimentoValor === null ||
      !investimentoPrazo
    ) {
      res.status(400).json({ error: "Campos obrigatórios faltando." });
      return;
    }

    const customSlug = readString(body, "slug").toLowerCase();
    if (customSlug && !SLUG_PATTERN.test(customSlug)) {
      res.status(400).json({
        error: "Identificador de URL inválido. Use apenas letras minúsculas, números e hífen.",
      });
      return;
    }

    const validadeDiasRaw = readNumber(body, "validadeDias");
    const validadeDias = validadeDiasRaw !== null && validadeDiasRaw > 0 ? validadeDiasRaw : 7;

    const insertPayload = {
      cliente_nome: clienteNome,
      cliente_empresa: readOptionalString(body, "clienteEmpresa"),
      titulo_projeto: tituloProjeto,
      resumo,
      validade_dias: validadeDias,
      contexto,
      escopo,
      stack: readStringArray(body, "stack"),
      entregaveis: readStringArray(body, "entregaveis"),
      cronograma: readCronograma(body),
      investimento_valor: investimentoValor,
      investimento_entrada: readNumber(body, "investimentoEntrada"),
      investimento_saldo: readNumber(body, "investimentoSaldo"),
      investimento_prazo: investimentoPrazo,
      investimento_nota: readOptionalString(body, "investimentoNota"),
      fora_escopo: readOptionalString(body, "foraEscopo"),
      contato_nome: readOptionalString(body, "contatoNome"),
      contato_email: readOptionalString(body, "contatoEmail"),
      contato_telefone: readOptionalString(body, "contatoTelefone"),
    };

    try {
      const numero = await nextNumero(supabase);

      if (customSlug) {
        const { data, error } = await supabase
          .from("axion_propostas")
          .insert({ ...insertPayload, slug: customSlug, numero })
          .select("*")
          .single();

        if (error) {
          if (error.code === "23505") {
            res.status(409).json({
              error: "Esse identificador já está em uso, escolha outro.",
            });
            return;
          }
          throw error;
        }

        res.status(201).json({ proposta: toProposta(data as PropostaRow) });
        return;
      }

      const baseSlug = slugify(clienteNome) || "proposta";

      let lastError: { code?: string; message: string } | null = null;
      for (let attempt = 0; attempt < 5; attempt++) {
        const slug = `${baseSlug}-${randomBytes(2).toString("hex")}`;

        const { data, error } = await supabase
          .from("axion_propostas")
          .insert({ ...insertPayload, slug, numero })
          .select("*")
          .single();

        if (!error) {
          res.status(201).json({ proposta: toProposta(data as PropostaRow) });
          return;
        }

        lastError = error;
        if (error.code !== "23505") break;
      }

      throw lastError ?? new Error("Não foi possível gerar um slug único.");
    } catch (err) {
      console.error("Erro ao criar proposta:", err);
      res.status(500).json({ error: "Não foi possível criar a proposta." });
    }
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}
