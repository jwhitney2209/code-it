import React, { useState } from 'react';
import Auth from '../../utils/auth';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { QUERY_CATEGORIES, QUERY_ME, QUERY_NOTES } from '../../utils/queries';
import CategoryList from '../CategoryList';
//import icons
import { VscNewFolder, VscNotebook, VscListTree } from 'react-icons/vsc';
import { GiPowerButton } from 'react-icons/gi';
import Collapsible from 'react-collapsible';

function SideBar(props) {
  const propsData = props.categories;
  if (!propsData.length) {
    return <h3>Please add a category!</h3>;
  }

  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <>
      <div>
        {propsData &&
          propsData.map(categories => (
            <>
              <li class="relative flex flex-wrap m-1 pt-3" id="sidenavEx1">
                <VscListTree
                  size={30}
                  className="hover:bg-lime hover:text-liver hover:rounded-xl bg-mellow rounded-full p-1"
                />
                <p className="p-1">Categories: </p>
              </li>

              <Collapsible
                trigger={categories.categoryName}
                className="p-3 text-lg"
              >
                <p className="p-3">Notes</p>
              </Collapsible>
            </>
          ))}
      </div>
      <div className="absolute bottom-9 left-3 m-1 pt-3">
        <button
          type="submit"
          href="/"
          className="rounded-xl w-[10rem] my-5 p-2 text-center bg-mellow hover:bg-lime hover:text-liver"
          onClick={logout}
        >
          <GiPowerButton size={30} className="mx-1" />
          <p className="absolute left-[3.5rem] bottom-[1.8rem] text-lg font-semibold hover:text-liver">
            Logout
          </p>
        </button>
      </div>
    </>
  );
}

export default SideBar;
