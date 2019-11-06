
  const feedparser = require('feedparser-promised');


  receiveAllFeedItems = ((items) => {
    
    const List = items.map(item => 
      
      /** Spilt title into arrays */
      item.title.split(" ").sort((a, b) => b.length - a.length)[0]
    )
  /*
    const filteredList = items.filter(item => 
      item.title.toString().indexOf('Brexit') > -1
    );

    filteredList.forEach(item => 
      console.log('title:', item.title)
      https://api.giphy.com/v1/gifs/search?api_key=45jlwc7iV1JGH6XzIDMln1Bl463i8h8W&q=trump&limit=1&offset=0&rating=G&lang=en

    )
*/
    console.log(List);
  });


  /** Step 1. Get Items From Remote URL */
  feedparser.parse(url)
  //.then(items => items.forEach(item => console.log('title:', item.title)))
  .then(items => receiveAllFeedItems(items))
  .catch(console.error);