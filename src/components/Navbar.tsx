import { useState } from "react";
import { ArrowRight, Clock, Menu, X } from "lucide-react";
import RollButton from "./RollButton";
import { useSaoPauloTime } from "../hooks/useSaoPauloTime";

const NAV_LINKS = [
  { label: "Serviços", href: "#servicos" },
  { label: "Ecossistema", href: "#ecossistema" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

function HorizonMark({ className = "" }: { className?: string }) {
  return (
    <img
      src="/horizon-icon.png"
      alt="Horizon"
      className={`object-contain ${className}`}
    />
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const time = useSaoPauloTime();

  return (
    <>
      <div className="relative z-20 w-full max-w-[1440px] mx-auto p-2 sm:p-3">
        <nav className="flex items-center justify-between bg-white rounded-full p-[5px] pr-2 sm:pr-3">
          <div className="flex items-center gap-8">
            <a href="#" className="flex-shrink-0 flex items-center gap-2 pl-2 sm:pl-3">
              <HorizonMark className="w-9 h-9 sm:w-11 sm:h-11" />
              <span className="text-[17px] sm:text-lg font-semibold tracking-tight text-navy">
                Horizon
              </span>
            </a>
            <div className="hidden md:flex items-center gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-gray-900 hover:text-gray-500 transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <span className="hidden xl:flex flex-shrink-0 items-center gap-1.5 bg-gray-50 rounded-full pl-2.5 pr-3 py-1.5 text-[12px] text-gray-600 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
              Aberta a novos projetos
            </span>
            <div className="hidden xl:flex flex-shrink-0 items-center gap-1.5 bg-gray-50 rounded-full px-3 py-1.5 text-[12px] text-gray-600 whitespace-nowrap">
              <Clock size={13} className="flex-shrink-0" />
              <span>{time} em São Paulo</span>
            </div>
            <RollButton
              label="Falar com a Horizon"
              className="flex-shrink-0 bg-navy hover:bg-navy-light text-white pl-5 pr-2 py-2 shadow-[0_10px_25px_-8px_rgba(10,31,68,0.5)] hover:shadow-[0_14px_32px_-8px_rgba(10,31,68,0.6)] hover:-translate-y-0.5 transition-all duration-300"
              textWrapperClassName="text-[13px] font-medium"
              circleClassName="w-6 h-6 bg-horizon-orange"
              icon={<ArrowRight size={12} className="text-white" />}
              onClick={() =>
                document
                  .querySelector("#contato")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            />
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden relative z-[60] w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-navy hover:bg-navy-light text-white flex items-center justify-center shadow-[0_8px_20px_-6px_rgba(10,31,68,0.5)] transition-colors duration-300"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </div>

      <div
        className={`md:hidden fixed inset-0 z-50 transition-opacity duration-500 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/60"
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute inset-x-0 bottom-0 mx-3 mb-3 rounded-2xl bg-white p-6 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            open ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="inline-flex items-center gap-1.5 text-sm text-gray-600 bg-gray-100 rounded-full px-3 py-1.5 mb-6">
            <Clock size={14} />
            <span>{time} em São Paulo</span>
          </div>

          <div className="flex flex-col mb-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-2 text-[28px] sm:text-[32px] font-medium text-gray-900"
              >
                {link.label}
              </a>
            ))}
          </div>

          <RollButton
            label="Falar com a Horizon"
            className="w-full justify-between bg-navy hover:bg-navy-light text-white pl-6 pr-2 py-2 shadow-[0_10px_25px_-8px_rgba(10,31,68,0.5)] transition-colors duration-300"
            textWrapperClassName="text-base font-medium"
            circleClassName="w-9 h-9 bg-horizon-orange"
            icon={<ArrowRight size={16} className="text-white" />}
            onClick={() => {
              setOpen(false);
              document
                .querySelector("#contato")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          />
        </div>
      </div>
    </>
  );
}
