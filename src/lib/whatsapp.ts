// Mesmo número oficial já usado em Footer e PropostaPublica.
const HORIZON_WHATSAPP = "5583987999393";

export function whatsappUrl(mensagem: string) {
  return `https://wa.me/${HORIZON_WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
}

export function openWhatsapp(mensagem: string) {
  window.open(whatsappUrl(mensagem), "_blank", "noopener,noreferrer");
}
