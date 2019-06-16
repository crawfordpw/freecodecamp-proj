const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const shorturlSchema = new Schema(
	{
		original_url: String,
		short_url: String
	},
	{ timestamps: true }
);

module.exports = mongoose.model('shorturl', shorturlSchema);
