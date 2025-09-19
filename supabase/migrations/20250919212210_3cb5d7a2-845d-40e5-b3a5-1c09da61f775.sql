-- Create first admin user
-- This is a one-time setup to create the first admin account
-- You can sign up with this email and it will be automatically set to admin role

-- Insert initial admin role assignment
-- Note: This will only work if a user with this email signs up
INSERT INTO public.profiles (user_id, email, role) 
SELECT 
  auth.users.id,
  auth.users.email,
  'admin'::app_role
FROM auth.users
WHERE auth.users.email = 'admin@ongstylobleu.com'
ON CONFLICT (user_id) DO UPDATE SET role = 'admin'::app_role;

-- Create a function to promote user to admin (can be called manually)
CREATE OR REPLACE FUNCTION public.promote_to_admin(user_email TEXT)
RETURNS boolean AS $$
DECLARE
    target_user_id UUID;
BEGIN
    -- Find user by email
    SELECT id INTO target_user_id 
    FROM auth.users 
    WHERE email = user_email;
    
    IF target_user_id IS NULL THEN
        RETURN false;
    END IF;
    
    -- Update or insert admin role
    INSERT INTO public.profiles (user_id, email, role)
    VALUES (target_user_id, user_email, 'admin'::app_role)
    ON CONFLICT (user_id) 
    DO UPDATE SET role = 'admin'::app_role;
    
    RETURN true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;