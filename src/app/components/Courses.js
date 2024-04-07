import React, { useEffect, useState, useContext } from "react";
import userApi from "@/api/user";
import Link from "next/link";
import { AuthContext } from "@/api/auth";

const Courses = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await userApi.getUnAuthCourses(token);
        setCourses(data.courses.result);
        setLoading(false);
        // console.log(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCourses();
  }, []);

  if (error) {
    return (
      <div className="h-[50vh]">
        <h1 className="m-5 text-4xl font-light text-black text-center">
          Courses
        </h1>
        <p className="text-center text-3xl font-bold mt-20">
          Error Loading Courses data......
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <h1 className="m-5 text-4xl font-light text-black text-center">
          Courses
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:mx-20">
          {Array(10)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                className="animate-pulse max-w-sm p-6 bg-gray-200 border border-gray-300 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="h-4 bg-gray-400 rounded w-3/4"></div>
                <div className="mt-2 h-4 bg-gray-400 rounded"></div>
                <div className="mt-2 h-4 bg-gray-400 rounded w-5/6"></div>
              </div>
            ))}
        </div>
        <div className="flex justify-center m-5">
          <button
            className="animate-pulse mt-10 select-none rounded-sm bg-gray-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none "
            type="button"
          >
            <span className="h-4 bg-gray-400 rounded w-3/4 block"></span>
          </button>
        </div>
      </div>
    );
  }
  return (
    <div>
      {" "}
      <h1 className="m-5 text-4xl font-light text-black text-center">
        Courses
      </h1>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:mx-20">
          {courses.map((course) => (
            <div
              key={course.id}
              className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <h2>{course.title}</h2>
              <p>Category: {course.category}</p>
              <p>Level: {course.level}</p>
              <p>Popularity: {course.popularity}</p>
            </div>
          ))}
        </div>
      </div>
      {isLoggedIn ? (
        <div className="flex justify-center m-5">
          <Link href="/courses">
            <button
              className="mt-10 select-none rounded-sm bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none "
              type="button"
            >
              <span>More</span>
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex justify-center m-5">
          <Link href="/signin">
            <button
              className="mt-10 select-none rounded-sm bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none "
              type="button"
            >
              <span>More</span>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Courses;
