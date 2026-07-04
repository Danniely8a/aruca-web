FILEPATH = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts"

products = [
    '  { id: "ica-solvente-pu-u1010-05", slug: "ica-solvente-pu-u1010-05", name: "ICA Solvente P.U U1010-05", brand: "ICA", model: "U1010-05", description: "Solvente poliuretano ICA U1010-05. Para dilucion y limpieza de productos P.U. Presentacion: 5 litros.", shortDescription: "Solvente P.U U1010-05.", category: "Pinturas", subcategory: "Selladores", image: "" },',
    '  { id: "ica-catalizador-c265-0250", slug: "ica-catalizador-c265-0250", name: "ICA Catalizador C265-0250", brand: "ICA", model: "C265-0250", description: "Catalizador ICA C265-0250 para productos poliuretano. Presentacion: 5 litros.", shortDescription: "Catalizador C265-0250.", category: "Pinturas", subcategory: "Selladores", image: "" },',
    '  { id: "ica-catalizador-c390-0250", slug: "ica-catalizador-c390-0250", name: "ICA Catalizador C390-0250", brand: "ICA", model: "C390-0250", description: "Catalizador ICA C390-0250 para productos poliuretano. Presentacion: 5 litros.", shortDescription: "Catalizador C390-0250.", category: "Pinturas", subcategory: "Selladores", image: "" },',
    '  { id: "ica-catalizador-c215-05", slug: "ica-catalizador-c215-05", name: "ICA Catalizador C215-05", brand: "ICA", model: "C215-05", description: "Catalizador ICA C215-05 para productos poliuretano. Presentacion: 5 litros.", shortDescription: "Catalizador C215-05.", category: "Pinturas", subcategory: "Selladores", image: "" },',
    '  { id: "ica-sellador-acuoso-fa580-05", slug: "ica-sellador-acuoso-fa580-05", name: "ICA Sellador Acuoso FA580-05", brand: "ICA", model: "FA580-05", description: "Sellador acuoso ICA FA580-05 para madera. Presentacion: 5 litros.", shortDescription: "Sellador acuoso FA580-05.", category: "Pinturas", subcategory: "Selladores", image: "" },',
    '  { id: "ica-tr-satinado-acuoso-a01033g30-05", slug: "ica-transparente-satinado-acuoso-a01033g30-05", name: "ICA Tr Satinado Acuoso A01033G30-05", brand: "ICA", model: "A01033G30-05", description: "Transparente satinado acuoso ICA A01033G30-05 para madera. Presentacion: 5 litros.", shortDescription: "Tr satinado acuoso A01033G30-05.", category: "Pinturas", subcategory: "Transparentes", image: "" },',
    '  { id: "ica-fondo-blanco-acuoso-a08f05-05", slug: "ica-fondo-blanco-acuoso-a08f05-05", name: "ICA Fondo Blanco Acuoso A08F05-05", brand: "ICA", model: "A08F05-05", description: "Fondo blanco acuoso ICA A08F05-05 para madera. Presentacion: 5 litros.", shortDescription: "Fondo blanco acuoso A08F05-05.", category: "Pinturas", subcategory: "Fondos", image: "" },',
    '  { id: "ica-blanco-satinado-acuoso-a01032g55-05", slug: "ica-blanco-satinado-acuoso-a01032g55-05", name: "ICA Blanco Satinado Acuoso A01032G55-05", brand: "ICA", model: "A01032G55-05", description: "Blanco satinado acuoso ICA A01032G55-05 para madera. Presentacion: 5 litros.", shortDescription: "Blanco satinado acuoso A01032G55-05.", category: "Pinturas", subcategory: "Fondos", image: "" },',
]

with open(FILEPATH, "r", encoding="utf-8") as f:
    content = f.read()

marker = "ica-kit-negro-satinado-op550c2dvn-05"
idx = content.find(marker)
end = content.find("\n", idx)
insert = end + 1

new = "\n" + "\n".join(products) + "\n"
content = content[:insert] + new + content[insert:]

with open(FILEPATH, "w", encoding="utf-8") as f:
    f.write(content)

print("Added 8 ICA products")
