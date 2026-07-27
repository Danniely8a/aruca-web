import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

function buildSystemPrompt(products: any[], knowledgeBase: any[]): string {
  const productContext = products.slice(0, 150).map(p =>
    `- ${p.brand} ${p.name} (${p.model}): ${p.description}. Categoría: ${p.category}, Subcategoría: ${p.subcategory}`
  ).join('\n');

  const kbContext = knowledgeBase.map(kb =>
    `Pregunta: "${kb.question_pattern}" → Respuesta: "${kb.answer}"`
  ).join('\n');

  return `Eres el asistente virtual de ARUCA Maquinarias, una empresa venezolana con más de 50 años de experiencia en distribución de maquinaria profesional para la industria de la madera.

INSTRUCCIONES:
- Responde SIEMPRE en español
- Sé amable, profesional y conciso
- Si no sabes algo, di "No tengo esa información, pero puedes escribirnos por WhatsApp al +58 412 610 9597 para más detalles"
- Para cotizaciones, orienta al usuario a usar el formulario de cotización o WhatsApp
- Usa emojis con moderación (1-2 por mensaje máximo)
- Responde en máximo 3-4 oraciones a menos que te pidan más detalle
- Si el usuario quiere hablar con una persona, ofrece el WhatsApp

INFORMACIÓN DE LA EMPRESA:
- Nombre: ARUCA Maquinarias
- Ubicación: Carrera Petare - Santa Lucía, Caracas 1073, Miranda, Venezuela
- Teléfono: (0212) 532-1996
- WhatsApp: +58 412 610 9597
- Email: aruca.maquinarias@gmail.com
- Horario: Lunes a Viernes 8:00 AM - 5:00 PM, Sábados 8:00 AM - 12:00 PM
- Instagram: @arucavzla
- Web: arucamaquinarias.com

MARCAS QUE DISTRIBUIMOS:
${products.length > 0 ? [...new Set(products.map(p => p.brand))].join(', ') : 'Makita, REXON, CMT, BlueXpress, Euroair, FIRST, GAV, y más'}

PRODUCTOS DISPONIBLES (muestra representativa):
${productContext}

BASE DE CONOCIMIENTO (respuestas frecuentes):
${kbContext}

CATEGORÍAS PRINCIPALES:
- Maquinaria para Madera (sierras, ingletadoras, trompos, cepillos, etc.)
- Herramientas Eléctricas (taladros, lijadoras, esmeriles, etc.)
- Herramientas de Corte (discos, fresas, cuchillas)
- Compresores (Euroair, Shamal)
- Pinturas y Acabados (PPG, ICA, Titebond)
- Accesorios y Consumibles

RESPUESTAS ESPECIALES:
- Si preguntan por precios: "Para precios actualizados, te recomiendo contactar a nuestro equipo por WhatsApp al +58 412 610 9597. Ellos te darán la mejor cotización."
- Si preguntan por disponibilidad: "Tenemos amplio inventario. Para confirmar disponibilidad de un producto específico, escríbenos por WhatsApp."
- Si el usuario se enoja o frustra: "Lamento no haber podido ayudarte mejor. Para atención personalizada, puedes llamarnos al (0212) 532-1996 o escribirnos por WhatsApp."
- Si preguntan por envíos: "Realizamos envíos a toda Venezuela. El costo depende de la ubicación y los productos. Consulta por WhatsApp para cotizar tu envío."
- Si no entiendes la pregunta: "No estoy seguro de entender tu pregunta. ¿Podrías reformularla? También puedes escribirnos por WhatsApp para atención directa."`;
}

export async function POST(request: NextRequest) {
  try {
    const { message, sessionId } = await request.json();

    if (!message || !sessionId) {
      return NextResponse.json({ error: 'Message and sessionId required' }, { status: 400 });
    }

    if (!GEMINI_API_KEY) {
      return NextResponse.json({ error: 'Gemini API key not configured' }, { status: 500 });
    }

    // Get recent chat history for context
    const { data: recentChats } = await supabase
      .from('chat_logs')
      .select('role, message')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true })
      .limit(20);

    // Get knowledge base
    const { data: knowledgeBase } = await supabase
      .from('knowledge_base')
      .select('question_pattern, answer')
      .eq('is_active', true)
      .limit(50);

    // Get products for context
    const { data: products } = await supabase
      .from('products')
      .select('brand, name, model, description, category, subcategory')
      .limit(200);

    const systemPrompt = buildSystemPrompt(products || [], knowledgeBase || []);

    // Build conversation history for Gemini
    const contents: any[] = [];

    if (recentChats && recentChats.length > 0) {
      for (const chat of recentChats) {
        contents.push({
          role: chat.role === 'user' ? 'user' : 'model',
          parts: [{ text: chat.message }]
        });
      }
    }

    // Add current message
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    // Call Gemini API
    const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
          topP: 0.8,
          topK: 40,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Gemini API error:', error);
      return NextResponse.json({ error: 'AI service error' }, { status: 500 });
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Lo siento, no pude generar una respuesta. Intenta de nuevo o escríbenos por WhatsApp.';

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
