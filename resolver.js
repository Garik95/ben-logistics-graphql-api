const models = require('./models')
const md5 = require('md5');
var ObjectId = require('mongodb').ObjectID;

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
  trailer: async (args) => {
    return (await models.Trailer.find({"trailerid": args.id}))
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
  }
}

module.exports = resolvers