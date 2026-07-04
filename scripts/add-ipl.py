filepath = r'C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

sizes = [60, 80, 100, 120, 150, 160, 180, 200, 250]

# Find insertion point
mile_marker = '// ─── MILESCRAFT'
idx = content.find(mile_marker)

lines = []
for s in sizes:
    lines.append('  {')
    lines.append(f'    id: "ipl-ta-{s}",')
    lines.append(f'    slug: "tubo-aspiracion-{s}mm",')
    lines.append(f'    name: "Tubo de Aspiracion {s}mm",')
    lines.append(f'    brand: "IPL",')
    lines.append(f'    model: "TA-{s}",')
    lines.append(f'    description: "Tubo de aspiracion IPL de {s}mm para colectores de polvo y maquinaria.",')
    lines.append(f'    shortDescription: "Tubo de aspiracion {s}mm.",')
    lines.append(f'    category: "Accesorios",')
    lines.append(f'    image: "/assets/brands/ipl_x2.0.jpeg",')
    lines.append('  },')

products = '\n'.join(lines) + '\n'
new_content = content[:idx] + products + content[idx:]

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f'Added {len(sizes)} IPL tubes')
