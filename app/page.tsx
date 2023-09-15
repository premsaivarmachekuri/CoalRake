/* eslint-disable @next/next/no-page-custom-font */
'use client';
import Image from "next/image";
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import TopIntro from './components/TopIntro';
import AboutSection from './components/WhatDo';
import Title from './components/Title';
import Partner from './components/Partner';
import Chat from './components/chat';
import Features from "./components/Features";
export default function Home() {
  return (
    <div>
      <main>
        <div className="min-h-fit" style={{ fontFamily: 'Ambit, sans-serif' }}>
          <NavBar />
          <Title />
          <AboutSection />
          <Partner />
          <Features/>
          <TopIntro />
          <Chat />
          <Footer />
        </div>
      </main>
    </div>
  );
}
