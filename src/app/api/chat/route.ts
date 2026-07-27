import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

function textToEmbedding(text: string): number[] {
  const words = text.toLowerCase().match(/\w+/g) || [];
  const embedding = new Array(384).fill(0);

  for (const word of words) {
    const h = crypto.createHash('md5').update(word).digest('hex');
    const idx = parseInt(h, 16) % 384;
    embedding[idx] += 1.0;
    embedding[(idx + 1) % 384] += 0.5;
    embedding[(idx + 383) % 384] += 0.5;
    embedding[(idx + 7) % 384] += 0.3;
  }

  const norm = Math.sqrt(embedding.reduce((s, x) => s + x * x, 0));
  if (norm > 0) {
    for (let i = 0; i < embedding.length; i++) {
      embedding[i] /= norm;
    }
  }

  return embedding;
}

async function searchRelevantProducts(query: string): Promise<string> {
  try {
    const queryEmbedding = textToEmbedding(query);
    const embeddingStr = '[' + queryEmbedding.join(',') + ']';

    const { data, error } = await supabase.rpc('search_products', {
      query_embedding: embeddingStr,
      match_count: 8,
    });

    if (error || !data || data.length === 0) {
      return '';
    }

    return data.map((p: any) => `- ${p.product_text} (similitud: ${(p.similarity * 100).toFixed(0)}%)`).join('\n');
  } catch (err) {
    console.error('Vector search error:', err);
    return '';
  }
}

function buildSystemPrompt(productResults: string, knowledgeBase: any[]): string {
  const kbContext = knowledgeBase.map(kb =>
    `Pregunta: "${kb.question_pattern}" -> Respuesta: "${kb.answer}"`
  ).join('\n');

  return `Eres el asistente virtual de ARUCA Maquinarias, una empresa venezolana con mas de 50 anhos de experiencia en distribucion de maquinaria profesional para la industria de la madera.

INSTRUCCIONES:
- Responde SIEMPRE en espanol
- Se amable, profesional y conciso
- Si no sabes algo, di "No tengo esa informacion, pero puedes escribirnos por WhatsApp al +58 412 610 9597 para mas detalles"
- Para cotizaciones, orienta al usuario a usar el formulario de cotizacion o WhatsApp
- Usa emojis con moderacion (1-2 por mensaje maximo)
- Responde en maximo 3-4 oraciones a menos que te pidan mas detalle
- Si el usuario quiere hablar con una persona, ofrece el WhatsApp
- Cuando menciones productos, incluye el nombre, marca y modelo exactos
- Si el usuario pregunta por un producto, MENCIONA los productos encontrados por busqueda vectorial

INFORMACION DE LA EMPRESA:
- Nombre: ARUCA Maquinarias
- Ubicacion: Carrera Petare - Santa Lucia, Caracas 1073, Miranda, Venezuela
- Telefono: (0212) 532-1996
- WhatsApp: +58 412 610 9597
- Email: aruca.maquinarias@gmail.com
- Horario: Lunes a Viernes 8:00 AM - 5:00 PM, Sabados 8:00 AM - 12:00 PM
- Instagram: @arucavzla
- Web: arucamaquinarias.com

MARCAS QUE DISTRIBUIMOS:
Makita, REXON, CMT Orange Tools, CMT Contractor, BlueXpress, Euroair, FIRST, GAV, Thorex, Titebond, PPG, ICA, Bremas, Caiman, DAKIN, ICA, EuroTools, MORS, Tigra, Shamal, IPL, Nastroflex, Unicol, ISB, Sambara, Microflex

CATEGORIAS PRINCIPALES:
- Maquinaria para Madera (sierras, ingletadoras, trompos, cepillos, etc.)
- Herramientas Electricas (taladros, lijadoras, esmeriles, etc.)
- Herramientas de Corte (discos, fresas, cuchillas)
- Compresores (Euroair, Shamal)
- Pinturas y Acabados (PPG, ICA, Titebond)
- Accesorios y Consumibles

PRODUCTOS SIMILARES ENCONTRADOS EN LA BASE DE DATOS:
${productResults || 'No se encontraron productos especificos para esta consulta.'}

RESPUESTAS ESPECIALES:
- Si preguntan por precios: "Para precios actualizados, te recomiendo contactar a nuestro equipo por WhatsApp al +58 412 610 9597."
- Si preguntan por disponibilidad: "Tenemos amplio inventario. Para confirmar disponibilidad de un producto especifico, escribenos por WhatsApp."
- Si preguntan por envios: "Realizamos envios a toda Venezuela. El costo depende de la ubicacion y los productos."
- Si no entiendes la pregunta: "No estoy seguro de entender tu pregunta. Podrias reformularla? Tambien puedes escribirnos por WhatsApp."
- Si preguntan por compresores: menciona que somos distribuidores de Euroair y Shamal
- Si preguntan por pintura: menciona PPG, ICA y Titebond`;
}

export async function POST(request: NextRequest) {
  try {
    const { message, sessionId } = await request.json();

    if (!message || !sessionId) {
      return NextResponse.json({ error: 'Message and sessionId required' }, { status: 400 });
    }

    if (!OPENROUTER_API_KEY) {
      return NextResponse.json({ error: 'OpenRouter API key not configured' }, { status: 500 });
    }

    // Vector search for relevant products
    const productResults = await searchRelevantProducts(message);

    // Get recent chat history for context
    const { data: recentChats } = await supabase
      .from('chat_logs')
      .select('role, message')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true })
      .limit(10);

    // Get knowledge base
    const { data: knowledgeBase } = await supabase
      .from('knowledge_base')
      .select('question_pattern, answer')
      .eq('is_active', true)
      .limit(20);

    const systemPrompt = buildSystemPrompt(productResults, knowledgeBase || []);

    // Build messages array
    const messages: any[] = [
      { role: 'system', content: systemPrompt },
    ];

    if (recentChats && recentChats.length > 0) {
      for (const chat of recentChats) {
        messages.push({
          role: chat.role === 'user' ? 'user' : 'assistant',
          content: chat.message,
        });
      }
    }

    messages.push({ role: 'user', content: message });

    // Call OpenRouter API with retry
    let reply = '';
    for (let attempt = 0; attempt < 3; attempt++) {
      if (attempt > 0) await new Promise(r => setTimeout(r, 2000 * attempt));

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 25000);

      const response = await fetch(OPENROUTER_URL, {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'https://arucamaquinarias.com',
          'X-Title': 'ARUCA Maquinarias Chatbot',
        },
        body: JSON.stringify({
          model: 'google/gemma-4-26b-a4b-it:free',
          messages,
          temperature: 0.7,
          max_tokens: 400,
          top_p: 0.8,
        }),
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        reply = data.choices?.[0]?.message?.content || '';
        if (reply) break;
      } else {
        const error = await response.text();
        console.error(`OpenRouter API attempt ${attempt + 1} failed:`, error);
      }
    }

    if (!reply) {
      reply = 'Lo siento, el servicio no esta disponible en este momento. Puedes escribirnos por WhatsApp al +58 412 610 9597 para atencion inmediata.';
    }

    // Save user message
    await supabase.from('chat_logs').insert({
      session_id: sessionId,
      role: 'user',
      message,
    });

    // Save assistant reply
    await supabase.from('chat_logs').insert({
      session_id: sessionId,
      role: 'assistant',
      message: reply,
    });

    // Ensure session exists
    await supabase.from('chat_sessions').upsert(
      { session_id: sessionId },
      { onConflict: 'session_id' }
    );

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
