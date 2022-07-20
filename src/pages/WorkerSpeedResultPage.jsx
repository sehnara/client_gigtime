import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import { AiOutlineArrowDown } from "react-icons/ai";

const WorkerSpeedResultPage = () => {
  const location = useLocation();
  const loc = location.state.visits;
  const totalPrice = location.state.totalPrice;
  const navigate = useNavigate();

  function setStarts(arr) {
    const starts = [0];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i].store !== arr[i - 1].store) {
        starts.push(i);
      }
    }
    return starts;
  }

  return (
    <div className="h-full w-full">
      <Header title={"바로알바 신청하기"} />
      <div className="flex flex-col mx-8 x-full text-center mt-8">
        {setStarts(loc).map((i, index) => {
          return (
            <div className="flex flex-col items-center">
              <div
                key={index}
                className="flex space-x-2 x-full items-center mb-4 border rounded-lg p-2"
              >
                <p className=" text-2xl flex-1">{loc[i].time}</p>
                <p className="flex-3 text-xl ">{loc[i].store}</p>
              </div>
              <AiOutlineArrowDown className="text-2xl mb-4" />
            </div>
          );
        })}
        <div className="x-full mb-4  rounded-lg p-2 ">
          <p className="text-center text-3xl font-bold text-cyan-500 ">
            {" "}
            퇴근 !!
          </p>
        </div>
      </div>
      <div className="border-2"></div>

      <div className="m-8 ">
        <p className="text-3xl font-bold text-right">
          총 <span className="text-cyan-500 text-4xl">{loc.length}</span>시간
        </p>
        <p className="text-3xl font-bold text-right mb-8">
          총 <span className="text-cyan-500 text-4xl">{totalPrice}</span>원
        </p>
        <Button
          title={"알바신청하기"}
          onClickEvent={() => navigate("/worker/home")}
        />
      </div>
    </div>
  );
};

export default WorkerSpeedResultPage;
