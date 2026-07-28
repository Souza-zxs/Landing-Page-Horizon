
import AmbientBackground from "./components/AmbientBackground";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Process from "./components/Process";
import Ecosystem from "./components/Ecosystem";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";

function App() {
  if (window.location.pathname === "/dashboard") {
    return <Dashboard />;
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
