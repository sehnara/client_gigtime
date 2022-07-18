import React from "react";
import { useNavigate } from "react-router-dom";
import BodyTop from "../components/BodyTop";
import Button from "../components/Button";
import Header from "../components/Header";
import SearchAddress from "../components/SearchAddress";
import { useSelector, useDispatch } from "react-redux";
import { setLocation } from "../module/slices/sign";

const WorkerLocationPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  function onClickToNext() {
    dispatch(setLocation)
    navigate("/worker/distance");
  }

  return (
    <div className="font-sans">
      <Header title="회원가입" />
      {/* 상단 */}
      <BodyTop title="내 위치" />
      {/* 중반 */}
      <div id="search" className="m-8 mt-10">
        <p className="text-lg mb-5 font-bold">내 위치를 설정해주세요</p>
        <SearchAddress />
        <Button title="완료" onClickEvent={onClickToNext} />
      </div>
    </div>
  );
};

export default WorkerLocationPage;
