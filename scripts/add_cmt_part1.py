FILEPATH = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts"

def esc(s):
    return s.replace('"', '\\"')

lines = []

def add(cmt_id, slug, name, modelo, desc, short, cat, sub):
    lines.append(
        f'  {{ id: "{cmt_id}", slug: "{slug}", name: "{esc(name)}", brand: "CMT", model: "{modelo}", '
        f'description: "{esc(desc)}", shortDescription: "{esc(short)}", '
        f'category: "{cat}", subcategory: "{sub}", image: "" }},'
    )

# =============================================
# LINEA INDUSTRIAL - DISCOS
# =============================================

# SERIE 278, 286, 290 Y 293 (Sierras Circulares de Diente Alterno con Limitador)
for d, c, e, h, z, cod, val in [
    ("200", "1.8", "2.8", "30", "Z24", "280.200.3M", "10.97"),
    ("250", "1.8", "2.8", "30", "Z24", "290.250.2M", "14.95"),
    ("250", "2.2", "3.2", "30", "Z24", "286.000.12M", "18.28"),
    ("300", "2.2", "3.2", "30", "Z22", "293.024.12M", "22.61"),
    ("300", "2.2", "3.2", "30", "Z28", "293.028.12M", "24.79"),
    ("350", "2.5", "3.5", "30", "Z28", "293.028.15M", "27.65"),
    ("350", "2.5", "3.5", "30", "Z36", "278.036.15M", "30.62"),
    ("400", "3", "3.2", "30", "Z28", "286.028.16M", "36.18"),
]:
    slug = f"cmt-serie-278-{d}mm-{z.lower()}-{cod.lower()}"
    add(f"cmt-278-{d}-{z.lower()}", slug, f"CMT Sierra Circular Serie 278 {d}mm {z} {cod}", cod,
        f"Sierra circular CMT serie 278 de diente alterno con limitador. Diametro {d}mm. Cuerpo {c}mm. Espesor {e}mm. Hueco {h}mm. {z} dientes. Codigo {cod}.",
        f"Sierra CMT 278 {d}mm {z}.", "Discos", "Sierras Circulares Industriales")

# SERIE 285 (Sierras Circulares de Diente Alterno)
for d, c, e, h, z, cod, val in [
    ("150", "2.2", "3.2", "30", "Z48", "285.048.06M", "19.90"),
    ("180", "2.2", "3.2", "30", "Z48", "285.048.07M", "21.18"),
    ("200", "2.2", "3.2", "30", "Z36", "285.036.08M", "18.74"),
    ("200", "2.2", "3.2", "30", "Z48", "285.048.08M", "21.65"),
    ("200", "2.2", "3.2", "30", "Z60", "285.060.08M", "23.94"),
    ("250", "2.2", "3.2", "30", "Z36", "285.036.10M", "20.99"),
    ("250", "2.2", "3.2", "30", "Z48", "285.048.10M", "23.36"),
    ("250", "2.2", "3.2", "30", "Z60", "285.060.10M", "25.74"),
    ("250", "2.2", "3.2", "30", "Z72", "285.072.10M", "28.62"),
    ("300", "2.2", "3.2", "30", "Z36", "285.036.12M", "26.40"),
    ("300", "2.2", "3.2", "30", "Z48", "285.048.12M", "28.41"),
    ("300", "2.2", "3.2", "30", "Z60", "285.060.12M", "30.06"),
    ("300", "2.2", "3.2", "30", "Z72", "285.072.12M", "32.54"),
    ("350", "2.5", "3.5", "30", "Z48", "285.048.14M", "33.76"),
    ("350", "2.5", "3.5", "30", "Z72", "285.072.14M", "36.30"),
    ("350", "2.5", "3.5", "30", "Z84", "285.084.14M", "39.24"),
    ("400", "2.5", "3.5", "30", "Z48", "285.048.16M", "31.71"),
    ("400", "2.5", "3.5", "30", "Z60", "285.060.16M", "45.44"),
    ("400", "2.5", "3.5", "30", "Z72", "285.072.16M", "35.80"),
    ("400", "2.5", "3.5", "30", "Z120", "285.120.16M", "62.99"),
    ("450", "2.8", "3.8", "30", "Z36", "285.036.18M", "35.41"),
    ("450", "2.8", "3.8", "30", "Z48", "285.048.18M", "51.74"),
    ("450", "2.8", "3.8", "30", "Z60", "285.060.18M", "54.46"),
    ("500", "2.8", "3.8", "30", "Z48", "285.048.20M", "51.02"),
    ("500", "2.8", "3.8", "30", "Z60", "285.060.20M", "62.14"),
    ("550", "3.2", "4.2", "30", "Z40", "285.040.22M", "59.73"),
    ("600", "3.2", "4.2", "30", "Z48", "285.048.24M", "74.78"),
]:
    slug = f"cmt-serie-285-{d}mm-{z.lower()}-{cod.lower()}"
    add(f"cmt-285-{d}-{z.lower()}", slug, f"CMT Sierra Circular Serie 285 {d}mm {z} {cod}", cod,
        f"Sierra circular CMT serie 285 de diente alterno. Diametro {d}mm. Cuerpo {c}mm. Espesor {e}mm. Hueco {h}mm. {z} dientes. Codigo {cod}.",
        f"Sierra CMT 285 {d}mm {z}.", "Discos", "Sierras Circulares Industriales")

