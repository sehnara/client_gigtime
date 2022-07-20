import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import InputValue2 from "../components/InputValue2";
import Pachinco from "../components/Pachinco";
const mockData = [
  138300, 138750, 138900, 140100, 141150, 141850, 143200, 144250, 144950,
  146300, 147350, 148050, 149400, 150450, 151150, 151600, 152500, 153550,
  154250, 154300, 154700, 155600, 156650, 157350, 157400, 157800, 158100,
  158900, 159600, 159700, 160100, 160500, 160600, 161100, 161800, 162300,
  162400, 162800, 163200, 163400, 164100, 164600, 165100, 165200, 165600,
  166000, 166200, 166700, 167200, 167700, 168200, 168300, 168700, 169100,
  169300, 169550, 171350, 172050, 172550, 173050, 173550, 174050, 174200,
  174550,
];

const mockVisit = [
  { id: 13761, time: "10:00", store: "범표원두 역삼점" },
  { id: 13762, time: "11:00", store: "범표원두 역삼점" },
  { id: 13763, time: "12:00", store: "범표원두 역삼점" },
  { id: 13764, time: "13:00", store: "범표원두 역삼점" },
  { id: 13765, time: "14:00", store: "범표원두 역삼점" },
  { id: 2444, time: "15:00", store: "쏭타이 역삼점" },
  { id: 2445, time: "16:00", store: "쏭타이 역삼점" },
  { id: 2446, time: "17:00", store: "쏭타이 역삼점" },
  { id: 2447, time: "18:00", store: "쏭타이 역삼점" },
  { id: 2448, time: "19:00", store: "쏭타이 역삼점" },
  { id: 2449, time: "20:00", store: "쏭타이 역삼점" },
  { id: 2450, time: "21:00", store: "쏭타이 역삼점" },
  { id: 13773, time: "22:00", store: "범표원두 역삼점" },
];

const setTimes = (start, end) => {
  const arr = [];
  if (start !== "" && start !== "") {
    for (
      let i = Number(start.split(":")[0]);
      i <= Number(end.split(":")[0]);
      i++
    ) {
      arr.push(`0${i}:00`);
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
      .post("http://localhost:4000/worker/suggestion", {
        worker_id: 1, //sessionStorage.getItem("worker_id"),
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

  console.log("(((((((((((", result);

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
      <Header title="바로알바" />
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
