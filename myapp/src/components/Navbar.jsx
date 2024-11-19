import React, { useState, useEffect } from "react";
import gameIcon from "../Images/Playing Casual Game.gif";
import { Link } from "react-router-dom";

import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
// import func from './temp'
const Navbar = () => {
  const [open, setOpen] = useState(false);

  let Links = [
    { name: "Home", link: "/" },
    { name: "Tic Tac Toe", link: "/tic-tac-toe" },
    { name: "Sudoku", link: "/sudoku" },
  ];
  const handleLogout = (value) => {
    if (value) {
      localStorage.clear();
      window.location.reload();
    }
  }


  
  return (
    <div className="shadow-md w-full fixed top-0 left-0">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7 ">
        <Link to="/">
          <div className="font-bold text-2xl cursor-pointer flex items-center gap-4 w-35">
            <img src={gameIcon} alt="game icon" width={35} />
            <span>Game House</span>
          </div>
        </Link>

        <div
          onClick={() => setOpen(!open)}
          className="absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7"
        >
          {open ? <XMarkIcon /> : <Bars3BottomRightIcon />}
        </div>
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute  md:static lg:bg-white md:bg-white sm:bg-gray-300 bg-gray-300 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-12" : "top-[-490px]"
          }`}
        >
          {Links.map((link) => (
            <li className="md:ml-8 md:my-0 my-7 font-semibold">
              {link.link !== "" ? (
                <Link to={link.link}>
                  <a className="text-gray-800 hover:text-blue-400 duration-500 hs-scrollspy-active:text-blue-600 dark:hs-scrollspy-active:text-blue-400">
                    {link.name}
                  </a>
                </Link>
              ) : (
                <a
                    href="http://localhost:5003/"
                    target="_blank"
                  className="text-gray-800 hover:text-blue-400 duration-500 hs-scrollspy-active:text-blue-600 dark:hs-scrollspy-active:text-blue-400"
                >
                  {link.name}
                </a>
              )}
            </li>
          ))}
          {localStorage.getItem("token") ? (
            <>
              <div class="relative lg:ml-7 inline-flex items-center justify-center lg:w-10 lg:h-10 sm:w-8 sm:h-8 w-6 mr-2 h-6 sm:mr-4 md:ml-4 lg:mr-1 bg-gray-100 rounded-full dark:bg-gray-600">
                <span class="font-medium text-gray-600 dark:text-gray-300">
                  {localStorage.getItem('username')[0].toUpperCase()}
                </span>
                <span class="lg:bottom-0 lg:left-7 lg:absolute  lg:w-3.5 lg:h-3.5 lg:bg-green-400 lg:border-2 lg:border-white lg:dark:border-gray-800 lg:rounded-full"></span>
              </div>
              <Link to="/">
                <button
                  className="btn bg-indigo-500 text-white md:ml-8 font-semibold px-3 py-1 rounded duration-500 md:static"
                  onClick={() => {
                    handleLogout(true);
                  }}
                >
                  Logout
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <button
                  className="btn bg-indigo-500 text-white md:ml-8 font-semibold px-3 py-1 rounded duration-500 md:static"
                  onClick={() => {
                    handleLogout(false);
                  }}
                >
                  login
                </button>
              </Link>
            </>
          )}
        </ul>
        {/* button */}
      </div>
    </div>
  );
};

export default Navbar;
