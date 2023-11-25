let mongoose = require('mongoose');

// create a model class

let carModel = mongoose.Schema({
    Make: String,
    Model: String,
    Year: String,
    Colour: String,
    Price: String
},
{

    collection: "car"

});

module.exports = mongoose.model("car", carModel);