
  const url = 'http://feeds.bbci.co.uk/news/rss.xml';
  const gifyKey = '45jlwc7iV1JGH6XzIDMln1Bl463i8h8W';
  var axios = require('axios');
  var request = require('request');
  var hrLine = "-------------------------------------------------------------";

  
  /** Singleton pattern */

  let feedsUrl = [
    {name : 'top', slug : 'top', url: 'http://feeds.bbci.co.uk/news/rss.xml'},
    {name : 'world', slug : 'world', url: 'http://feeds.bbci.co.uk/news/world/rss.xml'},
    {name : 'uk', slug : 'uk', url: 'http://feeds.bbci.co.uk/news/uk/rss.xml'},
    {name : 'business', slug : 'business', url: 'http://feeds.bbci.co.uk/news/business/rss.xml'},
    {name : 'health', slug : 'health', url: 'http://feeds.bbci.co.uk/news/health/rss.xml'},
    {name : 'science', slug : 'science', url: 'http://feeds.bbci.co.uk/news/science_and_environment/rss.xml'},
    {name : 'technology', slug : 'technology', url: 'http://feeds.bbci.co.uk/news/technology/rss.xml'},
    {name : 'entertainment', slug : 'entertainment', url: 'http://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml'}
  ]

  /** This is incremented by the getUtlis callback */
  var currentFeedsCounter = 0;

  function processFeedsRecursive() {

    let getUtils = require('./lib/getUtils.js');
    console.log(`Start: [${feedsUrl[currentFeedsCounter].name.toUpperCase()} >> ${feedsUrl[currentFeedsCounter].url}]`);
    getUtils = getUtils(feedsUrl[currentFeedsCounter], fromChildToParentCallBack );
    console.log(hrLine);
    getUtils.aSyncGetFeedItems()
    .then( () => getUtils.processSingleFeedItemRecursive())
    .catch( (msg) => console.log(msg));
  };

  function fromChildToParentCallBack() {

    console.log("Current counter, before increment: " + currentFeedsCounter.toString());
    console.log(hrLine);
    if (currentFeedsCounter < feedsUrl.length - 1) {
                currentFeedsCounter++;
                setTimeout(() => { 
                  processFeedsRecursive();
              }, 1000);
      
    } else {
      
      let today = new Date();
      let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      let dateTime = date+' '+time;
      console.log(`Bye Bye: Generated: ${dateTime}`);
      process.exit();
    }
  }

  processFeedsRecursive();
  console.log('Fired');
  console.log(hrLine);