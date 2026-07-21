import re

products = []

# All KEX MECHA HSS sizes from the images
sizes = [
    '1/16"', '1/32"', '1/8"', '1/4"', '1/2"',
    '10 MM', '10.5 MM', '11 MM', '11.5 MM', '11/64"',
    '12 MM', '12.5 MM', '13/32"', '13/64"', '15 MM',
    '15/32"', '15/64"', '17/64"',
    '19/64"', '2 MM', '2.5 MM', '21/64"', '23/64"',
    '25/64"', '27/64"', '29/64"', '3 MM', '3.5 MM',
    '5/16"', '5/32"', '5/64"', '3/8"', '3/4"',
    '7/64"', '7/32"', '4 MM', '4.2 MM', '4.5 MM',
    '5 MM', '5.5 MM', '5/8"', '6 MM', '6.5 MM',
    '7 MM', '7.5 MM', '7/16"',
    '8 MM', '8.5 MM', '9 MM', '9.5 MM', '9/64"', '9/32"',
]

for size in sizes:
    # Replace " for inches in name only, slug uses "in"
    name_size = size
    slug_size = size.replace('"', 'in').replace('/', '-').replace('.', '-')
    products.append({
        "name": f"KEX MECHA HSS {name_size}",
        "model": f"KEX-HSS-{slug_size}",
        "desc": f"Mecha KEX HSS de alta calidad. Diametro {size}. Material HSS resistente al desgaste.",
        "short": f"Mecha HSS {size}",
        "cat": "Herramientas de Taladro",
        "sub": "Mechas",
        "img": "/assets/product-images/kex/kex-mecha-hss.jpg"
    })

# Generate TypeScript entries
lines = []
for p in products:
    slug = p["name"].lower().replace('"', '').replace('/', '-').replace(' ', '-').replace('+', '-')
    slug = re.sub(r'-+', '-', slug).strip('-')
    # Escape double quotes in values
    name = p["name"].replace('"', '\\"')
    desc = p["desc"].replace('"', '\\"')
    short = p["short"].replace('"', '\\"')
    lines.append(f'  {{ id: "{slug}", slug: "{slug}", name: "{name}", brand: "KEX", model: "{p["model"]}", description: "{desc}", shortDescription: "{short}", category: "{p["cat"]}", subcategory: "{p["sub"]}", image: "{p["img"]}" }},')

with open("new_products_kex.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(lines))

print(f"Total products: {len(products)}")
print("Written to new_products_kex.txt")
