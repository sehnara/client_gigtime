import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const WorkerAngelResult = () => {
  // 1. GET
  // useEffect로 데이터 불러온다
  const navigation = useNavigate();
  const [data, setData] = useState({
    store_name: "",
    date: "",
    start_time: "",
    end_time: "",
    hours: 0,
    price: 10000,
    type: "",
    dist: 0,
    location: "",
  });
  const sch = window.location.search;
  const params = new URLSearchParams(sch);
  const w_id = params.get("worker_id");
  const a_id = params.get("angel_id");

  const getData = async () => {
    await axios
      .post("/worker/angel/info", {
        angel_id: sessionStorage.getItem("angel_id") || a_id,
        worker_id: sessionStorage.getItem("worker_id") || w_id,
      })
      .then((res) => {
        console.log("알바생 앤젤 뭐시기 >>>>", res.data);
        setData(res.data);
      });
  };

  useEffect(() => {
    if (
      !sessionStorage.getItem("worker_id") ||
      !sessionStorage.getItem("angel_id")
    ) {
      sessionStorage.setItem("worker_id", w_id);
      sessionStorage.setItem("angel_id", a_id);
    }
    getData();
  }, []);

  // 2. POST
  // 수락 날려준다.

  const onAgree = async () => {
    await axios
      .post("/worker/angel/accept", {
        angel_id: sessionStorage.getItem("angel_id"),
        worker_id: sessionStorage.getItem("worker_id"),
      })
      .then((res) => {
        if (res.data === "success") {
          alert(`${data.store_name}와 알바천사 매칭되었습니다.`);
        } else if (res.data === "fail") {
          alert(`이미 만료된 콜입니다.`);
        } else {
          alert("잠시 후 다시 이용해주세요.");
        }
      })
      .then(() => {
        navigation("/worker/home");
      });
  };

  return (
    <div>
      <Header title="알바천사" onClickEvent={"/worker/home"} />
      <div className="flex flex-col justify-center items-center">
        <p className="text-cyan-400 text-2xl font-bold my-8 ">바로알바 정보</p>
        {/* 1.요청 직종 */}
        <div className="text-black w-screen px-16 mb-2">
          <div className="flex w-full ">
            <p className="pr-4 flex-1 ">가게명 : </p>
            <p className="pr-4 flex-3">{data && data.store_name}</p>
          </div>
        </div>
        {/* 2. 위치 */}
        <div className="text-black w-screen px-16 mb-2">
          <div className="flex w-full ">
            <p className="pr-4 flex-1">위치 : </p>
            <p className="pr-4 flex-3">{data && data.location}</p>
          </div>
        </div>{" "}
        {/* 3. 유형*/}
        <div className="text-black w-screen px-16 mb-2">
          <div className="flex w-full ">
            <p className="pr-4 flex-1">직종 : </p>
            <p className="pr-4 flex-3">{data && data.type}</p>
          </div>
        </div>
        {/* 4. 거리 */}
        <div className="text-black w-screen px-16 mb-2">
          <div className="flex w-full ">
            <p className="pr-4 flex-1">거리 : </p>
            <p className="pr-4 flex-3">{data && data.dist}</p>
          </div>
        </div>
        {/* 5. 시급 */}
        <div className="text-black w-screen px-16 mb-2">
          <div className="flex w-full ">
            <p className="pr-4 flex-1">시급 : </p>
            <p className="pr-4 flex-3">{data && data.price}</p>
          </div>
        </div>
        {/* 5. 시간 */}
        <div className="text-black w-screen px-16 mb-2">
          <div className="flex w-full ">
            <p className="pr-4 flex-1">시작 시간 : </p>
            <p className="pr-4 flex-3">
              {data && data.start_time}({data && data.hours}시간)
            </p>
          </div>
        </div>
        <div className="flex space-x-2 mt-8">
          <button
            className="bg-gray-500  w-36 rounded-lg text-white font-bold p-3"
            onClick={() => {
              navigation("/worker/home");
            }}
          >
            취소
          </button>
          <button
            className="bg-cyan-500 w-36 rounded-lg text-white font-bold p-3"
            onClick={() => {
              onAgree();
            }}
          >
            수락
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkerAngelResult;
