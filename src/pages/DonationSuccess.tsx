import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Heart, Home } from "lucide-react";

const DonationSuccess = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get('reference');
  
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center">
        <div className="mb-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-primary mb-2">
            Merci pour votre don !
          </h1>
          <p className="text-muted-foreground">
            Votre générosité nous aide à offrir une éducation de qualité 
            aux enfants en Côte d'Ivoire.
          </p>
        </div>
        
        {reference && (
          <div className="bg-muted/50 p-4 rounded-lg mb-6">
            <p className="text-sm text-muted-foreground mb-1">
              Référence de transaction :
            </p>
            <p className="font-mono text-sm font-medium">
              {reference}
            </p>
          </div>
        )}
        
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Un reçu de votre don vous sera envoyé par email.
          </p>
          
          <Link to="/">
            <Button className="w-full bg-gradient-primary hover:opacity-90">
              <Home className="w-4 h-4 mr-2" />
              Retour à l'accueil
            </Button>
          </Link>
        </div>
        
        <div className="mt-6 pt-6 border-t">
          <div className="flex items-center justify-center gap-2 text-primary">
            <Heart className="w-4 h-4" />
            <span className="text-sm font-medium">ONG Stylo Bleu</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DonationSuccess;