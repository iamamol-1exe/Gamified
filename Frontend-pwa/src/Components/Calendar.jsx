import React from "react";
import { ChevronLeft, ChevronRight } from "../shapes/DashBoardShapes";

const Calendar = () => {
  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="bg-purple-50 p-4 rounded-2xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <button className="text-purple-600">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h4 className="font-bold text-purple-800">JAN 2022</h4>
        <button className="text-purple-600">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      <div className="grid grid-cols-7 text-center text-xs text-purple-700 font-semibold mb-2">
        {days.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 text-center text-sm gap-1">
        {dates.map((date) => (
          <div
            key={date}
            className="relative flex items-center justify-center h-10"
          >
            <span>{date}</span>
            <span className="absolute bottom-1.5 flex space-x-0.5">
              <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
