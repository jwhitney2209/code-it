import React from 'react';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';

const Header = () => {
  const loggedIn = Auth.loggedIn();
  return (
    <div className="w-full text-lime hover:text-white flex justify-between p-3 items-center bg-liver">
      <header className="sm:text-3xl md:text-4xl font-bold">
        <div>
        {loggedIn ? (
          <Link to="/dashboard">
            <h1 className="my-auto">&#60;code_it/&#62;</h1>
          </Link>
        ) : (
          <Link to="/">
            <h1 className="my-auto">&#60;code_it/&#62;</h1>
          </Link>
        )}
        </div>
      </header>
    </div>
  );
};
export default Header;
