FILEPATH = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts"
with open(FILEPATH, 'r', encoding='utf-8') as f:
    lines = f.readlines()

filtered = [l for l in lines if 'brand: "CMT"' not in l]
removed = len(lines) - len(filtered)
with open(FILEPATH, 'w', encoding='utf-8') as f:
    f.writelines(filtered)
print(f"Removed {removed} CMT products. File now has {len(filtered)} lines.")
