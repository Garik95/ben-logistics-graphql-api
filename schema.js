const { buildSchema } = require('graphql')

module.exports = new buildSchema(`
    type Member{
      id: Int,
      post: String
    }    

    type Query {
      members: [Member],
      member(id:Int!): [Member]
    }

  `)
    //   type Mutation {
    //     addBook(title: String!, author: String!): Book!
    //     removeBook(title: String!): Book!
    //   }