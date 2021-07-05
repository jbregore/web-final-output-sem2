import React from "react";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./sidebar.css";
import { IconContext } from "react-icons";
import MyImage from "../images";
import firebase from "../utils/firebase";

const Sidebar = () => {
  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then((success) => {
        alert("Logout successfully");
      })
      .catch((err) => {
        //error
        console.log(err);
      });
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
        </div>

        <nav className={"nav-menu active"}>
          <ul className="nav-menu-items">
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <img src={MyImage.img_1} width="150" alt=""/>
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <li className="nav-text">
              <div  className="nav-text2">
                <AiIcons.AiOutlineLogout />
                <span style={{ color: "#fff"}}onClick={logout}>Logout</span>
              </div>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;