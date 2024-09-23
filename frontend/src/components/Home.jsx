import React, { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Message from "./Message";
import { Alert } from "@mui/material";

const Home = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  console.log("here...", import.meta.env.VITE_PORT);

  const sendMail = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.warn("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_PORT}/sendMail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const result = await response.json();
        if (!response.ok) {
          toast.warn(result.message);
          setError(result.message);
          setTimeout(() => setError(""), 3000);
        } else {
          setError("You're Subscribed to our Newsletter!");
          setEmail("");
          toast.success("Subscription successful!");
          setTimeout(() => setError(""), 3000);
        }
      } else {
        toast.warn("Unexpected response format");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  const typedRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: [
        "Web Developer",
        "UI/UX Designer",
        "Tech Enthusiast",
        "Artificial Intelligence",
        "Robotics",
        "Internet of Things",
        "AR/VR",
        "Blockchain",
        "Quantum Computing",
        "Cybersecurity",
        "Game Development",
        "Mobile App Development",
        "Machine Learning Specialist",
      ],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 1000,
      startDelay: 500,
      loop: true,
    };

    const typed = new Typed(typedRef.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="relative w-full h-screen flex flex-col md:justify-center items-start justify-start md:items-center lg:justify-center lg:items-center xl:justify-center xl:items-center text-white bg-gradient-to-br from-gray-800 to-black overflow-hidden">
      <style>
        {`@keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }`}
      </style>

      {/* Error Message */}
      {error && (
        <div className="absolute top-0 flex items-center justify-center w-full">
          <Alert severity="success">
            <span className="ml-6">{error}</span>
          </Alert>
        </div>
      )}

      {/* Background */}
      <div
        className="absolute inset-0 bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url(/path/to/your/background-image.jpg)" }}
      ></div>

      {/* Content */}
      <div className="relative z-10 text-center p-4 sm:p-8 bg-opacity-70 bg-black rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Hey, I'm Rahul Verma
        </h1>
        <h2 className="text-lg sm:text-2xl md:text-3xl mb-6">
          A <span ref={typedRef} className="text-violet-400"></span>
        </h2>
        <p className="text-sm sm:text-lg mb-8">
          Welcome to my portfolio! I specialize in creating innovative web solutions.
        </p>

        <div className="flex justify-center space-x-2 sm:space-x-4">
          <Link to="/signup">
            <button className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-300">
              Sign Up
            </button>
          </Link>
          <Link to="/login">
            <button className="px-4 py-2 sm:px-6 sm:py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors duration-300">
              Login
            </button>
          </Link>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 z-20 animate-float hidden md:block">
        <Link to="/">
          <div className="text-xl text-zinc-700 font-serif">{"<rahul>"}</div>
        </Link>
      </div>
      <div className="absolute bottom-10 right-10 z-20 animate-float hidden md:block">
        <div className="text-xl text-zinc-700 font-serif">{"</rahul>"}</div>
      </div>

      {/* Newsletter Form */}
      <form
        onSubmit={sendMail}
        className="absolute bottom-28 right-15 md:right-24 flex flex-col gap-4 md:flex-row items-center"
      >
        <span className="text-lg md:text-2xl text-zinc-600">Subscribe Us!</span>
        <div className="newsletter flex flex-col md:flex-row bg-transparent border border-zinc-800 items-center">
          <input
            type="email"
            value={email}
            className="p-2 md:p-4 w-[18rem] md:w-[25rem] bg-transparent outline-none font-serif text-slate-600 text-sm"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <button
            type="submit"
            className="p-2 md:p-4 text-slate-600 w-full md:w-auto text-center"
          >
            Subscribe
          </button>
        </div>
      </form>

      {/* Message Modal */}
      <Message />

      {/* Toast Notifications */}
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default Home;
