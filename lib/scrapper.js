const feedparser = require('feedparser-promised');
const db = require('./db.js');
const { bannedWordsList, allowedWordsList, ignoreBBCTitles } = require('../data/word-ignore-list.js');
const gifyApiKey_public = 'dc6zaTOxFJmzC';
const axios = require('axios');
const chromeUserAgentsList = require('../data/user-agents/chrome.js');
const ieUserAgentsList = require('../data/user-agents/ie.js');
const userAgents = ieUserAgentsList.concat(chromeUserAgentsList);


let scrapper_mod = () => {

    let textArray;
    let bannedWordsListArray = bannedWordsList;
    let ignore_titles_list = ignoreBBCTitles;
    let FormattedFeedItemsList = [];
    let AllowedWordsList = allowedWordsList;
    var hr = "-------------------------------------------------------------";


    function getIgnoreTitlesList() {
        return ignore_titles;
    }

    function format_text_to_array(val) {
        return val.replace(/\W+/g, " ").toLowerCase().split(" ");
    }

    function getPopularWords() {

        var wordAppearance = {}

        let IsThisWordAllowed = word.length > 4 ? true : AllowedWordsList.indexOf(word) === -1 ? false : true;


        textArray
            .forEach((word) => {

                if (bannedWordsListArray.indexOf(word) == -1)

                    ((word.length > 4 ? true : AllowedWordsList.indexOf(word) === -1 ? false : true) && bannedWordsListArray.indexOf(word) == -1) ?
                        wordAppearance[word] ? wordAppearance[word] + 1 : wordAppearance[word] = 1
                        : '';
            });


        return wordAppearance;
    }

    function get_longest_word(text_array) {

        var wordAppearance = [];

        text_array
            .forEach((word) => {
                (word.length > 4
                    && bannedWordsListArray.indexOf(word) == -1
                    && wordAppearance.indexOf(word) == -1) ?
                    wordAppearance.push(word)
                    : '';
            });


        return wordAppearance[0];
    }

    function get_url_feed_items(url) {

        return feedparser.parse(url);
    }

     async function asyncGetGifyImagesFromApi(keyword, HowMany = 3) {
        /** Get our random User agent to fire Axios Gify API request */
        const url = `https://api.giphy.com/v1/gifs/search?api_key=${gifyApiKey_public}&q=${keyword}&limit=${HowMany}&offset=0&rating=G&lang=en`;
        const random = Math.floor((Math.random() * userAgents.length) + 1);
        const config = {
            method: 'get',
            url: url,
            headers: { 'User-Agent': userAgents[random].ua }
        }

        return await axios(config);
    }


    async function addGifyImagesForKeyowrdToDB(result, item, keyword) {

        /** Add nely formated item to formatted list */

        let imageString = result.data.data[0].images.fixed_height_still.url;

        let image1 = imageString.substring(0, imageString.indexOf('?'));

        imageString = result.data.data[1] ? result.data.data[1].images.fixed_height_still.url : imageString;
        let image2 = imageString.substring(0, imageString.indexOf('?'));

        imageString = result.data.data[2] ? result.data.data[2].images.fixed_height_still.url : imageString;
        let image3 = imageString.substring(0, imageString.indexOf('?'));

        imageString = result.data.data[0] ? result.data.data[0].images.preview_gif.url : imageString;
        let animGif = imageString.substring(0, imageString.indexOf('?'));

        let newFormatedItem = {
            link: item.link,
            title: item.title,
            description: item.description,
            pubDate: item.pubDate,
            keyword: keyword,
            image1: image1,
            image2: image2,
            image3: image3,
            animGif: animGif
        }
        FormattedFeedItemsList.push(newFormatedItem);

        /** Add New Gify Images to the Database */
        db.addGifyImagesToDb(
            {
                keyword: newFormatedItem.keyword,
                image1: newFormatedItem.image1,
                image2: newFormatedItem.image2,
                image3: newFormatedItem.image3,
                animGif: newFormatedItem.animGif
            }
        );
        
        console.log(`${keyword} Image aded to db from API`);
        console.log(hr);

        return await wait(2000)


        /*
        console.log(newFormatedItem.image1);
        console.log(newFormatedItem.image2);
        console.log(newFormatedItem.image3);
        console.log(hr);
        */

    }
    function wait(time) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, time);
        });
    }
    async function process_item (items) {

        //await wait(5000);
        count = 0;
        /** Looping over our feed urls */
        for (let i = 0; i < items.length; i++) {
          
            //if (count > 1) return;
            //count++;

            item = items[i];
            
            /** We create our text array with the all text comined */
            text_array = format_text_to_array(`${item.title} ${item.description}`);

            /** We need this keyword to attach the gify image to this item */
            let keyword = get_longest_word(text_array);

            db.getGifyImagesByKeywordFromDb(keyword).then((result) => {

                /** 
                 * We do not have any images for this Keyword 
                 * Fetch it from Gify API*/
                if (result.length === 0) {
                    console.log(`${keyword} Image does not exist, getting from API`);
                    console.log(hr);
                    asyncGetGifyImagesFromApi(keyword)
                        .then((result) => {
                            // We found some images from gify 
                            if (result.data.data.length > 0) {
                                addGifyImagesForKeyowrdToDB(result, item, keyword);
                                
                            } else {
                                console.log(`${keyword} no images found on getty, 'Add to igoner list ?`);
                                console.log(hr);
                            }
                        })
                        .catch((error) => {
                            //console.log(error);
                            console.log(`${keyword} API Error, 'Add to igoner list ?`);
                    });
                        
                } else {
                    console.log(`${keyword} Image exists, getting from DB`);
                    /** Add formated item to formatted list */
                    let newFormatedItem = {
                        link: item.link,
                        title: item.title,
                        description: item.description,
                        pubDate: item.pubDate,
                        keyword: result[0].keyword,
                        image1: result[0].image1,
                        image2: result[0].image2,
                        image3: result[0].image3,
                        animGif: result[0].animGif
                    }
                    FormattedFeedItemsList.push(newFormatedItem);
                }

            });

            
        }
      }



   
    return {
        getPopularWords,
        get_longest_word,
        get_url_feed_items,
        process_item
    }

}

module.exports = scrapper_mod();