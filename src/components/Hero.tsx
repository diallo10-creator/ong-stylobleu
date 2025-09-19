import { Button } from "@/components/ui/button";
import { GraduationCap, Heart, Users } from "lucide-react";
import heroImage from "@/assets/hero-education.jpg";
import DonationModal from "./DonationModal";

const Hero = () => {
  return (
    <section id="accueil" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              ONG Stylo Bleu
            </h1>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 border border-white/20">
              <blockquote className="text-xl md:text-2xl text-white/95 italic leading-relaxed">
                "Un enfant scolarisé est une fierté pour la Famille et une assurance pour le progrès de la Nation"
              </blockquote>
            </div>
          </div>

          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl">
            Nous œuvrons chaque jour pour que chaque enfant en Côte d'Ivoire ait accès à une éducation de qualité, 
            car l'éducation est la clé du développement durable de notre nation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <DonationModal>
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-medium">
                <Heart className="w-5 h-5 mr-2" />
                Soutenir notre cause
              </Button>
            </DonationModal>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <Users className="w-5 h-5 mr-2" />
              Découvrir nos actions
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <GraduationCap className="w-8 h-8 text-secondary mb-3" />
              <h3 className="text-white font-semibold mb-2">Éducation pour tous</h3>
              <p className="text-white/80 text-sm">Accès à l'éducation pour chaque enfant</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Heart className="w-8 h-8 text-secondary mb-3" />
              <h3 className="text-white font-semibold mb-2">Soutien aux familles</h3>
              <p className="text-white/80 text-sm">Accompagnement des parents</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Users className="w-8 h-8 text-secondary mb-3" />
              <h3 className="text-white font-semibold mb-2">Communauté unie</h3>
              <p className="text-white/80 text-sm">Ensemble pour le progrès</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;