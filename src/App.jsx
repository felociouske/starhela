import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Services from "./components/sections/Services";
import Summaries from "./components/sections/Summaries";
import HowItWorks from "./components/sections/HowItWorks";
import Team from "./components/sections/Team";
import Blog from "./components/sections/Blog";
import Contact from "./components/sections/Contact";
import WhatsAppFloat from "./components/ui/WhatsAppFloat";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Summaries />
        <HowItWorks />
        <Team />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}