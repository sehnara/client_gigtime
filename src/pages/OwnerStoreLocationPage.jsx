import React from "react";
import { useNavigate } from "react-router-dom";
import BodyTop from "../components/BodyTop";
import Button from "../components/Button";
import Header from "../components/Header";
import SearchAddress from "../components/SearchAddress";
import { useSelector } from "react-redux";

const OwnerStoreLocationPage = () => {
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  function onClickToNext() {
    navigate("/owner/jobtype");
  }

  return (
    <div className="font-sans">
      <Header title="회원가입" />
      {/* 상단 */}
      <BodyTop title="매장주소" />
      {/* 중반 */}
      <div id="search" className="m-8 mt-10">
        <p className="text-lg mb-5 font-bold">매장주소를 설정해주세요</p>
        <SearchAddress mode={"OWNER"} />
        <Button title="완료" onClickEvent={onClickToNext} />
      </div>
    </div>
  );
};

export default OwnerStoreLocationPage;
