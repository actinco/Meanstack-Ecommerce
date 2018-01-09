var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CheckoutSchema   = new Schema({

    name : {type: String},
    price: {type: Number},
    img1: { type: String},


});
var checkoutSchema = mongoose.model('Checkout',CheckoutSchema);
module.exports = checkoutSchema;
