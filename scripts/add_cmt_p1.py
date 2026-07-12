FILEPATH = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts"

def esc(s):
    return s.replace('"', '\\"')

lines = []

def add(cmt_id, slug, name, modelo, desc, short, cat, sub):
    lines.append(
        f'  {{ id: "{cmt_id}", slug: "{slug}", name: "{esc(name)}", brand: "CMT", model: "{esc(modelo)}", '
        f'description: "{esc(desc)}", shortDescription: "{esc(short)}", '
        f'category: "{cat}", subcategory: "{sub}", image: "" }},'
    )

# =============================================
# DISCOS - LINEA INDUSTRIAL
# =============================================

# SERIE 278, 286, 290 Y 293 (Sierras Circulares de Diente Alterno con Limitador)
for d, c, e, h, z, cod in [
    ("200", "1.8", "2.8", "30", "Z24", "280.200.3M"),
    ("250", "1.8", "2.8", "30", "Z24", "290.250.2M"),
    ("250", "2.2", "3.2", "30", "Z24", "286.000.12M"),
    ("300", "2.2", "3.2", "30", "Z22", "293.024.12M"),
    ("300", "2.2", "3.2", "30", "Z28", "293.028.12M"),
    ("350", "2.5", "3.5", "30", "Z28", "293.028.15M"),
    ("350", "2.5", "3.5", "30", "Z36", "278.036.15M"),
    ("400", "3", "3.2", "30", "Z28", "286.028.16M"),
]:
    slug = f"cmt-serie-278-{d}mm-{z.lower()}-{cod.lower()}"
    add(f"cmt-278-{d}-{z.lower()}", slug, f"CMT Sierra Circular Serie 278 {d}mm {z} {cod}", cod,
        f"Sierra circular CMT serie 278 de diente alterno con limitador. Diametro {d}mm. Cuerpo {c}mm. Espesor {e}mm. Hueco {h}mm. {z} dientes. Codigo {cod}.",
        f"Sierra CMT 278 {d}mm {z}.", "Discos", "Sierras Circulares Industriales")

# SERIE 285 (Sierras Circulares de Diente Alterno)
for d, c, e, h, z, cod in [
    ("150", "2.2", "3.2", "30", "Z48", "285.048.06M"),
    ("180", "2.2", "3.2", "30", "Z48", "285.048.07M"),
    ("200", "2.2", "3.2", "30", "Z36", "285.036.08M"),
    ("200", "2.2", "3.2", "30", "Z48", "285.048.08M"),
    ("200", "2.2", "3.2", "30", "Z60", "285.060.08M"),
    ("250", "2.2", "3.2", "30", "Z36", "285.036.10M"),
    ("250", "2.2", "3.2", "30", "Z48", "285.048.10M"),
    ("250", "2.2", "3.2", "30", "Z60", "285.060.10M"),
    ("250", "2.2", "3.2", "30", "Z72", "285.072.10M"),
    ("300", "2.2", "3.2", "30", "Z36", "285.036.12M"),
    ("300", "2.2", "3.2", "30", "Z48", "285.048.12M"),
    ("300", "2.2", "3.2", "30", "Z60", "285.060.12M"),
    ("300", "2.2", "3.2", "30", "Z72", "285.072.12M"),
    ("350", "2.5", "3.5", "30", "Z48", "285.048.14M"),
    ("350", "2.5", "3.5", "30", "Z72", "285.072.14M"),
    ("350", "2.5", "3.5", "30", "Z84", "285.084.14M"),
    ("400", "2.5", "3.5", "30", "Z48", "285.048.16M"),
    ("400", "2.5", "3.5", "30", "Z60", "285.060.16M"),
    ("400", "2.5", "3.5", "30", "Z72", "285.072.16M"),
    ("400", "2.5", "3.5", "30", "Z120", "285.120.16M"),
    ("450", "2.8", "3.8", "30", "Z36", "285.036.18M"),
    ("450", "2.8", "3.8", "30", "Z48", "285.048.18M"),
    ("450", "2.8", "3.8", "30", "Z60", "285.060.18M"),
    ("500", "2.8", "3.8", "30", "Z48", "285.048.20M"),
    ("500", "2.8", "3.8", "30", "Z60", "285.060.20M"),
    ("550", "3.2", "4.2", "30", "Z40", "285.040.22M"),
    ("600", "3.2", "4.2", "30", "Z48", "285.048.24M"),
]:
    slug = f"cmt-serie-285-{d}mm-{z.lower()}-{cod.lower()}"
    add(f"cmt-285-{d}-{z.lower()}", slug, f"CMT Sierra Circular Serie 285 {d}mm {z} {cod}", cod,
        f"Sierra circular CMT serie 285 de diente alterno. Diametro {d}mm. Cuerpo {c}mm. Espesor {e}mm. Hueco {h}mm. {z} dientes. Codigo {cod}.",
        f"Sierra CMT 285 {d}mm {z}.", "Discos", "Sierras Circulares Industriales")

