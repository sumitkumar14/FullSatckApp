import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { provideApolloClient } from '@vue/apollo-composable';

export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache({addTypename: false}),
});

provideApolloClient(client);