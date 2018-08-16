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
    updatedAt:      Number,
    post:           String
});

let Users = mongoose.model('users',usersSchema);

const reserveSchema = mongoose.Schema({
    trailerid:      String,
    reserved:       Date,
    lat:            String,
    long:           String,
    time:           Date,
    truckid:        String,
    user:           String
});

let Reserve = mongoose.model('reserves',reserveSchema);

const trailermap = mongoose.Schema({
    id:     Number,
    name:   String
});

let TrailerMap = mongoose.model('trailermaps', trailermap);

const trailerSchema = mongoose.Schema({
    address:            String,
    city:               String,
    state:              String,
    name:               String,
    serial:             String,
    id:                 Number,
    lat:                String,
    lng:                String,
    zip:                Number,
    moving:             Boolean,
    movingStartTime:    String,
    stopped:            Boolean,
    stoppedStartTime:   String,
    status:             String
});

let Trailer = mongoose.model('trailers',trailerSchema);

const tokenSchema = mongoose.Schema({
    name:       String,
    service:    String,
    token:      String
});

let Token = mongoose.model('tokens',tokenSchema);

const truckSchema = mongoose.Schema({
    id:                     Number,
    vin:                    String,
    label:                  String,
    color:                  String,
    make:                   String,
    model:                  String,
    deviceSerialNumber:     String,
    year:                   Number,
    isAvailable:            Boolean
});

let Truck = mongoose.model('trucks', truckSchema);

const DriverSchema = mongoose.Schema({
    id:                 Number,
    first_name:         String,
    last_name:          String,
    email:              String,
    truckid:            Number,
    active:             Boolean
});

let Driver = mongoose.model('drivers',DriverSchema);

const LocationSchema = mongoose.Schema({
    latitude:           Number,
    longitude:          Number,
    truckid:            Number
})

let Location = mongoose.model('locations',LocationSchema);

const TempTrailerSchema = mongoose.Schema({
    id:{type: Number, unique: true},
    user: String
});

let TempTrailer = mongoose.model('temptrailer',TempTrailerSchema)

module.exports = {
    Member:Member,
    Users:Users,
    Trailer:Trailer,
    Reserve:Reserve,
    TrailerMap:TrailerMap,
    Token:Token,
    Truck:Truck,
    Driver:Driver,
    Location:Location,
    TempTrailer:TempTrailer
}