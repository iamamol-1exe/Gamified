import React, { useState } from "react";
import { Blob, GithubIcon, GoogleIcon } from "../shapes/LoginShapes";
import logo from "../assets/boy.jpg";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <Header/>
      <div className="bg-gray-100 flex items-center justify-center min-h-screen font-sans">
        <main className="w-full max-w-5xl m-4 bg-white shadow-2xl rounded-3xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
          {/* Left Side: Image and Decorative Background - Now visible on all screen sizes */}
          <div className="relative">
            <div
              className="absolute inset-0 bg-gray-200"
              style={{
                borderTopLeftRadius: "1.5rem",
                borderBottomLeftRadius: "1.5rem",
              }}
            ></div>
            <div className="relative w-full h-full flex items-center justify-center p-8">
              <div className="relative w-[450px] h-[450px]">
                <Blob />
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Using the user-provided image */}
                  <img
                    src={logo}
                    alt="Scientist doing an experiment"
                    className="w-4/5 h-auto object-contain relative z-10 drop-shadow-xl transform transition-transform duration-300 hover:scale-105 rounded-4xl"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
              Create Your Account
            </h1>

            <form className="space-y-6">
              {/* <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-600 mb-1  text-left"
                >
                  Full Name
                </label>
                <input
                  value={Fullname}
                  onChange={(e) => {
                    setFullname(e.target.value);
                  }}
                  type="text"
                  id="fullName"
                  placeholder="Enter your Full Name here"
                  className="w-full px-4 py-3 bg-gray-300 border-gray-300 placeholder:text-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                />
              </div> */}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600 mb-1 text-left"
                >
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                  id="email"
                  placeholder="Enter your Email here"
                  className="w-full px-4 py-3 bg-gray-300 border-gray-300 rounded-xl placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-600 mb-1 text-left"
                >
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                  id="password"
                  placeholder="Enter your Password here"
                  className="w-full px-4 py-3 bg-gray-300 border-gray-300 rounded-xl placeholder:text-gray-700  focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                />
              </div>

              <button
                onClick={(e) => {
                  handleSubmit(e);
                }}
                type="submit"
                className="bg-purple-400 text-white w-full bg-[#D0B9FF]   font-bold py-3 rounded-xl hover:bg-[#D0B9FF] transition-colors duration-300"
              >
                Login
              </button>
            </form>

            <p className="text-center text-gray-600 mt-6">
              Don't have an Account?{" "}
              <Link
                to="/registration"
                className="text-bg-[#D0B9FF] font-semibold hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
