import re

filepath = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts"

with open(filepath, 'rb') as f:
    content = f.read()

# Latin-1 encoded text that was decoded as UTF-8
# Ã" (C3 93") = Ó (Latin-1 double encode of UTF-8 "Ó")
# We read it as bytes and need to fix it

text = content.decode('utf-8', errors='replace')

# Fix: Ã"rbitas → Órbitas
# The issue is that the special characters appear as Ã" (A-tilde + double quote)  
count1 = text.count('\u00c3"rbitas')
print(f"Found {count1} occurrences of 'Ã\"rbitas'")

text = text.replace('\u00c3"rbitas', '\u00d3rbitas')

# Fix: PEQUEÃ'AS → PEQUEÑAS
# Ã' (C3 91) = Ñ  
count2 = text.count('PEQUE\u00c3\u2018AS')
print(f"Found {count2} occurrences of 'PEQUEÃ\\'AS'")
text = text.replace('PEQUE\u00c3\u2018AS', 'PEQUE\u00d1AS')

# Also check for any other common corruption patterns
for pattern, replacement in [
    ('\u00c3\u00a1', '\u00e1'),  # Ã¡ → á
    ('\u00c3\u00a9', '\u00e9'),  # Ã© → é
    ('\u00c3\u00ad', '\u00ed'),  # Ã­ → í
    ('\u00c3\u00b3', '\u00f3'),  # Ã³ → ó
    ('\u00c3\u00ba', '\u00fa'),  # Ãº → ú
    ('\u00c3\u00b1', '\u00f1'),  # Ã± → ñ
    ('\u00c3\u2018', '\u00d1'),  # Ã' → Ñ
    ('\u00c3\u201c', '\u00d3'),  # Ã" → Ó
    ('\u00c3\u00b0', '\u00c2'),  # Ã° → Â (degree symbol fix)
]:
    count = text.count(pattern)
    if count > 0:
        print(f"Found {count} occurrences of hex {pattern.encode('utf-8').hex()}")
        text = text.replace(pattern, replacement)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(text)

print("File fixed successfully!")

# Verify
with open(filepath, 'r', encoding='utf-8') as f:
    content2 = f.read()

for pattern in ['Ã"rbitas', 'PEQUEÃ\u2018AS', 'Ã¡', 'Ã©', 'Ã­', 'Ã³', 'Ãº', 'Ã±', 'Ã\u2018', 'Ã\u201c']:
    if pattern in content2:
        print(f"WARNING: Pattern {repr(pattern)} still exists!")
    else:
        print(f"CLEAN: Pattern {repr(pattern)} removed")
