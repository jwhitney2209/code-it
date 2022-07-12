import React, { useState } from "react";
import Auth from "../../utils/auth";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { QUERY_CATEGORIES, QUERY_ME, QUERY_NOTES } from "../../utils/queries";
import CategoryList from "../CategoryList";
//import icons
import { VscNewFolder, VscNotebook, VscListTree } from "react-icons/vsc";
import { GiPowerButton } from "react-icons/gi";
import Collapsible from "react-collapsible";

function SideBar(props) {
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
        {propsData &&
          propsData.map(categories => (
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
