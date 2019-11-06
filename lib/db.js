let dbUtil = () => {
    
    let MongoClient = require('mongodb').MongoClient;
    //let url = "mongodb://digitalcook.co.uk:27017/";
    let url = "mongodb://mongoadmin:denied1234@digitalcook.co.uk:27017/rss";

    let dbo;

    function connect() {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            dbo = db.db("rss");
            console.log("DB Connected");
        });
    }

    function addGifyImages (gify_obj)  {
        dbo.collection("gify_images").insertOne(gify_obj, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    }

    function getGifyImages (keyword)  {

    }

    

    connect();

    return {
        addGifyImages,
        getGifyImages
    }

}

module.exports = dbUtil();