# SERIE 279 (Discos de Multiple)
for d, c, e, h, z, cod in [
    ("250", "2.2", "3.2", "30", "Z12+4", "279.012.10M"),
    ("300", "2.2", "3.2", "70", "Z24+4", "279.024.12M"),
    ("400", "2.8", "4", "30", "Z28+6", "279.028.16M"),
]:
    slug = f"cmt-serie-279-{d}mm-{z.lower().replace('+', '-')}"
    add(f"cmt-279-{d}", slug, f"CMT Disco Multiple Serie 279 {d}mm {z} {cod}", cod,
        f"Disco multiple CMT serie 279. Diametro {d}mm. Cuerpo {c}mm. Espesor {e}mm. Hueco {h}mm. {z} dientes. Codigo {cod}.",
        f"Disco multiple CMT 279 {d}mm {z}.", "Discos", "Discos Multiple")

# SERIE 285 Melamina
for d, c, e, h, z, cod in [
    ("250", "2.2", "3.2", "30", "78", "285.078.10M"),
    ("300", "2.2", "3.2", "30", "Z86", "286.086.12M"),
]:
    slug = f"cmt-serie-285-mel-{d}mm-{cod.lower()}"
    add(f"cmt-285-mel-{d}", slug, f"CMT Sierra Circular Melamina Serie 285 {d}mm {cod}", cod,
        f"Sierra circular CMT serie 285 para melamina y laminados. Diametro {d}mm. Cuerpo {c}mm. Espesor {e}mm. Hueco {h}mm. {z} dientes. Codigo {cod}.",
        f"Sierra CMT melamina 285 {d}mm.", "Discos", "Sierras Circulares Melamina")

# SERIE 285 Marqueteria
for d, c, e, h, z, cod in [
    ("300", "2.5", "3", "30", "Z96", "285.096.12M"),
]:
    slug = f"cmt-serie-285-marq-{d}mm-{cod.lower()}"
    add(f"cmt-285-marq-{d}", slug, f"CMT Sierra Circular Marqueteria Serie 285 {d}mm {cod}", cod,
        f"Sierra circular CMT serie 285 para marqueteria. Diametro {d}mm. Cuerpo {c}mm. Espesor {e}mm. Hueco {h}mm. {z} dientes. Codigo {cod}.",
        f"Sierra CMT marqueteria 285 {d}mm.", "Discos", "Sierras Circulares Marqueteria")

# SERIE 287 (Diente Concavo)
for d, c, e, h, z, cod in [
    ("220", "2.2", "3.2", "30", "Z42", "287.042.09M"),
    ("250", "2.2", "3.2", "30", "Z48", "287.048.10M"),
    ("300", "2.2", "3.2", "30", "Z84", "287.084.12M"),
]:
    slug = f"cmt-serie-287-{d}mm-{z.lower()}"
    add(f"cmt-287-{d}", slug, f"CMT Sierra Circular Diente Concavo Serie 287 {d}mm {z} {cod}", cod,
        f"Sierra circular CMT serie 287 de diente concavo. Diametro {d}mm. Cuerpo {c}mm. Espesor {e}mm. Hueco {h}mm. {z} dientes. Codigo {cod}.",
        f"Sierra CMT concavo 287 {d}mm {z}.", "Discos", "Sierras Circulares Concavo")

