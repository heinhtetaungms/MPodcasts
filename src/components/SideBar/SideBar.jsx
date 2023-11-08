import React, {useEffect, useState} from "react";
import "../../style/Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCrown,
  faHome,
  faMusic,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import authStore from "../../zustand/authStore";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import MPodcasts_logo from '../../assets/img/MPodcasts_logo.png';


const Sidebar = () => {
  const store = authStore.getState();
  const [openToggle] = authStore((state) => [state.sidebarToggle]);
  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate();
  const [authTheme] = authStore((state) => [state.theme]);

  const toggleSidebar = () => {
    store.setToggle(!openToggle);
  };

  const handleMenuClick = (index) => {
    setActiveMenu(index);
    console.log("after select", activeMenu)
  };

  const logoClickHandler = () => {
    navigate("/");
  }

  const menus = [
    { name: "Home", link: "/", icon: faHome },
    { name: "Writers", link: "/originalwriter", icon: faUser },
    { name: "Playlists", link: "/playlist", icon: faMusic },
    { name: "Subscription", link: "/buyvip", icon: faCrown },
  ];

  useEffect(() => {
    // Find the index of the "Home" menu item in the menus array
    const homeMenuIndex = menus.findIndex((menu) => menu.link === "/");
    if (homeMenuIndex !== -1) {
      setActiveMenu(homeMenuIndex);
    }
  }, []);

  return (
      <div
          className={`fixed z-20 top-0 bottom-0 bg-[#fafbfc] dark:bg-dark dark:border-r-2 border-darkgray overflow-x-hidden min-h-screen ${
              openToggle ? "w-18%" : "w-5%"
          } duration-500 sidebar-transition`}
          style={{ overflowY: "auto" }}
      >
        <div className=" px-6 py-3 flex h-[80px] items-center justify-between">
        <span className={`flex items-center ${!openToggle ? "hidden duration-700" : ""} `}
              onClick={logoClickHandler}>
          <span className="h-[5rem] w-[5rem] object-cover object-center" >
            <img src={MPodcasts_logo} alt="logo" className="w-full h-full"/>
          </span>
          <span className="font-bold text-black text-xl font-mono dark:text-white">
            M Podcasts
          </span>
        </span>
          <span onClick={toggleSidebar} className="cursor-pointer">
          <FontAwesomeIcon icon={faBars} className="text-[#0080ff] text-2xl"/>
        </span>
        </div>
        <div className="flex flex-col gap-4 mt-8">
          {menus?.map((menu, i) => (
              <NavLink
                  to={menu?.link}
                  key={i}
                  className={`py-2 px-6 flex items-center gap-3.5 font-bold text-sm text-[#808080] 
                   ${i === activeMenu ? "active-menu" : ""}
                   ${authTheme === "dark" ? "dark " : ""}menu-item`}
                  onClick={() => handleMenuClick(i)}
              >
                {menu?.icon && (
                    <div>
                      {React.createElement(FontAwesomeIcon, {
                        icon: menu?.icon,
                        style: { color: "#0080ff" },
                      })}
                    </div>
                )}
                <h2
                    style={{ transitionDelay: `${i + 2}00ms` }}
                    className={`whitespace-pre text-[15px] 
               ${!openToggle && "opacity-0 translate-x-28 overflow-hidden"}`}
                >
                  {menu?.name}
                </h2>
              </NavLink>
          ))}
          <div className="pb-3 flex flex-col gap-4 absolute bottom-0">
            <NavLink
                to="/faq"
                className={({ isActive }) => {
                  return (
                      'py-2 px-6 flex items-center gap-3.5 font-medium text-sm text-[#808080] ' +
                      (isActive ? 'active-menu' : '')
                  );
                }}
            >
              <h2
                  style={{ transitionDelay: `400ms` }}
                  className={`whitespace-pre duration-500 text-[15px]
               ${!openToggle && "opacity-0 translate-x-28 overflow-hidden"}`}
              >
                FAQ
              </h2>
            </NavLink>

            <NavLink
                to="/contactus"
                className={({ isActive }) => {
                  return (
                      'py-2 px-6 flex items-center gap-3.5 font-medium text-sm text-[#808080] ' +
                      (isActive ? 'active-menu' : '')
                  );
                }}
            >
              <h2
                  style={{ transitionDelay: `500ms` }}
                  className={`whitespace-pre duration-500 text-[15px]
               ${!openToggle && "opacity-0 translate-x-28 overflow-hidden"}`}
              >
                Contact Us
              </h2>
            </NavLink>

            <NavLink
                to="/feedback"
                className={({ isActive }) => {
                  return (
                      'py-2 px-6 flex items-center gap-3.5 font-medium text-sm text-[#808080] ' +
                      (isActive ? 'active-menu' : '')
                  );
                }}
            >
              <h2
                  style={{ transitionDelay: `600ms` }}
                  className={`whitespace-pre duration-500 text-[15px]
               ${!openToggle && "opacity-0 translate-x-28 overflow-hidden"}`}
              >
                Feedback
              </h2>
            </NavLink>

            <div className={`${!openToggle && "flex-col"} flex px-6 gap-4 pt-5`}>
            <span
                className="text-xl text-[#0080ff] pr-5 duration-500"
                style={{ transitionDelay: `600ms` }}
            >
              <FaFacebook/>
            </span>
              <span className="text-xl text-[#0080ff] pr-5">
              <FaInstagram/>
            </span>
              <span className="text-xl text-[#0080ff]">
              <FaLinkedin/>
            </span>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Sidebar;
