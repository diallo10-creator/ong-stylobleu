import { Card } from "@/components/ui/card";
import { MapPin, Users, GraduationCap, Award } from "lucide-react";

const About = () => {
  return (
    <section id="apropos" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            À propos de notre ONG
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            L'ONG Stylo Bleu est une organisation non gouvernementale basée à Abidjan, 
            en Côte d'Ivoire, dédiée à l'amélioration de l'accès à l'éducation pour tous les enfants.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold text-primary mb-6">
              Notre histoire
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Fondée avec la conviction profonde que l'éducation est le pilier du développement, 
              l'ONG Stylo Bleu s'engage à créer un avenir meilleur pour chaque enfant ivoirien. 
              Nous croyons que chaque enfant mérite une chance égale d'apprendre et de grandir.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Notre approche holistique combine soutien scolaire, aide matérielle et 
              accompagnement des familles pour créer un environnement propice à l'épanouissement éducatif.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-6 shadow-soft">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <h4 className="font-semibold text-primary mb-2">Localisation</h4>
              <p className="text-sm text-muted-foreground">Abidjan, Côte d'Ivoire</p>
            </Card>
            <Card className="p-6 shadow-soft">
              <Users className="w-8 h-8 text-secondary mb-4" />
              <h4 className="font-semibold text-primary mb-2">Statut</h4>
              <p className="text-sm text-muted-foreground">Toujours ouvert</p>
            </Card>
            <Card className="p-6 shadow-soft">
              <GraduationCap className="w-8 h-8 text-primary mb-4" />
              <h4 className="font-semibold text-primary mb-2">Domaine</h4>
              <p className="text-sm text-muted-foreground">Éducation</p>
            </Card>
            <Card className="p-6 shadow-soft">
              <Award className="w-8 h-8 text-secondary mb-4" />
              <h4 className="font-semibold text-primary mb-2">Mission</h4>
              <p className="text-sm text-muted-foreground">Scolarisation</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;