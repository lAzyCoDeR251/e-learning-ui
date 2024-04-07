import React from "react";

const WhyChooseUs = () => {
  return (
    <div className="flex justify-center">
      <div className="md:p-6 max-w-full md:m-5 md:mx-20 ">
        <div>
          <div className="m-5 text-4xl font-light text-black text-center">
            Why Choose Us?
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 m-10">
            <div className="max-w-lg bg-white rounded-xl shadow-md flex flex-col items-center space-x-4 pt-5">
              <h3 className="font-bold text-center">
                Personalized Learning Paths
              </h3>
              <p className="max-w-[450px] text-justify p-3">
                Our platform uses advanced technology to create personalized
                learning paths for all our users. Your learning journey is
                unique, and we’re here to support you every step of the way.
              </p>
            </div>
            <div className="max-w-lg bg-white rounded-xl shadow-md flex flex-col items-center space-x-4 pt-5">
              <h3 className="font-bold text-center">Quality Content</h3>
              <p className="max-w-[450px] text-justify p-3">
                We partner with leading educators and institutions worldwide to
                provide courses that are engaging, comprehensive, and
                up-to-date. Whether you’re looking to learn a new skill, enhance
                your professional credentials, or explore a new academic
                subject, we’ve got you covered.
              </p>
            </div>
            <div className="max-w-lg bg-white rounded-xl shadow-md flex flex-col items-center space-x-4 pt-5">
              <h3 className="font-bold text-center">Learn at Your Own Pace</h3>
              <p className="max-w-[450px] text-justify p-3">
                With our platform, you can learn at your own pace, on your own
                schedule. All you need is an internet connection.
              </p>
            </div>
            <div className="max-w-lg bg-white rounded-xl shadow-md flex flex-col items-center space-x-4 pt-5">
              <h3 className="font-bold text-center">Join Our Community</h3>
              <p className="max-w-[450px] text-justify p-3">
                When you join our platform, you’re joining a diverse, global
                community of lifelong learners. Share ideas, ask questions, and
                engage with learners and educators from around the world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
