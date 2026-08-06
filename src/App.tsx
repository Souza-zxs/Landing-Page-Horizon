
import AmbientBackground from "./components/AmbientBackground";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Process from "./components/Process";
import Ecosystem from "./components/Ecosystem";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import PropostasList from "./components/PropostasList";
import PropostaForm from "./components/PropostaForm";
import PropostaPublica from "./components/PropostaPublica";

function App() {
  const pathname = window.location.pathname;

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
        <About />
        <Services />
        <Process />
        <Ecosystem />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export default App;
