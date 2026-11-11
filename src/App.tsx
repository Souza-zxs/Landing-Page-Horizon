
import AmbientBackground from "./components/AmbientBackground";
import Hero from "./components/Hero";
import Problems from "./components/Problems";
import About from "./components/About";
import SolutionsTeaser from "./components/SolutionsTeaser";
import Ecosystem from "./components/Ecosystem";
import Results from "./components/Results";
import Services from "./components/Services";
import Process from "./components/Process";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import PropostasList from "./components/PropostasList";
import PropostaForm from "./components/PropostaForm";
import PropostaPublica from "./components/PropostaPublica";
import SolucoesPage from "./components/solucoes/SolucoesPage";
import DiagnosticoPage from "./components/diagnostico/DiagnosticoPage";
import { itamaraca } from "./components/diagnostico/data";

function App() {
  const pathname = window.location.pathname;

  if (pathname === "/solucoes" || pathname === "/solucoes/") {
    return <SolucoesPage />;
  }

  if (pathname === "/diagnostico/itamaraca" || pathname === "/diagnostico/itamaraca/") {
    return <DiagnosticoPage d={itamaraca} />;
  }

  if (pathname === "/dashboard") {
    return <Dashboard />;
  }

  if (pathname === "/dashboard/propostas") {
    return <PropostasList />;
  }

  if (pathname === "/dashboard/propostas/nova") {
    return <PropostaForm />;
  }

  if (pathname.startsWith("/proposta/")) {
    const slug = pathname.slice("/proposta/".length);
    return <PropostaPublica slug={slug} />;
  }

  return (
    <>
      <AmbientBackground />
      <div className="relative z-10">
        <Hero />
        <Problems />
        <About />
        <Services />
        <SolutionsTeaser />
        <Ecosystem />
        <Results />
        <Process />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export default App;
