FILEPATH = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts"

with open(FILEPATH, "r", encoding="utf-8") as f:
    content = f.read()

# Remove the broken GAV section
gav_start = content.find("// --- GAV VALVULAS")
gav_end = content.find("\n];", gav_start) + 3  # include \n];

content = content[:gav_start] + content[gav_end:]

with open(FILEPATH, "w", encoding="utf-8") as f:
    f.write(content)

print("Removed broken GAV section")
