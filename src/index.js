import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store'
import { ApolloClient, InMemoryCache, ApolloProvider, split, HttpLink } from "@apollo/client"
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { setContext } from 'apollo-link-context'
import { BrowserRouter as Router } from 'react-router-dom'

const httpLink = new HttpLink({
  // uri: "http://localhost:4000/graphql"
  uri: "http://ec2-13-212-202-63.ap-southeast-1.compute.amazonaws.com:4000/graphql"
})

const wsLink = new WebSocketLink({
  // uri: "ws://localhost:4000/graphql",
  uri: "ws://ec2-13-212-202-63.ap-southeast-1.compute.amazonaws.com:4000/graphql",
  options: {
    reconnect: true
  }
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const authorizationLink = setContext(() => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authorizationLink.concat(splitLink),
  // cache: new InMemoryCache(),
  cache: new InMemoryCache({
    typePolicies: {
      TaskColumn: {
        fields: {
          tasks: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    }
  }),
  connectToDevTools: true,
})


ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <App />
        </Router>
      </PersistGate>
    </Provider>
  </ApolloProvider>
  ,
  document.getElementById('root')
);


