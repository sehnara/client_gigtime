import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import DanChoo from "../components/DanChoo";
import Header from "../components/Header";
import TabBar from "../components/TabBar";
import dogHeart from "../images/dog_heart.png";
import OwnerInterviewTimeTable from "./InOwnerMypages/OwnerInterviewTimeTable";
import MyGigWorker from "./InOwnerMypages/MyGigWorker";
import RecruitTable from "./InOwnerMypages/RecruitTable";
import magnifier from "../images/Magnifier.png";
import NavBar from "../components/NavBar";
import Button from "../components/Button";

const data = [
  { time: 49, text: "긱타임에서 모집공고 낸 횟수" },
  { time: 3, text: "긱타임에서 면접 본 횟수" },
  { time: 8, text: "내 매장의 긱워커는 몇 명?" },
  { time: 237, text: "월 평균 알바비 (만 원)" },
  { time: 10, text: "도움 받은 시간 (긱 SOS)" },
];

export type ANGEL_STATE = "NONE" | "POSTING" | "SEARCHING";

const WorkMyPage = () => {
  // STATE -------------------------------------
  const [storename, setStorename] = useState("");
  const [name, setName] = useState("");
  const [tab, setTab] = useState("면접관리");
  const [isAngel, setAngel] = useState<ANGEL_STATE>("NONE");
  const danchooRef = useRef(1);

  // [바로알바 인풋값]
  const [angelData, setAngelData] = useState({
    types: ["설거지", "유유", "경경"],
    startTimes: ["01:00", "02:00", "03:00"],
    endTimes: ["01:00", "02:00", "03:00"],
    price: "",
  });

  const [selectedData, setSelectedData] = useState({
    type: "",
    startTime: "",
    endTime: "",
    price: "",
  });

  // [처음 데이터 받아올 때,]
  // useEffect(() => {
  //   axios.post("http://localhost:4000/", {
  //     owner_id: sessionStorage.getItem("owner_id"),
  //   });
  // }, []);

  // [확인 눌렀을 때, POST 누르면]
  const postAngel = () => {};

  // FUNCTION ----------------------------------
  const setMenu = (data: string) => {
    setTab(data);
  };

  useEffect(() => {
    const ownerId = sessionStorage.getItem("owner_id");
    axios
      .post("http://localhost:4000/owner/mypage", {
        owner_id: ownerId,
      })
      .then(function (res) {
        setStorename(res.data["store"]);
        setName(res.data["name"]);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);
  // COMPONENT ----------------------------------
  return (
    <>
      {/* 바로알바 팝업 페이지 */}
      {(isAngel === "POSTING" || isAngel === "SEARCHING") && (
        <div className="absolute bg-black/[.9] z-10  w-full h-full flex flex-col justify-center items-center">
          <h1 className="text-white text-5xl font-bold mb-2">알바 천사</h1>

          {isAngel === "SEARCHING" ? (
            <>
              <img
                src={magnifier}
                className="w-48 h-48 mb-4 mt-8 animate-ping"
              />
              <img src={magnifier} className="w-64 h-64 mb-4 absolute mt-2" />
              <div className="text-white text-sm animate-pulse mt-8">
                가게와 가까운 알바생부터 매칭 중
              </div>
            </>
          ) : (
            <>
              <img src={magnifier} className="w-52 h-52 mb-4 " />
              <div>
                <p className="text-white text-sm">
                  - <span className="text-cyan-400 font-bold">오늘 하루</span>{" "}
                  내에 알바 구인 가능
                </p>
                <p className="text-white text-sm">
                  - 현재 시간 기준{" "}
                  <span className="text-cyan-400 font-bold">1시간 이후</span>
                  부터 구인 가능
                </p>
              </div>
              <div className="mx-8 mt-8">
                {/* 알바유형 */}
                <label className="text-sm font-bold text-white mb-4">
                  알바유형
                </label>
                <select
                  name="알바유형 선택"
                  id="input"
                  className="w-full h-10 rounded-lg text-gray-600 mb-2"
                  onChange={(e) => {
                    setSelectedData({
                      ...selectedData,
                      type: e.target.value,
                    });
                  }}
                >
                  {angelData &&
                    angelData.types.map((i, index) => {
                      return (
                        <option key={index} value={i}>
                          {i}
                        </option>
                      );
                    })}
                </select>
                {/* 시작시간 */}
                <label className="text-sm font-bold text-white mb-4">
                  시작 시간
                </label>
                <select
                  name="알바유형 선택"
                  id="input"
                  className="w-full h-10 rounded-lg text-gray-600 mb-2"
                  onChange={(e) => {
                    setSelectedData({
                      ...selectedData,
                      startTime: e.target.value,
                    });
                  }}
                >
                  {angelData &&
                    angelData.startTimes.map((i, index) => {
                      return (
                        <option key={index} value={i}>
                          {i}
                        </option>
                      );
                    })}
                </select>
                {/* 끝 시간 */}
                <label className="text-sm font-bold text-white mb-4">
                  끝 시간
                </label>
                <select
                  name="알바유형 선택"
                  id="input"
                  className="w-full h-10 rounded-lg text-gray-600 mb-2"
                  onChange={(e) => {
                    setSelectedData({
                      ...selectedData,
                      endTime: e.target.value,
                    });
                  }}
                >
                  {angelData &&
                    angelData.endTimes.map((i, index) => {
                      return (
                        <option key={index} value={i}>
                          {i}
                        </option>
                      );
                    })}
                </select>
                {/* 시급 */}
                <label className="text-sm font-bold text-white mb-4">
                  시급
                </label>
                <input
                  id="input"
                  className={`w-full rounded-lg h-10 outline-gray-300 indent-2 mb-2`}
                  value={selectedData.price}
                  onChange={(e) =>
                    setSelectedData({
                      ...selectedData,
                      price: e.target.value,
                    })
                  }
                  placeholder={"시급을 입력해주세요"}
                />
              </div>
              <div className="flex w-full px-9 space-x-2 mt-4">
                <button
                  onClick={() => {
                    setSelectedData({
                      type: "",
                      startTime: "",
                      endTime: "",
                      price: "",
                    });
                    setAngel("NONE");
                  }}
                  className="text-white bg-gray-500 p-3 font-bold  rounded-lg flex-1"
                >
                  취소
                </button>
                <button
                  onClick={() => {
                    setAngel("SEARCHING");
                  }}
                  className="text-white bg-cyan-500 p-3 font-bold  rounded-lg flex-1"
                >
                  확인
                </button>
              </div>
            </>
          )}
        </div>
      )}
      {/* 알바 천사 끝 ============================================================================================== */}
      <NavBar mode="OWNER" angelUseState={setAngel} isAngel={isAngel} />
      <Header title="마이 페이지" />
      <div className=" my-4">
        {/* 상단 */}
        <div className="mx-8">
          <h1 className="text-lg font-bold mb-4">{storename}</h1>
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
            className="transform translate-x-3 translate-y-5 "
          />
        </div>
        <div className="border-t-4"></div>
        {/* TAB BAR  */}
        <TabBar
          tab={tab}
          menu={["모집내역", "면접관리", "나의 알바생"]}
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
