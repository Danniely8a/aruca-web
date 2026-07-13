import os
from PIL import Image

src_dir = r'C:\Users\Danniely\Desktop\IMAGENES DE PRODCUTOS POR MARCA\CMT CONTRACTOR'
dst_dir = r'C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\public\assets\product-images\cmt-contractor'

missing = ['K03606','K02408','K04008','K02412','K04012','K08012','P07040','P12096','81131','80105','81815','81412','85801','84211']

for m in missing:
    files = [f for f in os.listdir(src_dir) if os.path.splitext(f)[0] == m]
    if files:
        src = os.path.join(src_dir, files[0])
        dst = os.path.join(dst_dir, m + '.jpg')
        img = Image.open(src)
        img = img.resize((600, int(600 * img.height / img.width)), Image.LANCZOS)
        img = img.convert('RGB')
        img.save(dst, quality=80)
        print(f'Converted: {files[0]} -> {m}.jpg')
    else:
        print(f'NOT FOUND: {m}')
