import React from "react";
import { useState, useEffect } from "react";
import img from "../assets/user101.jpeg";

const Counter = ({ start, end, label }) => {
  const [count, setCount] = useState(start);
  useEffect(() => {
    if (count < end) {
      setTimeout(() => setCount(count + 1), 10);
    }
  }, [count, end]);

  return (
    <div className="text-center">
      <div className="text-4xl font-bold">{count}</div>
      <div>{label}</div>
    </div>
  );
};

const About = () => {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center my-10">
        <h1 className="text-5xl font-bold">About Mikist Estate</h1>
        <p className="text-xl mt-4">Empowering the individuals and community</p>
      </header>
      <section className="flex flex-col lg:flex-row my-10">
        <div className="lg:w-1/2 p-4">
          <h2 className="text-3xl font-bold">Our Founders' Story</h2>
          <p className="mt-4">
            MikistEstate is a leading real estate platform dedicated to
            empowering consumers with data, inspiration, and knowledge around
            the place they call home. We connect people with the best local
            professionals who can help with their real estate needs
            {/* Add more content here */}
          </p>
        </div>
        <div className="lg:w-1/2 p-4">
          {/* Add image here */}
          <img src={img} alt="" className="w-full h-auto" />
        </div>
      </section>
      <section className="grid grid-cols-4 sm:grid-cols-1 lg:grid-cols-4 gap-8 justify-center my-10">
        <Counter start={0} end={10} label="Years of Experience" />
        <Counter start={0} end={200} label="Project Challenges" />
        <Counter start={0} end={500} label="Positive Reviews" />
        <Counter start={0} end={3000} label="Trusted Clients" />
      </section>
    </div>
  );
};

export default About;
