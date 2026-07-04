filepath = r'C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

nastroflex_end = '// ─── MARCAS ADICIONALES'
idx = content.find(nastroflex_end)

lines = []

# FIBRODISCOS 7" (8 huecos) - Grano: 16, 24, 36, 50, 60, 80, 100, 120
for g in [16, 24, 36, 50, 60, 80, 100, 120]:
    lines.append('  {')
    lines.append(f'    id: "nf-fibrodisco-7-{g}",')
    lines.append(f'    slug: "fibrodisco-7-8huecos-grano-{g}",')
    lines.append(f'    name: "Fibrodisco 7\\" (8 Huecos) - Grano {g}",')
    lines.append(f'    brand: "Nastroflex SPA",')
    lines.append(f'    model: "FD-7-{g}",')
    lines.append(f'    description: "Fibrodisco 7 pulgadas, 8 huecos, grano {g}.",')
    lines.append(f'    shortDescription: "Fibrodisco 7\\" grano {g}.",')
    lines.append(f'    category: "Discos",')
    lines.append(f'    image: "/assets/brands/nastroflex.jpg",')
    lines.append('  },')

# DISCOS FLAP 4-1/2" - Grano: 40, 60, 80, 120
for g in [40, 60, 80, 120]:
    lines.append('  {')
    lines.append(f'    id: "nf-disco-flap-450-{g}",')
    lines.append(f'    slug: "disco-flap-4-1-2-grano-{g}",')
    lines.append(f'    name: "Disco Flap 4-1/2\\" - Grano {g}",')
    lines.append(f'    brand: "Nastroflex SPA",')
    lines.append(f'    model: "DF-450-{g}",')
    lines.append(f'    description: "Disco flap 4-1/2 pulgadas, grano {g}.",')
    lines.append(f'    shortDescription: "Disco flap 4-1/2\\" grano {g}.",')
    lines.append(f'    category: "Discos",')
    lines.append(f'    image: "/assets/brands/nastroflex.jpg",')
    lines.append('  },')

# ESPONJA ABRASIVA 69x98mm - Grano: 36, 60, 100
for g in [36, 60, 100]:
    lines.append('  {')
    lines.append(f'    id: "nf-esponja-69x98-{g}",')
    lines.append(f'    slug: "esponja-abrasiva-69x98-grano-{g}",')
    lines.append(f'    name: "Esponja Abrasiva 69x98mm - Grano {g}",')
    lines.append(f'    brand: "Nastroflex SPA",')
    lines.append(f'    model: "EA-69x98-{g}",')
    lines.append(f'    description: "Esponja abrasiva 69x98mm, grano {g}.",')
    lines.append(f'    shortDescription: "Esponja abrasiva 69x98mm grano {g}.",')
    lines.append(f'    category: "Accesorios",')
    lines.append(f'    image: "/assets/brands/nastroflex.jpg",')
    lines.append('  },')

# GRARTO POR METRO (Tela) - Ancho: 120mm, 150mm
for ancho in [120, 150]:
    lines.append('  {')
    lines.append(f'    id: "nf-grarto-metro-{ancho}",')
    lines.append(f'    slug: "grarto-por-metro-{ancho}mm-tela",')
    lines.append(f'    name: "Grarto por Metro {ancho}mm - Tela",')
    lines.append(f'    brand: "Nastroflex SPA",')
    lines.append(f'    model: "GM-{ancho}-T",')
    lines.append(f'    description: "Grarto por metro {ancho}mm de ancho, tela.",')
    lines.append(f'    shortDescription: "Grarto por metro {ancho}mm tela.",')
    lines.append(f'    category: "Accesorios",')
    lines.append(f'    image: "/assets/brands/nastroflex.jpg",')
    lines.append('  },')

# BANDA 115x10m
lines.append('  {')
lines.append(f'    id: "nf-banda-115x10",')
lines.append(f'    slug: "banda-lija-115mm-10m",')
lines.append(f'    name: "Banda de Lija 115mm x 10m",')
lines.append(f'    brand: "Nastroflex SPA",')
lines.append(f'    model: "BL-115-10",')
lines.append(f'    description: "Banda de lija 115mm de ancho, largo 10m.",')
lines.append(f'    shortDescription: "Banda lija 115mm x 10m.",')
lines.append(f'    category: "Accesorios",')
lines.append(f'    image: "/assets/brands/nastroflex.jpg",')
lines.append('  },')

products = '\n'.join(lines) + '\n'
new_content = content[:idx] + products + content[idx:]

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)

count = 8 + 4 + 3 + 2 + 1
print(f'Added {count} more Nastroflex products')
