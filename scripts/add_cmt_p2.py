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
# MECHAS - LINEA INDUSTRIAL (remaining series)
# =============================================

# SERIE 190 (Meadas HSS)
for d, lc, lm, z, e, cod in [
    ("1/8", "3/8", "1-1/2", "4", "1/4", "190.100.04"),
    ("5/32", "7/16", "1-3/4", "4", "1/4", "190.125.04"),
    ("3/16", "9/16", "2", "4", "1/4", "190.150.04"),
    ("1/4", "3/4", "2-1/4", "4", "1/4", "190.200.04"),
    ("5/16", "7/8", "2-1/2", "4", "1/4", "190.250.04"),
    ("3/8", "1", "2-3/4", "4", "1/4", "190.300.04"),
    ("7/16", "1-1/16", "2-7/8", "4", "1/4", "190.350.04"),
    ("1/2", "1-1/4", "3-1/8", "4", "1/4", "190.400.04"),
    ("9/16", "1-5/16", "3-1/4", "4", "1/4", "190.450.04"),
    ("5/8", "1-7/16", "3-1/2", "4", "1/4", "190.500.04"),
    ("3/4", "1-3/4", "4", "4", "3/8", "190.600.04"),
    ("7/8", "2", "4-1/2", "4", "3/8", "190.700.04"),
    ("1", "2-1/4", "4-3/4", "4", "1/2", "190.800.04"),
]:
    d_slug = d.replace('/', '-')
    slug = f"cmt-mecha-190-{d_slug}-{cod.lower()}"
    add(f"cmt-190-{d_slug}", slug, f"CMT Mecha HSS Serie 190 {d}/16 {cod}", cod,
        f"Mecha CMT serie 190 HSS. Diametro {d}/16. L.corte {lc}. L.mecha {lm}. {z} dientes. Eje {e}. Codigo {cod}.",
        f"Mecha CMT HSS 190 {d}/16.", "Meadas", "Meadas HSS")

# SERIE 192 (Meadas HSS dientes rectos)
for d, lc, lm, z, e, cod in [
    ("1/4", "3/4", "2-1/4", "2", "1/4", "192.200.04"),
    ("5/16", "7/8", "2-1/2", "2", "1/4", "192.250.04"),
    ("3/8", "1", "2-3/4", "2", "1/4", "192.300.04"),
    ("1/2", "1-1/4", "3-1/8", "2", "1/4", "192.400.04"),
    ("5/8", "1-7/16", "3-1/2", "2", "1/4", "192.500.04"),
    ("3/4", "1-3/4", "4", "2", "3/8", "192.600.04"),
]:
    d_slug = d.replace('/', '-')
    slug = f"cmt-mecha-192-{d_slug}-{cod.lower()}"
    add(f"cmt-192-{d_slug}", slug, f"CMT Mecha HSS Recto Serie 192 {d}/16 {cod}", cod,
        f"Mecha CMT serie 192 HSS dientes rectos. Diametro {d}/16. L.corte {lc}. L.mecha {lm}. {z} dientes. Eje {e}. Codigo {cod}.",
        f"Mecha CMT HSS recto 192 {d}/16.", "Meadas", "Meadas HSS")

# SERIE 801 (Meadas HSS dientes alternos)
for d, lc, lm, z, e, cod in [
    ("1/8", "3/8", "1-1/2", "2", "1/4", "801.100.04"),
    ("5/32", "7/16", "1-3/4", "2", "1/4", "801.125.04"),
    ("3/16", "9/16", "2", "2", "1/4", "801.150.04"),
    ("1/4", "3/4", "2-1/4", "2", "1/4", "801.200.04"),
    ("5/16", "7/8", "2-1/2", "2", "1/4", "801.250.04"),
    ("3/8", "1", "2-3/4", "2", "1/4", "801.300.04"),
    ("7/16", "1-1/16", "2-7/8", "2", "1/4", "801.350.04"),
    ("1/2", "1-1/4", "3-1/8", "2", "1/4", "801.400.04"),
    ("9/16", "1-5/16", "3-1/4", "2", "1/4", "801.450.04"),
    ("5/8", "1-7/16", "3-1/2", "2", "1/4", "801.500.04"),
    ("3/4", "1-3/4", "4", "2", "3/8", "801.600.04"),
    ("7/8", "2", "4-1/2", "2", "3/8", "801.700.04"),
    ("1", "2-1/4", "4-3/4", "2", "1/2", "801.800.04"),
]:
    d_slug = d.replace('/', '-')
    slug = f"cmt-mecha-801-{d_slug}-{cod.lower()}"
    add(f"cmt-801-{d_slug}", slug, f"CMT Mecha HSS Alterno Serie 801 {d}/16 {cod}", cod,
        f"Mecha CMT serie 801 HSS dientes alternos. Diametro {d}/16. L.corte {lc}. L.mecha {lm}. {z} dientes. Eje {e}. Codigo {cod}.",
        f"Mecha CMT HSS alterno 801 {d}/16.", "Meadas", "Meadas HSS")

# SERIE 811 (Meadas HSS 6 dientes)
for d, lc, lm, z, e, cod in [
    ("1/8", "3/8", "1-1/2", "6", "1/4", "811.100.04"),
    ("5/32", "7/16", "1-3/4", "6", "1/4", "811.125.04"),
    ("3/16", "9/16", "2", "6", "1/4", "811.150.04"),
    ("1/4", "3/4", "2-1/4", "6", "1/4", "811.200.04"),
    ("5/16", "7/8", "2-1/2", "6", "1/4", "811.250.04"),
    ("3/8", "1", "2-3/4", "6", "1/4", "811.300.04"),
    ("1/2", "1-1/4", "3-1/8", "6", "1/4", "811.400.04"),
    ("5/8", "1-7/16", "3-1/2", "6", "1/4", "811.500.04"),
    ("3/4", "1-3/4", "4", "6", "3/8", "811.600.04"),
]:
    d_slug = d.replace('/', '-')
    slug = f"cmt-mecha-811-{d_slug}-{cod.lower()}"
    add(f"cmt-811-{d_slug}", slug, f"CMT Mecha HSS 6 Dientes Serie 811 {d}/16 {cod}", cod,
        f"Mecha CMT serie 811 HSS 6 dientes. Diametro {d}/16. L.corte {lc}. L.mecha {lm}. {z} dientes. Eje {e}. Codigo {cod}.",
        f"Mecha CMT HSS 6d 811 {d}/16.", "Meadas", "Meadas HSS")

