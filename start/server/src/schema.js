const { gql } = require('apollo-server')




const typeDefs = gql`

  type Rocket {
    id: ID!
    name: String
    type: String
  }

  type User {
    id: ID!
    email: String!
    trips: [Launch]!
  }

  type Mission {
    name: String
    missionPatch(size: PatchSize): String
  }

  enum PatchSize {
    SMALL
    LARGE
  }

  type Launch {
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean!
  }

  type TripUpdateResponse {
    success: Boolean!
    message: String
    launches: [Launch]
  }


  type Query {
    launches(
      pageSize: Int 
      after: String
      ) : LaunchConnection!
    launch(id: ID!): Launch
    me: User
  }  

  type Mutation {
    # if false, booking trips failed -- check errors
    bookTrips(launchIds: [ID]!) : TripUpdateResponse!

    # if false, cancellation failed == check errors 
    cancelTrip(launchId: ID!) : TripUpdateResponse!

    # login token
    login(email: String): String 
  }

  type LaunchConnection {
    cursor: String!
    hasMore: Boolean!
    launches: [Launch]!
  }

`

module.exports = typeDefs