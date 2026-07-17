import AmbientBackground from "./components/AmbientBackground";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Ecosystem from "./components/Ecosystem";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <AmbientBackground />
      <div className="relative z-10">
        <Hero />
        <About />
        <Services />
        <Ecosystem />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export default App;
