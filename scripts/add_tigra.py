FILEPATH = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts"

products = []

# 1/2" CAÑA
sizes_12 = ["R5", "R7.5", "R10", "R12.5", "R15", "R17.5", "R20", "R22.5", "R25", "R30"]
for s in sizes_12:
    slug_s = s.replace(".", "-").lower()
    products.append({
        "id": f"tig-df-12-{slug_s}",
        "slug": f"tigra-dientes-fresa-1-2-cana-{slug_s}",
        "name": f"Tigra Dientes para Fresa 1/2 Caña {s}",
        "model": f"1/2 x {s}",
        "desc": f"Dientes para fresa Tigra 1/2 caña, tamanho {s}. Espesor 5mm.",
        "short": f"Dientes fresa 1/2 {s}.",
        "img": "/assets/product-images/tigra/dientes-fresa-1-2-cana.jpg",
    })

# 1/4" CAÑA
sizes_14 = ["R5", "R7.5", "R10", "R12.5", "R15", "R17.5", "R20", "R22.5", "R25", "R30"]
for s in sizes_14:
    slug_s = s.replace(".", "-").lower()
    products.append({
        "id": f"tig-df-14-{slug_s}",
        "slug": f"tigra-dientes-fresa-1-4-cana-{slug_s}",
        "name": f"Tigra Dientes para Fresa 1/4 Caña {s}",
        "model": f"1/4 x {s}",
        "desc": f"Dientes para fresa Tigra 1/4 caña, tamanho {s}. Espesor 5mm.",
        "short": f"Dientes fresa 1/4 {s}.",
        "img": "/assets/product-images/tigra/dientes-fresa-1-4-cana.jpg",
    })

with open(FILEPATH, "r", encoding="utf-8") as f:
    content = f.read()

marker = "id: \"tig-"
idx = content.find(marker)
if idx == -1:
    # Find end of products array
    marker2 = "export const productCategories"
    cat_idx = content.find(marker2)
    insert = content.rfind("\n];", 0, cat_idx) + 1
else:
    # Find end of last Tigra product
    last_id = products[-1]["id"]
    last_idx = content.find(f'id: "{last_id}"')
    if last_idx == -1:
        marker2 = "export const productCategories"
        cat_idx = content.find(marker2)
        insert = content.rfind("\n];", 0, cat_idx) + 1
    else:
        end = content.find("\n", last_idx)
        insert = end + 1

lines = []
for p in products:
    lines.append(f'  {{ id: "{p["id"]}", slug: "{p["slug"]}", name: "{p["name"]}", brand: "Tigra", model: "{p["model"]}", description: "{p["desc"]}", shortDescription: "{p["short"]}", category: "Dientes para Fresa", subcategory: "Dientes para Fresa", image: "{p["img"]}" }},')

new = "\n  // --- TIGRA DIENTES PARA FRESA ---\n" + "\n".join(lines) + "\n"
content = content[:insert] + new + content[insert:]

# Add subcategory
if '"Dientes para Fresa"' not in content:
    content = content.replace('  "Pistolas",\n', '  "Pistolas",\n  "Dientes para Fresa",\n')

# Add category
if '"Dientes para Fresa"' not in content.split("export const productCategories")[1] if "export const productCategories" in content else True:
    pass  # subcategory already handled

with open(FILEPATH, "w", encoding="utf-8") as f:
    f.write(content)

print(f"Added {len(products)} Tigra products")