# SERIE 812 (Meadas HSS 8 dientes)
for d, lc, lm, z, e, cod in [
    ("1/8", "3/8", "1-1/2", "8", "1/4", "812.100.04"),
    ("5/32", "7/16", "1-3/4", "8", "1/4", "812.125.04"),
    ("3/16", "9/16", "2", "8", "1/4", "812.150.04"),
    ("1/4", "3/4", "2-1/4", "8", "1/4", "812.200.04"),
    ("5/16", "7/8", "2-1/2", "8", "1/4", "812.250.04"),
    ("3/8", "1", "2-3/4", "8", "1/4", "812.300.04"),
    ("1/2", "1-1/4", "3-1/8", "8", "1/4", "812.400.04"),
    ("5/8", "1-7/16", "3-1/2", "8", "1/4", "812.500.04"),
    ("3/4", "1-3/4", "4", "8", "3/8", "812.600.04"),
]:
    d_slug = d.replace('/', '-')
    slug = f"cmt-mecha-812-{d_slug}-{cod.lower()}"
    add(f"cmt-812-{d_slug}", slug, f"CMT Mecha HSS 8 Dientes Serie 812 {d}/16 {cod}", cod,
        f"Mecha CMT serie 812 HSS 8 dientes. Diametro {d}/16. L.corte {lc}. L.mecha {lm}. {z} dientes. Eje {e}. Codigo {cod}.",
        f"Mecha CMT HSS 8d 812 {d}/16.", "Meadas", "Meadas HSS")

# SERIE 818 (Meadas HSS dientes espaciados)
for d, lc, lm, z, e, cod in [
    ("1/4", "3/4", "2-1/4", "2", "1/4", "818.200.04"),
    ("5/16", "7/8", "2-1/2", "2", "1/4", "818.250.04"),
    ("3/8", "1", "2-3/4", "2", "1/4", "818.300.04"),
    ("1/2", "1-1/4", "3-1/8", "2", "1/4", "818.400.04"),
    ("5/8", "1-7/16", "3-1/2", "2", "1/4", "818.500.04"),
    ("3/4", "1-3/4", "4", "2", "3/8", "818.600.04"),
]:
    d_slug = d.replace('/', '-')
    slug = f"cmt-mecha-818-{d_slug}-{cod.lower()}"
    add(f"cmt-818-{d_slug}", slug, f"CMT Mecha HSS Espaciado Serie 818 {d}/16 {cod}", cod,
        f"Mecha CMT serie 818 HSS dientes espaciados. Diametro {d}/16. L.corte {lc}. L.mecha {lm}. {z} dientes. Eje {e}. Codigo {cod}.",
        f"Mecha CMT HSS espaciado 818 {d}/16.", "Meadas", "Meadas HSS")

# SERIE 842 (Meadas HSS para aluminio)
for d, lc, lm, z, e, cod in [
    ("1/4", "3/4", "2-1/4", "4", "1/4", "842.200.04"),
    ("5/16", "7/8", "2-1/2", "4", "1/4", "842.250.04"),
    ("3/8", "1", "2-3/4", "4", "1/4", "842.300.04"),
    ("1/2", "1-1/4", "3-1/8", "4", "1/4", "842.400.04"),
    ("5/8", "1-7/16", "3-1/2", "4", "1/4", "842.500.04"),
    ("3/4", "1-3/4", "4", "4", "3/8", "842.600.04"),
]:
    d_slug = d.replace('/', '-')
    slug = f"cmt-mecha-842-{d_slug}-{cod.lower()}"
    add(f"cmt-842-{d_slug}", slug, f"CMT Mecha HSS Aluminio Serie 842 {d}/16 {cod}", cod,
        f"Mecha CMT serie 842 HSS para aluminio. Diametro {d}/16. L.corte {lc}. L.mecha {lm}. {z} dientes. Eje {e}. Codigo {cod}.",
        f"Mecha CMT HSS aluminio 842 {d}/16.", "Meadas", "Meadas HSS")

# SERIE 806 (Meadas HSS dientes triple)
for d, lc, lm, z, e, cod in [
    ("1/4", "3/4", "2-1/4", "3", "1/4", "806.200.04"),
    ("5/16", "7/8", "2-1/2", "3", "1/4", "806.250.04"),
    ("3/8", "1", "2-3/4", "3", "1/4", "806.300.04"),
    ("1/2", "1-1/4", "3-1/8", "3", "1/4", "806.400.04"),
    ("5/8", "1-7/16", "3-1/2", "3", "1/4", "806.500.04"),
    ("3/4", "1-3/4", "4", "3", "3/8", "806.600.04"),
]:
    d_slug = d.replace('/', '-')
    slug = f"cmt-mecha-806-{d_slug}-{cod.lower()}"
    add(f"cmt-806-{d_slug}", slug, f"CMT Mecha HSS Triple Serie 806 {d}/16 {cod}", cod,
        f"Mecha CMT serie 806 HSS dientes triple. Diametro {d}/16. L.corte {lc}. L.mecha {lm}. {z} dientes. Eje {e}. Codigo {cod}.",
        f"Mecha CMT HSS triple 806 {d}/16.", "Meadas", "Meadas HSS")

# SERIE 807 (Meadas HSS dientes cuadruple)
for d, lc, lm, z, e, cod in [
    ("1/4", "3/4", "2-1/4", "4", "1/4", "807.200.04"),
    ("5/16", "7/8", "2-1/2", "4", "1/4", "807.250.04"),
    ("3/8", "1", "2-3/4", "4", "1/4", "807.300.04"),
    ("1/2", "1-1/4", "3-1/8", "4", "1/4", "807.400.04"),
    ("5/8", "1-7/16", "3-1/2", "4", "1/4", "807.500.04"),
    ("3/4", "1-3/4", "4", "4", "3/8", "807.600.04"),
]:
    d_slug = d.replace('/', '-')
    slug = f"cmt-mecha-807-{d_slug}-{cod.lower()}"
    add(f"cmt-807-{d_slug}", slug, f"CMT Mecha HSS Cuadruple Serie 807 {d}/16 {cod}", cod,
        f"Mecha CMT serie 807 HSS dientes cuadruple. Diametro {d}/16. L.corte {lc}. L.mecha {lm}. {z} dientes. Eje {e}. Codigo {cod}.",
        f"Mecha CMT HSS cuadruple 807 {d}/16.", "Meadas", "Meadas HSS")

# SERIE 835 (Meadas HM)
for d, lc, lm, z, e, cod in [
    ("1/4", "3/4", "2-1/4", "2", "1/4", "835.200.04"),
    ("5/16", "7/8", "2-1/2", "2", "1/4", "835.250.04"),
    ("3/8", "1", "2-3/4", "2", "1/4", "835.300.04"),
    ("1/2", "1-1/4", "3-1/8", "2", "1/4", "835.400.04"),
    ("5/8", "1-7/16", "3-1/2", "2", "1/4", "835.500.04"),
    ("3/4", "1-3/4", "4", "2", "3/8", "835.600.04"),
]:
    d_slug = d.replace('/', '-')
    slug = f"cmt-mecha-835-{d_slug}-{cod.lower()}"
    add(f"cmt-835-{d_slug}", slug, f"CMT Mecha HM Serie 835 {d}/16 {cod}", cod,
        f"Mecha CMT serie 835 HM. Diametro {d}/16. L.corte {lc}. L.mecha {lm}. {z} dientes. Eje {e}. Codigo {cod}.",
        f"Mecha CMT HM 835 {d}/16.", "Meadas", "Meadas HM")

