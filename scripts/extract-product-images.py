"""
Extract individual product images from ARUCA Makita catalog pages.
Each page has 2 products (top and bottom halves).
"""
import fitz  # PyMuPDF
import os

def extract_product_images(pdf_path, output_dir):
    os.makedirs(output_dir, exist_ok=True)
    doc = fitz.open(pdf_path)
    
    # Page dimensions (A4 at 72dpi = 595x842 points)
    # At 200dpi the images are ~1653x2338 pixels
    
    # Product layout per page:
    # Top product: y from ~15% to ~48% of page height (image area is left side)
    # Bottom product: y from ~52% to ~85% of page height
    
    # We'll crop the product image area (left portion, centered on product)
    # Each product image is roughly in the left 55% of the page
    
    product_map = {
        # page_num: [(product_code_top, ...), (product_code_bottom, ...)]
        # None means no product (section header page, etc.)
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
        21: ["GA4530_PULIDORA", None],  # Only 1 product on this page
        22: ["DHP484Z", "DTW190Z"],
        23: ["DLX2142Y", None],  # Kit page - 1 product
        24: ["DGA452R", "DHR241Z"],
        25: ["DBO180Z", "DBO482"],
        26: ["DRT50Z", "DJV184Z"],
        27: ["DKP180Z", "DFS452Z"],
        28: ["DFN350Z", "HG6530VK_INALAMBRICO"],
        29: ["DJN161Z", "DTM52"],
        30: ["DSS611Z", None],
    }
    
    dpi = 200
    zoom = dpi / 72
    mat = fitz.Matrix(zoom, zoom)
    
    extracted = 0
    
    for page_num in range(len(doc)):
        actual_page = page_num + 1
        if actual_page not in product_map:
            continue
            
        page = doc[page_num]
        products = product_map[actual_page]
        
        # Get page dimensions in pixels
        rect = page.rect
        page_h = rect.height
        page_w = rect.width
        
        # Product image areas (approximate fractions of page)
        # Top product image: centered around left 50%, top 15%-48%
        # Bottom product image: centered around left 50%, top 50%-83%
        
        regions = [
            (0.0, 0.13, 0.55, 0.47),   # top product
            (0.0, 0.49, 0.55, 0.83),   # bottom product
        ]
        
        for i, code in enumerate(products):
            if code is None:
                continue
                
            x0_frac, y0_frac, x1_frac, y1_frac = regions[i]
            
            clip = fitz.Rect(
                rect.x0 + x0_frac * page_w,
                rect.y0 + y0_frac * page_h,
                rect.x0 + x1_frac * page_w,
                rect.y0 + y1_frac * page_h,
            )
            
            pix = page.get_pixmap(matrix=mat, clip=clip)
            
            # Clean code for filename
            safe_code = code.replace(" ", "_").replace("/", "-")
            output_path = os.path.join(output_dir, f"{safe_code}.png")
            pix.save(output_path)
            extracted += 1
            print(f"Extracted: {safe_code}.png (page {actual_page})")
    
    doc.close()
    print(f"\nDone! Extracted {extracted} product images to {output_dir}")

if __name__ == "__main__":
    pdf_path = r"C:\Users\Danniely\Desktop\Catalogo Herramientas Makita_compressed.pdf"
    output_dir = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\public\assets\product-images\makita"
    extract_product_images(pdf_path, output_dir)
