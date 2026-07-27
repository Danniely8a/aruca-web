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
                    products.append({'id': id_m.group(1), 'text': block})
                idx = i + 1
                break
    else:
        break

# The 9 renamed duplicates
renamed = [
    'cmt-con-disco-madera-6-1-2-z36-2',
    'cmt-con-disco-madera-7-1-4-z24-2',
    'cmt-con-disco-madera-7-1-4-z40-2',
    'cmt-con-disco-madera-8-1-4-z24-2',
    'cmt-con-disco-madera-8-1-4-z40-2',
    'dakin-ct-1-4-z4-2',
    'dakin-ct-1-2-z6-2',
    'dakin-ct-1-2-z10-2',
    'dakin-ct-1-2-z14-2',
]

for p in products:
    if p['id'] in renamed:
        print(f"FOUND: {p['id']}")
