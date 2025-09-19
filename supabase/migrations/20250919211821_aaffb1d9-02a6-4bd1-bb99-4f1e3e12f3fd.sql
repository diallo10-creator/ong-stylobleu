-- Create authentication system - drop and recreate policies safely

-- Create enum for roles (if it doesn't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role') THEN
        CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
    END IF;
END $$;

-- Handle role column type conversion safely
DO $$
DECLARE
    column_type TEXT;
BEGIN
    -- Check current column type
    SELECT data_type INTO column_type 
    FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'profiles' 
    AND column_name = 'role';
    
    -- Only convert if it's currently text type
    IF column_type = 'text' THEN
        ALTER TABLE public.profiles ALTER COLUMN role DROP DEFAULT;
        ALTER TABLE public.profiles ALTER COLUMN role TYPE app_role USING 
            CASE 
                WHEN role = 'admin' THEN 'admin'::app_role
                WHEN role = 'moderator' THEN 'moderator'::app_role  
                ELSE 'user'::app_role
            END;
        ALTER TABLE public.profiles ALTER COLUMN role SET DEFAULT 'user'::app_role;
    END IF;
END $$;

-- Add full_name column if it doesn't exist
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS full_name TEXT;

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create security functions
CREATE OR REPLACE FUNCTION public.get_user_role(user_uuid UUID)
RETURNS app_role AS $$
DECLARE
    user_role app_role;
BEGIN
    SELECT role INTO user_role
    FROM public.profiles
    WHERE user_id = user_uuid
    LIMIT 1;
    
    RETURN COALESCE(user_role, 'user'::app_role);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.has_role(user_uuid UUID, required_role app_role)
RETURNS boolean AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE user_id = user_uuid AND role = required_role
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Drop all existing policies on profiles table
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Create new policies for profiles
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"  
ON public.profiles FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles"
ON public.profiles FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Update existing table policies to use proper admin role checking
DROP POLICY IF EXISTS "Only authenticated admins can view contacts" ON public.contacts;
CREATE POLICY "Only authenticated admins can view contacts"
ON public.contacts FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Only authenticated admins can view registrations" ON public.inscriptions_concert;
CREATE POLICY "Only authenticated admins can view registrations"  
ON public.inscriptions_concert FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Create user signup trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.profiles (user_id, email, full_name, role)
    VALUES (
        NEW.id, 
        NEW.email, 
        NEW.raw_user_meta_data->>'full_name',
        'user'::app_role
    )
    ON CONFLICT (user_id) DO NOTHING;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();