# SERIE 279 (Discos de Multiple)
for d, c, e, h, z, cod, val in [
    ("250", "2.2", "3.2", "30", "Z12+4", "279.012.10M", "33.03"),
    ("300", "2.2", "3.2", "70", "Z24+4", "279.024.12M", "37.09"),
    ("400", "2.8", "4", "30", "Z28+6", "279.028.16M", "73.13"),
]:
    slug = f"cmt-serie-279-{d}mm-{z.lower().replace('+', '-')}"
    add(f"cmt-279-{d}", slug, f"CMT Disco Multiple Serie 279 {d}mm {z} {cod}", cod,
        f"Disco multiple CMT serie 279. Diametro {d}mm. Cuerpo {c}mm. Espesor {e}mm. Hueco {h}mm. {z} dientes. Codigo {cod}.",
        f"Disco multiple CMT 279 {d}mm {z}.", "Discos", "Discos Multiple")

# SERIE 285 (Sierras para Melamina y Laminados)
for d, c, e, h, z, cod, val in [
    ("250", "2.2", "3.2", "30", "78", "285.078.10M", "41.61"),
    ("300", "2.2", "3.2", "30", "Z86", "286.086.12M", "47.12"),
]:
    slug = f"cmt-serie-285-mel-{d}mm-{cod.lower()}"
    add(f"cmt-285-mel-{d}", slug, f"CMT Sierra Circular Melamina Serie 285 {d}mm {cod}", cod,
        f"Sierra circular CMT serie 285 para melamina y laminados. Diametro {d}mm. Cuerpo {c}mm. Espesor {e}mm. Hueco {h}mm. {z} dientes. Codigo {cod}.",
        f"Sierra CMT melamina 285 {d}mm.", "Discos", "Sierras Circulares Melamina")

# SERIE 285 (Sierras para Marqueteria)
for d, c, e, h, z, cod, val in [
    ("300", "2.5", "3", "30", "Z96", "285.096.12M", "46.66"),
]:
    slug = f"cmt-serie-285-marq-{d}mm-{cod.lower()}"
    add(f"cmt-285-marq-{d}", slug, f"CMT Sierra Circular Marqueteria Serie 285 {d}mm {cod}", cod,
        f"Sierra circular CMT serie 285 para marqueteria. Diametro {d}mm. Cuerpo {c}mm. Espesor {e}mm. Hueco {h}mm. {z} dientes. Codigo {cod}.",
        f"Sierra CMT marqueteria 285 {d}mm.", "Discos", "Sierras Circulares Marqueteria")

