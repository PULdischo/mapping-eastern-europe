const { execSync } = require('child_process')

module.exports = eleventyConfig => {
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("admin");
  
  let items = require('./_data/items.json');
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
  //eleventyConfig.on('eleventy.after', () => {
  //  execSync(`npx pagefind --site _site --glob \"**/*.html\"`, { encoding: 'utf-8' })
  //});
};

