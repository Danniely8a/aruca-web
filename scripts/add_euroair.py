import os

filepath = os.path.join(os.path.dirname(__file__), '..', 'src', 'lib', 'data', 'products.ts')

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the ]; that closes products array (before productCategories)
marker = 'export const productCategories'
cat_idx = content.find(marker)
end_idx = content.rfind('\n];', 0, cat_idx)

before = content[:end_idx]
after = content[end_idx:]

products = []

def esc(s):
    """Escape double quotes for TypeScript string values."""
    return s.replace('"', '\\"') if s else s

def add(pid, slug, name, model, desc, short, sub, specs=None):
    s = ""
    if specs:
        s = ", specs: { " + ", ".join(f'"{esc(k)}": "{esc(v)}"' for k, v in specs.items()) + " }"
    products.append(
        f'  {{ id: "{esc(pid)}", slug: "{esc(slug)}", name: "{esc(name)}", brand: "Euroair", model: "{esc(model)}", description: "{esc(desc)}", shortDescription: "{esc(short)}", category: "Accesorios para Compresores", subcategory: "{esc(sub)}", image: ""{s} }},\n'
    )

# ─── JUEGOS DE ANILLOS X PISTON ────────────────────────────
add("ea-anp-od-25hp", "euroair-juego-anillos-odontologico-25hp", "Euroair Juego Anillos X Piston Odontologico 2.5HP", "D47", "Juego de anillos para piston odontologico 2.5HP.", "Juego anillos piston od. 2.5HP.", "Anillos", {"Potencia": "2.5HP", "Tipo": "Odontologico"})
add("ea-anp-od", "euroair-juego-anillos-odontologico", "Euroair Juego Anillos X Piston Odontologico", "D51", "Juego de anillos para piston odontologico.", "Juego anillos piston odontologico.", "Anillos", {"Tipo": "Odontologico"})
add("ea-anp-075", "euroair-juego-anillos-075hp", "Euroair Juego Anillos X Piston 0.75HP", "D51", "Juego de anillos para piston 0.75HP.", "Juego anillos 0.75HP.", "Anillos", {"Potencia": "0.75HP", "Codigo": "D51"})
add("ea-anp-075b", "euroair-juego-anillos-075hp-1051", "Euroair Juego Anillos X Piston 0.75HP", "1051", "Juego de anillos para piston 0.75HP.", "Juego anillos 0.75HP.", "Anillos", {"Potencia": "0.75HP", "Codigo": "1051"})
add("ea-anp-1hp", "euroair-juego-anillos-1hp", "Euroair Juego Anillos X Piston 1HP", "D53", "Juego de anillos para piston 1HP.", "Juego anillos 1HP.", "Anillos", {"Potencia": "1HP", "Codigo": "D53"})
add("ea-anp-1hp-1053", "euroair-juego-anillos-1hp-1053", "Euroair Juego Anillos X Piston 1HP", "1053", "Juego de anillos para piston 1HP.", "Juego anillos 1HP.", "Anillos", {"Potencia": "1HP", "Codigo": "1053"})
add("ea-anp-2hp", "euroair-juego-anillos-2hp", "Euroair Juego Anillos X Piston 2HP", "D55", "Juego de anillos para piston 2HP.", "Juego anillos 2HP.", "Anillos", {"Potencia": "2HP", "Codigo": "D55"})
add("ea-anp-2hp-1055", "euroair-juego-anillos-2hp-1055", "Euroair Juego Anillos X Piston 2HP", "1055", "Juego de anillos para piston 2HP.", "Juego anillos 2HP.", "Anillos", {"Potencia": "2HP", "Codigo": "1055"})
add("ea-anp-3hp", "euroair-juego-anillos-3hp", "Euroair Juego Anillos X Piston 3HP", "D90", "Juego de anillos para piston 3HP.", "Juego anillos 3HP.", "Anillos", {"Potencia": "3HP", "Codigo": "D90"})
add("ea-anp-3hp-2070", "euroair-juego-anillos-3hp-2070", "Euroair Juego Anillos X Piston 3HP", "2070", "Juego de anillos para piston 3HP.", "Juego anillos 3HP.", "Anillos", {"Potencia": "3HP", "Codigo": "2070"})
add("ea-anp-4hp", "euroair-juego-anillos-4hp", "Euroair Juego Anillos X Piston 4HP", "D90", "Juego de anillos para piston 4HP.", "Juego anillos 4HP.", "Anillos", {"Potencia": "4HP", "Codigo": "D90"})
add("ea-anp-4hp-2070", "euroair-juego-anillos-4hp-2070", "Euroair Juego Anillos X Piston 4HP", "2070", "Juego de anillos para piston 4HP.", "Juego anillos 4HP.", "Anillos", {"Potencia": "4HP", "Codigo": "2070"})
add("ea-anp-55hp", "euroair-juego-anillos-55hp", "Euroair Juego Anillos X Piston 5.5HP", "D90", "Juego de anillos para piston 5.5HP.", "Juego anillos 5.5HP.", "Anillos", {"Potencia": "5.5HP", "Codigo": "D90"})
add("ea-anp-55hp-2095", "euroair-juego-anillos-55hp-2095", "Euroair Juego Anillos X Piston 5.5HP", "2095", "Juego de anillos para piston 5.5HP.", "Juego anillos 5.5HP.", "Anillos", {"Potencia": "5.5HP", "Codigo": "2095"})
add("ea-anp-710hp-d55", "euroair-juego-anillos-7-10hp", "Euroair Juego Anillos X Piston 7.5 y 10HP", "D55", "Juego de anillos para piston 7.5 y 10HP.", "Juego anillos 7.5 y 10HP.", "Anillos", {"Potencia": "7.5 y 10HP", "Codigo": "D55"})
add("ea-anp-710hp-10105", "euroair-juego-anillos-7-10hp-10105", "Euroair Juego Anillos X Piston 7.5 y 10HP", "10105", "Juego de anillos para piston 7.5 y 10HP.", "Juego anillos 7.5 y 10HP.", "Anillos", {"Potencia": "7.5 y 10HP", "Codigo": "10105"})
add("ea-anp-710hp-d95", "euroair-juego-anillos-7-10hp-d95", "Euroair Juego Anillos X Piston 7.5 y 10HP", "D95", "Juego de anillos para piston 7.5 y 10HP.", "Juego anillos 7.5 y 10HP.", "Anillos", {"Potencia": "7.5 y 10HP", "Codigo": "D95"})
add("ea-anp-710hp-1095", "euroair-juego-anillos-7-10hp-1095", "Euroair Juego Anillos X Piston 7.5 y 10HP", "1095", "Juego de anillos para piston 7.5 y 10HP.", "Juego anillos 7.5 y 10HP.", "Anillos", {"Potencia": "7.5 y 10HP", "Codigo": "1095"})
add("ea-anp-12hp", "euroair-juego-anillos-12hp", "Euroair Juego Anillos X Piston 12HP", "D00", "Juego de anillos para piston 12HP.", "Juego anillos 12HP.", "Anillos", {"Potencia": "12HP", "Codigo": "D00"})
add("ea-anp-15hp", "euroair-juego-anillos-15hp", "Euroair Juego Anillos X Piston 15HP", "D00", "Juego de anillos para piston 15HP.", "Juego anillos 15HP.", "Anillos", {"Potencia": "15HP", "Codigo": "D00"})

