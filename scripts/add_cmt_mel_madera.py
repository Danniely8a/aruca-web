FILEPATH = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts"

products = []

for d, c, e, h, z, cod, tipo in [
    ('6-1/2"', '1,6', '2,21', '5/8"', 'Z36', 'P06036', 'madera'),
    ('6-1/2"', '1,6', '2,21', '5/8"', 'Z60', 'P06060', 'melamina'),
    ('7-1/4"', '1,6', '2,21', '5/8"', 'Z24', 'P07024', 'madera'),
    ('7-1/4"', '1,6', '2,21', '5/8"', 'Z40', 'P07040', 'madera'),
    ('7-1/4"', '1,6', '2,21', '5/8"', 'Z60', 'P07060', 'melamina'),
    ('8-1/4"', '1,6', '2,21', '5/8"', 'Z24', 'P08024', 'madera'),
    ('8-1/4"', '1,6', '2,21', '5/8"', 'Z40', 'P08040', 'madera'),
    ('8-1/4"', '1,6', '2,21', '5/8"', 'Z60', 'P08060', 'melamina'),
    ('10"', '1,6', '2,38', '5/8"', 'Z80', 'P10080', 'melamina'),
    ('12"', '1,8', '2,59', '1"', 'Z96', 'P12096', 'melamina'),
]:
    d_slug = d.replace('"', '')
    if tipo == 'melamina':
        sub = 'Discos para Melamina'
        nombre = f"CMT DISCO PARA MELAMINA {d} {z} {cod}"
        short = f"Disco CMT melamina {d} {z}."
    else:
        sub = 'Discos para Madera'
        nombre = f"CMT DISCO PARA MADERA {d} {z} {cod}"
        short = f"Disco CMT madera {d} {z}."
    slug = f"cmt-disco-{tipo}-{d_slug}-{z.lower()}-{cod.lower()}"
    desc = f"Disco CMT Contractor para {tipo}. Diametro {d}. Cuerpo {c}mm. Espesor {e}mm. Hueco {h}. {z} dientes. Codigo {cod}."
    img = f"/assets/product-images/cmt-contractor/{cod}.jpg"
    products.append(
        f'  {{ id: "cmt-con-disco-{tipo}-{d_slug}-{z.lower()}", slug: "{slug}", name: "{nombre}", '
        f'brand: "CMT Contractor", model: "{cod}", description: "{desc}", '
        f'shortDescription: "{short}", category: "Discos", subcategory: "{sub}", image: "{img}" }},'
    )

with open(FILEPATH, 'r', encoding='utf-8') as f:
    content = f.read()

cats_pos = content.rfind('export const productCategories')
prod_end = content.rfind('];', 0, cats_pos)

new_block = "\n".join(products) + "\n"
content = content[:prod_end + 2] + new_block + content[prod_end + 2:]

with open(FILEPATH, 'w', encoding='utf-8') as f:
    f.write(content)
print(f"Added {len(products)} CMT Contractor discos melamina/madera")
