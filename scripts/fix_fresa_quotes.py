FILEPATH = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts"

with open(FILEPATH, 'r', encoding='utf-8') as f:
    content = f.read()

# Find all fresa lines and fix unescaped quotes in name/description/shortDescription
import re

# Fix pattern: within fresa product lines, escape " that appear inside string values
# The fresa lines have names like: "CMT FRESA DE CORTE PARA TROMPO 1/8" 81103"
# The " after 1/8 needs to be \"

# Strategy: find fresa lines and replace unescaped " in measurements
# Pattern: look for 1/8", 3/16", etc inside fresa lines that aren't escaped

lines = content.split('\n')
fresa_start = None
fresa_end = None

for i, line in enumerate(lines):
    if 'cmt-con-fresa-1-8-81103' in line:
        fresa_start = i
    if fresa_start and 'cmt-con-fresa-1-4-84211' in line:
        fresa_end = i
        break

if fresa_start is None:
    print("No fresa lines found")
    exit()

fixed_count = 0
for i in range(fresa_start, fresa_end + 1):
    line = lines[i]
    # Fix: within name: "CMT FRESA DE CORTE PARA TROMPO 1/8" 81103" 
    # The " after measurements like 1/8, 3/16, etc. needs escaping
    # But only the " that are inside the name string value
    
    # Find all string values and escape internal quotes
    # Simple approach: for fresa lines, replace pattern )", ( measurement + " ) with escaped version
    # Actually, replace all " that appear after a fraction like N/M inside name/desc strings
    
    # More precise: replace " that follows a digit or fraction character and is followed by space+digit
    # Pattern: (\d)/(\d+)"(\s+\d) -> \1/\2\"\3
    new_line = re.sub(r'(\d/\d+)"(\s+\d)', r'\1\\"\2', line)
    
    # Also fix descriptions where similar patterns occur
    # e.g., Diametro 1/8". L.corte -> Diametro 1/8\". L.corte
    # But we need to be careful not to break the outer string delimiters
    
    if new_line != line:
        fixed_count += 1
        lines[i] = new_line

content = '\n'.join(lines)

with open(FILEPATH, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Fixed {fixed_count} fresa lines")
