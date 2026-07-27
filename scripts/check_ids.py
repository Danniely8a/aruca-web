import re

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
                    products.append({'id': id_m.group(1)})
                idx = i + 1
                break
    else:
        break

ids = [p['id'] for p in products]
dupes = [x for x in ids if ids.count(x) > 1]
print(f'Total: {len(products)}')
print(f'Unique IDs: {len(set(ids))}')
print(f'Duplicates: {set(dupes) if dupes else "None"}')

cmt_ids = ['disco-madera-6-1-2-z36', 'disco-madera-7-1-4-z24', 'disco-madera-7-1-4-z40', 'disco-madera-8-1-4-z24', 'disco-madera-8-1-4-z40']
dakin_ids = ['cinta-ct-1-4-z4', 'cinta-ct-1-2-z6', 'cinta-ct-1-2-z10', 'cinta-ct-1-2-z14']
print(f'CMT Contractor IDs present: {[i for i in cmt_ids if i in ids]}')
print(f'Dakin IDs present: {[i for i in dakin_ids if i in ids]}')
