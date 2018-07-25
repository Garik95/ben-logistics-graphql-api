const mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const memberSchema = mongoose.Schema({
    id:     Number,
    post:   String
});
let Member = mongoose.model('members',memberSchema);

const userSchema = mongoose.Schema({
    id:             Number,
    is_bot:         Boolean,
    first_name:     String,
    last_name:      String,
    username:       String,
    language_code:  String
});

const usersSchema = mongoose.Schema({
    _id:        Array,
    user:       [userSchema],
    date:       Number,
    location:   String
});

let Users = mongoose.model('users',usersSchema);

const trailerSchema = mongoose.Schema({
    trailerid:  String,
    state:      String
});

let Trailer = mongoose.model('trailers',trailerSchema);

module.exports = {
    Member:Member,
    Users:Users,
    Trailer:Trailer
}