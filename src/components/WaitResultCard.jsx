import React from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import DateText from "./DateText";
import man from "../images/man.png"
import clock from "../images/clock.png"
import question from "../images/question.png"

function WaitResultCard() {
    return (
        <div className="m-8 h-72 overflow-scroll">
            <h1 className="font-bold">승인대기</h1>
            <DateText />
            <div className="w-full h-44 rounded-xl shadow-xl shadow-black-500 mr-2 mb-2 text-center flex flex-col">
                <div>
                    <img className="m-2 ml-3 w-5 h-5" src={man}/>
                    <span>kantwang</span>
                </div>
                <img className="m-2 ml-3 w-5 h-5" src={clock}/>
                <img className="m-2 ml-3 w-5 h-5" src={question}/>
            </div>
        </div>
    );
}

export default WaitResultCard;