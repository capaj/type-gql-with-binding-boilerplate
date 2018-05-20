const fetch = require('node-fetch')
const { HttpLink } = require('apollo-link-http')
const {
  makeRemoteExecutableSchema,
  introspectSchema
} = require('graphql-tools')
const typeDefs = require('./schema')

// Create the `HttpLink` required for the remote executable schema
const endpoint = `http://localhost:3350/graphql`
const link = new HttpLink({ uri: endpoint, fetch })

// Create the remote schema
const schema = makeRemoteExecutableSchema({ link, schema: typeDefs })

module.exports = schema
