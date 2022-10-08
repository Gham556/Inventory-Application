const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GenreSchema = new Schema({
    name: {type: String, require: true},
});

GenreSchema.virtual("url", function () {
    return `/catalog/genre/${this._id}`;
});

module.exports = mongoose.model("Genre", GenreSchema)