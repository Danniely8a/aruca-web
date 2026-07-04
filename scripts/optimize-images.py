import os
from PIL import Image

IMAGES_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "assets")

def optimize_images():
    total_before = 0
    total_after = 0
    count = 0
    
    for root, dirs, files in os.walk(IMAGES_DIR):
        for f in files:
            if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp', '.avif')):
                path = os.path.join(root, f)
                size_before = os.path.getsize(path)
                total_before += size_before
                
                try:
                    img = Image.open(path)
                    
                    if f.lower().endswith('.png'):
                        if img.mode == 'RGBA':
                            img = img.convert('RGB')
                        out_path = os.path.join(root, os.path.splitext(f)[0] + ".jpg")
                        img.save(out_path, 'JPEG', quality=80, optimize=True)
                        os.remove(path)
                    elif f.lower().endswith(('.jpg', '.jpeg')):
                        img.save(path, 'JPEG', quality=80, optimize=True)
                    elif f.lower().endswith('.webp'):
                        img.save(path, 'WEBP', quality=80, method=6)
                    
                    size_after = os.path.getsize(out_path if f.lower().endswith('.png') else path)
                    total_after += size_after
                    count += 1
                except Exception as e:
                    total_after += size_before
                    print(f"  Skip {f}: {e}")
    
    print(f"\nOptimized {count} images")
    print(f"Before: {total_before / 1024 / 1024:.1f} MB")
    print(f"After:  {total_after / 1024 / 1024:.1f} MB")
    print(f"Saved:  {(total_before - total_after) / 1024 / 1024:.1f} MB")

if __name__ == "__main__":
    optimize_images()
