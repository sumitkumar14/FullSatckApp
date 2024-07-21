const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// Sample data
const data = [
  { name: 'A', description: 'This is a description of A', parent: '' },
  { name: 'B', description: 'This is a description of B', parent: 'A' },
  { name: 'C', description: 'This is a description of C', parent: 'A' },
  { name: 'D', description: 'This is a description of D', parent: 'A' },
  { name: 'B-1', description: 'This is a description of B-1', parent: 'B' },
  { name: 'B-2', description: 'This is a description of B-2', parent: 'B' },
  { name: 'B-3', description: 'This is a description of B-3', parent: 'B' }
];

// GraphQL schema
const typeDefs = gql`
  type Item {
    name: String!
    description: String!
    parent: String
    children: [Item]
  }

  type Query {
    items: [Item]
  }
`;

// Resolver functions
const resolvers = {
  Query: {
    items: () => buildHierarchy(data),
  },
  Item: {
    children: (parent) => data.filter(item => item.parent === parent.name),
  },
};

// Function to build the hierarchical structure
function buildHierarchy(data) {
  let map = {};
  let root = [];

  // Create a map of items
  data.forEach(item => {
    map[item.name] = { ...item, children: [] };
  });

  // Iterate through the items and create the hierarchy
  data.forEach(item => {
    if (item.parent) {
      map[item.parent].children.push(map[item.name]);
    } else {
      root.push(map[item.name]);
    }
  });

  return root;
}

// Initialize the Apollo server
const server = new ApolloServer({ typeDefs, resolvers });

// Initialize Express application
const app = express();
server.applyMiddleware({ app });

// Start the server
app.listen({ port: 4000 }, () =>
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
);