# SERIE 287 (Sierras de Diente Concavo)
for d, c, e, h, z, cod, val in [
    ("220", "2.2", "3.2", "30", "Z42", "287.042.09M", "36.17"),
    ("250", "2.2", "3.2", "30", "Z48", "287.048.10M", "39.01"),
    ("300", "2.2", "3.2", "30", "Z84", "287.084.12M", "53.80"),
]:
    slug = f"cmt-serie-287-{d}mm-{z.lower()}"
    add(f"cmt-287-{d}", slug, f"CMT Sierra Circular Diente Concavo Serie 287 {d}mm {z} {cod}", cod,
        f"Sierra circular CMT serie 287 de diente concavo. Diametro {d}mm. Cuerpo {c}mm. Espesor {e}mm. Hueco {h}mm. {z} dientes. Codigo {cod}.",
        f"Sierra CMT concavo 287 {d}mm {z}.", "Discos", "Sierras Circulares Concavo")

# SERIE 283 (Sierras Especiales para Melamina)
for d, c, e, h, z, cod, val in [
    ("220", "2.2", "3.2", "30", "Z64", "283.064.09M", "30.72"),
    ("250", "2.2", "3.2", "30", "Z72", "283.072.10M", "33.17"),
    ("300", "2.2", "3.2", "30", "Z96", "283.096.12M", "43.76"),
    ("350", "2.5", "3.5", "30", "Z108", "283.108.14M", "53.23"),
    ("350", "2.5", "3.5", "30", "Z80", "283.080.14M", "40.91"),
    ("250", "2.2", "3.2", "30", "Z96", "283.096.10M", "49.47"),
]:
    slug = f"cmt-serie-283-{d}mm-{z.lower()}"
    add(f"cmt-283-{d}-{z.lower()}", slug, f"CMT Sierra Especial Melamina Serie 283 {d}mm {z} {cod}", cod,
        f"Sierra circular CMT serie 283 especial para melamina. Diametro {d}mm. Cuerpo {c}mm. Espesor {e}mm. Hueco {h}mm. {z} dientes. Codigo {cod}.",
        f"Sierra CMT melamina especial 283 {d}mm {z}.", "Discos", "Sierras Circulares Melamina")

# SERIE 281 (Sierras Trapezoidal Positivo)
for d, c, e, h, z, cod, val in [
    ("200", "2.2", "3.2", "30", "Z64", "281.064.08M", "27.79"),
    ("220", "2.2", "3.2", "30", "Z64", "281.064.09M", "27.19"),
    ("250", "2.2", "3.2", "30", "Z60", "281.060.10M", "27.52"),
    ("250", "2.2", "3.2", "30", "Z72", "281.072.10M", "34.88"),
    ("300", "2.2", "3.2", "30", "Z72", "281.072.12M", "32.57"),
    ("300", "2.5", "3", "32", "Z96", "281.096.12M", "41.28"),
    ("350", "2.5", "3.5", "32", "Z108", "281.108.14M", "50.00"),
]:
    slug = f"cmt-serie-281-{d}mm-{z.lower()}"
    add(f"cmt-281-{d}-{z.lower()}", slug, f"CMT Sierra Trapezoidal Positivo Serie 281 {d}mm {z} {cod}", cod,
        f"Sierra circular CMT serie 281 trapezoidal positivo. Diametro {d}mm. Cuerpo {c}mm. Espesor {e}mm. Hueco {h}mm. {z} dientes. Codigo {cod}.",
        f"Sierra CMT trapezoidal 281 {d}mm {z}.", "Discos", "Sierras Circulares Trapezoidal")

# SERIE 281 (Revestimiento Cromo)
for d, c, e, h, z, cod, val in [
    ("250", "2.2", "3.2", "32", "Z80", "281.168.10R", "40.59"),
    ("300", "2.2", "3.2", "32", "Z96", "281.169.12R", "48.77"),
]:
    slug = f"cmt-serie-281-cromo-{d}mm-{z.lower()}"
    add(f"cmt-281-cromo-{d}", slug, f"CMT Sierra Trapezoidal Positivo Cromo Serie 281 {d}mm {z} {cod}", cod,
        f"Sierra circular CMT serie 281 trapezoidal positivo revestimiento cromo. Diametro {d}mm. Cuerpo {c}mm. Espesor {e}mm. Hueco {h}mm. {z} dientes. Codigo {cod}.",
        f"Sierra CMT trapezoidal cromo 281 {d}mm {z}.", "Discos", "Sierras Circulares Trapezoidal Cromo")

