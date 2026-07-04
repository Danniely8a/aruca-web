export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features?: string[];
}

export const services: Service[] = [
  {
    id: "venta-equipos",
    title: "Venta de Equipos",
    description: "Amplio catálogo de maquinaria profesional para la industria de la madera. Marcas reconocidas internacionalmente con garantía y soporte técnico.",
    icon: "shopping-cart",
    features: [
      "Maquinaria nueva y original",
      "Garantía de fábrica",
      "Asesoría en selección",
      "Financiamiento disponible",
    ],
  },
  {
    id: "asesoria-tecnica",
    title: "Asesoría Técnica",
    description: "Equipo de expertos que te ayuda a elegir la maquinaria y herramientas adecuadas para cada proyecto y aplicación específica.",
    icon: "wrench",
    features: [
      "Consultoría personalizada",
      "Especificaciones técnicas",
      "Comparativas de equipos",
      "Soporte postventa",
    ],
  },
  {
    id: "cotizaciones",
    title: "Cotizaciones Rápidas",
    description: "Solicita cotizaciones detalladas de forma rápida y eficiente. Respuesta en menos de 24 horas para urgencias.",
    icon: "file-text",
    features: [
      "Respuesta en 24 horas",
      "Cotización detallada",
      "Precios competitivos",
      "Envío a todo el país",
    ],
  },
  {
    id: "afilado",
    title: "Afilado de Herramientas",
    description: "Servicio profesional de afilado de sierras, fresas, discos de corte y herramientas de corte para mantener el máximo rendimiento.",
    icon: "scissors",
    features: [
      "Afilado profesional",
      "Sierras circulares",
      "Fresas y discos",
      "Calidad garantizada",
    ],
  },
  {
    id: "reparacion",
    title: "Reparación y Mantenimiento",
    description: "Servicio técnico especializado en reparación y mantenimiento de compresores, maquinaria y herramientas eléctricas.",
    icon: "settings",
    features: [
      "Diagnóstico gratuito",
      "Repuestos originales",
      "Mantenimiento preventivo",
      "Servicio a domicilio",
    ],
  },
];
