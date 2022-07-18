import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BodyTop from "../components/BodyTop";
import Button from "../components/Button";
import Header from "../components/Header";
import InputValue from "../components/InputValue";
import { setMinimumWage } from "../module/slices/owner";
import { useSelector, useDispatch } from "react-redux";

function OwnerWagePage() {
    const [value, setValue] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const state = useSelector(state => state);

    function onClickToNext() {
        dispatch(setMinimumWage(value));
        navigate('/owner/complete');
    }
    
    return (
        <>
            <Header title="회원가입" />
            <BodyTop title="최저시급"/>
            <div id="search" className="m-8 mt-10">
                <div className="mb-4">
                    <p className="text-lg font-bold">알바생이 받게 될</p>
                    <p className="text-lg font-bold">행복의 크기를 결정해주세요.</p>
                </div>
                <div className="flex mb-5">
                    <div className="pt-2">
                        <p className="text-lg mb-1 font-bold">최저시급 설정</p>
                        <p className="text-slate-500">알바생에게 가게 정보 노출 시</p>
                        <p className="text-slate-500">설정하신 최저시급 정보가 포함됩니다.</p>
                    </div>
                </div>
                <InputValue placeHorder={"최저시급 입력하기"} value={value} setValue={setValue}/>
                <Button onClickEvent={onClickToNext} title="회원가입 완료"/>
            </div>
        </>
    );
}

export default OwnerWagePage;