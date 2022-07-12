import React from "react";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { QUERY_ME } from "../utils/queries";
import CategoryList from "../components/CategoryList";
import SideBar from "../components/SideBar";
import NoteList from "../components/NoteList"
//import icons

function Dash() {
  const { loading, data } = useQuery(QUERY_ME);

  const categories = data?.me.categories || [];

  // const notesData = categories.notes
  // notesData.noteTitle etc...

  const notes = data?.me.categories.notes || [];

  const loggedIn = Auth.loggedIn();

  return (
    <div>
      {loggedIn && (
        <div className="grid grid-cols-4 justify-between h-screen w-full text-antique bg-mellow">
          <div
            class="w-60 h-full bg-cadet/90 px-1 absolute"
            id="sidenav"
          >
            <ul>
            <SideBar categories={categories}/>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dash;
