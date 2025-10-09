const { execSync } = require('child_process');
const { types } = require('util');

module.exports = eleventyConfig => {
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("admin");
  
  eleventyConfig.addCollection('FeatureCollection', collections => {
    let geojson =  {"type": "FeatureCollection", "crs": {"type": "link", "properties": {"type": "proj4", "href": "http://spatialreference.org/ref/epsg/4326/"}}, "features": []};
    // Gather items from all collections
  
    let all_items = [];
    //let categories = ['book-reviews','case-studies','exhibits','historical-overviews','ongoing-projects','thematic-overviews','videos'];
    let categories = ['videos']
    categories.forEach(cat => {
      collections.getFilteredByTag(cat).forEach(item => {
        item.data.category = cat;
        all_items.push(item);
      });
    });

    console.log(all_items);
    all_items.forEach(item => {
      let geometry = {"type": "Point", "coordinates": [34.333, 70.344]};
      if (item.data.map_point) {
        geometry = JSON.parse(item.data.map_point);
      }
      geojson.features.push({
        type: "Feature",
        geometry: geometry,
        properties: {
          popupcontent: `<img style="max-width:120px" src="${item.data.item_image}" /><br><strong><a href="${item.url}">${item.data.title}</a></strong><br>`,
          subjects: item.data.subjects || [],
          category: item.data.category || null,
          locations: item.data.locations || [],
          medium_m2m: item.data.medium_m2m || [],
          start_year: item.data.start_year || null,
          end_year: item.data.end_year || null,
          authors: item.data.author || null
        }
      });
    });
    return geojson;
  });
  
};

