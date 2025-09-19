import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  nom: string;
  email: string;
  telephone?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    if (req.method === "POST") {
      const formData: ContactFormData = await req.json();
      
      // Validate required fields
      if (!formData.nom || !formData.email || !formData.message) {
        return new Response(
          JSON.stringify({ 
            error: "Tous les champs obligatoires doivent être remplis" 
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        return new Response(
          JSON.stringify({ 
            error: "Format d'email invalide" 
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }

      // Rate limiting check - max 5 submissions per email per hour
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
      
      const { data: recentContacts, error: rateLimitError } = await supabase
        .from('contacts')
        .select('id')
        .eq('email', formData.email)
        .gte('created_at', oneHourAgo);

      if (rateLimitError) {
        console.error('Rate limit check error:', rateLimitError);
      } else if (recentContacts && recentContacts.length >= 5) {
        return new Response(
          JSON.stringify({ 
            error: "Trop de messages envoyés. Veuillez attendre une heure avant de renvoyer un message." 
          }),
          {
            status: 429,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }

      // Insert contact form submission
      const { data, error } = await supabase
        .from('contacts')
        .insert([
          {
            nom: formData.nom.trim(),
            email: formData.email.trim().toLowerCase(),
            telephone: formData.telephone?.trim() || null,
            message: formData.message.trim(),
            status: 'nouveau'
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Database error:', error);
        return new Response(
          JSON.stringify({ 
            error: "Erreur lors de l'enregistrement du message" 
          }),
          {
            status: 500,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }

      console.log('Contact form submitted successfully:', data.id);

      return new Response(
        JSON.stringify({ 
          message: "Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.",
          id: data.id 
        }),
        {
          status: 201,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: "Méthode non autorisée" }),
      {
        status: 405,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error) {
    console.error('Contact form function error:', error);
    return new Response(
      JSON.stringify({ 
        error: "Une erreur interne est survenue" 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);