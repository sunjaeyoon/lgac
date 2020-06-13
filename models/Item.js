const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
	name: {
		type: String,
		require: true
	},
	date: {
		type: Date,
		default: Date.now
	},
});

const Item = mongoose.model('item', ItemSchema)

module.exports = Item;
