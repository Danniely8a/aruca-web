FILEPATH = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts"

products = [
    '  { id: "ica-topdeck-05", slug: "ica-topdeck-05", name: "ICA TOPDECK-05", brand: "ICA", model: "TOPDECK-05", description: "Acuoso monocapa exterior trafico ICA TOPDECK-05. Para madera en exterior de alto trafico.", shortDescription: "Topdeck-05 Acuoso exterior trafico.", category: "Pinturas", subcategory: "Transparentes", image: "/assets/product-images/ica/topdeck.jpg" },',
    '  { id: "ica-topdeck-01", slug: "ica-topdeck-01", name: "ICA TOPDECK-01", brand: "ICA", model: "TOPDECK-01", description: "Acuoso monocapa exterior trafico ICA TOPDECK-01. Para madera en exterior de alto trafico.", shortDescription: "Topdeck-01 Acuoso exterior trafico.", category: "Pinturas", subcategory: "Transparentes", image: "/assets/product-images/ica/topdeck.jpg" },',
    '  { id: "ica-icadeck-05", slug: "ica-icadeck-05", name: "ICA ICADECK-05", brand: "ICA", model: "ICADECK-05", description: "Acuoso monocapa exterior ICA ICADECK-05. Para madera en exterior.", shortDescription: "Icadeck-05 Acuoso exterior.", category: "Pinturas", subcategory: "Transparentes", image: "/assets/product-images/ica/icadeck.jpg" },',
]

with open(FILEPATH, "r", encoding="utf-8") as f:
    content = f.read()

marker = "ica-tinta-venguete-infpu-n42755"
idx = content.find(marker)
end = content.find("\n", idx)
insert = end + 1

new = "\n" + "\n".join(products) + "\n"
content = content[:insert] + new + content[insert:]

with open(FILEPATH, "w", encoding="utf-8") as f:
    f.write(content)

print("Added 3 ICA deck products")
