-- Fix security vulnerability in concert registration system
-- Replace overly permissive policy with secure validation

-- Add email format validation constraint
ALTER TABLE public.inscriptions_concert 
ADD CONSTRAINT inscriptions_concert_email_format 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Add name length validation constraint
ALTER TABLE public.inscriptions_concert 
ADD CONSTRAINT inscriptions_concert_nom_length 
CHECK (char_length(trim(nom)) >= 1 AND char_length(nom) <= 100);

-- Create rate limiting function
CREATE OR REPLACE FUNCTION public.check_registration_rate_limit()
RETURNS boolean AS $$
DECLARE
    recent_registrations integer;
BEGIN
    -- Count registrations in the last 15 minutes
    SELECT COUNT(*) 
    INTO recent_registrations
    FROM public.inscriptions_concert 
    WHERE created_at > NOW() - INTERVAL '15 minutes';
    
    -- Allow maximum 20 registrations per 15 minutes globally
    RETURN recent_registrations < 20;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create duplicate detection function
CREATE OR REPLACE FUNCTION public.prevent_duplicate_registration(
    p_email text,
    p_nom text
)
RETURNS boolean AS $$
DECLARE
    duplicate_count integer;
BEGIN
    -- Check for same email and name in last 24 hours
    SELECT COUNT(*) 
    INTO duplicate_count
    FROM public.inscriptions_concert 
    WHERE LOWER(email) = LOWER(p_email)
    AND LOWER(trim(nom)) = LOWER(trim(p_nom))
    AND created_at > NOW() - INTERVAL '24 hours';
    
    RETURN duplicate_count = 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Drop the insecure policy
DROP POLICY IF EXISTS "Users can register themselves" ON public.inscriptions_concert;

-- Create new secure policy with proper validation
CREATE POLICY "Secure concert registration" 
ON public.inscriptions_concert 
FOR INSERT 
WITH CHECK (
    -- Validate email format
    email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND
    -- Validate name is not empty and reasonable length
    char_length(trim(nom)) >= 1 AND char_length(nom) <= 100
    AND
    -- Validate phone if provided (allow null but not empty strings)
    (telephone IS NULL OR char_length(trim(telephone)) >= 3)
    AND
    -- Rate limiting protection
    public.check_registration_rate_limit()
    AND
    -- Duplicate prevention
    public.prevent_duplicate_registration(email, nom)
);