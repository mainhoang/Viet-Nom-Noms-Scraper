var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var port = process.env.PORT || 4000;

var Recipe = require('./models/recipe.js');
var Comment = require('./models/comment.js');

var request = require('request');
var cheerio = require('cheerio');

mongoose.Promise = Promise;

var app = express();

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost/vietNomNomsScraper');
var db = mongoose.connection;

db.on('error', function(err){
	console.log("Mongoose ERROR: ", err);
})
db.once('open', function(){
	console.log('Mongoose GOOD!');
});

app.listen(port, function(){
	console.log('LISTENING: ', port);
});

app.get("/", function(req, res) {
  res.send("Hello world");
});

app.get("/scrape", function(req, res) {

    request("http://www.vietworldkitchen.com/blog/vietnamese-recipe-index.html", function(error, response, html) {

        var $ = cheerio.load(html);

        $("li").each(function(i, element) {
            
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








