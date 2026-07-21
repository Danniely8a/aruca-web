import re

products = []

# SERIE 317 - MECHA TIPO HONGO PARA BISAGRAS
for d, cod in [(30,"317.300.11"),(35,"317.350.11"),(35,"317.350.12")]:
    products.append({"name":f"CMT MECHA TIPO HONGO PARA BISAGRAS {d}mm {cod}","model":cod,"desc":f"Mecha CMT Orange Tools tipo hongo para bisagrass. Diametro {d}mm. L.mecha 57.5mm. Z2 dientes. Eje 10mm. Codigo {cod}.","short":f"Mecha hongo bisagras {d}mm {cod}","cat":"Fresas","sub":"Mechas","img":""})

# SERIE 362 - MECHA CONEXION RAPIDA TALADRO MULTIPLE
for d, lc, lm, eje, cod in [(6,44,77,"10X30","362.060.11"),(6,44,77,"10X30","362.060.12"),(8,44,77,"10X30","362.080.11"),(10,44,77,"10X30","362.100.11"),(10,44,77,"10X30","362.100.12")]:
    products.append({"name":f"CMT MECHA CONEXION RAPIDA TALADRO MULTIPLE {d}mm {cod}","model":cod,"desc":f"Mecha CMT Orange Tools conexion rapida para taladro multiple. Diametro {d}mm. L.corte {lc}mm. L.mecha {lm}mm. Z2 dientes. Eje {eje}mm. Codigo {cod}.","short":f"Mecha conexion rapida {d}mm {cod}","cat":"Fresas","sub":"Mechas","img":""})

# SERIE 372 - MECHA PARA TALADRO MULTIPLE
for d, cod in [(6,"372.060.12"),(7,"372.070.12"),(8,"372.080.11"),(8,"372.080.12")]:
    products.append({"name":f"CMT MECHA PARA TALADRO MULTIPLE {d}mm {cod}","model":cod,"desc":f"Mecha CMT Orange Tools para taladro multiple. Diametro {d}mm. L.corte 65mm. L.mecha 105mm. Z2 dientes. Eje 10X30mm. Codigo {cod}.","short":f"Mecha taladro multiple {d}mm {cod}","cat":"Fresas","sub":"Mechas","img":""})

# SERIE 392 - MECHA PARA BISAGRAS
products.append({"name":"CMT MECHA PARA BISAGRAS 35mm 392.350.11","model":"392.350.11","desc":"Mecha CMT Orange Tools para bisagras. Diametro 35mm. L.corte 60mm. Eje 8mm. Codigo 392.350.11.","short":"Mecha bisagras 35mm 392.350.11","cat":"Fresas","sub":"Mechas","img":""})

# SERIE 369 - MECHA TIPO HONGO
for cod in ["369.350.11","369.350.12"]:
    products.append({"name":f"CMT MECHA TIPO HONGO 35mm {cod}","model":cod,"desc":f"Mecha CMT Orange Tools tipo hongo. Diametro 35mm. L.mecha 70mm. Z2 dientes. Eje 10mm. Codigo {cod}.","short":f"Mecha hongo 35mm {cod}","cat":"Fresas","sub":"Mechas","img":""})

# SERIE 344 - TALADRO MULTIPLE ROSCA M8
for d, cod in [(6,"344.060.11"),(6,"344.060.12"),(8,"344.080.11"),(10,"344.100.11")]:
    products.append({"name":f"CMT MECHA TALADRO MULTIPLE ROSCA M8 {d}mm {cod}","model":cod,"desc":f"Mecha CMT Orange Tools taladro multiple rosc a M8. Diametro {d}mm. L.corte 43mm. L.mecha 65mm. Z8 dientes. Eje M8. Codigo {cod}.","short":f"Mecha taladro multiple M8 {d}mm {cod}","cat":"Fresas","sub":"Mechas","img":""})

# SERIE 341 - TALADRO MULTIPLE ROSCA M10 CON AVELLANADOR
# First batch (30mm L.CORTE)
for d, cod in [(10,"337.100.12"),(12,"337.120.11"),(12,"337.120.12"),(6,"327.060.11"),(6,"327.060.12"),(6,"327.080.11"),(8,"327.080.12"),(10,"327.100.11"),(10,"327.100.12"),(12,"327.120.11"),(12,"327.120.12")]:
    products.append({"name":f"CMT MECHA PARA TALADRO MULTIPLE ROSCA M10 CON AVELLANADOR {d}mm {cod}","model":cod,"desc":f"Mecha CMT Orange Tools para taladro multiple rosc a M10 con avellanador. Diametro {d}mm. L.corte 30mm. L.mecha 35mm. Z2 dientes. Eje M10. Codigo {cod}.","short":f"Mecha taladro multiple M10 avellanador {d}mm {cod}","cat":"Fresas","sub":"Mechas","img":""})

