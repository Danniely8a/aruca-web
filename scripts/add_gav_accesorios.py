FILEPATH = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts"

def esc(s):
    return s.replace('"', '\\"')

lines = []

def add(gav_id, slug, name, modelo, desc, short, sub):
    lines.append(
        f'  {{ id: "{gav_id}", slug: "{slug}", name: "{esc(name)}", brand: "GAV", model: "{modelo}", '
        f'description: "{esc(desc)}", shortDescription: "{esc(short)}", '
        f'category: "Accesorios Compresores", subcategory: "{sub}", image: "" }},'
    )

# LUBRICADOR
add("gav-lub-1-4-at0142", "gav-lubricador-herramienta-1-4-at0142", "GAV Lubricador para Herramienta 1/4\"", "AT0142", "Lubricador para herramienta GAV. Rosca 1/4\". Modelo AT0142.", "Lubricador herramienta 1/4\".", "Lubricadores")

# FILTROS
add("gav-fil-1-4-at1042", "gav-filtro-herramienta-1-4-at1042", "GAV Filtro para Herramienta 1/4\"", "AT1042", "Filtro para herramienta GAV. Rosca 1/4\". Modelo AT1042.", "Filtro herramienta 1/4\".", "Filtros")
add("gav-fil-6mm-30601", "gav-filtro-linea-6mm-30601", "GAV Filtro en Linea 6mm", "30601", "Filtro en linea GAV de 6mm. Modelo 30601.", "Filtro en linea 6mm.", "Filtros")
add("gav-fil-1-2-f200", "gav-filtro-linea-1-2-f200", "GAV Filtro en Linea 1/2\"", "F200", "Filtro en linea GAV de 1/2\". Modelo F200.", "Filtro en linea 1/2\".", "Filtros")

# REGULADORES
for desc, pot, modelo, costo in [
    ("Regulador para Herramienta 1/4\"", "1/4\"", "AT0143", "5.39"),
    ("Regulador para Herramienta 1/4\"", "1/4\"", "AT1043", "3.48"),
    ("Regulador de Presion 3/8\"", "3/8\"", "RPF187", "10.63"),
    ("Regulador de Presion 1/2\"", "1/2\"", "RPF188", "14.76"),
    ("Regulador C/Manometro 1/4\"", "1/4\"", "R180", "9.31"),
    ("Regulador C/Manometro 1/2\"", "1/2\"", "R200", "14.20"),
    ("Regulador 1/4\"", "1/4\"", "L180", "11.49"),
    ("Regulador 1/2\"", "1/2\"", "R200B", "9.13"),
    ("Filtro Regulador 1/4\"", "1/4\"", "FR180", "15.50"),
    ("Filtro Regulador 1/2\"", "1/2\"", "FR200", "21.12"),
    ("FRL", "1/4\"", "GFR180L", "35.00"),
    ("FRL 1/2\"", "1/2\"", "GFR180 1/2", "38.70"),
]:
    slug = "gav-regulador-" + pot.replace('"', '').replace('/', '-') + "-" + modelo.lower()
    add(f"gav-reg-{modelo.lower()}", slug, f"GAV {desc}", modelo, f"Regulador GAV {desc}. Modelo {modelo}.", f"Regulador {desc}.", "Reguladores")

# ACEITE
add("gav-aceite-1-2l", "gav-aceite-compresor-1-2l", "GAV Aceite para Compresor 1.2L", "N/A", "Aceite para compresor GAV de 1.2 litros.", "Aceite compresor 1.2L.", "Aceites")

# REDUCCIONES
for desc, pot, modelo in [
    ("Reduccion H M 1/2\" 1/4\"", "1/2\" 1/4\"", "1215/6"),
    ("Reduccion H M 1/4\" 1/8\"", "1/4\" 1/8\"", "1215/2"),
]:
    slug = "gav-reduccion-" + pot.replace('"', '').replace(' ', '-').lower() + "-" + modelo.lower().replace('/', '-')
    add(f"gav-red-{modelo.lower().replace('/', '-')}", slug, f"GAV {desc}", modelo, f"Reduccion GAV {desc}. Modelo {modelo}.", f"Reduccion {desc}.", "Reducciones")

