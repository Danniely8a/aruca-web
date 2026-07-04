import re

filepath = r'C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

matches = re.findall(r'brand: "REXON".*?category: "([^"]+)"', content, re.DOTALL)
cats = set(matches)
print('REXON categories:', cats)
print('Total REXON products:', len(matches))

# Check if Correas is in productCategories
cat_match = re.search(r'export const productCategories = \[(.*?)\]', content, re.DOTALL)
if cat_match:
    cats_text = cat_match.group(1)
    if 'Correas' in cats_text:
        print('Correas IS in productCategories')
    else:
        print('Correas NOT in productCategories')
    print('Categories:', cats_text.strip()[:500])
