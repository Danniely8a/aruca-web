"""
Download clean Makita product images from regional Makita sites.
"""
import urllib.request
import ssl
import os
import time

output_dir = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\public\assets\product-images\makita"

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

# CONFIRMED working image URLs from Makita regional sites
products = {
    "9910": "https://makita.com.vn/wp-content/uploads/2021/08/9910.pdf.jpg",
    "9403": "https://images.makita.co.nz/_productshots/product/9/94/9403-M.jpg",
    "BO5030": "https://images.makita.co.nz/_productshots/product/B/BO/BO5030-M.jpg",
    "BO3710": "https://cdn.makitatools.com/apps/cms/img/bo3/27c17927-368a-4604-8872-c020adb16d2f_bo3710_p_1500px.png",
    "BO4556": "https://cdn.makitatools.com/apps/cms/img/bo4/652add08-4047-4841-b1bb-d68be2a52560_bo4556_p_1500px.png",
    "BO4900": "https://cdn.makitatools.com/apps/cms/img/bo4/1774a8e8-de78-453e-b9e3-4f2327269953_bo4900v_p_1500px.png",
}

# Try Makita NZ pattern for other models: https://images.makita.co.nz/_productshots/product/X/XX/MODEL-M.jpg
nz_models = [
    "2703", "2012NB", "LS1018L", "LS1040F", "LW1400",
    "5007N", "5008MG", "SP6000", "JR3051TK",
    "3709", "RT0701C", "RP1800",
    "4327", "JV0600K",
    "HP1640", "HP2050H", "HR2470", "HR3200C", "6413", "FS4200",
    "BO3710", "BO4556", "BO4900", "BO5030",
    "9046", "9910", "9902", "9403",
    "1912B", "KP0800",
    "PJ7000", "GD0600",
    "GA4530", "GA7082",
    "DLX2142Y", "DHP484Z", "DTW190Z",
    "DGA452R", "DHR241Z", "DBO180Z", "DRT50Z",
    "DJV184Z", "DKP180Z", "DFS452Z", "DFN350Z",
    "DJN161Z", "DTM52", "DSS611Z",
    "N5900B", "HG6530VK", "DBO482",
]

for model in nz_models:
    if model not in products:
        # Build NZ URL pattern
        first_char = model[0].lower()
        first_two = model[:2].lower()
        products[model] = f"https://images.makita.co.nz/_productshots/product/{first_char}/{first_two}/{model}-M.jpg"

downloaded = 0
skipped = 0
failed = 0

for code, url in sorted(products.items()):
    safe_code = code.replace(" ", "_").replace("/", "-")
    filepath = os.path.join(output_dir, f"{safe_code}.png")
    
    try:
        req = urllib.request.Request(url, headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            "Accept": "image/*,*/*",
        })
        response = urllib.request.urlopen(req, timeout=15, context=ctx)
        data = response.read()
        
        # Determine extension from URL
        ext = ".jpg"
        if ".png" in url.lower():
            ext = ".png"
        elif ".webp" in url.lower():
            ext = ".webp"
        
        filepath = os.path.join(output_dir, f"{safe_code}{ext}")
        
        if len(data) > 3000:  # Valid image
            with open(filepath, "wb") as f:
                f.write(data)
            downloaded += 1
            print(f"OK: {safe_code}{ext} ({len(data)//1024}KB)")
        else:
            failed += 1
            print(f"SKIP: {safe_code} ({len(data)} bytes)")
    except Exception as e:
        failed += 1
        err = str(e)[:60]
        print(f"FAIL: {safe_code} - {err}")
    
    time.sleep(0.2)

print(f"\nResult: {downloaded} downloaded, {skipped} existing, {failed} failed")
