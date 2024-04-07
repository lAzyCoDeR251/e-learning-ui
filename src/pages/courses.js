import React, { useState, useEffect } from "react";
import "../app/globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import userApi from "@/api/user";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [popularity, setPopularity] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await userApi.getCourses(
          token,
          page,
          category,
          level,
          popularity
        );
        setCourses((prevCourses) => [...prevCourses, ...data.courses.result]);
        // setCourses(data.courses.result);
        setLoading(false);
        // console.log(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCourses();
  }, [page, category, level, popularity]);

  const handleMoreClick = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleApplyFilters = async () => {
    console.log(category, level, popularity);
    try {
      const token = localStorage.getItem("token");
      const data = await userApi.getCourses(
        token,
        1, // Reset page to 1 when applying filters
        category,
        level,
        popularity
      );
      setCourses(data.courses.result); // Replace existing courses with filtered data
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      const token = localStorage.getItem("token");
      await userApi.enrollUserInCourse(token, courseId);
      alert("Successfully enrolled in course!");
    } catch (error) {
      console.error("Failed to enroll in course:", error);
      alert("Failed to enroll in course. Please try again.");
    }
  };
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

  return (
    <div>
      <Header />
      <h1 className="m-5 text-4xl font-light text-black text-center ">
        Courses
      </h1>
      <div className="flex flex-col md:flex-row justify-around items-center p-6 max-w-full  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-20 my-5">
        <h1 className="text-2xl font-bold mb-4">Filter Courses:</h1>

        <div className="flex items-center justify-center mb-4">
          <label
            className="block text-gray-700 text-sm font-bold"
            htmlFor="category"
          >
            Category:
          </label>
          <select
            id="category"
            onChange={(e) => setCategory(e.target.value)}
            className="mx-3 shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select category</option>
            <option value="Data Science">Data Science</option>
            <option value="Machine Learning">Machine Learning</option>
            {/* Add more categories as needed */}
          </select>
        </div>

        <div className="flex items-center mb-4">
          <label
            className="block text-gray-700 text-sm font-bold"
            htmlFor="level"
          >
            Level:
          </label>
          <select
            id="level"
            onChange={(e) => setLevel(e.target.value)}
            className="mx-3 shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <div className=" flex items-center mb-4">
          <label
            className="block text-gray-700 text-sm font-bold"
            htmlFor="popularity"
          >
            Popularity:
          </label>
          <select
            id="popularity"
            onChange={(e) => setPopularity(e.target.value)}
            className="mx-3 shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select popularity</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleApplyFilters}
        >
          Apply Filters
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col justify-center">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-col-4 gap-4 mx-20  md:mx-20">
            {Array(10)
              .fill()
              .map((_, index) => (
                <div
                  key={index}
                  class="animate-pulse max-w-sm p-6 bg-gray-200 border border-gray-300 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
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
      ) : (
        <div className="flex flex-col justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-col-4 gap-4 mx-20  md:mx-20">
            {courses.map((course, index) => (
              <div
                key={index}
                class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <h2>{course.title}</h2>
                <p>Category: {course.category}</p>
                <p>Level: {course.level}</p>
                <p>Popularity: {course.popularity}</p>
                <button
                  onClick={() => handleEnroll(course.id)}
                  className="mt-10 select-none rounded-sm bg-gradient-to-tr from-blue-900 to-blue-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-900/10 transition-all hover:shadow-lg hover:shadow-blue-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none "
                  type="button"
                >
                  Enroll
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-center m-5">
            <button
              onClick={handleMoreClick}
              className="mt-10 select-none rounded-sm bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none "
              type="button"
            >
              <span>More</span>
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Courses;
