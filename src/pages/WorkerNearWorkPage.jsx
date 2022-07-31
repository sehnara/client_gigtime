import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StoreCard from "../components/StoreCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setCurrentDate,
  setCurrentOrder,
  setCurrentType,
} from "../module/slices/order";
import Empty from "../components/Empty";
import NavBar from "../components/NavBar";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useCallback } from "react";
import Header from "../components/Header";

const WorkerNearWorkPage = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [stores, setStores] = useState([]);
  const [loc, setLoc] = useState("");
  const [range, setRange] = useState("");
  const [cursor, setCursor] = useState(0);
  const [notFound, setIsNotFound] = useState(false);

  const getData = async () => {
    await axios
      .post(`${process.env.REACT_APP_ROUTE_PATH}/worker/show/hourly_orders`, {
        worker_id: sessionStorage.getItem("worker_id"),
        cursor: "null",
      })
      .then((res) => {
        if (res.data === "notFound") {
          setIsNotFound(true);
        } else {
          // 데이터 파싱
          const obj = res.data[res.data.length - 1].work_date_and_type_and_id;
          const temp = Object.keys(obj);
          const key = temp[temp.length - 1];
          const temp2 = obj[key].start_time_and_id;
          const testCursor = temp2[temp2.length - 1];

          setCursor(testCursor[testCursor.length - 1]);
          setStores(res.data);
        }
      });
  };

  useEffect(() => {
    getData();
    axios
      .post(`${process.env.REACT_APP_ROUTE_PATH}/worker/addr/range`, {
        worker_id: sessionStorage.getItem("worker_id"),
      })
      .then((res) => {
        setLoc(res.data[0].location);
        setRange(res.data[0].range);
      });
  }, []);

  const _infiniteScroll = useCallback(() => {
    let scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    let scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    let clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight === scrollHeight) {
      axios
        .post(`${process.env.REACT_APP_ROUTE_PATH}/worker/show/hourly_orders`, {
          worker_id: sessionStorage.getItem("worker_id"),
          cursor: cursor,
        })
        .then((res) => {
          const obj = res.data[res.data.length - 1].work_date_and_type_and_id;
          const temp = Object.keys(obj);
          const key = temp[temp.length - 1];
          const temp2 = obj[key].start_time_and_id;
          const testCursor = temp2[temp2.length - 1];
          setCursor(testCursor[testCursor.length - 1]);
          setStores((list) => [...list, ...res.data]);
        });
    }
  }, [stores]);

  useEffect(() => {
    window.addEventListener("scroll", _infiniteScroll, true);
    return () => window.removeEventListener("scroll", _infiniteScroll, true);
  }, [_infiniteScroll]);

  const ref = useRef(1);
  const navigate = useNavigate();
  const nextPage = (data) => {
    dispatch(setCurrentOrder(data.id));
    sessionStorage.setItem("reserve_id", data.id);
    dispatch(setCurrentDate(data.date));
    sessionStorage.setItem("reserve_date", data.date);
    dispatch(setCurrentType(data.type));
    sessionStorage.setItem("reserve_type", data.type);
    navigate("/worker/reserveWork");
  };

  return (
    <div className="bg-yellow-400 h-screen">
      <Header title="마이 홈" worker={true} />
      <NavBar mode={"WORKER"} />
      {/* 상단 */}
      <div className="bg-white">
        <div className=" mx-4 py-4 ">
          <h1 className="text-xl font-bold flex">
            <HiOutlineLocationMarker className="text-7xl mr-3 text-red-400 font-bold animate-bounce" />
            {loc}
          </h1>
          <p className="text-right p-2 py-1 rounded-lg font-bold">
            내 주변
            <span className="font-bold text-cyan-500 text-4xl "> {range}</span>m
          </p>
        </div>
      </div>
      {/* 중반 */}

      <div className={`bg-yellow-400 pt-4 h-full pb-24`}>
        <div className="mx-8 ">
          {notFound ? (
            <div className=" text-center font-bold pt-64">
              <p className="animate-pulse text-lg">등록된 가게가 없습니다.</p>
            </div>
          ) : stores && stores.length !== 0 ? (
            stores.map((e) => {
              ref.current += 1;
              // console.log(e);
              return (
                <StoreCard
                  key={ref.current}
                  mode={"NEAR"}
                  store={e.name}
                  distance={e.distance}
                  jobs={["서빙"]}
                  storeImage={`${process.env.REACT_APP_S3_PATH}${e.background_image}`}
                  minPay={e.minimum_wage}
                  works={e.key}
                  onDateClickEvent={nextPage}
                />
              );
            })
          ) : (
            <Empty text={"일자리를 불러오는 중입니다."} margin={4} />
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkerNearWorkPage;
