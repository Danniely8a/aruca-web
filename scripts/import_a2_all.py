"""
import_a2_all.py - Importa clientes, inventario/stock y precios desde A2 a Supabase
Lee directamente desde A2 vía ODBC (DBISAM 4) y actualiza:
  1. Clientes    : Sclientes                 -> tabla clients
  2. Inventario  : Sinventario + SinvDep     -> products.stock + a2inventory.json
  3. Precios     : a2InvCostosPrecios (P03)  -> products.price + a2inventory.json

Usage:
  py scripts/import_a2_all.py                 # Todo
  py scripts/import_a2_all.py --clientes      # Solo clientes
  py scripts/import_a2_all.py --inventario    # Solo inventario/stock
  py scripts/import_a2_all.py --precios       # Solo precios
  py scripts/import_a2_all.py --dry-run       # Mostrar sin escribir
"""
import os
import sys
import io
import json
import argparse

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SRC_DATA_DIR = os.path.join(BASE_DIR, 'aruca-web', 'src', 'lib', 'data')
A2INVENTORY_JSON = os.path.join(SRC_DATA_DIR, 'a2inventory.json')

env_path = os.path.join(BASE_DIR, 'aruca-web', '.env.local')
if os.path.exists(env_path):
    with open(env_path) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#') and '=' in line:
                key, value = line.split('=', 1)
                os.environ.setdefault(key.strip(), value.strip())

SUPABASE_URL = os.environ.get('NEXT_PUBLIC_SUPABASE_URL', '')
SUPABASE_KEY = os.environ.get('SUPABASE_SERVICE_ROLE_KEY', '')

A2_CONN_STR = (
    "DRIVER={DBISAM 4 ODBC Driver};"
    "ConnectionType=Local;"
    r"CatalogName=\\Arc-dc\a2_hac_aruca\Empre001\Data;"
)


def get_supabase():
    from supabase import create_client
    return create_client(SUPABASE_URL, SUPABASE_KEY)


def get_a2_conn():
    import pyodbc
    conn = pyodbc.connect(A2_CONN_STR, timeout=30)
    conn.setdecoding(pyodbc.SQL_CHAR, encoding='latin-1')
    conn.setdecoding(pyodbc.SQL_WCHAR, encoding='latin-1')
    return conn


def s(v):
    """Convert value to clean string."""
    if v is None:
        return ''
    return str(v).strip()


def f(v):
    """Convert value to clean float (0 if None/invalid)."""
    try:
        return float(v) if v is not None else 0.0
    except (ValueError, TypeError):
        return 0.0


# ─────────────────────────────────────────────────────────────
# CLIENTES
# ─────────────────────────────────────────────────────────────
def import_clientes(sb, dry_run=False):
    print('=== CLIENTES ===')
    conn = get_a2_conn()
    cur = conn.cursor()
    cur.execute(
        "SELECT FC_CODIGO, FC_DESCRIPCION, FC_RIF, FC_NIT, FC_TELEFONO, FC_TELEFAX, "
        "FC_EMAIL, FC_DIRECCION1, FC_CONTACTO, FC_VENDEDOR, FC_CLASIFICACION, "
        "FC_SALDO, FC_LIMITECREDITO, FC_DIASCREDITO, FC_MONEDA, FC_STATUS "
        "FROM Sclientes"
    )
    rows = cur.fetchall()
    conn.close()

    clients = []
    for r in rows:
        clients.append({
            'a2_code': s(r[0]),
            'name': s(r[1]),
            'rif': s(r[2]),
            'nit': s(r[3]),
            'phone': s(r[4]),
            'fax': s(r[5]),
            'email': s(r[6]),
            'address': s(r[7]),
            'contact': s(r[8]),
            'vendor_code': s(r[9]),
            'classification': s(r[10]),
            'balance': f(r[11]),
            'credit_limit': f(r[12]),
            'credit_days': int(f(r[13])),
            'currency': s(r[14]),
        })

    print('Clientes en A2:', len(clients))

    if dry_run:
        print('[DRY RUN] No se escribieron datos.')
        for c in clients[:3]:
            print('  ', c['a2_code'], '-', c['name'], '| vendedor:', c['vendor_code'])
        return

    batch = []
    batch_size = 500
    total = 0
    for c in clients:
        batch.append(c)
        if len(batch) >= batch_size:
            sb.table('clients').upsert(batch, on_conflict='a2_code').execute()
            total += len(batch)
            print('  Insertados/actualizados:', total)
            batch = []
    if batch:
        sb.table('clients').upsert(batch, on_conflict='a2_code').execute()
        total += len(batch)

    print('Clientes actualizados:', total)


