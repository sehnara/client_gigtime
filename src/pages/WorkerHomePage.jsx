import React from "react";
import StoreCard from "../components/StoreCard";

const WorkerHomePage = () => {
  return (
    <div className="m-7git  font-sans">
      <div className="flex">
        <h1 className="text-2xl font-bold">인천 서구 심곡동</h1>
        <p>내 주변 400m</p>
      </div>
      <div className="flex">
        <div className="flex-column">
          <p>이제는</p>
          <p>긱!하게</p>
          <p>일 할 시간!</p>
        </div>
        <div className="w-40 h-40 bg-slate-400"></div>
      </div>
      <div>
        <StoreCard
          store={"보리누리"}
          distance={124}
          jobs={["카운터", "청소", "음료제조", "달리기", "줄다리기"]}
          minPay={9850}
        />
        <StoreCard
          store={"보리누리"}
          distance={124}
          jobs={["카운터", "청소", "음료제조", "달리기", "줄다리기"]}
          minPay={9850}
        />
      </div>
    </div>
  );
};

export default WorkerHomePage;
