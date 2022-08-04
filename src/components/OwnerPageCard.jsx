import React from "react";
import DateText from "./DateText";
import man from "../images/man.png";
import clock from "../images/clock.png";
import question from "../images/question.png";
import CardButton from "./CardButton";
import GigWorker from "./GigWorker";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function OwnerPageCard({
  setIsClick,
  id,
  mode,
  date,
  name,
  time,
  description,
  onClickAllow,
  onClickReject,
  onClickPass,
  onClickFail,
}) {
  const interviewTime = `${time}:00 ~ ${time + 1}:00`;
  let dateSplit = date.split("-");
  const navigate = useNavigate();

  const moveInterview = async () =>{
    await axios
      .post(`${process.env.REACT_APP_ROUTE_PATH}/owner_interview`, {room: id})
      .then((res) =>{
        if(res.data.status === 'success'){
          // 인터뷰 페이지로 이동
          navigate("/interview", {
            state: { 
            room: id,
            isOwner: true,
            },
          });
      }  
    })
  };

  return (
    <>
      <DateText date={dateSplit} />
      <div
        className={`w-84 ${
          mode === "EXPIRED" ? "h-16" : "h-52"
        } rounded-xl shadow-lg shadow-black-500 mr-2  text-center flex ${
          mode === "EXPIRED"
            ? "flex items-center justify-between bg-gray-200"
            : "flex-col"
        } p-4 mb-8`}
      >
        <GigWorker name={name} />
        {mode === "EXPIRED" && (
          <p className="pl-32 text-red-400 font-bold">만료</p>
        )}
        {mode === "EXPIRED" ? (
          <></>
        ) : (
          <>
            <div className="flex items-center">
              <img className="mx-2 my-1 w-7 h-7" src={clock} />
              <p className="text-base ml-3">{interviewTime}</p>
            </div>
            <div className="flex items-center">
              <img className="mx-2 my-2 w-7 h-7" src={question} />
              <p className="text-base ml-3">{description}</p>
            </div>
          </>
        )}
        <div className="flex">
          {mode === "WAIT" ? (
            <>
              <CardButton
                setIsClick={setIsClick}
                onClickEvent={() => {
                  onClickAllow(id);
                }}
                title="수락"
                color={"bg-cyan-500"}
                height={10}
              />
              <CardButton
                setIsClick={setIsClick}
                onClickEvent={() => {
                  onClickReject(id);
                }}
                title="거절"
                color={"bg-gray-400"}
                height={10}
              />
            </>
          ) : mode === "WILL" ? (
            <>
              <CardButton title="대기 중" color={"bg-gray-400"} height={10} />
            </>
          ) : mode === "NOW" ? (
            <>
              <CardButton
                title="화상면접 방 개설"
                color={"bg-cyan-500"}
                height={10}
                onClickEvent={() => {
                  moveInterview();
                }}
              />
            </>
          ) : mode === "EXPIRED" ? (
            <></>
          ) : (
            <>
              <CardButton
                setIsClick={setIsClick}
                onClickEvent={() => {
                  onClickPass(id);
                }}
                title="합격"
                color={"bg-cyan-500"}
                height={10}
              />
              <CardButton
                setIsClick={setIsClick}
                onClickEvent={() => {
                  onClickFail(id);
                }}
                title="불합격"
                color={"bg-gray-400"}
                height={10}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default OwnerPageCard;
