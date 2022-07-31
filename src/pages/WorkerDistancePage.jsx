import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { setRange } from "../module/slices/sign";
import axios from "axios";
import Header from "../components/Header";
import Map from "../components/Map/Map";

const WorkerDistancePage = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [distance, setDistance] = useState(0);
  const signData = state.sign;

  const navigate = useNavigate();

  const onchangeDistance = (e) => {
    dispatch(setRange(e.target.value));
  };

  const setSignData = async () => {
    await axios
      .post(`${process.env.REACT_APP_ROUTE_PATH}/worker/signup`, signData)
      .then((res) => {
        sessionStorage.setItem("worker_id", res.data);
      })
      .then(() => {
        navigate("/worker/home");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const onNextPage = () => {
    setSignData();
  };

  return (
    <div className="font-sans">
      <Header title="회원가입 " isSignUp={true} />
      {/* 상단 */}
      <div className=" m-8  flex items-start flex-col">
        <div className="text-gray-600 font-bold">
          <h2>현재 위치 : </h2>
        </div>
        <h1 className="text-xl font-bold">{signData.location}</h1>
      </div>
      <div className="border-2"></div>
      {/* 중반 */}
      <div className=" m-8 mt-10">
        <p className="text-xl mb-4 font-bold">거리를 설정해주세요</p>
        <p className="text-xs text-gray-500 mt-2">
          반경 <span className="font-extrabold">{signData.range}m</span> 안에
          있는 일감 정보가 검색됩니다.
        </p>
        <input
          type="range"
          className="border-2 h-10 w-full"
          min={0}
          max={4000}
          step={100}
          value={signData.range}
          onChange={onchangeDistance}
        />
        <Map
          level={7}
          width={"full"}
          height={"96"}
          address={signData.location}
          range={signData.range}
        />
        <Button title={"설정 완료"} onClickEvent={onNextPage} />
      </div>
    </div>
  );
};

export default WorkerDistancePage;
