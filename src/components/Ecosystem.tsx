import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const AUTOPLAY_INTERVAL = 3500;

const ITEMS = [
  {
    tag: "Ecossistema Horizon",
    image: "/ecosystem/zyra.png",
    title: "Zyra",
    description:
      "CRM proprietário multi-tenant da Horizon — contatos, oportunidades e dashboards, com integração nativa ao WhatsApp Cloud API.",
  },
  {
    tag: "Ecossistema Horizon",
    image: "/ecosystem/gestao-pro.png",
    title: "Gestão Pro",
    description:
      "Gestão financeira, CRM e portal de cursos em um único painel, com checkout de infoprodutos integrado.",
  },
  {
    tag: "Ecossistema Horizon",
    image: "/ecosystem/seller-finance.png",
    title: "Seller Finance",
    description:
      "Dashboard financeiro para sellers de marketplace — DRE automático, fluxo de caixa e precificação com IA.",
  },
  {
    tag: "Ecossistema Horizon",
    image: "/ecosystem/consultorio-pf.png",
    title: "Consultório PF",
    description:
      "Site e painel para clínicas, com agendamento online e atendimento por IA direto no WhatsApp.",
  },
  {
    tag: "Ecossistema Horizon",
    image: "/ecosystem/selva-nutrition.png",
    title: "Selva Nutrition",
    description:
      "Loja completa de manteigas Tallow/Ghee — catálogo, checkout com Mercado Pago e painel administrativo.",
  },
];

export default function Ecosystem() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 24 : track.clientWidth * 0.8;
    track.scrollBy({ left: amount * direction, behavior: "smooth" });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const interval = setInterval(() => {
      if (isPaused) return;
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
      if (atEnd) {
        track.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }
      const card = track.querySelector<HTMLElement>("[data-card]");
      const amount = card ? card.offsetWidth + 24 : track.clientWidth * 0.8;
      track.scrollBy({ left: amount, behavior: "smooth" });
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      id="ecossistema"
      className="relative px-4 sm:px-6 lg:px-10 py-8 sm:py-10 lg:py-14"
    >
      <div className="max-w-[1360px] mx-auto rounded-[28px] sm:rounded-[40px] bg-[#F5F5F5]/70 backdrop-blur-lg shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] overflow-hidden pt-14 sm:pt-16 lg:pt-20 pb-14 sm:pb-16 lg:pb-20">
        <div className="px-5 sm:px-8 lg:px-12 flex items-center justify-between gap-4 flex-wrap mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-navy text-white flex items-center justify-center text-[11px] sm:text-xs font-semibold">
              3
            </div>
            <div className="text-xs sm:text-[13px] font-medium border border-navy/20 text-navy rounded-full px-3 sm:px-4 py-1 sm:py-1.5">
              Ecossistema Horizon
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Anterior"
              className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-white hover:border-navy hover:text-navy transition-colors duration-300"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Próximo"
              className="w-9 h-9 rounded-full bg-navy text-white flex items-center justify-center hover:bg-navy-light transition-colors duration-300"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <h2 className="px-5 sm:px-8 lg:px-12 text-[clamp(1.75rem,7vw,4.2rem)] sm:text-[clamp(2.5rem,5vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 mb-10 sm:mb-14 lg:mb-16">
          Produtos que já{" "}
          <span className="text-horizon-orange">colocamos no ar</span>
        </h2>

        <div
          ref={trackRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex gap-5 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-px-5 sm:scroll-px-8 lg:scroll-px-12 px-5 sm:px-8 lg:px-12 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {ITEMS.map(({ tag, image, title, description }, i) => (
            <motion.div
              key={title}
              data-card
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="snap-start shrink-0 w-[82%] sm:w-[46%] lg:w-[31%]"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-navy">
                <img
                  src={image}
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
                <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/50 to-transparent" />
                <span className="absolute top-4 left-4 text-[11px] font-medium text-white bg-black/30 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1">
                  {tag}
                </span>
              </div>
              <p className="text-[13px] sm:text-sm text-gray-600 mt-4 leading-relaxed">
                {description}
              </p>
              <p className="text-sm sm:text-[15px] font-semibold text-gray-900 mt-1">
                {title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
