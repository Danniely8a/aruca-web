filepath = r'C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

zz_codes = ['607','608','609','627','628','629','6000','6001','6002','6003','6004','6005','6006','6007','6008','6009','6200','6201','6202','6203','6204','6205','6206','6207','6208','6209','6210','6211','6300','6301','6302','6303','6304','6305','6306','6307','6308','63002','51102','51103','51104']

rrs_codes = ['62205','62206','62207','62208']

# Find insertion point
mile_marker = '// ─── MILESCRAFT'
idx = content.find(mile_marker)

lines = []
for code in zz_codes:
    lines.append('  {')
    lines.append(f'    id: "isb-zz-{code}",')
    lines.append(f'    slug: "rolinera-zz-{code}",')
    lines.append(f'    name: "Rolinera ZZ {code}",')
    lines.append(f'    brand: "ISB",')
    lines.append(f'    model: "{code}-ZZ",')
    lines.append(f'    description: "Rolinera ZZ modelo {code} para maquinaria industrial.",')
    lines.append(f'    shortDescription: "Rolinera ZZ {code}.",')
    lines.append(f'    category: "Accesorios",')
    lines.append(f'    image: "/assets/brands/isb_x2.0.png",')
    lines.append('  },')

for code in rrs_codes:
    lines.append('  {')
    lines.append(f'    id: "isb-rrs-{code}",')
    lines.append(f'    slug: "rolinera-rrs-{code}",')
    lines.append(f'    name: "Rolinera RRS {code}",')
    lines.append(f'    brand: "ISB",')
    lines.append(f'    model: "{code}-RRS",')
    lines.append(f'    description: "Rolinera RRS modelo {code} para maquinaria industrial.",')
    lines.append(f'    shortDescription: "Rolinera RRS {code}.",')
    lines.append(f'    category: "Accesorios",')
    lines.append(f'    image: "/assets/brands/isb_x2.0.png",')
    lines.append('  },')

products = '\n'.join(lines) + '\n'
new_content = content[:idx] + products + content[idx:]

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f'Added {len(zz_codes)} ZZ + {len(rrs_codes)} RRS = {len(zz_codes)+len(rrs_codes)} rolineras ISB')
