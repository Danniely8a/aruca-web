import re

filepath = r'C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r'(id: "rexon-[^"]+".*?category: ")Correas de Transmisión(")', r'\1Correas\2', content, flags=re.DOTALL)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print('Changed REXON category to Correas')
