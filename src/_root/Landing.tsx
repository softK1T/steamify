import React from "react";
import { Link } from "react-router-dom";

const Landing: React.FC = () => {
  return (
    <div>
      <div className="bg-gradient-to-r from-blue-400 to-purple-500 min-h-screen flex flex-col justify-center items-center text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to Your App</h1>
        <p className="text-lg mb-8">Discover the power of our amazing app</p>
        <Link
          to="/sign-up"
          className="bg-white text-blue-500 px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-500 hover:text-white transition duration-300"
        >
          Sign Up
        </Link>
        <p className="mt-4 text-xs">
          Already have an account?{" "}
          <Link to="/sign-in" className="underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Landing;
