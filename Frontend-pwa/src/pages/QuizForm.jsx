import axios from "axios";
import React, { useState } from "react";

const QuestionForm = () => {
  const url = import.meta.env.VITE_ADD_QUESTIONS;
  const [formData, setFormData] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    subject: "Science",
    answer: "",
    standard: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically send this data to your backend API.
    // For now, we'll log the JSON object to the console.
    const questionObject = {
      question: formData.question,
      option1: formData.option1,
      option2: formData.option2,
      option3: formData.option3,
      option4: formData.option4,
      subject: formData.subject,
      answer: formData.answer,
      standard: formData.standard,
    };
    console.log(JSON.stringify(questionObject, null, 2));

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You need to login first");
        return;
      }
      const response = await axios.post(url, questionObject, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response) {
        alert(
          "Question submitted successfully! Check the console for the JSON data."
        );
      }
    } catch (err) {
      alert("Question is not submitted, check it properly");
      console.log("Error while ading questions", err);
    }

    // Reset the form after submission
    setFormData({
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      subject: "Science",
      answer: "",
      standard: "6th",
    });
  };

  return (
    <div className="flex justify-center items-start min-h-screen p-4 md:p-8 bg-gray-50 font-sans">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-indigo-900 mb-6">
          Create New Question
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="subject"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Subject
            </label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg p-3 bg-gray-100"
            >
              <option value="Science">Science</option>
              <option value="Technology">Technology</option>
              <option value="Engineering">Engineering</option>
              <option value="Math">Math</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="question"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Question
            </label>
            <input
              type="text"
              placeholder="Which shape has 4 equal sides ?"
              id="question"
              name="question"
              value={formData.question}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg p-3 bg-gray-100"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="option1"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Option 1
              </label>
              <input
                type="text"
                placeholder="Triangle"
                id="option1"
                name="option1"
                value={formData.option1}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 bg-gray-100"
              />
            </div>
            <div>
              <label
                htmlFor="option2"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Option 2
              </label>
              <input
                placeholder="Square"
                type="text"
                id="option2"
                name="option2"
                value={formData.option2}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 bg-gray-100"
              />
            </div>
            <div>
              <label
                htmlFor="option3"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Option 3
              </label>
              <input
                type="text"
                placeholder="Rectangle"
                id="option3"
                name="option3"
                value={formData.option3}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 bg-gray-100"
              />
            </div>
            <div>
              <label
                htmlFor="option4"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Option 4
              </label>
              <input
                type="text"
                placeholder="Circle"
                id="option4"
                name="option4"
                value={formData.option4}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 bg-gray-100"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="answer"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Correct Answer
            </label>
            <input
              type="text"
              placeholder="Square"
              id="answer"
              name="answer"
              value={formData.answer}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg p-3 bg-gray-100"
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Standard
            </label>
            <select
              id="standard"
              name="standard"
              value={formData.standard}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg p-3 bg-gray-100"
            >
              <option value="6th">6th</option>
              <option value="7th">7th</option>
              <option value="8th"> 8th</option>
              <option value="9th"> 9th </option>
              <option value="10th"> 10th </option>
              <option value="11th"> 11th </option>
              <option value="12th"> 12th </option>
            </select>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-105"
            >
              Submit Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionForm;
