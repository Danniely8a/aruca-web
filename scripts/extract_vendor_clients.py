"""
extract_vendor_clients.py - Extract client codes from vendor PDFs
Reads CUENTASPORCOBRAR{vendor}.Pdf files and stores the client-to-vendor
mapping in the vendor_clients table.

Usage:
  py scripts/extract_vendor_clients.py                    # Process all PDFs found
  py scripts/extract_vendor_clients.py --vendor GUSTAVO   # Process one vendor only
  py scripts/extract_vendor_clients.py --dry-run          # Parse only, no DB writes
  py scripts/extract_vendor_clients.py --list             # Just list clients, no import
"""
import os
import sys
import io
import re
import glob
import argparse

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

DESKTOP = r'C:\Users\caja.02\Desktop'
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

env_path = os.path.join(PROJECT_ROOT, '.env.local')
if os.path.exists(env_path):
    with open(env_path) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#') and '=' in line:
                key, value = line.split('=', 1)
                os.environ.setdefault(key.strip(), value.strip())

SUPABASE_URL = os.environ.get('NEXT_PUBLIC_SUPABASE_URL', '')
SUPABASE_KEY = os.environ.get('SUPABASE_SERVICE_ROLE_KEY', '')

VENDOR_PDF_MAP = {
    'GUSTAVO ROSALES': 'CUENTASPORCOBRARgustavo.Pdf',
    'JEPHERSON PEREZ': 'CUENTASPORCOBRARJEPHERSON.Pdf',
    'FRANKLIN SEGOVIA': 'CUENTASPORCOBRARfranklin.Pdf',
}


def get_supabase_client():
    from supabase import create_client
    return create_client(SUPABASE_URL, SUPABASE_KEY)


def extract_clients_from_pdf(pdf_path):
    """Extract client codes and names from a vendor PDF."""
    import pdfplumber

    pdf = pdfplumber.open(pdf_path)
    all_text = ''
    for page in pdf.pages:
        text = page.extract_text()
        if text:
            all_text += text + '\n'
    pdf.close()

    clients = re.findall(r'(\d{8})\s+(.+?)(?:\s+Si\s|\s+No\s)', all_text)
    return [{'code': code.lstrip('0') or '0', 'name': name.strip()} for code, name in clients]


def find_vendor_pdfs(vendor_filter=None):
    """Find all vendor PDFs on the desktop."""
    found = {}
    for vendor, filename in VENDOR_PDF_MAP.items():
        if vendor_filter and vendor_filter.upper() not in vendor.upper():
            continue
        path = os.path.join(DESKTOP, filename)
        if os.path.exists(path):
            found[vendor] = path
        else:
            print(f'  No se encontro: {filename}')
    return found


def import_to_supabase(vendor_name, clients, dry_run=False):
    """Insert client mappings into vendor_clients table."""
    if dry_run:
        print(f'\n[DRY RUN] {vendor_name}: {len(clients)} clientes')
        for c in clients[:5]:
            print(f'  {c["code"]} - {c["name"]}')
        if len(clients) > 5:
            print(f'  ... y {len(clients) - 5} mas')
        return

    sb = get_supabase_client()

    existing = sb.table('vendor_clients').select('client_code').eq('vendor_name', vendor_name).execute()
    existing_codes = {r['client_code'] for r in existing.data}

    to_insert = []
    for c in clients:
        if c['code'] not in existing_codes:
            to_insert.append({
                'vendor_name': vendor_name,
                'client_code': c['code'],
                'client_name': c['name'],
            })

    if to_insert:
        for i in range(0, len(to_insert), 500):
            batch = to_insert[i:i+500]
            sb.table('vendor_clients').insert(batch).execute()
        print(f'  {vendor_name}: insertados {len(to_insert)} nuevos ({len(clients)} total)')
    else:
        print(f'  {vendor_name}: sin cambios ({len(clients)} clientes, todos ya existentes)')


def main():
    parser = argparse.ArgumentParser(description='Extract vendor clients from PDFs')
    parser.add_argument('--vendor', type=str, help='Process only this vendor (GUSTAVO, JEPHERSON, FRANKLIN)')
    parser.add_argument('--dry-run', action='store_true', help='Parse only, do not insert')
    parser.add_argument('--list', action='store_true', help='Just list clients, no import')
    args = parser.parse_args()

    pdfs = find_vendor_pdfs(args.vendor)
    if not pdfs:
        print('No se encontraron PDFs de vendedores.')
        sys.exit(1)

    print(f'PDFs encontrados: {len(pdfs)}')
    for vendor, path in pdfs.items():
        print(f'\n--- {vendor} ---')
        print(f'Archivo: {os.path.basename(path)}')
        clients = extract_clients_from_pdf(path)
        print(f'Clientes extraidos: {len(clients)}')

        if args.list:
            for c in clients:
                print(f'  {c["code"]} - {c["name"]}')
        else:
            import_to_supabase(vendor, clients, dry_run=args.dry_run)


if __name__ == '__main__':
    main()
