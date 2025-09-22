import React, { useState } from "react";
import { Blob } from "../shapes/LoginShapes";
import logo from "../assets/boy.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests
// import Header from "../Components/Header";
// import Footer from "../Components/Footer";

const Registration = () => {
  const [role, setRole] = useState("student"); // default role
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [rollno, setRollNo] = useState("");
  const [std, setStd] = useState("");
  const [school, setSchool] = useState("");

  const navigate = useNavigate();

  // Define API endpoints for each user role
  const API_ENDPOINTS = {
    student: "http://localhost:4000/user/api/register",
    teacher: "http://localhost:4000/teacher/api/register", // New endpoint for teachers
    admin: "http://localhost:4000/admin/api//register",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let userData;

    if (role === "student") {
      // Only send student-specific data
      userData = {
        fullname,
        email,
        password,
        school,
        standard: std,
        mobileNo: number,
        rollno: rollno,
        userType: role,
      };
    } else if (role === "teacher") {
      // Only send teacher-specific data
      userData = {
        fullname,
        email,
        password,
        school,
        userType: role,
      };
    } else if (role === "admin") {
      // Only send admin-specific data
      userData = {
        fullname,
        email,
        password,
        userType: role,
      };
    }

    try {
      // Use the API_ENDPOINTS object to select the correct URL based on the role
      const response = await axios.post(API_ENDPOINTS[role], userData);
      console.log("Registration successful:", response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      alert("Registration Successful!");
      // Redirect to the login page
      navigate("/login");
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data || error.message
      );
      alert(
        `Registration Failed: ${
          error.response?.data?.message || "Something went wrong"
        }`
      );
    } finally {
      // Reset all form fields after the request is complete
      setRole("student");
      setFullname("");
      setEmail("");
      setPassword("");
      setNumber("");
      setRollNo("");
      setStd("");
      setSchool("");
    }
  };
  // ... (rest of the component)

  return (
    <div>
      <div className="bg-gray-100 flex items-center justify-center min-h-screen font-sans">
        <main className="w-full max-w-5xl m-4 bg-white shadow-2xl rounded-3xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
          {/* Left Side */}
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
                  <img
                    src={logo}
                    alt="Scientist"
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

            {/* Horizontal Sliding Buttons */}
            <div className="flex justify-center mb-6 bg-gray-200 rounded-xl p-1">
              {["student", "teacher", "admin"].map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`flex-1 px-4 py-2 rounded-xl p-1 font-medium transition ${
                    role === r
                      ? "bg-purple-400 text-white shadow"
                      : "text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Common Fields */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1 text-left">
                  Full Name
                </label>
                <input
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  type="text"
                  placeholder="Your full name"
                  className="w-full px-4 py-3 bg-gray-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1 text-left">
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter your Email"
                  className="w-full px-4 py-3 bg-gray-300 rounded-xl"
                />
              </div>

              {/* Role-Specific Fields for student */}
              {role === "student" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1 text-left">
                      School
                    </label>
                    <input
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                      type="text"
                      placeholder="Enter your school name"
                      className="w-full px-4 py-3 bg-gray-300 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1 text-left">
                      Class
                    </label>
                    <input
                      value={std}
                      onChange={(e) => setStd(e.target.value)}
                      type="text"
                      placeholder="Enter your class"
                      className="w-full px-4 py-3 bg-gray-300 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1 text-left">
                      Mobile Number
                    </label>
                    <input
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      type="text"
                      placeholder="Enter your mobile number"
                      className="w-full px-4 py-3 bg-gray-300 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1 text-left">
                      Roll No
                    </label>
                    <input
                      value={rollno}
                      onChange={(e) => setRollNo(e.target.value)}
                      type="text"
                      placeholder="Enter your roll number"
                      className="w-full px-4 py-3 bg-gray-300 rounded-xl"
                    />
                  </div>
                </>
              )}

              {/* Role-Specific Fields for teacher */}
              {role === "teacher" && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1 text-left">
                    School
                  </label>
                  <input
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    type="text"
                    placeholder="Enter your school name"
                    className="w-full px-4 py-3 bg-gray-300 rounded-xl"
                  />
                </div>
              )}

              {/* Password Field (always last) */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1 text-left">
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Enter your Password"
                  className="w-full px-4 py-3 bg-gray-300 rounded-xl"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-purple-400 text-white font-bold py-3 rounded-xl hover:bg-purple-500 transition-colors duration-300"
              >
                Register
              </button>
            </form>
            <p className="text-center text-gray-600 mt-6">
              Already have an Account?{" "}
              <Link
                to="/login"
                className="text-bg-[#D0B9FF] font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Registration;
