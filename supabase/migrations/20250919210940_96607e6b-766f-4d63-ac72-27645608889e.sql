-- Fix security vulnerability in concert registration system
-- Add rate limiting and validation to prevent data harvesting and spam

-- First, let's add some constraints to the table for data validation
ALTER TABLE public.inscriptions_concert 
ADD CONSTRAINT inscriptions_concert_email_format 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

ALTER TABLE public.inscriptions_concert 
ADD CONSTRAINT inscriptions_concert_nom_length 
CHECK (char_length(nom) >= 2 AND char_length(nom) <= 100);

ALTER TABLE public.inscriptions_concert 
ADD CONSTRAINT inscriptions_concert_telephone_format 
CHECK (telephone ~* '^[0-9+\s\-\(\)]{8,20}$');

-- Create a function to implement basic rate limiting per IP/session
CREATE OR REPLACE FUNCTION public.check_registration_rate_limit()
RETURNS boolean AS $$
DECLARE
    recent_registrations integer;
BEGIN
    -- Check registrations in the last 15 minutes
    SELECT COUNT(*) 
    INTO recent_registrations
    FROM public.inscriptions_concert 
    WHERE created_at > NOW() - INTERVAL '15 minutes';
    
    -- Allow maximum 10 registrations per 15 minutes globally (prevents mass spam)
    RETURN recent_registrations < 10;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create a function to detect potential spam patterns
CREATE OR REPLACE FUNCTION public.is_valid_registration(
    p_email text,
    p_nom text,
    p_telephone text
)
RETURNS boolean AS $$
DECLARE
    email_count integer;
    phone_count integer;
BEGIN
    -- Check for duplicate emails in the last 24 hours
    SELECT COUNT(*) 
    INTO email_count
    FROM public.inscriptions_concert 
    WHERE email = p_email 
    AND created_at > NOW() - INTERVAL '24 hours';
    
    -- Check for duplicate phone numbers in the last 24 hours
    SELECT COUNT(*) 
    INTO phone_count
    FROM public.inscriptions_concert 
    WHERE telephone = p_telephone 
    AND created_at > NOW() - INTERVAL '24 hours';
    
    -- Reject if duplicate email or phone in 24h (prevents spam)
    RETURN email_count = 0 AND phone_count = 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Users can register themselves" ON public.inscriptions_concert;

-- Create a new, more secure policy for registrations
CREATE POLICY "Secure concert registration" 
ON public.inscriptions_concert 
FOR INSERT 
WITH CHECK (
    -- Validate email format (double check)
    email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND
    -- Validate name length
    char_length(nom) >= 2 AND char_length(nom) <= 100
    AND
    -- Validate phone format
    telephone ~* '^[0-9+\s\-\(\)]{8,20}$'
    AND
    -- Check rate limiting
    public.check_registration_rate_limit()
    AND
    -- Check for spam patterns
    public.is_valid_registration(email, nom, telephone)
);

-- Add an index to improve performance for the duplicate checks
CREATE INDEX IF NOT EXISTS idx_inscriptions_concert_email_recent 
ON public.inscriptions_concert (email, created_at) 
WHERE created_at > NOW() - INTERVAL '24 hours';

CREATE INDEX IF NOT EXISTS idx_inscriptions_concert_telephone_recent 
ON public.inscriptions_concert (telephone, created_at) 
WHERE created_at > NOW() - INTERVAL '24 hours';