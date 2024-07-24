/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import userApi from "@/api/user";

const Header = ({ router }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  const ref = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const parseToken = (token) => {
    if (!token) {
      return null; // Return null if no token provided
    }

    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const decodedData = JSON.parse(atob(base64));
      return decodedData;
    } catch (error) {
      console.error("Error parsing token:", error);
      return null; // Return null if token parsing fails
    }
  };

  const handleLogout = useCallback(async () => {
    try {
      localStorage.removeItem("token");
      router.push("/signin");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }, [router]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // Decode the token to get the expiration time
      const tokenData = parseToken(token);
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

      if (tokenData && tokenData.exp && tokenData.exp < currentTime) {
        // Token is expired, log out the user
        handleLogout();
      } else {
        setIsLoggedIn(true);
        fetchProfileData(token);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [handleLogout]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetchProfileData(token);
    }
    // console.log(userProfile);
  }, [userProfile]);

  const fetchProfileData = async (token) => {
    try {
      const userData = await userApi.fetchUserProfile(token);
      setUserProfile(userData);
      // console.log("temp:",userData.user.issuperadmin);
      setIsSuperAdmin(userData.user.issuperadmin);
    } catch (error) {
      // Handle error
      console.error("Error fetching data:", error);
    }
  };

  console.log(isSuperAdmin);

  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between p-4">
          <div className="md:ml-20">
            <Link
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                E-Learning
              </span>
            </Link>
          </div>

          <div className="flex items-center">
            <div
              className="items-center justify-between hidden w-full md:flex md:w-auto mx-8"
              id="navbar-user"
            >
              <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <Link
                    href="/"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/courses"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Courses
                  </Link>
                </li>
                {isSuperAdmin && (
                  <li>
                    <Link
                      href="/addcourse"
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      Add Course
                    </Link>
                  </li>
                )}
                <li>
                  <a
                    href="/about"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="contact"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {isLoggedIn ? (
              <div ref={ref} className="flex items-center relative mx-10">
                <div>
                  {/* User Menu Button */}
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    id="user-menu-button"
                    aria-expanded={isDropdownOpen ? "true" : "false"}
                    onClick={toggleDropdown}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src={
                        (userProfile &&
                          userProfile.user &&
                          userProfile.user.profile_picture) ||
                        "/profile.png"
                      }
                      alt="user photo"
                    />
                  </button>
                </div>
                {/* Dropdown menu */}
                <div
                  className={`absolute top-9 -right-14 w-52 z-50 ${
                    isDropdownOpen ? "block" : "hidden"
                  } my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
                  id="user-dropdown"
                >
                  {/* {userProfile &&
                    userProfile.data( */}
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">
                      {userProfile && userProfile.user && userProfile.user.name}
                    </span>
                    <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                      {userProfile &&
                        userProfile.user &&
                        userProfile.user.email}
                    </span>
                  </div>
                  {/* )} */}
                  <ul className="pb-2 " aria-labelledby="user-menu-button">
                    <li>
                      <a
                        href="profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        onClick={closeDropdown}
                      >
                        Profile
                      </a>
                    </li>
                    {isSuperAdmin ? (
                      <li>
                        <a
                          href="managecourse"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          onClick={closeDropdown}
                        >
                          Manage Courses
                        </a>
                      </li>
                    ) : (
                      <li>
                        <a
                          href="enrolledcourse"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          onClick={closeDropdown}
                        >
                          Your Courses
                        </a>
                      </li>
                    )}
                    <li>
                      <span
                        className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        onClick={handleLogout}
                      >
                        Log out
                      </span>
                    </li>
                  </ul>
                </div>
                {/* Invisible button to handle dropdown visibility */}
                <button
                  type="button"
                  className="absolute inset-0 w-full h-full bg-transparent"
                  aria-label="Toggle user menu"
                  tabIndex="-1"
                  aria-hidden="true"
                  onClick={toggleDropdown}
                ></button>
              </div>
            ) : (
              <div>
                {/* Sign up button on nvabar */}
                <Link href="/signup">
                  <button
                    className="hidden select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                    type="button"
                  >
                    <span>Sign in</span>
                  </button>
                </Link>
              </div>
            )}

            <div className="md:hidden flex items-center">
              <button className="focus:outline-none" onClick={toggleDrawer}>
                <svg
                  className="h-8 w-8 text-gray-600 dark:text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Drawer */}
          {isDrawerOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
              <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
                <div className="flex justify-end p-4">
                  <button className="focus:outline-none" onClick={toggleDrawer}>
                    <svg
                      className="h-6 w-6 text-gray-600 dark:text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <ul className="py-4 px-2 space-y-2">
                  <li>
                    <Link
                      href="/"
                      className="block px-4 py-2 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/courses"
                      className="block px-4 py-2 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
                    >
                      Courses
                    </Link>
                  </li>
                  <li>
                    <a
                      href="/about"
                      className="block px-4 py-2 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="/contact"
                      className="block px-4 py-2 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
