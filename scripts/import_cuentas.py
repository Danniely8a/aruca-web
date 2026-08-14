"""
import_cuentas.py - Import CUENTASPORCOBRAR.Xls from A2 to Supabase
Reads the Excel report from the shared network folder and upserts
all accounts receivable data into Supabase.

Usage: py scripts/import_cuentas.py [--dry-run]
Schedule: 3x daily via Windows Task Scheduler (8am, 12pm, 4pm)
"""
import xlrd
import os
import sys
import io
import argparse
from datetime import datetime

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

XLS_PATH = r'C:\Users\caja.02\Desktop\CuentasporCobrar.xls'
LOCAL_COPY = r'C:\Users\caja.02\Desktop\CUENTASPORCOBRAR.Xls'

env_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), '.env.local')
if os.path.exists(env_path):
    with open(env_path) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#') and '=' in line:
                key, value = line.split('=', 1)
                os.environ.setdefault(key.strip(), value.strip())

SUPABASE_URL = os.environ.get('NEXT_PUBLIC_SUPABASE_URL', '')
SUPABASE_KEY = os.environ.get('SUPABASE_SERVICE_ROLE_KEY', '')


def get_supabase_client():
    from supabase import create_client
    return create_client(SUPABASE_URL, SUPABASE_KEY)


def load_vendor_map(sb):
    """Load vendor_clients mapping: client_code -> vendor_name"""
    result = sb.table('vendor_clients').select('client_code, vendor_name').execute()
    vmap = {}
    for row in result.data:
        normalized = row['client_code'].lstrip('0') or '0'
        vmap[normalized] = row['vendor_name']
        vmap[row['client_code']] = row['vendor_name']
    print(f'Vendor mapping cargado: {len(vmap)} clientes asignados')
    return vmap


def parse_date(val):
    if not val:
        return None
    try:
        if isinstance(val, float):
            return datetime(*xlrd.xldate_as_tuple(val, 0)[:3]).strftime('%Y-%m-%d')
        s = str(val).strip()
        for fmt in ('%d/%m/%Y', '%d/%m/%y'):
            try:
                return datetime.strptime(s, fmt).strftime('%Y-%m-%d')
            except ValueError:
                continue
    except Exception:
        pass
    return None


def safe_str(val):
    return str(val).strip() if val else ''


def safe_int(val, default=0):
    try:
        return int(float(val)) if val else default
    except (ValueError, TypeError):
        return default


def safe_float(val, default=0.0):
    try:
        return round(float(val), 2) if val else default
    except (ValueError, TypeError):
        return default


def parse_xls(filepath):
    wb = xlrd.open_workbook(filepath)
    ws = wb.sheet_by_index(0)

    clients = []
    current_client = None
    docs = []

    for r in range(ws.nrows):
        c0 = ws.cell_value(r, 0)
        c1 = ws.cell_value(r, 1)
        c2 = ws.cell_value(r, 2)
        c3 = ws.cell_value(r, 3)
        c4 = ws.cell_value(r, 4)
        c5 = ws.cell_value(r, 5)
        c6 = ws.cell_value(r, 6)
        c8 = ws.cell_value(r, 8)
        c9 = ws.cell_value(r, 9)
        c10 = ws.cell_value(r, 10)
        c11 = ws.cell_value(r, 11)
        c17 = ws.cell_value(r, 17)

        is_client_code = isinstance(c0, float) and c0 > 0 and c0 == int(c0)
        is_header_row = isinstance(c0, str) and c0.strip() in ('Factura', 'Nota de Entrega', 'Adelanto', 'Nota', 'N/C', 'N/D')
        is_total_row = isinstance(c1, str) and 'Total Transacciones' in str(c1)

        if is_client_code and c4:
            if current_client and docs:
                current_client['documents'] = docs
                clients.append(current_client)

            current_client = {
                'client_code': str(int(c0)),
                'client_name': safe_str(c4),
                'client_rif': safe_str(c10) if r + 2 < ws.nrows else '',
                'client_nit': safe_str(c11) if r + 2 < ws.nrows else '',
                'client_phone': '',
                'client_address': safe_str(c11) if 'CARRETERA' in safe_str(c11).upper() or 'CALLE' in safe_str(c11).upper() or 'SECTOR' in safe_str(c11).upper() else '',
                'total_documents': 0,
                'total_amount': 0.0,
            }
            docs = []
            continue

        if current_client:
            next_c0 = ws.cell_value(r + 1, 0) if r + 1 < ws.nrows else ''
            if isinstance(next_c0, str) and isinstance(ws.cell_value(r, 4), str) and ws.cell_value(r, 4):
                phone_candidate = safe_str(ws.cell_value(r, 4))
                if phone_candidate and ('0' in phone_candidate[:2] or '-' in phone_candidate):
                    current_client['client_phone'] = phone_candidate
                    if isinstance(c10, str) and c10:
                        current_client['client_rif'] = safe_str(c10)
                    if isinstance(c11, str) and c11 and ('CARRETERA' in c11.upper() or 'CALLE' in c11.upper() or 'SECTOR' in c11.upper()):
                        current_client['client_address'] = safe_str(c11)
                    continue

        if is_header_row and current_client:
            docs.append({
                'document_type': safe_str(c0),
                'emission_date': parse_date(c2),
                'due_date': parse_date(c3),
                'days': safe_int(c5),
                'document_number': str(int(c8)) if isinstance(c8, float) else safe_str(c8),
                'description': safe_str(c9),
                'amount': safe_float(c17),
            })
            continue

        if is_total_row and current_client:
            current_client['total_documents'] = safe_int(c1) if 'Total Transacciones' not in str(c1) else int(str(c1).split()[-1]) if str(c1).split()[-1].isdigit() else len(docs)
            current_client['total_amount'] = safe_float(c17)
            continue

    if current_client and docs:
        current_client['documents'] = docs
        clients.append(current_client)
    elif current_client:
        current_client['documents'] = []
        clients.append(current_client)

    return clients