# SERIE 283 (Especial Melamina)
for d, c, e, h, z, cod in [
    ("220", "2.2", "3.2", "30", "Z64", "283.064.09M"),
    ("250", "2.2", "3.2", "30", "Z72", "283.072.10M"),
    ("250", "2.2", "3.2", "30", "Z96", "283.096.10M"),
    ("300", "2.2", "3.2", "30", "Z96", "283.096.12M"),
    ("350", "2.5", "3.5", "30", "Z80", "283.080.14M"),
    ("350", "2.5", "3.5", "30", "Z108", "283.108.14M"),
]:
    slug = f"cmt-serie-283-{d}mm-{z.lower()}"
    add(f"cmt-283-{d}-{z.lower()}", slug, f"CMT Sierra Especial Melamina Serie 283 {d}mm {z} {cod}", cod,
        f"Sierra circular CMT serie 283 especial para melamina. Diametro {d}mm. Cuerpo {c}mm. Espesor {e}mm. Hueco {h}mm. {z} dientes. Codigo {cod}.",
        f"Sierra CMT melamina especial 283 {d}mm {z}.", "Discos", "Sierras Circulares Melamina")

# SERIE 281 (Trapezoidal Positivo)
for d, c, e, h, z, cod in [
    ("200", "2.2", "3.2", "30", "Z64", "281.064.08M"),
    ("220", "2.2", "3.2", "30", "Z64", "281.064.09M"),
    ("250", "2.2", "3.2", "30", "Z60", "281.060.10M"),
    ("250", "2.2", "3.2", "30", "Z72", "281.072.10M"),
    ("300", "2.2", "3.2", "30", "Z72", "281.072.12M"),
    ("300", "2.5", "3", "32", "Z96", "281.096.12M"),
    ("350", "2.5", "3.5", "32", "Z108", "281.108.14M"),
]:
    slug = f"cmt-serie-281-{d}mm-{z.lower()}"
    add(f"cmt-281-{d}-{z.lower()}", slug, f"CMT Sierra Trapezoidal Positivo Serie 281 {d}mm {z} {cod}", cod,
        f"Sierra circular CMT serie 281 trapezoidal positivo. Diametro {d}mm. Cuerpo {c}mm. Espesor {e}mm. Hueco {h}mm. {z} dientes. Codigo {cod}.",
        f"Sierra CMT trapezoidal 281 {d}mm {z}.", "Discos", "Sierras Circulares Trapezoidal")

# SERIE 281 Cromo
for d, c, e, h, z, cod in [
    ("250", "2.2", "3.2", "32", "Z80", "281.168.10R"),
    ("300", "2.2", "3.2", "32", "Z96", "281.169.12R"),
]:
    slug = f"cmt-serie-281-cromo-{d}mm-{z.lower()}"
    add(f"cmt-281-cromo-{d}", slug, f"CMT Sierra Trapezoidal Positivo Cromo Serie 281 {d}mm {z} {cod}", cod,
        f"Sierra circular CMT serie 281 trapezoidal positivo revestimiento cromo. Diametro {d}mm. Cuerpo {c}mm. Espesor {e}mm. Hueco {h}mm. {z} dientes. Codigo {cod}.",
        f"Sierra CMT trapezoidal cromo 281 {d}mm {z}.", "Discos", "Sierras Circulares Trapezoidal Cromo")

# SERIE 237 (Dientes en Diamante)
for d, c, e, h, z, cod in [
    ("250", "2.2", "3.2", "30", "Z48", "237.048.10M"),
    ("300", "2.2", "3.2", "30", "Z48", "237.048.12M"),
]:
    slug = f"cmt-serie-237-{d}mm"
    add(f"cmt-237-{d}", slug, f"CMT Sierra Dientes Diamante Serie 237 {d}mm {cod}", cod,
        f"Sierra circular CMT serie 237 trapezoidal positivo con dientes en diamante. Diametro {d}mm. Cuerpo {c}mm. Espesor {e}mm. Hueco {h}mm. {z} dientes. Codigo {cod}.",
        f"Sierra CMT diamante 237 {d}mm.", "Discos", "Sierras Circulares Diamante")

# SERIE 238 (Precorte Conico Diamante)
for d, c, e, h, z, cod in [
    ("120", "2.2", "", "20", "Z10", "238.010.05M"),
]:
    slug = f"cmt-serie-238-{d}mm"
    add(f"cmt-238-{d}", slug, f"CMT Sierra Precorte Conico Diamante Serie 238 {d}mm {cod}", cod,
        f"Sierra circular CMT serie 238 precorte conico con dientes en diamante. Diametro {d}mm. Cuerpo {c}mm. Hueco {h}mm. {z} dientes. Codigo {cod}.",
        f"Sierra CMT precorte diamante 238 {d}mm.", "Discos", "Sierras Circulares Precorte Diamante")

