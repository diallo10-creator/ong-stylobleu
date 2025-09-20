import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `Tu es l'assistant virtuel de l'ONG Stylo Bleu, une organisation non gouvernementale basée à Abidjan, en Côte d'Ivoire, qui œuvre pour l'éducation des enfants.

INFORMATIONS SUR L'ORGANISATION :
- Nom : ONG Stylo Bleu
- Mission : Œuvrer pour l'éducation des enfants en Côte d'Ivoire
- Devise : "Chaque enfant scolarisé est une fierté pour sa famille et une assurance pour le progrès de la nation"
- Localisation : Abidjan, Côte d'Ivoire
- Contact : Ongstylobleu@gmail.com, 0586581601
- Statut : Organisation Non Gouvernementale (ONG)

NOS ACTIONS PRINCIPALES :
- Distribution de matériel scolaire aux enfants défavorisés
- Soutien scolaire et accompagnement pédagogique
- Sensibilisation des familles à l'importance de l'éducation
- Partenariats éducatifs avec les écoles locales
- Programmes de bourses pour les enfants méritants

Tu peux répondre aux questions sur :
- L'organisation (mission, actions, historique, contacts)
- L'éducation et le développement des enfants
- Les méthodes d'apprentissage et le soutien scolaire
- Comment faire un don ou devenir bénévole
- Les difficultés scolaires et l'accompagnement parental
- Les ressources éducatives disponibles
- Le contexte éducatif en Côte d'Ivoire

Réponds toujours en français, de manière bienveillante, professionnelle et avec enthousiasme pour notre cause. Si on te pose des questions sans rapport avec l'éducation ou notre organisation, redirige poliment vers nos domaines d'expertise.`
          },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 500
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('OpenAI API Error:', data);
      throw new Error(data.error?.message || 'Erreur API OpenAI');
    }

    const reply = data.choices[0].message.content;

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erreur dans chat-assistant:', error);
    return new Response(JSON.stringify({ 
      error: 'Une erreur est survenue. Veuillez réessayer.' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});