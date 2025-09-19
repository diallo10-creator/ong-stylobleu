import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Mission from "@/components/Mission";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatAssistant from "@/components/ChatAssistant";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <Mission />
        <Contact />
      </main>
      <Footer />
      <ChatAssistant />
    </div>
  );
};

export default Index;
