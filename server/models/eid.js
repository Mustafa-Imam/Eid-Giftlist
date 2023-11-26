let mongoose = require('mongoose');

// create a model class

let eidModel = mongoose.Schema({
    Make: String,
    Model: String,
    Year: String,
    Colour: String,
    Price: String
},
{

    giftlist: "eid"

});

module.exports = mongoose.model("eid", eidModel);