let mongoose = require('mongoose');

// create a model class
let bookModel = mongoose.Schema({
    Item:String,
    Amount:Number,
    Price:Number,
},
{
    collection:"Bio_books"
});
module.exports = mongoose.model('Book',bookModel);
