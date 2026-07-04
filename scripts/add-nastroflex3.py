filepath = r'C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

mile_marker = '// ─── MILESCRAFT'
idx = content.find(mile_marker)

lines = []

# LIJA DE TELA MARRON POR METRO
tela_metro = [
    (152, 40), (152, 60), (152, 80),
    (300, 24), (300, 40), (300, 60), (300, 80)
]
for ancho, grano in tela_metro:
    lines.append('  {')
    lines.append(f'    id: "nf-tela-metro-{ancho}-{grano}",')
    lines.append(f'    slug: "lija-tela-marron-metro-{ancho}mm-grano-{grano}",')
    lines.append(f'    name: "Lija de Tela Marron por Metro {ancho}mm - Grano {grano}",')
    lines.append(f'    brand: "Nastroflex SPA",')
    lines.append(f'    model: "LTM-{ancho}-{grano}",')
    lines.append(f'    description: "Lija de tela marron por metro. Ancho {ancho}mm, largo 50m. Grano {grano}.",')
    lines.append(f'    shortDescription: "Lija tela marron {ancho}mm grano {grano}.",')
    lines.append(f'    category: "Accesorios",')
    lines.append(f'    image: "/assets/brands/nastroflex.jpg",')
    lines.append('  },')

# BANDAS DE LIJA MARRON DE TELA
bandas_tela = [
    (3, 18, 40), (3, 18, 60), (3, 18, 80),
    (3, 21, 40), (3, 21, 60), (3, 21, 80),
    (4, 24, 40), (4, 24, 60), (4, 24, 80)
]
for pulg_ancho, pulg_largo, grano in bandas_tela:
    lines.append('  {')
    lines.append(f'    id: "nf-banda-{pulg_ancho}x{pulg_largo}-{grano}",')
    lines.append(f'    slug: "banda-lija-marron-tela-{pulg_ancho}x{pulg_largo}-grano-{grano}",')
    lines.append(f'    name: "Banda de Lija Marron de Tela {pulg_ancho}" x {pulg_largo}" - Grano {grano}",')
    lines.append(f'    brand: "Nastroflex SPA",')
    lines.append(f'    model: "BLMT-{pulg_ancho}{pulg_largo}-{grano}",')
    lines.append(f'    description: "Banda de lija marron de tela {pulg_ancho} x {pulg_largo} pulgadas. Grano {grano}.",')
    lines.append(f'    shortDescription: "Banda lija marron {pulg_ancho}x{pulg_largo} grano {grano}.",')
    lines.append(f'    category: "Accesorios",')
    lines.append(f'    image: "/assets/brands/nastroflex.jpg",')
    lines.append('  },')

# BANDAS DE LIJA MARRON DE TELA FLEXIBLE
bandas_flex = [(60, 80, 120, 180)]
for grano in [60, 80, 120, 180]:
    lines.append('  {')
    lines.append(f'    id: "nf-banda-flex-115-{grano}",')
    lines.append(f'    slug: "banda-lija-marron-tela-flexible-115mm-grano-{grano}",')
    lines.append(f'    name: "Banda de Lija Marron de Tela Flexible 115mm - Grano {grano}",')
    lines.append(f'    brand: "Nastroflex SPA",')
    lines.append(f'    model: "BLMF-115-{grano}",')
    lines.append(f'    description: "Banda de lija marron de tela flexible. Ancho 115mm, largo 50m. Grano {grano}.",')
    lines.append(f'    shortDescription: "Banda lija flexible 115mm grano {grano}.",')
    lines.append(f'    category: "Accesorios",')
    lines.append(f'    image: "/assets/brands/nastroflex.jpg",')
    lines.append('  },')

# LIJA DE PAPEL SOBRE VELCRO PARA LIJAR A SECO
granos_velcro = [40, 60, 80, 120, 150, 180, 220, 240, 280, 320, 360, 400]
for g in granos_velcro:
    lines.append('  {')
    lines.append(f'    id: "nf-velcro-125-{g}",')
    lines.append(f'    slug: "lija-papel-velcro-seco-125mm-grano-{g}",')
    lines.append(f'    name: "Lija de Papel sobre Velcro para Lijar a Seco 125mm - Grano {g}",')
    lines.append(f'    brand: "Nastroflex SPA",')
    lines.append(f'    model: "LPV-{g}",')
    lines.append(f'    description: "Lija de papel sobre velcro para lijar a seco. Diametro 125mm, 8 huecos. Grano {g}.",')
    lines.append(f'    shortDescription: "Lija papel velcro 125mm grano {g}.",')
    lines.append(f'    category: "Accesorios",')
    lines.append(f'    image: "/assets/brands/nastroflex.jpg",')
    lines.append('  },')

products = '\n'.join(lines) + '\n'
new_content = content[:idx] + products + content[idx:]

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f'Added {len(tela_metro) + len(bandas_tela) + 4 + len(granos_velcro)} Nastroflex products')
