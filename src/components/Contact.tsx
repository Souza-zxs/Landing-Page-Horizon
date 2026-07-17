import { ArrowRight } from "lucide-react";
import RollButton from "./RollButton";

export default function Contact() {
  return (
    <section id="contato" className="relative py-16 sm:py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-horizon-orange text-white flex items-center justify-center text-[11px] sm:text-xs font-semibold">
                4
              </div>
              <div className="text-xs sm:text-[13px] font-medium border border-white/25 text-white/80 rounded-full px-3 sm:px-4 py-1 sm:py-1.5">
                Vamos conversar
              </div>
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
              className="self-start bg-horizon-orange hover:bg-[#e55f00] text-white pl-5 sm:pl-6 pr-2 py-2 mt-1"
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
