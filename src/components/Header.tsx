import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Menu, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";
import DonationModal from "./DonationModal";
import logoOng from "@/assets/logo-ong.jpg";

const Header = () => {
  const { user, signOut, isAdmin } = useAuth();

  return (
    <header className="bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img 
              src={logoOng} 
              alt="Logo ONG Stylo Bleu - Éducation des enfants"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
            />
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-primary">ONG Stylo Bleu</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Éducation • Espoir • Progrès</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <a href="#accueil" className="text-foreground hover:text-primary transition-smooth">Accueil</a>
            <a href="#apropos" className="text-foreground hover:text-primary transition-smooth">À propos</a>
            <a href="#mission" className="text-foreground hover:text-primary transition-smooth">Notre mission</a>
            <a href="#faq" className="text-foreground hover:text-primary transition-smooth">FAQ</a>
            <a href="#contact" className="text-foreground hover:text-primary transition-smooth">Contact</a>
          </nav>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="hidden xl:flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Phone className="w-4 h-4" />
                <span>0586581601</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="w-4 h-4" />
                <span>Ongstylobleu@gmail.com</span>
              </div>
            </div>

            {/* Authentication buttons */}
            <div className="hidden md:flex items-center space-x-2">
              {user ? (
                <>
                  {isAdmin && (
                    <Link to="/admin">
                      <Button variant="outline" size="sm">
                        <User className="h-4 w-4 mr-2" />
                        Admin
                      </Button>
                    </Link>
                  )}
                  <Button onClick={signOut} variant="ghost" size="sm">
                    <LogOut className="h-4 w-4 mr-2" />
                    Déconnexion
                  </Button>
                </>
              ) : (
                <Link to="/auth">
                  <Button variant="outline" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    Connexion
                  </Button>
                </Link>
              )}
            </div>

            <DonationModal>
              <Button variant="default" size="sm" className="bg-gradient-primary hover:opacity-90">
                <span className="hidden sm:inline">Faire un don</span>
                <span className="sm:hidden">Don</span>
              </Button>
            </DonationModal>
            
            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                <nav className="flex flex-col space-y-4 mt-6">
                  <a href="#accueil" className="text-foreground hover:text-primary transition-smooth text-lg">Accueil</a>
                  <a href="#apropos" className="text-foreground hover:text-primary transition-smooth text-lg">À propos</a>
                  <a href="#mission" className="text-foreground hover:text-primary transition-smooth text-lg">Notre mission</a>
                  <a href="#faq" className="text-foreground hover:text-primary transition-smooth text-lg">FAQ</a>
                  <a href="#contact" className="text-foreground hover:text-primary transition-smooth text-lg">Contact</a>
                  
                  <div className="pt-4 border-t border-border space-y-3">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <span>0586581601</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      <span>Ongstylobleu@gmail.com</span>
                    </div>
                    
                    {/* Mobile auth */}
                    <div className="border-t pt-4 mt-4">
                      {user ? (
                        <>
                          {isAdmin && (
                            <Link to="/admin" className="block px-3 py-2 text-foreground/80 hover:text-foreground transition-colors">
                              <User className="inline h-4 w-4 mr-2" />
                              Admin
                            </Link>
                          )}
                          <button 
                            onClick={signOut}
                            className="block w-full text-left px-3 py-2 text-foreground/80 hover:text-foreground transition-colors"
                          >
                            <LogOut className="inline h-4 w-4 mr-2" />
                            Déconnexion
                          </button>
                        </>
                      ) : (
                        <Link to="/auth" className="block px-3 py-2 text-foreground/80 hover:text-foreground transition-colors">
                          <User className="inline h-4 w-4 mr-2" />
                          Connexion
                        </Link>
                      )}
                    </div>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;