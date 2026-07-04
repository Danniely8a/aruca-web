import re

filepath = r'C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add bisagra recta product after bisagra curva
recta_product = """  {
    id: "bx-bis-recta",
    slug: "bisagra-cazoleta-35mm-recta",
    name: "Bisagra Cazoleta 35mm Recta",
    brand: "BlueXpress",
    model: "BC-35-REC",
    description: "Bisagra de cazoleta 35mm recta para muebles.",
    shortDescription: "Bisagra cazoleta 35mm recta.",
    category: "Accesorios",
    image: "/assets/product-images/bluexpress/BISAGRA RECTA.png",
  },"""

# Insert after bisagra curva
content = content.replace(
    '    id: "bx-bis-curvas",',
    '    id: "bx-bis-curvas",'
)

# Find the closing of curvas product and insert recta after it
curvas_end = content.find('id: "bx-bis-curvas"')
if curvas_end != -1:
    # Find the closing }, of this product block
    block_end = content.find('},', curvas_end)
    if block_end != -1:
        block_end += 2
        content = content[:block_end] + '\n' + recta_product + content[block_end:]
        print("Added bisagra recta product")

# 2. Update all images
# Drywall screws -> TORNILLOS DRYWALL.png
content = re.sub(
    r'(id: "bx-dw[678]-[^"]+".*?image: ")[^"]+(")',
    r'\1/assets/product-images/bluexpress/TORNILLOS DRYWALL.png\2',
    content, flags=re.DOTALL
)

# Bisagra curva
content = content.replace(
    'id: "bx-bis-curvas",',
    'id: "bx-bis-curvas",'
)
content = re.sub(
    r'(id: "bx-bis-curvas".*?image: ")[^"]+(")',
    r'\1/assets/product-images/bluexpress/BISAGRA CURVA.jpg\2',
    content, flags=re.DOTALL
)

# Bisagra semicurva
content = re.sub(
    r'(id: "bx-bis-semicurvas".*?image: ")[^"]+(")',
    r'\1/assets/product-images/bluexpress/BISAGRA SEMICURVA.jpg\2',
    content, flags=re.DOTALL
)

# Bisagra recta (just added)
content = re.sub(
    r'(id: "bx-bis-recta".*?image: ")[^"]+(")',
    r'\1/assets/product-images/bluexpress/BISAGRA RECTA.png\2',
    content, flags=re.DOTALL
)

# Brazo hidráulico
content = re.sub(
    r'(id: "bx-bh-8kg".*?image: ")[^"]+(")',
    r'\1/assets/product-images/bluexpress/BRAZO HIDRAULICO.jpg\2',
    content, flags=re.DOTALL
)

# Correderas - keep logo for now (no image in folder)
# They already have bluexpress_x2.0.jpeg

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated all BlueXpress images")
