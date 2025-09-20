import Header from "@/components/Header";
import Footer from "@/components/Footer";

const LegalNotice = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
            Mentions Légales
          </h1>

          <div className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Identification de l'organisation
              </h2>
              <div className="space-y-2">
                <p><strong>Dénomination :</strong> ONG Stylo Bleu</p>
                <p><strong>Statut :</strong> Organisation Non Gouvernementale (ONG)</p>
                <p><strong>Domaine d'activité :</strong> Éducation des enfants</p>
                <p><strong>Siège social :</strong> Abidjan, Côte d'Ivoire</p>
                <p><strong>Email :</strong> Ongstylobleu@gmail.com</p>
                <p><strong>Téléphone :</strong> 0586581601</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Directeur de la publication
              </h2>
              <p>Le directeur de la publication du site web est le représentant légal de l'ONG Stylo Bleu.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Hébergement du site
              </h2>
              <p>Ce site est hébergé par Lovable, une plateforme de développement web.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Propriété intellectuelle
              </h2>
              <p>
                L'ensemble de ce site relève de la législation ivoirienne et internationale sur le droit d'auteur 
                et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris les 
                représentations iconographiques et photographiques.
              </p>
              <p className="mt-4">
                La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est 
                formellement interdite sauf autorisation expresse du directeur de la publication.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Protection des données personnelles
              </h2>
              <p>
                Conformément à la loi sur la protection des données personnelles en Côte d'Ivoire, vous disposez 
                d'un droit d'accès, de rectification et de suppression des données vous concernant.
              </p>
              <p className="mt-4">
                Les informations recueillies sur ce site sont nécessaires pour traiter vos demandes de contact 
                et vos dons. Elles sont destinées exclusivement à l'ONG Stylo Bleu et ne sont jamais transmises 
                à des tiers sans votre consentement.
              </p>
              <p className="mt-4">
                Pour exercer vos droits, vous pouvez nous contacter par email à : Ongstylobleu@gmail.com
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Cookies
              </h2>
              <p>
                Ce site utilise des cookies techniques nécessaires à son bon fonctionnement. Ces cookies ne 
                collectent aucune information personnelle et ne sont pas utilisés à des fins publicitaires.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Limitation de responsabilité
              </h2>
              <p>
                L'ONG Stylo Bleu s'efforce de fournir des informations aussi précises que possible sur ce site. 
                Toutefois, elle ne pourra être tenue responsable des omissions, des inexactitudes et des carences 
                dans la mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires qui lui 
                fournissent ces informations.
              </p>
              <p className="mt-4">
                L'ONG Stylo Bleu se réserve le droit de corriger, à tout moment et sans préavis, le contenu de 
                ce site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Liens hypertextes
              </h2>
              <p>
                Ce site peut contenir des liens vers d'autres sites. L'ONG Stylo Bleu n'exerce aucun contrôle 
                sur ces sites et décline toute responsabilité quant à leur contenu.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Droit applicable et juridiction
              </h2>
              <p>
                Tout litige en relation avec l'utilisation du site www.ongstylobleu.com est soumis au droit 
                ivoirien. Il est fait attribution exclusive de juridiction aux tribunaux compétents d'Abidjan.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Contact
              </h2>
              <p>
                Pour toute question concernant ces mentions légales ou l'utilisation de ce site, 
                vous pouvez nous contacter :
              </p>
              <div className="mt-4 space-y-2">
                <p><strong>Email :</strong> Ongstylobleu@gmail.com</p>
                <p><strong>Téléphone :</strong> 0586581601</p>
                <p><strong>Adresse :</strong> Abidjan, Côte d'Ivoire</p>
              </div>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LegalNotice;