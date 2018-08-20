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
      trailerid: Int!,
      reserved: String,
      lat: String,
      long:String,
      time:String,
      truckid:Int,
      user:String,
      status: String
    }

    type TrailerMap{
      id: Int!,
      name: String
    }

    type Token{
      name: String!,
      service: String!,
      token: String!
    }

    type Truck{
      id: Int!,
      vin: String,
      label: String,
      color: String,
      make: String,
      model: String,
      deviceSerialNumber: String,
      year: Int!,
      isAvailable: Boolean
    }

    type Driver{
      id:                 Int!,
      first_name:         String,
      last_name:          String,
      email:              String,
      truckid:            Int,
      active:             String
    }

    type Location{
      latitude:           Float,
      longitude:          Float,
      truckid:            Int!
    }

    type TempTrailer{
      id: Int!,
      user: String
    }

    type Query {
      members: [Member],
      member(id:Int!): [Member],
      users: [Users],
      user(login:String!,password:String!): [Users],
      trailers: [Trailer],
      trailer(id:Int!): [Trailer],
      reserves: [Reserve],
      activeReserves: [Reserve],      
      reserve(id:String): [Reserve],
      trailermap(id:Int,name:String): [TrailerMap],
      token(service:String!): [Token],
      tokens: [Token],
      truck(label:Int!): [Truck],
      trucks: [Truck],
      driver(id:Int,truckid:Int): [Driver],
      drivers: [Driver],
      location(truckid:Int!): [Location],
      locations: [Location],
      temptrailer: [TempTrailer]
    }

    type Mutation {
      addUser(date:Int): Users!,
      addTrailer(id:String!,state:String!): Trailer!,
      changeLoc(id:Int!,location:String!): Users!,
      addMember(id:Int!): Member,
      addReserve(trailerid:Int!,lat:String!,lng:String!,truckid:Int!,user:String!): Reserve,
      addTempTrailer(id:Int!,user:String!): TempTrailer,
      deleteTempTrailer(id:Int!): TempTrailer
    }
    


  `)
    //   type Mutation {
    //     addBook(title: String!, author: String!): Book!
    //     removeBook(title: String!): Book!
    //   }