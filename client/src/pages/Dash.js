import React from 'react';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { QUERY_CATEGORIES, QUERY_ME, QUERY_NOTES } from '../utils/queries';
import CategoryList from '../components/CategoryList';
import SideBar from '../components/SideBar';
//import icons
import { VscNewFolder, VscNotebook } from 'react-icons/vsc';
import { GiPowerButton } from 'react-icons/gi';

function Dash() {
  const { data } = useQuery(QUERY_CATEGORIES);
  const { data: userData } = useQuery(QUERY_ME);

  const categories = data?.categories || [];

  const noteData = categories.notes;

  const loggedIn = Auth.loggedIn();

  return (
    <div className="grid grid-cols-4 justify-between h-screen w-full text-antique bg-mellow">
      {loggedIn && <SideBar />}
      <SideBar />
      <div>Notes Here</div>
    </div>
  );
}

export default Dash;
