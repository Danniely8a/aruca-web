FILEPATH = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts"

def esc(s):
    return s.replace('"', '\\"')

lines = []

def add(pid, slug, name, modelo, desc, short, cat, sub):
    lines.append(
        f'  {{ id: "{pid}", slug: "{slug}", name: "{esc(name)}", brand: "CMT Contractor", model: "{esc(modelo)}", '
        f'description: "{esc(desc)}", shortDescription: "{esc(short)}", '
        f'category: "{cat}", subcategory: "{sub}", image: "" }},'
    )

# =============================================
# DISCOS - METALES NO FERROSOS (ALUMINIO)
# =============================================

# 7-1/4" Z56
d, c, e, h, z, cod = '7-1/4"', '1,6', '2,21', '5/8"', 'Z56', 'P-7056N'
d_slug = d.replace('"', '').replace('/', '-')
slug = f"cmt-disco-aluminio-{d_slug}-{z.lower()}-{cod.lower()}"
add(f"cmt-con-disco-alu-{d_slug}", slug,
    f"CMT DISCO PARA METALES NO FERROSOS (ALUMINIO) {d} {z} {cod}",
    cod,
    f"Disco CMT Contractor para metales no ferrosos (aluminio). Diametro {d}. Cuerpo {c}mm. Espesor {e}mm. Hueco {h}. {z} dientes. Codigo {cod}.",
    f"Disco CMT aluminio {d} {z}.", "Discos", "Discos para Metales No Ferrosos")

# 10" Z80
d, c, e, h, z, cod = '10"', '1,6', '2,38', '5/8"', 'Z80', 'P10080N'
d_slug = d.replace('"', '')
slug = f"cmt-disco-aluminio-{d_slug}-{z.lower()}-{cod.lower()}"
add(f"cmt-con-disco-alu-{d_slug}", slug,
    f"CMT DISCO PARA METALES NO FERROSOS (ALUMINIO) {d} {z} {cod}",
    cod,
    f"Disco CMT Contractor para metales no ferrosos (aluminio). Diametro {d}. Cuerpo {c}mm. Espesor {e}mm. Hueco {h}. {z} dientes. Codigo {cod}.",
    f"Disco CMT aluminio {d} {z}.", "Discos", "Discos para Metales No Ferrosos")

# 12" Z96
d, c, e, h, z, cod = '12"', '2', '2,79', '1"', 'Z96', 'P12096N'
d_slug = d.replace('"', '')
slug = f"cmt-disco-aluminio-{d_slug}-{z.lower()}-{cod.lower()}"
add(f"cmt-con-disco-alu-{d_slug}", slug,
    f"CMT DISCO PARA METALES NO FERROSOS (ALUMINIO) {d} {z} {cod}",
    cod,
    f"Disco CMT Contractor para metales no ferrosos (aluminio). Diametro {d}. Cuerpo {c}mm. Espesor {e}mm. Hueco {h}. {z} dientes. Codigo {cod}.",
    f"Disco CMT aluminio {d} {z}.", "Discos", "Discos para Metales No Ferrosos")

print(f"Generated {len(lines)} CMT Contractor discos")

# Insert into products.ts
with open(FILEPATH, 'r', encoding='utf-8') as f:
    content = f.read()

marker = "export const productCategories"
insert_pos = content.rfind(marker)
if insert_pos == -1:
    print("ERROR: Could not find insertion point")
else:
    back_pos = content.rfind("];", 0, insert_pos)
    if back_pos == -1:
        print("ERROR: Could not find ]; before productCategories")
    else:
        new_block = "\n" + "\n".join(lines) + "\n"
        new_content = content[:back_pos + 2] + new_block + content[back_pos + 2:]
        with open(FILEPATH, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Successfully inserted {len(lines)} CMT Contractor discos into products.ts")
