import { Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">ONG Stylo Bleu</h1>
              <p className="text-xs text-muted-foreground">Éducation • Espoir • Progrès</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <a href="#accueil" className="text-foreground hover:text-primary transition-smooth">Accueil</a>
            <a href="#apropos" className="text-foreground hover:text-primary transition-smooth">À propos</a>
            <a href="#mission" className="text-foreground hover:text-primary transition-smooth">Notre mission</a>
            <a href="#actions" className="text-foreground hover:text-primary transition-smooth">Nos actions</a>
            <a href="#contact" className="text-foreground hover:text-primary transition-smooth">Contact</a>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Phone className="w-4 h-4" />
                <span>0586581601</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="w-4 h-4" />
                <span>Ongstylobleu@gmail.com</span>
              </div>
            </div>
            <Button variant="default" size="sm" className="bg-gradient-primary hover:opacity-90">
              Faire un don
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;