# SERIE 836 (Meadas HM dientes rectos)
for d, lc, lm, z, e, cod in [
    ("1/4", "3/4", "2-1/4", "2", "1/4", "836.200.04"),
    ("5/16", "7/8", "2-1/2", "2", "1/4", "836.250.04"),
    ("3/8", "1", "2-3/4", "2", "1/4", "836.300.04"),
    ("1/2", "1-1/4", "3-1/8", "2", "1/4", "836.400.04"),
    ("5/8", "1-7/16", "3-1/2", "2", "1/4", "836.500.04"),
    ("3/4", "1-3/4", "4", "2", "3/8", "836.600.04"),
]:
    d_slug = d.replace('/', '-')
    slug = f"cmt-mecha-836-{d_slug}-{cod.lower()}"
    add(f"cmt-836-{d_slug}", slug, f"CMT Mecha HM Recto Serie 836 {d}/16 {cod}", cod,
        f"Mecha CMT serie 836 HM dientes rectos. Diametro {d}/16. L.corte {lc}. L.mecha {lm}. {z} dientes. Eje {e}. Codigo {cod}.",
        f"Mecha CMT HM recto 836 {d}/16.", "Meadas", "Meadas HM")

# SERIE 822 (Meadas HM dientes alternos)
for d, lc, lm, z, e, cod in [
    ("1/4", "3/4", "2-1/4", "2", "1/4", "822.200.04"),
    ("5/16", "7/8", "2-1/2", "2", "1/4", "822.250.04"),
    ("3/8", "1", "2-3/4", "2", "1/4", "822.300.04"),
    ("1/2", "1-1/4", "3-1/8", "2", "1/4", "822.400.04"),
    ("5/8", "1-7/16", "3-1/2", "2", "1/4", "822.500.04"),
    ("3/4", "1-3/4", "4", "2", "3/8", "822.600.04"),
]:
    d_slug = d.replace('/', '-')
    slug = f"cmt-mecha-822-{d_slug}-{cod.lower()}"
    add(f"cmt-822-{d_slug}", slug, f"CMT Mecha HM Alterno Serie 822 {d}/16 {cod}", cod,
        f"Mecha CMT serie 822 HM dientes alternos. Diametro {d}/16. L.corte {lc}. L.mecha {lm}. {z} dientes. Eje {e}. Codigo {cod}.",
        f"Mecha CMT HM alterno 822 {d}/16.", "Meadas", "Meadas HM")

# SERIE 850 (Meadas HM para madera)
for d, lc, lm, z, e, cod in [
    ("1/4", "3/4", "2-1/4", "2", "1/4", "850.200.04"),
    ("5/16", "7/8", "2-1/2", "2", "1/4", "850.250.04"),
    ("3/8", "1", "2-3/4", "2", "1/4", "850.300.04"),
    ("1/2", "1-1/4", "3-1/8", "2", "1/4", "850.400.04"),
    ("5/8", "1-7/16", "3-1/2", "2", "1/4", "850.500.04"),
    ("3/4", "1-3/4", "4", "2", "3/8", "850.600.04"),
]:
    d_slug = d.replace('/', '-')
    slug = f"cmt-mecha-850-{d_slug}-{cod.lower()}"
    add(f"cmt-850-{d_slug}", slug, f"CMT Mecha HM Madera Serie 850 {d}/16 {cod}", cod,
        f"Mecha CMT serie 850 HM para madera. Diametro {d}/16. L.corte {lc}. L.mecha {lm}. {z} dientes. Eje {e}. Codigo {cod}.",
        f"Mecha CMT HM madera 850 {d}/16.", "Meadas", "Meadas HM")

# SERIE 855 (Meadas HM para composite)
for d, lc, lm, z, e, cod in [
    ("1/4", "3/4", "2-1/4", "2", "1/4", "855.200.04"),
    ("5/16", "7/8", "2-1/2", "2", "1/4", "855.250.04"),
    ("3/8", "1", "2-3/4", "2", "1/4", "855.300.04"),
    ("1/2", "1-1/4", "3-1/8", "2", "1/4", "855.400.04"),
]:
    d_slug = d.replace('/', '-')
    slug = f"cmt-mecha-855-{d_slug}-{cod.lower()}"
    add(f"cmt-855-{d_slug}", slug, f"CMT Mecha HM Composite Serie 855 {d}/16 {cod}", cod,
        f"Mecha CMT serie 855 HM para composite. Diametro {d}/16. L.corte {lc}. L.mecha {lm}. {z} dientes. Eje {e}. Codigo {cod}.",
        f"Mecha CMT HM composite 855 {d}/16.", "Meadas", "Meadas HM")

# SERIE 865 (Meadas HM para laminados)
for d, lc, lm, z, e, cod in [
    ("1/4", "3/4", "2-1/4", "2", "1/4", "865.200.04"),
    ("3/8", "1", "2-3/4", "2", "1/4", "865.300.04"),
    ("1/2", "1-1/4", "3-1/8", "2", "1/4", "865.400.04"),
]:
    d_slug = d.replace('/', '-')
    slug = f"cmt-mecha-865-{d_slug}-{cod.lower()}"
    add(f"cmt-865-{d_slug}", slug, f"CMT Mecha HM Laminados Serie 865 {d}/16 {cod}", cod,
        f"Mecha CMT serie 865 HM para laminados. Diametro {d}/16. L.corte {lc}. L.mecha {lm}. {z} dientes. Eje {e}. Codigo {cod}.",
        f"Mecha CMT HM laminados 865 {d}/16.", "Meadas", "Meadas HM")

# SERIE 816 (Meadas HSS doble)
for d, lc, lm, z, e, cod in [
    ("1/4", "3/4", "2-1/4", "2+2", "1/4", "816.200.04"),
    ("5/16", "7/8", "2-1/2", "2+2", "1/4", "816.250.04"),
    ("3/8", "1", "2-3/4", "2+2", "1/4", "816.300.04"),
    ("1/2", "1-1/4", "3-1/8", "2+2", "1/4", "816.400.04"),
]:
    d_slug = d.replace('/', '-')
    slug = f"cmt-mecha-816-{d_slug}-{cod.lower()}"
    add(f"cmt-816-{d_slug}", slug, f"CMT Mecha HSS Doble Serie 816 {d}/16 {cod}", cod,
        f"Mecha CMT serie 816 HSS doble. Diametro {d}/16. L.corte {lc}. L.mecha {lm}. {z} dientes. Eje {e}. Codigo {cod}.",
        f"Mecha CMT HSS doble 816 {d}/16.", "Meadas", "Meadas HSS")

