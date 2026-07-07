FILEPATH = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts"

products = [
    ('ica-kit-sellador-pu-fp280v-25', 'ica-kit-sellador-pu-fp280v-25', 'ICA Kit Sellador P.U FP280V-25', 'FP280V-25', 'Kit sellador poliuretano ICA FP280V-25 para madera. Presentacion: Kit de 25 litros.', 'Kit sellador P.U FP280V-25.', '/assets/product-images/ica/kit-sellador-pu-fp280v-25.jpg'),
    ('ica-kit-tr-mate-pu-op550g10-25', 'ica-kit-transparente-mate-pu-op550g10-25', 'ICA Kit Transparente Mate P.U OP550G10-25', 'OP550G10-25', 'Kit transparente mate poliuretano ICA OP550G10-25 para madera. Presentacion: Kit de 25 litros.', 'Kit transparente mate P.U OP550G10-25.', '/assets/product-images/ica/kit-tr-mate-pu-op550g10-25.jpg'),
    ('ica-kit-tr-satinado-pu-op550g30-25', 'ica-kit-transparente-satinado-pu-op550g30-25', 'ICA Kit Transparente Satinado P.U OP550G30-25', 'OP550G30-25', 'Kit transparente satinado poliuretano ICA OP550G30-25 para madera. Presentacion: Kit de 25 litros.', 'Kit transparente satinado P.U OP550G30-25.', '/assets/product-images/ica/kit-tr-satinado-pu-op550g30-25.jpg'),
    ('ica-kit-tr-brillante-pu-lp173-25', 'ica-kit-transparente-brillante-pu-lp173-25', 'ICA Kit Transparente Brillante P.U LP173-25', 'LP173-25', 'Kit transparente brillante poliuretano ICA LP173-25 para madera. Presentacion: Kit de 25 litros.', 'Kit transparente brillante P.U LP173-25.', '/assets/product-images/ica/kit-tr-brillante-pu-lp173-25.jpg'),
    ('ica-kit-fondo-blanco-pu-fp1031-25', 'ica-kit-fondo-blanco-pu-fp1031-25', 'ICA Kit Fondo Blanco P.U FP1031-25', 'FP1031-25', 'Kit fondo blanco poliuretano ICA FP1031-25 para madera. Presentacion: Kit de 25 litros.', 'Kit fondo blanco P.U FP1031-25.', ''),
    ('ica-kit-blanco-mate-pu-op450b20-25', 'ica-kit-blanco-mate-pu-op450b20-25', 'ICA Kit Blanco Mate P.U OP450B20-25', 'OP450B20-25', 'Kit blanco mate poliuretano ICA OP450B20-25 para madera. Presentacion: Kit de 25 litros.', 'Kit blanco mate P.U OP450B20-25.', '/assets/product-images/ica/kit-blanco-mate-pu-op450b20-25.jpg'),
    ('ica-kit-blanco-satinado-pu-op450b80-25', 'ica-kit-blanco-satinado-pu-op450b80-25', 'ICA Kit Blanco Satinado P.U OP450B80-25', 'OP450B80-25', 'Kit blanco satinado poliuretano ICA OP450B80-25 para madera. Presentacion: Kit de 25 litros.', 'Kit blanco satinado P.U OP450B80-25.', '/assets/product-images/ica/kit-blanco-satinado-pu-op450b80-25.jpg'),
    ('ica-kit-blanco-brillante-pu-lp923-25', 'ica-kit-blanco-brillante-pu-lp923-25', 'ICA Kit Blanco Brillante P.U LP923-25', 'LP923-25', 'Kit blanco brillante poliuretano ICA LP923-25 para madera. Presentacion: Kit de 25 litros.', 'Kit blanco brillante P.U LP923-25.', '/assets/product-images/ica/kit-blanco-brillante-pu-lp923-25.jpg'),
    ('ica-kit-fondo-negro-pu-fp285n-25', 'ica-kit-fondo-negro-pu-fp285n-25', 'ICA Kit Fondo Negro P.U FP285N-25', 'FP285N-25', 'Kit fondo negro poliuretano ICA FP285N-25 para madera. Presentacion: Kit de 25 litros.', 'Kit fondo negro P.U FP285N-25.', '/assets/product-images/ica/kit-fondo-negro-pu-fp285n-25.jpg'),
    ('ica-kit-negro-satinado-pu-op550g20vn-25', 'ica-kit-negro-satinado-pu-op550g20vn-25', 'ICA Kit Negro Satinado P.U OP550G20VN-25', 'OP550G20VN-25', 'Kit negro satinado poliuretano ICA OP550G20VN-25 para madera. Presentacion: Kit de 25 litros.', 'Kit negro satinado P.U OP550G20VN-25.', '/assets/product-images/ica/kit-negro-satinado-pu-op550g20vn-25.jpg'),
]

with open(FILEPATH, "r", encoding="utf-8") as f:
    content = f.read()

marker = "ica-blanco-satinado-acuoso-a01032g55-05"
idx = content.find(marker)
end = content.find("\n", idx)
insert = end + 1

lines = []
for pid, slug, name, model, desc, short, img in products:
    img_field = f'image: "{img}"' if img else 'image: ""'
    lines.append(f'  {{ id: "{pid}", slug: "{slug}", name: "{name}", brand: "ICA", model: "{model}", description: "{desc}", shortDescription: "{short}", category: "Pinturas", subcategory: "Selladores", {img_field} }},')

new = "\n" + "\n".join(lines) + "\n"
content = content[:insert] + new + content[insert:]

with open(FILEPATH, "w", encoding="utf-8") as f:
    f.write(content)

print(f"Added {len(products)} ICA kit products (-25)")
