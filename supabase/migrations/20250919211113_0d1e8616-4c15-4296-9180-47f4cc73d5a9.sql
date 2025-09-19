-- Fix security vulnerability in concert registration system
-- Replace overly permissive policy with secure validation

-- Add basic constraints for data validation
ALTER TABLE public.inscriptions_concert 
ADD CONSTRAINT inscriptions_concert_email_format 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

ALTER TABLE public.inscriptions_concert 
ADD CONSTRAINT inscriptions_concert_nom_not_empty 
CHECK (char_length(trim(nom)) >= 1 AND char_length(nom) <= 100);

-- Create a function to implement basic rate limiting
CREATE OR REPLACE FUNCTION public.check_registration_rate_limit()
RETURNS boolean AS $$
DECLARE
    recent_count integer;
BEGIN
    -- Check registrations in the last 15 minutes
    SELECT COUNT(*) 
    INTO recent_count
    FROM public.inscriptions_concert 
    WHERE created_at > (NOW() - INTERVAL '15 minutes');
    
    -- Allow maximum 30 registrations per 15 minutes (prevents mass spam)
    RETURN recent_count < 30;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create a function to prevent duplicate registrations
CREATE OR REPLACE FUNCTION public.prevent_duplicate_registration(
    p_email text,
    p_nom text
)
RETURNS boolean AS $$
DECLARE
    existing_count integer;
BEGIN
    -- Check for existing registration with same email and name in last 24 hours
    SELECT COUNT(*) 
    INTO existing_count
    FROM public.inscriptions_concert 
    WHERE LOWER(trim(email)) = LOWER(trim(p_email))
    AND LOWER(trim(nom)) = LOWER(trim(p_nom))
    AND created_at > (NOW() - INTERVAL '24 hours');
    
    -- Return true if no duplicate found
    RETURN existing_count = 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Drop the vulnerable policy
DROP POLICY IF EXISTS "Users can register themselves" ON public.inscriptions_concert;

-- Create a secure policy with proper validation
CREATE POLICY "Secure concert registration" 
ON public.inscriptions_concert 
FOR INSERT 
WITH CHECK (
    -- Validate email format
    email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND
    -- Validate name is not empty  
    char_length(trim(nom)) >= 1
    AND
    -- Validate telephone if provided
    (telephone IS NULL OR char_length(trim(telephone)) >= 3)
    AND
    -- Check rate limiting
    public.check_registration_rate_limit()
    AND
    -- Prevent duplicate registrations
    public.prevent_duplicate_registration(email, nom)
);

-- Add simple indexes for better performance
CREATE INDEX idx_inscriptions_email ON public.inscriptions_concert (email);
CREATE INDEX idx_inscriptions_created_at ON public.inscriptions_concert (created_at);