import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { rateLimitByIp } from '@/lib/auth';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  if (!rateLimitByIp(request, 20, 60 * 1000)) {
    return NextResponse.json({ error: 'Demasiadas solicitudes. Intente de nuevo en un minuto.' }, { status: 429 });
  }

  try {
    const { messageId, feedback, sessionId } = await request.json();

    if (!messageId || feedback === undefined || !sessionId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Update feedback on the chat log
    const { error } = await supabase
      .from('chat_logs')
      .update({ feedback })
      .eq('id', messageId);

    if (error) {
      console.error('Feedback update error:', error);
      return NextResponse.json({ error: 'Failed to save feedback' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Feedback error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