# Second batch (40mm L.CORTE)
for d, cod in [(6,"329.060.12"),(8,"329.080.11"),(8,"329.080.12"),(10,"329.100.11"),(10,"329.100.12"),(12,"329.120.11"),(12,"329.120.12"),(6,"330.060.11"),(6,"330.060.12"),(8,"330.080.11"),(8,"330.080.12"),(10,"330.100.11"),(10,"330.100.12"),(12,"330.120.11"),(12,"330.120.12")]:
    products.append({"name":f"CMT MECHA PARA TALADRO MULTIPLE ROSCA M10 CON AVELLANADOR {d}mm {cod}","model":cod,"desc":f"Mecha CMT Orange Tools para taladro multiple rosc a M10 con avellanador. Diametro {d}mm. L.corte 40mm. L.mecha 55mm. Z2 dientes. Eje M10. Codigo {cod}.","short":f"Mecha taladro multiple M10 avellanador {d}mm {cod}","cat":"Fresas","sub":"Mechas","img":""})

# Third batch (50mm L.CORTE)
for d, cod in [(10,"337.100.12"),(12,"337.120.11"),(12,"337.120.12")]:
    pass  # Already added above

# SERIE 332/334/336/337/325/327/329/330 - TALADRO MULTIPLE M10
# 332 (L.CORTE 20)
for d, cod in [(6,"332.060.11"),(6,"332.060.12"),(8,"332.080.11"),(8,"332.080.12"),(10,"332.100.11"),(10,"332.100.12")]:
    products.append({"name":f"CMT MECHA PARA TALADRO MULTIPLE M10 {d}mm {cod}","model":cod,"desc":f"Mecha CMT Orange Tools para taladro multiple rosc a M10. Diametro {d}mm. L.corte 20mm. L.mecha 45mm. Z2 dientes. Eje M10. Codigo {cod}.","short":f"Mecha taladro multiple M10 {d}mm {cod}","cat":"Fresas","sub":"Mechas","img":""})

# 334 (L.CORTE 30)
for d, cod in [(6,"334.060.11"),(6,"334.060.12"),(7,"334.070.11"),(7,"334.070.12"),(8,"334.080.11"),(8,"334.080.12"),(10,"334.100.11"),(10,"334.100.12"),(12,"334.120.11"),(12,"334.120.12")]:
    products.append({"name":f"CMT MECHA PARA TALADRO MULTIPLE M10 {d}mm {cod}","model":cod,"desc":f"Mecha CMT Orange Tools para taladro multiple rosc a M10. Diametro {d}mm. L.corte 30mm. L.mecha 55mm. Z2 dientes. Eje M10. Codigo {cod}.","short":f"Mecha taladro multiple M10 {d}mm {cod}","cat":"Fresas","sub":"Mechas","img":""})

# 336 (L.CORTE 40)
for d, cod in [(8,"336.080.11"),(8,"336.080.12"),(10,"336.100.11"),(10,"336.100.12"),(12,"336.120.11"),(12,"336.120.12")]:
    products.append({"name":f"CMT MECHA PARA TALADRO MULTIPLE M10 {d}mm {cod}","model":cod,"desc":f"Mecha CMT Orange Tools para taladro multiple rosc a M10. Diametro {d}mm. L.corte 40mm. L.mecha 65mm. Z2 dientes. Eje M10. Codigo {cod}.","short":f"Mecha taladro multiple M10 {d}mm {cod}","cat":"Fresas","sub":"Mechas","img":""})

# 337 (L.CORTE 50)
for d, cod in [(6,"337.060.11"),(6,"337.060.12"),(8,"337.080.11"),(8,"337.080.12"),(10,"337.100.11")]:
    products.append({"name":f"CMT MECHA PARA TALADRO MULTIPLE M10 {d}mm {cod}","model":cod,"desc":f"Mecha CMT Orange Tools para taladro multiple rosc a M10. Diametro {d}mm. L.corte 50mm. L.mecha 75mm. Z2 dientes. Eje M10. Codigo {cod}.","short":f"Mecha taladro multiple M10 {d}mm {cod}","cat":"Fresas","sub":"Mechas","img":""})

# SERIE 512 - MECHA TIPO HONGO LARGAS HM
for d in [14,15,16,18,20,22,24,25,26,27,28,30,32,34,35]:
    cod = f"512.{d*10:03d}.11"
    products.append({"name":f"CMT MECHA TIPO HONGO LARGAS EN HM {d}mm {cod}","model":cod,"desc":f"Mecha CMT Orange Tools tipo hongo largas en HM. Diametro {d}mm. L.mecha 90mm. Z2+2 dientes. Eje 10mm. Codigo {cod}.","short":f"Mecha hongo larga HM {d}mm {cod}","cat":"Fresas","sub":"Mechas","img":""})

