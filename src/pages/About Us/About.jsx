import React from "react";
import Navbar from "../../components/NavBar/NavBar";

const About = () => {
  return (
    <div className="flex">
      <Navbar />
      <main className="flex-1 p-6 ml-14 md:ml-48 transition-all duration-300">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">About Page</h1>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil voluptatem recusandae facere,
          dolorum sit quia, consequuntur numquam quibusdam, magnam quo iste eos adipisci delectus cumque.
          Ut doloribus nam neque ab.
        </p>
      </main>
    </div>
  );
};

export default About;