# SERIE 815 (Meadas HSS 10 dientes)
for d, lc, lm, z, e, cod in [
    ("1/4", "3/4", "2-1/4", "10", "1/4", "815.200.04"),
    ("5/16", "7/8", "2-1/2", "10", "1/4", "815.250.04"),
    ("3/8", "1", "2-3/4", "10", "1/4", "815.300.04"),
    ("1/2", "1-1/4", "3-1/8", "10", "1/4", "815.400.04"),
]:
    d_slug = d.replace('/', '-')
    slug = f"cmt-mecha-815-{d_slug}-{cod.lower()}"
    add(f"cmt-815-{d_slug}", slug, f"CMT Mecha HSS 10 Dientes Serie 815 {d}/16 {cod}", cod,
        f"Mecha CMT serie 815 HSS 10 dientes. Diametro {d}/16. L.corte {lc}. L.mecha {lm}. {z} dientes. Eje {e}. Codigo {cod}.",
        f"Mecha CMT HSS 10d 815 {d}/16.", "Meadas", "Meadas HSS")

# SERIE 827 (Meadas HM 6 dientes)
for d, lc, lm, z, e, cod in [
    ("1/4", "3/4", "2-1/4", "6", "1/4", "827.200.04"),
    ("5/16", "7/8", "2-1/2", "6", "1/4", "827.250.04"),
    ("3/8", "1", "2-3/4", "6", "1/4", "827.300.04"),
    ("1/2", "1-1/4", "3-1/8", "6", "1/4", "827.400.04"),
]:
    d_slug = d.replace('/', '-')
    slug = f"cmt-mecha-827-{d_slug}-{cod.lower()}"
    add(f"cmt-827-{d_slug}", slug, f"CMT Mecha HM 6 Dientes Serie 827 {d}/16 {cod}", cod,
        f"Mecha CMT serie 827 HM 6 dientes. Diametro {d}/16. L.corte {lc}. L.mecha {lm}. {z} dientes. Eje {e}. Codigo {cod}.",
        f"Mecha CMT HM 6d 827 {d}/16.", "Meadas", "Meadas HM")

# SERIE 838 (Meadas HM 4 dientes)
for d, lc, lm, z, e, cod in [
    ("1/4", "3/4", "2-1/4", "4", "1/4", "838.200.04"),
    ("5/16", "7/8", "2-1/2", "4", "1/4", "838.250.04"),
    ("3/8", "1", "2-3/4", "4", "1/4", "838.300.04"),
    ("1/2", "1-1/4", "3-1/8", "4", "1/4", "838.400.04"),
]:
    d_slug = d.replace('/', '-')
    slug = f"cmt-mecha-838-{d_slug}-{cod.lower()}"
    add(f"cmt-838-{d_slug}", slug, f"CMT Mecha HM 4 Dientes Serie 838 {d}/16 {cod}", cod,
        f"Mecha CMT serie 838 HM 4 dientes. Diametro {d}/16. L.corte {lc}. L.mecha {lm}. {z} dientes. Eje {e}. Codigo {cod}.",
        f"Mecha CMT HM 4d 838 {d}/16.", "Meadas", "Meadas HM")

# SERIE 814 (Meadas HSS 3 dientes)
for d, lc, lm, z, e, cod in [
    ("1/4", "3/4", "2-1/4", "3", "1/4", "814.200.04"),
    ("5/16", "7/8", "2-1/2", "3", "1/4", "814.250.04"),
    ("3/8", "1", "2-3/4", "3", "1/4", "814.300.04"),
    ("1/2", "1-1/4", "3-1/8", "3", "1/4", "814.400.04"),
]:
    d_slug = d.replace('/', '-')
    slug = f"cmt-mecha-814-{d_slug}-{cod.lower()}"
    add(f"cmt-814-{d_slug}", slug, f"CMT Mecha HSS 3 Dientes Serie 814 {d}/16 {cod}", cod,
        f"Mecha CMT serie 814 HSS 3 dientes. Diametro {d}/16. L.corte {lc}. L.mecha {lm}. {z} dientes. Eje {e}. Codigo {cod}.",
        f"Mecha CMT HSS 3d 814 {d}/16.", "Meadas", "Meadas HSS")

# SERIE 849 (Meadas HM para melamina)
for d, lc, lm, z, e, cod in [
    ("1/4", "3/4", "2-1/4", "2", "1/4", "849.200.04"),
    ("3/8", "1", "2-3/4", "2", "1/4", "849.300.04"),
    ("1/2", "1-1/4", "3-1/8", "2", "1/4", "849.400.04"),
]:
    d_slug = d.replace('/', '-')
    slug = f"cmt-mecha-849-{d_slug}-{cod.lower()}"
    add(f"cmt-849-{d_slug}", slug, f"CMT Mecha HM Melamina Serie 849 {d}/16 {cod}", cod,
        f"Mecha CMT serie 849 HM para melamina. Diametro {d}/16. L.corte {lc}. L.mecha {lm}. {z} dientes. Eje {e}. Codigo {cod}.",
        f"Mecha CMT HM melamina 849 {d}/16.", "Meadas", "Meadas HM")

# SERIE 851 (Meadas HM para MDF)
for d, lc, lm, z, e, cod in [
    ("1/4", "3/4", "2-1/4", "2", "1/4", "851.200.04"),
    ("3/8", "1", "2-3/4", "2", "1/4", "851.300.04"),
    ("1/2", "1-1/4", "3-1/8", "2", "1/4", "851.400.04"),
]:
    d_slug = d.replace('/', '-')
    slug = f"cmt-mecha-851-{d_slug}-{cod.lower()}"
    add(f"cmt-851-{d_slug}", slug, f"CMT Mecha HM MDF Serie 851 {d}/16 {cod}", cod,
        f"Mecha CMT serie 851 HM para MDF. Diametro {d}/16. L.corte {lc}. L.mecha {lm}. {z} dientes. Eje {e}. Codigo {cod}.",
        f"Mecha CMT HM MDF 851 {d}/16.", "Meadas", "Meadas HM")

# SERIE 837 (Meadas HM doble)
for d, lc, lm, z, e, cod in [
    ("1/4", "3/4", "2-1/4", "2+2", "1/4", "837.200.04"),
    ("5/16", "7/8", "2-1/2", "2+2", "1/4", "837.250.04"),
    ("3/8", "1", "2-3/4", "2+2", "1/4", "837.300.04"),
    ("1/2", "1-1/4", "3-1/8", "2+2", "1/4", "837.400.04"),
]:
    d_slug = d.replace('/', '-')
    slug = f"cmt-mecha-837-{d_slug}-{cod.lower()}"
    add(f"cmt-837-{d_slug}", slug, f"CMT Mecha HM Doble Serie 837 {d}/16 {cod}", cod,
        f"Mecha CMT serie 837 HM doble. Diametro {d}/16. L.corte {lc}. L.mecha {lm}. {z} dientes. Eje {e}. Codigo {cod}.",
        f"Mecha CMT HM doble 837 {d}/16.", "Meadas", "Meadas HM")

