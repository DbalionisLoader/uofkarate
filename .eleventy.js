
const eleventyGoogleFonts = require("eleventy-google-fonts");
const {format, formatDistanceToNow } = require('date-fns');

module.exports = function(eleventyConfig) {
    
    /* Plugins */
    eleventyConfig.addPlugin(eleventyGoogleFonts);
    /* PassThrought */
    eleventyConfig.addPassthroughCopy("css/style.css");
    eleventyConfig.addPassthroughCopy("images");
    eleventyConfig.addPassthroughCopy("images/png");
    eleventyConfig.addPassthroughCopy("js");
    eleventyConfig.addPassthroughCopy("_data/js");
    /* Custom Filters */
    eleventyConfig.addCollection("examplePosts", function(collection) {
        return collection.getFilteredByGlob("./posts/examples/*.md");
      });

      eleventyConfig.addCollection("posts", function(collection) {
        return collection.getFilteredByGlob("./posts/portfolio/*.md");
      });

      /* Date/Time filters for event times */ 
      /* Full event date filter */   
      eleventyConfig.addFilter("formatDatetime", function(dateStr){
        return format(new Date(dateStr), 'MMMM d, yyyy - h:mm a');
      });

      //Weekday and day of the month filter
      eleventyConfig.addFilter("formatWeekDay", function(dateStr){
        const dayOfWeek = format(new Date(dateStr), 'EEE' );
        const dayOfWeekNumber = format(new Date(dateStr),
         'do' );
        const month = format(new Date(dateStr), 'MMMM' );
        return `${dayOfWeek} ${dayOfWeekNumber} ${month}`;
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