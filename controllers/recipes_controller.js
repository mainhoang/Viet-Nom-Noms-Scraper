var express = require('express');
var router = express.Router();
var burger = require('../models/recipe.js');



router.get("/", function(req, res) {

    recipe.find({}, function(err, doc){
        if(err){
            console.log(err);
        }else{
            var hbsRecipeObj = {
                title: doc.title,
                link: doc.link
            };
            res.render('index', hbsRecipeObj);
        }
    });
  // res.send("Hello world");
});

router.get("/scrape", function(req, res) {

    request("http://www.vietworldkitchen.com/blog/vietnamese-recipe-index.html", function(error, response, html) {
        
        var $ = cheerio.load(html);

        $(".entry-body > ul > li").each(function(i, element) {
            
             var result = {};

             result.num = i;
            result.title = $(this).text();
            result.link = $(this).children("a").attr("href");

            if (result.link && result.num > 23) {

                 var entry = new Recipe(result);

                 entry.save(function(err, saved){

                     if (error) {
                        console.log(error);
                    }
                    else {
                        console.log(saved);
                    }

                 });

            }

        });

    });

    res.send("Scrape Complete");

});