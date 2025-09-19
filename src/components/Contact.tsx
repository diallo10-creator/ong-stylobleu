import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Contactez-nous
          </h2>
          <p className="text-lg text-muted-foreground">
            Nous sommes là pour répondre à vos questions et accueillir vos propositions de collaboration.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-primary mb-6">
              Nos informations
            </h3>
            
            <div className="space-y-6 mb-8">
              <Card className="p-6 shadow-soft">
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Téléphone</h4>
                    <p className="text-muted-foreground">0586581601</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-soft">
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Email</h4>
                    <p className="text-muted-foreground">Ongstylobleu@gmail.com</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-soft">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Adresse</h4>
                    <p className="text-muted-foreground">Abidjan, Côte d'Ivoire</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-soft">
                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-secondary mt-1" />
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Disponibilité</h4>
                    <p className="text-muted-foreground">Toujours ouvert</p>
                    <p className="text-sm text-muted-foreground/80">Nous répondons dans les 24h</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <Card className="p-8 shadow-medium">
            <h3 className="text-2xl font-bold text-primary mb-6">
              Envoyez-nous un message
            </h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-primary mb-2 block">Nom</label>
                  <Input placeholder="Votre nom" className="w-full" />
                </div>
                <div>
                  <label className="text-sm font-medium text-primary mb-2 block">Email</label>
                  <Input type="email" placeholder="votre@email.com" className="w-full" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-primary mb-2 block">Sujet</label>
                <Input placeholder="Objet de votre message" className="w-full" />
              </div>
              <div>
                <label className="text-sm font-medium text-primary mb-2 block">Message</label>
                <Textarea 
                  placeholder="Votre message..." 
                  className="w-full min-h-[120px] resize-none"
                />
              </div>
              <Button className="w-full bg-gradient-primary hover:opacity-90 shadow-medium">
                <Send className="w-5 h-5 mr-2" />
                Envoyer le message
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;