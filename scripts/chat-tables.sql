-- Chat logs table
CREATE TABLE IF NOT EXISTS chat_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  message TEXT NOT NULL,
  feedback SMALLINT DEFAULT 0, -- -1 = thumbs down, 0 = no feedback, 1 = thumbs up
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Knowledge base for improved answers
CREATE TABLE IF NOT EXISTS knowledge_base (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question_pattern TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  times_used INTEGER DEFAULT 0,
  times_feedback_positive INTEGER DEFAULT 0,
  times_feedback_negative INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat sessions
CREATE TABLE IF NOT EXISTS chat_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT UNIQUE NOT NULL,
  visitor_name TEXT,
  visitor_email TEXT,
  resolved BOOLEAN DEFAULT FALSE,
  escalated_to_whatsapp BOOLEAN DEFAULT FALSE,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ended_at TIMESTAMP WITH TIME ZONE
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_chat_logs_session ON chat_logs(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_logs_created ON chat_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_logs_feedback ON chat_logs(feedback) WHERE feedback != 0;
CREATE INDEX IF NOT EXISTS idx_knowledge_base_category ON knowledge_base(category);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_resolved ON chat_sessions(resolved);

-- RLS policies
ALTER TABLE chat_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;

-- Allow anon to insert chat logs and sessions
CREATE POLICY "Allow anon insert chat_logs" ON chat_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon insert chat_sessions" ON chat_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon update chat_sessions" ON chat_sessions FOR UPDATE USING (true);

-- Allow anon to read knowledge base
CREATE POLICY "Allow anon read knowledge_base" ON knowledge_base FOR SELECT USING (is_active = true);

-- Allow service role full access
CREATE POLICY "Service role full access chat_logs" ON chat_logs FOR ALL USING (true);
CREATE POLICY "Service role full access chat_sessions" ON chat_sessions FOR ALL USING (true);
CREATE POLICY "Service role full access knowledge_base" ON knowledge_base FOR ALL USING (true);

-- Seed knowledge base with common ARUCA questions
INSERT INTO knowledge_base (question_pattern, answer, category) VALUES
('horario|hora|abren|cierran|atienden', 'ARUCA Maquinarias atiende de lunes a viernes de 8:00 AM a 5:00 PM, y sábados de 8:00 AM a 12:00 PM.', 'general'),
('ubicacion|direccion|donde|mapa|llegar', 'Estamos ubicados en Carrera Petare - Santa Lucía, Caracas 1073, Miranda, Venezuela.', 'general'),
('telefono|contacto|llamar|whatsapp', 'Puedes contactarnos al WhatsApp +58 412 610 9597 o al correo ventas@arucamaquinarias.com', 'contacto'),
('cotizacion|presupuesto|precio|costo', 'Para solicitar una cotización, puedes usar nuestro formulario de cotización en la página o escribirnos por WhatsApp. Atendemos en menos de 24 horas.', 'ventas'),
('envio|entrega|despacho|hacer llegar', 'Realizamos envíos a toda Venezuela. El costo y tiempo de entrega dependen de la ubicación y los productos. Consulta por WhatsApp para cotizar el envío.', 'logistica'),
('garantia|devolucion|cambio|reclamo', 'Todos nuestros productos cuentan con garantía del fabricante. Para reclamos o cambios, contáctanos por WhatsApp con tu factura de compra.', 'soporte'),
('pago|abono|transferencia|efectivo|tarjeta', 'Aceptamos transferencias bancarias, pagos móviles, efectivo y tarjetas de crédito/débito. Consulta por las opciones disponibles.', 'ventas'),
('marca|makita|rexon|cmt|blue', 'Trabajamos con las mejores marcas: Makita, REXON, CMT Orange Tools, CMT Contractor, BlueXpress, Euroair, FIRST, GAV, y muchas más. ¿Buscas una marca específica?', 'productos'),
('sierra|cortar|madera|corte', 'Tenemos una amplia variedad de sierras: circulares, caladoras, de banda, ingletadoras y más. ¿Qué tipo de corte necesitas?', 'productos'),
('compresor|aire|neumati', 'Somos distribuidores de compresores Euroair y Shamal, desde 1/2 HP hasta 15 HP. ¿Necesitas un compresor para uso doméstico o industrial?', 'productos'),
('tornillo|herramienta|taladro|lijadora', 'Tenemos taladros, lijadoras, atornilladores y todo tipo de herramientas eléctricas y manuales. ¿Qué herramienta necesitas?', 'productos'),
('hablar|persona|humano|agente|asesor', 'Para hablar con un asesor, haz clic en el botón de WhatsApp o escribe al +58 412 610 9597. Un asesor te atenderá en minutos.', 'general'),
('gracias|perfecto|excelente|bien', '¡Con gusto! Si necesitas algo más, no dudes en preguntar. ¡Estamos aquí para ayudarte!', 'general')
ON CONFLICT DO NOTHING;
