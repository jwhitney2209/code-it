import React, { useState } from 'react';
import Auth from '../../utils/auth';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { QUERY_CATEGORIES, QUERY_ME, QUERY_NOTES } from '../../utils/queries';
import CategoryList from '../CategoryList';
//import icons
import { VscNewFolder, VscNotebook, VscListTree, VscSearch } from 'react-icons/vsc';
import { GiPowerButton } from 'react-icons/gi';

function SideBar() {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  }

  // search bar usestate
  const [ searchText, setSearchText] = useState('');

  return (
    <div className="h-screen w-full text-antique bg-mellow">
      <div className="flex flex-col h-screen md:w-28 sm:w-20 sm:items-center bg-cadet">
        <div className="flex flex-row p-1 md:mx-2 md:mt-3 sm:mx-1 sm:mt-4 align-items: center justify-items-start bg-lime rounded-2xl p-5">
            <VscSearch
              size={10}
            />
            <input 
              className="border-none bg-lime focus:outline-none"
              type="text" 
              placeholder="type to search a note..." 
              onChange={setSearchText}
              />
        </div>
        <div>
          <Link to="/createcategory" type="button" className="group">
            <VscNewFolder
              size={68}
              className=" hover:bg-lime hover:text-liver hover:rounded-xl bg-mellow rounded-full p-1 md:mx-2 md:mt-6 sm:mx-1 sm:mt-4"
            />
            <p className="group-hover:scale-100 absolute w-auto p-2 m-2 min-w-max md:left-24 md:top-24 sm:left-20 sm:top-20 rounded-md shadow-md text-antique bg-liver text-xs font-bold transition-all duration-100 scale-0 origin-left">
              Add Folder
            </p>
          </Link>
        </div>

        <div>
          <Link to="/createnote" type="button" className="group">
            <VscNotebook
              size={68}
              className=" hover:bg-lime hover:text-liver hover:rounded-xl bg-mellow rounded-full p-1 md:mx-2 md:mt-6 sm:mx-1 sm:mt-4"
            />
            <p className="group-hover:scale-100 absolute w-auto p-2 m-2 min-w-max md:left-24 md:top-48 sm:left-20 sm:top-44 rounded-md shadow-md text-antique bg-liver text-xs font-bold transition-all duration-100 scale-0 origin-left">
              Create Note
            </p>
          </Link>
        </div>

        <div>
          <button type="button" className="group">
            <VscListTree
              size={68}
              className=" hover:bg-lime hover:text-liver hover:rounded-xl bg-mellow rounded-full p-1 md:mx-2 md:mt-6 sm:mx-1 sm:mt-4"
            />
            <p className="group-hover:scale-100 absolute w-auto p-2 m-2 min-w-max md:left-24 md:top-[18.5rem] sm:left-20 sm:top-[16.5rem] rounded-md shadow-md text-antique bg-liver text-xs font-bold transition-all duration-100 scale-0 origin-left">
              Categories
            </p>
          </button>
        </div>

        <div>
          <button type="submit" className="group" href="/" onClick={logout}>
            <GiPowerButton
              size={64}
              className=" hover:bg-lime hover:text-liver hover:rounded-xl bg-mellow rounded-full p-1 md:mx-2 md:mt-6 sm:mx-1 sm:mt-4"
            />
            <p className="group-hover:scale-100 absolute w-auto p-2 m-2 min-w-max md:left-24 md:top-[24.5rem] sm:left-20 sm:top-[22rem] rounded-md shadow-md text-antique bg-liver text-xs font-bold transition-all duration-100 scale-0 origin-left">
              Log Out
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
