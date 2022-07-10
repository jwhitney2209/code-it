import React from "react";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { QUERY_CATEGORIES, QUERY_ME, QUERY_NOTES } from "../utils/queries";
import CategoryList from "../components/CategoryList";

function Dash() {
  const { data } = useQuery(QUERY_CATEGORIES);
  const { data: userData } = useQuery(QUERY_ME);

  const categories = data?.categories || [];

  const noteData = categories.notes;

  const loggedIn = Auth.loggedIn();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-1 w-full bg-cadet md:p-12">
      <div className="md:p-6 sm:p-4 flex flex-wrap">
        <div className="flex space-x-2 justify-center">
          {loggedIn && (
            <Link
              to="/createcategory"
              type="button"
              className="border inline-block px-6 py-2.5 bg-mellow text-white font-medium text-xs leading-tight uppercase hover:bg-lime focus:bg-mellow focus:outline-none focus:ring-0 active:bg-mellow transition duration-150 ease-in-out"
            >
              [+] Add a Category
            </Link>
          )}
        </div>
        <div>
        </div>
        <div>
          {loggedIn && userData ? (
           <CategoryList categories={categories} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Dash;
