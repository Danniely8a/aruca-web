FILEPATH = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts"

product = '  { id: "tb-771-step-cunete", slug: "titebond-771-step-cunete", name: "Titebond 771 Step Cuñete", brand: "Titebond", model: "771 Step", description: "Adhesivo Titebond 771 Step para pisos en cuñete. Formulado para la instalacion de pisos de madera.", shortDescription: "Titebond 771 Step Cuñete.", category: "Adhesivos y Pegamentos", image: "/assets/product-images/titebond/titebond-771-step-cunete.jpg" },'

with open(FILEPATH, "r", encoding="utf-8") as f:
    content = f.read()

# Insert after last titebond product
marker = "tb-instant-2oz"
idx = content.find(marker)
# Find the next product after that
next_id = content.find("\n    id: ", idx + 10)
if next_id == -1:
    next_id = content.find("\n  { id: ", idx + 10)
# Find the line start
line_start = content.rfind("\n", 0, next_id) + 1
insert = line_start

new = product + "\n"
content = content[:insert] + new + content[insert:]

with open(FILEPATH, "w", encoding="utf-8") as f:
    f.write(content)

print("Added Titebond 771 Step Cuñete")
