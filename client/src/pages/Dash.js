import React, { useState } from 'react';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { QUERY_ME } from '../utils/queries';
import CategoryList from '../components/CategoryList';
import SideBar from '../components/SideBar';
import NoteList from '../components/NoteList';
import { VscSearch } from 'react-icons/vsc';
//import icons

function Dash() {
  const [searchText, setSearchText] = useState('');

  const loggedIn = Auth.loggedIn();

  return (
    <div className="flex justify-between items-center">
      <div className="h-screen w-full text-liver bg-mellow">
        <div
          class="md:w-60 md:h-full sm:w-full bg-cadet/90 px-1 absolute"
          id="sidenav"
        >
          <div className="flex flex-row p-1 md:mx-2 md:mt-3 sm:mx-1 sm:mt-4 align-items: center justify-items-start bg-lime rounded-2xl border">
            <VscSearch size={20} className="fill-liver pl-1" />
            <input
              className="border-none bg-lime pl-2 focus:outline-none caret-liver text-liver"
              type="text"
              placeholder="type to search"
              onChange={setSearchText}
            />
          </div>
          <div className="flex space-x-2 justify-center">
            <Link
              to="/createnote"
              type="button"
              className="border w-full inline-block px-6 my-2 py-2.5 bg-mellow hover:bg-lime text-liver font-medium text-xs leading-tight uppercase transition duration-150 ease-in-out"
            >
              [+] Add Note
            </Link>
          </div>
          {loggedIn && (
            <ul>
              <SideBar />
            </ul>
          )}
        </div>

        <h3 className="text-center md:text-3xl sm:text-xl">
          Please select a note to view.
        </h3>
      </div>
    </div>
  );
}

export default Dash;
