const models = require('./models')
var ObjectId = require('mongodb').ObjectID;

const resolvers = {
  // query resolvers
  
  members: async (args) => {
    return (await models.Member.find())
  },
  member: async (args) => {
    return (await models.Member.find({"id":args.id}))
  },
  users: async (args) => {
    return (await models.Users.find())
  },
  user: async (args) => {
    return (await models.Users.find({"user.id": args.id}))
  },
  trailer: async (args) => {
    return (await models.Trailer.find({"trailerid": args.id}))
  },

  // mutations resolvers
  changeLoc: async (args) => {
    return (await models.Users.find({"user.id":args.id}, function(err, user){
      user.location = 'asd';
      user.save();
      console.log(user);
    }))
    // console(userLoc);
    // return userLoc
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
  }
}

module.exports = resolvers