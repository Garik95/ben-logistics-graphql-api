const models = require('./models')
const md5 = require('md5');
const date = require('date-and-time');
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
  trailer: async (args) => {
    return (await models.Trailer.find({"id": args.id}))
  },
  reserves: async (args) => {
    return (await models.Reserve.find({}))
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

  // mutations resolvers
  changeLoc: async (args) => {
    return (await models.Users.findOneAndUpdate(
      {"user.id":args.id},
      {$set:{"location":args.location}}
    ))
  },
  addUser: async (args) => {
    console.log(args);
    var newUser = new Users({
      "user.id":            args.id,
      "user.is_bot":        args.is_bot,
      "user.first_name":    args.first_name,
      "user.last_name":     args.last_name,
      "user.username":      args.username,
      "user.language_code": args.language_code,
      "date":               args.date 
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
    var newReserve = new models.Reserve({
      trailerid: args.trailerid,
      reserved: Date.now(),
      lat: args.lat,
      long: args.lng,
      time: date.addHours(now, 4),
      truckid: args.truckid,
      user: args.user
    });
    var err = await newReserve.save();

    if(err) console.log(err)

    models.Trailer.update({id:args.trailerid},{$set:{"status":"reserved"}}, function (err,res) {
      if(err) console.log(err)
      else console.log(res)
    })

    return newReserve
  },
  addTempTrailer: async (args) => {
    var newTempTrailer = new models.TempTrailer({
      id: args.id
    });
    var err = await newTempTrailer.save();

    if(err) console.log(err)
  }
  deleteTempTrailer: async (args) => {
    models.TempTrailer.findByIdAndRemove({"id":args.id}, function (err, res) {
      console.log(err)
      console.log(res)
    })
  }
}

module.exports = resolvers