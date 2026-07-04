import re

FILEPATH = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts"

with open(FILEPATH, "r", encoding="utf-8") as f:
    content = f.read()

# For all ea- products, prepend /assets/product-images/ to image values
# Match: id: "ea-..." ... image: "filename.jpg"
# Replace image: "filename.jpg" with image: "/assets/product-images/filename.jpg"
# but ONLY for ea- products that have a non-empty image

lines = content.split("\n")
fixed = 0
for i, line in enumerate(lines):
    if 'id: "ea-' not in line:
        continue
    # Match image: "something.jpg" but NOT image: ""
    m = re.search(r'image: "([^"]+\.jpg)"', line)
    if m:
        img = m.group(1)
        if not img.startswith('/assets/'):
            lines[i] = line.replace(f'image: "{img}"', f'image: "/assets/product-images/{img}"')
            fixed += 1

with open(FILEPATH, "w", encoding="utf-8") as f:
    f.write("\n".join(lines))

print(f"Fixed {fixed} image paths")
