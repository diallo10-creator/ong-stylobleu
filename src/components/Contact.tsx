import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    message: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nom || !formData.email || !formData.message) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('contact-form', {
        body: formData
      });

      if (error) {
        throw error;
      }

      toast.success(data.message || 'Votre message a été envoyé avec succès !');
      setFormData({ nom: '', email: '', telephone: '', message: '' });
    } catch (error: any) {
      console.error('Contact form error:', error);
      toast.error(error.message || 'Une erreur est survenue lors de l\'envoi du message');
    } finally {
      setIsLoading(false);
    }
  };
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
            <h3 className="text-xl font-semibold mb-4">Envoyez-nous un message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input 
                placeholder="Nom complet *" 
                value={formData.nom}
                onChange={(e) => handleInputChange('nom', e.target.value)}
                required
              />
              <Input 
                placeholder="Email *" 
                type="email" 
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
              <Input 
                placeholder="Téléphone" 
                type="tel"
                value={formData.telephone}
                onChange={(e) => handleInputChange('telephone', e.target.value)}
              />
              <Textarea 
                placeholder="Votre message... *" 
                className="min-h-[120px]"
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                required
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                <Send className="mr-2 h-4 w-4" />
                {isLoading ? 'Envoi...' : 'Envoyer le message'}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;