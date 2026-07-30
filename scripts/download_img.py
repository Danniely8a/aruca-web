import urllib.request
import os

dest = 'C:/Users/Danniely/Desktop/ARUCA WEB/aruca-web/public/assets/about-workshop.jpg'

urls = [
    'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80&auto=format',
    'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&q=80&auto=format',
    'https://images.unsplash.com/photo-1530124566582-a45a7c7cefb8?w=800&q=80&auto=format',
]

for url in urls:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        data = urllib.request.urlopen(req).read()
        if len(data) > 10000:
            with open(dest, 'wb') as f:
                f.write(data)
            print(f'Descargada OK ({len(data)} bytes)')
            break
    except Exception as e:
        print(f'Error: {e}')
