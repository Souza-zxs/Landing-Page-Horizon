import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionTag from "./SectionTag";
import { smoothScrollLeft } from "../lib/smoothScroll";

const AUTOPLAY_INTERVAL = 3500;

const ITEMS = [
  {
    tag: "CRM",
    image: "/ecosystem/zyra.png",
    title: "Zyra",
    description:
      "CRM proprietário multi-tenant da Horizon — contatos, oportunidades e dashboards, com integração nativa ao WhatsApp Cloud API.",
  },
  {
    tag: "SaaS de gestão",
    image: "/ecosystem/gestao-pro.png",
    title: "Gestão Pro",
    description:
      "Gestão financeira, CRM e portal de cursos em um único painel, com checkout de infoprodutos integrado.",
  },
  {
    tag: "Fintech",
    image: "/ecosystem/seller-finance.png",
    title: "Seller Finance",
    description:
      "Dashboard financeiro para sellers de marketplace — DRE automático, fluxo de caixa e precificação com IA.",
  },
  {
    tag: "Saúde",
    image: "/ecosystem/consultorio-pf.png",
    title: "Consultório PF",
    description:
      "Site e painel para clínicas, com agendamento online e atendimento por IA direto no WhatsApp.",
  },
  {
    tag: "E-commerce",
    image: "/ecosystem/selva-nutrition.png",
    title: "Selva Nutrition",
    description:
      "Loja completa de manteigas Tallow/Ghee — catálogo, checkout com Mercado Pago e painel administrativo.",
  },
];

export default function Ecosystem() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pageCount, setPageCount] = useState(ITEMS.length);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 24 : track.clientWidth * 0.8;
    smoothScrollLeft(track, amount * index);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const interval = setInterval(() => {
      if (isPaused) return;
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
      if (atEnd) {
        smoothScrollLeft(track, 0, 1.3);
        return;
      }
      const card = track.querySelector<HTMLElement>("[data-card]");
      const amount = card ? card.offsetWidth + 24 : track.clientWidth * 0.8;
      smoothScrollLeft(track, track.scrollLeft + amount, 1.3);
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      const card = track.querySelector<HTMLElement>("[data-card]");
      const amount = card ? card.offsetWidth + 24 : track.clientWidth;
      const index = Math.round(track.scrollLeft / amount);
      setActiveIndex(Math.max(0, Math.min(index, pageCount - 1)));
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => track.removeEventListener("scroll", handleScroll);
  }, [pageCount]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updatePageCount = () => {
      const card = track.querySelector<HTMLElement>("[data-card]");
      const amount = card ? card.offsetWidth + 24 : track.clientWidth;
      const maxScroll = track.scrollWidth - track.clientWidth;
      const steps = amount > 0 ? Math.round(maxScroll / amount) + 1 : ITEMS.length;
      setPageCount(Math.max(1, Math.min(steps, ITEMS.length)));
    };

    updatePageCount();
    window.addEventListener("resize", updatePageCount);
    return () => window.removeEventListener("resize", updatePageCount);
  }, []);

  return (
    <section
      id="ecossistema"
      className="relative px-4 sm:px-6 lg:px-10 py-8 sm:py-10 lg:py-14"
    >
      <div className="max-w-[1360px] mx-auto rounded-[28px] sm:rounded-[40px] bg-[#F5F5F5]/70 backdrop-blur-lg shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] overflow-hidden pt-14 sm:pt-16 lg:pt-20 pb-14 sm:pb-16 lg:pb-20">
        <div className="px-5 sm:px-8 lg:px-12 mb-6 sm:mb-8">
          <SectionTag index={4} label="Ecossistema Horizon" variant="light" />
        </div>

        <h2 className="px-5 sm:px-8 lg:px-12 text-[clamp(1.75rem,7vw,4.2rem)] sm:text-[clamp(2.5rem,5vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 mb-4 sm:mb-5">
          Produtos que já{" "}
          <span className="text-horizon-orange">colocamos no ar</span>
        </h2>
        <p className="px-5 sm:px-8 lg:px-12 text-[15px] sm:text-base leading-relaxed text-gray-600 max-w-xl mb-10 sm:mb-14 lg:mb-16">
          Do CRM proprietário da própria Horizon a painéis financeiros e apps
          sob medida — produtos reais, em uso, construídos com a mesma stack
          que aplicamos nos projetos dos nossos clientes.
        </p>

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
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
              className="snap-start shrink-0 w-[82%] sm:w-[46%] lg:w-[31%]"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-navy shadow-[0_25px_60px_-20px_rgba(10,31,68,0.55)] ring-1 ring-black/5">
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
              <p className="text-base sm:text-lg font-semibold text-navy tracking-tight mt-4">
                {title}
              </p>
              <p className="text-[13px] sm:text-sm text-gray-600 mt-1.5 leading-relaxed">
                {description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 mt-8 sm:mt-10">
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`Ir para posição ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-6 bg-navy" : "w-1.5 bg-navy/20 hover:bg-navy/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
