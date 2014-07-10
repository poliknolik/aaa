// app/models/company.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our company model
var companySchema = mongoose.Schema({

    companyName      : String,
    streetAddress    : String,
    users            : [ {type : mongoose.Schema.ObjectId, ref : 'User'} ]

});

// create the model for users and expose it to our app
module.exports = mongoose.model('Company', companySchema);
