'use client';
import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { createGlobalStyle } from 'styled-components';
import Features from '../components/Features';
import Chat from '../components/chat';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Ambit';
    src: url('/fonts/Ambit/Ambit-Regular.ttf') format('truetype');
  }
`;
const About: React.FC = () => {

  return (
    <div style={{ fontFamily: 'Ambit, sans-serif' }}>
  <NavBar />
  <div className="p-4 container mx-auto font-semibold my-4 px-6 md:px-16 md:py-10 text-justify">
    <h1 className="text-2xl md:text-4xl text-gray-800 font-bold my-8">About</h1>
    <section className="my-8">
      <h2 className="text-2xl md:text-4xl text-gray-800 font-semibold my-4">Problem Statement</h2>
      <p className="text-gray-600 text-xl md:text-2xl my-2">
        The coal transportation industry faces challenges with coal availability at railway sidings, resulting in demurrage charges due to waiting times for trains. CRN Coal Rake Navigators aims to address this problem.
      </p>
    </section>
    <div className="flex flex-col md:grid-cols-2 gap-8 my-8">
      <div className="rounded-lg my-2 p-4 shadow-md">
        <img
          src="/about/ps.png" // Replace with your image source
          alt="problem statement picture here"
          className="rounded-lg my-4"
        />
        <p className="text-gray-700">
          Problem Statement
        </p>
      </div>
    </div>

    <section className="my-6">
      <h2 className="text-2xl md:text-4xl text-gray-700 font-semibold mt-8 mb-4">Who We Are</h2>
      <p className="text-lg md:text-xl text-gray-600 my-2">
        CRN Coal Rake Navigators is a team of dedicated professionals specializing in coal logistics optimization. We combine innovative technology and data-driven solutions to revolutionize the coal transportation industry.
      </p>
    </section>
    <section className="my-4">
      <h2 className="text-2xl md:text-4xl text-gray-700  font-semibold mt-8 mb-4">How We Solve the Problem</h2>
      <p className="text-lg md:text-xl text-gray-600 my-2">
        Our digital platform provides real-time updates on coal availability at railway sidings, ensuring efficient dispatch of trains to locations with sufficient coal. By optimizing transportation routes and reducing waiting times, we help companies save on demurrage charges and streamline operations.
      </p>
    </section>  
  </div>
  <Features />
  <Chat />
  <Footer />
</div>

  );
};

export default About;
