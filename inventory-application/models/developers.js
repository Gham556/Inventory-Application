const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DeveloperSchema = new Schema({
    name: {type: String, required: true},
});

DeveloperSchema.virtual("url").get(function () {
    return `/catalog/developer/${this._id}`;
});

module.exports = mongoose.model("Developer", DeveloperSchema);