# Mapping Eastern Europe

A digital humanities project that provides an interactive map-based interface for exploring scholarship on Eastern European medieval art and architecture.

## About

Mapping Eastern Europe is an online resource that visualizes scholarly works related to medieval Eastern Europe through an interactive map. The project allows users to explore case studies, historical overviews, thematic analyses, book reviews, and other scholarly content by geographic location, time period, subject, and medium.

## Features

- **Interactive Map**: Browse content by geographic location with custom markers for different content types
- **Advanced Filtering**: Filter content by:
  - Entry type (case studies, historical overviews, thematic overviews, videos, etc.)
  - Subject matter
  - Geographic location
  - Medium/type
  - Author
  - Time period (1150-1750 CE)
- **Search**: Full-text search across all content
- **Responsive Design**: Works on desktop and mobile devices
- **Content Management**: Admin interface for adding and editing content

## Technology Stack

### Frontend
- **[Eleventy (11ty)](https://www.11ty.dev/)**: Static site generator
- **[Nunjucks](https://mozilla.github.io/nunjucks/)**: Templating engine
- **[Leaflet](https://leafletjs.com/)**: Interactive mapping library
- **[Esri Leaflet](https://esri.github.io/esri-leaflet/)**: Basemap tiles
- **[Select2](https://select2.org/)**: Enhanced select dropdowns
- **[jQuery UI](https://jqueryui.com/)**: Date range slider
- **[Bootstrap 4](https://getbootstrap.com/)**: CSS framework

### Content Management
- **[Decap CMS](https://decapcms.org/)** (formerly Netlify CMS): Git-based content management
- Markdown files with YAML frontmatter for content storage

### Data Format
- GeoJSON for geographic data
- JSON for structured content

## Project Structure

```
mapping-eastern-europe/
├── _data/                    # Site data files
│   ├── items.json           # Legacy item data
│   └── ...
├── _includes/               # Nunjucks templates
│   ├── base.njk            # Base layout
│   ├── item.njk            # Item detail page
│   ├── grid.njk            # Grid view
│   └── table.njk           # Table view
├── admin/                   # Decap CMS configuration
│   └── config.yml          # CMS field definitions
├── assets/                  # Static assets
│   ├── css/                # Stylesheets
│   ├── js/                 # JavaScript files
│   └── media/              # Images and icons
├── category/                # Content organized by type
│   ├── case-studies/
│   ├── historical-overviews/
│   ├── thematic-overviews/
│   ├── book-reviews/
│   ├── ongoing-projects/
│   ├── exhibitions/
│   └── videos/
├── .eleventy.js            # Eleventy configuration
├── index.njk               # Homepage with map interface
└── package.json            # Node dependencies
```

## How It Works

### Content Creation

1. Content is authored as Markdown files with YAML frontmatter
2. Each content type (case study, book review, etc.) has its own directory under `category/`
3. Frontmatter includes metadata like title, author, coordinates, subjects, locations, dates, etc.

Example frontmatter:
```yaml
---
title: Church of St. Nicholas, Koločep
slug: church-of-st-nicholas-kolocep
item_image: /assets/media/items/Picture1.jpg
author: John Doe
latitude: 42.6667
longitude: 18.0833
start_year: 1150
end_year: 1200
category: case-studies
subjects: ["Byzantine Art", "Church Architecture"]
locations: ["Croatia", "Dalmatia"]
tags: 
  - case-studies
---
```

### Build Process

1. **Eleventy** reads all Markdown files in the `category/` directories
2. Collections are created based on tags (case-studies, historical-overviews, etc.)
3. A **FeatureCollection** (GeoJSON) is generated from all items with coordinates
4. Templates render the content into static HTML pages
5. The map interface loads the GeoJSON and displays markers

### Map Functionality

The interactive map (`index.njk`):
- Loads a GeoJSON FeatureCollection of all items
- Filters items based on user-selected criteria
- Groups overlapping markers at the same coordinates
- Displays different icons for each content category
- Shows popups with item information when markers are clicked

### Filtering System

The `make_map()` function:
1. Collects current filter values (type, subject, location, medium, author, date range)
2. Iterates through all features in the GeoJSON
3. Tests each feature against all active filters
4. Only renders markers that pass all filter criteria
5. Rebuilds the map layers when filters change

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/mapping-eastern-europe.git
cd mapping-eastern-europe
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm start
```

4. Open your browser to `http://localhost:8080`

### Build for Production

```bash
npm run build
```

The static site will be generated in the `_site/` directory.

## Content Management

### Using Decap CMS

1. Access the admin interface at `/admin/`
2. Authenticate via your Git provider
3. Create, edit, or delete content through the UI
4. Changes are committed directly to the repository

### Manual Content Creation

1. Create a new Markdown file in the appropriate `category/` directory
2. Add required frontmatter fields
3. Write content in Markdown
4. Commit and push changes
5. Rebuild the site

## Configuration

### Eleventy Configuration

Edit `.eleventy.js` to:
- Modify collection definitions
- Add custom filters or shortcodes
- Configure passthrough file copying
- Adjust output directory settings

### CMS Configuration

Edit `admin/config.yml` to:
- Add/remove content fields
- Change field types or validation
- Modify collection settings
- Update media folder paths

## Data Migration

The `migrate_data.py` script converts legacy JSON data to Markdown files:

```bash
python migrate_data.py
```

This reads `_data/items.json` and generates individual `.md` files in the appropriate category directories.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request


## Credits

**Editors**: M. A. Rossi and A. I. Sullivan

## Contact

**Developer**: Andy Janco 