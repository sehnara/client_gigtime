import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Button from "../../../../components/Buttons/Normal/view";
import Header from "../../../../components/Header/view";
import NavBar from "../../../../components/Navbar/view";
import InputText from "../../../../components/Forms/Text/view";
import InputSelect from "../../../../components/Forms/Select/view";
import InputDate from "../../../../components/Forms/Date/view";
import WorkerRecommendProcess from "../Process/view";

import { workTime } from "../../../../utils/time";
import { jobs } from "../../../../utils/jobs";

// const setTimes = (start, end) => {
//   const arr = [];
//   if (start !== "" && end !== "") {
//     for (
//       let i = Number(start.split(":")[0]);
//       i <= Number(end.split(":")[0]);
//       i++
//     ) {
//       if (i < 10) {
//         arr.push(`0${i}:00`);
//       } else {
//         arr.push(`${i}:00`);
//       }
//     }
//   } else {
//     return [];
//   }
//   return arr;
// };

const WorkerRecommend = () => {
  const navigation = useNavigate();
  const [estimate, setEstimate] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [recruitData, setRecruitData] = useState({
    type: "",
    end_date: "",
    start_time: "",
    end_time: "",
    price: 0,
  });
  const [result, setResult] = useState({});

  const setValue = (_key:string, _value:string) => {
    setRecruitData({ ...recruitData, [_key]: _value });
  };

//   const getDatas = async () => {
//     await axios
//       .post(`${process.env.REACT_APP_ROUTE_PATH}/worker/suggestion`, {
//         worker_id: sessionStorage.getItem("worker_id"),
//         work_date: recruitData.end_date,
//         start_times: setTimes(recruitData.start_time, recruitData.end_time),
//         type: recruitData.type,
//         min_price: Number(recruitData.price),
//       })
//       .then((res) => {
//         setResult(res.data);
//       })
//       .then(() => {
//         setIsOpen(true);
//       });
//   };

  return (
    <div>
      {estimate && (
        <div
          onClick={() => setEstimate(!estimate)}
          className="flex bg-black/[.8] absolute w-full h-full "
        >
          <WorkerRecommendProcess
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            result={result}
            moneys={[1,2,3]}
            speed={80}
            visits={[1,2,3]}
          />
        </div>
      )}

      <NavBar mode="WORKER" />
      <Header title="바로알바"/>
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
        <InputSelect
            label="알바 유형"
            _key="category"
            _value=""
            setValue={setValue}
            options={jobs}
        />

        <InputDate
            label="알바 일자"
            setValue={setValue}
            _key="date"
        />

        <InputSelect
            label="시작 시간"
            _key="startTime"
            _value=""
            setValue={setValue}
            options={workTime}
        />

        <InputSelect
            label="퇴근 시간"
            _key="endTime"
            _value=""
            setValue={setValue}
            options={workTime}
        />
        
        <InputText
          label={"시급"}
          setValue={setValue}
          _key={"price"}
          _value={recruitData["price"]}
        />

        <Button
          title={'견적내기'}
          onClickEvent={() => {
            setEstimate(!estimate);
          }}
        />
        <div className="pb-24 "></div>
      </div>
    </div>
  );
};

export default WorkerRecommend;
