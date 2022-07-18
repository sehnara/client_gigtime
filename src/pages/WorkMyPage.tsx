import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import DanChoo from "../components/DanChoo";
import TabBar from "../components/TabBar";
import NavBar from "../components/NavBar";
import dogHeart from "../images/dog_heart.png";
import InterviewTimeTable from "./InWorkerMyPages/InterviewTimeTable";
import WinStores from "./InWorkerMyPages/WinStores";
import WorkTimeTable from "./InWorkerMyPages/WorkTimeTable";

const WorkMyPage = () => {
  const [result, setResult] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    const workerId = sessionStorage.getItem("worker_id");
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
  const [tab, setTab] = useState("면접시간표");

  const setMenu = (data: string) => {
    setTab(data);
  };

  const data = [
    { time: 49, text: "긱타임으로 일 한 시간" },
    { time: 3, text: "긱타임에서 합격한 매장 수" },
    { time: 8, text: "긱타임에서 면접 본 횟수" },
    { time: 237, text: "긱타임에서 번 돈(만 원)" },
    { time: 10, text: "어려운 사장님 도와준 시간" },
  ];
  return (
    <div className=" my-4">
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
        menu={["면접시간표", "알바시간표", "합격한 곳"]}
        setTab={setMenu}
      />
      {tab === "면접시간표" ? (
        <InterviewTimeTable 
        result={result}
      //   result={[
      //     {
      //         date: '11-11',
      //         time: '11:11',
      //         link: '11:11',
      //         state: '1',
      //         storeName: 'ㄴㄴㄴㄴㄴㄴㄴ',
      //         storeAdd: 'ㅇㅇㅇㅇㅇㅇ',
      //         storeType: '햐김',
      //         interviewId: 23,
      //     },
      // ]}
        />
      ) : tab === "알바시간표" ? (
        <WorkTimeTable />
      ) : (
        <WinStores />
      )}
    </div>
  );
};

export default WorkMyPage;
