import re

filepath = r'C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Change ISB category to Rolineras
content = re.sub(
    r'(id: "isb-[^"]+".*?category: ")Accesorios(")',
    r'\1Rolineras\2',
    content, flags=re.DOTALL
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print('Changed ISB category to Rolineras')
