FILEPATH = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts"

products = []

def esc(s):
    return s.replace('"', '\\"')

# VALVULA DE SEGURIDAD
for pot, modelo in [("1/4\"", "22"), ("3/8\"", "31"), ("1/2\"", "390")]:
    slug_pot = pot.replace('"', "").replace("/", "-")
    products.append(
        f'  {{ id: "gav-vs-{slug_pot}-{modelo}", slug: "gav-valvula-seguridad-{slug_pot}-{modelo}", '
        f'name: "{esc("GAV Valvula de Seguridad " + pot + " Modelo " + modelo)}", brand: "GAV", model: "{modelo}", '
        f'description: "{esc("Valvula de seguridad GAV de bronce italiano. Potencia " + pot + ". Modelo " + modelo + ".")}", '
        f'shortDescription: "{esc("Valvula de seguridad GAV " + pot + ".")}", '
        f'category: "Valvulas", subcategory: "Valvulas de Seguridad", image: "" }},'
    )

# VALVULA CHECK 0° PARA COMPRESOR (H X M)
for pot, modelo in [
    ("3/8\" H X 3/8\" M", "102"),
    ("1/2\" H X 3/8\" M", "105"),
    ("1/2\" H X 1/2\" M", "114"),
    ("3/4\" H X 1/2\" M", "118"),
    ("3/4\" H X 3/4\" M", "120"),
    ("1\" H X 1\" M", "123"),
]:
    slug_pot = pot.replace('"', "").replace(" ", "-").replace("X", "x").lower()
    products.append(
        f'  {{ id: "gav-vc-0hm-{modelo}", slug: "gav-valvula-check-0-{slug_pot}-{modelo}", '
        f'name: "{esc("GAV Valvula Check 0° " + pot + " Modelo " + modelo)}", brand: "GAV", model: "{modelo}", '
        f'description: "{esc("Valvula check GAV 0° para compresor, hembra x macho. " + pot + ". Modelo " + modelo + ". Bronce italiano.")}", '
        f'shortDescription: "{esc("Valvula Check 0° " + pot + ".")}", '
        f'category: "Valvulas", subcategory: "Valvulas Check", image: "" }},'
    )

# VALVULA CHECK NILLO DE CO (H X M)
for pot, modelo in [
    ("3/8\" H X 3/8\" M", "103"),
    ("1/2\" H X 3/8\" M", "106"),
    ("1/2\" H X 1/2\" M", "129"),
    ("3/4\" H X 1/2\" M", "139"),
]:
    slug_pot = pot.replace('"', "").replace(" ", "-").replace("X", "x").lower()
    products.append(
        f'  {{ id: "gav-vc-nc-hm-{modelo}", slug: "gav-valvula-check-nillo-co-{slug_pot}-{modelo}", '
        f'name: "{esc("GAV Valvula Check Nillo de Co " + pot + " Modelo " + modelo)}", brand: "GAV", model: "{modelo}", '
        f'description: "{esc("Valvula check GAV nillo de co, hembra x macho. " + pot + ". Modelo " + modelo + ". Bronce italiano.")}", '
        f'shortDescription: "{esc("Valvula Check Nillo de Co " + pot + ".")}", '
        f'category: "Valvulas", subcategory: "Valvulas Check", image: "" }},'
    )

# VALVULA CHECK 0° PARA COMPRESOR (M X M)
for pot, modelo in [
    ("3/8\" M X 3/8\" M", "132"),
    ("1/2\" M X 3/8\" M", "108"),
    ("1/2\" M X 1/2\" M", "113"),
    ("3/4\" M X 1/2\" M", "117"),
    ("3/4\" M X 3/4\" M", "179"),
    ("1\" M X 3/4\" M", "121"),
]:
    slug_pot = pot.replace('"', "").replace(" ", "-").replace("X", "x").lower()
    products.append(
        f'  {{ id: "gav-vc-0mm-{modelo}", slug: "gav-valvula-check-0-{slug_pot}-{modelo}", '
        f'name: "{esc("GAV Valvula Check 0° " + pot + " Modelo " + modelo)}", brand: "GAV", model: "{modelo}", '
        f'description: "{esc("Valvula check GAV 0° para compresor, macho x macho. " + pot + ". Modelo " + modelo + ". Bronce italiano.")}", '
        f'shortDescription: "{esc("Valvula Check 0° " + pot + ".")}", '
        f'category: "Valvulas", subcategory: "Valvulas Check", image: "" }},'
    )

