filepath = r'C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

idx = content.find('export const productCategories')

lines = []

# BARRAS EN HM (17 products)
barras = [
    (4, 2), (6, 2), (8, 2),
    (10, 4), (12, 4), (16, 4), (20, 4), (25, 4), (30, 4), (35, 4),
    (10, 5), (12, 5), (16, 5), (20, 5), (25, 5), (30, 5), (35, 5),
]
for ancho, espesor in barras:
    lines.append(f'  {{ id: "tigra-barra-310x{ancho}x{espesor}", slug: "tigra-barra-hm-310x{ancho}x{espesor}", name: "Tigra Barra HM 310x{ancho}x{espesor}mm", brand: "Tigra", model: "Barra HM", description: "Barra HM. Largo 310mm, ancho {ancho}mm, espesor {espesor}mm.", shortDescription: "Barra HM 310x{ancho}x{espesor}.", category: "Widias", image: "/assets/product-images/tigra/BARRAS EN HM.jpg" }},')

# DIENTES PARA DISCO (11 products)
dientes_disco = [
    (8.5, 3.3, 2.5),
    (10.5, 3.6, 3), (10.5, 3.8, 3), (10.5, 4.1, 3), (10.5, 4.3, 3),
    (10.5, 4.5, 3), (10.5, 4.8, 3), (10.5, 5, 3), (10.5, 5.5, 3),
    (10.5, 6, 3), (10.5, 6.5, 3),
]
for largo, ancho, espesor in dientes_disco:
    ancho_str = str(ancho).replace('.', '_')
    lines.append(f'  {{ id: "tigra-ddisco-{largo}x{ancho}x{espesor}", slug: "tigra-diente-disco-{largo}x{ancho}x{espesor}", name: "Tigra Diente para Disco {largo}x{ancho}x{espesor}mm", brand: "Tigra", model: "Diente Disco", description: "Diente para disco. Largo {largo}mm, ancho {ancho}mm, espesor {espesor}mm.", shortDescription: "Diente disco {largo}x{ancho}x{espesor}.", category: "Widias", image: "/assets/product-images/tigra/DIENTES PARA DISCO.png" }},')

# DIENTES PARA FRESA (13 products)
dientes_fresa = [
    (13, 4.5, 4), (13, 4.9, 4), (13, 5.5, 4), (13, 6.5, 4),
    (13, 8.5, 4), (13, 11, 4), (14.5, 11, 4), (13, 13, 4),
    (14.5, 13, 4), (14.5, 16, 4), (13, 17, 4), (13, 21, 4),
]
for largo, ancho, espesor in dientes_fresa:
    ancho_str = str(ancho).replace('.', '_')
    lines.append(f'  {{ id: "tigra-dfresa-{largo}x{ancho}x{espesor}", slug: "tigra-diente-fresa-{largo}x{ancho}x{espesor}", name: "Tigra Diente para Fresa {largo}x{ancho}x{espesor}mm", brand: "Tigra", model: "Diente Fresa", description: "Diente para fresa. Largo {largo}mm, ancho {ancho}mm, espesor {espesor}mm.", shortDescription: "Diente fresa {largo}x{ancho}x{espesor}.", category: "Widias", image: "/assets/product-images/tigra/DIENTES PARA FRESA.png" }},')

# VARIOS PARA SOLDAR (4 products)
varios = [
    ("tigra-borax-harris", "Borax Harris 1/4lbs", "Borax Harris 1/4lbs. Unidad.", "BORAX.png"),
    ("tigra-borax-generica", "Borax Generica 1/4lbs", "Borax generica 1/4lbs. Unidad.", "BORAX.png"),
    ("tigra-varilla-plata", "Varilla Plata GN", "Varilla de plata GN. Unidad.", "VARILLA PLATA.png"),
    ("tigra-electrodo-hc", "Electrodo H. Colado 1/8\"", "Electrodo H. Colado 1/8\". Unidad.", "ELECTRODO.png"),
]
for pid, name, desc, img in varios:
    lines.append(f'  {{ id: "{pid}", slug: "{pid}", name: "Tigra {name}", brand: "Tigra", model: "{name}", description: "{desc}", shortDescription: "{name}.", category: "Widias", image: "/assets/product-images/tigra/{img}" }},')

new_content = content[:idx] + '\n'.join(lines) + '\n' + content[idx:]

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)

count = len(barras) + len(dientes_disco) + len(dientes_fresa) + len(varios)
print(f'Added {count} TIGRA products')
