import React from 'react';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { QUERY_CATEGORIES, QUERY_ME, QUERY_NOTES } from '../utils/queries';
import CategoryList from '../components/CategoryList';
//import icons
import { VscNewFolder } from 'react-icons/vsc';

function Dash() {
  const { data } = useQuery(QUERY_CATEGORIES);
  const { data: userData } = useQuery(QUERY_ME);

  const categories = data?.categories || [];

  const noteData = categories.notes;

  const loggedIn = Auth.loggedIn();

  return (
    <div className="flex flex-col h-screen w-full text-antique bg-mellow">
      {loggedIn && <VscNewFolder />}
      <div className="flex flex-col h-screen md:w-28 sm:w-20 sm:items-center bg-cadet">
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

        <div className="flex flex-wrap items-center md:mx-2 md:p-2">
          <h5 className="md:text-md">Categories: </h5>
          <CategoryList categories={categories} />
        </div>
      </div>
    </div>
  );
}

export default Dash;