# VALVULA CHECK NILLO DE CO (M X M)
for pot, modelo in [
    ("3/8\" M X 3/8\" M", "138"),
    ("1/2\" M X 3/8\" M", "125"),
    ("1/2\" M X 1/2\" M", "127"),
    ("3/4\" M X 3/4\" M", "181"),
    ("1\" M X 3/4\" M", "137"),
]:
    slug_pot = pot.replace('"', "").replace(" ", "-").replace("X", "x").lower()
    products.append(
        f'  {{ id: "gav-vc-nc-mm-{modelo}", slug: "gav-valvula-check-nillo-co-{slug_pot}-{modelo}", '
        f'name: "{esc("GAV Valvula Check Nillo de Co " + pot + " Modelo " + modelo)}", brand: "GAV", model: "{modelo}", '
        f'description: "{esc("Valvula check GAV nillo de co, macho x macho. " + pot + ". Modelo " + modelo + ". Bronce italiano.")}", '
        f'shortDescription: "{esc("Valvula Check Nillo de Co " + pot + ".")}", '
        f'category: "Valvulas", subcategory: "Valvulas Check", image: "" }},'
    )

# ANILLO DE COMPRESION
for dim, modelo in [("10", "910"), ("14", "914"), ("18", "918")]:
    products.append(
        f'  {{ id: "gav-ac-{dim}-{modelo}", slug: "gav-anillo-compresion-{dim}-{modelo}", '
        f'name: "GAV Anillo de Compresion {dim}mm Modelo {modelo}", brand: "GAV", model: "{modelo}", '
        f'description: "Anillo de compresion GAV de {dim}mm. Modelo {modelo}. Bronce italiano.", '
        f'shortDescription: "Anillo de compresion GAV {dim}mm.", '
        f'category: "Valvulas", subcategory: "Accesorios Valvulas", image: "" }},'
    )

# COPA
for dim, modelo in [("10", "410"), ("14", "414"), ("22", "422")]:
    products.append(
        f'  {{ id: "gav-copa-{dim}-{modelo}", slug: "gav-copa-{dim}-{modelo}", '
        f'name: "GAV Copa {dim}mm Modelo {modelo}", brand: "GAV", model: "{modelo}", '
        f'description: "Copa GAV de {dim}mm. Modelo {modelo}. Bronce italiano.", '
        f'shortDescription: "Copa GAV {dim}mm.", '
        f'category: "Valvulas", subcategory: "Accesorios Valvulas", image: "" }},'
    )

with open(FILEPATH, "r", encoding="utf-8") as f:
    content = f.read()

marker2 = "export const productCategories"
cat_idx = content.find(marker2)
insert = content.rfind("\n];", 0, cat_idx) + 1

new = "\n  // --- GAV VALVULAS DE BRONCE ITALIANAS ---\n" + "\n".join(products) + "\n"
content = content[:insert] + new + content[insert:]

# Add subcategories if not present
for sub in ["Valvulas de Seguridad", "Valvulas Check", "Accesorios Valvulas"]:
    if f'"{sub}"' not in content.split("export const productSubcategories")[1].split("];")[0]:
        content = content.replace('  "Secadores",\n];', f'  "Secadores",\n  "{sub}",\n];')

# Add "Valvulas" category if not present
if '"Valvulas"' not in content.split("export const productCategories")[1].split("];")[0]:
    content = content.replace('  "Secadores",\n', '  "Secadores",\n  "Valvulas",\n')

with open(FILEPATH, "w", encoding="utf-8") as f:
    f.write(content)

print(f"Added {len(products)} GAV products")
