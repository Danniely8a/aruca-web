filepath = r'C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Find insertion point before MILESCRAFT
miles_marker = '// ─── MILESCRAFT'
idx = content.find(miles_marker)

products = []

# Correderas Telescópicas
for cm in [30, 35, 40, 45, 50, 55]:
    products.append(f"""  {{
    id: "bx-corr-{cm}",
    slug: "corredera-telescopica-{cm}cm",
    name: "Corredera Telescópica {cm}cm",
    brand: "BlueXpress",
    model: "CT-{cm}",
    description: "Corredera telescópica de {cm}cm para cajones y muebles.",
    shortDescription: "Corredera telescópica {cm}cm.",
    category: "Accesorios",
    image: "/assets/brands/bluexpress_x2.0.jpeg",
  }},""")

# Bisagras de Cazoleta 35mm
for tipo in ["Semicurvas", "Curvas"]:
    slug_tipo = tipo.lower()
    products.append(f"""  {{
    id: "bx-bis-{slug_tipo}",
    slug: "bisagra-cazoleta-35mm-{slug_tipo}",
    name: "Bisagra Cazoleta 35mm {tipo}",
    brand: "BlueXpress",
    model: "BC-35-{tipo[:3].upper()}",
    description: "Bisagra de cazoleta 35mm {tipo.lower()} para muebles.",
    shortDescription: "Bisagra cazoleta 35mm {tipo.lower()}.",
    category: "Accesorios",
    image: "/assets/brands/bluexpress_x2.0.jpeg",
  }},""")

# Brazos Hidráulicos
products.append(f"""  {{
    id: "bx-bh-8kg",
    slug: "brazo-hidraulico-8kg",
    name: "Brazo Hidráulico 8 KG",
    brand: "BlueXpress",
    model: "BH-8KG",
    description: "Brazo hidráulico de 8kg para tapas de muebles.",
    shortDescription: "Brazo hidráulico 8 KG.",
    category: "Accesorios",
    image: "/assets/brands/bluexpress_x2.0.jpeg",
  }},""")

# Caja Drywall 6
for medida in ["5/8", "3/4", "1", "1-1/4", "1-1/2", "1-5/8", "1-3/4", "2", "2-1/4", "2-1/2"]:
    safe_medida = medida.replace("/", "-")
    products.append(f"""  {{
    id: "bx-dw6-{safe_medida}",
    slug: "tornillo-drywall-6x{safe_medida}",
    name: "Tornillo Drywall 6 x {medida}\"",
    brand: "BlueXpress",
    model: "DW6-{medida}",
    description: "Tornillo para drywall calibre 6 x {medida}\". Caja.",
    shortDescription: "Tornillo drywall 6 x {medida}\".",
    category: "Accesorios",
    image: "/assets/brands/bluexpress_x2.0.jpeg",
  }},""")

# Caja Drywall 7
for medida in ["1", "1-1/4"]:
    safe_medida = medida.replace("/", "-")
    products.append(f"""  {{
    id: "bx-dw7-{safe_medida}",
    slug: "tornillo-drywall-7x{safe_medida}",
    name: "Tornillo Drywall 7 x {medida}\"",
    brand: "BlueXpress",
    model: "DW7-{medida}",
    description: "Tornillo para drywall calibre 7 x {medida}\". Caja.",
    shortDescription: "Tornillo drywall 7 x {medida}\".",
    category: "Accesorios",
    image: "/assets/brands/bluexpress_x2.0.jpeg",
  }},""")

# Caja Drywall 8
for medida in ["1-5/8", "1-3/4", "2", "2-1/2", "3", "3-1/2"]:
    safe_medida = medida.replace("/", "-")
    products.append(f"""  {{
    id: "bx-dw8-{safe_medida}",
    slug: "tornillo-drywall-8x{safe_medida}",
    name: "Tornillo Drywall 8 x {medida}\"",
    brand: "BlueXpress",
    model: "DW8-{medida}",
    description: "Tornillo para drywall calibre 8 x {medida}\". Caja.",
    shortDescription: "Tornillo drywall 8 x {medida}\".",
    category: "Accesorios",
    image: "/assets/brands/bluexpress_x2.0.jpeg",
  }},""")

all_products = '\n'.join(products) + '\n'
new_content = content[:idx] + all_products + content[idx:]

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f'Added {len(products)} BlueXpress products')
