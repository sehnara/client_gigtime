import React from "react";
import DateText from "./DateText";
import man from "../images/man.png"
import clock from "../images/clock.png"
import question from "../images/question.png"
import CardButton from "./CardButton";
import GigWorker from "./GigWorker";

function OwnerPageCard( {setIsClick, id, mode, date, name, time, description, onClickAllow, onClickReject, onClickPass, onClickFail}) {
    const interviewTime = `${time}:00 ~ ${time + 1}:00`;
    let dateSplit = date.split('-');
    return (
        <>
            <DateText date={dateSplit}/>
            <div className="w-full h-48 rounded-xl shadow-lg shadow-black-500 mr-2 mb-2 text-center flex flex-col p-4">
                <GigWorker name={name}/>
                <div className="flex items-center">
                    <img className="m-2 w-5 h-5" src={clock}/>
                    <p className="text-xs">{interviewTime}</p>
                </div>
                <div className="flex items-center">
                    <img className="m-2 w-5 h-5" src={question}/>
                    <p className="text-xs">{description}</p>
                </div>
                <div className="flex">
                    {
                        mode === "WAIT" ?
                        <>
                            <CardButton setIsClick={setIsClick} onClickEvent={()=>{onClickAllow(id)}} title="수락" color={"bg-cyan-500"} height={10}/>
                            <CardButton setIsClick={setIsClick} onClickEvent={()=>{onClickReject(id)}} title="거절" color={"bg-gray-400"} height={10}/>
                        </>
                        : mode === "WILL" ?  
                        <>
                            <CardButton title="대기 중" color={"bg-gray-400"} height={10} />
                        </>
                        : mode === "NOW" ? 
                        <>
                            <CardButton title="화상면접 방 개설" color={"bg-cyan-500"} height={10} />
                        </>
                        :
                        <>
                            <CardButton setIsClick={setIsClick} onClickEvent={()=>{onClickPass(id)}} title="합격" color={"bg-cyan-500"} height={10}/>
                            <CardButton setIsClick={setIsClick} onClickEvent={()=>{onClickFail(id)}} title="불합격" color={"bg-gray-400"} height={10}/>
                        </>
                    }
                    </div>
            </div>    
        </> 
    );
}

export default OwnerPageCard;