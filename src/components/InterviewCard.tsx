import React, { useState } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

type InterviewCardProps = {
  date: string;
  time: number;
  rejectFlag?: number;
  resultFlag?: number;
  link: string;
  state: number;
  storeName: string;
  storeAdd: string;
  storeType: string[];
};

const InterviewCard = ({ date, time, rejectFlag, resultFlag, link, state, storeName, storeAdd, storeType} : InterviewCardProps) => {
  const navigate = useNavigate()
  let dateSplit: string[] = date.split('-');
  const interviewTime = `${time}:00 ~ ${time + 1}:00`;
  
  function linkClick() {
    navigate(`${link}`);
  }

  const [nowState, setState] = useState('');
  if (state === 1) {
    setState('입장대기');
  } else if (state === 2) {
    setState('수락대기');
  } else if (state === 3) {
    if (rejectFlag === 1) {
      setState("거절");
    } else {
      setState('수락');
    }
  } else {
    if (resultFlag === 1) {
      setState('합격');
    } else {
      setState('불합격');
    }
  }

  return(
    <div className="mx-8 my-4 h-10 mb-32">
      <div className="flex items-center w-full my-4">
        <AiOutlineCalendar className="mr-2" />
        <p className="text-xs">{dateSplit[0]}년 {dateSplit[1]}월 {dateSplit[2]}일</p>
      </div>
      <div className="flex ">
        {/* 가게명 */}
        <h3 className="font-bold text-base">{storeName}</h3>
        {/* 직종 */}
        {storeType.map((el, index) => 
          <p className="text-xs ml-6 bg-gray-200 px-2 py-1 rounded-2xl">{el[index]}</p>
        )}
      </div>
      {/* 주소 */}
      <p className="mb-3 text-gray-500 text-sm mt-1">{storeAdd}</p>
      <p className="text-xs ml-6 bg-gray-200 px-2 py-1 rounded-2xl">{nowState}</p>
      {/* 화상 면접 접근 카드 */}
      <div className="flex rounded-xl shadow-lg h-10 items-center p-4">
        <p className="flex-10 text-center">{interviewTime}</p>
        <button className=" bg-cyan-500 px-2 py-1 rounded-lg ">
          <BsFillCameraVideoFill onClick={linkClick} className="text-white" />
        </button>
      </div>
    </div>
  );
}

export default InterviewCard;
