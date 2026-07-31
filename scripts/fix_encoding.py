import re

with open(r'src\lib\data\products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

replacements = {
    '\u00c3\u00a1': 'á',
    '\u00c3\u00a9': 'é',
    '\u00c3\u00b3': 'ó',
    '\u00c3\u00b1': 'ñ',
    '\u00c3\u00ba': 'ú',
    '\u00c3\u00ad': 'í',
    '\u00c2\u00b0': '°',
    '\u00c3\u00bc': 'ü',
}

count = 0
for wrong, correct in replacements.items():
    c = content.count(wrong)
    if c > 0:
        content = content.replace(wrong, correct)
        count += c

with open(r'src\lib\data\products.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print(f'Fixed {count} corrupted characters')
