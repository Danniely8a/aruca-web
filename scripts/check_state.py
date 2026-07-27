import re
from collections import Counter

path = 'src/lib/data/products.ts'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

products = []
idx = 0
while True:
    m = re.search(r'\{', content[idx:])
    if not m:
        break
    s = idx + m.start()
    depth = 0
    for i in range(s, len(content)):
        if content[i] == '{':
            depth += 1
        elif content[i] == '}':
            depth -= 1
            if depth == 0:
                block = content[s:i+1]
                id_m = re.search(r"id:\s*['\"](.+?)['\"]", block)
                if id_m:
                    products.append({'id': id_m.group(1), 'text': block})
                idx = i + 1
                break
    else:
        break

ids = [p['id'] for p in products]
counts = Counter(ids)
dupes = {k: v for k, v in counts.items() if v > 1}
print(f'Total: {len(products)}')
print(f'Unique: {len(set(ids))}')
print(f'Dupes: {dupes}')

con = [p['id'] for p in products if 'cmt-con-disco-madera' in p['id']]
dak = [p['id'] for p in products if 'dakin-ct' in p['id']]
print(f'CMT Contractor IDs: {con}')
print(f'Dakin CT IDs: {dak}')