# SERIE 237 (Trapezoidal Positivo con Dientes en Diamante)
for d, c, e, h, z, cod, val in [
    ("250", "2.2", "3.2", "30", "Z48", "237.048.10M", "313.50"),
    ("300", "2.2", "3.2", "30", "Z48", "237.048.12M", "313.50"),
]:
    slug = f"cmt-serie-237-{d}mm"
    add(f"cmt-237-{d}", slug, f"CMT Sierra Dientes Diamante Serie 237 {d}mm {cod}", cod,
        f"Sierra circular CMT serie 237 trapezoidal positivo con dientes en diamante. Diametro {d}mm. Cuerpo {c}mm. Espesor {e}mm. Hueco {h}mm. {z} dientes. Codigo {cod}.",
        f"Sierra CMT diamante 237 {d}mm.", "Discos", "Sierras Circulares Diamante")

# SERIE 238 (Precorte Conico con Dientes en Diamante)
for d, c, e, h, z, cod, val in [
    ("120", "2.2", "", "20", "Z10", "238.010.05M", "69.00"),
]:
    slug = f"cmt-serie-238-{d}mm"
    add(f"cmt-238-{d}", slug, f"CMT Sierra Precorte Conico Diamante Serie 238 {d}mm {cod}", cod,
        f"Sierra circular CMT serie 238 precorte conico con dientes en diamante. Diametro {d}mm. Cuerpo {c}mm. Hueco {h}mm. {z} dientes. Codigo {cod}.",
        f"Sierra CMT precorte diamante 238 {d}mm.", "Discos", "Sierras Circulares Precorte Diamante")

# SERIE 235 (Sierras con Dientes en Diamante Multimaterial)
for d, c, e, h, z, cod, val in [
    ("250", "2.2", "3.2", "30", "Z36", "235.250.36M", "252.19"),
    ("300", "2.2", "3.2", "30", "Z36", "235.300.36M", "262.90"),
]:
    slug = f"cmt-serie-235-{d}mm"
    add(f"cmt-235-{d}", slug, f"CMT Sierra Diamante Multimaterial Serie 235 {d}mm {cod}", cod,
        f"Sierra circular CMT serie 235 con dientes en diamante multimaterial. Diametro {d}mm. Cuerpo {c}mm. Espesor {e}mm. Hueco {h}mm. {z} dientes. Codigo {cod}.",
        f"Sierra CMT diamante multimaterial 235 {d}mm.", "Discos", "Sierras Circulares Diamante")

# SERIE 289 (Precorte Conico Ajustable)
for d, c, e, h, z, cod, val in [
    ("70", "2.5", "2.9-3.6", "20", "Z14", "289.280.03H", "18.52"),
    ("90", "2.5", "2.9-3.6", "20", "Z10+10", "289.280.03H", "38.07"),
]:
    slug = f"cmt-serie-289-{d}mm"
    add(f"cmt-289-{d}", slug, f"CMT Sierra Precorte Conico Ajustable Serie 289 {d}mm {cod}", cod,
        f"Sierra circular CMT serie 289 precorte conico ajustable. Diametro {d}mm. Cuerpo {c}mm. Hueco {h}mm. {z} dientes. Codigo {cod}.",
        f"Sierra CMT precorte ajustable 289 {d}mm.", "Discos", "Sierras Circulares Precorte")

# SERIE 288 (Sierras de Diente Conico Flujo)
for d, c, e, h, z, cod, val in [
    ("100", "3", "3.1", "20", "Z24", "288.100.04H", ""),
    ("120", "3", "3.1-4", "20", "Z24", "288.120.04H", "22.74"),
    ("125", "3", "3.1", "20", "Z24", "288.125.04H", "23.74"),
    ("140", "3", "3.1-4", "20", "Z30", "288.130.05H", "29.58"),
    ("160", "3", "3.1-4.5", "20", "Z24", "288.140.06H", "43.18"),
]:
    slug = f"cmt-serie-288-{d}mm"
    add(f"cmt-288-{d}", slug, f"CMT Sierra Diente Conico Flujo Serie 288 {d}mm {cod}", cod,
        f"Sierra circular CMT serie 288 de diente conico flujo. Diametro {d}mm. Cuerpo {c}mm. Hueco {h}mm. {z} dientes. Codigo {cod}.",
        f"Sierra CMT conico flujo 288 {d}mm.", "Discos", "Sierras Circulares Conico Flujo")

