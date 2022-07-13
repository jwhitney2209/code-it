import React, { useState } from "react";
import Auth from "../../utils/auth";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { QUERY_ME } from "../../utils/queries";
//import icons
import {
  VscNewFolder,
  VscNotebook,
  VscListTree,
  VscSearch,
} from "react-icons/vsc";
import { GiPowerButton } from "react-icons/gi";
import Collapsible from "react-collapsible";

import NoteList from "../NoteList";

function Sidebar() {
  const [searchText, setSearchText] = useState("");
  const { loading, data } = useQuery(QUERY_ME);

  const notes = data?.me.notes || [];
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  console.log(notes);
  if (!notes.length) {
    return;
    <p> Please add a note! </p>;
  }

  return (
    <div className=" bg-cadet p-2 min-h-full" id="sidenav">
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
  );
}

export default Sidebar;
