import re

products = [
    {"name":"Euroair Motor Monofasico 1HP 110V 60Hz 3600RPM","model":"MOT-MONO-1HP","desc":"Motor monofasico Euroair 1HP. Voltaje 110V 60Hz. Velocidad 3600RPM.","short":"Motor monofasico 1HP 110V","cat":"Compresores","sub":"Motores","img":"/assets/product-images/euroair/motor-monofasico.png"},
    {"name":"Euroair Motor Monofasico 2HP 110V 60Hz 3600RPM","model":"MOT-MONO-2HP","desc":"Motor monofasico Euroair 2HP. Voltaje 110V 60Hz. Velocidad 3600RPM.","short":"Motor monofasico 2HP 110V","cat":"Compresores","sub":"Motores","img":"/assets/product-images/euroair/motor-monofasico.png"},
    {"name":"Euroair Motor Monofasico 3HP 110V 60Hz 3600RPM","model":"MOT-MONO-3HP","desc":"Motor monofasico Euroair 3HP. Voltaje 110V 60Hz. Velocidad 3600RPM.","short":"Motor monofasico 3HP 110V","cat":"Compresores","sub":"Motores","img":"/assets/product-images/euroair/motor-monofasico.png"},
    {"name":"Euroair Motor Monofasico 5.5HP 220V 60Hz","model":"MOT-MONO-55HP","desc":"Motor monofasico Euroair 5.5HP. Voltaje 220V 60Hz.","short":"Motor monofasico 5.5HP 220V","cat":"Compresores","sub":"Motores","img":"/assets/product-images/euroair/motor-monofasico.png"},
    {"name":"Euroair Motor Trifasico 5.5HP 220V 60Hz 1750RPM","model":"MOT-TRI-55HP","desc":"Motor trifasico Euroair 5.5HP. Voltaje 220V 60Hz. Velocidad 1750RPM.","short":"Motor trifasico 5.5HP 220V","cat":"Compresores","sub":"Motores","img":"/assets/product-images/euroair/motor-trifasico.png"},
    {"name":"Euroair Motor Trifasico 7.5HP 220V 60Hz 1750RPM","model":"MOT-TRI-75HP","desc":"Motor trifasico Euroair 7.5HP. Voltaje 220V 60Hz. Velocidad 1750RPM.","short":"Motor trifasico 7.5HP 220V","cat":"Compresores","sub":"Motores","img":"/assets/product-images/euroair/motor-trifasico.png"},
    {"name":"Euroair Motor Trifasico 10HP 220V 60Hz 1750RPM","model":"MOT-TRI-10HP","desc":"Motor trifasico Euroair 10HP. Voltaje 220V 60Hz. Velocidad 1750RPM.","short":"Motor trifasico 10HP 220V","cat":"Compresores","sub":"Motores","img":"/assets/product-images/euroair/motor-trifasico.png"},
    {"name":"Euroair Motor Trifasico 15HP 220V 60Hz 1750RPM","model":"MOT-TRI-15HP","desc":"Motor trifasico Euroair 15HP. Voltaje 220V 60Hz. Velocidad 1750RPM.","short":"Motor trifasico 15HP 220V","cat":"Compresores","sub":"Motores","img":"/assets/product-images/euroair/motor-trifasico.png"},
]

lines = []
for p in products:
    slug = p["name"].lower().replace('"','').replace('/','-').replace(' ','-').replace('+','-')
    slug = re.sub(r'-+', '-', slug).strip('-')
    name = p["name"].replace('"', '\\"')
    desc = p["desc"].replace('"', '\\"')
    short = p["short"].replace('"', '\\"')
    lines.append(f'  {{ id: "{slug}", slug: "{slug}", name: "{name}", brand: "EUROAIR", model: "{p["model"]}", description: "{desc}", shortDescription: "{short}", category: "{p["cat"]}", subcategory: "{p["sub"]}", image: "{p["img"]}" }},')

with open("new_products_motors.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(lines))

print(f"Total: {len(products)} products")
