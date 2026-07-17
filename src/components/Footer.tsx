import { Clock, Mail, Phone } from "lucide-react";
import { useSaoPauloTime } from "../hooks/useSaoPauloTime";

const FOOTER_LINKS = [
  { label: "Serviços", href: "#servicos" },
  { label: "Ecossistema", href: "#ecossistema" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

function InstagramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="flex-shrink-0"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  const time = useSaoPauloTime();

  return (
    <footer className="relative px-4 sm:px-6 lg:px-10 pt-8 sm:pt-10 pb-8 sm:pb-10">
      <div className="relative max-w-[1360px] mx-auto rounded-[28px] sm:rounded-[40px] bg-[#050D1F] overflow-hidden px-6 sm:px-10 lg:px-14 pt-14 sm:pt-16 pb-8 sm:pb-10">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-horizon-orange/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-14 w-64 h-64 rounded-full bg-navy-light/30 blur-3xl pointer-events-none" />

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1fr] gap-10 lg:gap-8 pb-10 sm:pb-14">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img
                src="/horizon-icon.png"
                alt="Horizon"
                className="w-9 h-9 object-contain"
              />
              <span className="text-lg font-semibold text-white">
                Horizon
              </span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Tecnologia B2B e B2B2C — software sob medida, automações
              inteligentes e integrações que escalam com o seu negócio.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">
              Navegação
            </p>
            <div className="flex flex-col gap-3">
              {FOOTER_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-white/70 hover:text-horizon-orange transition-colors duration-300 w-fit"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">
              Contato
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:horizontecnologiaa@gmail.com"
                className="flex items-center gap-2.5 text-sm text-white/70 hover:text-horizon-orange transition-colors duration-300 w-fit"
              >
                <Mail size={15} className="flex-shrink-0" />
                horizontecnologiaa@gmail.com
              </a>
              <a
                href="https://wa.me/5583987999393"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-sm text-white/70 hover:text-horizon-orange transition-colors duration-300 w-fit"
              >
                <Phone size={15} className="flex-shrink-0" />
                (83) 9 8799-9393
              </a>
              <a
                href="https://www.instagram.com/horizon.soluctions/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-sm text-white/70 hover:text-horizon-orange transition-colors duration-300 w-fit"
              >
                <InstagramIcon />
                @horizon.soluctions
              </a>
            </div>
          </div>
        </div>

        <div className="relative flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-6 sm:pt-8 border-t border-white/10">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Horizon. Todos os direitos
            reservados.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-white/40 bg-white/5 rounded-full px-3 py-1.5">
            <Clock size={12} />
            <span>{time} em São Paulo</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