def import_to_supabase(clients, dry_run=False):
    total_docs = sum(len(c.get('documents', [])) for c in clients)
    print(f'Clientes: {len(clients)}')
    print(f'Documentos: {total_docs}')

    if dry_run:
        print('\n[DRY RUN] No se insertaron datos.')
        for c in clients[:3]:
            print(f'\n  {c["client_code"]} - {c["client_name"]}')
            print(f'    RIF: {c["client_rif"]} Tel: {c["client_phone"]}')
            print(f'    Docs: {c["total_documents"]} Total: ${c["total_amount"]}')
            for d in c.get('documents', [])[:2]:
                print(f'      {d["document_type"]} {d["emission_date"]} -> {d["due_date"]} ${d["amount"]}')
        return

    sb = get_supabase_client()
    now = datetime.utcnow().isoformat() + 'Z'

    vendor_map = load_vendor_map(sb)

    print('\nEliminando registros anteriores...')
    sb.table('accounts_receivable').delete().neq('id', 0).execute()

    print('Insertando documentos...')
    batch = []
    batch_size = 500
    inserted = 0
    assigned = 0

    for client in clients:
        vendor_name = vendor_map.get(client['client_code'], '')
        if vendor_name:
            assigned += 1
        for doc in client.get('documents', []):
            batch.append({
                'client_code': client['client_code'],
                'client_name': client['client_name'],
                'client_rif': client['client_rif'],
                'client_nit': client['client_nit'],
                'client_phone': client['client_phone'],
                'client_address': client['client_address'],
                'document_type': doc['document_type'],
                'emission_date': doc['emission_date'],
                'due_date': doc['due_date'],
                'days': doc['days'],
                'document_number': doc['document_number'],
                'description': doc['description'],
                'amount': doc['amount'],
                'total_documents': client['total_documents'],
                'total_amount': client['total_amount'],
                'vendor_name': vendor_name,
                'report_date': now,
            })

            if len(batch) >= batch_size:
                sb.table('accounts_receivable').insert(batch).execute()
                inserted += len(batch)
                print(f'  Insertados: {inserted}/{total_docs}')
                batch = []

    if batch:
        sb.table('accounts_receivable').insert(batch).execute()
        inserted += len(batch)

    print(f'\nListo. Total insertados: {inserted}')
    print(f'Clientes con vendedor asignado: {assigned}/{len(clients)}')
    print(f'Reporte: {now}')


def main():
    parser = argparse.ArgumentParser(description='Import CUENTASPORCOBRAR to Supabase')
    parser.add_argument('--dry-run', action='store_true', help='Parse only, do not insert')
    parser.add_argument('--local', action='store_true', help='Use local copy instead of network')
    args = parser.parse_args()

    filepath = LOCAL_COPY if args.local else XLS_PATH
    print(f'Archivo: {filepath}')

    if not os.path.exists(filepath):
        print(f'ERROR: No se encontro el archivo {filepath}')
        sys.exit(1)

    print(f'Tamano: {os.path.getsize(filepath)} bytes')
    print('Parseando...')
    clients = parse_xls(filepath)
    print(f'Clientes encontrados: {len(clients)}')

    import_to_supabase(clients, dry_run=args.dry_run)


if __name__ == '__main__':
    main()