# SERIE 863 (Meadas HM para tubos PVC)
for d, lc, lm, z, e, cod in [
    ("1/4", "3/4", "2-1/4", "2", "1/4", "863.200.04"),
    ("3/8", "1", "2-3/4", "2", "1/4", "863.300.04"),
    ("1/2", "1-1/4", "3-1/8", "2", "1/4", "863.400.04"),
]:
    d_slug = d.replace('/', '-')
    slug = f"cmt-mecha-863-{d_slug}-{cod.lower()}"
    add(f"cmt-863-{d_slug}", slug, f"CMT Mecha HM PVC Serie 863 {d}/16 {cod}", cod,
        f"Mecha CMT serie 863 HM para tubos PVC. Diametro {d}/16. L.corte {lc}. L.mecha {lm}. {z} dientes. Eje {e}. Codigo {cod}.",
        f"Mecha CMT HM PVC 863 {d}/16.", "Meadas", "Meadas HM")

# SERIE 868 (Meadas HM para acero inoxidable)
for d, lc, lm, z, e, cod in [
    ("1/8", "3/8", "1-1/2", "2", "1/4", "868.100.04"),
    ("3/16", "9/16", "2", "2", "1/4", "868.150.04"),
    ("1/4", "3/4", "2-1/4", "2", "1/4", "868.200.04"),
    ("3/8", "1", "2-3/4", "2", "1/4", "868.300.04"),
    ("1/2", "1-1/4", "3-1/8", "2", "1/4", "868.400.04"),
]:
    d_slug = d.replace('/', '-')
    slug = f"cmt-mecha-868-{d_slug}-{cod.lower()}"
    add(f"cmt-868-{d_slug}", slug, f"CMT Mecha HM Acero Inoxidable Serie 868 {d}/16 {cod}", cod,
        f"Mecha CMT serie 868 HM para acero inoxidable. Diametro {d}/16. L.corte {lc}. L.mecha {lm}. {z} dientes. Eje {e}. Codigo {cod}.",
        f"Mecha CMT HM inox 868 {d}/16.", "Meadas", "Meadas HM")

# SERIE 890 (Meadas HSS para plastico)
for d, lc, lm, z, e, cod in [
    ("1/4", "3/4", "2-1/4", "4", "1/4", "890.200.04"),
    ("3/8", "1", "2-3/4", "4", "1/4", "890.300.04"),
    ("1/2", "1-1/4", "3-1/8", "4", "1/4", "890.400.04"),
]:
    d_slug = d.replace('/', '-')
    slug = f"cmt-mecha-890-{d_slug}-{cod.lower()}"
    add(f"cmt-890-{d_slug}", slug, f"CMT Mecha HSS Plastico Serie 890 {d}/16 {cod}", cod,
        f"Mecha CMT serie 890 HSS para plastico. Diametro {d}/16. L.corte {lc}. L.mecha {lm}. {z} dientes. Eje {e}. Codigo {cod}.",
        f"Mecha CMT HSS plastico 890 {d}/16.", "Meadas", "Meadas HSS")

# SERIE 891 (Meadas HSS para goma)
for d, lc, lm, z, e, cod in [
    ("1/4", "3/4", "2-1/4", "4", "1/4", "891.200.04"),
    ("3/8", "1", "2-3/4", "4", "1/4", "891.300.04"),
    ("1/2", "1-1/4", "3-1/8", "4", "1/4", "891.400.04"),
]:
    d_slug = d.replace('/', '-')
    slug = f"cmt-mecha-891-{d_slug}-{cod.lower()}"
    add(f"cmt-891-{d_slug}", slug, f"CMT Mecha HSS Goma Serie 891 {d}/16 {cod}", cod,
        f"Mecha CMT serie 891 HSS para goma. Diametro {d}/16. L.corte {lc}. L.mecha {lm}. {z} dientes. Eje {e}. Codigo {cod}.",
        f"Mecha CMT HSS goma 891 {d}/16.", "Meadas", "Meadas HSS")

# SERIE 615 (Meadas HSS 3 flautas)
for d, lc, lm, z, e, cod in [
    ("1/8", "3/8", "1-1/2", "3", "1/4", "615.100.04"),
    ("5/32", "7/16", "1-3/4", "3", "1/4", "615.125.04"),
    ("3/16", "9/16", "2", "3", "1/4", "615.150.04"),
    ("1/4", "3/4", "2-1/4", "3", "1/4", "615.200.04"),
    ("5/16", "7/8", "2-1/2", "3", "1/4", "615.250.04"),
    ("3/8", "1", "2-3/4", "3", "1/4", "615.300.04"),
    ("1/2", "1-1/4", "3-1/8", "3", "1/4", "615.400.04"),
]:
    d_slug = d.replace('/', '-')
    slug = f"cmt-mecha-615-{d_slug}-{cod.lower()}"
    add(f"cmt-615-{d_slug}", slug, f"CMT Mecha HSS 3 Flautas Serie 615 {d}/16 {cod}", cod,
        f"Mecha CMT serie 615 HSS 3 flautas. Diametro {d}/16. L.corte {lc}. L.mecha {lm}. {z} flautas. Eje {e}. Codigo {cod}.",
        f"Mecha CMT HSS 3fl 615 {d}/16.", "Meadas", "Meadas HSS")

# SERIE 690 (Meadas HSS 2 flautas)
for d, lc, lm, z, e, cod in [
    ("1/8", "3/8", "1-1/2", "2", "1/4", "690.100.04"),
    ("5/32", "7/16", "1-3/4", "2", "1/4", "690.125.04"),
    ("3/16", "9/16", "2", "2", "1/4", "690.150.04"),
    ("1/4", "3/4", "2-1/4", "2", "1/4", "690.200.04"),
    ("5/16", "7/8", "2-1/2", "2", "1/4", "690.250.04"),
    ("3/8", "1", "2-3/4", "2", "1/4", "690.300.04"),
    ("1/2", "1-1/4", "3-1/8", "2", "1/4", "690.400.04"),
]:
    d_slug = d.replace('/', '-')
    slug = f"cmt-mecha-690-{d_slug}-{cod.lower()}"
    add(f"cmt-690-{d_slug}", slug, f"CMT Mecha HSS 2 Flautas Serie 690 {d}/16 {cod}", cod,
        f"Mecha CMT serie 690 HSS 2 flautas. Diametro {d}/16. L.corte {lc}. L.mecha {lm}. {z} flautas. Eje {e}. Codigo {cod}.",
        f"Mecha CMT HSS 2fl 690 {d}/16.", "Meadas", "Meadas HSS")

