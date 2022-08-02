import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import { AiOutlineArrowDown } from "react-icons/ai";
import axios from "axios";
import MapRoute from "../components/Map/MapRoute";

const WorkerSpeedResultPage = () => {
  // const location = useLocation();
  // const loc = location.state.visits;
  // const totalPrice = location.state.totalPrice;
  // const navigate = useNavigate();

  // function setStarts(arr) {
  //   const starts = [0];
  //   for (let i = 1; i < arr.length; i++) {
  //     if (arr[i].store !== arr[i - 1].store) {
  //       starts.push(i);
  //     }
  //   }
  //   return starts;
  // }

  // const onReserve = async () => {
  //   await axios
  //     .post(`${process.env.REACT_APP_ROUTE_PATH}/worker/suggestion/submit`, {
  //       worker_id: sessionStorage.getItem("worker_id"),
  //       hourly_order_id: loc.map((i) => i.id),
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .then(() => {
  //       navigate("/worker/home");
  //     });
  // };
  const mock = [
    {
      store: "수수커피 강남N타워점",
      lat: "37.4997777",
      lnt: "127.0324107",
      start: "13:00",
      duration: 2,
    },
    {
      store: "클로리스 역삼 GFC점",
      lat: "37.4999269",
      lnt: "127.0365526",
      start: "15:00",
      duration: 2,
    },
    {
      store: "바게트케이",
      lat: "37.5002567",
      lnt: "127.0414329",
      start: "17:00",
      duration: 2,
    },
    {
      store: "브루커피",
      lat: "37.4967293",
      lnt: "127.0294237",
      start: "19:00",
      duration: 2,
    },
    {
      store: "커피스니퍼 센터필드점",
      lat: "37.5030426",
      lnt: "127.041588",
      start: "21:00",
      duration: 2,
    },
  ];

  return (
    <div className="h-full w-full">
      <Header title={"바로알바 신청하기"} />
      <MapRoute locations={mock} />
      {/* <div className="flex flex-col mx-8 x-full text-center mt-8">
        {setStarts(loc).map((i, index) => {
          return (
            <div className="flex flex-col items-center">
              <div
                key={index}
                className="flex space-x-2 x-full items-center mb-4 border rounded-lg p-2"
              >
                <p className="text-2xl flex-1">{loc[i].time}</p>
                <p className="flex-5 text-lg ml-4 ">{loc[i].store}</p>
              </div>
              <AiOutlineArrowDown className="text-2xl mb-4" />
            </div>
          );
        })}
        <div className="x-full mb-4  rounded-lg p-2 ">
          <p className="text-center text-3xl font-bold text-cyan-500 ">
            퇴근 !!
          </p>
        </div>
      </div>
      <div className="border-2"></div>
*/}
      <div className="mx-6">
        <p className="text-xl font-bold text-right">
          총 <span className="text-cyan-500 text-2xl">{10}</span>시간
        </p>
        <p className="text-xl font-bold text-right ">
          총 <span className="text-cyan-500 text-2xl">{122000}</span>원
        </p>
        <Button title={"알바신청하기"} onClickEvent={() => {}} />
      </div>
    </div>
  );
};

export default WorkerSpeedResultPage;
