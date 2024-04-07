/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useContext } from "react";
import Link from "next/link";
import { AuthContext } from "@/api/auth";

const LandingPage = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <div className="flex justify-center md:justify-between bg-[#DCD9D4]">
      <div className="flex flex-col justify-center items-center md:ml-5 my-24 md:my-0">
        <h1 className=" font-bold text-3xl text-center">
          Welcome to Our E-Learning Platform!
        </h1>
        <h3 className="my-5 font-normal text-xl text-center">
          Discover a new way of learning, tailored just for you.
        </h3>
        {isLoggedIn ? (
          <div>
            <Link href="/courses">
              <button
                className="mt-10 select-none rounded-sm bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none "
                type="button"
              >
                <span>Explore More</span>
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <Link href="/signup">
              <button
                className="mt-10 select-none rounded-sm bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none "
                type="button"
              >
                <span>Sign Up</span>
              </button>
            </Link>
            <Link href="/signin">
              <button
                className="mt-10 mx-10 select-none rounded-sm bg-white py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-gray shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none "
                type="button"
              >
                <span>Sign In</span>
              </button>
            </Link>
          </div>
        )}
      </div>
      <div className="hidden md:block">
        <img
          alt="Landing page image"
          src="/Landing_page.jpg"
          className="h-[550px] w-[900px]"
        />
      </div>
    </div>
  );
};

export default LandingPage;
