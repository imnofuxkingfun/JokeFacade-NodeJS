// graphql/typeDefs.js
import graphql from 'graphql'

export const typeDefs = gql`
  type Role {
    id: ID!
    name: String!
  }

  type User {
    id: ID!
    username: String!
    role: Role
  }

  type Query {
    getRoles: [Role]
    me: User
  }
`;