const models = require('./models')
var ObjectId = require('mongodb').ObjectID;

const resolvers = {
  // example for lookup aggregation 
  user: async (args) => {
      // return (await models.User.find({"username":args.username}))
      return (await models.User.aggregate([
        {$match:{"username":args.username}},
        {
        $lookup:{
                from: "cards",
                localField: "_id",
                foreignField: "userid",
                as: "cards"
            }
      }])
      )
  },
  
  members: async (args) => {
    return (await models.Member.find())
  },
  member: async (args) => {
    return (await models.Member.find({"id":args.id}))
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