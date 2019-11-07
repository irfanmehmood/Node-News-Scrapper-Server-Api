
const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB
} = process.env;

let db_mod = () => {

    const url = `mongodb://mongo:27017/myapp-mongo`;
    var MongoClient = require('mongodb').MongoClient;

    /** Our Mongo DB connection */
    let db_conn;

    function perform_query(){
        
    }

    function addGifyImagesToDb(gify_obj) {

        return new Promise((resolve, reject) => {

            let testgify_obj = {
                keyword: 'brexit',
                image1: 'https://media3.giphy.com/media/UuBmXACC5HOdBW2a6p/giphy-preview.gif?cid=e1bb72ff792cb820f428d0be7a0afb39364c61e0c82d0f01&rid=giphy-preview.gif',
                image2: 'https://media3.giphy.com/media/ej1127nuAfGxoZnWTb/giphy-preview.gif?cid=e1bb72ff792cb820f428d0be7a0afb39364c61e0c82d0f01&rid=giphy-preview.gif',
                image3: 'https://media3.giphy.com/media/ej1127nuAfGxoZnWTb/giphy-preview.gif?cid=e1bb72ff792cb820f428d0be7a0afb39364c61e0c82d0f01&rid=giphy-preview.gif'
            }
            /**
             * Add our image to db
             */

            return new Promise((resolve, reject) => {
                try {
                    // Connect to the db
                    MongoClient.connect("mongodb://localhost:27017", function (err, client) {
                        var query_regex = { keyword: gify_obj.keyword };
    
                        var db = client.db('myapp-mongo');
                        db.collection("gify_images")
                        .insertOne(gify_obj, function (err, res) {
                            if (err) reject (err);
                        });       
                    });
                } catch (e) {
                    console.log("Error with db");
                    reject (e);
                }
            });


                
        });

    }

    function getGifyImagesByKeywordFromDb(keyword) {

        return new Promise((resolve, reject) => {
            try {
                // Connect to the db
                MongoClient.connect("mongodb://localhost:27017", function (err, client) {
                    var query_regex = { keyword: keyword };

                    var db = client.db('myapp-mongo');
                    db.collection("gify_images")
                        .find(query_regex)
                        .limit(1)
                        .toArray((err, result) => {
                            if (err) reject(err);
                            resolve(result)
                        });        
                });
            } catch (e) {
                console.log("Error with db");
                reject (e);
            }
        });

    }

    function get_feed_urls() {

        return [
            { name: 'top', slug: 'top', url: 'http://feeds.bbci.co.uk/news/rss.xml' },
            { name: 'world', slug: 'world', url: 'http://feeds.bbci.co.uk/news/world/rss.xml' },
            { name: 'uk', slug: 'uk', url: 'http://feeds.bbci.co.uk/news/uk/rss.xml' },
            { name: 'business', slug: 'business', url: 'http://feeds.bbci.co.uk/news/business/rss.xml' },
            { name: 'health', slug: 'health', url: 'http://feeds.bbci.co.uk/news/health/rss.xml' },
            { name: 'science', slug: 'science', url: 'http://feeds.bbci.co.uk/news/science_and_environment/rss.xml' },
            { name: 'technology', slug: 'technology', url: 'http://feeds.bbci.co.uk/news/technology/rss.xml' },
            { name: 'entertainment', slug: 'entertainment', url: 'http://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml' }
        ]
    }

    return {
        addGifyImagesToDb,
        getGifyImagesByKeywordFromDb,
        get_feed_urls
    }

}

module.exports = db_mod();
