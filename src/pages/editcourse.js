import React, { useEffect, useState } from "react";
import userApi from "@/api/user";
import { useRouter } from "next/router";
import "../app/globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const EditCourse = () => {
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    level: "",
    popularity: "",
  });
  const router = useRouter();
  const { id } = router.query;
  // console.log(id);

  useEffect(() => {
    const checkIsSuperAdmin = async () => {
      try {
        const token = localStorage.getItem("token");
        const userProfileData = await userApi.fetchUserProfile(token);
        setIsSuperAdmin(userProfileData.user.issuperadmin);
      } catch (error) {
        console.error("Error checking user role:", error);
        router.push("/");
      }
    };
    checkIsSuperAdmin();
  }, [router]);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const courseData = await userApi.getCourseById(token, id);
        setFormData({
          title: courseData.title,
          category: courseData.category,
          level: courseData.level,
          popularity: courseData.popularity,
        });
      } catch (error) {
        console.error("Error fetching course details:", error);
        setError("Error fetching course details");
      }
    };

    if (id) {
      fetchCourseDetails();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await userApi.updateCourseById(token, id, formData);
      alert("Course updated successfully");
    } catch (error) {
      console.error("Error updating course:", error);
      //   alert(error.message)
      setError("Error updating course");
    }
  };

  const onDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await userApi.deleteCourseById(token, id);
      setDeleteMessage("Course deleted successfully");
      alert("Course deleted successfully");
      router.push("/managecourse");
      // You can redirect to another page or update the UI as needed
    } catch (error) {
      console.error("Error deleting course:", error.message);
      setDeleteMessage("Failed to delete course");
    }
  };

  if (!isSuperAdmin) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <h1 className="text-3xl ">Unauthorized Access</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <h1 className="text-3xl ">Something went wrong!!!</h1>
      </div>
    );
  }

  if (!id) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <h1 className="text-3xl ">Loading......</h1>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h2 className="mb-5 text-2xl font-bold text-gray-700">Edit Course</h2>
        <form
          onSubmit={handleSubmit}
          className="p-5 bg-white rounded shadow-mdmin-w-[300px] md:min-w-[400px]"
        >
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Title:
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Category:
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Level:
            </label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Popularity:
            </label>
            <select
              name="popularity"
              value={formData.popularity}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Popularity</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          {error && <div className="mb-4 text-red-500">{error}</div>}
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          >
            Edit Course
          </button>
          <button
            type="button"
            className="w-full my-6 mr-2 px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
            onClick={onDelete}
          >
            Delete Course
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};
export default EditCourse;
