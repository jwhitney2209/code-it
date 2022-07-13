import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import { QUERY_NOTE } from "../utils/queries";
import { useQuery } from "@apollo/client";


import Auth from "../utils/auth";
import { QUERY_ME } from "../utils/queries";
import CategoryList from "../components/CategoryList";
import NoteList from "../components/NoteList";
import { VscSearch } from "react-icons/vsc";
//import icons

function Dash() {
  
  return (
    <main className="flex md:flex-row sm:flex-col items-center min-h-full md:h-full">
      <div className="basis-1/4 sm:w-full">
        <SideBar />
      </div>

      <div className="basis-3/4 min-h-mostscreen bg-mellow sm:w-full">
        <h3 className="text-center md:text-3xl sm:text-xl m-5">
          Please select a note to view, or create a new note.
        </h3>
        <div className="md:m-5 sm:m-3 md:p-4 sm:p-3">
          <ul>hello</ul>
        </div>
      </div>
    </main>
  );
}

export default Dash;
