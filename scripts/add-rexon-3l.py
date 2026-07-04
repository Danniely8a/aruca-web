filepath = r'C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

sizes_3l = [130,140,150,160,170,180,190,200,210,220,225,230,240,250,255,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,610,620,630,640,650,660,680,690,700,710,720,730]

forza_marker = '// ─── FORZA'
idx = content.find(forza_marker)

lines = []
for s in sizes_3l:
    lines.append('  {')
    lines.append(f'    id: "rexon-3l-{s}",')
    lines.append(f'    slug: "correa-tipo-3l-{s}",')
    lines.append(f'    name: "Correa Tipo 3L - {s}",')
    lines.append(f'    brand: "REXON",')
    lines.append(f'    model: "3L-{s}",')
    lines.append(f'    description: "Correa de transmisión Tipo 3L medida {s}\\" para maquinaria industrial.",')
    lines.append(f'    shortDescription: "Correa Tipo 3L {s}\\".",')
    lines.append(f'    category: "Accesorios",')
    lines.append(f'    image: "/assets/brands/rexon_x2.0.jpeg",')
    lines.append('  },')

belts = '\n'.join(lines) + '\n'
new_content = content[:idx] + belts + content[idx:]

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f'Added {len(sizes_3l)} correas Tipo 3L')