# BUSHING REDUCIDOS
for pot, modelo in [
    ("3/8\" a 1/4\"", "1217/4"),
    ("1/2\" a 1/4\"", "1217/6"),
    ("1/2\" a 3/8\"", "1217/5"),
    ("3/4\" a 1/2\"", "1217/7"),
    ("1\" a 1/2\"", "1217/8"),
    ("1\" a 3/4\"", "1217/9"),
    ("1/4\" a 1/8\"", "1215/2"),
]:
    slug = "gav-bushing-" + pot.replace('"', '').replace(' ', '-').replace('a', '').lower() + "-" + modelo.lower().replace('/', '-')
    add(f"gav-bush-{modelo.lower().replace('/', '-')}", slug, f"GAV Bushing Reducido {pot}", modelo, f"Bushing reducido GAV de {pot}. Modelo {modelo}.", f"Bushing reducido {pot}.", "Bushing Reducidos")

# ACOPLE RAPIDO UNIVERSAL
for pot, modelo in [
    ("1/4\" M", "Uni/3/5"),
    ("1/2\" M", "Uni/3/6"),
    ("1/2\" H", "Uni/3/3"),
    ("1/2\" E", "Uni/3/8"),
    ("3/4\" E", "Uni/3/1"),
    ("Espiga 1/4\"", "Uni/C/2"),
    ("Espiga 5/16\"", "Uni/C/1"),
    ("Espiga 3/8\"", "Uni/C/3"),
    ("Espiga 1/2\"", "Uni/C/4"),
]:
    slug = "gav-acople-" + pot.replace('"', '').replace(' ', '-').lower() + "-" + modelo.lower().replace('/', '-')
    add(f"gav-acopl-{modelo.lower().replace('/', '-')}", slug, f"GAV Acople Rapido Universal {pot}", modelo, f"Acople rapido universal GAV. {pot}. Modelo {modelo}.", f"Acople rapido universal {pot}.", "Acoples Rapidos")

# ACOPLE RAPIDO (OTROS)
for desc, pot, modelo in [
    ("Acople Rapido De Seguridad", "1/4\" M", "AIRBLOK AB1"),
    ("Acople Rapido Antiretorno", "1/4\" H", "AIRBLOK AB2"),
    ("Acople Rapido", "1/2\" E", "66E7/1"),
    ("Kit Punto de Aire", "1/4\" M", "60E1/1-6"),
]:
    slug = "gav-acople-" + desc.lower().replace(' ', '-') + "-" + modelo.lower().replace(' ', '-').replace('/', '-')
    add(f"gav-acopl-{modelo.lower().replace(' ', '-').replace('/', '-')}", slug, f"GAV {desc} {pot}", modelo, f"{desc} GAV. {pot}. Modelo {modelo}.", f"{desc} {pot}.", "Acoples Rapidos")

# BOQUILLA INFLADOR
for desc, pot, modelo, tipo in [
    ("Boquilla inflador Caucho", "Espiga 1/4\"", "66E7/8-1", "Espiga 1/4\""),
    ("Boquilla inflador Caucho Camion", "Espiga 5/16\"", "66E7/8-2", "Espiga 5/16\""),
]:
    slug = "gav-boquilla-" + pot.replace('"', '').replace(' ', '-').lower() + "-" + modelo.lower().replace('/', '-')
    add(f"gav-boq-{modelo.lower().replace('/', '-')}", slug, f"GAV {desc} {pot}", modelo, f"{desc} GAV. {pot}. Modelo {modelo}.", f"{desc} {pot}.", "Boquillas Inflador")

# TAPA ANTIGOTEOS
add("gav-tapa-antigoteos", "gav-tapa-antigoteos-d6ap008", "GAV Tapa Antigoteos", "D6AP008", "Tapa antigoteos GAV. Modelo D6AP008.", "Tapa antigoteos.", "Accesorios Varios")

# CONECTOR RAPIDO
for pot, modelo in [
    ("1/4\" M", "Uni/3/5"),
    ("1/4\" H", "Uni/3/3"),
]:
    slug = "gav-conector-" + pot.replace('"', '').replace(' ', '-').lower() + "-" + modelo.lower().replace('/', '-')
    add(f"gav-conect-{modelo.lower().replace('/', '-')}", slug, f"GAV Conector Rapido {pot}", modelo, f"Conector rapido GAV. {pot}. Modelo {modelo}.", f"Conector rapido {pot}.", "Conectores Rapidos")

