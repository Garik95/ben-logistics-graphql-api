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

    type Query {
      members: [Member],
      member(id:Int!): [Member],
      users: [Users],
      user(id:Int!): [Users],
      trailer(id:String!): [Trailer]
    }

    type Mutation {
      addUser(date:Int): Users!,
      addTrailer(id:String!,state:String!): Trailer!,
      changeLoc(id:Int!): Users!
    }
    


  `)
    //   type Mutation {
    //     addBook(title: String!, author: String!): Book!
    //     removeBook(title: String!): Book!
    //   }