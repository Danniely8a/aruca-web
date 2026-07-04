import re

filepath = r'C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix: replace smart/straight quotes in names within string literals
# Pattern: name: "Banda de Lija Marron de Tela 3" x 18" - Grano 40"
# Should be: name: "Banda de Lija Marron de Tela 3\" x 18\" - Grano 40"

# Fix all the banda names with inches
fixes = {
    'name: "Banda de Lija Marron de Tela 3" x 18" - Grano 40"': 'name: "Banda de Lija Marron de Tela 3\\" x 18\\" - Grano 40"',
    'name: "Banda de Lija Marron de Tela 3" x 18" - Grano 60"': 'name: "Banda de Lija Marron de Tela 3\\" x 18\\" - Grano 60"',
    'name: "Banda de Lija Marron de Tela 3" x 18" - Grano 80"': 'name: "Banda de Lija Marron de Tela 3\\" x 18\\" - Grano 80"',
    'name: "Banda de Lija Marron de Tela 3" x 21" - Grano 40"': 'name: "Banda de Lija Marron de Tela 3\\" x 21\\" - Grano 40"',
    'name: "Banda de Lija Marron de Tela 3" x 21" - Grano 60"': 'name: "Banda de Lija Marron de Tela 3\\" x 21\\" - Grano 60"',
    'name: "Banda de Lija Marron de Tela 3" x 21" - Grano 80"': 'name: "Banda de Lija Marron de Tela 3\\" x 21\\" - Grano 80"',
    'name: "Banda de Lija Marron de Tela 4" x 24" - Grano 40"': 'name: "Banda de Lija Marron de Tela 4\\" x 24\\" - Grano 40"',
    'name: "Banda de Lija Marron de Tela 4" x 24" - Grano 60"': 'name: "Banda de Lija Marron de Tela 4\\" x 24\\" - Grano 60"',
    'name: "Banda de Lija Marron de Tela 4" x 24" - Grano 80"': 'name: "Banda de Lija Marron de Tela 4\\" x 24\\" - Grano 80"',
    # Also fix descriptions if they exist
    'description: "Banda de lija marron de tela 3 x 18 pulgadas. Grano 40."': 'description: "Banda de lija marron de tela 3\\" x 18\\" pulgadas. Grano 40."',
    'description: "Banda de lija marron de tela 3 x 18 pulgadas. Grano 60."': 'description: "Banda de lija marron de tela 3\\" x 18\\" pulgadas. Grano 60."',
    'description: "Banda de lija marron de tela 3 x 18 pulgadas. Grano 80."': 'description: "Banda de lija marron de tela 3\\" x 18\\" pulgadas. Grano 80."',
    'description: "Banda de lija marron de tela 3 x 21 pulgadas. Grano 40."': 'description: "Banda de lija marron de tela 3\\" x 21\\" pulgadas. Grano 40."',
    'description: "Banda de lija marron de tela 3 x 21 pulgadas. Grano 60."': 'description: "Banda de lija marron de tela 3\\" x 21\\" pulgadas. Grano 60."',
    'description: "Banda de lija marron de tela 3 x 21 pulgadas. Grano 80."': 'description: "Banda de lija marron de tela 3\\" x 21\\" pulgadas. Grano 80."',
    'description: "Banda de lija marron de tela 4 x 24 pulgadas. Grano 40."': 'description: "Banda de lija marron de tela 4\\" x 24\\" pulgadas. Grano 40."',
    'description: "Banda de lija marron de tela 4 x 24 pulgadas. Grano 60."': 'description: "Banda de lija marron de tela 4\\" x 24\\" pulgadas. Grano 60."',
    'description: "Banda de lija marron de tela 4 x 24 pulgadas. Grano 80."': 'description: "Banda de lija marron de tela 4\\" x 24\\" pulgadas. Grano 80."',
}

for old, new in fixes.items():
    content = content.replace(old, new)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed unescaped quotes")
