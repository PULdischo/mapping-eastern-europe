from PIL import Image 
from pathlib import Path
from rich.progress import track

media_dir = Path('assets/media/items')
thumbs_dir = Path('assets/thumbnail')
images = list(media_dir.glob('*'))
thumbs_dir.mkdir(exist_ok=True)
for img_path in track(images, description="Processing images"):
    with Image.open(img_path) as img:
        img.thumbnail((400, 400))
        thumb_path = thumbs_dir / img_path.name
        img.save(thumb_path)