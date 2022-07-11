import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import StoreCard from "../components/StoreCard";

const WorkerNearWorkPage = () => {
  const ref = useRef(1);
  const navigate = useNavigate();

  const [stores, setStores] = useState([
    {
      store: "보리누리",
      distance: 124,
      jobs: ["카운터", "청소", "음료제조"],
      works: [
        {
          date: "2022년 7월 22일 금요일",
          jobs: "카운터",
          pay: "10000~10900",
        },
        {
          date: "2022년 7월 23일 토요일",
          jobs: "청소",
          pay: "10000~10900",
        },
        {
          date: "2022년 7월 24일 일요일",
          jobs: "설거지",
          pay: "10000~10900",
        },
      ],
      minPay: 9850,
    },
    {
      store: "매장어플",
      distance: 0,
      jobs: ["달리기", "솟아오르기", "현피"],
      works: [
        {
          date: "2022년 7월 22일 금요일",
          jobs: "카운터",
          pay: "10000~10900",
        },
        {
          date: "2022년 7월 23일 토요일",
          jobs: "청소",
          pay: "10000~10900",
        },
        {
          date: "2022년 7월 24일 일요일",
          jobs: "설거지",
          pay: "10000~10900",
        },
      ],
      minPay: 200000,
    },
  ]);

  const nextPage = () => {
    navigate("/worker/reserveWork");
  };

  return (
    <div>
      {/* 상단 */}
      <div className=" m-8  flex items-center justify-between">
        <h1 className="text-2xl font-bold">인천 서구 심곡동</h1>
        <p className="text-sm font-normal text-slate-600 mt-2">
          내 주변 <span className="font-extrabold">400m</span>
        </p>
      </div>
      {/* 중반 */}
      <div className="mx-8">
        {stores.map((e) => {
          ref.current += 1;
          return (
            <StoreCard
              key={ref.current}
              mode={"NEAR"}
              store={e.store}
              distance={e.distance}
              jobs={e.jobs}
              minPay={e.minPay}
              works={e.works}
              onDateClickEvent={nextPage}
            />
          );
        })}
      </div>
    </div>
  );
};

export default WorkerNearWorkPage;
