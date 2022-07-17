import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import SearchAddress from "../components/SearchAddress";

const WorkerLocationPage = ( {title, src} ) => {
  const navigate = useNavigate();

  function onClickToNext() {
    navigate(src);
  }

  return (
    <div className="font-sans">
      <Header title="회원가입" />
      {/* 상단 */}
      <div className=" m-8  flex items-center justify-between">
        <h1 className="text-2xl font-bold">{title} 설정</h1>
      </div>
      {/* 중반 */}
      <div id="search" className="m-8 mt-10">
        <p className="text-lg mb-5 font-bold">{title} 설정해주세요</p>
        <SearchAddress />
        <Button title="완료" onClickEvent={onClickToNext} />
      </div>
    </div>
  );
};

export default WorkerLocationPage;
