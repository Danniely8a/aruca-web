import re

filepath = r'C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(
    r'(id: "ipl-[^"]+".*?image: ")[^"]+(")',
    r'\1/assets/product-images/ipl/TUBO DE ASPIRACION.png\2',
    content, flags=re.DOTALL
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated IPL images')
