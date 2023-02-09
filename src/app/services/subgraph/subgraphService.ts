import { ApolloClient, InMemoryCache } from '@apollo/client';

export const subgraphService = new ApolloClient({
  uri: "",
  cache: new InMemoryCache()
})