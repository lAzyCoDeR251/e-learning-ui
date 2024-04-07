import React, { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../app/globals.css";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const router = useRouter();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsLoading(true);
    try {
      // Make an HTTP POST request to your backend API endpoint
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        {
          email,
          password,
        }
      );

      // Save the token in localStorage
      localStorage.setItem("token", response.data.token);

      // Fetch user profile data using the stored token
      //   const profileResponse = await fetchUserProfile(response.data.token);
      //   const userProfile = await profileResponse.json();
      console.log("profiel: ", userProfile);

      //   console.log("Signin successful", response.data);
      toast.success("Logged In Sucessfully");
      router.push("/");
    } catch (error) {
      console.error("Signin failed", error); // Log any errors
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
        <div className="max-w-full h-[100vh] bg-white flex justify-center flex-1">
          <div className="flex-1 bg-blue-900 text-center hidden md:flex">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
              }}
            ></div>
          </div>
          <div className="flex justify-center items-center lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className=" w-[320px] flex flex-col items-center">
              <div className="text-center">
                <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                  Sign In
                </h1>
                <p className="text-[12px] p-3 text-gray-500">
                  Hey enter your details Log In
                </p>
              </div>
              <form onSubmit={handleSubmit} className="w-[320px]">
                <div className="w-full flex-1 mt-8">
                  <div className="mx-auto max-w-xs flex flex-col gap-4">
                    <input
                      className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                      className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <p className="text-red-500">{error}</p>}
                    <button
                      className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                      type="submit" // Changed to type="submit"
                      disabled={isLoading} // Disable the button when loading
                    >
                      {isLoading ? ( // Render loader if isLoading is true
                        <svg
                          className="animate-spin h-5 w-5 mr-3 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0120 12h-4a3.999 3.999 0 00-3.145-3.896l-.359.932A4.997 4.997 0 0112 7c-2.757 0-5 2.243-5 5v.291zm10.051.922l.36-.932A4.997 4.997 0 0112 17a4.994 4.994 0 01-3.644-1.604l.36-.932A3.999 3.999 0 0016 12h4c0 2.757-2.243 5-5 5z"
                          ></path>
                        </svg>
                      ) : (
                        // Render sign in text if isLoading is false
                        <span>Sign In</span>
                      )}
                    </button>
                    <p className="mt-6 text-xs text-gray-600 text-center">
                      {" Don't have an account?"}
                      <a href="/signup">
                        <span className="text-blue-900 font-semibold">
                          Sign Up
                        </span>
                      </a>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
