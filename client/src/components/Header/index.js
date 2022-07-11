import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="w-full text-lime flex justify-between p-3 items-center bg-liver">
      <header className="sm:text-3xl md:text-4xl font-bold">
        <div>
          <Link to="/">
            <h1 className="my-auto">&#60;code_it/&#62;</h1>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Header;
