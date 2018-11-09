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
      post: String,
      active: String
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
      _id: String,
      trailerid: Int!,
      reserved: String,
      lat: String,
      long:String,
      time:String,
      truckid:Int,
      city:String,
      state:String,
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
      isAvailable: String
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

    type Vehiclecount{
      trailer: Int!,
      newTrailer: Int!,
      delTrailer: Int!,
      truck: Int!,
      newTruck: Int!,
      driver: Int!,
      user: Int!,
      newReserve: Int!,
      reserve: Int!
    }

    type CountTrailer{
      all: Int!,
      unassigned: Int!,
      reserved: Int!,
      delivered: Int!
      blocked: Int!
    }

    type CountTruck{
      all: Int!,
      unassigned: Int!,
      reserved: Int!,
      available: Int!
      blocked: Int!
    }

    type PassChange{
      login: String,
      oldPass: String,
      newPass: String,
      conPass: String
    }

    type Query {
      members: [Member],
      member(id:Int!): [Member],
      users: [Users],
      user(login:String!,password:String!): [Users],
      trailers: [Trailer],
      trailersSearch(address:String,city:String,state:String,name:String,serial:String,id:Int,lat:String,lng:String,zip:Int,moving:Boolean,movingStartTime:String,stopped:Boolean,stoppedStartTime:String,status:String,limit:Int): [Trailer],
      reservedTrailers: [Trailer],
      blockedTrailers: [Trailer],
      unassignedTrailers: [Trailer],
      deliveredTrailers: [Trailer],
      trailer(id:Int!): [Trailer],
      countTrailer: CountTrailer,
      countTruck: CountTruck,
      reserves: [Reserve],
      activeReserves: [Reserve],      
      userReserves(user:String!): [Reserve],      
      userActiveReserves(user:String!): [Reserve],      
      userHookedReserves(user:String!): [Reserve],     
      userDeliveredReserves(user:String!): [Reserve],     
      reserve(id:String!): [Reserve],
      trailermap(id:Int,name:String): [TrailerMap],
      token(service:String!): [Token],
      tokens: [Token],
      truck(label:Int!): [Truck],
      trucks: [Truck],
      unassignedTrucks: [Truck],
      reservedTrucks: [Truck],
      availableTrucks: [Truck],
      blockedTrucks: [Truck],
      driver(id:Int,truckid:Int): [Driver],
      drivers: [Driver],
      location(truckid:Int!): [Location],
      locations: [Location],
      temptrailer: [TempTrailer],
      vehiclecount: Vehiclecount
    }

    type Mutation {
      addUser(first_name: String!, last_name: String!, login: String!, password: String!, post: String!,active: String!): Users!,
      changePassword(login:String!,oldPass: String!,newPass: String!,conPass: String!): PassChange,
      addTrailer(id:String!,state:String!): Trailer!,
      changeLoc(id:Int!,location:String!): Users!,
      addMember(id:Int!): Member,
      addReserve(trailerid:Int!,lat:String!,lng:String!,truckid:Int!,city:String!,state:String!,user:String!): Reserve,
      addTempTrailer(id:Int!,user:String!): TempTrailer,
      deleteTempTrailer(id:Int!): TempTrailer,
      hook(_id:String!): Reserve,
      deliver(_id:String!,truck:Int!,trailer:Int!): Reserve,
      freeReserve(_id:String!,trailerid:Int!,truckid:Int!): Reserve,
      freezeReserve(trailerid:Int!,user:String!): Reserve,
      setTrailerStatus(id:Int!,status:String!): Trailer,
      updateToken(service:String!,token:String!): Token
    }
    


  `)
    //   type Mutation {
    //     addBook(title: String!, author: String!): Book!
    //     removeBook(title: String!): Book!
    //   }