const mongoose = require("mongoose");

const Schema = mongoose.schema; 

const BoardGameSchema = new Schema({
    title: {type: String, required: true, maxLength: 100}, 
    playerCount: {type: Number, required: true},
    playTime: {type: Number, required: true},
    developer: {type: Schema.Type.ObjectID, ref: "Developer", required: true}, 
    genre: {type: Schema.Types.ObjectID, ref: "Genre"}, 
    price: {type: Number, required: true}
})

BoardGameSchema.virtual("url").get(function () {
    return `/catalog/games/${this._id}`;
});

module.exports = mongoose.model("Games", BoardGameSchema);