# SERIE 282 (Sierras Trapezoidal para Seccionadoras)
for d, c, e, h, z, cod, val in [
    ("300", "3.2", "4.4", "65", "Z72", "282.300.07J", "95.37"),
    ("320", "3.2", "4.4", "75", "Z72", "282.320.07X", "95.37"),
]:
    slug = f"cmt-serie-282-{d}mm"
    add(f"cmt-282-{d}", slug, f"CMT Sierra Trapezoidal Seccionadora Serie 282 {d}mm {cod}", cod,
        f"Sierra circular CMT serie 282 trapezoidal para seccionadoras. Diametro {d}mm. Cuerpo {c}mm. Espesor {e}mm. Hueco {h}mm. {z} dientes. Codigo {cod}.",
        f"Sierra CMT seccionadora 282 {d}mm.", "Discos", "Sierras Circulares Seccionadora")

# SERIE 226 (Sierras Circulares en HM para Metales)
for d, c, e, h, z, cod, val in [
    ("7-1/4", "1.6", "2", "5/8\"", "Z48", "226.184.24E", "32.51"),
    ("305", "2.2", "2.2", "30", "Z80", "226.080.12M", "59.57"),
    ("350", "2.2", "2.2", "30", "Z80", "226.080.14M", "63.52"),
    ("300", "2.2", "2.2", "30", "Z80", "226.080.12M", "59.93"),
]:
    slug = f"cmt-serie-226-{d.replace('/', '-').replace('\"', '')}mm"
    add(f"cmt-226-{d.replace('/', '-').replace('\"', '')}", slug, f"CMT Sierra HM Metales Serie 226 {d} {cod}", cod,
        f"Sierra circular CMT serie 226 HM para metales. Diametro {d}. Cuerpo {c}mm. Espesor {e}mm. Hueco {h}. {z} dientes. Codigo {cod}.",
        f"Sierra CMT HM metales 226 {d}.", "Discos", "Sierras Circulares HM Metales")

# SERIE 290 (Sierras Circulares Industriales para Maquinas Portatiles)
for d, c, e, h, z, cod, val in [
    ("164", "1.8", "2.8", "16", "Z40", "290.164.24E", "14.17"),
    ("180", "1.8", "2.8", "16", "Z40", "290.164.CCH", "13.18"),
    ("184", "1.8", "2.6", "16", "Z40", "290.164.KE", "12.23"),
    ("184", "1.8", "2.6", "16", "Z48", "290.190.64M", "16.53"),
    ("190", "1.8", "2.6", "30", "Z64", "290.190.64M", "19.44"),
    ("210", "1.8", "2.6", "30", "Z80", "290.210.80M", "15.53"),
    ("210", "1.8", "2.8", "30", "Z48", "290.210.48M", "22.63"),
    ("210", "1.8", "2.8", "30", "Z64", "290.210.64M", "24.96"),
    ("235", "1.8", "2.8", "30", "Z48", "290.235.48M", "21.45"),
    ("235", "1.8", "2.8", "30", "Z64", "290.235.64M", "22.82"),
]:
    slug = f"cmt-serie-290-{d.replace('/', '-')}mm-{cod.lower()}"
    add(f"cmt-290-{d.replace('/', '-').replace('\"', '')}-{cod.lower()}", slug, f"CMT Sierra Circular Portatil Serie 290 {d} {cod}", cod,
        f"Sierra circular CMT serie 290 industrial para maquinas portatiles. Diametro {d}. Cuerpo {c}mm. Espesor {e}mm. Hueco {h}. {z} dientes. Codigo {cod}.",
        f"Sierra CMT portatil 290 {d}.", "Discos", "Sierras Circulares Portatiles")

