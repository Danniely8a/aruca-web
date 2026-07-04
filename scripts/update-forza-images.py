filepath = r'C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

replacements = [
    ('forza-7k-cunete', '/assets/product-images/forza/FORZA 7K CUÑETE.png'),
    ('forza-7k-galon', '/assets/product-images/forza/FORZA 7K GALON.png'),
    ('forza-7k-galon-5l', '/assets/product-images/forza/FORZA 7K GALON 5 LITROS.png'),
    ('forza-7k-cuarto', '/assets/product-images/forza/FORZA 7K CUARTO.png'),
    ('forza-9k-cunete', '/assets/product-images/forza/FORZA 9K CUÑETE.png'),
    ('forza-9k-galon', '/assets/product-images/forza/FORZA 9K GALON.png'),
    ('forza-9k-cuarto', '/assets/product-images/forza/FORZA 9K CUARTO.png'),
]

for slug, new_img in replacements:
    marker = f'id: "{slug}",'
    idx = content.find(marker)
    if idx == -1:
        print(f'Not found: {slug}')
        continue
    img_start = content.find('image:', idx)
    if img_start == -1:
        print(f'No image for {slug}')
        continue
    img_end = content.find('\n', img_start)
    old_line = content[img_start:img_end].strip()
    content = content[:img_start] + f'    image: "{new_img}",' + content[img_end:]
    print(f'Updated {slug}')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print('Done!')
