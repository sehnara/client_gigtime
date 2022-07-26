import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import DanChoo from "../components/DanChoo";
import TabBar from "../components/TabBar";
import NavBar from "../components/NavBar";
import dogHeart from "../images/dog_heart.png";
import InterviewTimeTable from "./InWorkerMyPages/InterviewTimeTable";
import WinStores from "./InWorkerMyPages/WinStores";
import WorkTimeTable from "./InWorkerMyPages/WorkTimeTable";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

const data = [
  { time: 49, text: "바로알바로 일 한 시간" },
  { time: 3, text: "바로알바에서 합격한 매장 수" },
  { time: 8, text: "바로알바에서 면접 본 횟수" },
  { time: 237, text: "바로알바에서 수익(만 원)" },
  { time: 10, text: "바로알바 가입한지 (일)" },
];

const WorkMyPage = () => {
  const [result, setResult] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const workerId = sessionStorage.getItem("worker_id");
    axios
      .post("/worker/mypage/interview", {
        worker_id: workerId,
      })
      .then(function (res) {
        console.log(res.data);
        setResult(res.data["result"]);
        setName(res.data["name"]);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  const danchooRef = useRef(1);
  const [tab, setTab] = useState("알바시간표");

  const setMenu = (data: string) => {
    setTab(data);
  };

  return (
    <div className=" my-4">
      <button
        onClick={() => navigate("/worker/speed")}
        className="flex justify-center items-center  bg-cyan-500 text-3xl font-extrabold rounded-full w-16 h-16  text-white fixed bottom-0 right-0 m-4 "
      >
        <AiOutlinePlus />
      </button>
      <NavBar />
      {/* 상단 */}
      <div className="mx-8">
        <h1 className="text-lg font-bold mb-4">내 정보</h1>
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
          alt="핫도그"
          width={120}
          height={100}
          className="transform translate-x-3 translate-y-5"
        />
      </div>
      <div className="border-t-4"></div>
      {/* TAB BAR  */}
      <TabBar
        tab={tab}
        menu={["알바시간표", "면접시간표", "합격한 곳"]}
        setTab={setMenu}
      />
      {tab === "알바시간표" ? (
        <WorkTimeTable />
      ) : tab === "면접시간표" ? (
        <InterviewTimeTable result={result} />
      ) : (
        <WinStores />
      )}
      <button
        onClick={() => navigate("/chatlist")}
        className="bg-cyan-500 rounded-full w-16 h-16 font-bold text-white fixed bottom-0 right-0 m-4"
      >
        채팅
      </button>
    </div>
  );
};

export default WorkMyPage;
