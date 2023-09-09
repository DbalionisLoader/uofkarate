
const eleventyGoogleFonts = require("eleventy-google-fonts");
module.exports = function(eleventyConfig) {
    
    /* Plugins */
    eleventyConfig.addPlugin(eleventyGoogleFonts);
    /* PassThrought */
    eleventyConfig.addPassthroughCopy("css/style.css");
    eleventyConfig.addPassthroughCopy("images");
    eleventyConfig.addPassthroughCopy("images/png");
    /* Custom Filters */
    eleventyConfig.addCollection("examplePosts", function(collection) {
        return collection.getFilteredByGlob("./posts/examples/*.md");
      });

      eleventyConfig.addCollection("posts", function(collection) {
        return collection.getFilteredByGlob("./posts/portfolio/*.md");
      });

    /* Returns */  
     return { 
        dir: {      
        input: ".",
        includes: "_includes",
        output: "_site",
        data: "_data"
        }
    }   
};