# SERIE 235 (Diamante Multimaterial)
for d, c, e, h, z, cod in [
    ("250", "2.2", "3.2", "30", "Z36", "235.250.36M"),
    ("300", "2.2", "3.2", "30", "Z36", "235.300.36M"),
]:
    slug = f"cmt-serie-235-{d}mm"
    add(f"cmt-235-{d}", slug, f"CMT Sierra Diamante Multimaterial Serie 235 {d}mm {cod}", cod,
        f"Sierra circular CMT serie 235 con dientes en diamante multimaterial. Diametro {d}mm. Cuerpo {c}mm. Espesor {e}mm. Hueco {h}mm. {z} dientes. Codigo {cod}.",
        f"Sierra CMT diamante multimaterial 235 {d}mm.", "Discos", "Sierras Circulares Diamante")

# SERIE 289 (Precorte Conico Ajustable)
for d, c, e, h, z, cod in [
    ("70", "2.5", "2.9-3.6", "20", "Z14", "289.280.03H"),
    ("90", "2.5", "2.9-3.6", "20", "Z10+10", "289.280.03H"),
]:
    slug = f"cmt-serie-289-{d}mm"
    add(f"cmt-289-{d}", slug, f"CMT Sierra Precorte Conico Ajustable Serie 289 {d}mm {cod}", cod,
        f"Sierra circular CMT serie 289 precorte conico ajustable. Diametro {d}mm. Cuerpo {c}mm. Hueco {h}mm. {z} dientes. Codigo {cod}.",
        f"Sierra CMT precorte ajustable 289 {d}mm.", "Discos", "Sierras Circulares Precorte")

# SERIE 288 (Diente Conico Flujo)
for d, c, e, h, z, cod in [
    ("100", "3", "3.1", "20", "Z24", "288.100.04H"),
    ("120", "3", "3.1-4", "20", "Z24", "288.120.04H"),
    ("125", "3", "3.1", "20", "Z24", "288.125.04H"),
    ("140", "3", "3.1-4", "20", "Z30", "288.130.05H"),
    ("160", "3", "3.1-4.5", "20", "Z24", "288.140.06H"),
]:
    slug = f"cmt-serie-288-{d}mm"
    add(f"cmt-288-{d}", slug, f"CMT Sierra Diente Conico Flujo Serie 288 {d}mm {cod}", cod,
        f"Sierra circular CMT serie 288 de diente conico flujo. Diametro {d}mm. Cuerpo {c}mm. Hueco {h}mm. {z} dientes. Codigo {cod}.",
        f"Sierra CMT conico flujo 288 {d}mm.", "Discos", "Sierras Circulares Conico Flujo")

# SERIE 282 (Seccionadoras)
for d, c, e, h, z, cod in [
    ("300", "3.2", "4.4", "65", "Z72", "282.300.07J"),
    ("320", "3.2", "4.4", "75", "Z72", "282.320.07X"),
]:
    slug = f"cmt-serie-282-{d}mm"
    add(f"cmt-282-{d}", slug, f"CMT Sierra Trapezoidal Seccionadora Serie 282 {d}mm {cod}", cod,
        f"Sierra circular CMT serie 282 trapezoidal para seccionadoras. Diametro {d}mm. Cuerpo {c}mm. Espesor {e}mm. Hueco {h}mm. {z} dientes. Codigo {cod}.",
        f"Sierra CMT seccionadora 282 {d}mm.", "Discos", "Sierras Circulares Seccionadora")

# SERIE 226 (HM para Metales)
for d, c, e, h, z, cod in [
    ("7-1/4", "1.6", "2", '5/8"', "Z48", "226.184.24E"),
    ("305", "2.2", "2.2", "30", "Z80", "226.080.12M"),
    ("350", "2.2", "2.2", "30", "Z80", "226.080.14M"),
    ("300", "2.2", "2.2", "30", "Z80", "226.080.12M"),
]:
    slug = f"cmt-serie-226-{d.replace('/', '-').replace(chr(34), '')}mm"
    add(f"cmt-226-{d.replace('/', '-').replace(chr(34), '')}", slug, f"CMT Sierra HM Metales Serie 226 {d} {cod}", cod,
        f"Sierra circular CMT serie 226 HM para metales. Diametro {d}. Cuerpo {c}mm. Espesor {e}mm. Hueco {h}. {z} dientes. Codigo {cod}.",
        f"Sierra CMT HM metales 226 {d}.", "Discos", "Sierras Circulares HM Metales")

