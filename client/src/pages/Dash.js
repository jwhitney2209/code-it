import React from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES, QUERY_ME, QUERY_NOTES } from "../utils/queries";

function Dash() {
  // queries the user's data - this includes ALL categories and ALL notes by the user
  const { data: userData } = useQuery(QUERY_ME);
  // queries all categories - nested in each category are the notes for each category
  const { loading, data } = useQuery(QUERY_CATEGORIES);

  // all category data
  const categories = data?.categories || [];
  // this should be the correct way to add the categoryId and category name to the html element
  // {categories._id} | {categories.name}
  // example: <div id={categories._id}>{categories.name}</div> -- I'm praying this works :)

  // try these to generate note data
  // {categories.notes.noteTitle} || {categories.notes.noteText} || {categories.notes.noteSnippet} || {categories.notes.createdAt}..etc...
  // we could also try the code below this to make the prop drilling less
  const noteData = categories.notes; // that way you only have to type
  // {noteData.noteTitle} || {noteData.noteText} || {noteData.noteSnippet} || {noteData.createdAt} etc...

  const loggedIn = Auth.loggedIn();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-1 w-full bg-cadet md:p-12">
      <div className="md:p-6 sm:p-4 flex flex-wrap">
        <div class="flex space-x-2 justify-center">
          <Link
            to="/createcategory"
            type="button"
            class="border inline-block px-6 py-2.5 bg-mellow text-white font-medium text-xs leading-tight uppercase shadow-md hover:bg-lime hover:shadow-lg focus:bg-mellow focus:shadow-lg focus:outline-none focus:ring-0 active:bg-mellow active:shadow-lg transition duration-150 ease-in-out"
          >
            [+] Add a Category
          </Link>
        </div>
        {/* <div class="flex space-x-2 mx-2 justify-center">
          <button
            type="button"
            class="inline-block px-6 py-2.5 bg-mellow text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-mellow hover:shadow-lg focus:bg-mellow focus:shadow-lg focus:outline-none focus:ring-0 active:bg-mellow active:shadow-lg transition duration-150 ease-in-out"
          >
            [+] Add a Note
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default Dash;
