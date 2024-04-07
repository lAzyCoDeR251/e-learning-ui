import React, { useState, useEffect } from "react";
import "../app/globals.css";
import userApi from "@/api/user";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const EnrolledCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUserId = async () => {
    try {
      const token = localStorage.getItem("token");
      const userProfileData = await userApi.fetchUserProfile(token);
      const userId = userProfileData.user.id;

      return userId;
    } catch (error) {
      console.error("Error fetching user ID:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = await getUserId(); // Wait for getUserId to resolve
        // console.log("userId", userId);
        const data = await userApi.getEnrolledCourses(token, userId);
        setEnrolledCourses(data.enrolledCourses);
        // console.log("enrolled course", data.enrolledCourses);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchEnrolledCourses();
  }, []);

  if (loading) {
    return (
      <div className="">
        <Header />
        <div className="h-[80vh] flex justify-center items-center">
          loading.....
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[100vh] flex justify-center items-center">
        Error: {error}
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="min-h-[80vh]">
        <h1 className="m-5 text-4xl font-light text-black text-center ">
          Enrolled Courses
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-col-4 gap-4 mx-20  md:mx-20">
          {enrolledCourses.map((course, index) => (
            <div
              key={index}
              class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <h2>{course.title}</h2>
              <p>Category: {course.category}</p>
              <p>Level: {course.level}</p>
              <p>Popularity: {course.popularity}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EnrolledCourses;
