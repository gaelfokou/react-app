import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import history from './history';
import './index.css';
import App from './App';
import rootReducer from './reducers';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(rootReducer);
const cache = new InMemoryCache();

const BASE_URL = 'http://localhost:8000/graphql/';

const httpLink = createHttpLink({
  uri: BASE_URL,
  credentials: 'same-origin'
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('access_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>
    </ApolloProvider>
, document.getElementById('root'));
registerServiceWorker();
