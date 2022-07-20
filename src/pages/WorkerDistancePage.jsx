import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { setRange } from "../module/slices/sign";
import axios from "axios";

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
      .post("http://localhost:4000/worker/signup", signData)
      .then((res) => {
        console.log("res.data >>>>", res.data);
        sessionStorage.setItem("worker_id", res.data);
      })
      .then(() => {
        navigate("/worker/home");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // 다음 페이지로 가입시더
  const onNextPage = () => {
    setSignData();
  };

  return (
    <div className="font-sans">
      {/* 상단 */}
      <div className=" m-8  flex items-center justify-between">
        <h1 className="text-2xl font-bold">{signData.location}</h1>
      </div>
      {/* 중반 */}
      <div className=" m-8 mt-10">
        <p className="text-lg mb-0.5 font-bold">거리를 설정해주세요</p>
        <p className="text-xs text-gray-500 mt-2">
          반경 <span className="font-extrabold">{signData.range}m</span> 안에
          있는 일감 정보가 검색됩니다.
        </p>
        <input
          type="range"
          className="border-2 h-10 w-full"
          min={0}
          max={5000}
          step={10}
          value={signData.range}
          onChange={onchangeDistance}
        />
        <Button title={"설정 완료"} onClickEvent={onNextPage} />
      </div>
    </div>
  );
};

export default WorkerDistancePage;
