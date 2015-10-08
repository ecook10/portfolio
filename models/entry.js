//Entry mongoose model

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var entrySchema = new Schema({
    title: String,
    headline: String,
    post: String,
    blurb: String,
    date: {
        year: String,
        month: String,
        day: String
    },
    tags: Array,
    comments: Array
});

exports.Entry = mongoose.model('Entry', entrySchema);