# SERIE 297 (Sierras Trapezoidal Negro Recubrimiento No Ferrosos)
for d, c, e, h, z, cod, val in [
    ("250", "2.5", "3.2", "32", "Z80", "297.080.10F", "34.52"),
    ("300", "2.5", "3.2", "32", "Z96", "297.096.12F", "41.66"),
    ("350", "2.5", "3.2", "32", "Z96", "297.096.14F", "52.93"),
    ("400", "3.2", "3.8", "32", "Z108", "297.108.16P", "72.01"),
    ("450", "3.2", "3.8", "32", "Z120", "297.120.18P", "82.47"),
    ("500", "3.2", "3.8", "32", "", "297.120.20P", ""),
]:
    slug = f"cmt-serie-297-{d}mm-{cod.lower()}"
    add(f"cmt-297-{d}", slug, f"CMT Sierra Trapezoidal No Ferrosos Serie 297 {d}mm {cod}", cod,
        f"Sierra circular CMT serie 297 trapezoidal negro recubrimiento para no ferrosos. Diametro {d}mm. Cuerpo {c}mm. Espesor {e}mm. Hueco {h}mm. {z} dientes. Codigo {cod}.",
        f"Sierra CMT no ferrosos 297 {d}mm.", "Discos", "Sierras Circulares No Ferrosos")

# SERIE 284 (Sierras para Materiales No Ferrosos y Plasticos)
for d, c, e, h, z, cod, val in [
    ("420", "3.2", "3.8", "32", "Z96", "284.096.17P", "65.93"),
]:
    slug = f"cmt-serie-284-{d}mm"
    add(f"cmt-284-{d}", slug, f"CMT Sierra No Ferrosos Plasticos Serie 284 {d}mm {cod}", cod,
        f"Sierra circular CMT serie 284 para materiales no ferrosos y plasticos. Diametro {d}mm. Cuerpo {c}mm. Espesor {e}mm. Hueco {h}mm. {z} dientes. Codigo {cod}.",
        f"Sierra CMT no ferrosos plasticos 284 {d}mm.", "Discos", "Sierras Circulares No Ferrosos")

# SERIE P (Sierras Circulares para Melamina y Laminados - Linea Semi-Industrial)
for d, c, e, h, z, cod, val in [
    ("5-1/2", "1.6", "1.6", "5/8\"", "Z36", "P05204", ""),
    ("6-1/2", "1.6", "1.6", "5/8\"", "Z60", "P06206", "11.45"),
    ("7-1/4", "1.6", "2.21", "5/8\"", "Z24", "P07024", "6.12"),
    ("7-1/4", "1.6", "2.21", "5/8\"", "Z40", "P07040", "8.14"),
    ("7-1/4", "1.6", "1.6", "5/8\"", "Z60", "P07024", "10.22"),
    ("8-1/4", "1.6", "2.21", "5/8\"", "Z40", "P08024", "10.22"),
    ("8-1/4", "1.6", "1.6", "5/8\"", "Z60", "P08024", "15.13"),
    ("10\"", "1.6", "2.38", "5/8\"", "Z60", "P10060", "20.49"),
    ("10\"", "1.6", "2.38", "1\"", "Z80", "P10080", "30.97"),
    ("12\"", "1.8", "2.59", "1\"", "Z96", "P12096", "39.65"),
]:
    d_slug = d.replace('"', '').replace('-', '-').replace('/', '-')
    slug = f"cmt-serie-p-{d_slug}-{cod.lower()}"
    add(f"cmt-p-{d_slug}-{cod.lower()}", slug, f"CMT Sierra Melamina Serie P {d} {cod}", cod,
        f"Sierra circular CMT serie P para melamina y laminados. Diametro {d}. Cuerpo {c}mm. Espesor {e}mm. Hueco {h}. {z} dientes. Codigo {cod}.",
        f"Sierra CMT melamina P {d}.", "Discos", "Sierras Circulares Melamina Semi-Industrial")

