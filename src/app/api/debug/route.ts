import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing',
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing',
    supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Set' : '❌ Missing',
    nextAuthSecret: process.env.NEXTAUTH_SECRET ? '✅ Set' : '❌ Missing',
    nextAuthUrl: process.env.NEXTAUTH_URL || 'Not set',
  });
}

