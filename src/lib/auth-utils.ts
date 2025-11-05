import bcrypt from 'bcryptjs';
import { createPureClient } from './supabase/server';

export interface User {
  id: string;
  email: string;
  name?: string;
  created_at: string;
}

export interface SignUpData {
  email: string;
  password: string;
  name?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function createUser(data: SignUpData): Promise<User | null> {
  try {
    console.log('🔍 Creating user with email:', data.email);
    const supabase = await createPureClient();
    
    // Check if user already exists
    console.log('🔍 Checking if user exists...');
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('id, email')
      .eq('email', data.email)
      .maybeSingle();

    console.log('🔍 Check result:', { existingUser, checkError });

    if (checkError) {
      console.error('❌ Error checking user:', checkError);
    }

    if (existingUser) {
      console.log('❌ User already exists:', existingUser);
      throw new Error('Email already exists');
    }

    console.log('✅ Email is available, creating user...');
    const passwordHash = await hashPassword(data.password);

    const { data: newUser, error } = await supabase
      .from('users')
      .insert({
        email: data.email,
        password_hash: passwordHash,
        name: data.name,
      })
      .select('id, email, name, created_at')
      .single();

    if (error) {
      console.error('❌ Insert error:', error);
      console.error('❌ Error details:', JSON.stringify(error, null, 2));
      throw error;
    }

    console.log('✅ User created successfully:', newUser);
    return newUser;
  } catch (error) {
    console.error('❌ Error creating user:', error);
    if (error instanceof Error) {
      console.error('❌ Error message:', error.message);
      console.error('❌ Error stack:', error.stack);
    }
    return null;
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const supabase = await createPureClient();
    
    const { data, error } = await supabase
      .from('users')
      .select('id, email, name, created_at')
      .eq('email', email)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
}

export async function authenticateUser(
  credentials: SignInData
): Promise<User | null> {
  try {
    const supabase = await createPureClient();
    
    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, name, password_hash, created_at')
      .eq('email', credentials.email)
      .single();

    if (error || !user) {
      return null;
    }

    const isValid = await verifyPassword(
      credentials.password,
      user.password_hash
    );

    if (!isValid) {
      return null;
    }

    const { password_hash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    console.error('Error authenticating user:', error);
    return null;
  }
}

/**
 * Ensure a user exists for OAuth providers. Since our schema requires a password hash,
 * we generate a random hash when creating an account via social login.
 */
export async function ensureOAuthUser(
  emailOrNull: string | null | undefined,
  name?: string | null,
  provider?: string | null,
  providerId?: string | number | null,
  imageUrl?: string | null
): Promise<User | null> {
  try {
    const supabase = await createPureClient();
    const email = emailOrNull ?? (provider && providerId ? `${provider}-${providerId}@oauth.local` : null);
    if (!email) {
      console.error('ensureOAuthUser: cannot derive email');
      return null;
    }
    // Check if user exists
    const { data: existing, error: checkError } = await supabase
      .from('users')
      .select('id, email, name, created_at')
      .eq('email', email)
      .maybeSingle();

    if (checkError) {
      console.error('Error checking OAuth user:', checkError);
    }

    if (existing) return existing;

    // Create with a random password hash to satisfy NOT NULL constraint
    const randomSecret = `${email}:${Date.now()}:${Math.random()}`;
    const passwordHash = await hashPassword(randomSecret);

    const { data: created, error } = await supabase
      .from('users')
      .insert({ email, name: name ?? undefined, password_hash: passwordHash, provider: provider ?? undefined, image: imageUrl ?? undefined })
      .select('id, email, name, created_at')
      .single();

    if (error) {
      console.error('Error creating OAuth user:', error);
      return null;
    }

    return created;
  } catch (e) {
    console.error('ensureOAuthUser error:', e);
    return null;
  }
}

