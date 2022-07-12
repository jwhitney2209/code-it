import React, { useState } from "react";
import Auth from "../../utils/auth";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { QUERY_CATEGORIES, QUERY_ME, QUERY_NOTES } from "../../utils/queries";
import CategoryList from "../CategoryList";
//import icons
import { VscNewFolder, VscNotebook, VscListTree, VscSearch } from "react-icons/vsc";
import { GiPowerButton } from "react-icons/gi";
import Collapsible from "react-collapsible";

function SideBar(props) {
  const [ searchText, setSearchText ] = useState('');

  const propsData = props.categories;
  if (!propsData.length) {
    return <h3>Please add a category!</h3>;
  }

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };


  return (
    <>
      <div>
        <div className="flex flex-row p-1 md:mx-2 md:mt-3 sm:mx-1 sm:mt-4 align-items: center justify-items-start bg-lime rounded-2xl">
          <VscSearch 
            size={20}
            className="fill-liver" />
          <input
            className="border-none bg-lime focus:outline-none caret-liver text-liver"
            type="text"
            placeholder="type to search"
            onChange={setSearchText}
          />
        </div>
        {propsData &&
          propsData.map((categories) => (
            <>
              <li class="relative" id="sidenavEx1"></li>

              <Collapsible trigger={categories.categoryName}>
                <p>Notes</p>
              </Collapsible>
            </>
          ))}
      </div>
    </>
  );
}

export default SideBar;
