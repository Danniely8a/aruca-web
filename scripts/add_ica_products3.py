FILEPATH = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts"

products = [
    ('ica-solvente-pu-d1010-25', 'ica-solvente-pu-d1010-25', 'ICA Solvente P.U D1010-25', 'D1010-25', 'Solvente poliuretano ICA D1010-25. Para dilucion y limpieza de productos P.U. Presentacion: 25 litros.', 'Solvente P.U D1010-25.', '/assets/product-images/ica/solvente-pu-d1010-25.png', 'Selladores'),
    ('ica-catalizador-c265-125', 'ica-catalizador-c265-125', 'ICA Catalizador C265-125', 'C265-125', 'Catalizador ICA C265-125 para productos poliuretano. Presentacion: 12.5 litros.', 'Catalizador C265-125.', '/assets/product-images/ica/catalizador-c265-125.png', 'Selladores'),
    ('ica-catalizador-c390-125', 'ica-catalizador-c390-125', 'ICA Catalizador C390-125', 'C390-125', 'Catalizador ICA C390-125 para productos poliuretano. Presentacion: 12.5 litros.', 'Catalizador C390-125.', '/assets/product-images/ica/catalizador-c390-125.png', 'Selladores'),
    ('ica-catalizador-c215-125', 'ica-catalizador-c215-125', 'ICA Catalizador C215-125', 'C215-125', 'Catalizador ICA C215-125 para productos poliuretano. Presentacion: 12.5 litros.', 'Catalizador C215-125.', '/assets/product-images/ica/catalizador-c215-125.png', 'Selladores'),
    ('ica-sellador-acuoso-fa580ec-20', 'ica-sellador-acuoso-fa580ec-20', 'ICA Sellador Acuoso FA580EC-20', 'FA580EC-20', 'Sellador acuoso ICA FA580EC-20 para madera. Presentacion: 20 litros.', 'Sellador acuoso FA580EC-20.', '/assets/product-images/ica/sellador-acuoso-fa580ec-20.png', 'Selladores'),
    ('ica-tr-satinado-acuoso-ao1033g30-25', 'ica-transparente-satinado-acuoso-ao1033g30-25', 'ICA Tr Satinado Acuoso AO1033G30-25', 'AO1033G30-25', 'Transparente satinado acuoso ICA AO1033G30-25 para madera. Presentacion: 25 litros.', 'Tr satinado acuoso AO1033G30-25.', '/assets/product-images/ica/tr-satinado-acuoso-ao1033g30-25.png', 'Transparentes'),
    ('ica-fondo-blanco-fab970-25', 'ica-fondo-blanco-fab970-25', 'ICA Fondo Blanco Fab970-25', 'FAB970-25', 'Fondo blanco acuoso ICA FAB970-25 para madera. Presentacion: 25 litros.', 'Fondo blanco FAB970-25.', '/assets/product-images/ica/fondo-blanco-fab970-25.png', 'Fondos'),
    ('ica-blanco-acuoso-aob1032g55-25', 'ica-blanco-acuoso-aob1032g55-25', 'ICA Blanco Acuoso AOB1032G55-25', 'AOB1032G55-25', 'Blanco acuoso ICA AOB1032G55-25 para madera. Presentacion: 25 litros.', 'Blanco acuoso AOB1032G55-25.', '/assets/product-images/ica/blanco-acuoso-aob1032g55-25.jpg', 'Fondos'),
]

with open(FILEPATH, "r", encoding="utf-8") as f:
    content = f.read()

marker = "ica-kit-negro-satinado-pu-op550g20vn-25"
idx = content.find(marker)
end = content.find("\n", idx)
insert = end + 1

lines = []
for pid, slug, name, model, desc, short, img, sub in products:
    lines.append(f'  {{ id: "{pid}", slug: "{slug}", name: "{name}", brand: "ICA", model: "{model}", description: "{desc}", shortDescription: "{short}", category: "Pinturas", subcategory: "{sub}", image: "{img}" }},')

new = "\n" + "\n".join(lines) + "\n"
content = content[:insert] + new + content[insert:]

with open(FILEPATH, "w", encoding="utf-8") as f:
    f.write(content)

print(f"Added {len(products)} ICA products")
