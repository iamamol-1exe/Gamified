import React, { useState, useEffect } from 'react';

// Mock data to simulate fetching from a database
const quizData = [
    {
        question: "Which shape has 4 equal sides?",
        options: ["Triangle", "Square", "Rectangle", "Circle"],
        answer: "Square",
        subject: "Science",
        totalMarks: 50
    },
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        answer: "Paris",
        subject: "Geography",
        totalMarks: 50
    },
    {
        question: "What is the chemical symbol for water?",
        options: ["H", "O", "H2O", "C"],
        answer: "H2O",
        subject: "Chemistry",
        totalMarks: 50
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        options: ["J.K. Rowling", "Harper Lee", "George Orwell", "Mark Twain"],
        answer: "Harper Lee",
        subject: "Literature",
        totalMarks: 50
    },
    {
        question: "What is the smallest planet in our solar system?",
        options: ["Mercury", "Mars", "Earth", "Venus"],
        answer: "Mercury",
        subject: "Astronomy",
        totalMarks: 50
    }
];

// Reusable Modal Component for messages
const MessageModal = ({ message, onOk }) => (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 shadow-xl text-center max-w-sm w-full">
            <p className="text-lg font-semibold text-gray-800 mb-4">{message}</p>
            <button
                onClick={onOk}
                className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition"
            >
                OK
            </button>
        </div>
    </div>
);

const StudentQuiz = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
    const [isQuizComplete, setIsQuizComplete] = useState(false);
    const [message, setMessage] = useState(null);

    const currentQuestion = quizData[currentQuestionIndex];
    const quizSubject = quizData[0]?.subject || 'N/A';
    const quizTotalMarks = quizData[0]?.totalMarks || 0;

    // Timer logic
    useEffect(() => {
        if (timeLeft <= 0) {
            setMessage("Time's up! The quiz will now be submitted.");
            setIsQuizComplete(true);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        // Cleanup timer on component unmount
        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleOptionSelect = (option) => {
        setUserAnswers({
            ...userAnswers,
            [currentQuestionIndex]: option,
        });
    };

    const handleNext = () => {
        if (currentQuestionIndex < quizData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setIsQuizComplete(true);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmitQuiz = () => {
        let score = 0;
        quizData.forEach((question, index) => {
            if (userAnswers[index] === question.answer) {
                score++;
            }
        });
        setMessage(`Quiz submitted! You scored ${score} out of ${quizData.length}.`);
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center py-8">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
                body {
                    font-family: 'Inter', sans-serif;
                }
                .question-card {
                    background-color: #ffffff;
                    border-radius: 12px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .question-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
                }
                .option {
                    background-color: #f9fafb;
                    border: 2px solid #e5e7eb;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: background-color 0.2s, border-color 0.2s;
                }
                .option:hover {
                    background-color: #eff6ff;
                    border-color: #60a5fa;
                }
                .option.selected {
                    background-color: #dbeafe;
                    border-color: #3b82f6;
                }
                .navigation-dot {
                    width: 12px;
                    height: 12px;
                    background-color: #d1d5db;
                    border-radius: 50%;
                    cursor: pointer;
                    transition: background-color 0.2s, transform 0.2s;
                }
                .navigation-dot.current {
                    background-color: #4f46e5;
                    transform: scale(1.2);
                }
                .navigation-dot.answered {
                    background-color: #22c55e;
                }
                `}
            </style>
            
            <div className="container bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl mb-8">
                <header className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                        <span className="text-3xl font-bold text-indigo-600">STEM Quest</span>
                    </div>
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-4 text-sm font-medium">
                            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full">Subject: {quizSubject}</span>
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">Total Marks: {quizTotalMarks}</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-red-100 text-red-700 px-4 py-2 rounded-full font-bold">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            <span>{Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{ (timeLeft % 60).toString().padStart(2, '0') }</span>
                        </div>
                    </div>
                </header>
            </div>

            <main className="container bg-white rounded-xl shadow-lg p-8 w-full max-w-4xl">
                {!isQuizComplete ? (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Question {currentQuestionIndex + 1} of {quizData.length}</h2>
                        </div>
                        
                        <div className="question-card p-6 border border-gray-200 rounded-lg">
                            <p className="text-lg text-gray-700 mb-6">{currentQuestion?.question}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {currentQuestion?.options.map((option, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleOptionSelect(option)}
                                        className={`option px-4 py-4 rounded-lg font-medium ${userAnswers[currentQuestionIndex] === option ? 'selected' : ''}`}
                                    >
                                        {option}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-between mt-8">
                            <button
                                onClick={handlePrevious}
                                disabled={currentQuestionIndex === 0}
                                className={`px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-lg transition duration-200 hover:bg-gray-300 focus:outline-none ${currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                Previous
                            </button>
                            <button
                                onClick={handleNext}
                                className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg transition duration-200 hover:bg-indigo-700 focus:outline-none"
                            >
                                {currentQuestionIndex === quizData.length - 1 ? 'Finish' : 'Next'}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center p-8 text-center">
                        <h2 className="text-3xl font-bold text-green-600 mb-4">Quiz Complete!</h2>
                        <p className="text-lg text-gray-700 mb-6">Thank you for completing the quiz. You can now submit your answers.</p>
                        <button
                            onClick={handleSubmitQuiz}
                            className="px-8 py-4 bg-green-600 text-white font-bold rounded-lg text-xl transition duration-200 hover:bg-green-700 focus:outline-none"
                        >
                            Submit Quiz
                        </button>
                    </div>
                )}
            </main>

            <footer className="w-full mt-8 flex justify-center">
                <div className="flex space-x-2">
                    {quizData.map((_, index) => (
                        <div
                            key={index}
                            onClick={() => setCurrentQuestionIndex(index)}
                            className={`navigation-dot ${index === currentQuestionIndex ? 'current' : ''} ${userAnswers[index] ? 'answered' : ''}`}
                        ></div>
                    ))}
                </div>
            </footer>
            {message && <MessageModal message={message} onOk={() => setMessage(null)} />}
        </div>
    );
};

export default StudentQuiz;