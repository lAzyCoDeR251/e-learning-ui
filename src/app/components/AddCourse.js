import React, { useState } from "react";
import userApi from "@/api/user";

const AddCourse = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    level: "",
    popularity: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await userApi.createCourse(token, formData);
      console.log(formData);
      alert("Course Added Sucessfully");
      setFormData({
        title: "",
        category: "",
        level: "",
        popularity: "",
      });
    } catch (error) {
      alert(error.message);
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="mb-5 text-2xl font-bold text-gray-700">Add Course</h2>
      <form
        onSubmit={handleSubmit}
        className="p-5 bg-white rounded shadow-md min-w-[300px] md:min-w-[400px]"
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
          Add Course
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
