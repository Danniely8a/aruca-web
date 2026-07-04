import os
from PIL import Image

SRC = r"C:\Users\Danniely\Desktop\IMAGENES DE PRODCUTOS POR MARCA\EUROAIR"
DST = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\public\assets\product-images"

optimized = {}
for fname in os.listdir(SRC):
    fpath = os.path.join(SRC, fname)
    if not os.path.isfile(fpath):
        continue
    
    base_name = os.path.splitext(fname)[0]
    out_name = base_name.lower().replace(" ", "-").replace("ñ", "n").replace("é", "e").replace("í", "i").replace("á", "a").replace("ó", "o").replace("ú", "u") + ".jpg"
    out_path = os.path.join(DST, out_name)
    
    try:
        img = Image.open(fpath)
        if img.mode in ('RGBA', 'P', 'LA'):
            img = img.convert('RGB')
        img.save(out_path, 'JPEG', quality=80, optimize=True)
        size_kb = os.path.getsize(out_path) / 1024
        print(f"  {out_name} ({size_kb:.0f} KB)")
        optimized[base_name] = out_name
    except Exception as e:
        print(f"  ERROR {fname}: {e}")

print(f"\n{len(optimized)} images optimized")
print("\nFiles:")
for k, v in sorted(optimized.items()):
    print(f"  {k} -> {v}")
