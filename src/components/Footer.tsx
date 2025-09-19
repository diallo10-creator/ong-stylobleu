import { Heart, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <span className="text-primary font-bold">S</span>
              </div>
              <span className="text-xl font-bold">ONG Stylo Bleu</span>
            </div>
            <p className="text-white/80 leading-relaxed mb-4">
              Œuvrer pour l'éducation des enfants en Côte d'Ivoire, 
              car chaque enfant scolarisé est une fierté pour sa famille 
              et une assurance pour le progrès de la nation.
            </p>
            <div className="flex items-center space-x-1 text-white/80">
              <Heart className="w-4 h-4 text-secondary" />
              <span className="text-sm">Avec amour depuis Abidjan</span>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Nos actions</h4>
            <ul className="space-y-2 text-white/80">
              <li>• Distribution de matériel scolaire</li>
              <li>• Soutien scolaire et accompagnement</li>
              <li>• Sensibilisation des familles</li>
              <li>• Partenariats éducatifs</li>
              <li>• Programmes de bourses</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-white/80">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-secondary" />
                <span>0586581601</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-secondary" />
                <span>Ongstylobleu@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-secondary" />
                <span>Abidjan, Côte d'Ivoire</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">
              © 2024 ONG Stylo Bleu. Tous droits réservés.
            </p>
            <p className="text-white/60 text-sm mt-2 md:mt-0">
              Organisation non gouvernementale • Éducation • Côte d'Ivoire
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;