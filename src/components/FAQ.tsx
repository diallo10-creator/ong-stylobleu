import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Qu'est-ce que l'ONG Stylo Bleu ?",
      answer: "L'ONG Stylo Bleu est une organisation non gouvernementale basée à Abidjan, en Côte d'Ivoire, qui œuvre pour l'éducation des enfants. Notre mission est de garantir que chaque enfant ait accès à une éducation de qualité, car nous croyons que chaque enfant scolarisé est une fierté pour sa famille et une assurance pour le progrès de la nation."
    },
    {
      question: "Quelles sont vos principales actions ?",
      answer: "Nos actions principales incluent : la distribution de matériel scolaire aux enfants défavorisés, le soutien scolaire et l'accompagnement pédagogique, la sensibilisation des familles à l'importance de l'éducation, la création de partenariats éducatifs avec les écoles locales, et l'attribution de programmes de bourses pour les enfants méritants."
    },
    {
      question: "Comment puis-je faire un don ?",
      answer: "Vous pouvez faire un don en cliquant sur le bouton 'Faire un don' présent sur notre site. Nous acceptons les dons par carte bancaire via notre plateforme sécurisée. Tous les dons, quelle que soit leur taille, font une différence dans la vie des enfants que nous aidons."
    },
    {
      question: "Où intervenez-vous exactement ?",
      answer: "Nous intervenons principalement à Abidjan et dans les régions avoisinantes en Côte d'Ivoire. Notre objectif est de toucher les communautés où les besoins éducatifs sont les plus importants, particulièrement dans les zones défavorisées où l'accès à l'éducation reste un défi."
    },
    {
      question: "Comment puis-je devenir bénévole ?",
      answer: "Pour devenir bénévole, vous pouvez nous contacter via notre formulaire de contact ou par email à Ongstylobleu@gmail.com. Nous accueillons toutes les bonnes volontés, que vous souhaitiez participer à nos actions sur le terrain, nous aider dans l'organisation d'événements, ou apporter vos compétences professionnelles."
    },
    {
      question: "Comment suivre l'impact de mon don ?",
      answer: "Nous croyons en la transparence totale. Après votre don, vous recevrez des mises à jour régulières sur nos actions et leur impact. Nous publions également des rapports d'activité qui détaillent comment les fonds sont utilisés et les résultats obtenus sur le terrain."
    },
    {
      question: "Travaillez-vous avec d'autres organisations ?",
      answer: "Oui, nous établissons des partenariats éducatifs avec les écoles locales, les institutions gouvernementales et d'autres ONG partageant notre vision. Ces collaborations nous permettent d'amplifier notre impact et de mieux servir les communautés."
    },
    {
      question: "Quel est votre statut juridique ?",
      answer: "L'ONG Stylo Bleu est une organisation non gouvernementale officiellement reconnue en Côte d'Ivoire. Nous opérons dans le domaine de l'éducation et respectons toutes les réglementations applicables aux ONG dans le pays."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Questions Fréquentes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trouvez les réponses aux questions les plus courantes sur notre organisation et nos actions.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pt-2 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Vous avez d'autres questions ?
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center text-primary hover:text-primary/80 font-semibold"
          >
            Contactez-nous →
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;