import os

f = os.path.join(r'C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web', 'src', 'lib', 'data', 'products.ts')
with open(f, 'r', encoding='utf-8') as fh:
    content = fh.read()

image_map = {
    '811.020.11': '811-020-11.jpg',
    '811.030.11': '811-030-11.jpg',
    '811.040.11': '811-040-11.jpg',
    '811.050.11': '811-050-11.jpg',
    '811.060.11': '811-060-11.jpg',
    '811.064.11': '811-064-11.jpg',
    '811.064.11B': '811-064-11.jpg',
    '811.070.11': '811-070-11.jpg',
    '811.080.11': '811-080-11.jpg',
    '811.081.11': '811-081-11.jpg',
    '811.095.11': '811-095-11.jpg',
    '811.095.11B': '811-095-11.jpg',
    '811.100.11': '811-100-11.jpg',
    '811.120.11': '811-120-11.jpg',
    '811.127.11': '811-127-11.jpg',
    '811.150.11': '811-150-11.jpg',
    '811.158.11': '811-158-11.jpg',
    '811.160.11': '811-160-11.jpg',
    '811.180.11': '811-180-11.jpg',
    '811.191.11': '811-191-11.jpg',
    '811.200.11': '811-200-11.jpg',
    '811.220.11': '811-220-11.jpg',
    '811.254.11': '811-254-11.jpg',
}

count = 0
for model, img_file in image_map.items():
    lines = content.split('\n')
    for i, line in enumerate(lines):
        if f'model: "{model}"' in line and 'foto-811-812.jpg' in line:
            lines[i] = line.replace('foto-811-812.jpg', img_file)
            count += 1
            break
    content = '\n'.join(lines)

with open(f, 'w', encoding='utf-8') as fh:
    fh.write(content)

print(f'Updated {count} products with individual images')