# SERIE 290 (Portatiles)
for d, c, e, h, z, cod in [
    ("164", "1.8", "2.8", "16", "Z40", "290.164.24E"),
    ("180", "1.8", "2.8", "16", "Z40", "290.164.CCH"),
    ("184", "1.8", "2.6", "16", "Z40", "290.164.KE"),
    ("184", "1.8", "2.6", "16", "Z48", "290.190.64M"),
    ("190", "1.8", "2.6", "30", "Z64", "290.190.64M"),
    ("210", "1.8", "2.6", "30", "Z80", "290.210.80M"),
    ("210", "1.8", "2.8", "30", "Z48", "290.210.48M"),
    ("210", "1.8", "2.8", "30", "Z64", "290.210.64M"),
    ("235", "1.8", "2.8", "30", "Z48", "290.235.48M"),
    ("235", "1.8", "2.8", "30", "Z64", "290.235.64M"),
]:
    slug = f"cmt-serie-290-{d.replace('/', '-')}mm-{cod.lower()}"
    add(f"cmt-290-{d.replace('/', '-').replace(chr(34), '')}-{cod.lower()}", slug, f"CMT Sierra Circular Portatil Serie 290 {d} {cod}", cod,
        f"Sierra circular CMT serie 290 industrial para maquinas portatiles. Diametro {d}. Cuerpo {c}mm. Espesor {e}mm. Hueco {h}. {z} dientes. Codigo {cod}.",
        f"Sierra CMT portatil 290 {d}.", "Discos", "Sierras Circulares Portatiles")

# SERIE 297 (No Ferrosos)
for d, c, e, h, z, cod in [
    ("250", "2.5", "3.2", "32", "Z80", "297.080.10F"),
    ("300", "2.5", "3.2", "32", "Z96", "297.096.12F"),
    ("350", "2.5", "3.2", "32", "Z96", "297.096.14F"),
    ("400", "3.2", "3.8", "32", "Z108", "297.108.16P"),
    ("450", "3.2", "3.8", "32", "Z120", "297.120.18P"),
    ("500", "3.2", "3.8", "32", "", "297.120.20P"),
]:
    slug = f"cmt-serie-297-{d}mm-{cod.lower()}"
    add(f"cmt-297-{d}", slug, f"CMT Sierra Trapezoidal No Ferrosos Serie 297 {d}mm {cod}", cod,
        f"Sierra circular CMT serie 297 trapezoidal negro recubrimiento para no ferrosos. Diametro {d}mm. Cuerpo {c}mm. Espesor {e}mm. Hueco {h}mm. {z} dientes. Codigo {cod}.",
        f"Sierra CMT no ferrosos 297 {d}mm.", "Discos", "Sierras Circulares No Ferrosos")

# SERIE 284 (No Ferrosos y Plasticos)
for d, c, e, h, z, cod in [
    ("420", "3.2", "3.8", "32", "Z96", "284.096.17P"),
]:
    slug = f"cmt-serie-284-{d}mm"
    add(f"cmt-284-{d}", slug, f"CMT Sierra No Ferrosos Plasticos Serie 284 {d}mm {cod}", cod,
        f"Sierra circular CMT serie 284 para materiales no ferrosos y plasticos. Diametro {d}mm. Cuerpo {c}mm. Espesor {e}mm. Hueco {h}mm. {z} dientes. Codigo {cod}.",
        f"Sierra CMT no ferrosos plasticos 284 {d}mm.", "Discos", "Sierras Circulares No Ferrosos")

# =============================================
# DISCOS - LINEA SEMI-INDUSTRIAL
# =============================================

# SERIE P (Melamina y Laminados)
for d, c, e, h, z, cod in [
    ('5-1/2', "1.6", "1.6", '5/8"', "Z36", "P05204"),
    ('6-1/2', "1.6", "1.6", '5/8"', "Z60", "P06206"),
    ('7-1/4', "1.6", "2.21", '5/8"', "Z24", "P07024"),
    ('7-1/4', "1.6", "2.21", '5/8"', "Z40", "P07040"),
    ('7-1/4', "1.6", "1.6", '5/8"', "Z60", "P07024B"),
    ('8-1/4', "1.6", "2.21", '5/8"', "Z40", "P08024"),
    ('8-1/4', "1.6", "1.6", '5/8"', "Z60", "P08024B"),
    ('10"', "1.6", "2.38", '5/8"', "Z60", "P10060"),
    ('10"', "1.6", "2.38", '1"', "Z80", "P10080"),
    ('12"', "1.8", "2.59", '1"', "Z96", "P12096"),
]:
    d_slug = d.replace('"', '').replace('/', '-')
    slug = f"cmt-serie-p-{d_slug}-{cod.lower()}"
    add(f"cmt-p-{d_slug}-{cod.lower()}", slug, f"CMT Sierra Melamina Serie P {d} {cod}", cod,
        f"Sierra circular CMT serie P para melamina y laminados. Diametro {d}. Cuerpo {c}mm. Espesor {e}mm. Hueco {h}. {z} dientes. Codigo {cod}.",
        f"Sierra CMT melamina P {d}.", "Discos", "Sierras Circulares Melamina Semi-Industrial")

