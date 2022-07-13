import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

const Header = () => {
  const loggedIn = Auth.loggedIn();

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="flex flex-row justify-between w-full p-3 bg-liver">
      <div className="sm:text-3xl md:text-4xl font-bold text-lime hover:text-white">
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
      <div className="flex md:hidden space-x-2">
        <button
          type="button"
          className="border sm:rounded-lg w-full inline-block px-6 my-2 md:py-2.5 sm:py-1 bg-mellow hover:bg-lime text-liver font-medium text-xs leading-tight uppercase transition duration-150 ease-in-out md:text-base sm:text-sm sm:bg-lime"
          onClick={logout}
        >
          logout
        </button>
      </div>
    </header>
  );
};
export default Header;