# ─── FLAPPERS ──────────────────────────────────────────────
add("ea-fl-lengua-225", "euroair-flappers-tipo-lengua-2-25hp", "Euroair Flappers Tipo Lengua 2HP y 2.5HP", "N/A", "Flappers tipo lengua para compresor 2HP y 2.5HP.", "Flappers tipo lengua 2-2.5HP.", "Flappers", {"Tipo": "Lengua", "Potencia": "2HP y 2.5HP"})
add("ea-fl-lana-1hp", "euroair-flappers-tipo-lana-1hp", "Euroair Flappers Tipo Lana 1HP", "N/A", "Flappers tipo lana para compresor 1HP. U 47mm X 9mm.", "Flappers tipo lana 1HP.", "Flappers", {"Tipo": "Lana", "Potencia": "1HP", "Medida": "U 47mm X 9mm"})
add("ea-fl-lana-2hp", "euroair-flappers-tipo-lana-2hp", "Euroair Flappers Tipo Lana 2HP", "N/A", "Flappers tipo lana para compresor 2HP. U 47mm X 11mm.", "Flappers tipo lana 2HP.", "Flappers", {"Tipo": "Lana", "Potencia": "2HP", "Medida": "U 47mm X 11mm"})
add("ea-fl-lana-3hp", "euroair-flappers-tipo-lana-3hp", "Euroair Flappers Tipo Lana 3HP", "N/A", "Flappers tipo lana para compresor 3HP. U 53mm X 11mm.", "Flappers tipo lana 3HP.", "Flappers", {"Tipo": "Lana", "Potencia": "3HP", "Medida": "U 53mm X 11mm"})

# ─── ASPAS PARA COMPRESOR (PLASTICO) ──────────────────────
add("ea-asp-pl-2hp", "euroair-aspas-compresor-plastico-2hp", "Euroair Aspas para Compresor (Plastico) 2HP", "N/A", "Aspas de plastico para compresor 2HP Coaxial.", "Aspas plastico 2HP Coax.", "Aspas", {"Material": "Plastico", "Potencia": "2HP Coaxial"})
add("ea-asp-pl-25hp", "euroair-aspas-compresor-plastico-25hp", "Euroair Aspas para Compresor (Plastico) 2.5HP", "N/A", "Aspas de plastico para compresor 2.5HP Coaxial.", "Aspas plastico 2.5HP Coax.", "Aspas", {"Material": "Plastico", "Potencia": "2.5HP Coaxial"})

# ─── ASPAS PARA COMPRESOR (ACERO) ─────────────────────────
add("ea-asp-ac-1hp", "euroair-aspas-compresor-acero-1hp", "Euroair Aspas para Compresor (Acero) 1HP", "N/A", "Aspas de acero para compresor 1HP.", "Aspas acero 1HP.", "Aspas", {"Material": "Acero", "Potencia": "1HP"})
add("ea-asp-ac-2hp", "euroair-aspas-compresor-acero-2hp", "Euroair Aspas para Compresor (Acero) 2HP", "N/A", "Aspas de acero para compresor 2HP.", "Aspas acero 2HP.", "Aspas", {"Material": "Acero", "Potencia": "2HP"})
add("ea-asp-ac-3hp", "euroair-aspas-compresor-acero-3hp", "Euroair Aspas para Compresor (Acero) 3HP", "N/A", "Aspas de acero para compresor 3HP.", "Aspas acero 3HP.", "Aspas", {"Material": "Acero", "Potencia": "3HP"})
add("ea-asp-ac-55hp", "euroair-aspas-compresor-acero-55hp", "Euroair Aspas para Compresor (Acero) 5.5HP", "N/A", "Aspas de acero para compresor 5.5HP.", "Aspas acero 5.5HP.", "Aspas", {"Material": "Acero", "Potencia": "5.5HP"})
add("ea-asp-ac-75hp", "euroair-aspas-compresor-acero-75hp", "Euroair Aspas para Compresor (Acero) 7.5HP", "N/A", "Aspas de acero para compresor 7.5HP.", "Aspas acero 7.5HP.", "Aspas", {"Material": "Acero", "Potencia": "7.5HP"})
add("ea-asp-ac-10hp", "euroair-aspas-compresor-acero-10hp", "Euroair Aspas para Compresor (Acero) 10HP", "N/A", "Aspas de acero para compresor 10HP.", "Aspas acero 10HP.", "Aspas", {"Material": "Acero", "Potencia": "10HP"})

# ─── ASPAS UNIVERSAL ──────────────────────────────────────
add("ea-asp-u-081", "euroair-aspas-universal-081", "Euroair Aspas Universal 081", "N/A", "Aspas universal 081. 150mm.", "Aspas universal 081 150mm.", "Aspas", {"Medida": "150mm"})
add("ea-asp-u-152", "euroair-aspas-universal-152", "Euroair Aspas Universal 152", "N/A", "Aspas universal 152. 180mm - 7 pines.", "Aspas universal 152 180mm.", "Aspas", {"Medida": "180mm - 7 pines"})
add("ea-asp-u-2100", "euroair-aspas-universal-2100", "Euroair Aspas Universal 2100", "N/A", "Aspas universal 2100. 210mm x 135mm.", "Aspas universal 2100 210mm.", "Aspas", {"Medida": "210mm x 135mm"})

