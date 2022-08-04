import React, { useRef, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import magnifier from "../images/Magnifier.png";
import Button from "../components/Button";
import MapContainer from "../components/Map/MapContainer.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export type ANGEL_STATE = "NONE" | "POSTING" | "SEARCHING" | "RESULT";

const OwnerAngelPage = () => {
  const navigate = useNavigate();
  const [isAngel, setAngel] = useState<ANGEL_STATE>("POSTING");
  const [resultData, setResultData] = useState({
    date: "",
    start_time: "",
    end_time: "",
    hours: 0,
    price: 0,
    type: "",
    name: "",
    dist: 0,
    store_lat: 0,
    store_lng: 0,
    worker_lat: 0,
    worker_lng: 0,
  });
  const ownerId = sessionStorage.getItem("owner_id");
  const [selectedData, setSelectedData] = useState({
    type: "",
    startTime: "",
    endTime: "",
    price: "",
  });
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
  }); // [확인 눌렀을 때, POST 누르면 2]
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
  const angelId = sessionStorage.getItem("angel_id");
  // [RESULT 페이지, 사장님 결과 확인]
  const getAngel = async () => {
    await axios
      .post("/owner/angel/info", {
        angel_id: angelId,
      })
      .then((res) => {
        setResultData(res.data);
      });
  };

  const getData2 = async () => {
    await axios
      .post(`${process.env.REACT_APP_ROUTE_PATH}/owner/angel`, {
        owner_id: ownerId,
      })
      .then((res: any) => {
        setAngelData({ ...angelData, types: res.data.type });
      });
  };
  console.log(">>", resultData);
  useEffect(() => {
    getData2();
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

  console.log("resultData", resultData, resultData.start_time);
  return (
    <div className=" h-screen">
      {/* <Header title="알바천사" worker={false} /> */}
      {/* <NavBar mode="OWNER" isAngel={isAngel} /> */}
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
          ) : isAngel === "RESULT" ? (
            <div className="flex flex-col justify-center items-center">
              <p className="text-cyan-400 text-2xl font-bold my-8 ">
                매칭 완료
              </p>
              {/* 1.요청 직종 */}
              <div className="text-white w-screen px-16 mb-2">
                <div className="flex w-full ">
                  <p className="pr-4">직종 : </p>
                  <p>{resultData && resultData.type}</p>
                </div>
              </div>
              {/* 2. 요청 시간 */}
              <div className="text-white w-screen px-16 mb-2">
                <div className="flex w-full ">
                  <p className="pr-4">시간 : </p>
                  <p>
                    {Number(resultData.start_time.split(":")[0]) < 10
                      ? `0${resultData.start_time}`
                      : resultData.start_time}
                    ~
                    {resultData &&
                    Number(resultData.end_time.split(":")[0]) < 10
                      ? `0${resultData.end_time}`
                      : resultData.end_time}
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
                  <p className="pr-4">가족원과의 거리 : </p>
                  <p>{resultData && resultData.dist}m</p>
                </div>
              </div>
              <MapContainer
                owner={{ lat: resultData.store_lat, lng: resultData.store_lng }}
                worker={{
                  lat: resultData.worker_lat,
                  lng: resultData.worker_lng,
                }}
              />
              <Button
                title={"나가기"}
                onClickEvent={() => {
                  navigate("/owner/mypage");
                  sessionStorage.removeItem("angel_id");
                }}
                width={72}
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
                  className="w-full h-10 rounded-lg text-gray-600 my-2"
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
                  className="w-full h-10 rounded-lg text-gray-600 my-2"
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
                  className="w-full h-10 rounded-lg text-gray-600 my-2"
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
                  className={`w-full rounded-lg h-10 outline-gray-300 indent-2 my-2`}
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
                    navigate(-1);
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
    </div>
  );
};

export default OwnerAngelPage;
