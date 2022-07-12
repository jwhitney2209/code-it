import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Header from './components/Header';
import SignIn from './pages/SignIn';
import CreateAccount from './pages/CreateAccount';
import Dash from './pages/Dash';
import Footer from './components/Footer';
import CreateCategory from './pages/CreateCategory';
import NoteForm from './components/NoteForm';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {

  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<CreateAccount />} />
            <Route path="/dashboard" element={<Dash />} />
            <Route path="/createcategory" element={<CreateCategory />} />
            <Route path="/createnote" element={<NoteForm />} />
          </Routes>

          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
