"""
Extract ONLY the product images from ARUCA Makita catalog pages.
Per-page crop coordinates for precise extraction - NO TEXT visible.
"""
import fitz
import os
from PIL import Image
import io

def extract_clean_product_images(pdf_path, output_dir):
    os.makedirs(output_dir, exist_ok=True)
    doc = fitz.open(pdf_path)
    
    dpi = 300
    zoom = dpi / 72
    mat = fitz.Matrix(zoom, zoom)
    
    product_map = {
        3: ["2703", "2012NB"],
        4: ["LS1018L", "LS1040F"],
        5: ["LW1400", "5007N"],
        6: ["5008MG", "N5900B"],
        7: ["SP6000", "JR3051TK"],
        8: ["3709", "RT0701C"],
        9: ["RP1800", "HG6530VK"],
        10: ["4327", "JV0600K"],
        11: ["HP1640", "HP2050H"],
        12: ["HR2470", "HR3200C"],
        13: ["6413", "FS4200"],
        14: ["BO3710", "BO4556"],
        15: ["BO4900", "BO5030"],
        16: ["9046", "9910"],
        17: ["9902", "9403"],
        18: ["1912B", "KP0800"],
        19: ["PJ7000", "GD0600"],
        20: ["GA4530", "GA7082"],
        21: ["GA4530_PULIDORA", None],
        22: ["DHP484Z", "DTW190Z"],
        23: ["DLX2142Y", None],
        24: ["DGA452R", "DHR241Z"],
        25: ["DBO180Z", "DBO482"],
        26: ["DRT50Z", "DJV184Z"],
        27: ["DKP180Z", "DFS452Z"],
        28: ["DFN350Z", "HG6530VK_INALAMBRICO"],
        29: ["DJN161Z", "DTM52"],
        30: ["DSS611Z", None],
    }
    
    # DEFAULT crop regions (x0%, y0%, x1%, y1%)
    default_top = (0.03, 0.26, 0.42, 0.46)
    default_bot = (0.10, 0.60, 0.42, 0.83)
    
    # PER-PAGE overrides for problematic pages
    # Format: page_num -> [(top_region), (bottom_region)]
    page_overrides = {
        # Pages 16-17: belt sanders have text very close to image
        16: [(0.03, 0.29, 0.42, 0.46), (0.10, 0.62, 0.42, 0.83)],
        17: [(0.03, 0.29, 0.42, 0.46), (0.10, 0.62, 0.42, 0.83)],
        # Pages 18-19: planers/joiners
        18: [(0.03, 0.28, 0.42, 0.46), (0.10, 0.58, 0.42, 0.83)],
        19: [(0.03, 0.28, 0.42, 0.46), (0.10, 0.58, 0.42, 0.83)],
        # Page 20: grinders
        20: [(0.03, 0.28, 0.42, 0.46), (0.10, 0.58, 0.42, 0.83)],
        # Page 3: machines - top has big section header
        3: [(0.03, 0.28, 0.42, 0.46), (0.08, 0.58, 0.42, 0.83)],
        # Page 21: pulidora - only 1 product
        21: [(0.03, 0.26, 0.42, 0.46), None],
        # Page 23: kit - only 1 product
        23: [(0.03, 0.26, 0.42, 0.46), None],
        # Page 30: last LXT page - only 1 product
        30: [(0.03, 0.26, 0.42, 0.46), None],
    }
    
    extracted = 0
    
    for page_num in range(len(doc)):
        actual_page = page_num + 1
        if actual_page not in product_map:
            continue
            
        page = doc[page_num]
        products = product_map[actual_page]
        rect = page.rect
        page_h = rect.height
        page_w = rect.width
        
        # Get regions for this page
        if actual_page in page_overrides:
            regions = page_overrides[actual_page]
        else:
            regions = [default_top, default_bot]
        
        for i, code in enumerate(products):
            if code is None:
                continue
            if i >= len(regions) or regions[i] is None:
                continue
                
            x0_frac, y0_frac, x1_frac, y1_frac = regions[i]
            
            clip = fitz.Rect(
                rect.x0 + x0_frac * page_w,
                rect.y0 + y0_frac * page_h,
                rect.x0 + x1_frac * page_w,
                rect.y0 + y1_frac * page_h,
            )
            
            pix = page.get_pixmap(matrix=mat, clip=clip)
            img_data = pix.tobytes("png")
            img = Image.open(io.BytesIO(img_data))
            
            if img.mode != "RGB":
                img = img.convert("RGB")
            
            # Smart crop: scan from top to find first row with significant content
            # This removes any remaining title text
            pixels = img.load()
            width, height = img.size
            
            # Find top boundary: first row with >20 non-white pixels
            top_crop = 0
            for y in range(height):
                non_white_count = 0
                for x in range(0, width, 3):  # Sample every 3rd pixel
                    r, g, b = pixels[x, y]
                    if r < 240 or g < 240 or b < 240:
                        non_white_count += 1
                if non_white_count > 15:  # Found actual content
                    top_crop = max(0, y - 25)  # Small padding above
                    break
            
            # Find bottom boundary
            bottom_crop = height
            for y in range(height - 1, 0, -1):
                non_white_count = 0
                for x in range(0, width, 3):
                    r, g, b = pixels[x, y]
                    if r < 240 or g < 240 or b < 240:
                        non_white_count += 1
                if non_white_count > 15:
                    bottom_crop = min(height, y + 25)
                    break
            
            # Find left boundary
            left_crop = 0
            for x in range(width):
                non_white_count = 0
                for y in range(0, height, 3):
                    r, g, b = pixels[x, y]
                    if r < 240 or g < 240 or b < 240:
                        non_white_count += 1
                if non_white_count > 15:
                    left_crop = max(0, x - 25)
                    break
            
            # Find right boundary
            right_crop = width
            for x in range(width - 1, 0, -1):
                non_white_count = 0
                for y in range(0, height, 3):
                    r, g, b = pixels[x, y]
                    if r < 240 or g < 240 or b < 240:
                        non_white_count += 1
                if non_white_count > 15:
                    right_crop = min(width, x + 25)
                    break
            
            # Apply smart crop
            if bottom_crop > top_crop and right_crop > left_crop:
                img = img.crop((left_crop, top_crop, right_crop, bottom_crop))
            
            # Create square image with white background
            size = max(img.width, img.height)
            square = Image.new("RGB", (size, size), (255, 255, 255))
            offset_x = (size - img.width) // 2
            offset_y = (size - img.height) // 2
            square.paste(img, (offset_x, offset_y))
            
            # Resize to 800x800
            square = square.resize((800, 800), Image.LANCZOS)
            
            safe_code = code.replace(" ", "_").replace("/", "-")
            output_path = os.path.join(output_dir, f"{safe_code}.png")
            square.save(output_path, "PNG", optimize=True)
            extracted += 1
            print(f"Extracted: {safe_code}.png (page {actual_page})")
    
    doc.close()
    print(f"\nDone! Extracted {extracted} clean product images")

if __name__ == "__main__":
    pdf_path = r"C:\Users\Danniely\Desktop\Catalogo Herramientas Makita_compressed.pdf"
    output_dir = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\public\assets\product-images\makita"
    extract_clean_product_images(pdf_path, output_dir)
