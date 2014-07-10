// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        email        : { type: String, required: true, unique: true },
        password     : { type: String, required: true, unique: false },
        role         : { 
            bitMask  : { type: Number, required: true, unique: false },
            title    : { type: String, required: true, unique: false } 
        }
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    firstName        : String,
    lastName         : String,
    streetAddress    : String,
    workPhone        : String,
    mobilePhone      : String,
    phoneExtension   : String,
    company          : { type: mongoose.Schema.ObjectId, ref: 'Company' }

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