# ESPIGA X ESPIGA
for pot, modelo in [
    ("1/4\"", "66E2/1"),
    ("3/8\"", "66E2/2"),
]:
    slug = "gav-espigaxespiga-" + pot.replace('"', '').replace('/', '-') + "-" + modelo.lower().replace('/', '-')
    add(f"gav-espiga-{modelo.lower().replace('/', '-')}", slug, f"GAV Espiga X Espiga {pot}", modelo, f"Espiga X Espiga GAV de {pot}. Modelo {modelo}.", f"Espiga X Espiga {pot}.", "Espigas y Conectores")

# ESPIGA X CONECTOR RAPIDO
for pot, modelo in [
    ("1/4\" mang", "43/C1"),
    ("5/16\" mang", "43/C2"),
    ("3/8\" mang", "43/C3"),
]:
    slug = "gav-espigaxconector-" + pot.replace('"', '').replace(' ', '-').lower() + "-" + modelo.lower().replace('/', '-')
    add(f"gav-espcon-{modelo.lower().replace('/', '-')}", slug, f"GAV Espiga X Conector Rapido {pot}", modelo, f"Espiga X Conector Rapido GAV. {pot}. Modelo {modelo}.", f"Espiga X Conector Rapido {pot}.", "Espigas y Conectores")

# ESPIGA MANGUERA X ROSCA
for pot, modelo in [
    ("1/4\" M X 1/4\" mang", "1233/2"),
    ("1/4\" M X 5/16\" mang", "1233/3"),
    ("1/4\" H X 1/4\" mang", "1244/1"),
    ("1/4\" H X 5/16\" mang", "1244/2"),
    ("1/4\" H X 3/8\" mang", "1244/3"),
]:
    slug = "gav-espmang-" + pot.replace('"', '').replace(' ', '-').lower() + "-" + modelo.lower().replace('/', '-')
    add(f"gav-espmang-{modelo.lower().replace('/', '-')}", slug, f"GAV Espiga Manguera X Rosca {pot}", modelo, f"Espiga manguera x rosca GAV. {pot}. Modelo {modelo}.", f"Espiga manguera X rosca {pot}.", "Espigas y Conectores")

# ACOPLE RAPIDO (ESPiga)
add("gav-acopl-espiga-1-4-d6ap001", "gav-acople-rapido-espiga-1-4-d6ap001", "GAV Acople Rapido Espiga 1/4\"", "D6AP001", "Acople rapido GAV espiga 1/4\". Modelo D6AP001.", "Acople rapido espiga 1/4\".", "Acoples Rapidos")

# KIT PARTES REPUESTO
add("gav-kit-repuesto-1-4", "gav-kit-partes-repuesto-1-4", "GAV Kit Partes Repuesto 1/4\"", "78E1/1", "Kit de partes de repuesto GAV para herramientas 1/4\". Modelo 78E1/1.", "Kit partes repuesto 1/4\".", "Repuestos")

# LLAVE DE BOLA
for pot, modelo in [("H 1/4\" H", "H-H1/4-H"), ("M 1/4\" H", "1268/2")]:
    slug = "gav-llavebola-" + pot.replace('"', '').replace(' ', '-').lower() + "-" + modelo.lower().replace('/', '-')
    add(f"gav-llavebola-{modelo.lower().replace('/', '-')}", slug, f"GAV Llave de Bola {pot}", modelo, f"Llave de bola GAV. {pot}. Modelo {modelo}.", f"Llave de bola {pot}.", "Llaves")

# VALVULA DRENAJE
for pot, modelo in [("1/4\"", "54A/4"), ("3/8\"", "54A/4B"), ("1/2\"", "54A/3")]:
    slug = "gav-valvdren-" + pot.replace('"', '').replace('/', '-') + "-" + modelo.lower().replace('/', '-')
    add(f"gav-valvdren-{modelo.lower().replace('/', '-')}", slug, f"GAV Valvula Drenaje {pot}", modelo, f"Valvula de drenaje GAV de {pot}. Modelo {modelo}.", f"Valvula drenaje {pot}.", "Valvulas Drenaje")

# TUBO PRESION
add("gav-tubo-8mm", "gav-tubo-presion-8mm-8mm", "GAV Tubo Presion 8mm", "8mm", "Tubo de presion GAV de 8mm.", "Tubo presion 8mm.", "Tubos y Mangueras")

