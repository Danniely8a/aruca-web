import json, os, sys, urllib.request

sys.stdout.reconfigure(encoding='utf-8')

SUPABASE_URL = os.environ.get('SUPABASE_URL', 'https://ocuafmydwitrhxhtuole.supabase.co')
SERVICE_KEY = os.environ.get('SUPABASE_SERVICE_KEY', '')

# Load embeddings
embeddings_path = os.path.join(os.path.dirname(__file__), 'embeddings_data.json')
with open(embeddings_path, 'r', encoding='utf-8') as f:
    embeddings = json.load(f)

print(f"Uploading {len(embeddings)} embeddings to Supabase...")

# Upload in batches of 50
batch_size = 50
total_uploaded = 0

for i in range(0, len(embeddings), batch_size):
    batch = embeddings[i:i+batch_size]
    
    # Convert embeddings to string format for pgvector
    rows = []
    for e in batch:
        embedding_str = '[' + ','.join(str(x) for x in e['embedding']) + ']'
        rows.append({
            'product_id': e['product_id'],
            'embedding': embedding_str,
            'product_text': e['product_text']
        })
    
    data = json.dumps(rows).encode('utf-8')
    req = urllib.request.Request(
        f'{SUPABASE_URL}/rest/v1/product_embeddings',
        data=data,
        headers={
            'apikey': SERVICE_KEY,
            'Authorization': f'Bearer {SERVICE_KEY}',
            'Content-Type': 'application/json',
            'Prefer': 'resolution=merge-duplicates',
        },
        method='POST'
    )
    
    try:
        resp = urllib.request.urlopen(req, timeout=30)
        total_uploaded += len(batch)
        if (i // batch_size) % 5 == 0:
            print(f"  Uploaded {total_uploaded}/{len(embeddings)}")
    except Exception as e:
        print(f"  Error at batch {i}: {str(e)[:200]}")
        # Try one by one for failed batch
        for row in rows:
            try:
                single_data = json.dumps(row).encode('utf-8')
                single_req = urllib.request.Request(
                    f'{SUPABASE_URL}/rest/v1/product_embeddings',
                    data=single_data,
                    headers={
                        'apikey': SERVICE_KEY,
                        'Authorization': f'Bearer {SERVICE_KEY}',
                        'Content-Type': 'application/json',
                        'Prefer': 'resolution=merge-duplicates',
                    },
                    method='POST'
                )
                urllib.request.urlopen(single_req, timeout=10)
                total_uploaded += 1
            except:
                pass

print(f"Done! Uploaded {total_uploaded}/{len(embeddings)} embeddings")
