const { execSync } = require('child_process');
const { types } = require('util');
const markdownIt = require('markdown-it');

module.exports = eleventyConfig => {
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("admin");
  // Add filter to render markdown as HTML
  const md = new markdownIt({
    html: true,
    breaks: true,
    linkify: true
  });

  eleventyConfig.addFilter("markdownify", (content) => {
    if (!content) return '';
    return md.renderInline(content);
  });
  eleventyConfig.addCollection('Contributors', collections => {
    // Gather unique contributors from all items
    // Sort by last name alphabetically
    // Do note include None 
    let contributors = new Set();
    collections.getAll().forEach(item => {
      if (item.data.author && item.data.author !== 'None') {
        let authors = Array.isArray(item.data.author) ? item.data.author : [item.data.author];
        authors.forEach(author => {
          contributors.add(author);
        });
      }
    });
    let contributorArray = Array.from(contributors);
    contributorArray.sort((a, b) => {
      let aLastName = a.trim().split(' ').slice(-1)[0].toLowerCase();
      let bLastName = b.trim().split(' ').slice(-1)[0].toLowerCase();
      if (aLastName < bLastName) return -1;
      if (aLastName > bLastName) return 1;
      return 0;
    });
    return contributorArray;
  });

  eleventyConfig.addCollection('FeatureCollection', collections => {
    // Create a GeoJSON FeatureCollection
    let geojson = { "type": "FeatureCollection", "crs": { "type": "link", "properties": { "type": "proj4", "href": "http://spatialreference.org/ref/epsg/4326/" } }, "features": [] };

    // Gather all items from specified categories
    let all_items = [];
    let categories = ['book-reviews', 'case-studies', 'historical-overviews', 'ongoing-projects', 'thematic-overviews', 'videos'];
    categories.forEach(cat => {
      collections.getFilteredByTag(cat).forEach(item => {
        item.data.category = cat;
        all_items.push(item);
      });
    });
    // For each item, create a GeoJSON feature if it has latitude and longitude
    all_items.forEach(item => {
      let geometry = { "type": "Point", "coordinates": [item.data.longitude, item.data.latitude] };
      geojson.features.push({
        type: "Feature",
        geometry: geometry,
        properties: {
          popupcontent: `<img style="max-width:120px" src="${item.data.item_image}" /><br><strong><a href="${item.url}">${md.renderInline(item.data.title)}</a></strong><br>`,
          subjects: item.data.subjects || [],
          category: item.data.category || null,
          locations: item.data.locations || [],
          type: item.data.type || [],
          start_year: item.data.start_year || null,
          end_year: item.data.end_year || null,
          authors: item.data.author || null
        }
      });
    });
    return geojson;
  });

};

