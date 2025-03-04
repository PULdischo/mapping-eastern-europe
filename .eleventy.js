const { execSync } = require('child_process')

module.exports = eleventyConfig => {
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("admin");
  //eleventyConfig.on('eleventy.after', () => {
  //  execSync(`npx pagefind --site _site --glob \"**/*.html\"`, { encoding: 'utf-8' })
  //});
};