# ─── ESTOPERAS ─────────────────────────────────────────────
add("ea-est-5hp", "euroair-estopera-5hp", "Euroair Estopera 5HP", "N/A", "Estopera para compresor 5HP.", "Estopera 5HP.", "Estoperas", {"Potencia": "5HP"})
add("ea-est-75hp", "euroair-estopera-75hp", "Euroair Estopera 7.5HP", "N/A", "Estopera para compresor 7.5HP.", "Estopera 7.5HP.", "Estoperas", {"Potencia": "7.5HP"})
add("ea-est-10hp", "euroair-estopera-10hp", "Euroair Estopera 10HP", "N/A", "Estopera para compresor 10HP.", "Estopera 10HP.", "Estoperas", {"Potencia": "10HP"})
add("ea-est-12hp", "euroair-estopera-12hp", "Euroair Estopera 12HP", "N/A", "Estopera para compresor 12HP.", "Estopera 12HP.", "Estoperas", {"Potencia": "12HP"})

# ─── JUEGOS DE CONCHAS ─────────────────────────────────────
add("ea-conch-75hp", "euroair-juego-conchas-75hp", "Euroair Juego de Conchas 7.5HP", "N/A", "Juego de conchas para compresor 7.5HP. Juego X Piston.", "Juego conchas 7.5HP.", "Conchas", {"Potencia": "7.5HP"})
add("ea-conch-10hp", "euroair-juego-conchas-10hp", "Euroair Juego de Conchas 10HP", "N/A", "Juego de conchas para compresor 10HP. Juego X Piston.", "Juego conchas 10HP.", "Conchas", {"Potencia": "10HP"})

# ─── CIGUENALES ────────────────────────────────────────────
add("ea-cig-075hp", "euroair-ciguenal-075hp", "Euroair Ciguenal 0.75HP", "N/A", "Ciguenal para compresor 0.75HP.", "Ciguenal 0.75HP.", "Ciguenales", {"Potencia": "0.75HP"})
add("ea-cig-1hp", "euroair-ciguenal-1hp", "Euroair Ciguenal 1HP", "N/A", "Ciguenal para compresor 1HP.", "Ciguenal 1HP.", "Ciguenales", {"Potencia": "1HP"})
add("ea-cig-2hp", "euroair-ciguenal-2hp", "Euroair Ciguenal 2HP", "N/A", "Ciguenal para compresor 2HP.", "Ciguenal 2HP.", "Ciguenales", {"Potencia": "2HP"})
add("ea-cig-3hp", "euroair-ciguenal-3hp", "Euroair Ciguenal 3HP", "N/A", "Ciguenal para compresor 3HP.", "Ciguenal 3HP.", "Ciguenales", {"Potencia": "3HP"})
add("ea-cig-4hp", "euroair-ciguenal-4hp", "Euroair Ciguenal 4HP", "N/A", "Ciguenal para compresor 4HP.", "Ciguenal 4HP.", "Ciguenales", {"Potencia": "4HP"})
add("ea-cig-55hp", "euroair-ciguenal-55hp", "Euroair Ciguenal 5.5HP", "N/A", "Ciguenal para compresor 5.5HP.", "Ciguenal 5.5HP.", "Ciguenales", {"Potencia": "5.5HP"})
add("ea-cig-75hp", "euroair-ciguenal-75hp", "Euroair Ciguenal 7.5HP", "N/A", "Ciguenal para compresor 7.5HP.", "Ciguenal 7.5HP.", "Ciguenales", {"Potencia": "7.5HP"})
add("ea-cig-10hp", "euroair-ciguenal-10hp", "Euroair Ciguenal 10HP", "N/A", "Ciguenal para compresor 10HP.", "Ciguenal 10HP.", "Ciguenales", {"Potencia": "10HP"})
add("ea-cig-12hp", "euroair-ciguenal-12hp", "Euroair Ciguenal 12HP", "N/A", "Ciguenal para compresor 12HP.", "Ciguenal 12HP.", "Ciguenales", {"Potencia": "12HP"})
add("ea-cig-15hp", "euroair-ciguenal-15hp", "Euroair Ciguenal 15HP", "N/A", "Ciguenal para compresor 15HP.", "Ciguenal 15HP.", "Ciguenales", {"Potencia": "15HP"})

# ─── BIELAS ────────────────────────────────────────────────
add("ea-bie-od", "euroair-biela-odontologico", "Euroair Biela Odontologico", "N/A", "Biela para compresor odontologico. 1HP Coax.", "Biela odontologico.", "Bielas", {"Potencia": "Odontologico 1HP Coax"})
add("ea-bie-075hp", "euroair-biela-075hp", "Euroair Biela 0.75HP", "N/A", "Biela para compresor 0.75HP.", "Biela 0.75HP.", "Bielas", {"Potencia": "0.75HP"})
add("ea-bie-1hp", "euroair-biela-1hp", "Euroair Biela 1HP", "N/A", "Biela para compresor 1HP.", "Biela 1HP.", "Bielas", {"Potencia": "1HP"})
add("ea-bie-2hp", "euroair-biela-2hp", "Euroair Biela 2HP", "N/A", "Biela para compresor 2HP.", "Biela 2HP.", "Bielas", {"Potencia": "2HP"})
add("ea-bie-3hp", "euroair-biela-3hp", "Euroair Biela 3HP", "N/A", "Biela para compresor 3HP.", "Biela 3HP.", "Bielas", {"Potencia": "3HP"})
add("ea-bie-4hp", "euroair-biela-4hp", "Euroair Biela 4HP", "N/A", "Biela para compresor 4HP.", "Biela 4HP.", "Bielas", {"Potencia": "4HP"})
add("ea-bie-55hp", "euroair-biela-55hp", "Euroair Biela 5.5HP", "N/A", "Biela para compresor 5.5HP.", "Biela 5.5HP.", "Bielas", {"Potencia": "5.5HP"})
add("ea-bie-75hp", "euroair-biela-75hp", "Euroair Biela 7.5HP", "N/A", "Biela para compresor 7.5HP.", "Biela 7.5HP.", "Bielas", {"Potencia": "7.5HP"})
add("ea-bie-10hp", "euroair-biela-10hp", "Euroair Biela 10HP", "N/A", "Biela para compresor 10HP.", "Biela 10HP.", "Bielas", {"Potencia": "10HP"})
add("ea-bie-12hp", "euroair-biela-12hp", "Euroair Biela 12HP", "N/A", "Biela para compresor 12HP.", "Biela 12HP.", "Bielas", {"Potencia": "12HP"})
add("ea-bie-15hp", "euroair-biela-15hp", "Euroair Biela 15HP", "N/A", "Biela para compresor 15HP.", "Biela 15HP.", "Bielas", {"Potencia": "15HP"})

