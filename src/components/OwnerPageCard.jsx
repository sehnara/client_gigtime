import React from "react";
import DateText from "./DateText";
import man from "../images/man.png"
import clock from "../images/clock.png"
import question from "../images/question.png"
import CardButton from "./CardButton";
import GigWorker from "./GigWorker";

function OwnerPageCard() {
    return (
        <>
            <DateText />
            <div className="w-full h-48 rounded-xl shadow-lg shadow-black-500 mr-2 mb-2 text-center flex flex-col p-4">
                <GigWorker />
                <div className="flex items-center">
                    <img className="m-2 w-5 h-5" src={clock}/>
                    <p className="text-xs">20:00~21:00</p>
                </div>
                <div className="flex items-center">
                    <img className="m-2 w-5 h-5" src={question}/>
                    <p className="text-xs">두발이 건강한 사람입니다.</p>
                </div>
                <div className="flex">
                        <CardButton title="수락" color={"bg-cyan-500"} height={10}/>
                        <CardButton title="거절" color={"bg-gray-400"} height={10}/>
                    </div>
            </div>    
        </> 
    );
}

export default OwnerPageCard;