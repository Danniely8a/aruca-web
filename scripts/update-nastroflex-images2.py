import re

filepath = r'C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

lines = content.split('\n')
current_id = None
updated = 0

for i, line in enumerate(lines):
    stripped = line.strip()
    
    # Track current product id
    id_match = re.match(r'id:\s*"(nastroflex[^"]*|nf-[^"]*)"', stripped)
    if id_match:
        current_id = id_match.group(1)
        continue
    
    # Update image line for Nastroflex products still using brand image
    if current_id and 'image: "/assets/brands/nastroflex.jpg"' in stripped:
        # Determine image based on id pattern
        if '4a-' in current_id or 'esponja-4a' in current_id:
            image = '/assets/product-images/nastroflex/LIJA AMARILLA.png'
        elif 'agua' in current_id:
            image = '/assets/product-images/nastroflex/LIJA DE AGUA PLIEGO.png'
        elif 'seco-esponja' in current_id:
            image = '/assets/product-images/nastroflex/LIJA DE PLIEGO AL SECO.png'
        elif 'seco' in current_id or 'pliego' in current_id:
            image = '/assets/product-images/nastroflex/LIJA DE PLIEGO AL SECO.png'
        elif 'tela' in current_id and 'metro' in current_id:
            image = '/assets/product-images/nastroflex/LIJA MARRON FLEXIBLE.png'
        elif 'bnda' in current_id or 'banda-' in current_id:
            image = '/assets/product-images/nastroflex/BANDAS DE LIJA MARRON.png'
        elif 'velcro' in current_id:
            image = '/assets/product-images/nastroflex/LIJA DE PAPEL SOBRE VELCRO.png'
        elif 'rollo' in current_id or 'britex' in current_id:
            image = '/assets/product-images/nastroflex/ROLLO BRITEX.png'
        else:
            image = '/assets/product-images/nastroflex/LIJA AMARILLA.png'
        
        lines[i] = line.replace('/assets/brands/nastroflex.jpg', image)
        updated += 1
        current_id = None

with open(filepath, 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))

print(f'Updated {updated} product images')
