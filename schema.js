const { buildSchema } = require('graphql')

module.exports = new buildSchema(`
    type Member{
      id: Int,
      post: String
    }
    
    type Users{
      _id: [String],
      first_name: String,
      last_name: String,
      login: String,
      password: String,
      createdAt: Int,
      updatedAt:Int,
      post: String
    }
    
    type Trailer{
      address:            String,
      city:               String,
      state:              String,
      name:               String,
      serial:             String,
      id:                 Int!,
      lat:                String,
      lng:                String,
      zip:                Int,
      moving:             Boolean,
      movingStartTime:    String,
      stopped:            Boolean,
      stoppedStartTime:   String,
      status:             String
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
      user(login:String!,password:String!): [Users],
      trailers: [Trailer],
      trailer(id:Int!): [Trailer],
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