const mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const memberSchema = mongoose.Schema({
    id:     Number,
    post:   String
});
let Member = mongoose.model('members',memberSchema);

const usersSchema = mongoose.Schema({
    first_name:     String,
    last_name:      String,
    login:          String,
    password:       String,
    createdAt:      Number,
    updatedAt:      Number
});

let Users = mongoose.model('users',usersSchema);

const trailerSchema = mongoose.Schema({
    trailerid:  String,
    state:      String
});

let Trailer = mongoose.model('trailers',trailerSchema);

const reserveSchema = mongoose.Schema({
    trailerid:      String,
    reserved:       Date,
    lat:            String,
    long:           String,
    time:           String,
    truckid:        String
});

let Reserve = mongoose.model('reserves',reserveSchema);

const trailermap = mongoose.Schema({
    id:     Number,
    name:   String
});

let TrailerMap = mongoose.model('trailermaps', trailermap);

module.exports = {
    Member:Member,
    Users:Users,
    Trailer:Trailer,
    Reserve:Reserve,
    TrailerMap:TrailerMap
}