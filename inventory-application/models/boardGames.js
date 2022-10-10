const mongoose = require("mongoose");

const Schema = mongoose.Schema; 

const BoardGameSchema = new Schema({
    title: {type: String, required: true, maxLength: 100}, 
    playerCount: {type: String, required: true},
    playTime: {type: String, required: true},
    developer: {type: Schema.Types.ObjectId, ref: "Developer", required: true}, 
    genre: [{type: Schema.Types.ObjectId, ref: "Genre"}], 
    price: {type: Number, required: true}
})

BoardGameSchema.virtual("url").get(function () {
    return `/catalog/games/${this._id}`;
});

module.exports = mongoose.model("Games", BoardGameSchema);