# SERIE 69 (Meadas HM 3 flautas)
for d, lc, lm, z, e, cod in [
    ("1/8", "3/8", "1-1/2", "3", "1/4", "69.100.04"),
    ("5/32", "7/16", "1-3/4", "3", "1/4", "69.125.04"),
    ("3/16", "9/16", "2", "3", "1/4", "69.150.04"),
    ("1/4", "3/4", "2-1/4", "3", "1/4", "69.200.04"),
    ("5/16", "7/8", "2-1/2", "3", "1/4", "69.250.04"),
    ("3/8", "1", "2-3/4", "3", "1/4", "69.300.04"),
    ("1/2", "1-1/4", "3-1/8", "3", "1/4", "69.400.04"),
]:
    d_slug = d.replace('/', '-')
    slug = f"cmt-mecha-69-{d_slug}-{cod.lower()}"
    add(f"cmt-69-{d_slug}", slug, f"CMT Mecha HM 3 Flautas Serie 69 {d}/16 {cod}", cod,
        f"Mecha CMT serie 69 HM 3 flautas. Diametro {d}/16. L.corte {lc}. L.mecha {lm}. {z} flautas. Eje {e}. Codigo {cod}.",
        f"Mecha CMT HM 3fl 69 {d}/16.", "Meadas", "Meadas HM")

# SERIE 856 (Meadas HM para PVC)
for d, lc, lm, z, e, cod in [
    ("1/4", "3/4", "2-1/4", "2", "1/4", "856.200.04"),
    ("3/8", "1", "2-3/4", "2", "1/4", "856.300.04"),
    ("1/2", "1-1/4", "3-1/8", "2", "1/4", "856.400.04"),
]:
    d_slug = d.replace('/', '-')
    slug = f"cmt-mecha-856-{d_slug}-{cod.lower()}"
    add(f"cmt-856-{d_slug}", slug, f"CMT Mecha HM PVC Serie 856 {d}/16 {cod}", cod,
        f"Mecha CMT serie 856 HM para PVC. Diametro {d}/16. L.corte {lc}. L.mecha {lm}. {z} dientes. Eje {e}. Codigo {cod}.",
        f"Mecha CMT HM PVC 856 {d}/16.", "Meadas", "Meadas HM")

# SERIE 858 (Meadas HM para aglomerado)
for d, lc, lm, z, e, cod in [
    ("1/4", "3/4", "2-1/4", "2", "1/4", "858.200.04"),
    ("3/8", "1", "2-3/4", "2", "1/4", "858.300.04"),
    ("1/2", "1-1/4", "3-1/8", "2", "1/4", "858.400.04"),
]:
    d_slug = d.replace('/', '-')
    slug = f"cmt-mecha-858-{d_slug}-{cod.lower()}"
    add(f"cmt-858-{d_slug}", slug, f"CMT Mecha HM Aglomerado Serie 858 {d}/16 {cod}", cod,
        f"Mecha CMT serie 858 HM para aglomerado. Diametro {d}/16. L.corte {lc}. L.mecha {lm}. {z} dientes. Eje {e}. Codigo {cod}.",
        f"Mecha CMT HM aglomerado 858 {d}/16.", "Meadas", "Meadas HM")

# SERIE 859 (Meadas HM para triplay)
for d, lc, lm, z, e, cod in [
    ("1/4", "3/4", "2-1/4", "2", "1/4", "859.200.04"),
    ("3/8", "1", "2-3/4", "2", "1/4", "859.300.04"),
    ("1/2", "1-1/4", "3-1/8", "2", "1/4", "859.400.04"),
]:
    d_slug = d.replace('/', '-')
    slug = f"cmt-mecha-859-{d_slug}-{cod.lower()}"
    add(f"cmt-859-{d_slug}", slug, f"CMT Mecha HM Triplay Serie 859 {d}/16 {cod}", cod,
        f"Mecha CMT serie 859 HM para triplay. Diametro {d}/16. L.corte {lc}. L.mecha {lm}. {z} dientes. Eje {e}. Codigo {cod}.",
        f"Mecha CMT HM triplay 859 {d}/16.", "Meadas", "Meadas HM")

# SERIE 840 (Meadas HM para fibra)
for d, lc, lm, z, e, cod in [
    ("1/4", "3/4", "2-1/4", "2", "1/4", "840.200.04"),
    ("3/8", "1", "2-3/4", "2", "1/4", "840.300.04"),
    ("1/2", "1-1/4", "3-1/8", "2", "1/4", "840.400.04"),
]:
    d_slug = d.replace('/', '-')
    slug = f"cmt-mecha-840-{d_slug}-{cod.lower()}"
    add(f"cmt-840-{d_slug}", slug, f"CMT Mecha HM Fibra Serie 840 {d}/16 {cod}", cod,
        f"Mecha CMT serie 840 HM para fibra. Diametro {d}/16. L.corte {lc}. L.mecha {lm}. {z} dientes. Eje {e}. Codigo {cod}.",
        f"Mecha CMT HM fibra 840 {d}/16.", "Meadas", "Meadas HM")

# SERIE 841 (Meadas HM para OSB)
for d, lc, lm, z, e, cod in [
    ("1/4", "3/4", "2-1/4", "2", "1/4", "841.200.04"),
    ("3/8", "1", "2-3/4", "2", "1/4", "841.300.04"),
    ("1/2", "1-1/4", "3-1/8", "2", "1/4", "841.400.04"),
]:
    d_slug = d.replace('/', '-')
    slug = f"cmt-mecha-841-{d_slug}-{cod.lower()}"
    add(f"cmt-841-{d_slug}", slug, f"CMT Mecha HM OSB Serie 841 {d}/16 {cod}", cod,
        f"Mecha CMT serie 841 HM para OSB. Diametro {d}/16. L.corte {lc}. L.mecha {lm}. {z} dientes. Eje {e}. Codigo {cod}.",
        f"Mecha CMT HM OSB 841 {d}/16.", "Meadas", "Meadas HM")

# SERIE 844 (Meadas HM para cuarzo)
for d, lc, lm, z, e, cod in [
    ("1/4", "3/4", "2-1/4", "2", "1/4", "844.200.04"),
    ("3/8", "1", "2-3/4", "2", "1/4", "844.300.04"),
    ("1/2", "1-1/4", "3-1/8", "2", "1/4", "844.400.04"),
]:
    d_slug = d.replace('/', '-')
    slug = f"cmt-mecha-844-{d_slug}-{cod.lower()}"
    add(f"cmt-844-{d_slug}", slug, f"CMT Mecha HM Cuarzo Serie 844 {d}/16 {cod}", cod,
        f"Mecha CMT serie 844 HM para cuarzo. Diametro {d}/16. L.corte {lc}. L.mecha {lm}. {z} dientes. Eje {e}. Codigo {cod}.",
        f"Mecha CMT HM cuarzo 844 {d}/16.", "Meadas", "Meadas HM")

# SERIE 846 (Meadas HM para granito)
for d, lc, lm, z, e, cod in [
    ("1/4", "3/4", "2-1/4", "2", "1/4", "846.200.04"),
    ("3/8", "1", "2-3/4", "2", "1/4", "846.300.04"),
    ("1/2", "1-1/4", "3-1/8", "2", "1/4", "846.400.04"),
]:
    d_slug = d.replace('/', '-')
    slug = f"cmt-mecha-846-{d_slug}-{cod.lower()}"
    add(f"cmt-846-{d_slug}", slug, f"CMT Mecha HM Granito Serie 846 {d}/16 {cod}", cod,
        f"Mecha CMT serie 846 HM para granito. Diametro {d}/16. L.corte {lc}. L.mecha {lm}. {z} dientes. Eje {e}. Codigo {cod}.",
        f"Mecha CMT HM granito 846 {d}/16.", "Meadas", "Meadas HM")