# ─── JUEGOS DE VALVULAS DE ADMISION ────────────────────────
add("ea-valadm-75hp", "euroair-juego-valvulas-admision-75hp", "Euroair Juego Valvulas de Admision 7.5HP", "N/A", "Juego de valvulas de admision 7.5HP. 5 unidades.", "Juego valvulas admision 7.5HP.", "Valvulas", {"Potencia": "7.5HP", "Cantidad": "5 unidades"})
add("ea-valadm-10hp", "euroair-juego-valvulas-admision-10hp", "Euroair Juego Valvulas de Admision 10HP", "N/A", "Juego de valvulas de admision 10HP. 10 unidades.", "Juego valvulas admision 10HP.", "Valvulas", {"Potencia": "10HP", "Cantidad": "10 unidades"})

# ─── PLATO VALVULAS ────────────────────────────────────────
add("ea-plv-od", "euroair-plato-valvulas-odontologico", "Euroair Plato Valvulas Odontologico", "N/A", "Plato de valvulas para compresor odontologico 2HP Coaxial.", "Plato valvulas od. 2HP Coax.", "Valvulas", {"Potencia": "Odontologico", "Tipo": "2HP Coaxial"})
add("ea-plv-25hp", "euroair-plato-valvulas-25hp", "Euroair Plato Valvulas 2.5HP Coaxial", "N/A", "Plato de valvulas para compresor 2.5HP Coaxial.", "Plato valvulas 2.5HP Coax.", "Valvulas", {"Potencia": "2.5HP Coaxial"})
add("ea-plv-075hp", "euroair-plato-valvulas-075hp", "Euroair Plato Valvulas 0.75HP", "N/A", "Plato de valvulas para compresor 0.75HP.", "Plato valvulas 0.75HP.", "Valvulas", {"Potencia": "0.75HP"})
add("ea-plv-1hp", "euroair-plato-valvulas-1hp", "Euroair Plato Valvulas 1HP", "N/A", "Plato de valvulas para compresor 1HP.", "Plato valvulas 1HP.", "Valvulas", {"Potencia": "1HP"})
add("ea-plv-2hp", "euroair-plato-valvulas-2hp", "Euroair Plato Valvulas 2HP", "N/A", "Plato de valvulas para compresor 2HP. Juego.", "Plato valvulas 2HP.", "Valvulas", {"Potencia": "2HP"})
add("ea-plv-3hp", "euroair-plato-valvulas-3hp", "Euroair Plato Valvulas 3HP", "N/A", "Plato de valvulas para compresor 3HP. 2 Unidades.", "Plato valvulas 3HP.", "Valvulas", {"Potencia": "3HP", "Cantidad": "2 Unidades"})
add("ea-plv-4hp", "euroair-plato-valvulas-4hp", "Euroair Plato Valvulas 4HP", "N/A", "Plato de valvulas para compresor 4HP. 1 Unidad.", "Plato valvulas 4HP.", "Valvulas", {"Potencia": "4HP", "Cantidad": "1 Unidad"})
add("ea-plv-55hp", "euroair-plato-valvulas-55hp", "Euroair Plato Valvulas 5.5HP", "N/A", "Plato de valvulas para compresor 5.5HP.", "Plato valvulas 5.5HP.", "Valvulas", {"Potencia": "5.5HP"})
add("ea-plv-75hp", "euroair-plato-valvulas-75hp", "Euroair Plato Valvulas 7.5HP", "N/A", "Plato de valvulas para compresor 7.5HP. 2 Flanches.", "Plato valvulas 7.5HP.", "Valvulas", {"Potencia": "7.5HP", "Detalles": "2 Flanches"})
add("ea-plv-10hp", "euroair-plato-valvulas-10hp", "Euroair Plato Valvulas 10HP", "N/A", "Plato de valvulas para compresor 10HP.", "Plato valvulas 10HP.", "Valvulas", {"Potencia": "10HP"})
add("ea-plv-12hp", "euroair-plato-valvulas-12hp", "Euroair Plato Valvulas 12HP", "N/A", "Plato de valvulas para compresor 12HP. 2 Flanches.", "Plato valvulas 12HP.", "Valvulas", {"Potencia": "12HP", "Detalles": "2 Flanches"})
add("ea-plv-15hp", "euroair-plato-valvulas-15hp", "Euroair Plato Valvulas 15HP", "N/A", "Plato de valvulas para compresor 15HP.", "Plato valvulas 15HP.", "Valvulas", {"Potencia": "15HP"})

# ─── EMPACADURAS ───────────────────────────────────────────
add("ea-emp-2hp", "euroair-empacadura-2hp", "Euroair Empacadura 2HP", "N/A", "Empacadura para compresor 2HP. Aluminio.", "Empacadura 2HP Aluminio.", "Empacaduras", {"Potencia": "2HP", "Material": "Aluminio"})
add("ea-emp-2hp-2f", "euroair-empacadura-2hp-2flanches", "Euroair Empacadura 2HP (2 Flanches)", "N/A", "Empacadura para compresor 2HP. 2 Flanches.", "Empacadura 2HP 2 Flanches.", "Empacaduras", {"Potencia": "2HP", "Detalles": "2 Flanches"})
add("ea-emp-3hp-2f", "euroair-empacadura-3hp-2flanches", "Euroair Empacadura 3HP (2 Flanches)", "N/A", "Empacadura para compresor 3HP. 2 Flanches.", "Empacadura 3HP 2 Flanches.", "Empacaduras", {"Potencia": "3HP", "Detalles": "2 Flanches"})

