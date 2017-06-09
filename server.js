var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
// var routes = require('./controllers/recipes_controller.js');
var port = process.env.PORT || 3000;

var Recipe = require('./models/recipe.js');
var Comment = require('./models/comment.js');

var request = require('request');
var cheerio = require('cheerio');

mongoose.Promise = Promise;

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// app.use('/', routes);


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


mongoose.connect('mongodb://localhost/vietNomNomsScraper');
var db = mongoose.connection;

db.on('error', function(err) {
    console.log("Mongoose ERROR: ", err);
})
db.once('open', function() {
    db.dropDatabase();
    console.log('Mongoose GOOD!');
});





app.listen(port, function() {
    console.log('LISTENING: ', port);
});





app.get("/", function(req, res) {
    Recipe.find({ 'saved': false } ,function(err, doc) {
        if (err) {
            console.log(err);
        } else {
            var hbsRecipeObj = {
                recipes: doc
            };
            res.render('index', hbsRecipeObj);
        }
    });
});

app.get("/scrape", function(req, res) {
    request("http://www.vietworldkitchen.com/blog/vietnamese-recipe-index.html", function(error, response, html) {
        
        var $ = cheerio.load(html);

        $(".entry-body > ul > li").each(function(i, element) {

            var result = {};

            result.num = i;
            result.title = $(this).text();
            result.link = $(this).children("a").attr("href");

            if (result.link && result.num > 23) {

                var entry = new Recipe(result);

                entry.save(function(err, saved) {

                    if (error) {
                        console.log(error);
                    } else {
                        console.log(saved);
                    }

                });

            }

        });

    });

    res.redirect('/');

});

app.get("/recipes", function(req, res) {
    // Grab every doc in the Articles array
    Recipe.find({}, function(error, doc) {
        // Log any errors
        if (error) {
            console.log(error);
        }
        // Or send the doc to the browser as a json object
        else {
            res.json(doc);
        }
    });
});

app.get("/recipes/:id", function(req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    Recipe.findOne({ "_id": req.params.id })
        // ..and populate all of the notes associated with it
        .populate("comment")
        // now, execute our query
        .exec(function(error, doc) {
            // Log any errors
            if (error) {
                console.log(error);
            }
            // Otherwise, send the doc to the browser as a json object
            else {
                res.json(doc);
            }
        });
});

app.post("/recipes/:id", function(req, res) {
    var newComment = new Comment(req.body);
    console.log("FFFff", newComment)
    newComment.save(function(error, doc) {
        console.log("LOGGING DOC", doc);
        console.log("LOGGING", req.params.id);
        if (error) {
            console.log(error);
        }
        else {
            Recipe.findOneAndUpdate({ "_id": req.params.id }, {$push: { "comment": doc._id }})
            .exec(function(err, doc) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(doc);
                }
            });

        }
    });
});

app.get("/update/:id", function(req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    Recipe.findOne({ "_id": req.params.id })
        // ..and populate all of the notes associated with it
        .populate("comment")
        // now, execute our query
        .exec(function(error, doc) {
            // Log any errors
            if (error) {
                console.log(error);
            }
            // Otherwise, send the doc to the browser as a json object
            else {
                res.json(doc);
            }
        });
});
app.post('/save/:id', function(req, res) {
    Recipe.findOneAndUpdate({ '_id': req.params.id }, { 'saved': true })
        .exec(function(err, doc) {
            if (err) {
                console.log(err);
            } else {
                // res.json(doc);
                res.redirect("/");
            }
        });
});
app.post('/update/:id', function(req, res) {
    Recipe.findOneAndUpdate({ '_id': req.params.id }, { 'saved': false })
        .exec(function(err, doc) {
            if (err) {
                console.log(err);
            } else {
                // res.json(doc);
                res.redirect("/saved");
            }
        });
});

app.get("/saved", function(req, res) {
    Recipe.find({ saved: true }).exec(function(err, doc) {
        if (err) {
            console.log(err)
        } else {
            var hbsRecipeObj = {
                recipes: doc
            };
            res.render('index', hbsRecipeObj)
        }
    });
});