# SERIE 529 (Meadas HSS para aluminio 3 flautas)
for d, lc, lm, z, e, cod in [
    ("1/8", "3/8", "1-1/2", "3", "1/4", "529.100.04"),
    ("5/32", "7/16", "1-3/4", "3", "1/4", "529.125.04"),
    ("3/16", "9/16", "2", "3", "1/4", "529.150.04"),
    ("1/4", "3/4", "2-1/4", "3", "1/4", "529.200.04"),
    ("5/16", "7/8", "2-1/2", "3", "1/4", "529.250.04"),
    ("3/8", "1", "2-3/4", "3", "1/4", "529.300.04"),
    ("1/2", "1-1/4", "3-1/8", "3", "1/4", "529.400.04"),
]:
    d_slug = d.replace('/', '-')
    slug = f"cmt-mecha-529-{d_slug}-{cod.lower()}"
    add(f"cmt-529-{d_slug}", slug, f"CMT Mecha HSS Aluminio 3 Flautas Serie 529 {d}/16 {cod}", cod,
        f"Mecha CMT serie 529 HSS aluminio 3 flautas. Diametro {d}/16. L.corte {lc}. L.mecha {lm}. {z} flautas. Eje {e}. Codigo {cod}.",
        f"Mecha CMT HSS aluminio 3fl 529 {d}/16.", "Meadas", "Meadas HSS")

# SERIE 530 (Meadas HSS para acero 3 flautas)
for d, lc, lm, z, e, cod in [
    ("1/8", "3/8", "1-1/2", "3", "1/4", "530.100.04"),
    ("5/32", "7/16", "1-3/4", "3", "1/4", "530.125.04"),
    ("3/16", "9/16", "2", "3", "1/4", "530.150.04"),
    ("1/4", "3/4", "2-1/4", "3", "1/4", "530.200.04"),
    ("5/16", "7/8", "2-1/2", "3", "1/4", "530.250.04"),
    ("3/8", "1", "2-3/4", "3", "1/4", "530.300.04"),
    ("1/2", "1-1/4", "3-1/8", "3", "1/4", "530.400.04"),
]:
    d_slug = d.replace('/', '-')
    slug = f"cmt-mecha-530-{d_slug}-{cod.lower()}"
    add(f"cmt-530-{d_slug}", slug, f"CMT Mecha HSS Acero 3 Flautas Serie 530 {d}/16 {cod}", cod,
        f"Mecha CMT serie 530 HSS acero 3 flautas. Diametro {d}/16. L.corte {lc}. L.mecha {lm}. {z} flautas. Eje {e}. Codigo {cod}.",
        f"Mecha CMT HSS acero 3fl 530 {d}/16.", "Meadas", "Meadas HSS")

# SERIE 537 (Meadas HM para acero 3 flautas)
for d, lc, lm, z, e, cod in [
    ("1/8", "3/8", "1-1/2", "3", "1/4", "537.100.04"),
    ("5/32", "7/16", "1-3/4", "3", "1/4", "537.125.04"),
    ("3/16", "9/16", "2", "3", "1/4", "537.150.04"),
    ("1/4", "3/4", "2-1/4", "3", "1/4", "537.200.04"),
    ("5/16", "7/8", "2-1/2", "3", "1/4", "537.250.04"),
    ("3/8", "1", "2-3/4", "3", "1/4", "537.300.04"),
    ("1/2", "1-1/4", "3-1/8", "3", "1/4", "537.400.04"),
]:
    d_slug = d.replace('/', '-')
    slug = f"cmt-mecha-537-{d_slug}-{cod.lower()}"
    add(f"cmt-537-{d_slug}", slug, f"CMT Mecha HM Acero 3 Flautas Serie 537 {d}/16 {cod}", cod,
        f"Mecha CMT serie 537 HM acero 3 flautas. Diametro {d}/16. L.corte {lc}. L.mecha {lm}. {z} flautas. Eje {e}. Codigo {cod}.",
        f"Mecha CMT HM acero 3fl 537 {d}/16.", "Meadas", "Meadas HM")

# SERIE 521 (Meadas HM para hierro 3 flautas)
for d, lc, lm, z, e, cod in [
    ("1/8", "3/8", "1-1/2", "3", "1/4", "521.100.04"),
    ("5/32", "7/16", "1-3/4", "3", "1/4", "521.125.04"),
    ("3/16", "9/16", "2", "3", "1/4", "521.150.04"),
    ("1/4", "3/4", "2-1/4", "3", "1/4", "521.200.04"),
    ("5/16", "7/8", "2-1/2", "3", "1/4", "521.250.04"),
    ("3/8", "1", "2-3/4", "3", "1/4", "521.300.04"),
    ("1/2", "1-1/4", "3-1/8", "3", "1/4", "521.400.04"),
]:
    d_slug = d.replace('/', '-')
    slug = f"cmt-mecha-521-{d_slug}-{cod.lower()}"
    add(f"cmt-521-{d_slug}", slug, f"CMT Mecha HM Hierro 3 Flautas Serie 521 {d}/16 {cod}", cod,
        f"Mecha CMT serie 521 HM hierro 3 flautas. Diametro {d}/16. L.corte {lc}. L.mecha {lm}. {z} flautas. Eje {e}. Codigo {cod}.",
        f"Mecha CMT HM hierro 3fl 521 {d}/16.", "Meadas", "Meadas HM")

# SERIE 543 (Meadas HSS para titanium)
for d, lc, lm, z, e, cod in [
    ("1/8", "3/8", "1-1/2", "3", "1/4", "543.100.04"),
    ("5/32", "7/16", "1-3/4", "3", "1/4", "543.125.04"),
    ("3/16", "9/16", "2", "3", "1/4", "543.150.04"),
    ("1/4", "3/4", "2-1/4", "3", "1/4", "543.200.04"),
    ("5/16", "7/8", "2-1/2", "3", "1/4", "543.250.04"),
    ("3/8", "1", "2-3/4", "3", "1/4", "543.300.04"),
    ("1/2", "1-1/4", "3-1/8", "3", "1/4", "543.400.04"),
]:
    d_slug = d.replace('/', '-')
    slug = f"cmt-mecha-543-{d_slug}-{cod.lower()}"
    add(f"cmt-543-{d_slug}", slug, f"CMT Mecha HSS Titanium Serie 543 {d}/16 {cod}", cod,
        f"Mecha CMT serie 543 HSS titanium. Diametro {d}/16. L.corte {lc}. L.mecha {lm}. {z} flautas. Eje {e}. Codigo {cod}.",
        f"Mecha CMT HSS titanium 543 {d}/16.", "Meadas", "Meadas HSS")

