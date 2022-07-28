import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BodyTop from "../components/BodyTop";
import Button from "../components/Button";
import Header from "../components/Header";
import SearchAddress from "../components/SearchAddress";
import { useSelector, useDispatch } from "react-redux";
import { setLocation } from "../module/slices/sign";
import dog_heart from "../images/dog_heart.png";

const WorkerLocationPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [complete, setComplete] = useState(false);
  const state = useSelector((state) => state);

  function onClickToNext() {
    dispatch(setLocation);
    navigate("/worker/distance");
  }

  return (
    <div className="font-sans">
      <Header title="회원가입" isSignUp={true} />
      {/* 상단 */}
      <BodyTop title="내 위치" />
      {/* 중반 */}
      <div id="search" className="m-8 ">
        <SearchAddress setComplete={setComplete} />
        {complete && (
          <div className="h-96 bg-gray-100 mb-2 flex flex-col justify-center items-center rounded-3xl">
            <img src={dog_heart} alt="개" className="w-48 pl-6" />
            <p className="mt-4 font-bold ">위치 설정을 완료했습니다.</p>
          </div>
        )}
        <Button title="완료" onClickEvent={onClickToNext} />
      </div>
    </div>
  );
};

export default WorkerLocationPage;