# MANGUERA SANITARIA
for pot, modelo, tam in [("1/4\"", "3020/1", "10m"), ("5/16\"", "3020/2", "10m"), ("3/8\"", "3020/3", "10m")]:
    slug = "gav-mangsanit-" + pot.replace('"', '').replace('/', '-') + "-" + modelo.lower().replace('/', '-')
    add(f"gav-mangsanit-{modelo.lower().replace('/', '-')}", slug, f"GAV Manguera Sanitaria {pot} {tam}", modelo, f"Manguera sanitaria GAV de {pot}. {tam}. Modelo {modelo}.", f"Manguera sanitaria {pot} {tam}.", "Tubos y Mangueras")

# MANGUERA PRESION
for pot, modelo, tam in [("1/4\"", "3000/7", "10m"), ("5/16\"", "3000/9", "10m"), ("3/8\"", "3000/10", "10m"), ("1/2\"", "3000/11", "10m")]:
    slug = "gav-mangpres-" + pot.replace('"', '').replace('/', '-') + "-" + modelo.lower().replace('/', '-')
    add(f"gav-mangpres-{modelo.lower().replace('/', '-')}", slug, f"GAV Manguera Presion {pot} {tam}", modelo, f"Manguera de presion GAV de {pot}. {tam}. Modelo {modelo}.", f"Manguera presion {pot} {tam}.", "Tubos y Mangueras")

# MANGUERA ESPIRAL
for dim, modelo, tam in [("6X8", "GRU20/6", "20mts"), ("8X10", "GRU20/8", "20mts"), ("8X12", "GRU20/8-12", "20mts")]:
    slug = "gav-mangesp-" + dim.lower().replace('x', '-') + "-" + modelo.lower().replace('/', '-')
    add(f"gav-mangesp-{modelo.lower().replace('/', '-')}", slug, f"GAV Manguera Espiral {dim} {tam}", modelo, f"Manguera espiral GAV {dim}. {tam}. Modelo {modelo}.", f"Manguera espiral {dim} {tam}.", "Tubos y Mangueras")

# MANGUERA CON ENROLLADOR
for dim, modelo, tam in [("6X12", "AT03122", "15mts"), ("10X14.5", "AT011411", "15mts")]:
    slug = "gav-mangroll-" + dim.lower().replace('x', '-') + "-" + modelo.lower().replace('/', '-')
    add(f"gav-mangroll-{modelo.lower()}", slug, f"GAV Manguera con Enrollador {dim} {tam}", modelo, f"Manguera con enrollador GAV {dim}. {tam}. Modelo {modelo}.", f"Manguera con enrollador {dim} {tam}.", "Tubos y Mangueras")

# MANGUERA SILICONA
for dim, modelo, tam in [("10X17", "AT011617", "10m")]:
    slug = "gav-mangsil-" + dim.lower().replace('x', '-') + "-" + modelo.lower().replace('/', '-')
    add(f"gav-mangsil-{modelo.lower()}", slug, f"GAV Manguera Silicona {dim} {tam}", modelo, f"Manguera de silicona GAV {dim}. {tam}. Modelo {modelo}.", f"Manguera silicona {dim} {tam}.", "Tubos y Mangueras")

# MANOMETRO
add("gav-manometro-1-4-b180", "gav-manometro-1-4-b180", "GAV Manometro 1/4\"", "B180", "Manometro GAV de 1/4\". Modelo B180.", "Manometro 1/4\".", "Manometros")

# RACCORD CONICOS
for dim, modelo, tipo in [
    ("4mm x 1/8\"", "RRG33/7-4", "Recto"),
    ("6mm x 1/8\"", "RRG33/7-6", "Recto"),
    ("6mm x 1/8\"", "RRG33/7-6B", "90°"),
    ("8mm x 1/4\"", "RRG33/7-8", "Recto"),
    ("8mm x 1/8\"", "RRG33/7-8B", "Recto"),
    ("8mm x 1/4\"", "RRG33/7-8C", "90°"),
]:
    tipo_slug = "recto" if tipo == "Recto" else "90"
    dim_clean = dim.replace('"', '').replace('mm', '').replace(' ', '').replace('x', '-').replace('/', '-')
    slug = f"gav-raccord-{dim_clean}-{tipo_slug}-{modelo.lower().replace('/', '-')}"
    add(f"gav-racc-{modelo.lower().replace('/', '-')}", slug, f"GAV Racord Conico {dim} {tipo}", modelo, f"Racord conico GAV {dim} {tipo}. Modelo {modelo}.", f"Racord conico {dim} {tipo}.", "Raccords Conicos")

