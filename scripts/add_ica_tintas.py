import re

FILEPATH = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts"

tintas = [
    ("ica-tinta-cereza", "ica-tinta-cereza-in111-001", "ICA Tinta Cereza IN111-001", "IN111-001", "Tinta ICA color cereza para madera IN111-001.", "Tinta cereza IN111-001."),
    ("ica-tinta-roja", "ica-tinta-roja-in131-01", "ICA Tinta Roja IN131-01", "IN131-01", "Tinta ICA color roja para madera IN131-01.", "Tinta roja IN131-01."),
    ("ica-tinta-caoba", "ica-tinta-caoba-in134-01", "ICA Tinta Caoba IN134-01", "IN134-01", "Tinta ICA color caoba para madera IN134-01.", "Tinta caoba IN134-01."),
    ("ica-tinta-nogal-medio", "ica-tinta-nogal-medio-in136-01", "ICA Tinta Nogal Medio IN136-01", "IN136-01", "Tinta ICA color nogal medio para madera IN136-01.", "Tinta nogal medio IN136-01."),
    ("ica-tinta-naranja", "ica-tinta-naranja-in139-001", "ICA Tinta Naranja IN139-001", "IN139-001", "Tinta ICA color naranja para madera IN139-001.", "Tinta naranja IN139-001."),
    ("ica-tinta-rojo-vivo", "ica-tinta-rojo-vivo-in132-01", "ICA Tinta Rojo Vivo IN132-01", "IN132-01", "Tinta ICA color rojo vivo para madera IN132-01.", "Tinta rojo vivo IN132-01."),
    ("ica-tinta-amarilla", "ica-tinta-amarilla-in151-01", "ICA Tinta Amarilla IN151-01", "IN151-01", "Tinta ICA color amarilla para madera IN151-01.", "Tinta amarilla IN151-01."),
    ("ica-tinta-verde", "ica-tinta-verde-in161-01", "ICA Tinta Verde IN161-01", "IN161-01", "Tinta ICA color verde para madera IN161-01.", "Tinta verde IN161-01."),
    ("ica-tinta-azul", "ica-tinta-azul-in166-01", "ICA Tinta Azul IN166-01", "IN166-01", "Tinta ICA color azul para madera IN166-01.", "Tinta azul IN166-01."),
    ("ica-tinta-negra", "ica-tinta-negra-in168-01", "ICA Tinta Negra IN168-01", "IN168-01", "Tinta ICA color negra para madera IN168-01.", "Tinta negra IN168-01."),
    ("ica-tinta-vengU", "ica-tinta-venguete-infpu-n42755", "ICA Tinta Venguete INFPU N42755", "INFPU N42755", "Tinta ICA color venguete para madera INFPU N42755.", "Tinta venguete INFPU N42755."),
]

IMG = "/assets/product-images/ica/tinta.jpg"

lines_to_add = []
for pid, slug, name, model, desc, short in tintas:
    lines_to_add.append(
        f'  {{ id: "{pid}", slug: "{slug}", name: "{name}", brand: "ICA", model: "{model}", description: "{desc}", shortDescription: "{short}", category: "Pinturas", subcategory: "Tintas", image: "{IMG}" }},'
    )

with open(FILEPATH, "r", encoding="utf-8") as f:
    content = f.read()

# Find insertion point: before the last ]; (end of products array)
# Find the last product line with "ica-parquet-brillante"
marker = 'ica-parquet-brillante'
idx = content.find(marker)
# Find end of that line
end_of_line = content.find('\n', idx)
# Insert after that line
insert_point = end_of_line + 1

new_section = '\n' + '\n'.join(lines_to_add) + '\n'
content = content[:insert_point] + new_section + content[insert_point:]

# Add "Tintas" subcategory if not present
if '"Tintas"' not in content:
    content = content.replace('  "Transparentes",\n', '  "Transparentes",\n  "Tintas",\n')

with open(FILEPATH, "w", encoding="utf-8") as f:
    f.write(content)

print(f"Added {len(tintas)} ICA tinta products")
