FILEPATH = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts"

def esc(s):
    return s.replace('"', '\\"')

lines = []

def add(pid, slug, name, modelo, desc, short, cat, sub):
    lines.append(
        f'  {{ id: "{pid}", slug: "{slug}", name: "{esc(name)}", brand: "CMT Contractor", model: "{esc(modelo)}", '
        f'description: "{esc(desc)}", shortDescription: "{esc(short)}", '
        f'category: "{cat}", subcategory: "{sub}", image: "/assets/product-images/cmt-contractor/{esc(modelo)}.jpg" }},'
    )

# DISCOS PARA MADERA - SERIE K
for d, c, e, h, z, cod in [
    ('4-3/8"', '1', '1,5', '5/8"', 'Z36', 'K03604'),
    ('6-1/2"', '1,19', '1,8', '5/8"', 'Z36', 'K03606'),
    ('7-1/4"', '1,19', '1,8', '5/8"', 'Z24', 'K02407'),
    ('7-1/4"', '1,19', '1,8', '5/8"', 'Z40', 'K04007'),
    ('7-1/4"', '1,19', '1,8', '5/8"', 'Z60', 'K06007'),
    ('8-1/4"', '1,19', '1,8', '5/8"', 'Z24', 'K02408'),
    ('8-1/4"', '1,19', '1,8', '5/8"', 'Z40', 'K04008'),
    ('10"', '1,6', '2,38', '5/8"', 'Z24', 'K02410'),
    ('10"', '1,6', '2,38', '5/8"', 'Z40', 'K04010'),
    ('10"', '1,6', '2,38', '5/8"', 'Z60', 'K06010'),
    ('10"', '1,6', '2,38', '5/8"', 'Z80', 'K08010'),
    ('12"', '1,8', '2,59', '1"', 'Z24', 'K02412'),
    ('12"', '1,8', '2,59', '1"', 'Z40', 'K04012'),
    ('12"', '1,8', '2,59', '1"', 'Z60', 'K06012'),
    ('12"', '1,8', '2,59', '1"', 'Z80', 'K08012'),
    ('14"', '2,21', '3,2', '1"', 'Z60', 'K06014'),
]:
    d_slug = d.replace('"', '')
    slug = f"cmt-disco-madera-{d_slug}-{z.lower()}-{cod.lower()}"
    add(f"cmt-con-disco-madera-{d_slug}-{z.lower()}", slug,
        f"CMT DISCO PARA MADERA {d} {z} {cod}",
        cod,
        f"Disco CMT Contractor para madera y derivados. Diametro {d}. Cuerpo {c}mm. Espesor {e}mm. Hueco {h}. {z} dientes. Codigo {cod}.",
        f"Disco CMT madera {d} {z}.", "Discos", "Discos para Madera")

print(f"Generated {len(lines)} CMT Contractor discos madera")

# Insert into products.ts
with open(FILEPATH, 'r', encoding='utf-8') as f:
    content = f.read()

marker = "];"
# Find the last ]; which should be the products array closing
pos = content.rfind("export const productCategories")
back_pos = content.rfind("];", 0, pos)
if back_pos == -1:
    print("ERROR: Could not find insertion point")
else:
    new_block = "\n" + "\n".join(lines) + "\n"
    new_content = content[:back_pos + 2] + new_block + content[back_pos + 2:]
    with open(FILEPATH, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Successfully inserted {len(lines)} CMT Contractor discos madera")
