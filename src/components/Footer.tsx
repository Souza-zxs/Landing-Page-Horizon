const FOOTER_LINKS = [
  { label: "Serviços", href: "#servicos" },
  { label: "Ecossistema", href: "#ecossistema" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

export default function Footer() {
  return (
    <footer className="bg-[#050D1F] py-10 sm:py-12">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <img
            src="/horizon-icon.png"
            alt="Horizon"
            className="w-9 h-9 object-contain"
          />
          <span className="text-lg font-semibold text-white">Horizon</span>
        </div>

        <div className="flex items-center gap-6">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[13px] text-white/60 hover:text-horizon-orange transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        <p className="text-[12px] text-white/40">
          © {new Date().getFullYear()} Horizon. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
