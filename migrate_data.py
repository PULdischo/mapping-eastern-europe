import srsly
from pathlib import Path
from html_to_markdown import convert_to_markdown
import yaml

# Load items
data = srsly.read_json('_data/items.json')

def to_frontmatter(item):
    # Build frontmatter dict
    fm = {
        'title': convert_to_markdown(item.get('title', '')),
        'title_link': item.get('title_link', ''),
        'item_image': item.get('item_image', ''),
        'item_image_caption': convert_to_markdown(item.get('item_image_caption', '')).strip() if item.get('item_image_caption', '') else '',
        'slider_images': [
            {
                'slider_image': img.get('url', ''),
                'caption': convert_to_markdown(img.get('caption', '')).strip() if img.get('caption', '') else ''
            } for img in item.get('slider_images', [])
        ] if item.get('slider_images') else [],
        'start_year': item.get('start_year', ''),
        'end_year': item.get('end_year', ''),
        'author': item.get('author', ''),
        'type': item.get('medium_m2m', []),
        'locations': item.get('location_m2m', []),
        'subjects': item.get('subject_m2m', []),
        'latitude': item.get('latitude', ''),
        'longitude': item.get('longitude', ''),
        'make_public': item.get('make_public', False)
    }
    return fm

# Output directory logic (adjust as needed)
def get_output_dir(item):
    category = item.get('category', 'items')
    if category == 'case-studies':
        return Path('category/case-studies')
    elif category == 'book-reviews':
        return Path('category/book-reviews')
    elif category == 'exhibits':
        return Path('category/exhibits')
    elif category == 'historical-overviews':
        return Path('category/historical-overviews')
    elif category == 'thematic-overview':
        return Path('category/thematic-overview')
    elif category == 'videos':
        return Path('category/videos')
    elif category == 'ongoing-projects':
        return Path('category/ongoing-projects')
    else:
        return Path('items')

for item in data:
    fm = to_frontmatter(item)
    output_dir = get_output_dir(item)
    output_dir.mkdir(parents=True, exist_ok=True)
    filename = f"{item.get('slug')}.md"
    filepath = output_dir / filename
    # Write markdown file
    with open(filepath, 'w', encoding='utf8') as f:
        f.write('---\n')
        yaml.dump(fm, f, allow_unicode=True, sort_keys=False)
        f.write('---\n\n')
        # Optionally add main text content after frontmatter
        if item.get('text', None):
            f.write(convert_to_markdown(item.get('text', '')) + '\n')
print("Migration complete.")