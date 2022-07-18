import React from "react";
import { AiOutlineCalendar } from "react-icons/ai";

function DateText( {date} ) {
    return (
        <div className="flex items-center w-full mt-5">
            <AiOutlineCalendar />
            <p className="text-xs ml-2">{date[0]}년 {date[1]}월 {date[2]}일</p>  
        </div>
    );
}

export default DateText;