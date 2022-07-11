import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";

const WorkerDistancePage = () => {
  const [distance, setDistance] = useState(0);
  const navigate = useNavigate();

  const onchangeDistance = (e) => {
    setDistance(e.target.value);
  };

  // 다음 페이지로 가입시더
  const onNextPage = () => {
    // distance 값 처리해야함
    console.log(distance);
    navigate("/worker/home");
  };

  return (
    <div className="font-sans">
      {/* 상단 */}
      <div className=" m-8  flex items-center justify-between">
        <h1 className="text-2xl font-bold">인천 서구 심곡동</h1>
      </div>
      {/* 중반 */}
      <div className=" m-8 mt-10">
        <p className="text-lg mb-0.5 font-bold">거리를 설정해주세요</p>
        <p className="text-xs text-gray-500 mt-2">
          반경 <span className="font-extrabold">{distance}m</span> 안에 있는
          일감 정보가 검색됩니다.
        </p>
        <input
          type="range"
          className="border-2 h-10 w-full"
          min={0}
          max={1000}
          step={10}
          value={distance}
          onChange={onchangeDistance}
        />
        <Button title={"설정 완료"} onClickEvent={onNextPage} />
      </div>
    </div>
  );
};

export default WorkerDistancePage;