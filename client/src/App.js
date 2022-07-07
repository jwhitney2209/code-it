import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SignIn from './pages/SignIn';
import Dash from './pages/Dash';

function App() {
  return (
    <div>
      <Header />
      <SignIn />
      <Dash />
      <Footer />
    </div>
  );
}

export default App;
