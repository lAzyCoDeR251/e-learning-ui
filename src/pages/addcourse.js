import React, { useEffect, useState } from "react";
import userApi from "@/api/user";
import { useRouter } from "next/router";
import AddCourse from "@/app/components/AddCourse";
import "../app/globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const ProtectedAddCoursePage = () => {
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const checkIsSuperAdmin = async () => {
      try {
        const token = localStorage.getItem("token");
        const userProfileData = await userApi.fetchUserProfile(token);
        // console.log(userProfileData);
        setIsSuperAdmin(userProfileData.user.issuperadmin);
      } catch (error) {
        console.error("Error checking user role:", error);

        router.push("/");
      }
    };
    checkIsSuperAdmin();
  }, [router]);

  if (!isSuperAdmin) {
    // Redirect to unauthorized page or show a message
    return <div>Unauthorized Access</div>;
  }

  return (
    <div>
      <Header />
      <AddCourse />
      <Footer />
    </div>
  );
};

export default ProtectedAddCoursePage;
