import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import { AiOutlineCalendar } from "react-icons/ai";
import SelectBox from "../components/SelectBox";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import NavBar from "../components/NavBar";
import { FaRegUserCircle } from "react-icons/fa";
import { BsPhone } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
import { FaRegCommentDots } from "react-icons/fa";
import { BiTimeFive } from "react-icons/bi";
import { GiReceiveMoney } from "react-icons/gi";

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
  const [money, setMoney] = useState([]);
  const [sur, setSur] = useState(0);

  const worker_id = Number(sessionStorage.getItem("worker_id"));
  const order_id = Number(
    state.order.id || sessionStorage.getItem("reserve_id")
  );
  const work_date = state.order.date || sessionStorage.getItem("reserve_date");
  const type = state.order.type || sessionStorage.getItem("reserve_type");

  const getData = async () => {
    await axios
      .post(`${process.env.REACT_APP_ROUTE_PATH}/worker/reservation/list`, {
        worker_id: sessionStorage.getItem("worker_id"),
        order_id,
        work_date: masage_date(work_date),
        type,
      })
      .then((res) => {
        setWorkDates(res.data);
      });

    await axios
      .post(`${process.env.REACT_APP_ROUTE_PATH}/reserve/load_store`, {
        order_id,
      })
      .then((res) => {
        setStoreData(res.data);
      });
  };

  const getWorkTime = (t, e2) => {
    if (selectedDate.includes(Number(t))) {
      setMoney([...money.filter((e) => e !== e2)]);
      setSelectedDate([...selectedDate.filter((e) => e !== t)]);
    } else {
      setMoney([...money, e2]);
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
    return () => {
      sessionStorage.removeItem("reserve_id");
      sessionStorage.removeItem("reserve_date");
      sessionStorage.removeItem("reserve_type");
    };
  }, []);

  useEffect(() => {
    if (money.length === 0) {
      setSur(0);
    } else {
      setSur(money.map((i) => Number(i.min_price)).reduce((a, b) => a + b));
    }
  }, [money.length]);
  // console.log(">><", storeData);
  return (
    <div>
      <NavBar mode="WORKER" />
      <Header title="알바예약" worker={true} />
      {/* 이미지 */}
      <img
        className="bg-gray-200 w-full object-cover  h-64"
        src={
          storeData &&
          (storeData
            ? `${process.env.REACT_APP_S3_PATH}${storeData.background_image}`
            : `${process.env.REACT_APP_S3_PATH}background/default_bg.png`)
        }
      />
      {/* 멘트 */}

      {/* 가게 기본 정보 : 가게명, 담당자, 연락처, 주소 */}
      <div className="m-8 text-sm">
        <h3 className="font-bold mb-4 text-base text-xl">{storeData.name}</h3>
        <div className="flex items-center mb-3 text-gray-500">
          <FaRegUserCircle className="mr-4 text-lg" />
          <p className="flex-3 text-black">
            {storeData.owner_name}
            <span className="text-sm">님</span>
          </p>
        </div>
        <div className="flex items-center mb-3 text-gray-500">
          <FiMapPin className="mr-4 text-lg" />
          <p className="flex-3  text-black">{storeData.address}</p>
        </div>
        <div className="flex items-center mb-3 text-gray-500">
          <FaRegCommentDots className="mr-4 text-lg" />
          <p className="text-sm  text-black">{storeData.description}</p>
        </div>
      </div>
      <div className="border-t-4 "></div>
      {/* 알바예약 */}
      <div className="m-8 ">
        <h3 className="font-bold mb-4">예약 선택</h3>

        <div className="flex items-center w-full my-4">
          <AiOutlineCalendar className="mr-2 text-lg text-gray-500" />
          <p className="text-sm">{masage_date(work_date, "korean")}</p>
          {/* 직종 */}
          <p className="text-xs ml-2 bg-cyan-500 px-2 py-1 rounded-2xl text-white">
            {type}
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
      <div className="m-8 ">
        <h3 className="font-bold mb-4">예약 정보</h3>
        <div className="flex items-center mb-3 text-sm text-gray-500">
          <AiOutlineCalendar className="mr-4 text-lg text-gray-500" />
          <p className="flex-3">{masage_date(work_date, "korean")}</p>
        </div>
        <div className="flex items-center mb-2 text-sm text-gray-500">
          <BiTimeFive className="mr-4 text-lg text-gray-500" />
          <p className="flex-3">
            {selectedDate === [] ? 0 : selectedDate.length}시간
          </p>
        </div>
        <div className="flex items-center mb-3 text-sm text-gray-500">
          <GiReceiveMoney className="mr-4 text-lg text-gray-500" />
          <p className="flex-3 font-bold">
            <span className="text-xl text-red-400">
              {selectedDate === [] ? 0 : sur}
            </span>
            원
          </p>
        </div>
      </div>
      <div className="border-t-4 "></div>
      {/* 안내사항 */}
      <div className="m-8">
        <h3 className="font-bold mb-4">안내사항</h3>
        {[
          "- 근로계약서 작성을 위해 신분증을 지참해주세요.",
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
            navigate("/worker/myPage");
          }}
        />
        <div className="h-24"></div>
      </div>
    </div>
  );
};

export default WorkerReserveWorkPage;
