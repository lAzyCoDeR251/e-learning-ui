import "../app/globals.css";
import React from "react";
import Header from "../app/components/Header";
import LandingPage from "@/app/components/LandingPage";
import { useRouter } from "next/router";
import WhyChooseUs from "@/app/components/WhyChooseUs";
import Courses from "@/app/components/Courses";
import { AuthProvider } from "@/api/auth";
import Footer from "@/app/components/Footer";
const Home = () => {
  const router = useRouter();
  return (
    <div>
      <AuthProvider>
        <Header router={router} />
        <LandingPage />
        <WhyChooseUs />
        <Courses />
        <Footer />
      </AuthProvider>
    </div>
  );
};

export default Home;
