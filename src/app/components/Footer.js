import React from "react";
import Link from "next/link";
const Footer = () => {
  return (
    <div className="">
      <footer className="flex justify-center w-full bg-white rounded-lg shadow p-2 dark:bg-gray-800">
        <div className="flex  flex-col  items-center w-full  max-w-screen-xl p-4 md:flex md:flex-row md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024{" "}
            <a href="#" className="hover:underline">
              manas™
            </a>
            . All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <Link href="/" className="hover:underline me-4 md:me-6">
                Home
              </Link>
            </li>
            <li>
              <Link href="/courses" className="hover:underline me-4 md:me-6">
                Courses
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline me-4 md:me-6">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
