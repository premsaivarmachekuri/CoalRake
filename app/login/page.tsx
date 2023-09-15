'use client';
import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { AiOutlineSearch } from 'react-icons/ai';
import { auth } from '../config.js';
import { useRouter } from 'next/navigation.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth/cordova';
import { useMediaQuery } from 'react-responsive'; // Import useMediaQuery
import Chat from '../components/chat';

const Login: React.FC = () => {
  const [position, setPosition] = useState(0);

  const isDesktop = useMediaQuery({ minWidth: 1024 });

  // Adjust the duration and distance as needed
  const animationDuration = 7000; // 7 seconds

  const translateDistance = 100; // Translate from right to left

  useEffect(() => {
    let animationInterval: NodeJS.Timeout | null = null;

    const startAnimation = () => {
      if (!isDesktop) return; // Don't start animation on small and medium devices
      animationInterval = setInterval(() => {
        setPosition((prevPosition) =>
          prevPosition + 1 > 100 ? 0 : prevPosition + 1
        );
      }, animationDuration / 150);
    };

    const stopAnimation = () => {
      if (animationInterval) {
        clearInterval(animationInterval);
        animationInterval = null;
      }
    };

    startAnimation();

    setTimeout(() => {
      stopAnimation();
    }, 740);

    return () => {
      stopAnimation();
    };
  }, [isDesktop]); // Add isDesktop to the dependency array

  const [isLogin, setIsLogin] = useState(true);

  const toggleLogin = () => {
    setIsLogin(!isLogin);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigator = useRouter();

  return (
    <div style={{ fontFamily: 'Ambit, sans-serif' }}>
      <NavBar />
      <main>
        <div
          className="bg-cover bg-center mt-4 mb-4 image-slider flex flex-col items-center justify-center bg-opacity-90"
          style={{
            backgroundImage: 'url("/loginbg.png")',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            minHeight: 'calc(100vh - 4rem)', // Increase the height
            backgroundSize: 'cover',
          }}
        >
          <div className="w-full h-10 relative">
            <div
              className="absolute top-0 left-0 w-20 h-20 transition-transform transform translate-x-full"
              style={{
                transform: `translateX(${position * translateDistance}%)`,
                transition: `transform ${animationDuration}ms linear`,
              }}
            >
              <img
                src="/animate.png"
                alt="Translating Image"
                width={1000}
                height={1000}
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          <div className="w-full md:w-full lg:w-2/3 xl:w-1/2 flex items-center justify-center">
            <div className="bg-white dark:bg-black text-black dark:text-white rounded-lg p-8 sm:p-10 shadow-md w-full">
              <h2 className="text-3xl font-semibold mb-6">
                {isLogin ? 'Login' : 'Sign Up'}
              </h2>
              <div className="mb-6">
                <label className="block dark:text-gray-200 text-gray-700 text-lg font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  className="border rounded-lg px-4 py-3 w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Email"
                />
              </div>
              <div className="mb-6">
                <label className="block dark:text-gray-200 text-gray-700 text-lg font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  className="border rounded-lg px-4 py-3 w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg w-full text-lg"
                onClick={() => {
                  if (isLogin) {
                    signInWithEmailAndPassword(auth, email, password)
                      .then((userCredential) => {
                        const user = userCredential.user;
                        navigator.replace('/dashboard');
                      })
                      .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                      });
                  } else {
                    createUserWithEmailAndPassword(auth, email, password)
                      .then((userCredential) => {
                        const user = userCredential.user;
                        navigator.replace('/data');
                      })
                      .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                      });
                  }
                }}
              >
                {isLogin ? 'Log In' : 'Sign Up'}
              </button>
              <div
                className="dark:text-gray-200 text-gray-600 text-lg mt-4 cursor-pointer"
                onClick={toggleLogin}
              >
                {isLogin ? (
                  <p>
                    Don't have an account?
                    <span className="text-blue-600 text-lg ml-2">Sign Up</span>
                  </p>
                ) : (
                  <p>
                    Already have an account?
                    <span className="text-blue-600 text-lg ml-2">Log In</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Chat />
      <Footer />
    </div>
  );
};

export default Login;