# SERIE 372 (Meadas HSS 4 flautas)
for d, lc, lm, z, e, cod in [
    ("1/8", "3/8", "1-1/2", "4", "1/4", "372.100.04"),
    ("5/32", "7/16", "1-3/4", "4", "1/4", "372.125.04"),
    ("3/16", "9/16", "2", "4", "1/4", "372.150.04"),
    ("1/4", "3/4", "2-1/4", "4", "1/4", "372.200.04"),
    ("5/16", "7/8", "2-1/2", "4", "1/4", "372.250.04"),
    ("3/8", "1", "2-3/4", "4", "1/4", "372.300.04"),
    ("1/2", "1-1/4", "3-1/8", "4", "1/4", "372.400.04"),
]:
    d_slug = d.replace('/', '-')
    slug = f"cmt-mecha-372-{d_slug}-{cod.lower()}"
    add(f"cmt-372-{d_slug}", slug, f"CMT Mecha HSS 4 Flautas Serie 372 {d}/16 {cod}", cod,
        f"Mecha CMT serie 372 HSS 4 flautas. Diametro {d}/16. L.corte {lc}. L.mecha {lm}. {z} flautas. Eje {e}. Codigo {cod}.",
        f"Mecha CMT HSS 4fl 372 {d}/16.", "Meadas", "Meadas HSS")

# SERIE 663 (Meadas HSS para madera 2 flautas)
for d, lc, lm, z, e, cod in [
    ("1/8", "3/8", "1-1/2", "2", "1/4", "663.100.04"),
    ("5/32", "7/16", "1-3/4", "2", "1/4", "663.125.04"),
    ("3/16", "9/16", "2", "2", "1/4", "663.150.04"),
    ("1/4", "3/4", "2-1/4", "2", "1/4", "663.200.04"),
    ("5/16", "7/8", "2-1/2", "2", "1/4", "663.250.04"),
    ("3/8", "1", "2-3/4", "2", "1/4", "663.300.04"),
    ("1/2", "1-1/4", "3-1/8", "2", "1/4", "663.400.04"),
]:
    d_slug = d.replace('/', '-')
    slug = f"cmt-mecha-663-{d_slug}-{cod.lower()}"
    add(f"cmt-663-{d_slug}", slug, f"CMT Mecha HSS Madera 2 Flautas Serie 663 {d}/16 {cod}", cod,
        f"Mecha CMT serie 663 HSS madera 2 flautas. Diametro {d}/16. L.corte {lc}. L.mecha {lm}. {z} flautas. Eje {e}. Codigo {cod}.",
        f"Mecha CMT HSS madera 2fl 663 {d}/16.", "Meadas", "Meadas HSS")

# SERIE 694 (Meadas HM para madera 2 flautas)
for d, lc, lm, z, e, cod in [
    ("1/8", "3/8", "1-1/2", "2", "1/4", "694.100.04"),
    ("5/32", "7/16", "1-3/4", "2", "1/4", "694.125.04"),
    ("3/16", "9/16", "2", "2", "1/4", "694.150.04"),
    ("1/4", "3/4", "2-1/4", "2", "1/4", "694.200.04"),
    ("5/16", "7/8", "2-1/2", "2", "1/4", "694.250.04"),
    ("3/8", "1", "2-3/4", "2", "1/4", "694.300.04"),
    ("1/2", "1-1/4", "3-1/8", "2", "1/4", "694.400.04"),
]:
    d_slug = d.replace('/', '-')
    slug = f"cmt-mecha-694-{d_slug}-{cod.lower()}"
    add(f"cmt-694-{d_slug}", slug, f"CMT Mecha HM Madera 2 Flautas Serie 694 {d}/16 {cod}", cod,
        f"Mecha CMT serie 694 HM madera 2 flautas. Diametro {d}/16. L.corte {lc}. L.mecha {lm}. {z} flautas. Eje {e}. Codigo {cod}.",
        f"Mecha CMT HM madera 2fl 694 {d}/16.", "Meadas", "Meadas HM")

# =============================================
# MECHAS PANTOGRAFO
# =============================================

# SERIE 112 (Meadas para pantografo HSS)
for d, lc, lm, z, e, cod in [
    ("1/4", "3/4", "2-1/4", "2", "1/4", "112.200.04"),
    ("5/16", "7/8", "2-1/2", "2", "1/4", "112.250.04"),
    ("3/8", "1", "2-3/4", "2", "1/4", "112.300.04"),
    ("1/2", "1-1/4", "3-1/8", "2", "1/4", "112.400.04"),
]:
    d_slug = d.replace('/', '-')
    slug = f"cmt-mecha-pantografo-112-{d_slug}-{cod.lower()}"
    add(f"cmt-112-{d_slug}", slug, f"CMT Mecha Pantografo HSS Serie 112 {d}/16 {cod}", cod,
        f"Mecha CMT serie 112 pantografo HSS. Diametro {d}/16. L.corte {lc}. L.mecha {lm}. {z} dientes. Eje {e}. Codigo {cod}.",
        f"Mecha CMT pantografo HSS 112 {d}/16.", "Meadas", "Meadas Pantografo")

# SERIE 113 (Meadas para pantografo HM)
for d, lc, lm, z, e, cod in [
    ("1/4", "3/4", "2-1/4", "2", "1/4", "113.200.04"),
    ("5/16", "7/8", "2-1/2", "2", "1/4", "113.250.04"),
    ("3/8", "1", "2-3/4", "2", "1/4", "113.300.04"),
    ("1/2", "1-1/4", "3-1/8", "2", "1/4", "113.400.04"),
]:
    d_slug = d.replace('/', '-')
    slug = f"cmt-mecha-pantografo-113-{d_slug}-{cod.lower()}"
    add(f"cmt-113-{d_slug}", slug, f"CMT Mecha Pantografo HM Serie 113 {d}/16 {cod}", cod,
        f"Mecha CMT serie 113 pantografo HM. Diametro {d}/16. L.corte {lc}. L.mecha {lm}. {z} dientes. Eje {e}. Codigo {cod}.",
        f"Mecha CMT pantografo HM 113 {d}/16.", "Meadas", "Meadas Pantografo")

print(f"Generated {len(lines)} CMT products (Part 2 - Mechas)")

# Insert into products.ts
with open(FILEPATH, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the end of the products array (just before "export const productCategories")
marker = "export const productCategories"
insert_pos = content.rfind(marker)
if insert_pos == -1:
    print("ERROR: Could not find insertion point")
else:
    # Back up to find the ]; before it
    back_pos = content.rfind("];", 0, insert_pos)
    if back_pos == -1:
        print("ERROR: Could not find ]; before productCategories")
    else:
        new_block = "\n" + "\n".join(lines) + "\n"
        new_content = content[:back_pos + 2] + new_block + content[back_pos + 2:]
        with open(FILEPATH, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Successfully inserted {len(lines)} CMT mechas into products.ts")
