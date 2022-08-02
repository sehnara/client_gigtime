import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import { AiOutlineArrowDown } from "react-icons/ai";
import axios from "axios";
import MapRoute from "../components/Map/MapRoute";

const WorkerSpeedResultPage = () => {
  const location = useLocation();
  const result = location.state.result;
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

  function getDurations(arr) {
    const durations = [];
    let time = 0;
    for (let i = 1; i < arr.length; i++) {
      time += 1;
      if (arr[i].store !== arr[i - 1].store) {
        durations.push(time);
        time = 0;
      }
      if (i === arr.length - 1) {
        durations.push(time);
      }
    }
    durations[durations.length - 1] += 1;
    return durations;
  }

  const onReserve = async () => {
    await axios
      .post(`${process.env.REACT_APP_ROUTE_PATH}/worker/suggestion/submit`, {
        worker_id: sessionStorage.getItem("worker_id"),
        hourly_order_id: loc.map((i) => i.id),
      })
      .then((res) => {
        console.log(res.data);
      })
      .then(() => {
        navigate("/worker/home");
      });
  };

  return (
    <div className="h-full w-full">
      <Header title={"바로알바 신청하기"} />
      <MapRoute
        locations={setStarts(loc).map((i) => loc[i])}
        durations={getDurations(loc)}
      />
      <div className="border-2 mb-4"></div>
      <div className="mx-6">
        <p className="text-xl font-bold text-right">
          총 <span className="text-cyan-500 text-2xl">{loc.length}</span>
          시간
        </p>
        <p className="text-xl font-bold text-right">
          총 <span className="text-cyan-500 text-2xl">{result.move}</span>m
        </p>
        <p className="text-xl font-bold text-right ">
          총 <span className="text-cyan-500 text-3xl">{totalPrice}</span>원
        </p>
        <Button
          title={"알바신청하기"}
          className="mt-4"
          onClickEvent={() => {
            onReserve();
          }}
        />
      </div>
    </div>
  );
};

export default WorkerSpeedResultPage;
