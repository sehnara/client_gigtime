import React from "react";
import { useNavigate } from "react-router-dom";
import StoreCard from "../components/StoreCard";
import { useDispatch, useSelector } from "react-redux";

const WorkerHomePage = () => {
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  console.log(state.sign);
  const onNextPage = () => {
    navigate("/worker/interview");
  };

  return (
    <div className="font-sans">
      {/* 상단 */}
      <div className=" m-8  flex items-center justify-between">
        <h1 className="text-2xl font-bold">인천 서구 심곡동</h1>
        <p className="text-sm font-normal text-slate-600 mt-2">
          내 주변 <span className="font-extrabold">400m</span>
        </p>
      </div>
      {/* 중반 */}
      <div className="flex m-8 mt-10">
        <div className="flex-column">
          <p className="text-2xl mb-0.5 font-medium">이제는</p>
          <p className="text-2xl mb-0.5 font-medium">
            <span className="text-cyan-500  font-extrabold">긱!</span> 하게
          </p>
          <p className="text-2xl mb-0.5 font-medium">일 할 시간!</p>
        </div>
        <img src="../images/walking.png" alt="walking man" />
      </div>
      {/* 하단 */}
      <div className="border-t-4 "></div>
      <div className="m-8 ">
        <h1 className="text-xl font-bold mb-4">왕경업님을 기다리고 있어요.</h1>
        <StoreCard
          store={"보리누리"}
          distance={124}
          jobs={["카운터", "청소", "음료제조"]}
          minPay={9850}
          onClickEvent={onNextPage}
        />
      </div>
    </div>
  );
};

export default WorkerHomePage;
