filepath = r'C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

mile_marker = '// ─── MILESCRAFT'
idx = content.find(mile_marker)

lines = []

# LIJA 4" AMARILLA RESPALDO ESPONJA
granos_esponja = [280, 320, 360, 400, 600]
for g in granos_esponja:
    lines.append('  {')
    lines.append(f'    id: "nf-4a-esp-{g}",')
    lines.append(f'    slug: "lija-4-amarilla-esponja-grano-{g}",')
    lines.append(f'    name: "Lija de 4 pulgadas Amarilla x MT para Lijar a Seco Respaldo Esponja - Grano {g}",')
    lines.append(f'    brand: "Nastroflex SPA",')
    lines.append(f'    model: "LAE-4-{g}",')
    lines.append(f'    description: "Lija de 4 pulgadas amarilla x metro para lijar a seco con respaldo esponja. Ancho 115mm, largo 25m. Grano {g}.",')
    lines.append(f'    shortDescription: "Lija 4 pulg amarilla esponja grano {g}.",')
    lines.append(f'    category: "Accesorios",')
    lines.append(f'    image: "/assets/brands/nastroflex.jpg",')
    lines.append('  },')

# LIJA DE AGUA POR PLIEGO (NEGRO)
granos_agua = [80, 100, 120, 150, 180, 220, 240, 320, 360, 400, 500, 600, 800, 1000, 1200, 1500, 2000]
for g in granos_agua:
    lines.append('  {')
    lines.append(f'    id: "nf-agua-negro-{g}",')
    lines.append(f'    slug: "lija-agua-pliego-negro-grano-{g}",')
    lines.append(f'    name: "Lija de Agua por Pliego (Negro) - Grano {g}",')
    lines.append(f'    brand: "Nastroflex SPA",')
    lines.append(f'    model: "LAPN-{g}",')
    lines.append(f'    description: "Lija de agua por pliego color negro. 230x280mm. Grano {g}.",')
    lines.append(f'    shortDescription: "Lija agua pliego negro grano {g}.",')
    lines.append(f'    category: "Accesorios",')
    lines.append(f'    image: "/assets/brands/nastroflex.jpg",')
    lines.append('  },')

# LIJA DE PLIEGO A SECO (GRIS)
granos_pliego = [180, 280, 320, 360]
for g in granos_pliego:
    lines.append('  {')
    lines.append(f'    id: "nf-pliego-gris-{g}",')
    lines.append(f'    slug: "lija-pliego-seco-gris-grano-{g}",')
    lines.append(f'    name: "Lija de Pliego a Seco (Gris) - Grano {g}",')
    lines.append(f'    brand: "Nastroflex SPA",')
    lines.append(f'    model: "LPSG-{g}",')
    lines.append(f'    description: "Lija de pliego para lijar a seco color gris. 230x280mm. Grano {g}.",')
    lines.append(f'    shortDescription: "Lija pliego seco gris grano {g}.",')
    lines.append(f'    category: "Accesorios",')
    lines.append(f'    image: "/assets/brands/nastroflex.jpg",')
    lines.append('  },')

products = '\n'.join(lines) + '\n'
new_content = content[:idx] + products + content[idx:]

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f'Added {len(granos_esponja) + len(granos_agua) + len(granos_pliego)} Nastroflex products')
