

let dbUtil = () => {
    
    
    function addGifyImages (gify_obj)  {

        var MongoClient = require('mongodb').MongoClient;
        let url = "mongodb://irfan:denied1234@151.80.38.74:27017/rss";


        MongoClient.connect(url, { 
             
          }, function(err, db) {
        
              if (err) throw err;
        
              var dbo = db.db("rss");
        
                let testgify_obj = {
                    keyword: 'brexit',
                    image1: 'https://media3.giphy.com/media/UuBmXACC5HOdBW2a6p/giphy-preview.gif?cid=e1bb72ff792cb820f428d0be7a0afb39364c61e0c82d0f01&rid=giphy-preview.gif',
                    image2: 'https://media3.giphy.com/media/ej1127nuAfGxoZnWTb/giphy-preview.gif?cid=e1bb72ff792cb820f428d0be7a0afb39364c61e0c82d0f01&rid=giphy-preview.gif',
                    image3: 'https://media3.giphy.com/media/ej1127nuAfGxoZnWTb/giphy-preview.gif?cid=e1bb72ff792cb820f428d0be7a0afb39364c61e0c82d0f01&rid=giphy-preview.gif'
                }
            
                dbo.collection("gify_images")
                .insertOne(gify_obj, function(err, res) {
                    if (err) throw err;
                    db.close();
                });
        
        });

    }

    function getGifyImages (keyword)  {

        var MongoClient = require('mongodb').MongoClient;
        let url = "mongodb://irfan:denied1234@151.80.38.74:27017/rss";

        return new Promise((resolve, reject) => {

           MongoClient.connect(url, { 
                
              }, function(err, db) {
            
                  if (err) throw err;
            
                  var dbo = db.db("rss");
                  var query_regex = {keyword: keyword} ;
            
                  dbo.collection("gify_images")
                    .find(query_regex)
                    .limit(1)
                    .toArray(function(err, result) {
                              if (err) throw err;
                              resolve(result)
                              db.close();
                            }
                    );
            
            });
        });

    }

    return {
        addGifyImages,
        getGifyImages
    }

}

module.exports = dbUtil();
