import React, { useState } from 'react';
const studentsData = [
  { id: 1, name: 'Aniket', points: 400 },
  { id: 2, name: 'Rajiv', points: 367 },
  { id: 3, name: 'Ruchika', points: 340 },
  { id: 4, name: 'Amol', points: 320 },
  { id: 5, name: 'Akshay', points: 318 },
  { id: 6, name: 'Sahil', points: 280 },
  { id: 7, name: 'Akshaya', points: 230 },
  { id: 8, name: 'Adarsh', points: 200 },
  { id: 9, name: 'Shivam', points: 170 },
  { id: 10, name: 'Krishna', points: 130 },
];
function StudentPerformance() {
     const [selectedStudent, setSelectedStudent] = useState(null);

  const handleStudentClick = (studentId) => {
    const student = studentsData.find(s => s.id === studentId);
    setSelectedStudent(student);
    // In a real application, you would navigate to a new page or show a modal here.
    // For this example, we'll just log the selected student.
    console.log('Selected student:', student);
  };
  return (
    <>
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800 font-sans">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Main Content Area */}
        <div className="flex-1 p-4 md:p-8 lg:p-12">
          <div className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-indigo-900">
              Student Insights
            </h1>
            
            {/* Student List View */}
            {!selectedStudent && (
              <>
                <div className="grid grid-cols-2 gap-4 text-lg md:text-xl font-semibold border-b-2 border-gray-200 pb-2 mb-4">
                  <div className="text-indigo-900">Username</div>
                  <div className="text-indigo-900 text-right">Point</div>
                </div>

                {studentsData.map(student => (
                  <div
                    key={student.id}
                    className="grid grid-cols-2 gap-4 py-4 px-4 bg-gray-100 rounded-lg mb-2 cursor-pointer transition-all duration-200 hover:bg-indigo-100 transform hover:scale-[1.01]"
                    onClick={() => handleStudentClick(student.id)}
                  >
                    <div className="text-base md:text-lg font-medium text-gray-700">{student.name}</div>
                    <div className="text-base md:text-lg font-medium text-gray-700 text-right">{student.points}</div>
                  </div>
                ))}
              </>
            )}

            {/* Student Detail View (placeholder) */}
            {selectedStudent && (
              <div className="p-8 bg-indigo-50 rounded-lg shadow-inner">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-indigo-800">
                  {selectedStudent.name}'s Profile
                </h2>
                <p className="text-lg md:text-xl text-gray-700 mb-4">Total Points: <span className="font-semibold">{selectedStudent.points}</span></p>
                <p className="text-gray-600 italic">
                  This is where you would display detailed information about the student.
                </p>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition-colors duration-300"
                >
                  Back to All Students
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default StudentPerformance