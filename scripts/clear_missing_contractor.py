import re

f = r'C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts'
with open(f, 'r', encoding='utf-8') as fh:
    content = fh.read()

models_to_clear = ['K03606', 'K02408', '81131', '80105', '81815', '81412', '85801', '84211']

count = 0
for model in models_to_clear:
    old = f'image: "/assets/product-images/cmt-contractor/{model}.jpg"'
    new = f'image: ""'
    if old in content:
        content = content.replace(old, new, 1)
        count += 1
        print(f'Cleared: {model}')

with open(f, 'w', encoding='utf-8') as fh:
    fh.write(content)

print(f'Total cleared: {count}')
