FILEPATH = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts"

with open(FILEPATH, 'r', encoding='utf-8') as f:
    content = f.read()

# Find fresa block
fresa_start = content.find('{ id: "cmt-con-fresa-1-8-81103"')
fresa_start = content.rfind('\n', 0, fresa_start) + 1

subcats_pos = content.find('\nexport const productSubcategories')
fresa_end = subcats_pos

fresa_block = content[fresa_start:fresa_end]

# For each fresa line, we need to properly escape all " inside string values
# Strategy: parse each line's key-value pairs and escape internal quotes
import re

fixed_lines = []
for line in fresa_block.split('\n'):
    stripped = line.strip()
    if not stripped or not stripped.startswith('{ id: "cmt-con-fresa'):
        fixed_lines.append(line)
        continue
    
    # Fix: in the name field value, the " after measurements is already escaped
    # But in description and shortDescription, " after measurements like 1/8", 5/16", 2", 1/4" need escaping
    # Pattern: inside string values, N/N" followed by non-quote char -> escape the "
    
    # More robust: extract each field and fix
    # name: "..." -> escape " inside
    # description: "..." -> escape " inside
    # shortDescription: "..." -> escape " inside
    
    # Fix all " inside string values that follow a fraction/digit pattern
    # Strategy: for each " that's between field delimiters, escape it if it follows a digit/slash
    
    # Simple approach: fix the known patterns in description
    # Diametro N/N" -> Diametro N/N\"
    # L.corte N/N" -> L.corte N/N\"
    # L.mecha N" -> L.mecha N\"
    # Eje N/N" -> Eje N\"
    # Codigo N" -> wait, this is the last " before the closing "
    
    # Actually, the problem is that the Python script that generated these used unescaped "
    # inside the description string values. We need to escape ALL " that appear inside
    # string values (between the opening and closing " of each field).
    
    # The most reliable way: parse the line character by character
    # But that's complex. Instead, let's use a targeted regex approach.
    
    # For description field: find description: "..." and escape internal "
    # The description value ends with .", or .", at the end
    
    # For each field, find its value and escape internal quotes
    for field in ['name', 'description', 'shortDescription']:
        # Find the field value
        pattern = f'{field}: "'
        idx = line.find(pattern)
        if idx == -1:
            continue
        val_start = idx + len(pattern)
        
        # Find the end of the value - look for ", followed by next field or }
        # The value ends with " followed by , or }
        val_end = val_start
        while val_end < len(line):
            if line[val_end] == '"':
                # Check if this is the closing quote
                # It's closing if followed by , or } or space+next_field
                after = line[val_end+1:val_end+5].strip()
                if after.startswith(',') or after.startswith('}') or after == '':
                    break
                # It's an internal quote - skip it
                val_end += 1
            else:
                val_end += 1
        
        if val_end < len(line) and line[val_end] == '"':
            # Found the actual closing quote
            internal_val = line[val_start:val_end]
            # Escape any remaining unescaped " in the internal value
            # But there shouldn't be any since we stopped at the first unescaped "
            # Actually, the issue is the val_end detection might be wrong
            
            pass
    
    # Simpler approach: just replace known broken patterns
    # In description: patterns like /8". L, /16". L, /2". L, /4". Codigo, etc.
    fixed_line = line
    
    # For description and shortDescription fields, escape " that appear after measurements
    # before a period or space
    # Match: digit/fraction + " + letter (internal quote) 
    fixed_line = re.sub(r'(\d)"([.\s])', r'\1\\"\2', fixed_line)
    # Match: digit/digit + " + letter (internal quote after fraction)
    fixed_line = re.sub(r'(/\d+)"([.\s])', r'\1\\"\2', fixed_line)
    
    fixed_lines.append(fixed_line)

new_content = content[:fresa_start] + '\n'.join(fixed_lines) + content[fresa_end:]

with open(FILEPATH, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Fixed description quotes in fresas")
