import re

FILEPATH = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts"

# Only products with a REAL matching image
IMAGE_MAP = {
    "ea-anp": "juego-de-anillos.jpg",
    "ea-fl-lengua": "flappers-tipo-lengua.jpg",
    "ea-fl-lana": "flappers-tipo-laina.jpg",
    "ea-asp-pl": "aspa-para-compresor-plastico.jpg",
    "ea-asp-ac": "aspa-para-compresor-plastico.jpg",
    "ea-asp-u": "aspa-universal.jpg",
    "ea-est": "estopera.jpg",
    "ea-conch": "juego-de-cochas.jpg",
    "ea-cig": "ciguenal.jpg",
    "ea-vchq": "valvula-cheq.jpg",
    "ea-vseg": "valvula-de-seguridad.jpg",
    "ea-vdren": "valvula-de-drenaje.jpg",
    "ea-fil-38": "filtro-aspiracion-rosca.jpg",
    "ea-fil-12": "filtro-aspiracion-rosca.jpg",
    "ea-fil-34": "filtro-aspiracion-rosca.jpg",
    "ea-fil-10hp": "filtro-aspiracion-rosca-10hp.jpg",
    "ea-fil-auto": "filtro-aspiracion-atornillar.jpg",
    "ea-flin": "filtro-en-linea.jpg",
    "ea-resp": "respiradero-amarillo.jpg",
    "ea-vis": "visor-aceite.jpg",
    "ea-cap": "capacitor.jpg",
    "ea-arr": "arrancador.jpg",
    "ea-rued": "ruedas.jpg",
    "ea-pres-nema-4v": "presostato-4-vias.jpg",
    "ea-pres-nema-1v": "presostato-1-via.jpg",
    "ea-pres-bal": "presostato-frente.jpg",
    "ea-pres-trif": "presostato-palanca.jpg",
    "ea-pres-bomb": "presostato-bomba.jpg",
    "ea-tpres": "presostato-palanca.jpg",
    "ea-red": "reductor-de-presion.jpg",
    "ea-desv": "desvio-manifold.jpg",
    "ea-man-25-rad": "manometro-lateral.jpg",
    "ea-man-2-post": "manometro-posterior.jpg",
    "ea-man-1-post": "manometro-posterior-peq.jpg",
    "ea-conex": "codo-comp.jpg",
    "ea-llp": "codo-comp.jpg",
    "ea-tub": "codo-comp.jpg",
    "ea-acop-hemb": "acople-rapido-hembra.jpg",
    "ea-acop-mach": "acople-rapido-macho.jpg",
    "ea-kit-pist": "kit-de-pistolas.jpg",
    "ea-mang": "manguera-flexible.jpg",
}

# Products WITHOUT real images - set to empty
NO_IMAGE = [
    "ea-plv",   # Plato valvulas
    "ea-bie",   # Bielas
    "ea-valadm", # Valvulas admision
    "ea-emp",   # Empacaduras
    "ea-guarda", # Guarda resorte
    "ea-reg",   # Reguladores
    "ea-lub",   # Lubricadores
    "ea-minlub", # Mini lubricador
    "ea-pist-coax", # Piston coaxial
    "ea-pist-inf",  # Pistola inflar
    "ea-pist-sop",  # Pistola soplar
    "ea-pist-lav",  # Pistola lavar
    "ea-pist-suc",  # Pistola suction
]

with open(FILEPATH, "r", encoding="utf-8") as f:
    lines = f.readlines()

updated = 0
cleared = 0

for i, line in enumerate(lines):
    if 'id: "ea-' not in line:
        continue

    id_match = re.search(r'id: "(ea-[^"]+)"', line)
    if not id_match:
        continue
    pid = id_match.group(1)

    # Check if should be cleared
    should_clear = any(pid.startswith(p) for p in NO_IMAGE)

    # Find image
    img_file = None
    if not should_clear:
        for prefix, fname in IMAGE_MAP.items():
            if pid.startswith(prefix):
                img_file = fname
                break

    if img_file:
        old = 'image: ""'
        new = f'image: "{img_file}"'
        if old in line:
            lines[i] = line.replace(old, new, 1)
            updated += 1
    elif should_clear:
        # Ensure image is empty
        if 'image: "' in line and 'image: ""' not in line:
            lines[i] = re.sub(r'image: "[^"]*"', 'image: ""', line)
            cleared += 1

with open(FILEPATH, "w", encoding="utf-8") as f:
    f.writelines(lines)

print(f"Updated: {updated}, Cleared: {cleared}")
