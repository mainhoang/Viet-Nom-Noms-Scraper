var mongoose = require('mongoose');

var recipeSchema = mongoose.Schema({
	title: {
		type: String
	},
	link: {
		type: String
	}

});

module.exports = mongoose.model('Recipe', recipeSchema);