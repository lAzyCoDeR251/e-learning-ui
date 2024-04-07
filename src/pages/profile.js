/* eslint-disable @next/next/no-img-element */
import "../app/globals.css";
import React, { useState, useEffect } from "react";
import userApi from "@/api/user";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("/profile.png");
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [errorPassword, setErrorPassword] = useState(null);
  const [successPassword, setSuccessPassword] = useState(false);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetchProfileData(token);
    }
  }, []);

  const fetchProfileData = async (token) => {
    try {
      const userData = await userApi.fetchUserProfile(token);
      // console.log(userData);
      setUserProfile(userData);
      setName(userData.user.name);
      setEmail(userData.user.email);
      setProfilePictureUrl(userData.user.profile_picture);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
    setProfilePictureUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("profile_picture", profilePicture);
      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      await userApi.updateUserProfile(token, formData);
      setSuccess(true);
      setError(null);
    } catch (error) {
      setError(error.message);
      setSuccess(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await userApi.updatePassword(token, { oldPassword, newPassword });
      setSuccessPassword("Password updated successfully");
      setErrorPassword(null);
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      setErrorPassword(error.message);
      setSuccessPassword(null);
    }
  };

  if (!userProfile) {
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

  return (
    <div className="h-fit">
      <Header />
      <div className="flex justify-center">
        <div className="max-w-md mx-2 mt-20 mb-32 p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-center">
            <div className="relative bottom-16 z-50">
              <img
                src={profilePictureUrl}
                alt="Profile Picture"
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
              />
              <label
                htmlFor="profilePicture"
                className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full cursor-pointer p-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <input
                  type="file"
                  id="profilePicture"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <h1 className="text-2xl font-semibold mb-6 text-center">
            Edit Profile
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Update Profile
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {success && (
              <p className="text-green-500 mt-2">
                Profile updated successfully!
              </p>
            )}
          </form>
          <div className="mt-10">
            <form onSubmit={handlePasswordSubmit}>
              <div>
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Old Password :
                  <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </label>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  New Password:
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Update Password
              </button>
              {errorPassword && (
                <p className="text-red-600">Error: {errorPassword}</p>
              )}
              {successPassword && (
                <p className="text-green-600">{successPassword}</p>
              )}
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
