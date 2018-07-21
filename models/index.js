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
    _id: Array,
    user: [userSchema],
    date: Number
});


let Users = mongoose.model('users',usersSchema);

module.exports = {
    Member:Member,
    Users:Users
}