# SERIE 513 - MECHA TIPO HONGO LARGAS HSS
for d, cod in [(10,"512.101.31"),(12,"512.121.31"),(15,"512.151.31"),(16,"512.161.31"),(20,"512.201.31"),(22,"512.221.31")]:
    products.append({"name":f"CMT MECHA TIPO HONGO LARGAS EN HSS {d}mm {cod}","model":cod,"desc":f"Mecha CMT Orange Tools tipo hongo largas en HSS. Diametro {d}mm. L.mecha 90mm. Z2 dientes. Eje 10mm. Codigo {cod}.","short":f"Mecha hongo larga HSS {d}mm {cod}","cat":"Fresas","sub":"Mechas","img":""})

# SERIE 543 - MECHA DE CINCEL PARA ESCOPLEAR
for d, cod in [("1/4in","543.064.51"),("3/8in","543.095.51"),("1/2in","543.127.51")]:
    products.append({"name":f"CMT MECHA DE CINCEL PARA ESCOPLEAR {d} {cod}","model":cod,"desc":f"Mecha CMT Orange Tools de cincel para escoplear. Diametro {d}. L.mecha 19mm. Z1 dientes. Eje 19mm. Codigo {cod}.","short":f"Mecha cincel escoplear {d} {cod}","cat":"Fresas","sub":"Mechas","img":""})

# SERIE 529 - MECHA PARA TARUGOS
for d, cod in [("3/8in","529.095.31"),("1/2in","529.127.31"),("5/8in","529.158.31"),("3/4in","529.191.31"),("7/8in","529.222.31"),("1in","529.254.31")]:
    products.append({"name":f"CMT MECHA PARA TARUGOS {d} {cod}","model":cod,"desc":f"Mecha CMT Orange Tools para tarugos. Diametro {d}. L.mecha 140mm. Z4 dientes. Eje 1/2in. Codigo {cod}.","short":f"Mecha tarugos {d} {cod}","cat":"Fresas","sub":"Mechas","img":""})

# ACCESSORIES
products.append({"name":"CMT ARANDELA PARA MECHA 3/8 990.422.00","model":"990.422.00","desc":"Arandela CMT Orange Tools para mecha 3/8. Codigo 990.422.00.","short":"Arandela mecha 3/8 990.422.00","cat":"Fresas","sub":"Mechas","img":""})
products.append({"name":"CMT TORNILLO PARA MECHA 1/8 990.058.00","model":"990.058.00","desc":"Tornillo CMT Orange Tools para mecha 1/8. Codigo 990.058.00.","short":"Tornillo mecha 1/8 990.058.00","cat":"Fresas","sub":"Mechas","img":""})

# SERIE 299 - ANILLO REDUCTOR
for d, cod in [("1in A 5/8in","299.216.00"),("30MM A 5/8in","299.211.00"),("30MM A 3/4in","299.241.00"),("30MM A 1in","299.212.00"),("32MM A 30MM","299.229.00"),("35MM A 30MM","299.230.00")]:
    products.append({"name":f"CMT ANILLO REDUCTOR {d} {cod}","model":cod,"desc":f"Anillo reductor CMT Orange Tools. Diametro {d}. Codigo {cod}.","short":f"Anillo reductor {d} {cod}","cat":"Fresas","sub":"Mechas","img":""})

# JUEGO DE MECHAS HSS
products.append({"name":"CMT JUEGO DE MECHAS HSS 4-5-6-8-10MM 517.001.01","model":"517.001.01","desc":"Juego de mechas CMT Orange Tools HSS. Medidas: 4, 5, 6, 8, 10mm. Codigo 517.001.01.","short":"Juego mechas HSS 4-10mm 517.001.01","cat":"Fresas","sub":"Mechas","img":""})
products.append({"name":"CMT JUEGO DE MECHAS HSS 3-4-5-6-7-8-9-10MM 517.002.01","model":"517.002.01","desc":"Juego de mechas CMT Orange Tools HSS. Medidas: 3, 4, 5, 6, 7, 8, 9, 10mm. Codigo 517.002.01.","short":"Juego mechas HSS 3-10mm 517.002.01","cat":"Fresas","sub":"Mechas","img":""})

# Generate TypeScript entries
lines = []
for p in products:
    slug = p["name"].lower().replace('"','').replace('/','-').replace(' ','-').replace('+','-').replace('\\','')
    slug = re.sub(r'-+', '-', slug).strip('-')
    # Escape any remaining double quotes in values
    name = p["name"].replace('"', '\\"')
    desc = p["desc"].replace('"', '\\"')
    short = p["short"].replace('"', '\\"')
    lines.append(f'  {{ id: "cmt-ot-{slug}", slug: "{slug}", name: "{name}", brand: "CMT Orange Tools", model: "{p["model"]}", description: "{desc}", shortDescription: "{short}", category: "{p["cat"]}", subcategory: "{p["sub"]}", image: "{p["img"]}" }},')

print(f"Total products: {len(products)}")
with open(r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\new_products2.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(lines))
print("Written to new_products2.txt")
