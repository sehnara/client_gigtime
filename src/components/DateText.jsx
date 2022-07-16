import React from "react";
import { AiOutlineCalendar } from "react-icons/ai";

function DateText() {
    return (
        <div className="flex items-center w-full my-4">
            <AiOutlineCalendar />
            <p className="text-xs ml-2">2022년 7월 23일</p>  
        </div>
    );
}

export default DateText;