const models = require('./models')
const md5 = require('md5');
const date = require('date-and-time');
const io = require('socket.io-client');

var socket = io.connect('http://ben-logistics-socket.eu-4.evennode.com/');

var ObjectId = require('mongodb').ObjectID;

let now = new Date();

const resolvers = {
  // query resolvers
  
  members: async (args) => {
    return (await models.Member.find({}))
  },
  member: async (args) => {
    return (await models.Member.find({"id":args.id}))
  },
  users: async (args) => {
    return (await models.Users.find({}))
  },
  user: async (args) => {
    let hash = md5(args.password);
    return (await models.Users.find({"login": args.login,"password": hash.toUpperCase()}))
  },
  trailers: async (args) => {
    return (await models.Trailer.find({}))
  },
  trailersSearch: async (args) => {
    args['status'] = "available";
    if(args['state']) args['state'] = args['state'].toUpperCase();
    if(args['city']) {
      args['city'] = args['city'].toLowerCase();
      args['city'] = args['city'].charAt(0).toUpperCase()+ args['city'].slice(1);
    }
    if(args['name'])
      args['name'] = { $regex: args['name'] };
    // console.log(args);
    return (await models.Trailer.find(args).limit(25))
  },
  reservedTrailers: async (args) => {
    return (await models.Trailer.find({"status":"reserved"}))
  },
  blockedTrailers: async (args) => {
    return (await models.Trailer.find({"status":"blocked"}))
  },
  unassignedTrailers: async (args) => {
    return (await models.Trailer.find({"status":null}))
  },
  deliveredTrailers: async (args) => {
    return (await models.Trailer.find({"status":"delivered"}))
  },
  trailer: async (args) => {
    return (await models.Trailer.find({"id": args.id}))
  },
  countTrailer: async (args) => {
    var all = models.Trailer.find({}).count();
    var unassigned = models.Trailer.find({"status":null}).count();
    var reserved = models.Trailer.find({"status":"reserved"}).count();
    var delivered = models.Trailer.find({"status":"delivered"}).count();
    var blocked = models.Trailer.find({"status":"blocked"}).count();
    return (await {all, unassigned, reserved, delivered, blocked})
  },
  countTruck: async (args) => {
    var all = models.Truck.find({}).count();
    var unassigned = models.Truck.find({"isAvailable":null}).count();
    var reserved = models.Truck.find({"isAvailable":"false"}).count();
    var available = models.Truck.find({"isAvailable":true}).count();
    var blocked = models.Truck.find({"isAvailable":"blocked"}).count();
    return (await {all, unassigned, reserved, available, blocked})
  },
  reserves: async (args) => {
    return (await models.Reserve.find({}))
  },
  activeReserves: async (args) => {
    return (await models.Reserve.find({"status":"active"}))
  },
  userReserves: async (args) => {
    return (await models.Reserve.find({"user": args.user}))
  },
  userActiveReserves: async (args) => {
    return (await models.Reserve.find({"user": args.user,"status":"active"}))
  },
  userHookedReserves: async (args) => {
    return (await models.Reserve.find({"user": args.user,"status":"hooked"}))
  },
  userDeliveredReserves: async (args) => {
    return (await models.Reserve.find({"user": args.user,"status":"delivered"}))
  },
  reserve: async (args) => {
    return (await models.Reserve.find({"trailerid":args.id}).sort({"reserved":-1}).limit(1))
  },
  trailermap: async (args) => {
    if(args.id)
      return (await models.TrailerMap.find({"id":args.id}))
    if(args.name)
      return (await models.TrailerMap.find({"name":args.name}))      
  },
  token: async (args) => {
    return (await models.Token.find({"service":args.service}))
  },
  tokens: async (args) => {
    return (await models.Token.find({}))
  },
  truck: async (args) => {
    return (await models.Truck.find({"label":{ "$regex": args.label}}))
  },
  trucks: async (args) => {
    return (await models.Truck.find({}))
  },
  unassignedTrucks: async (args) => {
    return (await models.Truck.find({"isAvailable":null}))
  },
  reservedTrucks: async (args) => {
    return (await models.Truck.find({"isAvailable":"false"}))
  },
  availableTrucks: async (args) => {
    return (await models.Truck.find({"isAvailable":true}))
  },
  blockedTrucks: async (args) => {
    return (await models.Truck.find({"isAvailable":"blocked"}))
  },
  driver: async (args) => {
    if(args.id)
      return (await models.Driver.find({"id":args.id}))
    if(args.truckid)
      return (await models.Driver.find({"truckid":args.truckid}))
  },
  drivers: async (args) => {
    return (await models.Driver.find({}))
  },
  location: async (args) => {
    return (await models.Location.find({"truckid":args.truckid}))
  },
  locations: async (args) => {
    return (await models.Location.find({}))
  },
  temptrailer: async (args) => {
    return (await models.TempTrailer.find({}))
  },
  vehiclecount: async (args) => {
    var trailer =     models.Trailer.find({}).count();
    var newTrailer =  models.Trailer.find({"status":null}).count();
    var delTrailer =  models.Trailer.find({"status":"delivered"}).count();
    var truck =       models.Truck.find({}).count();
    var newTruck =    models.Truck.find({"isAvailable":null}).count();
    var driver =      models.Driver.find({}).count();
    var user =        models.Users.find({}).count();
    var reserve =     models.Reserve.find({}).count();
    var newReserve =  models.Reserve.find({"status":"active"}).count();
    return (await {trailer,newTrailer,delTrailer,truck,newTruck,driver,user,reserve,newReserve})
  },

  // mutations resolvers
  changeLoc: async (args) => {
    return (await models.Users.findOneAndUpdate(
      {"user.id":args.id},
      {$set:{"location":args.location}}
    ))
  },
  addUser: async (args) => {
    var newUser = new models.Users({
      "first_name":         args.first_name,
      "last_name":          args.last_name,
      "login":              args.login,
      "password":           md5(args.password).toUpperCase(),
      "post":               args.post,
      "active":             args.active
    })

    var err = await newUser.save()

    if (err) console.log(err)
    return newUser
  },
  addTrailer: async (args) => {
    var newTrailer = new Trailer({
      trailerid:  args.id,
      state:      args.state
    })
    console.log(newTrailer.save())
  },
  addMember: async (args) => {
    var newMember = new models.Member({
      id:     args.id,
      post:   "user" 
    });

    var err = await newMember.save();

    if(err) console.log(err)
    return newMember
  },
  addReserve: async (args) => {
    let now = new Date();
    var newReserve = new models.Reserve({
      _id: ObjectId(),
      trailerid: args.trailerid,
      reserved: now,
      lat: args.lat,
      long: args.lng,
      time: date.addHours(now, 4),
      truckid: args.truckid,
      city: args.city,
      state: args.state,
      user: args.user,
      status: "active"
    });
    var err = await newReserve.save();

    if(err) console.log(err)

    models.Trailer.update({id:args.trailerid},{$set:{"status":"reserved"}}, function (err,res) {
      if(err) console.log(err)
      else console.log(res)
    })

    models.Truck.update({id:args.truckid},{$set:{"isAvailable":"false"}}, function (err,res) {
      if(err) console.log(err)
      else console.log(res)
    })

    socket.emit('reserve', { trailerid: args.trailerid, state: 'reserved'})

    return newReserve
  },
  freeReserve: async (args) => {

    models.Reserve.update({ _id: ObjectId(args._id)},{$set:{"status":"released"}}, function (err,res) {
      if(err) console.log(err)
      else console.log(res)
    })

    models.Trailer.update({id:args.trailerid},{$set:{"status":"available"}}, function (err,res) {
      if(err) console.log(err)
      else console.log(res)
    })

    models.Truck.update({id:args.truckid},{$set:{"isAvailable":true}}, function (err,res) {
      if(err) console.log(err)
      else console.log(res)
    })

    socket.emit('reserve', { trailerid: args.trailerid, state: 'available'})

  },
  freezeReserve: async (args) => {
    models.Reserve.update({trailerid:args.trailerid,user:args.user,status:"active"},{$set:{"status":"freezed"}}, function (err,res) {
      if(err) console.log(err)
      else console.log(res)
    })
  },
  addTempTrailer: async (args) => {
    var newTempTrailer = new models.TempTrailer({
      id:   args.id,
      user: args.user
    });
    var err = await newTempTrailer.save();

    if(err) console.log(err)
  },
  deleteTempTrailer: async (args) => {
    models.TempTrailer.remove({"id":args.id}, function (err, res) {
      if(err) console.log(err)
      else console.log(res)
    })
  },
  hook: async (args) => {
    models.Reserve.update({ _id: ObjectId(args._id)},{$set:{"status":"hooked"}}, function (err,res) {
      if(err) console.log(err)
      else console.log(res)
    })
  },
  deliver: async (args) => {
    models.Reserve.update({ _id: ObjectId(args._id)},{$set:{"status":"delivered"}}, function (err,res) {
      if(err) console.log(err)
      else console.log(res)
    })
    
    models.Truck.update({id:args.truck},{$set:{"isAvailable":true}}, function (err,res) {
      if(err) console.log(err)
      else console.log(res)
    })

    models.Trailer.update({"id":args.trailer},{$set:{"status":"delivered"}},{upsert:false}, function (err,res) {
      if(err) console.log(err)
      else console.log(res)
    })
  },
  setTrailerStatus: async (args) => {  
    models.Trailer.update({"id":args.id},{$set:{"status":args.status.toLowerCase()}},{upsert:false,multi:true}, function (err,res) {
      if(err) console.log(err)
      else console.log(res)
    })
  },
  updateToken: async (args) => {
    models.Token.update({"service":args.service},{$set:{"token":args.token}},{upsert:true}, function(err,res){
      if(err) console.log(err)
      else console.log(res)
    })
  },
  changePassword: async (args) => {
    if(args.newPass === args.conPass)
    {
      models.Users.find({"login":args.login,"password":md5(args.oldPass).toUpperCase()},function(err,res){
        if (err) return err;
        else{
          if(res.length > 0) {
            models.Users.update({"login":args.login},{$set:{"password":md5(args.newPass).toUpperCase()}},function(err,childres){
              if (err) console.log(err);
              console.log(childres);
              if(childres.ok == 1) console.log(args.login + "'s password changed to: "+args.newPass);
            })
          }
          else console.log("Incorrect password!");
        }
      });
    }else console.log("Password does not match!");
  }
}

module.exports = resolvers