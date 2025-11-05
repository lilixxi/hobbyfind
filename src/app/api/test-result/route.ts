import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createPureClient } from '@/lib/supabase/server';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ result: null }, { status: 200 });
  }

  const supabase = await createPureClient();
  const { data, error } = await supabase
    .from('test_results')
    .select('result_type, created_at')
    .eq('user_id', session.user.id)
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ result: data }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await req.json().catch(() => ({}));
  const { resultType } = body as { resultType?: 'sports' | 'intelligence' | 'arts' };
  if (!resultType) {
    return NextResponse.json({ error: 'Missing resultType' }, { status: 400 });
  }

  const supabase = await createPureClient();
  // upsert by unique user_id
  const { data, error } = await supabase
    .from('test_results')
    .upsert({ user_id: session.user.id, result_type: resultType })
    .select('result_type, created_at')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ result: data }, { status: 200 });
}


