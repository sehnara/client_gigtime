import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import { AiOutlineCalendar } from "react-icons/ai";
import SelectBox from "../components/SelectBox";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import NavBar from "../components/NavBar";

/* ~~~Z 형식의 String date를 인자로 넣으면 2022-08-11 형식의 String 반환 */
function masage_date(date_timestamp, mode) {
  let date = new Date(date_timestamp);
  let year = date.getFullYear().toString();
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();

  if (month.length === 1) month = "0" + month;

  if (day.length === 1) day = "0" + day;
  if (mode === "korean") {
    return year + "년 " + month + "월 " + day + "일";
  } else {
    return year + "-" + month + "-" + day;
  }
}

const WorkerReserveWorkPage = () => {
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const [workDates, setWorkDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState([]);
  const [storeData, setStoreData] = useState({});
  const worker_id = Number(sessionStorage.getItem("worker_id"));

  const getData = async () => {
    await axios
      .post(`${process.env.REACT_APP_ROUTE_PATH}/worker/reservation/list`, {
        worker_id: sessionStorage.getItem("worker_id"),
        order_id: state.order.id,
        work_date: masage_date(state.order.date),
        type: state.order.type,
      })
      .then((res) => {
        setWorkDates(res.data);
      });

    await axios
      .post(`${process.env.REACT_APP_ROUTE_PATH}/reserve/load_store`, {
        order_id: Number(state.order.id),
      })
      .then((res) => {
        setStoreData(res.data);
      });
  };

  const getWorkTime = (t) => {
    if (selectedDate.includes(Number(t))) {
      setSelectedDate([...selectedDate.filter((e) => e !== t)]);
    } else {
      setSelectedDate([...selectedDate, Number(t)]);
    }
  };

  const onReserve = async () => {
    await axios
      .post(`${process.env.REACT_APP_ROUTE_PATH}/worker/reservation/save`, {
        worker_id: worker_id,
        hourlyorder_id: selectedDate,
      })
      .then((res) => {});
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <NavBar mode="WORKER" />
      <Header title="알바예약" worker={true} />
      {/* 이미지 */}
      <div className="bg-gray-200 w-full h-48"></div>
      {/* 멘트 */}
      <p className="px-8 py-4">{storeData.description}</p>
      <div className="border-t-4 "></div>
      {/* 가게 기본 정보 : 가게명, 담당자, 연락처, 주소 */}
      <div className="mx-8 m-4 text-sm">
        <h3 className="font-bold mb-4 text-base">{storeData.name}</h3>
        <div className="flex items-center mb-3 text-gray-500">
          <p className="flex-1">담당자</p>
          <p className="flex-3">
            {storeData.owner_name}
            <span className="text-sm">님</span>
          </p>
        </div>
        <div className="flex items-center mb-3 text-gray-500">
          <p className="flex-1">연락처</p>
          <p className="flex-3">{storeData.owner_phone}</p>
        </div>
        <div className="flex items-center mb-3 text-gray-500">
          <p className="flex-1">주소</p>
          <p className="flex-3">{storeData.address}</p>
        </div>
      </div>
      <div className="border-t-4 "></div>
      {/* 알바예약 */}
      <div className="mx-8 m-4 ">
        <h3 className="font-bold mb-4">알바예약</h3>
        <p className="text-sm text-gray-500">
          1시간 단위로 알바 예약이 가능합니다.
        </p>
        <div className="flex items-center w-full my-4">
          <AiOutlineCalendar className="mr-2" />
          <p className="text-xs">{masage_date(state.order.date, "korean")}</p>
          {/* 직종 */}
          <p className="text-xs ml-6 bg-gray-200 px-2 py-1 rounded-2xl">
            {state.order.type}
          </p>
        </div>
        <SelectBox
          selectedDate={selectedDate}
          getData={getWorkTime}
          data={workDates}
          mode={"RESERVE"}
        />
      </div>
      <div className="border-t-4 "></div>
      {/* 예약정보*/}
      <div className="mx-8 m-4 ">
        <h3 className="font-bold mb-4">예약정보</h3>
        <div className="flex items-center mb-3 text-sm text-gray-500">
          <p className="flex-1">근무날짜</p>
          <p className="flex-3">{masage_date(state.order.date, "korean")}</p>
        </div>
        <div className="flex items-center mb-3 text-sm text-gray-500">
          <p className="flex-1">근무시간</p>
          <p className="flex-3">
            {selectedDate === [] ? 0 : selectedDate.length}시간
          </p>
        </div>
        <div className="flex items-center mb-3 text-sm text-gray-500">
          <p className="flex-1">임금</p>
          <p className="flex-3 text-base font-bold">
            {selectedDate === [] ? 0 : selectedDate.length * 10000}원
          </p>
        </div>
      </div>
      <div className="border-t-4 "></div>
      {/* 안내사항 */}
      <div className="mx-8 m-4">
        <h3 className="font-bold mb-4">안내사항</h3>
        {[
          "- 근로계약서 작성을 위해 신분증을 지참해주세요.",
          " - 알바 48시간 전까지 취소 가능",
          " - 무단 결근 시 서비스 규정에 따라 이용 제한",
        ].map((e) => {
          return (
            <p key={e} className="text-sm mb-2 text-gray-500">
              {e}
            </p>
          );
        })}
        <div className="h-3"></div>

        <Button
          title={"예약하기"}
          onClickEvent={async () => {
            await onReserve();
            navigate("/worker/nearWork");
          }}
        />
        <div className="h-24"></div>
      </div>
    </div>
  );
};

export default WorkerReserveWorkPage;
