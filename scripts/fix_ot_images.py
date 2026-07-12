FILEPATH = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts"

with open(FILEPATH, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix case mismatches: products reference uppercase M but files are lowercase m
# These are the exact mappings
case_fixes = [
    ('285.036.12M.jpg', '285.036.12m.jpg'),
    ('285.048.12M.jpg', '285.048.12m.jpg'),
    ('285.060.12M.jpg', '285.060.12m.jpg'),
    ('285.072.12M.jpg', '285.072.12m.jpg'),
    ('285.054.14M.jpg', '285.054.14m.jpg'),
    ('285.072.14M.jpg', '285.072.14m.jpg'),
    ('285.084.14M.jpg', '285.084.14m.jpg'),
    ('285.036.16M.jpg', '285.036.16m.jpg'),
    ('285.048.16M.jpg', '285.048.16m.jpg'),
    ('285.060.16M.jpg', '285.060.16m.jpg'),
    ('285.036.18M.jpg', '285.036.18m.jpg'),
    ('285.054.18M.jpg', '285.054.18m.jpg'),
    ('285.066.18M.jpg', '285.066.18m.jpg'),
    ('285.044.20M.jpg', '285.044.20m.jpg'),
    ('285.060.20M.jpg', '285.060.20m.jpg'),
    ('285.066.24M.jpg', '285.066.24m.jpg'),
]

for old, new in case_fixes:
    content = content.replace(old, new)

# Fix missing images: set to empty
content = content.replace(
    'image: "/assets/product-images/cmt-orange-tools/278.036.14M.jpg"',
    'image: ""'
)
content = content.replace(
    'image: "/assets/product-images/cmt-orange-tools/286.040.22M.jpg"',
    'image: ""'
)

with open(FILEPATH, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed 16 case mismatches + 2 missing images")
