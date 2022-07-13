import React, { useState } from "react";
import Auth from "../utils/auth";
import SideBar from "../components/SideBar";


import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { QUERY_ME } from "../utils/queries";
import CategoryList from "../components/CategoryList";
import NoteList from "../components/NoteList";
import { VscSearch } from "react-icons/vsc";
//import icons

function Dash() {
  const loggedIn = Auth.loggedIn();

  return (
    <main className="flex flex-row items-center min-h-full md:h-full">
      <div className="basis-1/4 sm:w-full">
        <SideBar />
      </div>
      <div className="basis-3/4 min-h-mostscreen bg-mellow sm:w-full">
        <h3 className="text-center md:text-3xl sm:text-xl m-5">
          Please select a note to view, or create a new note.
        </h3>
      </div>
    </main>
  );
}

export default Dash;
