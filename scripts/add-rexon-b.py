filepath = r'C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

sizes_b = list(range(19, 101))

forza_marker = '// ─── FORZA'
idx = content.find(forza_marker)

lines = []
for s in sizes_b:
    lines.append('  {')
    lines.append(f'    id: "rexon-b-{s}",')
    lines.append(f'    slug: "correa-tipo-b-{s}",')
    lines.append(f'    name: "Correa Tipo B - {s}",')
    lines.append(f'    brand: "REXON",')
    lines.append(f'    model: "B-{s}",')
    lines.append(f'    description: "Correa de transmisión Tipo B medida {s}\\" para maquinaria industrial.",')
    lines.append(f'    shortDescription: "Correa Tipo B {s}\\".",')
    lines.append(f'    category: "Accesorios",')
    lines.append(f'    image: "/assets/brands/rexon_x2.0.jpeg",')
    lines.append('  },')

belts = '\n'.join(lines) + '\n'
new_content = content[:idx] + belts + content[idx:]

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f'Added {len(sizes_b)} correas Tipo B (19-100)')
