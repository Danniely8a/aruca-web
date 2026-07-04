FILEPATH = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts"

products = [
    '  { id: "ica-kit-tr-brillante-lp173-05", slug: "ica-kit-transparente-brillante-pu-lp173-05", name: "ICA Kit Transparente Brillante P.U LP173-05", brand: "ICA", model: "LP173-05", description: "Kit transparente brillante poliuretano ICA LP173-05 para madera. Presentacion: Kit de 7.5 litros (5 litros base + 2.5 litros catalizador C-265 al 50%).", shortDescription: "Kit transparente brillante P.U LP173-05.", category: "Pinturas", subcategory: "Transparentes", image: "" },',
    '  { id: "ica-kit-blanco-mate-op450g20-05", slug: "ica-kit-blanco-mate-pu-op450g20-05", name: "ICA Kit Blanco Mate P.U OP450G20-05", brand: "ICA", model: "OP450G20-05", description: "Kit blanco mate poliuretano ICA OP450G20-05 para madera. Presentacion: Kit de 7.5 litros (5 litros base + 2.5 litros catalizador C-265 al 50%).", shortDescription: "Kit blanco mate P.U OP450G20-05.", category: "Pinturas", subcategory: "Fondos", image: "" },',
    '  { id: "ica-kit-blanco-satinado-op450g80-05", slug: "ica-kit-blanco-satinado-pu-op450g80-05", name: "ICA Kit Blanco Satinado P.U OP450G80-05", brand: "ICA", model: "OP450G80-05", description: "Kit blanco satinado poliuretano ICA OP450G80-05 para madera. Presentacion: Kit de 7.5 litros (5 litros base + 2.5 litros catalizador C-265 al 50%).", shortDescription: "Kit blanco satinado P.U OP450G80-05.", category: "Pinturas", subcategory: "Fondos", image: "" },',
    '  { id: "ica-kit-blanco-brillante-op450g80-05", slug: "ica-kit-blanco-brillante-pu-op450g80-05", name: "ICA Kit Blanco Brillante P.U OP450G80-05", brand: "ICA", model: "OP450G80-05", description: "Kit blanco brillante poliuretano ICA OP450G80-05 para madera. Presentacion: Kit de 7.5 litros (5 litros base + 2.5 litros catalizador C-265 al 50%).", shortDescription: "Kit blanco brillante P.U OP450G80-05.", category: "Pinturas", subcategory: "Fondos", image: "" },',
    '  { id: "ica-kit-fondo-negro-bp285n-05", slug: "ica-kit-fondo-negro-pu-bp285n-05", name: "ICA Kit Fondo Negro P.U BP285N-05", brand: "ICA", model: "BP285N-05", description: "Kit fondo negro poliuretano ICA BP285N-05 para madera. Presentacion: Kit de 7.5 litros (5 litros base + 2.5 litros catalizador C-265 al 50%).", shortDescription: "Kit fondo negro P.U BP285N-05.", category: "Pinturas", subcategory: "Fondos", image: "" },',
    '  { id: "ica-kit-negro-satinado-op550c2dvn-05", slug: "ica-kit-negro-satinado-pu-op550c2dvn-05", name: "ICA Kit Negro Satinado P.U OP550C2DVN-05", brand: "ICA", model: "OP550C2DVN-05", description: "Kit negro satinado poliuretano ICA OP550C2DVN-05 para madera. Presentacion: Kit de 7.5 litros (5 litros base + 2.5 litros catalizador C-265 al 50%).", shortDescription: "Kit negro satinado P.U OP550C2DVN-05.", category: "Pinturas", subcategory: "Transparentes", image: "" },',
]

with open(FILEPATH, "r", encoding="utf-8") as f:
    content = f.read()

marker = "ica-icadeck-05"
idx = content.find(marker)
end = content.find("\n", idx)
insert = end + 1

new = "\n" + "\n".join(products) + "\n"
content = content[:insert] + new + content[insert:]

with open(FILEPATH, "w", encoding="utf-8") as f:
    f.write(content)

print("Added 6 ICA kit products")
