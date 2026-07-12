FILEPATH = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts"

products = [
    '  { id: "cmt-con-disco-cromo-7-1-4-z140", slug: "cmt-disco-cromovanadium-madera-7-1-4-z140-k14007", name: "CMT DISCO CROMOVANADIUM PARA MADERA CONTRAENCHAPADA Y PLASTICO 7-1/4\\" Z140 K14007", brand: "CMT Contractor", model: "K14007", description: "Disco CMT Contractor cromovanadium para madera contraenchapada y plastico. Diametro 7-1/4\\". Cuerpo 0,047mm. Espesor 0,079mm. Hueco 5/8\\". Z140 dientes. Codigo K14007.", shortDescription: "Disco CMT cromovanadium 7-1/4\\" Z140.", category: "Discos", subcategory: "Discos para Madera", image: "/assets/product-images/cmt-contractor/K14007.jpg" },',
    '  { id: "cmt-con-disco-cromo-10-z200", slug: "cmt-disco-cromovanadium-madera-10-z200-k20010", name: "CMT DISCO CROMOVANADIUM PARA MADERA CONTRAENCHAPADA Y PLASTICO 10\\" Z200 K20010", brand: "CMT Contractor", model: "K20010", description: "Disco CMT Contractor cromovanadium para madera contraenchapada y plastico. Diametro 10\\". Cuerpo 0,071mm. Espesor 0,095mm. Hueco 5/8\\". Z200 dientes. Codigo K20010.", shortDescription: "Disco CMT cromovanadium 10\\" Z200.", category: "Discos", subcategory: "Discos para Madera", image: "/assets/product-images/cmt-contractor/K20010.jpg" },',
]

with open(FILEPATH, 'r', encoding='utf-8') as f:
    content = f.read()

cats_pos = content.rfind('export const productCategories')
prod_end = content.rfind('];', 0, cats_pos)

new_block = "\n".join(products) + "\n"
content = content[:prod_end + 2] + new_block + content[prod_end + 2:]

with open(FILEPATH, 'w', encoding='utf-8') as f:
    f.write(content)
print(f"Added {len(products)} CMT Contractor discos cromovanadium")
