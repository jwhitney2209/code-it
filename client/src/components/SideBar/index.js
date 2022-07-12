import React, { useState } from 'react';
import Auth from '../../utils/auth';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { QUERY_ME } from '../../utils/queries';
//import icons
import {
  VscNewFolder,
  VscNotebook,
  VscListTree,
  VscSearch,
} from 'react-icons/vsc';
import { GiPowerButton } from 'react-icons/gi';
import Collapsible from 'react-collapsible';

import NoteList from '../NoteList';

function Sidebar() {
  const { loading, data } = useQuery(QUERY_ME);

  const notes = data?.me.notes || [];
  console.log(notes);
  if (!notes.length) {
    return <h3>Please add a note!</h3>;
  }

  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <>
      <div className="flex flex-col md:w-[14.8rem] md:h-auto sm:w-full md:left-auto sm:bg-cadet/90 px-1 absolute">
        <div className="flex space-x-2 justify-center mt-3">
          <NoteList notes={notes} />
        </div>

        <div className="flex space-x-2 justify-center">
          <button
            type="button"
            className="border w-full inline-block px-6 my-2 py-2.5 bg-mellow hover:bg-lime text-liver font-medium text-xs leading-tight uppercase transition duration-150 ease-in-out"
            onClick={logout}
          >
            logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
