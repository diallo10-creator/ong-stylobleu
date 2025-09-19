-- Fix security vulnerability in concert registration system
-- Add rate limiting and validation to prevent data harvesting and spam

-- Add email format validation (most important for security)
ALTER TABLE public.inscriptions_concert 
ADD CONSTRAINT inscriptions_concert_email_format 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Add name length validation (prevent empty or excessively long names)
ALTER TABLE public.inscriptions_concert 
ADD CONSTRAINT inscriptions_concert_nom_length 
CHECK (char_length(trim(nom)) >= 1 AND char_length(nom) <= 100);

-- Create a function to implement basic rate limiting
CREATE OR REPLACE FUNCTION public.check_registration_rate_limit()
RETURNS boolean AS $$
DECLARE
    recent_registrations integer;
BEGIN
    -- Check registrations in the last 15 minutes globally
    SELECT COUNT(*) 
    INTO recent_registrations
    FROM public.inscriptions_concert 
    WHERE created_at > NOW() - INTERVAL '15 minutes';
    
    -- Allow maximum 20 registrations per 15 minutes globally (prevents mass spam)
    RETURN recent_registrations < 20;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create a function to detect duplicate registrations (spam prevention)
CREATE OR REPLACE FUNCTION public.is_valid_registration(
    p_email text,
    p_nom text
)
RETURNS boolean AS $$
DECLARE
    duplicate_count integer;
BEGIN
    -- Check for duplicate email+name combinations in the last 24 hours
    SELECT COUNT(*) 
    INTO duplicate_count
    FROM public.inscriptions_concert 
    WHERE LOWER(email) = LOWER(p_email)
    AND LOWER(trim(nom)) = LOWER(trim(p_nom))
    AND created_at > NOW() - INTERVAL '24 hours';
    
    -- Reject if same person already registered in 24h
    RETURN duplicate_count = 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Users can register themselves" ON public.inscriptions_concert;

-- Create a new, more secure policy for registrations
CREATE POLICY "Secure concert registration" 
ON public.inscriptions_concert 
FOR INSERT 
WITH CHECK (
    -- Validate email format 
    email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND
    -- Validate name is not empty
    char_length(trim(nom)) >= 1 AND char_length(nom) <= 100
    AND
    -- Basic telephone validation (allow various formats but not empty)
    (telephone IS NULL OR char_length(trim(telephone)) >= 3)
    AND
    -- Check rate limiting to prevent spam
    public.check_registration_rate_limit()
    AND
    -- Check for duplicate registrations
    public.is_valid_registration(email, nom)
);

-- Add indexes to improve performance for the security checks
CREATE INDEX IF NOT EXISTS idx_inscriptions_concert_email_recent 
ON public.inscriptions_concert (LOWER(email), created_at) 
WHERE created_at > NOW() - INTERVAL '24 hours';

CREATE INDEX IF NOT EXISTS idx_inscriptions_concert_recent 
ON public.inscriptions_concert (created_at) 
WHERE created_at > NOW() - INTERVAL '24 hours';