import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { ArrowLeft, Users, Mail, Calendar, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Contact {
  id: string;
  nom: string;
  email: string;
  telephone?: string;
  message: string;
  status: string;
  created_at: string;
}

interface Registration {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  created_at: string;
  ticket_id?: string;
}

const AdminDashboard = () => {
  const { user, signOut, isAdmin, isLoading: authLoading } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      return;
    }

    fetchData();
  }, [user, isAdmin, authLoading]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch contacts
      const { data: contactsData, error: contactsError } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (contactsError) {
        console.error('Error fetching contacts:', contactsError);
        toast.error('Erreur lors du chargement des contacts');
      } else {
        setContacts(contactsData || []);
      }

      // Fetch registrations
      const { data: registrationsData, error: registrationsError } = await supabase
        .from('inscriptions_concert')
        .select('*')
        .order('created_at', { ascending: false });

      if (registrationsError) {
        console.error('Error fetching registrations:', registrationsError);
        toast.error('Erreur lors du chargement des inscriptions');
      } else {
        setRegistrations(registrationsData || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Erreur lors du chargement des données');
    } finally {
      setIsLoading(false);
    }
  };

  const updateContactStatus = async (contactId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('contacts')
        .update({ status: newStatus })
        .eq('id', contactId);

      if (error) {
        toast.error('Erreur lors de la mise à jour');
      } else {
        toast.success('Statut mis à jour');
        fetchData();
      }
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Accès non autorisé</CardTitle>
            <CardDescription className="text-center">
              Vous devez être connecté en tant qu'administrateur pour accéder à cette page.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link to="/auth">
              <Button>Se connecter</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      nouveau: "default",
      traite: "secondary",
      resolu: "outline"
    };
    
    return (
      <Badge variant={variants[status] || "default"}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour à l'accueil
              </Link>
              <h1 className="text-2xl font-bold">Tableau de bord administrateur</h1>
            </div>
            <Button onClick={signOut} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 mb-8">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Contacts Total</CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{contacts.length}</div>
                <p className="text-xs text-muted-foreground">
                  {contacts.filter(c => c.status === 'nouveau').length} nouveaux
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Inscriptions Concert</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{registrations.length}</div>
                <p className="text-xs text-muted-foreground">
                  Total des inscriptions
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Dernière activité</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {contacts.length > 0 || registrations.length > 0 ? 'Récent' : 'Aucune'}
                </div>
                <p className="text-xs text-muted-foreground">
                  Activité des utilisateurs
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="contacts" className="space-y-4">
          <TabsList>
            <TabsTrigger value="contacts">Messages de contact</TabsTrigger>
            <TabsTrigger value="registrations">Inscriptions concert</TabsTrigger>
          </TabsList>
          
          <TabsContent value="contacts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Messages de contact</CardTitle>
                <CardDescription>
                  Gérez les messages reçus via le formulaire de contact
                </CardDescription>
              </CardHeader>
              <CardContent>
                {contacts.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    Aucun message de contact reçu
                  </p>
                ) : (
                  <div className="space-y-4">
                    {contacts.map((contact) => (
                      <Card key={contact.id} className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold">{contact.nom}</h4>
                            <p className="text-sm text-muted-foreground">{contact.email}</p>
                            {contact.telephone && (
                              <p className="text-sm text-muted-foreground">{contact.telephone}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(contact.status)}
                            <select
                              value={contact.status}
                              onChange={(e) => updateContactStatus(contact.id, e.target.value)}
                              className="text-sm border rounded px-2 py-1"
                            >
                              <option value="nouveau">Nouveau</option>
                              <option value="traite">Traité</option>
                              <option value="resolu">Résolu</option>
                            </select>
                          </div>
                        </div>
                        <p className="text-sm mb-2">{contact.message}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(contact.created_at).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="registrations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Inscriptions au concert</CardTitle>
                <CardDescription>
                  Liste des personnes inscrites au concert
                </CardDescription>
              </CardHeader>
              <CardContent>
                {registrations.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    Aucune inscription au concert
                  </p>
                ) : (
                  <div className="space-y-4">
                    {registrations.map((registration) => (
                      <Card key={registration.id} className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold">{registration.nom}</h4>
                            <p className="text-sm text-muted-foreground">{registration.email}</p>
                            <p className="text-sm text-muted-foreground">{registration.telephone}</p>
                            {registration.ticket_id && (
                              <p className="text-xs text-muted-foreground mt-1">
                                Ticket ID: {registration.ticket_id}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">
                              {new Date(registration.created_at).toLocaleDateString('fr-FR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;