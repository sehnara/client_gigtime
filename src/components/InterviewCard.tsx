import axios from "axios";
import React, { useState } from "react";
import { isCompositeComponent } from "react-dom/test-utils";
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
  interviewId: number;
  storeName: string;
  storeAdd: string;
  storeType: string[];
};

const InterviewCard = ({
  date,
  time,
  rejectFlag,
  resultFlag,
  link,
  state,
  interviewId,
  storeName,
  storeAdd,
  storeType,
}: InterviewCardProps) => {
  const navigate = useNavigate();
  let dateSplit: string[] = date.split("-");
  const interviewTime = `${time}:00 ~ ${time + 1}:00`;

  const interviewWorker = () => {
    // 없으면 alert
    // 있으면 navigate
    axios
      .post("/interview", {
        interviewId: interviewId,
      })
      .then((res) => {
        console.log(res.data);

        if (res.data.enter === true) {
          navigate("/interview", {
            state: {
              room: res.data.room,
              isOwner: false,
            },
          });
        } else {
          alert("아직 열리지 않았습니다!");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="mx-8 my-4 h-10 mb-32">
      <div className="flex items-center w-full my-4">
        <AiOutlineCalendar className="mr-2" />
        <p className="text-xs">
          {dateSplit[0]}년 {dateSplit[1]}월 {dateSplit[2]}일
        </p>
      </div>
      <div className="flex ">
        {/* 가게명 */}
        <h3 className="font-bold text-base">{storeName}</h3>
        {/* 직종 */}
        <div className="flex ml-2 overflow-hidden w-full">
          {storeType.map((el, index) => (
            <p
              key={index}
              className="text-xs w-96 text-center mr-1 bg-gray-200 px-2 py-1 rounded-2xl"
            >
              {el}
            </p>
          ))}
        </div>
      </div>
      {/* 주소 */}
      <p className="mb-3 text-gray-500 text-sm mt-1">{storeAdd}</p>
      {/* <p className="text-xs ml-6 bg-gray-200 px-2 py-1 rounded-2xl">{nowState}</p> */}
      {/* 화상 면접 접근 카드 */}
      <div className="flex rounded-xl shadow-lg h-10 items-center p-4">
        <p className="flex-10 text-center">{interviewTime}</p>
        <button
          onClick={interviewWorker}
          className=" bg-cyan-500 px-2 py-1 rounded-lg "
        >
          <BsFillCameraVideoFill onClick={() => {}} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default InterviewCard;
