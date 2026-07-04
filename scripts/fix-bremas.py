import re

filepath = r'C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

bremas_products = [
    ("brm-012-0-1", "Bremas Switch 0-1 12amp", "CA0120003PL2"),
    ("brm-016-0-1", "Bremas Switch 0-1 16amp", "CA0160003PL2"),
    ("brm-020-0-1", "Bremas Switch 0-1 20amp", "CA0200003PL2"),
    ("brm-025-0-1", "Bremas Switch 0-1 25amp", "CA0250003PL2"),
    ("brm-032-0-1", "Bremas Switch 0-1 32amp", "CA0320003PL2"),
    ("brm-040-0-1", "Bremas Switch 0-1 40amp", "CA0400003PL2"),
    ("brm-050-0-1", "Bremas Switch 0-1 50amp", "CA0500003PL2"),
    ("brm-032-2vel", "Bremas Switch 2 Velocidades 32amp", "CA0320009PL2"),
    ("brm-025-ed", "Bremas Switch Estrella-Delta 25amp", "CA0250010PL2"),
    ("brm-032-ed", "Bremas Switch Estrella-Delta 32amp", "CA0320010PL2"),
    ("brm-025-inv", "Bremas Switch Inversor 25amp", "CA0250008PL2"),
    ("brm-016-invret", "Bremas Switch Inversor c/Retorno 16amp", "CA0160036PL2"),
]

for pid, new_name, code in bremas_products:
    # Fix name: remove (CODE) from name
    old_name_pattern = f'name: "Bremas Switch'
    idx = content.find(f'id: "{pid}"')
    if idx == -1:
        continue
    
    name_idx = content.find('name: "Bremas Switch', idx)
    name_end = content.find('",', name_idx)
    old_name = content[name_idx+6:name_end+1]
    
    # Replace name
    content = content[:name_idx+6] + f'"{new_name}"' + content[name_end+1:]
    
    # Fix description: add Codigo
    desc_idx = content.find('description: "', idx)
    desc_end = content.find('",', desc_idx)
    desc = content[desc_idx+14:desc_end]
    if 'Codigo:' not in desc:
        new_desc = desc.rstrip('.') + f'. Codigo: {code}.'
        content = content[:desc_idx+14] + new_desc + content[desc_end:]

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print('Fixed Bremas product names and descriptions')