# PISTOLAS
for desc, modelo in [
    ("Pistola para soplar pico Largo", "60AP15"),
    ("Pistola de Aire", "60A/3"),
    ("Pistola de Pintar", "PGDA 19361"),
    ("Pistola de Succión", "REGDA 5179"),
    ("Pistola de Gravedad", "REGDA95154"),
]:
    slug = "gav-pistola-" + desc.lower().replace(' ', '-') + "-" + modelo.lower().replace(' ', '-').replace('/', '-')
    add(f"gav-pist-{modelo.lower().replace(' ', '-').replace('/', '-')}", slug, f"GAV {desc} Profesional", modelo, f"{desc} GAV profesional. Modelo {modelo}.", f"{desc} profesional.", "Pistolas")

# KITS DE RECAMBIO PARA PISTOLAS
for dim, modelo in [
    ("1.2mm", "Para Soplado"),
    ("1.4mm", "Para Soplado"),
    ("2.0mm", "Para Soplado"),
    ("2.2mm", "Para Pintar"),
    ("2.4mm", "Para Pintar"),
]:
    tipo = "soplado" if "Soplado" in modelo else "pintar"
    slug = f"gav-kit-recambio-{dim.replace('.', '-')}mm-{tipo}"
    add(f"gav-kitrec-{dim.replace('.', '')}-{tipo}", slug, f"GAV Kit de Recambio para Pistola {dim} {modelo}", modelo, f"Kit de recambio GAV para pistola de {tipo}. {dim}.", f"Kit recambio pistola {tipo} {dim}.", "Kits Recambio Pistolas")

# ADHESIVO TIPO LOCTITE
add("gav-adhesivo-50ml", "gav-adhesivo-tipo-loctite-50ml", "GAV Adhesivo Tipo Loctite 50ml", "50 ml", "Adhesivo tipo Loctite GAV de 50ml.", "Adhesivo tipo Loctite 50ml.", "Adhesivos")

# KIT PPS
for tam, modelo in [("180 ml", "QPS-01"), ("400 ml", "QPS-02"), ("600 ml", "QPS-03")]:
    slug = f"gav-kitpps-{tam.replace(' ', '-').lower()}-{modelo.lower()}"
    add(f"gav-kitpps-{modelo.lower()}", slug, f"GAV KIT PPS {tam}", modelo, f"Kit PPS GAV de {tam}. Modelo {modelo}.", f"Kit PPS {tam}.", "Kits PPS")

# CONEXION PPS
add("gav-connpps-1-2", "gav-conexion-pps-1-2", "GAV Conexion PPS 1/2\"", "QPS-04", "Conexion PPS GAV de 1/2\". Modelo QPS-04.", "Conexion PPS 1/2\".", "Kits PPS")

with open(FILEPATH, "r", encoding="utf-8") as f:
    content = f.read()

# Find insert point (before productCategories)
marker = "export const productCategories"
cat_idx = content.find(marker)
insert = content.rfind("\n];", 0, cat_idx) + 1

new = "\n  // --- GAV ACCESORIOS COMPRESORES ---\n" + "\n".join(lines) + "\n"
content = content[:insert] + new + content[insert:]

# Add subcategories
new_subs = ["Lubricadores", "Filtros", "Reguladores", "Aceites", "Reducciones",
            "Bushing Reducidos", "Acoples Rapidos", "Boquillas Inflador",
            "Accesorios Varios", "Conectores Rapidos", "Espigas y Conectores",
            "Repuestos", "Llaves", "Valvulas Drenaje", "Tubos y Mangueras",
            "Manometros", "Raccords Conicos", "Pistolas", "Kits Recambio Pistolas",
            "Adhesivos", "Kits PPS"]
existing_subs = content.split("export const productSubcategories")[1].split("];")[0]
for sub in new_subs:
    if f'"{sub}"' not in existing_subs:
        content = content.replace('  "Accesorios Valvulas",\n];', f'  "Accesorios Valvulas",\n  "{sub}",\n];')
        existing_subs += f'"{sub}",'

# Add "Accesorios Compresores" category
if '"Accesorios Compresores"' not in content.split("export const productCategories")[1].split("];")[0]:
    content = content.replace('  "Valvulas",\n', '  "Valvulas",\n  "Accesorios Compresores",\n')

with open(FILEPATH, "w", encoding="utf-8") as f:
    f.write(content)

print(f"Added {len(lines)} GAV accessories")
