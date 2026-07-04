filepath = r'C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

granos = [80, 100, 120, 150, 180, 220, 240, 280, 320, 400]

# Find insertion point
mile_marker = '// ─── MILESCRAFT'
idx = content.find(mile_marker)

lines = []
for g in granos:
    lines.append('  {')
    lines.append(f'    id: "nastroflex-4a-{g}",')
    lines.append(f'    slug: "lija-4-amarilla-x-mt-seco-grano-{g}",')
    lines.append(f'    name: "Lija de 4 pulgadas Amarilla x MT para Lijar a Seco - Grano {g}",')
    lines.append(f'    brand: "Nastroflex SPA",')
    lines.append(f'    model: "LUA-4-{g}",')
    lines.append(f'    description: "Lija de 4 pulgadas amarilla x metro para lijar a seco. Ancho 115mm, largo 50m. Grano {g}.",')
    lines.append(f'    shortDescription: "Lija 4 pulg amarilla seco grano {g}.",')
    lines.append(f'    category: "Accesorios",')
    lines.append(f'    image: "/assets/brands/nastroflex.jpg",')
    lines.append('  },')

products = '\n'.join(lines) + '\n'
new_content = content[:idx] + products + content[idx:]

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f'Added {len(granos)} lijas Nastroflex')