# SERIE PN (Sierras Circulares para Metales No Ferrosos)
for d, c, e, h, z, cod, val in [
    ("7-1/4", "2.21", "5/8\"", "Z56", "P07056K", "15.97"),
    ("10\"", "2.38", "5/8\"", "Z80", "P10080N", "31.97"),
    ("12\"", "2.79", "1\"", "Z96", "P12096N", "39.65"),
]:
    d_slug = d.replace('"', '').replace('-', '-')
    slug = f"cmt-serie-pn-{d_slug}-{cod.lower()}"
    add(f"cmt-pn-{d_slug}-{cod.lower()}", slug, f"CMT Sierra No Ferrosos Serie PN {d} {cod}", cod,
        f"Sierra circular CMT serie PN para metales no ferrosos. Diametro {d}. Espesor {e}mm. Hueco {h}. {z} dientes. Codigo {cod}.",
        f"Sierra CMT no ferrosos PN {d}.", "Discos", "Sierras Circulares No Ferrosos Semi-Industrial")

# SERIE K (Sierras Circulares para Madera y Derivados)
for d, l, e, h, z, cod, val in [
    ("4-7/8\"", "1", "1.19", "5/8\"", "Z36", "K04808", ""),
    ("6-1/2\"", "1.19", "1.8", "5/8\"", "Z36", "K06606", "6.50"),
    ("7-1/4\"", "1", "1.19", "5/8\"", "Z24", "K07407", "3.50"),
    ("7-1/4\"", "1.19", "1.8", "5/8\"", "Z40", "K07408", "4.27"),
    ("7-1/4\"", "1", "1.19", "5/8\"", "Z24", "K07407", "6.49"),
    ("8-1/4\"", "1.19", "1.8", "5/8\"", "Z40", "K08408", "5.97"),
    ("8-1/4\"", "1", "1.19", "5/8\"", "Z40", "K08408", "6.97"),
    ("10\"", "1.6", "2.38", "5/8\"", "Z60", "K01010", "10.65"),
    ("10\"", "1.6", "2.38", "1\"", "Z60", "K01010", "16.06"),
    ("10\"", "1.6", "2.38", "1\"", "Z80", "K01018", "16.39"),
    ("12\"", "1.8", "2.59", "1\"", "Z40", "K06012", "16.50"),
    ("12\"", "1.8", "2.59", "1\"", "Z60", "K06012", "19.97"),
    ("12\"", "1.8", "2.59", "1\"", "Z80", "K08012", ""),
    ("12\"", "1.8", "2.59", "1\"", "Z24", "K02412", "12.95"),
    ("12\"", "1.8", "2.59", "1\"", "Z40", "K04012", "14.66"),
    ("14\"", "2.21", "3.2", "1\"", "Z60", "K06014", "24.30"),
]:
    d_slug = d.replace('"', '').replace('-', '-')
    slug = f"cmt-serie-k-{d_slug}-{cod.lower()}"
    add(f"cmt-k-{d_slug}-{cod.lower()}", slug, f"CMT Sierra Madera Serie K {d} {cod}", cod,
        f"Sierra circular CMT serie K para madera y derivados. Diametro {d}. L.corte {l}mm. Espesor {e}mm. Hueco {h}. {z} dientes. Codigo {cod}.",
        f"Sierra CMT madera K {d}.", "Discos", "Sierras Circulares Madera Semi-Industrial")

