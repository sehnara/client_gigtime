import React from "react";
import { AiOutlineCalendar } from "react-icons/ai";

function DateText({ date }) {
  return (
    <div className="flex items-center w-full text-2xl ">
      <AiOutlineCalendar />
      <p className="text-base ml-2 font-bold">
        {date[0]}년 {date[1]}월 {date[2]}일
      </p>
    </div>
  );
}

export default DateText;
