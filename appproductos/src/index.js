import React from 'react';
import ReactDOM from 'react-dom';
import './views/assets/styles/index.css';
import Main from './App';
import reportWebVitals from './reportWebVitals';
import { client } from './graphql/ApolloClient';
import { ApolloProvider } from '@apollo/client';
import { UserProvider } from "./UserContext";

ReactDOM.render(
  <ApolloProvider client={client}>
    <UserProvider>
      <Main />
    </UserProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
