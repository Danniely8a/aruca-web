filepath = r'C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix all REXON belt descriptions: replace " with pulgadas marker
content = content.replace(' medida 15"', ' medida 15 pulgadas')
content = content.replace(' medida 16"', ' medida 16 pulgadas')
content = content.replace(' medida 17"', ' medida 17 pulgadas')
content = content.replace(' medida 18"', ' medida 18 pulgadas')
content = content.replace(' medida 19"', ' medida 19 pulgadas')
content = content.replace(' medida 20"', ' medida 20 pulgadas')

# More efficient: replace all REXON patterns at once
import re

# Fix description lines with " in REXON products
content = re.sub(r'(Correa de transmisión Tipo [A-Z0-9]+ medida \d+)" para', r'\1 pulgadas para', content)
# Fix shortDescription lines
content = re.sub(r'(Correa Tipo [A-Z0-9]+ \d+)"\.', r'\1 pulgadas.', content)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print('Fixed all quotes in REXON descriptions')
