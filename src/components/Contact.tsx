import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import RollButton from "./RollButton";
import SectionTag from "./SectionTag";

export default function Contact() {
  return (
    <section id="contato" className="relative py-16 sm:py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <div className="mb-6 sm:mb-8">
              <SectionTag index={5} label="Vamos conversar" variant="dark" />
            </div>
            <h2 className="text-[clamp(1.75rem,5vw,3.4rem)] font-medium leading-[1.1] tracking-[-0.03em] text-white mb-5">
              Menos retrabalho manual.
              <br />
              Mais tempo pra <span className="text-horizon-orange">crescer</span>.
            </h2>
            <p className="text-[15px] sm:text-base leading-relaxed text-white/70 max-w-md">
              Conte pra gente o processo que trava seu negócio hoje. A
              Horizon retorna com um diagnóstico técnico e um plano de
              entrega — sem enrolação.
            </p>

            <div className="flex flex-wrap gap-3 mt-7">
              <a
                href="https://wa.me/5583987999393"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md px-4 py-2.5 text-sm font-medium text-white hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
              >
                <MessageCircle size={16} className="text-horizon-orange" />
                Chamar no WhatsApp
              </a>
              <a
                href="mailto:horizontecnologiaa@gmail.com"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md px-4 py-2.5 text-sm font-medium text-white hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
              >
                <Mail size={16} className="text-horizon-orange" />
                Enviar e-mail
              </a>
            </div>

            <p className="text-[13px] sm:text-sm text-white/40 italic mt-6 max-w-sm">
              Sem script de vendas: você fala direto com quem vai construir o
              projeto.
            </p>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="bg-[#F5F5F5]/70 backdrop-blur-lg shadow-[0_25px_60px_-15px_rgba(0,0,0,0.45)] rounded-2xl p-6 sm:p-8 flex flex-col gap-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="nome"
                placeholder="Nome"
                required
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 caret-navy outline-none focus:border-horizon-orange focus:ring-2 focus:ring-horizon-orange/25 transition-all"
              />
              <input
                type="tel"
                name="telefone"
                placeholder="Telefone / WhatsApp"
                required
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 caret-navy outline-none focus:border-horizon-orange focus:ring-2 focus:ring-horizon-orange/25 transition-all"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="empresa"
                placeholder="Empresa"
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 caret-navy outline-none focus:border-horizon-orange focus:ring-2 focus:ring-horizon-orange/25 transition-all"
              />
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                required
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 caret-navy outline-none focus:border-horizon-orange focus:ring-2 focus:ring-horizon-orange/25 transition-all"
              />
            </div>
            <textarea
              name="mensagem"
              placeholder="Conte um pouco sobre o projeto"
              rows={4}
              required
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 caret-navy outline-none focus:border-horizon-orange focus:ring-2 focus:ring-horizon-orange/25 transition-all resize-none"
            />
            <RollButton
              type="submit"
              label="Enviar mensagem"
              className="self-start bg-horizon-orange hover:bg-[#e55f00] text-white pl-5 sm:pl-6 pr-2 py-2 mt-1 shadow-[0_10px_28px_-8px_rgba(255,106,0,0.5)] hover:shadow-[0_14px_34px_-8px_rgba(255,106,0,0.6)] hover:-translate-y-0.5 transition-all duration-300"
              textWrapperClassName="text-[13px] sm:text-sm font-medium"
              circleClassName="w-7 h-7 sm:w-8 sm:h-8 bg-white"
              icon={<ArrowRight size={14} className="text-navy" />}
            />
          </form>
        </div>
      </div>
    </section>
  );
}
