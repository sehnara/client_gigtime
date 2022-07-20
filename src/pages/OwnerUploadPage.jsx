import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BodyTop from "../components/BodyTop";
import Button from "../components/Button";
import Header from "../components/Header";
import InputValue from "../components/InputValue";
import owner from "../images/owner.png";
import { setDescription } from "../module/slices/owner";
import { useSelector, useDispatch } from "react-redux";

function OwnerUploadPage() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log(">>>>>", state);

  function onClickToNext() {
    dispatch(setDescription(value));
    navigate("/owner/wage");
  }

  return (
    <>
      <Header title="회원가입" />
      <BodyTop title="매장정보" />
      <div id="search" className="m-8 mt-10">
        <div className="mb-4">
          <p className="text-lg font-bold">사장님의 매장을</p>
          <p className="text-lg font-bold">조금 더 알려주세요.</p>
        </div>
        <div className="flex p-1">
          <img className="w-20 mr-5" src={owner} />
          <div className="pt-2">
            <p className="text-lg mb-1 font-bold">{state.owner.store_name}</p>
            <p className="text-slate-500">{state.owner.location}</p>
          </div>
        </div>
        <InputValue
          placeHorder={"한 줄 소개 입력"}
          value={value}
          setValue={setValue}
        />
      </div>
      <div id="search" className="m-8">
        <div className="mb-4">
          <p className="text-lg font-bold mb-1">매장사진 등록</p>
          <p className="text-slate-500">
            등록하신 사진이 알바 모집공고에 노출됩니다.
          </p>
        </div>
        <img className="w-full" src={owner} />
        <Button onClickEvent={onClickToNext} title="완료" />
      </div>
    </>
  );
}

export default OwnerUploadPage;
