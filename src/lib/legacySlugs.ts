// Mapa de slugs antiguos (productos renombrados/eliminados) -> slug actual.
// Si alguien entra a un link viejo, se redirige al producto equivalente.
export const LEGACY_SLUGS: Record<string, string> = {
  // Pony Jorgensen (links antiguos del home)
  "pj-60400-burros-con-prensas": "pony-jorgensen-60400",
  "pj-70800-multiherramienta": "pony-jorgensen-70800",
  "pj-70931-kit-tipo-dremel-de-51pcs": "pony-jorgensen-70931",
  "pj-29050-prensa-de-banco-industrial": "pony-jorgensen-29050",

  // Acoples
  "gav-acople-acople-rapido-de-seguridad-airblok-ab1": "gav-acople-rapido-de-seguridad-1-4-m",
  "gav-acople-rapido-espiga-1-4-d6ap001": "gav-acople-rapido-univ-con-espiga-1-4",

  // Conexiones y espigas
  "gav-conexion-pps-1-2": "gav-conexion-p-sistema-pps",
  "gav-espigaxespiga-1-4-66e2-1": "gav-espiga-x-espiga-1-4",
  "gav-espigaxespiga-3-8-66e2-2": "gav-espiga-x-espiga-3-8",

  // Filtros, reguladores, lubricadores y FRL
  "gav-filtro-linea-1-2-f200": "gav-filtro-en-linea-1-2",
  "gav-filtro-linea-6mm-30601": "gav-filtro-en-linea-1-4",
  "gav-filtro-herramienta-1-4-at1042": "gav-filtro-para-herramienta-1-4",
  "gav-regulador-1-2-fr200": "gav-filtro-regulador-1-2",
  "gav-regulador-1-4-fr180": "gav-filtro-regulador-1-4",
  "gav-regulador-1-4-gfr180l": "gav-filtro-regulador-lubricador-1-4",
  "gav-lubricador-herramienta-1-4-at0142": "gav-lubricador-para-herramienta-1-4",
  "gav-regulador-1-4-at1043": "gav-regulador-para-herramienta-1-4",
  "gav-regulador-1-4-at0143": "gav-regulador-para-herramienta-1-4",

  // Reguladores
  "gav-regulador-1-2-r200": "gav-regulador-c-manometro-1-2",
  "gav-regulador-1-2-r200b": "gav-regulador-c-manometro-1-2",
  "gav-regulador-1-4-r180": "gav-regulador-c-manometro-1-4",
  "gav-regulador-1-2-rpf188": "gav-regulador-c-manometro-1-2",
  "gav-regulador-1-4-l180": "gav-regulador-c-manometro-1-4",

  // Kits de recambio (por talla de boquilla)
  "gav-kit-recambio-1-2mmmm-soplado": "gav-kit-de-recambio-para-record-d-12",
  "gav-kit-recambio-1-4mmmm-soplado": "gav-kit-de-recambio-para-record-d-15",
  "gav-kit-recambio-2-0mmmm-soplado": "gav-kit-de-recambio-para-record-d-20",
  "gav-kit-recambio-2-2mmmm-pintar": "gav-kit-de-recambio-para-record-d-22",
  "gav-kit-recambio-2-4mmmm-pintar": "gav-kit-de-recambio-para-record-d-25",

  // Sistemas PPS
  "gav-kitpps-180-ml-qps-01": "gav-sistema-pps-180ml",
  "gav-kitpps-400-ml-qps-02": "gav-sistema-pps-400ml",
  "gav-kitpps-600-ml-qps-03": "gav-sistema-pps-600ml",

  // Mangueras y enrolladores
  "gav-mangroll-10-14.5-at011411": "gav-enrollador-manguera-d10-x-15mts",
  "gav-mangesp-6-8-gru20-6": "gav-manguera-espiral-6x8mm-20mtrs",
  "gav-mangsanit-1-4-3020-1": "gav-manguera-sanitaria-1-4-x-metro",
  "gav-mangsanit-3-8-3020-3": "gav-manguera-sanitaria-3-8-x-metro",
  "gav-mangsanit-5-16-3020-2": "gav-manguera-sanitaria-5-16-x-metro",

  // Pistolas
  "gav-pistola-pistola-de-gravedad-regda95154": "gav-pistola-de-gravedad-record-2200",
  "gav-pistola-pistola-de-succion-regda-5179": "gav-pistola-de-succion-record-2000",
  "gav-pistola-pistola-de-aire-60a-3": "gav-pistola-para-soplar-prof",
  "gav-pistola-pistola-para-soplar-pico-largo-60ap15": "gav-pistola-para-soplar-pico-largo-prof",

  // Racords cónicos
  "gav-raccord-4-1-8-recto-rrg33-7-4": "gav-racord-conico-1-8-recto-4mm",
  "gav-raccord-6-1-8-recto-rrg33-7-6": "gav-racord-conico-1-8-recto-6mm",
  "gav-raccord-6-1-8-90-rrg33-7-6b": "gav-racord-conico-1-8-90-6mm",
  "gav-raccord-8-1-8-recto-rrg33-7-8b": "gav-racord-conico-1-8-recto-8mm",
  "gav-raccord-8-1-4-recto-rrg33-7-8": "gav-racord-conico-1-8-recto-8mm",
  "gav-raccord-8-1-4-90-rrg33-7-8c": "gav-racord-conico-1-8-90-8mm",

  // Tapas y válvulas de drenaje
  "gav-tapa-antigoteos-d6ap008": "gav-tapa-antisalpicado",
  "gav-valvdren-1-2-54a-3": "gav-valvula-de-drenaje-1-2",
  "gav-valvdren-1-4-54a-4": "gav-valvula-de-drenaje-1-4",
  "gav-valvdren-3-8-54a-4b": "gav-valvula-de-drenaje-3-8",
};
