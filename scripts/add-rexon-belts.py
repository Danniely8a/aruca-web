filepath = r'C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the FORZA section end and insert before it
forza_marker = '// ─── FORZA'
idx = content.find(forza_marker)

belts = ''
for i in range(15, 101):
    belts += f"""  {{
    id: "rexon-a-{i}",
    slug: "correa-tipo-a-{i}",
    name: "Correa Tipo A - {i}",
    brand: "REXON",
    model: "A-{i}",
    description: "Correa de transmisión Tipo A medida {i}\" para maquinaria industrial.",
    shortDescription: "Correa Tipo A {i}\".",
    category: "Accesorios",
    image: "/assets/brands/rexon_x2.0.jpeg",
  }},
"""

new_content = content[:idx] + belts + content[idx:]

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f'Added 86 correas Tipo A (15-100)')
