const models = require('./models')
var ObjectId = require('mongodb').ObjectID;

const resolvers = {

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
  }

//   addBook: async (args, context) => {
//     var newBook = new Book({
//       title: args.title,
//       author: args.author
//     })

//     var err = await newBook.save()

//     if (err) return err
//     return newBook
//   },
//   removeBook: async (args, context) => {
//     var doc = await Book.findOneAndRemove({
//       title: args.title
//     })

//     return doc
//   }
}

module.exports = resolvers