# SERIE PN (Metales No Ferrosos)
for d, e, h, z, cod in [
    ('7-1/4', "2.21", '5/8"', "Z56", "P07056K"),
    ('10"', "2.38", '5/8"', "Z80", "P10080N"),
    ('12"', "2.79", '1"', "Z96", "P12096N"),
]:
    d_slug = d.replace('"', '')
    slug = f"cmt-serie-pn-{d_slug}-{cod.lower()}"
    add(f"cmt-pn-{d_slug}-{cod.lower()}", slug, f"CMT Sierra No Ferrosos Serie PN {d} {cod}", cod,
        f"Sierra circular CMT serie PN para metales no ferrosos. Diametro {d}. Espesor {e}mm. Hueco {h}. {z} dientes. Codigo {cod}.",
        f"Sierra CMT no ferrosos PN {d}.", "Discos", "Sierras Circulares No Ferrosos Semi-Industrial")

# SERIE K (Madera y Derivados)
for d, l, e, h, z, cod in [
    ('4-7/8"', "1", "1.19", '5/8"', "Z36", "K04808"),
    ('6-1/2"', "1.19", "1.8", '5/8"', "Z36", "K06606"),
    ('7-1/4"', "1", "1.19", '5/8"', "Z24", "K07407"),
    ('7-1/4"', "1.19", "1.8", '5/8"', "Z40", "K07408"),
    ('8-1/4"', "1.19", "1.8", '5/8"', "Z40", "K08408"),
    ('8-1/4"', "1", "1.19", '5/8"', "Z40", "K08408B"),
    ('10"', "1.6", "2.38", '5/8"', "Z60", "K01010"),
    ('10"', "1.6", "2.38", '1"', "Z60", "K01010B"),
    ('10"', "1.6", "2.38", '1"', "Z80", "K01018"),
    ('12"', "1.8", "2.59", '1"', "Z40", "K04012"),
    ('12"', "1.8", "2.59", '1"', "Z60", "K06012"),
    ('12"', "1.8", "2.59", '1"', "Z80", "K08012"),
    ('12"', "1.8", "2.59", '1"', "Z24", "K02412"),
    ('14"', "2.21", "3.2", '1"', "Z60", "K06014"),
]:
    d_slug = d.replace('"', '')
    slug = f"cmt-serie-k-{d_slug}-{cod.lower()}"
    add(f"cmt-k-{d_slug}-{cod.lower()}", slug, f"CMT Sierra Madera Serie K {d} {cod}", cod,
        f"Sierra circular CMT serie K para madera y derivados. Diametro {d}. L.corte {l}mm. Espesor {e}mm. Hueco {h}. {z} dientes. Codigo {cod}.",
        f"Sierra CMT madera K {d}.", "Discos", "Sierras Circulares Madera Semi-Industrial")

# =============================================
# MECHAS - LINEA INDUSTRIAL
# =============================================

