import fitz  # PyMuPDF
import os
import sys

def convert_pdf_to_images(pdf_path, output_dir, dpi=200):
    """Convert PDF pages to images."""
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    doc = fitz.open(pdf_path)
    print(f"Total pages: {len(doc)}")
    
    for page_num in range(len(doc)):
        page = doc[page_num]
        mat = fitz.Matrix(dpi / 72, dpi / 72)
        pix = page.get_pixmap(matrix=mat)
        
        output_path = os.path.join(output_dir, f"page_{page_num + 1:03d}.png")
        pix.save(output_path)
        print(f"Saved: {output_path}")
    
    doc.close()
    print(f"\nDone! {len(doc)} pages converted to {output_dir}")

if __name__ == "__main__":
    pdf_path = r"C:\Users\Danniely\Desktop\Catalogo Herramientas Makita_compressed.pdf"
    output_dir = r"C:\Users\Danniely\Desktop\makita-catalog-images"
    
    convert_pdf_to_images(pdf_path, output_dir, dpi=200)
