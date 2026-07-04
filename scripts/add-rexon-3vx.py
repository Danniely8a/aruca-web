filepath = r'C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

sizes_3vx = [250, 265, 280, 300, 315, 335, 355, 375, 400, 425, 450, 475, 500, 530, 560, 600, 630, 670, 710, 750, 800, 850]

forza_marker = '// ─── FORZA'
idx = content.find(forza_marker)

lines = []
for s in sizes_3vx:
    lines.append('  {')
    lines.append(f'    id: "rexon-3vx-{s}",')
    lines.append(f'    slug: "correa-tipo-3vx-{s}",')
    lines.append(f'    name: "Correa Tipo 3VX - {s}",')
    lines.append(f'    brand: "REXON",')
    lines.append(f'    model: "3VX-{s}",')
    lines.append(f'    description: "Correa de transmisión Tipo 3VX medida {s}\\" para maquinaria industrial.",')
    lines.append(f'    shortDescription: "Correa Tipo 3VX {s}\\".",')
    lines.append(f'    category: "Accesorios",')
    lines.append(f'    image: "/assets/brands/rexon_x2.0.jpeg",')
    lines.append('  },')

belts = '\n'.join(lines) + '\n'
new_content = content[:idx] + belts + content[idx:]

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f'Added {len(sizes_3vx)} correas Tipo 3VX')
