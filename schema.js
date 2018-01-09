var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema   = new Schema({

    name : {type: String},
    price: {type: Number},
    img1: { type: String},

});
var productSchema = mongoose.model('Product', productSchema);
module.exports = productSchema;
