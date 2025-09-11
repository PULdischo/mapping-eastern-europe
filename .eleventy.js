const { execSync } = require('child_process');
const { types } = require('util');

module.exports = eleventyConfig => {
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("admin");
  
  let items = require('./_data/items.json');
  eleventyConfig.addCollection('FeatureCollection', collection => {
    let geojson =  {"type": "FeatureCollection", "crs": {"type": "link", "properties": {"type": "proj4", "href": "http://spatialreference.org/ref/epsg/4326/"}}, "features": []};
    // Add each item as a feature in the GeoJSON if it has latitude and longitude
    items = items.filter(item => item.latitude && item.longitude);
    items.forEach(item => {
        geojson.features.push({
        type: "Feature",
        geometry: {"type": "Point", "coordinates": [item.longitude, item.latitude]},
        properties: {
          // categories: item.category || null,
          // types: null,
          popupcontent: `<img style="max-width:120px" src="${item.item_image}" /><br><strong><a href="/item/${item.slug}">${item.title}</a></strong><br>`,
          subjects: item.subject_m2m || [],
          category: item.category || null,
          location: item.location || null,
          locations: item.location_m2m || [],
          medium_m2m: item.medium_m2m || [],
          start_year: item.start_year || null,
          end_year: item.end_year || null,
          // locations: item.location_m2m || [],
          authors: item.author || null
        },
        id: item.id || null
      });
    });
    return geojson;
    //"properties": {"categories": [6], "types": [], "popupcontent": "<img style=\"max-width:120px\" src=\"/media/items/Fig._2_-_Neagoe_Basarab_and_Family_SUrQtK6.jpg\" /><br><strong><a href=\"/item/neagoe-basarab-of-wallachia-and-his-family\">Neagoe Basarab of Wallachia and His Family</a></strong><br>", "model": "main.item", "subjects": [7], "subject": 7, "category": 6, "location": 2, "medium": null, "start_year": 1500, "end_year": 1550, "locations": [2], "authors": "Alice Isabella Sullivan"}, "id": 14}
  });
  eleventyConfig.addCollection('thematic-overview', collection => {
    return items.filter(item => item.category === 'thematic-overview');
  });
  eleventyConfig.addCollection('case-studies', collection => {
    return items.filter(item => item.category === 'case-studies');
  });
  eleventyConfig.addCollection('videos', collection => {
    return items.filter(item => item.category === 'videos');
  });
  eleventyConfig.addCollection('book-reviews', collection => {
    return items.filter(item => item.category === 'book-reviews');
  });
  eleventyConfig.addCollection('exhibits', collection => {
    return items.filter(item => item.category === 'exhibits');
  });
  //eleventyConfig.on('eleventy.after', () => {
  //  execSync(`npx pagefind --site _site --glob \"**/*.html\"`, { encoding: 'utf-8' })
  //});
};