# ─── FILTROS ASPIRACION ROSCA ──────────────────────────────
add("ea-fil-38", "euroair-filtro-aspiracion-rosca-3-8", "Euroair Filtro Aspiracion Rosca 3/8\"", "N/A", "Filtro de aspiracion con rosca 3/8\".", "Filtro aspiracion rosca 3/8\".", "Filtros", {"Rosca": "3/8\""})
add("ea-fil-12", "euroair-filtro-aspiracion-rosca-1-2", "Euroair Filtro Aspiracion Rosca 1/2\"", "N/A", "Filtro de aspiracion con rosca 1/2\". Plastico.", "Filtro aspiracion rosca 1/2\".", "Filtros", {"Rosca": "1/2\"", "Material": "Plastico"})
add("ea-fil-34", "euroair-filtro-aspiracion-rosca-3-4", "Euroair Filtro Aspiracion Rosca 3/4\"", "N/A", "Filtro de aspiracion con rosca 3/4\". Plastico.", "Filtro aspiracion rosca 3/4\".", "Filtros", {"Rosca": "3/4\"", "Material": "Plastico"})
add("ea-fil-10hp", "euroair-filtro-aspiracion-rosca-10hp", "Euroair Filtro Aspiracion Rosca 10HP", "N/A", "Filtro de aspiracion para compresor 10HP. Metalico.", "Filtro aspiracion 10HP.", "Filtros", {"Potencia": "10HP", "Material": "Metalico"})

# ─── FILTRO ASPIRACION AUTOMOTRIZ ──────────────────────────
add("ea-fil-auto-2hp", "euroair-filtro-aspiracion-automotriz-2hp", "Euroair Filtro Aspiracion Automotriz 2HP", "N/A", "Filtro de aspiracion automotriz para compresor 2HP. Plastico.", "Filtro aspiracion auto 2HP.", "Filtros", {"Potencia": "2HP", "Material": "Plastico"})

# ─── VALVULAS DE SEGURIDAD ─────────────────────────────────
add("ea-vseg-14-res", "euroair-valvula-seguridad-1-4-resorte", "Euroair Valvula de Seguridad 1/4\" Resorte", "N/A", "Valvula de seguridad 1/4\" con resorte.", "Valvula seguridad 1/4\" resorte.", "Valvulas", {"Rosca": "1/4\"", "Tipo": "Resorte"})
add("ea-vseg-14-eco", "euroair-valvula-seguridad-1-4-eco", "Euroair Valvula de Seguridad 1/4\" Eco", "N/A", "Valvula de seguridad 1/4\" modelo Eco.", "Valvula seguridad 1/4\" eco.", "Valvulas", {"Rosca": "1/4\"", "Tipo": "Eco"})

# ─── VALVULA DE DRENAJE ────────────────────────────────────
add("ea-vdren-14", "euroair-valvula-drenaje-1-4", "Euroair Valvula de Drenaje 1/4\"", "N/A", "Valvula de drenaje 1/4\".", "Valvula drenaje 1/4\".", "Valvulas", {"Rosca": "1/4\""})

# ─── CONEXIONES ────────────────────────────────────────────
add("ea-conex-coax", "euroair-conexion-compresor-coaxial", "Euroair Conexion Compresor Coaxial", "N/A", "Conexion para compresor coaxial. 1/4\" hacho x Espiga 1/4\".", "Conexion coaxial 1/4\".", "Conexiones", {"Rosca": "1/4\" hacho x Espiga 1/4\""})

# ─── LLAVES DE PASO ────────────────────────────────────────
add("ea-llp-12a", "euroair-llave-paso-1-2", "Euroair Llave de Paso 1/2\"", "N/A", "Llave de paso 1/2\".", "Llave de paso 1/2\".", "Conexiones", {"Rosca": "1/2\""})
add("ea-llp-12b", "euroair-llave-paso-1-2b", "Euroair Llave de Paso 1/2\" (Tipo 2)", "N/A", "Llave de paso 1/2\" tipo 2.", "Llave de paso 1/2\" tipo 2.", "Conexiones", {"Rosca": "1/2\""})

# ─── TUBERIA COMPRESOR ─────────────────────────────────────
add("ea-tub-od", "euroair-tuberia-compresor-odontologico", "Euroair Tuberia Compresor Odontologico", "N/A", "Tuberia para compresor odontologico.", "Tuberia compresor odontologico.", "Conexiones", {"Tipo": "Odontologico"})

# ─── VALVULAS CHEQ ─────────────────────────────────────────
add("ea-vchq-od-1", "euroair-valvula-cheq-odontologico-1-8", "Euroair Valvula Cheq Odontologico 1/8\" x 1/8\"", "N/A", "Valvula cheq para compresor odontologico. 1/8\" x 1/8\".", "Valvula cheq od. 1/8\" x 1/8\".", "Valvulas", {"Rosca": "1/8\" x 1/8\"", "Tipo": "Odontologico"})
add("ea-vchq-od-2", "euroair-valvula-cheq-odontologico-3-8", "Euroair Valvula Cheq Odontologico 3/8\" x 1/8\"", "N/A", "Valvula cheq para compresor odontologico. 3/8\" x 1/8\".", "Valvula cheq od. 3/8\" x 1/8\".", "Valvulas", {"Rosca": "3/8\" x 1/8\"", "Tipo": "Odontologico"})
add("ea-vchq-od-3", "euroair-valvula-cheq-odontologico-3-8-1-2", "Euroair Valvula Cheq Odontologico 3/8\" x 1/2\"", "N/A", "Valvula cheq para compresor odontologico. 3/8\" x 1/2\".", "Valvula cheq od. 3/8\" x 1/2\".", "Valvulas", {"Rosca": "3/8\" x 1/2\"", "Tipo": "Odontologico"})
add("ea-vchq-25hp", "euroair-valvula-cheq-25hp-coax", "Euroair Valvula Cheq 2.5HP Coaxial 3/8\" x 1/2\"", "N/A", "Valvula cheq para compresor 2.5HP Coaxial. 3/8\" x 1/2\".", "Valvula cheq 2.5HP Coax 3/8\" x 1/2\".", "Valvulas", {"Rosca": "3/8\" x 1/2\"", "Potencia": "2.5HP Coaxial"})
add("ea-vchq-3hp", "euroair-valvula-cheq-3hp", "Euroair Valvula Cheq 3HP 1/2\" x 1/2\"", "N/A", "Valvula cheq para compresor 3HP. 1/2\" x 1/2\".", "Valvula cheq 3HP 1/2\" x 1/2\".", "Valvulas", {"Rosca": "1/2\" x 1/2\"", "Potencia": "3HP"})
add("ea-vchq-55hp", "euroair-valvula-cheq-55hp", "Euroair Valvula Cheq 5.5HP 3/8\"", "N/A", "Valvula cheq para compresor 5.5HP. 3/8\".", "Valvula cheq 5.5HP 3/8\".", "Valvulas", {"Rosca": "3/8\"", "Potencia": "5.5HP"})
add("ea-vchq-2510", "euroair-valvula-cheq-25hp-10hp", "Euroair Valvula Cheq 2.5HP / 10HP 1/4\"", "N/A", "Valvula cheq para compresor 2.5HP / 10HP. 1/4\".", "Valvula cheq 2.5HP/10HP 1/4\".", "Valvulas", {"Rosca": "1/4\"", "Potencia": "2.5HP / 10HP"})

