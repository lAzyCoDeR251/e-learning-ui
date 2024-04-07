const userApi = {
  fetchUserProfile: async (token) => {
    try {
      const response = await fetch("https://chart-backend-4zsf.onrender.com/api/user/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user profile");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  },
  updateUserProfile: async (token, userData) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("profile_picture", profilePicture);
      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      const response = await fetch(
        "https://chart-backend-4zsf.onrender.com/api/user/profile/update",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: userData,
        }
      );
      console.log(userData);
      if (!response.ok) {
        throw new Error("Failed to update user profile");
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error; // Re-throw the error for handling in the components
    }
  },

  updatePassword: async (token, passwordData) => {
    try {
      const response = await fetch(
        "https://chart-backend-4zsf.onrender.com/api/user/update-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(passwordData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating password:", error);
      throw error;
    }
  },

  getCourses: async (token, page, category, level, popularity) => {
    console.log(page, category, level, popularity);
    try {
      const response = await fetch(
        `https://chart-backend-4zsf.onrender.com/api/user/courses?page=${page}&category=${category}&level=${level}&popularity=${popularity}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw error;
    }
  },

  getCourseById: async (token, courseId) => {
    try {
      const response = await fetch(
        `https://chart-backend-4zsf.onrender.com/api/user/courses/${courseId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const data = await response.json();
      return data.course; // Assuming the API returns the course data under the key 'course'
    } catch (error) {
      console.error("Error getting course by ID:", error);
      throw error;
    }
  },

  getUnAuthCourses: async (token) => {
    try {
      const response = await fetch(
        "https://chart-backend-4zsf.onrender.com/api/user/home-courses",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw error;
    }
  },

  enrollUserInCourse: async (token, courseId) => {
    console.log("this is enrolled courseID :", courseId);
    try {
      await fetch("https://chart-backend-4zsf.onrender.com/api/course/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ courseId }),
      });
    } catch (error) {
      console.error("Error enrolling in course:", error);
      throw error;
    }
  },

  getEnrolledCourses: async (token, userId) => {
    try {
      const response = await fetch(
        `https://chart-backend-4zsf.onrender.com/api/course/enrolled-courses/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error getting enrolled courses:", error);
      throw error;
    }
  },

  createCourse: async (token, courseData) => {
    try {
      const response = await fetch("https://chart-backend-4zsf.onrender.com/api/user/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(courseData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
    } catch (error) {
      console.error("Error creating course:", error);
      throw error;
    }
  },

  updateCourseById: async (token, courseId, updatedCourseData) => {
    try {
      console.log("Structring data : ", { course: updatedCourseData });
      const response = await fetch(
        `https://chart-backend-4zsf.onrender.com/api/user/courses/${courseId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ course: updatedCourseData }), // Nest under 'course' object
        }
      );
      const responseData = await response.json();
      console.log("Response:", responseData);

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to update course");
      }

      const updatedCourseInfo = responseData.course; // Updated line
      console.log("Response2:", updatedCourseInfo);

      if (!updatedCourseInfo) {
        throw new Error("Failed to get updated course data from response");
      }

      const { title, category, level, popularity } = updatedCourseInfo;
      return { title, category, level, popularity };
    } catch (error) {
      console.error("Error updating course by ID:", error);
      throw error;
    }
  },
  deleteCourseById: async (token, courseId) => {
    console.log("this is course id:" ,courseId);
    try {
      const response = await fetch(
        `https://chart-backend-4zsf.onrender.com/api/user/courses/${courseId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete course");
      }

      const responseData = await response.json();
      console.log("Course deleted successfully:", responseData.message);

      return responseData.message; // Return success message
    } catch (error) {
      console.error("Error deleting course by ID:", error);
      throw error;
    }
  },
};

export default userApi;
