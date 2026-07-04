import re

filepath = r'C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

pattern = r'id: "ms-(\d+)".*?image: "([^"]+)"'
matches = re.findall(pattern, content, re.DOTALL)

logo_products = []
for code, img in matches:
    if 'milescraft.jpg' in img:
        logo_products.append(code)
        print(f'  ms-{code} uses logo placeholder')

print(f'\nTotal using logo: {len(logo_products)}')
print(f'Codes: {logo_products}')