# ─── GUARDA RESORTE ────────────────────────────────────────
add("ea-guarda-14", "euroair-guarda-resorte-1-4", "Euroair Guarda Resorte 1/4\"", "N/A", "Guarda resorte 1/4\".", "Guarda resorte 1/4\".", "Accesorios", {"Rosca": "1/4\""})

# ─── RESPIRADERO ACEITE ────────────────────────────────────
add("ea-resp-12-rojo", "euroair-respiradero-aceite-1-2-rojo", "Euroair Respiradero Aceite 1/2\" Rosca Rojo/Blanco", "N/A", "Respiradero de aceite 1/2\". Rosca rojo/blanco.", "Respiradero aceite 1/2\" rojo/blanco.", "Visores y Respiraderos", {"Rosca": "1/2\"", "Color": "Rojo/Blanco"})
add("ea-resp-38-amar", "euroair-respiradero-aceite-3-8-amarillo", "Euroair Respiradero Aceite 3/8\" Amarillo", "N/A", "Respiradero de aceite 3/8\". Amarillo.", "Respiradero aceite 3/8\" amarillo.", "Visores y Respiraderos", {"Rosca": "3/8\"", "Color": "Amarillo"})
add("ea-resp-12-hier", "euroair-respiradero-aceite-1-2-hierro", "Euroair Respiradero Aceite 1/2\" Hierro", "N/A", "Respiradero de aceite 1/2\". Hierro.", "Respiradero aceite 1/2\" hierro.", "Visores y Respiraderos", {"Rosca": "1/2\"", "Material": "Hierro"})

# ─── VISOR ACEITE ──────────────────────────────────────────
add("ea-vis-2hp", "euroair-visor-aceite-2hp", "Euroair Visor Aceite 2HP", "N/A", "Visor de aceite para compresor 2HP. Rosca 3/4\" plastico.", "Visor aceite 2HP.", "Visores y Respiraderos", {"Potencia": "2HP", "Rosca": "3/4\" Plastico"})
add("ea-vis-25hp", "euroair-visor-aceite-25hp", "Euroair Visor Aceite 2.5HP", "N/A", "Visor de aceite para compresor 2.5HP. Rosca 3/4\" plastico.", "Visor aceite 2.5HP.", "Visores y Respiraderos", {"Potencia": "2.5HP", "Rosca": "3/4\" Plastico"})
add("ea-vis-3hp", "euroair-visor-aceite-3hp", "Euroair Visor Aceite 3HP", "N/A", "Visor de aceite para compresor 3HP.", "Visor aceite 3HP.", "Visores y Respiraderos", {"Potencia": "3HP"})
add("ea-vis-4hp", "euroair-visor-aceite-4hp", "Euroair Visor Aceite 4HP", "N/A", "Visor de aceite para compresor 4HP. Plastico.", "Visor aceite 4HP.", "Visores y Respiraderos", {"Potencia": "4HP", "Material": "Plastico"})
add("ea-vis-55hp", "euroair-visor-aceite-55hp", "Euroair Visor Aceite 5.5HP", "N/A", "Visor de aceite para compresor 5.5HP. A 3/4\" Grande. Plastico.", "Visor aceite 5.5HP.", "Visores y Respiraderos", {"Potencia": "5.5HP", "Rosca": "3/4\" Grande Plastico"})
add("ea-vis-10hp", "euroair-visor-aceite-10hp", "Euroair Visor Aceite 10HP", "N/A", "Visor de aceite para compresor 10HP. Placa Z Tornillo.", "Visor aceite 10HP.", "Visores y Respiraderos", {"Potencia": "10HP", "Tipo": "Placa Z Tornillo"})
add("ea-vis-12hp", "euroair-visor-aceite-12hp", "Euroair Visor Aceite 12HP", "N/A", "Visor de aceite para compresor 12HP. Rosca y Tuerca.", "Visor aceite 12HP.", "Visores y Respiraderos", {"Potencia": "12HP", "Tipo": "Rosca y Tuerca"})

# ─── CAPACITORES ───────────────────────────────────────────
add("ea-cap-od-30", "euroair-capacitor-odontologico-30uf", "Euroair Capacitor Odontologico 30uF", "N/A", "Capacitor para compresor odontologico. 30uF.", "Capacitor od. 30uF.", "Capacitores", {"Capacidad": "30uF", "Tipo": "Odontologico"})
add("ea-cap-2hp-coax-120", "euroair-capacitor-2hp-coaxial-120uf", "Euroair Capacitor 2HP Coaxial 120uF", "N/A", "Capacitor para compresor 2HP Coaxial. 120uF.", "Capacitor 2HP Coax 120uF.", "Capacitores", {"Capacidad": "120uF", "Potencia": "2HP Coaxial"})
add("ea-cap-25hp-coax-150", "euroair-capacitor-25hp-coaxial-150uf", "Euroair Capacitor 2.5HP Coaxial 150uF", "N/A", "Capacitor para compresor 2.5HP Coaxial. 150uF.", "Capacitor 2.5HP Coax 150uF.", "Capacitores", {"Capacidad": "150uF", "Potencia": "2.5HP Coaxial"})
add("ea-cap-1hp-60", "euroair-capacitor-1hp-60uf", "Euroair Capacitor 1HP 60uF", "N/A", "Capacitor para compresor 1HP. 60uF.", "Capacitor 1HP 60uF.", "Capacitores", {"Capacidad": "60uF", "Potencia": "1HP"})
add("ea-cap-3hp-300", "euroair-capacitor-3hp-300uf", "Euroair Capacitor 3HP 300uF", "N/A", "Capacitor para compresor 3HP. 300uF.", "Capacitor 3HP 300uF.", "Capacitores", {"Capacidad": "300uF", "Potencia": "3HP"})
add("ea-cap-4hp-300", "euroair-capacitor-4hp-300uf", "Euroair Capacitor 4HP 300uF", "N/A", "Capacitor para compresor 4HP. 300uF.", "Capacitor 4HP 300uF.", "Capacitores", {"Capacidad": "300uF", "Potencia": "4HP"})
add("ea-cap-2hp-400", "euroair-capacitor-2hp-400uf", "Euroair Capacitor 2HP 400uF", "N/A", "Capacitor para compresor 2HP. 400uF.", "Capacitor 2HP 400uF.", "Capacitores", {"Capacidad": "400uF", "Potencia": "2HP"})

