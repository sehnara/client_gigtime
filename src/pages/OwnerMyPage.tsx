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
import MapContainer from "../components/Map/MapMarkers";

const data = [
  { time: 49, text: "긱타임에서 모집공고 낸 횟수" },
  { time: 3, text: "긱타임에서 면접 본 횟수" },
  { time: 8, text: "내 매장의 긱워커는 몇 명?" },
  { time: 237, text: "월 평균 알바비 (만 원)" },
  { time: 10, text: "도움 받은 시간 (긱 SOS)" },
];

export type ANGEL_STATE = "NONE" | "POSTING" | "SEARCHING" | "RESULT";

const WorkMyPage = () => {
  // STATE -------------------------------------
  const [storename, setStorename] = useState("");
  const [name, setName] = useState("");
  const [tab, setTab] = useState("면접관리");
  const [isAngel, setAngel] = useState<ANGEL_STATE>("NONE");
  const [resultData, setResultData] = useState({
    date: "",
    start_time: "",
    end_time: "",
    hours: 0,
    price: 0,
    type: "",
    name: "",
    dist: 0,
  });
  const danchooRef = useRef(1);
  const angelId = sessionStorage.getItem("angel_id");

  // [바로알바 인풋값]
  const times = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ].map((i) => new Date(Date.now() + 3600000 * (i + 9)).toISOString());

  const [angelData, setAngelData] = useState({
    types: [],
    startTimes: times,
    endTimes: times,
    price: "",
  });

  const [selectedData, setSelectedData] = useState({
    type: "",
    startTime: "",
    endTime: "",
    price: "",
  });

  const getData = async () => {
    const ownerId = sessionStorage.getItem("owner_id");
    await axios
      .post(`${process.env.REACT_APP_ROUTE_PATH}/owner/mypage`, {
        owner_id: ownerId,
      })
      .then(function (res: any) {
        setStorename(res.data["store"]);
        setName(res.data["name"]);
      })
      .catch(function (err: any) {
        console.log(err);
      });
    await axios
      .get(`${process.env.REACT_APP_ROUTE_PATH}/owner/angel`, {
        params: {
          owner_id: sessionStorage.getItem("owner_id"),
        },
      })
      .then((res: any) => {
        setAngelData({ ...angelData, types: res.data.type });
      });
  };

  // [처음 데이터 받아올 때, 1]
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("angel_id")) {
      getAngel();
      setAngel("RESULT");
    }
    return () => {
      sessionStorage.removeItem("angel_id");
    };
  }, [sessionStorage.getItem("angel_id")]);

  // [확인 눌렀을 때, POST 누르면 2]
  const postAngel = async () => {
    await axios
      .post(`${process.env.REACT_APP_ROUTE_PATH}/owner/angel/call`, {
        owner_id: sessionStorage.getItem("owner_id"),
        type: selectedData.type,
        start_time: selectedData.startTime,
        end_time: selectedData.endTime,
        price: selectedData.price,
      })
      .then((res: any) => {
        if (res.data === "success") {
          setAngel("SEARCHING");
        } else {
          alert(
            "알바천사 서비스 사용에 어려움이 있습니다. 잠시후 다시 시도해주세요."
          );
        }
      });
  };

  // [RESULT 페이지, 사장님 결과 확인]
  const getAngel = async () => {
    await axios
      .get("/owner/angel/info", {
        params: {
          angel_id: sessionStorage.getItem("angel_id"),
        },
      })
      .then((res) => {
        console.log("사장님 결과 확인 : ", res.data);
        setResultData(res.data);
      });
  };

  // FUNCTION ----------------------------------
  const setMenu = (data: string) => {
    setTab(data);
  };
  // COMPONENT ----------------------------------
  return (
    <div className="h-screen overflow-scroll">
      {/* 바로알바 팝업 페이지 */}
      {(isAngel === "POSTING" ||
        isAngel === "SEARCHING" ||
        isAngel === "RESULT") && (
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
          ) : isAngel === "POSTING" ? (
            <div className="flex flex-col justify-center items-center">
              <p className="text-cyan-400 text-2xl font-bold my-8 ">
                매칭 완료
              </p>
              {/* 1.요청 직종 */}
              <div className="text-white w-screen px-16 mb-2">
                <div className="flex w-full ">
                  <p className="pr-4">요청 직종 : </p>
                  <p>{resultData && resultData.type}</p>
                </div>
              </div>
              {/* 2. 요청 시간 */}
              <div className="text-white w-screen px-16 mb-2">
                <div className="flex w-full ">
                  <p className="pr-4">요청 시간 : </p>
                  <p>
                    {resultData && resultData.start_time}~
                    {resultData && resultData.end_time}
                  </p>
                </div>
              </div>
              {/* 3. 요청 시급 */}
              <div className="text-white w-screen px-16 mb-2">
                <div className="flex w-full ">
                  <p className="pr-4">시급 : </p>
                  <p>{resultData && resultData.price}원</p>
                </div>
              </div>
              <div className="border m-4 w-2/3 text-center"></div>
              {/* 4. 매칭 인물 */}
              <div className="text-white w-screen px-16 mb-2">
                <div className="flex w-full ">
                  <p className="pr-4">매칭된 가족원 : </p>
                  <p>{resultData && resultData.name}님</p>
                </div>
              </div>
              {/* 5. 매칭 거리 */}
              <div className="text-white w-screen px-16 mb-2">
                <div className="flex w-full ">
                  <p className="pr-4">가게와의 거리 : </p>
                  <p>{resultData && resultData.dist}m</p>
                </div>
              </div>
              <MapContainer
                owner={{ lat: 37.23451, lng: 126.8 }}
                worker={{ lat: 37.23451, lng: 126.7 }}
              />
              <Button
                title={"나가기"}
                onClickEvent={() => {
                  setAngel("NONE");
                  sessionStorage.removeItem("angel_id");
                }}
                width={64}
              />
            </div>
          ) : (
            <>
              <img src={magnifier} className="w-52 h-52 mb-4 " />
              <div>
                <p className="text-white text-sm">
                  - <span className="text-cyan-500 font-bold">오늘 하루</span>
                  내에 알바 구인 가능
                </p>
                <p className="text-white text-sm">
                  - 현재 시간 기준{" "}
                  <span className="text-cyan-500 font-bold">1시간 이후</span>
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
                  {angelData.types !== [] &&
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
                          {i.split("T")[0] +
                            "  " +
                            i.split("T")[1].split(":")[0] +
                            ":00"}
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
                          {i.split("T")[0] +
                            "  " +
                            i.split("T")[1].split(":")[0] +
                            ":00"}
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
                    postAngel();
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
      <Header title="마이 페이지" worker={false} />
      <div className=" my-4">
        {/* 상단 */}
        <div className="mx-8 flex justify-between items-end">
          <h1 className="text-xl font-bold mb-4 ">{storename}</h1>
          {/* 상단 - 이름, 단추들, 강아지 한 마리*/}
          <h1 className="mb-4">
            <span className="font-bold text-cyan-600">{name}</span>님
          </h1>
        </div>
        {/* <div className="flex flex-wrap justify-center mb-4">
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
        </div> */}
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
    </div>
  );
};

export default WorkMyPage;
