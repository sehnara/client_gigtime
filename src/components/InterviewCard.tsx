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
      .post(`${process.env.REACT_APP_ROUTE_PATH}/worker_interview`, {
        interviewId: interviewId,
      })
      .then((res) => {
        if (res.data.enter === true) {
          navigate("/interview", {
            state: {
              room: res.data.room,
              isOwner: false,
            },
          });
        } else {
          alert("아직 열리지 않았습니다");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="mx-8 my-4 h-10 mb-48">
      <div className="flex items-center w-full my-4 mb-2">
        <AiOutlineCalendar className="mr-2" />
        <p className="text-xs">
          {dateSplit[0]}년 {dateSplit[1]}월 {dateSplit[2]}일
        </p>
      </div>
      <div className="">
        {/* 가게명 */}
        <h3 className="font-bold text-xl ">{storeName}</h3>
        {/* 직종 */}
        <div className="flex space-x-2 w-full my-2">
          {storeType.map((el, index) => (
            <p
              key={index}
              className="text-xs  text-center bg-cyan-100 px-2 py-1 rounded-2xl"
            >
              {el}
            </p>
          ))}
        </div>
      </div>
      {/* 주소 */}
      <p className="mb-3  text-xs mt-2 font-bold">{storeAdd}</p>
      {/* 화상 면접 접근 카드 */}
      <div
        className={`flex rounded-xl shadow-lg h-10 items-center  justify-center p-6 ${
          state === 2 || state === 3 || state === 6
            ? "bg-gray-200"
            : state === 4 && "bg-gray-200"
        }`}
      >
        {state === 2 ? (
          <div className="flex flex-col justify-center items-center w-full ">
            <p className=" text-bold ">
              면접 신청 <span className="text-green-600 font-bold">완료</span>
            </p>
            <p className="text-center font-bold text-xs">({interviewTime})</p>
          </div>
        ) : state === 3 ? (
          rejectFlag === 0 ? (
            <div className="flex flex-col justify-center items-center w-full ">
              <p className="text-center  font-bold">{interviewTime}</p>
              <p className="text-xs text-bold">면접 준비 중입니다...</p>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center w-full ">
              <p className="text-bold">
                면접 신청 <span className="text-red-500 font-bold">거절</span>
              </p>
              <p className="text-center text-xs font-bold">({interviewTime})</p>
            </div>
          )
        ) : state === 4 ? (
          <div className=" ">
            <p className="">면접 완료</p>
            <p className="text-xs text-bold">(결과대기중)</p>
          </div>
        ) : state === 5 ? (
          <div className="">
            <p className="text-sm">
              {resultFlag ? (
                <span className="text-green-500 font-bold text-lg ">합격</span>
              ) : (
                <span className="text-red-400 font-bold text-lg ">불합격</span>
              )}
            </p>
          </div>
        ) : state === 6 ? (
          <div className="flex flex-col justify-center items-center w-full ">
            <p className=" text-bold font-bold ">만료</p>
          </div>
        ) : (
          <>
            <p className="flex-10 text-center font-bold animate-pulse">
              {interviewTime}
            </p>
            <button
              onClick={interviewWorker}
              className=" bg-cyan-500 px-2 py-1 rounded-lg "
            >
              <BsFillCameraVideoFill
                onClick={() => {}}
                className="text-white"
              />
            </button>
          </>
        )}
      </div>
      <div className="border-2 border-gray-100 mt-8"></div>
    </div>
  );
};

export default InterviewCard;
