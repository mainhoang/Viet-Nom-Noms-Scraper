var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recipeSchema = new Schema({
	title: {
		type: String
	},
	link: {
		type: String
	},
	saved: {
		type: Boolean,
		default: false
	},
	comment: {
    	type: Schema.Types.ObjectId,
    	ref: "Comment"
  	}

});

module.exports = mongoose.model('Recipe', recipeSchema);