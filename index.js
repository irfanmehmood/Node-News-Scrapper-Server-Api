

/** This is incremented by the getUtlis callback */
var hrLine = "-------------------------------------------------------------";
const scrapper = require('./lib/scrapper.js');
const db = require('./lib/db.js');

let feeds_url = db.get_feed_urls()
let d = Date();     
console.log('Started: ' + d.toString());
console.log(hrLine);
process_feeds();

//db.connect_db()

/**
 * Process Feed URLs
 */
async function process_feeds() {

  /** Looping over our feed urls */
  for (let i = 0; i < feeds_url.length; i++) {
    
    console.log(hrLine);
    console.log("URL :" + feeds_url[i].url);
      
    // wait for the promise to resolve before advancing the for loop
    items = await scrapper.get_url_feed_items(feeds_url[i].url);

    // process items
    process_item = await scrapper.process_item(items);
    
    console.log("Items Found :" + items.length)
  }
}

/**
 * 
 */