# ─── ARRANCADORES ──────────────────────────────────────────
add("ea-arr-55hp", "euroair-arrancador-55hp", "Euroair Arrancador 5.5HP 16amp", "N/A", "Arrancador para compresor 5.5HP. 16 amp.", "Arrancador 5.5HP 16amp.", "Arranques", {"Potencia": "5.5HP", "Amperaje": "16amp"})
add("ea-arr-75hp", "euroair-arrancador-75hp", "Euroair Arrancador 7.5HP 20amp", "N/A", "Arrancador para compresor 7.5HP. 20 amp.", "Arrancador 7.5HP 20amp.", "Arranques", {"Potencia": "7.5HP", "Amperaje": "20amp"})
add("ea-arr-10hp", "euroair-arrancador-10hp", "Euroair Arrancador 10HP 35amp", "N/A", "Arrancador para compresor 10HP. 35 amp.", "Arrancador 10HP 35amp.", "Arranques", {"Potencia": "10HP", "Amperaje": "35amp"})
add("ea-arr-15hp", "euroair-arrancador-15hp", "Euroair Arrancador 15HP 50amp", "N/A", "Arrancador para compresor 15HP. 50 amp.", "Arrancador 15HP 50amp.", "Arranques", {"Potencia": "15HP", "Amperaje": "50amp"})

# ─── PISTON ────────────────────────────────────────────────
add("ea-pist-coax", "euroair-piston-coaxial", "Euroair Piston Coaxial", "N/A", "Piston para compresor coaxial.", "Piston coaxial.", "Pistones", {"Tipo": "Coaxial"})

# ─── RUEDAS ────────────────────────────────────────────────
add("ea-rued-5", "euroair-ruedas-5", "Euroair Ruedas 5\"", "N/A", "Ruedas para compresor de 5\".", "Ruedas 5\".", "Accesorios", {"Medida": "5\""})
add("ea-rued-7", "euroair-ruedas-7", "Euroair Ruedas 7\"", "N/A", "Ruedas para compresor de 7\".", "Ruedas 7\".", "Accesorios", {"Medida": "7\""})

# ─── PRESOSTATOS ───────────────────────────────────────────
add("ea-pres-nema-4v", "euroair-presostato-tipo-nema-monofasico-4v", "Euroair Presostato Tipo Nema Monofasico 4V", "N/A", "Presostato tipo Nema, monofasico, 4 voltios.", "Presostato Nema Mono 4V.", "Presostatos", {"Tipo": "Nema", "Fase": "Monofasico", "Voltaje": "4V"})
add("ea-pres-nema-1v", "euroair-presostato-tipo-nema-monofasico-1v", "Euroair Presostato Tipo Nema Monofasico 1V", "N/A", "Presostato tipo Nema, monofasico, 1 voltio.", "Presostato Nema Mono 1V.", "Presostatos", {"Tipo": "Nema", "Fase": "Monofasico", "Voltaje": "1V"})
add("ea-pres-bal-4v", "euroair-presostato-balanca-monofasico-4v", "Euroair Presostato Balanca Monofasico 4V", "N/A", "Presostato tipo Balanca, monofasico, 4 voltios.", "Presostato Balanca Mono 4V.", "Presostatos", {"Tipo": "Balanca", "Fase": "Monofasico", "Voltaje": "4V"})
add("ea-pres-trif", "euroair-presostato-sin-boton-trifasico", "Euroair Presostato Sin Boton Trifasico", "N/A", "Presostato sin boton, trifasico.", "Presostato sin boton trifasico.", "Presostatos", {"Tipo": "Sin Boton", "Fase": "Trifasico"})
add("ea-pres-bomb-2040", "euroair-presostato-bomba-20-40", "Euroair Presostato Bomba 20-40", "N/A", "Presostato para bomba. Rango 20-40.", "Presostato bomba 20-40.", "Presostatos", {"Tipo": "Bomba", "Rango": "20-40"})
add("ea-pres-bomb-3050", "euroair-presostato-bomba-30-50", "Euroair Presostato Bomba 30-50", "N/A", "Presostato para bomba. Rango 30-50.", "Presostato bomba 30-50.", "Presostatos", {"Tipo": "Bomba", "Rango": "30-50"})
add("ea-pres-bomb-4060", "euroair-presostato-bomba-40-60", "Euroair Presostato Bomba 40-60", "N/A", "Presostato para bomba. Rango 40-60.", "Presostato bomba 40-60.", "Presostatos", {"Tipo": "Bomba", "Rango": "40-60"})
add("ea-pres-bomb-70100", "euroair-presostato-bomba-70-100", "Euroair Presostato Bomba 70-100", "N/A", "Presostato para bomba. Rango 70-100.", "Presostato bomba 70-100.", "Presostatos", {"Tipo": "Bomba", "Rango": "70-100"})

# ─── TELEPRESOSTATO ────────────────────────────────────────
add("ea-tpres-trif", "euroair-telepresostato-sin-boton-trifasico", "Euroair Telepresostato Sin Boton Trifasico", "N/A", "Telepresostato sin boton, trifasico.", "Telepresostato sin boton trifasico.", "Presostatos", {"Tipo": "Sin Boton", "Fase": "Trifasico"})

# ─── REDUCTOR DE PRESION ───────────────────────────────────
add("ea-red-4v", "euroair-reductor-presion-4-vias", "Euroair Reductor de Presion 4 Vias", "N/A", "Reductor de presion de 4 vias.", "Reductor presion 4 vias.", "Reguladores", {"Vias": "4 Vias"})

# ─── DESVIO 5V CON REGULADOR ───────────────────────────────
add("ea-desv-5v", "euroair-desvio-5v-regulador", "Euroair Desvio 5V c/Regulador", "N/A", "Desvio de 5 vias con regulador.", "Desvio 5V con regulador.", "Reguladores", {"Vias": "5 Vias"})

