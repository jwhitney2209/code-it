import React from 'react';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { QUERY_ME } from '../utils/queries';
import CategoryList from '../components/CategoryList';
import SideBar from '../components/SideBar';
//import icons


function Dash() {
  const { data } = useQuery(QUERY_ME);

  const categories = data?.categories || [];

  const noteData = categories.notes;

  const loggedIn = Auth.loggedIn();

  return (
    <div className="grid grid-cols-4 justify-between h-screen w-full text-antique bg-mellow">
      <SideBar />
      <div>Notes Here</div>
      <CategoryList categories={categories} />
    </div>
  );
}

export default Dash;
