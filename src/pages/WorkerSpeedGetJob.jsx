import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import InputValue2 from "../components/InputValue2";
import MapRoute from "../components/Map/MapRoute";
import NavBar from "../components/NavBar";
import Pachinco from "../components/Pachinco";

const setTimes = (start, end) => {
  const arr = [];
  if (start !== "" && end !== "") {
    for (
      let i = Number(start.split(":")[0]);
      i <= Number(end.split(":")[0]);
      i++
    ) {
      if (i < 10) {
        arr.push(`0${i}:00`);
      } else {
        arr.push(`${i}:00`);
      }
    }
  } else {
    return [];
  }
  return arr;
};

const WorkerSpeedGetJob = () => {
  const navigation = useNavigate();
  const [isPopUp, setIsPopUp] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [recruitData, setRecruitData] = useState({
    type: "",
    end_date: "",
    start_time: "",
    end_time: "",
    price: 0,
  });
  const [result, setResult] = useState({});

  const setValue = (_key, _value) => {
    setRecruitData({ ...recruitData, [_key]: _value });
  };

  const getDatas = async () => {
    await axios
      .post(`${process.env.REACT_APP_ROUTE_PATH}/worker/suggestion`, {
        worker_id: sessionStorage.getItem("worker_id"),
        work_date: recruitData.end_date,
        start_times: setTimes(recruitData.start_time, recruitData.end_time),
        type: recruitData.type,
        min_price: Number(recruitData.price),
      })
      .then((res) => {
        setResult(res.data);
      })
      .then(() => {
        setIsOpen(true);
      });
  };

  useEffect(() => {
    if (isPopUp) {
      getDatas();
    }
  }, [isPopUp]);

  return (
    <div>
      {isOpen && (
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex bg-black/[.8] absolute w-full h-full "
        >
          <Pachinco
            result={result}
            moneys={result.p_history}
            speed={80}
            visits={result.visit}
          />
        </div>
      )}
      <NavBar mode="WORKER" />
      <Header title="바로알바" worker={true} />
      <div className="p-8 bg-slate-200">
        <p className="text-xl">
          최적의 <span className="text-cyan-500 font-bold">알바 경로</span>를
        </p>
        <p className="text-xl">추천해드립니다.</p>
        <p className="bg-white text-sm mt-4 rounded-md p-4">
          추천 받을 날짜와 시간만 설정하면{" "}
          <span className="text-cyan-500">가장 높은 수익</span>이 기대되는 알바
          시간표를 추천해드립니다.
        </p>
      </div>
      <div className="mx-8 my-4">
        <InputValue2
          mode="SELECT"
          label={"알바유형"}
          title={"알바유형 선택"}
          setValue={setValue}
          dict_key={"type"}
          dict_value={recruitData["type"]}
          options={[
            "알바유형 선택",
            "설거지",
            "서빙",
            "청소",
            "음료제조",
            "전단지",
            "배달",
            "고객관리",
            "홍보",
            "주방보조",
            "포장",
            "판매",
            "심부름",
            "카운터",
            "계산",
            "재료관리",
            "매장관리",
          ]}
        />
        <InputValue2
          mode="DATE"
          label={"알바일시"}
          title={"알바일시 선택"}
          setValue={setValue}
          dict_key={"end_date"}
          dict_value={recruitData["start_date"]}
        />
        {/* 근무 시간 */}
        <InputValue2
          mode="TIME"
          label="근무시간"
          options={[
            "01:00",
            "02:00",
            "03:00",
            "04:00",
            "05:00",
            "06:00",
            "07:00",
            "08:00",
            "09:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
            "19:00",
            "20:00",
            "21:00",
            "22:00",
            "23:00",
          ]}
          options2={[
            "01:00",
            "02:00",
            "03:00",
            "04:00",
            "05:00",
            "06:00",
            "07:00",
            "08:00",
            "09:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
            "19:00",
            "20:00",
            "21:00",
            "22:00",
            "23:00",
          ]}
          setValue={setValue}
        />
        {/* 시급 설정 */}
        <InputValue2
          title="시급을 설정해주세요."
          label={"시급설정"}
          setValue={setValue}
          dict_key={"price"}
          dict_value={recruitData["price"]}
        />
        <Button
          title={`바로알바 견적내기`}
          onClickEvent={() => {
            setIsPopUp(!isPopUp);
          }}
        />
        <div className="pb-24 "></div>
      </div>
    </div>
  );
};

export default WorkerSpeedGetJob;
