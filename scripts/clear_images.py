import re

with open('src/lib/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

ids_to_clear = [
    'et-disco-alu-12x96',
    'et-6509',
    'et-6251', 'et-6250', 'et-6254', 'et-6256',
    'et-6320',
    'et-6152', 'et-6153', 'et-6154',
    'et-6920', 'et-6921',
    'et-440z', 'et-418z', 'et-43pz',
    'et-4ms',
]

count = 0
for pid in ids_to_clear:
    old = f'id: "{pid}"'
    idx = content.find(old)
    if idx == -1:
        print(f'WARNING: {pid} not found')
        continue
    line_start = content.rfind('\n', 0, idx) + 1
    line_end = content.find('\n', idx)
    line = content[line_start:line_end]
    new_line = re.sub(r'image: "/assets/product-images/eurotools/[^"]+"', 'image: ""', line)
    if new_line != line:
        content = content[:line_start] + new_line + content[line_end:]
        count += 1
        print(f'Cleared: {pid}')

with open('src/lib/data/products.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print(f'Done: {count} products cleared')
