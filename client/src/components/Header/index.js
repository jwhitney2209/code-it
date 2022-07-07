import React from 'react';

const Header = () => {
  return (
    <div className="w-full text-lime flex justify-between p-3 items-center bg-liver">
      <header className="sm:text-3xl md:text-4xl font-bold">
        <h1 className="my-auto">
          <a href="/">&#60;code_it/&#62;</a>
        </h1>
      </header>
    </div>
  );
};

export default Header;
