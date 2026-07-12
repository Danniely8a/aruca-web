FILEPATH = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts"

with open(FILEPATH, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the broken ]; line (just "]" without ";")
# Find all ]; patterns
import re

# Find the position where ]; should be (before fresas)
fresa_first = content.find('{ id: "cmt-con-fresa-1-8-81103"')
# Look backwards from fresa_first for the bracket
bracket_search = content[:fresa_first]
# Find the last ] before fresa
last_bracket_pos = bracket_search.rfind(']')
print(f"Last ] before fresas at pos {last_bracket_pos}: '{content[last_bracket_pos:last_bracket_pos+5]}'")

# Check if it has ;
if content[last_bracket_pos + 1] != ';':
    # Insert the missing ;
    content = content[:last_bracket_pos + 1] + ';' + content[last_bracket_pos + 1:]
    print("Inserted missing ;")

# Now the file has ]; on that line
# Find fresas block end
subcats_pos = content.find('\nexport const productSubcategories')
fresa_start = content.find('{ id: "cmt-con-fresa-1-8-81103"')
# Go to start of line
fresa_start = content.rfind('\n', 0, fresa_start) + 1

# Find end of fresas - last fresa line
fresa_end_search = content.find('\nexport const productSubcategories')
# Work backwards to find last non-empty line
fresa_end = fresa_end_search
while fresa_end > fresa_start and content[fresa_end - 1] in '\n\r':
    fresa_end -= 1

fresa_block = content[fresa_start:fresa_end].rstrip()

# Now find ]; before fresas
bracket_before = content.rfind('\n];', 0, fresa_start)
if bracket_before == -1:
    bracket_before = content.rfind('];', 0, fresa_start)
    
bracket_end = bracket_before + len('];')

# Structure: before_bracket ]; fresas subcategories
# Want: before_bracket fresas ]; subcategories

before = content[:bracket_before + 2]  # up to and including ];
after = content[subcats_pos:]  # from subcategories onward

# Remove the ]; from before (we'll add it back after fresas)
before_products = before[:-2]  # remove ];

new_content = before_products + '\n' + fresa_block + '\n];\n' + after

with open(FILEPATH, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Fixed!")
