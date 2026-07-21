import re

ts_file = "src/lib/data/products.ts"
with open(ts_file, "r", encoding="utf-8") as f:
    content = f.read()

# Series image mapping
series_img = {
    "512": "/assets/product-images/cmt-orange-tools/SERIE 512.jpg",
    "317": "/assets/product-images/cmt-orange-tools/SERIE 317.jpg",
    "344": "/assets/product-images/cmt-orange-tools/SERIE 344.jpg",
    "369": "/assets/product-images/cmt-orange-tools/SERIE 369.jpg",
    "329": "/assets/product-images/cmt-orange-tools/SERIE 329.jpg",
    "330": "/assets/product-images/cmt-orange-tools/SERIE 330.jpg",
    "337": "/assets/product-images/cmt-orange-tools/SERIE 337.jpg",
    "327": "/assets/product-images/cmt-orange-tools/SERIE 327.jpg",
    "336": "/assets/product-images/cmt-orange-tools/SERIE 336.jpg",
    "334": "/assets/product-images/cmt-orange-tools/SERIE 334.jpg",
    "332": "/assets/product-images/cmt-orange-tools/SERIE 332.jpg",
    "529": "/assets/product-images/cmt-orange-tools/SERIE 529.jpg",
}

# Individual images
individual_img = {
    "512.101.31": "/assets/product-images/cmt-orange-tools/512.101.31.jpg",
    "512.140.11": "/assets/product-images/cmt-orange-tools/512.140.11.jpg",
}

# All codes from screenshots
codes = [
    "512.101.31","512.121.31","512.151.31","512.161.31","512.201.31","512.221.31",
    "317.300.11","317.350.11",
    "344.060.11","344.060.12","344.080.11",
    "369.350.11","369.350.12",
    "512.140.11","512.150.11","512.160.11",
    "329.080.11","329.080.12","329.120.12",
    "330.080.11","330.080.12","330.120.11","330.120.12",
    "529.127.31","529.254.31","529.191.31","529.095.31",
    "337.120.11","337.120.12","337.100.11",
    "327.060.11","327.060.12","327.080.11",
    "336.100.12","336.120.11","336.120.12",
    "334.120.11","334.120.12",
    "332.060.11","332.060.12",
]

updated = 0
for code in codes:
    if code in individual_img:
        img = individual_img[code]
    else:
        series_num = code.split(".")[0]
        img = series_img.get(series_num, "")
    
    if not img:
        continue
    
    # Find the line containing this model code with empty image
    lines = content.split("\n")
    for i, line in enumerate(lines):
        if f'model: "{code}"' in line and 'image: ""' in line:
            lines[i] = line.replace('image: ""', f'image: "{img}"')
            updated += 1
            break
    content = "\n".join(lines)

with open(ts_file, "w", encoding="utf-8") as f:
    f.write(content)

print(f"Updated {updated} products")
