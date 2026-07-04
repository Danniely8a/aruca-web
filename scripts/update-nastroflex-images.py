import re

filepath = r'C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Map product id patterns to image files
image_map = {
    # Lija amarilla 4" (not esponja)
    'nf-lija-amarilla-4': '/assets/product-images/nastroflex/LIJA AMARILLA.png',
    # Lija amarilla esponja 4" - use LIJA AMARILLA.png
    'nf-lija-amarilla-esponja-4': '/assets/product-images/nastroflex/LIJA AMARILLA.png',
    # Lija agua pliego negro
    'nf-lija-agua-230': '/assets/product-images/nastroflex/LIJA DE AGUA PLIEGO.png',
    # Lija pliego seco (not esponja)
    'nf-lija-seco-230': '/assets/product-images/nastroflex/LIJA DE PLIEGO AL SECO.png',
    # Lija seco esponja
    'nf-lija-seco-esponja-230': '/assets/product-images/nastroflex/LIJA DE PLIEGO AL SECO.png',
    # Lija tela marron por metro
    'nf-tela-metro': '/assets/product-images/nastroflex/LIJA MARRON FLEXIBLE.png',
    # Bandas de lija marron tela (3x18, 3x21, 4x24)
    'nf-banda-': '/assets/product-images/nastroflex/BANDAS DE LIJA MARRON.png',
    # Lija papel velcro
    'nf-velcro-125': '/assets/product-images/nastroflex/LIJA DE PAPEL SOBRE VELCRO.png',
    # Fibrodiscos
    'nf-fibrodisco': '/assets/product-images/nastroflex/FIBRODISCOS.png',
    # Discos flap
    'nf-disco-flap': '/assets/product-images/nastroflex/DISCOS FLAP.png',
    # Esponja abrasiva
    'nf-esponja': '/assets/product-images/nastroflex/ESPONJA ABRASIVA.png',
    # Grarto por metro
    'nf-grarto': '/assets/product-images/nastroflex/GRAFITO.png',
    # Banda 115x10
    'nf-banda-115x10': '/assets/product-images/nastroflex/BANDAS DE LIJA MARRON.png',
}

lines = content.split('\n')
in_product = False
current_id = None

for i, line in enumerate(lines):
    stripped = line.strip()
    
    # Track current product id
    id_match = re.match(r'id:\s*"(nf-[^"]+)"', stripped)
    if id_match:
        current_id = id_match.group(1)
    
    # Update image line for Nastroflex products
    if current_id and current_id.startswith('nf-') and 'image:' in stripped:
        for pattern, image_path in image_map.items():
            if current_id.startswith(pattern):
                lines[i] = re.sub(r'image:\s*"[^"]*"', f'image: "{image_path}"', line)
                break
        current_id = None

with open(filepath, 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))

print("Updated all Nastroflex product images")
