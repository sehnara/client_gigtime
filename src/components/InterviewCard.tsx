import React from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { BsFillCameraVideoFill } from "react-icons/bs";

const InterviewCard = () => {
  return (
    <div className="mx-8 my-4 h-10 mb-32">
      <div className="flex items-center w-full my-4">
        <AiOutlineCalendar className="mr-2" />
        <p className="text-xs">2022년 7월 22일 금요일</p>
      </div>
      <div className="flex ">
        {/* 가게 명 */}
        <h3 className="font-bold text-base">보리누리</h3>
        {/* 직종 */}
        <p className="text-xs ml-6 bg-gray-200 px-2 py-1 rounded-2xl">카운터</p>
      </div>
      {/* 주소 */}
      <p className="mb-3 text-gray-500 text-sm mt-1">인천 서구 심곡동 123-4</p>
      {/* 화상 면접 접근 카드 */}
      <div className="flex rounded-xl shadow-lg h-10 items-center p-4">
        <p className="flex-10 text-center">10:00~11:00</p>
        <button className=" bg-cyan-500 px-2 py-1 rounded-lg ">
          <BsFillCameraVideoFill className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default InterviewCard;
