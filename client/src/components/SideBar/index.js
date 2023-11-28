import React, { useState } from "react";
import Auth from "../../utils/auth";
import NoteList from "../NoteList";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { QUERY_ME } from "../../utils/queries";
//import icons
import {
  VscSearch,
} from "react-icons/vsc";




function Sidebar() {
  const [searchText, setSearchText] = useState("");

  const handleSearchNote = (event) => {
    setSearchText(event.target.value);
  };

// eslint-disable-next-line
  const { loading, data } = useQuery(QUERY_ME);

  const notes = data?.me.notes || [];
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <div className="flex sm:p-4 flex-col md:justify-between bg-cadet p-2 border-right min-h-mostscreen md:max-h-max sm:max-h-fit" id="sidenav">
      <div className="">
        <div className="flex flex-row p-1 md:mx-2 md:mt-3 sm:mx-1 sm:mt-4 align-items: center justify-items-start bg-lime rounded-2xl border">
          <VscSearch size={20} className="fill-liver pl-1" />
          <input
            className="border-none bg-lime pl-2 focus:outline-none caret-liver text-liver"
            type="text"
            value={searchText}
            placeholder="type to search"
            onChange={handleSearchNote}
          />
        </div>

        <div className="flex space-x-2 justify-center">
          <Link
            to="/createnote"
            type="button"
            className="border w-full inline-block px-6 my-2 py-2.5 bg-mellow hover:bg-lime text-liver font-medium text-xs leading-tight uppercase transition duration-150 ease-in-out md:text-base sm:text-sm"
          >
            [+] Add Note
          </Link>
        </div>

        <div className="flex space-x-2 justify-start mt-3 overscroll-contain sm-hidden">
          {/* <NoteList 
            notes={notes.filter((note) => note.category.name.toLowerCase().includes(searchText))} /> */}
          <NoteList notes={notes} />
      </div>

      <div className="sm:mx-3 sm-hidden">
        <div className="flex space-x-2 justify-center">
          <button
            type="button"
            className="border w-full inline-block px-6 my-2 md:py-2.5 sm:py-1 md:bg-mellow md:hover:bg-lime text-liver font-medium text-xs leading-tight uppercase transition duration-150 ease-in-out md:text-base sm:text-sm sm:bg-lime"
            onClick={logout}
          >
            logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
