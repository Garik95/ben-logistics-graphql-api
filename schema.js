const { buildSchema } = require('graphql')

module.exports = new buildSchema(`
    type Member{
      id: Int,
      post: String
    }
    
    type Users{
      _id: [String],
      user: [User],
      date: Int,
      location: String
    }

    type User{
      id: Int!,
      is_bot: String,
      first_name: String,
      last_name: String,
      username: String,
      language_code: String
    }

    input UserInput {
      id: Int!,
      is_bot: String,
      first_name: String,
      last_name: String,
      username: String,
      language_code: String
    }
    
    type Trailer{
      trailerid:String!,
      state: String!
    }

    type Reserve{
      trailerid: String!,
      reserved: String,
      lat: String,
      long:String,
      time:String,
      truckid:String
    }

    type TrailerMap{
      id: Int!,
      name: String
    }

    type Query {
      members: [Member],
      member(id:Int!): [Member],
      users: [Users],
      user(id:Int!): [Users],
      trailer(id:String!): [Trailer],
      reserves: [Reserve],
      reserve(id:String): [Reserve],
      trailermap(id:Int,name:String): [TrailerMap]
    }

    type Mutation {
      addUser(date:Int): Users!,
      addTrailer(id:String!,state:String!): Trailer!,
      changeLoc(id:Int!,location:String!): Users!,
      addMember(id:Int!): Member
    }
    


  `)
    //   type Mutation {
    //     addBook(title: String!, author: String!): Book!
    //     removeBook(title: String!): Book!
    //   }