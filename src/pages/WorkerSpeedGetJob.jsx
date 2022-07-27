import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import InputValue2 from "../components/InputValue2";
import NavBar from "../components/NavBar";
import Pachinco from "../components/Pachinco";

const setTimes = (start, end) => {
  const arr = [];
  if (start !== "" && start !== "") {
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
      <div className="mx-8">
        <InputValue2
          mode="SELECT"
          label={"알바유형"}
          title={"알바유형 선택"}
          setValue={setValue}
          dict_key={"type"}
          dict_value={recruitData["type"]}
          options={[
            "알바유형 선택",
            "음식점",
            "서빙",
            "청소",
            "음료제조",
            "문서작업",
            "번역",
            "질서유지",
            "경비",
            "주방보조",
            "운송",
            "판매",
            "이벤트",
            "편의점",
            "건성용역",
            "베이비시터",
            "술집",
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
          title={"바로알바 견적내기"}
          onClickEvent={() => setIsPopUp(!isPopUp)}
        />
      </div>
    </div>
  );
};

export default WorkerSpeedGetJob;

//    {
//     "worker_id": 1,
//     "work_date": "2022-08-20",
//     "start_times": [
//         "10:00",
//         "11:00",
//        ...
//         ]
// }