# SERIE 8000 CONTRACTOR
for d, lc, lm, z, e, cod in [
    ('1/8"', '3/4"', '1-1/2"', "2", '1/4"', "81001"),
    ('5/32"', '7/8"', '2"', "1", '1/4"', "81105"),
    ('1/4"', '1"', '2-1/4"', "2", '1/4"', "81209"),
    ('5/16"', '1"', '2-1/4"', "2", '1/4"', "81112"),
    ('3/8"', '1-1/16"', '2-1/2"', "2", '1/4"', "81303"),
    ('1/2"', '1-1/4"', '2-7/16"', "2", '1/4"', "81208"),
    ('5/8"', '1"', '2-3/16"', "2", '1/4"', "81125"),
    ('3/4"', '15/16"', '2-3/16"', "2", '1/4"', "81330"),
    ('1/2"', '1"', '2-3/8"', "2", '1/4"', "80604"),
    ('1/2"', '1"', '2-3/16"', "2", '1/4"', "80605"),
    ('5/8"', '1"', '2"', "2", '1/4"', "80101"),
    ('3/4"', '25/32"', '2"', "2", '1/4"', "80107"),
    ('3/4"', '1"', '2-11/16"', "2", '1/4"', "81210"),
    ('1/4"', '3/4"', '2-5/8"', "2+1", '1/4"', "81601"),
    ('1/4"', '1"', '2-1/8"', "2", '1/4"', "81018"),
    ('1/2"', '3/8"', '1-3/4"', "2", '1/4"', "83603"),
    ('3/8"', '3/8"', '2-1/16"', "2", '1/4"', "81809"),
    ('1/2"', '1"', '2-1/8"', "2", '1/4"', "81815"),
    ('3/8"', '7/16"', '1-7/8"', "1", '1/4"', "81120"),
    ('1-3/8"', '7/16"', '2-3/16"', "2", '1/4"', "83605"),
    ('1/4"', '3/8"', '1-9/16"', "2", '1/4"', "81410"),
    ('3/8"', '3/8"', '1-9/16"', "2", '1/4"', "81411"),
    ('5/16"', '7/16"', '1-11/16"', "2", '1/4"', "81220"),
    ('1/2"', '1/2"', '1-9/16"', "2", '1/4"', "81404"),
    ('3/4"', '1/2"', '1-13/16"', "2", '1/4"', "81408"),
    ('1/2"', '1/2"', '2-1/8"', "2", '1/4"', "83702"),
    ('1-1/4"', '3/8"', '2"', "2", '1/4"', "83705"),
    ('1-1/2"', '5/8"', '2-7/16"', "2", '1/4"', "83706"),
    ('5/8"', '5/16"', '2"', "2", '1/4"', "83801"),
    ('3/4"', '27/64"', '2-1/16"', "2", '1/4"', "83802"),
    ('7/8"', '3/8"', '2"', "2", '1/4"', "83806"),
    ('1"', '17/32"', '2-1/8"', "2", '1/4"', "83804"),
    ('1-1/4"', '21/32"', '3/8"', "2", '1/4"', "83806B"),
    ('1-1/2"', '3/4"', '1/2"', "2", '1/4"', "83807"),
    ('1-3/4"', '5/8"', '57/64"', "2", '1/4"', "83809"),
    ('7/16"', '9/16"', '1-3/4"', "2", '1/4"', "85801"),
    ('1/2"', '1/2"', '1-3/4"', "2", '1/4"', "81503"),
    ('3/4"', '7/32"', '2"', "2", '1/4"', "89501"),
    ('1/2"', '7/32"', '2-1/8"', "2", '1/4"', "89502"),
    ('1-1/8"', '17/32"', '2-5/16"', "2", '1/4"', "85901"),
    ('1-3/8"', '21/32"', '2-5/16"', "1", '1/4"', "85904"),
    ('7/8"', '3/4"', '2"', "2", '1/4"', "85401"),
    ('13/16"', '9/16"', '2-5/8"', "2", '1/4"', "85411"),
]:
    d_slug = d.replace('"', '').replace('/', '-')
    slug = f"cmt-8000-contractor-{d_slug}-{cod.lower()}"
    add(f"cmt-8000-{cod.lower()}", slug, f"CMT Mecha Contractor Serie 8000 {d} {cod}", cod,
        f"Mecha CMT serie 8000 contractor. Diametro {d}. L.corte {lc}. L.mecha {lm}. {z} dientes. Eje {e}. Codigo {cod}.",
        f"Mecha CMT contractor 8000 {d}.", "Meadas", "Meadas Contractor")

print(f"Generated {len(lines)} CMT products (Part 1)")

# Insert into products.ts
with open(FILEPATH, 'r', encoding='utf-8') as f:
    content = f.read()

insert_marker = "];"
insert_pos = content.rfind(insert_marker)
if insert_pos == -1:
    print("ERROR: Could not find insertion point")
else:
    new_block = "\n".join(lines) + "\n"
    new_content = content[:insert_pos] + new_block + content[insert_pos:]
    with open(FILEPATH, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Successfully inserted {len(lines)} CMT products into products.ts")
