import React, { useState } from "react";
import { Blob, GithubIcon, GoogleIcon } from "../shapes/LoginShapes";
import logo from "../assets/boy.jpg";

const Registration = () => {
    const [fullname, setFullname] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [number, setNumber] = useState("");
      const [rollno, setRollNo] = useState("");
      const [std, setStd] = useState("");
      const [school, setSchool] = useState("");
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(fullname);
        console.log(email);
        console.log(password);
        console.log(school);
        console.log(std);
        console.log(number);
        console.log(rollno);
        
        setEmail("");
        setPassword("");
        setFullname("");
        setNumber("");
        setRollNo("");
        setStd("");
        setSchool("");


      };

  return (
    <div>
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
                  Register yourself
                </h1>
    
                <form className="space-y-6">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-600 mb-1  text-left"
                    >
                      Full Name
                    </label>
                    <input
                      value={fullname}
                      onChange={(e) => {
                        setFullname(e.target.value);
                      }}
                      type="text"
                      id="fullName"
                      placeholder="First name + Middle name + Last name"
                      className="w-full px-4 py-3 bg-gray-300 border-gray-300 placeholder:text-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                    />
                  </div>

                {/* email */}
    
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

                  {/* mobile number */}

                  <div>
                    <label
                      htmlFor="number"
                      className="block text-sm font-medium text-gray-600 mb-1  text-left"
                    >
                      Mobile Number
                    </label>
                    <input
                      value={number}
                      onChange={(e) => {
                        setNumber(e.target.value);
                      }}
                      type="text"
                      id="number"
                      placeholder="Enter your mobile number"
                      className="w-full px-4 py-3 bg-gray-300 border-gray-300 placeholder:text-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                    />
                  </div>

                   {/* class/ std */}

                  <div>
                    <label
                      htmlFor="std"
                      className="block text-sm font-medium text-gray-600 mb-1  text-left"
                    >
                      Class
                    </label>
                    <input
                      value={std}
                      onChange={(e) => {
                        setStd(e.target.value);
                      }}
                      type="text"
                      id="std"
                      placeholder="Enter your mobile class"
                      className="w-full px-4 py-3 bg-gray-300 border-gray-300 placeholder:text-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                    />
                  </div>

                  {/* school name */}

                  <div>
                    <label
                      htmlFor="school"
                      className="block text-sm font-medium text-gray-600 mb-1  text-left"
                    >
                      School
                    </label>
                    <input
                      value={school}
                      onChange={(e) => {
                        setSchool(e.target.value);
                      }}
                      type="text"
                      id="school"
                      placeholder="Enter your school name"
                      className="w-full px-4 py-3 bg-gray-300 border-gray-300 placeholder:text-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                    />
                  </div>

                  {/* roll no */}

                  <div>
                    <label
                      htmlFor="rollno"
                      className="block text-sm font-medium text-gray-600 mb-1  text-left"
                    >
                      Roll No
                    </label>
                    <input
                      value={rollno}
                      onChange={(e) => {
                        setRollNo(e.target.value);
                      }}
                      type="text"
                      id="rollno"
                      placeholder="Enter your Roll no"
                      className="w-full px-4 py-3 bg-gray-300 border-gray-300 placeholder:text-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                    />
                  </div>

                  {/* password */}
    
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
                    className="w-full bg-[#D0B9FF]   font-bold py-3 rounded-xl hover:bg-[#D0B9FF] transition-colors duration-300"
                  >
                    Register
                  </button>
                </form>
    
                <p className="text-center text-gray-600 mt-6">
                  Already have a account?{" "}
                  <a
                    href="#"
                    className="text-bg-[#D0B9FF] font-semibold hover:underline"
                  >
                    Log in
                  </a>
                </p>
              </div>
            </main>
          </div>
        </div>
  )
}

export default Registration