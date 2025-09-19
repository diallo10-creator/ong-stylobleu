import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, HandHeart, Users, Target, Lightbulb, Shield } from "lucide-react";

const Mission = () => {
  const missions = [
    {
      icon: BookOpen,
      title: "Accès à l'éducation",
      description: "Faciliter l'accès à l'éducation pour tous les enfants, sans distinction sociale ou économique."
    },
    {
      icon: HandHeart,
      title: "Soutien matériel",
      description: "Fournir le matériel scolaire nécessaire : cahiers, stylos bleus, livres et uniformes."
    },
    {
      icon: Users,
      title: "Accompagnement familial",
      description: "Sensibiliser et accompagner les familles sur l'importance de la scolarisation."
    },
    {
      icon: Target,
      title: "Réduction de la déscolarisation",
      description: "Lutter contre l'abandon scolaire et promouvoir la réussite éducative."
    },
    {
      icon: Lightbulb,
      title: "Innovation pédagogique",
      description: "Développer des méthodes d'apprentissage adaptées au contexte local."
    },
    {
      icon: Shield,
      title: "Protection de l'enfance",
      description: "Assurer un environnement scolaire sûr et bienveillant pour tous."
    }
  ];

  return (
    <section id="mission" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Notre Mission
          </h2>
          <div className="bg-gradient-secondary p-8 rounded-2xl shadow-medium">
            <blockquote className="text-2xl md:text-3xl font-semibold text-white mb-4">
              "Un enfant scolarisé est une fierté pour la Famille et une assurance pour le progrès de la Nation"
            </blockquote>
            <p className="text-white/90 text-lg">
              Cette citation guide chacune de nos actions et reflète notre engagement profond 
              envers l'éducation comme moteur de développement.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {missions.map((mission, index) => (
            <Card key={index} className="p-6 shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-105">
              <mission.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-primary mb-3">
                {mission.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {mission.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-bold text-primary mb-4">
            Rejoignez notre mission
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Ensemble, nous pouvons faire la différence dans la vie de milliers d'enfants 
            et contribuer au développement de la Côte d'Ivoire.
          </p>
          <Button size="lg" className="bg-gradient-primary hover:opacity-90 shadow-medium">
            Devenir partenaire
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Mission;