# ─── MANOMETROS ────────────────────────────────────────────
add("ea-man-25-rad", "euroair-manometro-25-radial", "Euroair Manometro 2.5\" Radial 1/4\" NPT", "N/A", "Manometro 2.5\" tipo radial. Rosca 1/4\" NPT.", "Manometro 2.5\" Radial 1/4\" NPT.", "Manometros", {"Tamano": "2.5\"", "Tipo": "Radial", "Rosca": "1/4\" NPT"})
add("ea-man-2-post", "euroair-manometro-2-posterior", "Euroair Manometro 2\" Posterior 1/4\" NPT", "N/A", "Manometro 2\" tipo posterior. Rosca 1/4\" NPT.", "Manometro 2\" Posterior 1/4\" NPT.", "Manometros", {"Tamano": "2\"", "Tipo": "Posterior", "Rosca": "1/4\" NPT"})
add("ea-man-1-post", "euroair-manometro-1-posterior", "Euroair Manometro 1\" Posterior 1/8\" NPT", "N/A", "Manometro 1\" tipo posterior. Rosca 1/8\" NPT.", "Manometro 1\" Posterior 1/8\" NPT.", "Manometros", {"Tamano": "1\"", "Tipo": "Posterior", "Rosca": "1/8\" NPT"})

# ─── REGULADORES C/MANOMETRO ──────────────────────────────
add("ea-reg-12", "euroair-regulador-manometro-1-2", "Euroair Regulador c/Manometro 1/2\"", "N/A", "Regulador con manometro 1/2\".", "Regulador c/Manometro 1/2\".", "Reguladores", {"Rosca": "1/2\""})
add("ea-reg-14", "euroair-regulador-manometro-1-4", "Euroair Regulador c/Manometro 1/4\"", "N/A", "Regulador con manometro 1/4\".", "Regulador c/Manometro 1/4\".", "Reguladores", {"Rosca": "1/4\""})

# ─── LUBRICADORES ──────────────────────────────────────────
add("ea-lub-12", "euroair-lubricador-1-2", "Euroair Lubricador 1/2\"", "N/A", "Lubricador 1/2\".", "Lubricador 1/2\".", "Lubricadores", {"Rosca": "1/2\""})
add("ea-lub-14", "euroair-lubricador-1-4", "Euroair Lubricador 1/4\"", "N/A", "Lubricador 1/4\".", "Lubricador 1/4\".", "Lubricadores", {"Rosca": "1/4\""})

# ─── FILTROS EN LINEA ──────────────────────────────────────
add("ea-flin-12", "euroair-filtro-linea-1-2", "Euroair Filtro en Linea 1/2\"", "N/A", "Filtro en linea 1/2\".", "Filtro en linea 1/2\".", "Filtros", {"Rosca": "1/2\""})
add("ea-flin-14", "euroair-filtro-linea-1-4", "Euroair Filtro en Linea 1/4\"", "N/A", "Filtro en linea 1/4\".", "Filtro en linea 1/4\".", "Filtros", {"Rosca": "1/4\""})

# ─── MINI LUBRICADOR ───────────────────────────────────────
add("ea-minlub-14", "euroair-mini-lubricador-1-4", "Euroair Mini-Lubricador 1/4\"", "N/A", "Mini-lubricador 1/4\".", "Mini-lubricador 1/4\".", "Lubricadores", {"Rosca": "1/4\""})

# ─── ACOPLE RAPIDO ─────────────────────────────────────────
add("ea-acop-hemb", "euroair-acople-rapido-hembra", "Euroair Acople Rapido 1/4\" Hembra", "N/A", "Acople rapido 1/4\" hembra.", "Acople rapido 1/4\" Hembra.", "Conexiones", {"Rosca": "1/4\"", "Tipo": "Hembra"})
add("ea-acop-mach", "euroair-acople-rapido-macho", "Euroair Acople Rapido 1/4\" Macho", "N/A", "Acople rapido 1/4\" macho.", "Acople rapido 1/4\" Macho.", "Conexiones", {"Rosca": "1/4\"", "Tipo": "Macho"})

# ─── KIT DE PISTOLAS ───────────────────────────────────────
add("ea-kit-pist", "euroair-kit-pistolas-5und", "Euroair Kit de Pistolas 5 Und", "N/A", "Kit de pistolas 5 unidades.", "Kit pistolas 5 und.", "Pistolas", {"Cantidad": "5 und"})

# ─── MANGUERA FLEXIBLE ─────────────────────────────────────
add("ea-mang", "euroair-manguera-flexible", "Euroair Manguera Flexible", "N/A", "Manguera flexible para compresor.", "Manguera flexible.", "Accesorios", {})

# ─── PISTOLAS ──────────────────────────────────────────────
add("ea-pist-inf", "euroair-pistola-inflar", "Euroair Pistola para Inflar", "N/A", "Pistola para inflar.", "Pistola para inflar.", "Pistolas", {})
add("ea-pist-sop", "euroair-pistola-soplar", "Euroair Pistola para Soplar", "N/A", "Pistola para soplar.", "Pistola para soplar.", "Pistolas", {})
add("ea-pist-lav", "euroair-pistola-lavar", "Euroair Pistola para Lavar", "N/A", "Pistola para lavar.", "Pistola para lavar.", "Pistolas", {})
add("ea-pist-suc", "euroair-pistola-suction", "Euroair Pistola de Suction", "N/A", "Pistola de suction.", "Pistola suction.", "Pistolas", {})

# Build the section
lines = ['\n  // --- EUROAIR ACCESORIOS PARA COMPRESORES ---\n']
lines.extend(products)

new_section = ''.join(lines)
new_content = before + new_section + after

# Add new subcategories
new_subs = '  "Anillos",\n  "Flappers",\n  "Aspas",\n  "Estoperas",\n  "Conchas",\n  "Ciguenales",\n  "Bielas",\n  "Valvulas",\n  "Empacaduras",\n  "Filtros",\n  "Conexiones",\n  "Visores y Respiraderos",\n  "Capacitores",\n  "Arranques",\n  "Pistones",\n  "Presostatos",\n  "Reguladores",\n  "Manometros",\n  "Lubricadores",\n  "Pistolas",\n'
new_content = new_content.replace('  "Prensas",\n', '  "Prensas",\n' + new_subs)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"Added {len(products)} EUROAIR products")
