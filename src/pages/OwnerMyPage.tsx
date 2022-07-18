import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import DanChoo from "../components/DanChoo";
import Header from "../components/Header";
import TabBar from "../components/TabBar";
import dogHeart from "../images/dog_heart.png";
import OwnerInterviewTimeTable from "./InOwnerMypages/OwnerInterviewTimeTable";
import MyGigWorker from "./InOwnerMypages/MyGigWorker";
import RecruitTable from "./InOwnerMypages/RecruitTable";

const WorkMyPage = () => {
  const [result, setResult] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    const workerId = localStorage.getItem("worker_id");
    axios
      .post("http://localhost:4000/mypage/interview", {
        worker_id: workerId,
      })
      .then(function (res) {
        console.log(res);
        setResult(res.data["result"]);
        setName(res.data["name"]);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  const danchooRef = useRef(1);
  const [tab, setTab] = useState("면접관리");

  const setMenu = (data: string) => {
    setTab(data);
  };

  const data = [
    { time: 49, text: "긱타임에서 모집공고 낸 횟수" },
    { time: 3, text: "긱타임에서 면접 본 횟수" },
    { time: 8, text: "내 매장의 긱워커는 몇 명?" },
    { time: 237, text: "월 평균 알바비 (만 원)" },
    { time: 10, text: "도움 받은 시간 (긱 SOS)" },
  ];
  return (
    <>
      <Header title="마이 페이지" />
      <div className=" my-4">
        {/* 상단 */}
        <div className="mx-8">
          <h1 className="text-lg font-bold mb-4">가게이름</h1>
          {/* 상단 - 이름, 단추들, 강아지 한 마리*/}
          <h1 className="mb-4">
            <span className="font-bold">{name}</span>님
          </h1>
        </div>
        <div className="flex flex-wrap justify-center mb-4">
          {data.map((e) => {
            danchooRef.current += 1;
            return (
              <DanChoo time={e.time} text={e.text} key={danchooRef.current} />
            );
          })}
          <img
            src={dogHeart}
            alt="도그"
            width={120}
            height={100}
            className="transform translate-x-3 translate-y-5"
          />
        </div>
        <div className="border-t-4"></div>
        {/* TAB BAR  */}
        <TabBar
          tab={tab}
          menu={["모집내역", "면접관리", "나의 긱워커"]}
          setTab={setMenu}
        />
        {tab === "면접관리" ? (
          <OwnerInterviewTimeTable />
        ) : tab === "모집내역" ? (
          <RecruitTable />
        ) : (
          <MyGigWorker />
        )}
      </div>
    </>
  );
};

export default WorkMyPage;
