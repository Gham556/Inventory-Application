const mongoose = require('mongoose'); 

Schema = mongoose.Schema;

AcessorySchema = new Schema({
    name: {type: String, required: true},
    description: {type: String},
    price: {type: Number, required: true},
});

AccessorySchema.virtual("url").get(function () {
    return `/catalog/accessory/${this._id}`;
});

module.exports = mongoose.model("Accesory", AccessorySchema);