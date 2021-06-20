import React from "react";
import * as CgIcons from "react-icons/cg";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";

export const SidebarData = [
  {
    title: "Home",
    path: "/home",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Post",
    path: "/post",
    icon: <BsIcons.BsPencilSquare />,
    cName: "nav-text",
  },
  {
    title: "Profile",
    path: "/profile",
    icon: <CgIcons.CgProfile />,
    cName: "nav-text",
  },
  
  
];