# ─────────────────────────────────────────────────────────────
# INVENTARIO (stock) + PRECIOS  ->  a2inventory.json
# ─────────────────────────────────────────────────────────────
def import_inventario_precios(sb, dry_run=False):
    conn = get_a2_conn()
    cur = conn.cursor()

    # Precio de venta P01 extranjero (USD)
    print('=== PRECIOS E INVENTARIO ===')
    cur.execute("SELECT FIC_CODEITEM, FIC_P01PRECIOTOTALEXT, FIC_P03PRECIOTOTALEXT FROM a2InvCostosPrecios")
    precios = {}
    for r in cur.fetchall():
        code = s(r[0])
        p01_ext = f(r[1])  # precio de venta normal (USD)
        p03_ext = f(r[2])  # precio mayorista (USD)
        precio = p01_ext if p01_ext > 0 else p03_ext
        if precio > 0:
            precios[code] = precio

    print('Precios en A2:', len(precios))

    # Inventario: descripcion + marca + subcategoria
    cur.execute("SELECT FI_CODIGO, FI_DESCRIPCION, FI_MARCA, FI_SUBCATEGORIA, FI_MODELO, FI_STATUS FROM Sinventario")
    inventario = {}
    for r in cur.fetchall():
        code = s(r[0])
        inventario[code] = {
            'descripcion': s(r[1]),
            'marca': s(r[2]),
            'subcategoria': s(r[3]),
            'modelo': s(r[4]),
        }
    print('Productos en Sinventario:', len(inventario))

    # Stock: sumar existencia por producto (todos los depositos)
    cur.execute("SELECT FT_CODIGOPRODUCTO, FT_EXISTENCIA FROM SinvDep")
    stock_sum = {}
    for r in cur.fetchall():
        code = s(r[0])
        exist = f(r[1])
        if code not in stock_sum:
            stock_sum[code] = 0.0
        stock_sum[code] += exist
    print('Productos con stock en SinvDep:', len(stock_sum))
    conn.close()

    # Construir lista de productos
    items = []
    for code, info in inventario.items():
        exist = stock_sum.get(code, 0.0)
        stock_int = int(exist) if exist == int(exist) else exist
        precio = precios.get(code, 0.0)
        items.append({
            'code': code,
            'description': info['descripcion'],
            'stock': stock_int,
            'price': precio,
            'brand': info['marca'],
            'subcategory': info['subcategoria'],
            'model': info['modelo'],
        })

    print('Total items:', len(items))

    if dry_run:
        print('[DRY RUN] No se escribieron datos.')
        with_price = sum(1 for i in items if i['price'] > 0)
        with_stock = sum(1 for i in items if i['stock'] != 0)
        print('  Con precio:', with_price)
        print('  Con stock != 0:', with_stock)
        for i in items[:3]:
            print('  ', i['code'], '-', i['description'][:40], '| precio:', i['price'], '| stock:', i['stock'])
        return

    # Guardar en tabla a2_products (fuente del buscador)
    print('Guardando productos en tabla a2_products...')
    try:
        batch = []
        batch_size = 500
        total_products = 0
        for i in items:
            batch.append({
                'code': i['code'],
                'description': i['description'],
                'stock': i['stock'],
                'price': i['price'],
                'brand': i['brand'],
                'subcategory': i['subcategory'],
                'model': i['model'],
            })
            if len(batch) >= batch_size:
                sb.table('a2_products').upsert(batch, on_conflict='code').execute()
                total_products += len(batch)
                batch = []
        if batch:
            sb.table('a2_products').upsert(batch, on_conflict='code').execute()
            total_products += len(batch)
        print('Productos guardados en a2_products:', total_products)
    except Exception as e:
        print('ERROR al guardar en a2_products:', str(e)[:200])
        print('  -> Ejecuta primero el SQL: supabase/migrations/20260814_create_a2_products_table.sql')

    # Tambien escribir a2inventory.json (compatibilidad, solo code/description/stock/price)
    json_items = [
        {'code': i['code'], 'description': i['description'], 'stock': i['stock'], 'price': i['price']}
        for i in items
    ]
    with open(A2INVENTORY_JSON, 'w', encoding='utf-8') as fjson:
        json.dump(json_items, fjson, ensure_ascii=False, separators=(',', ':'))
    print('a2inventory.json actualizado (compatibilidad):', A2INVENTORY_JSON)


def main():
    parser = argparse.ArgumentParser(description='Import A2 -> Supabase')
    parser.add_argument('--clientes', action='store_true', help='Solo clientes')
    parser.add_argument('--inventario', action='store_true', help='Solo inventario/stock + precios')
    parser.add_argument('--dry-run', action='store_true', help='Mostrar sin escribir')
    args = parser.parse_args()

    do_clientes = args.clientes or not (args.clientes or args.inventario)
    do_inv = args.inventario or not (args.clientes or args.inventario)

    sb = get_supabase()

    if do_clientes:
        import_clientes(sb, dry_run=args.dry_run)
        print()

    if do_inv:
        import_inventario_precios(sb, dry_run=args.dry_run)

    print()
    print('PROCESO COMPLETADO.')


if __name__ == '__main__':
    main()