# SERIE 8000 CONTRACTOR
for d, lc, lm, z, e, h, cod, val in [
    ("1/8\"", "3/4\"", "1-1/2\"", "2", "1/4\"", "81001", ""),
    ("5/32\"", "7/8\"", "2\"", "1", "1/4\"", "81105", ""),
    ("1/4\"", "1\"", "2-1/4\"", "2", "1/4\"", "81209", ""),
    ("5/16\"", "1\"", "2-1/4\"", "2", "1/4\"", "81112", ""),
    ("3/8\"", "1-1/16\"", "2-1/2\"", "2", "1/4\"", "81303", ""),
    ("1/2\"", "1-1/4\"", "2-7/16\"", "2", "1/4\"", "81208", ""),
    ("5/8\"", "1\"", "2-3/16\"", "2", "1/4\"", "81125", ""),
    ("3/4\"", "15/16\"", "2-3/16\"", "2", "1/4\"", "81330", ""),
    ("1/2\"", "1\"", "2-3/8\"", "2", "1/4\"", "80604", ""),
    ("1/2\"", "1\"", "2-3/16\"", "2", "1/4\"", "80605", ""),
    ("5/8\"", "1\"", "2\"", "2", "1/4\"", "80101", ""),
    ("3/4\"", "25/32\"", "2\"", "2", "1/4\"", "80107", ""),
    ("3/4\"", "1\"", "2-11/16\"", "2", "1/4\"", "81210", ""),
    ("1/4\"", "3/4\"", "2-5/8\"", "2+1", "1/4\"", "81601", ""),
    ("1/4\"", "1\"", "2-1/8\"", "2", "1/4\"", "81018", ""),
    ("1/2\"", "3/8\"", "1-3/4\"", "2", "1/4\"", "83603", ""),
    ("3/8\"", "3/8\"", "2-1/16\"", "2", "1/4\"", "81809", ""),
    ("1/2\"", "1\"", "2-1/8\"", "2", "1/4\"", "81815", ""),
    ("3/8\"", "7/16\"", "1-7/8\"", "1", "1/4\"", "81120", ""),
    ("1-3/8\"", "7/16\"", "2-3/16\"", "2", "1/4\"", "83605", ""),
    ("1/4\"", "3/8\"", "1-9/16\"", "2", "1/4\"", "81410", ""),
    ("3/8\"", "3/8\"", "1-9/16\"", "2", "1/4\"", "81411", ""),
    ("5/16\"", "7/16\"", "1-11/16\"", "2", "1/4\"", "81220", ""),
    ("1/2\"", "1/2\"", "1-9/16\"", "2", "1/4\"", "81404", ""),
    ("3/4\"", "1/2\"", "1-13/16\"", "2", "1/4\"", "81408", ""),
    ("1/2\"", "1/2\"", "2-1/8\"", "2", "1/4\"", "83702", ""),
    ("1-1/4\"", "3/8\"", "2\"", "2", "1/4\"", "83705", ""),
    ("1-1/2\"", "5/8\"", "2-7/16\"", "2", "1/4\"", "83705", ""),
    ("5/8\"", "5/16\"", "2\"", "2", "1/4\"", "83801", ""),
    ("3/4\"", "27/64\"", "2-1/16\"", "2", "1/4\"", "83802", ""),
    ("7/8\"", "3/8\"", "2\"", "2", "1/4\"", "83806", ""),
    ("1\"", "17/32\"", "2-1/8\"", "2", "1/4\"", "83804", ""),
    ("1-1/4\"", "21/32\"", "3/8\"", "2", "1/4\"", "83806", ""),
    ("1-1/2\"", "3/4\"", "1/2\"", "2", "1/4\"", "83807", ""),
    ("1-3/4\"", "5/8\"", "57/64\"", "2", "1/4\"", "83809", ""),
    ("7/16\"", "9/16\"", "1-3/4\"", "2", "1/4\"", "85801", ""),
    ("1/2\"", "1/2\"", "1-3/4\"", "2", "1/4\"", "81503", ""),
    ("3/4\"", "7/32\"", "2\"", "2", "1/4\"", "89501", ""),
    ("1/2\"", "7/32\"", "2-1/8\"", "2", "1/4\"", "89502", ""),
    ("1-1/8\"", "17/32\"", "2-5/16\"", "2", "1/4\"", "85901", ""),
    ("1-3/8\"", "21/32\"", "2-5/16\"", "1", "1/4\"", "85904", ""),
    ("3/8\"", "7/16\"", "1-7/8\"", "1", "1/4\"", "81120", ""),
    ("7/8\"", "3/4\"", "2\"", "2", "1/4\"", "85401", ""),
    ("13/16\"", "9/16\"", "2-5/8\"", "2", "1/4\"", "85411", ""),
]:
    d_slug = d.replace('"', '').replace('-', '-').replace('/', '-')
    slug = f"cmt-8000-contractor-{d_slug}-{cod.lower()}"
    add(f"cmt-8000-{cod.lower()}", slug, f"CMT Mecha Contractor Serie 8000 {d} {cod}", cod,
        f"Mecha CMT serie 8000 contractor. Diametro {d}. L.corte {lc}. L.mecha {lm}. {z} dientes. Eje {e}. Codigo {cod}.",
        f"Mecha CMT contractor 8000 {d}.", "Meadas", "Meadas Contractor")

print(f"Generated {len(lines)} CMT products (Part 1 - Industrial Line)")
# Continue in next part...
