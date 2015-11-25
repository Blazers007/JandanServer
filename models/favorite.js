var mongoose = require('mongoose');

var favoriteSchema = new mongoose.Schema({
	userId: {type: String, unique: true, index: true},
	newses:[{
		id: Number,
		favTime: Number
	}],
	images:[{
		url: String,
		favTime: Number
	}],
	jokes:[{
		comment_ID: Number,
		favTime: Number
	}],
    date:{type: Date, default: Date.now}
});

module.exports = mongoose.model('Favorite', favoriteSchema);