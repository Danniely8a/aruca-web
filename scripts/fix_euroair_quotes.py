FILEPATH = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts"

with open(FILEPATH, "r", encoding="utf-8") as f:
    lines = f.readlines()

# Find Euroair bounds
start = None
end = None
for i, line in enumerate(lines):
    if 'id: "ea-' in line and start is None:
        start = i
    if start is not None and i > start and 'id: ' in line and '"ea-' not in line:
        end = i
        break
if end is None:
    end = len(lines)

print(f"Euroair: lines {start+1} to {end}")

# For each Euroair line, replace all " that are between text characters
# (i.e. not the structural delimiters) with \"
# Simple heuristic: inside a TS string, " that is preceded by a letter/digit and followed by a letter/digit/punctuation
# should be escaped

import re

fixed = 0
for i in range(start, end):
    line = lines[i]
    if 'id: "ea-' not in line:
        continue
    
    # Replace " that appears inside string values
    # Pattern: inside quotes, " that is not at a string boundary
    # We'll use a state machine approach
    
    new_chars = []
    in_str = False
    j = 0
    while j < len(line):
        c = line[j]
        
        if c == '\\' and in_str and j + 1 < len(line):
            new_chars.append(c)
            new_chars.append(line[j+1])
            j += 2
            continue
        
        if c == '"':
            if not in_str:
                in_str = True
                new_chars.append(c)
            else:
                # Is this the end of the string?
                # Look at what follows
                after = line[j+1:j+2] if j + 1 < len(line) else ''
                two_after = line[j+1:j+3] if j + 2 < len(line) else ''
                
                if after in ',}]:)' or after == '' or two_after.startswith('",') or two_after.startswith('"}'):
                    in_str = False
                    new_chars.append(c)
                else:
                    # Internal quote - escape it
                    new_chars.append('\\')
                    new_chars.append(c)
                    fixed += 1
        else:
            new_chars.append(c)
        j += 1
    
    lines[i] = ''.join(new_chars)

with open(FILEPATH, "w", encoding="utf-8") as f:
    f.writelines(lines)

print(f"Fixed {fixed} internal quotes")
