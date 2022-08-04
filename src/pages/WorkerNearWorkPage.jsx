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
          setCursor(res.data[res.data.length - 1].store_id);
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

    if (scrollTop + clientHeight + 130 >= scrollHeight) {
      // console.log(cursor)
      axios
        .post(`${process.env.REACT_APP_ROUTE_PATH}/worker/show/hourly_orders`, {
          worker_id: sessionStorage.getItem("worker_id"),
          cursor: cursor,
        })
        .then((res) => {
          // 데이터 파싱
          setCursor(res.data[res.data.length - 1].store_id);
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
    <div
      className={`bg-yellow-400 ${
        stores.length === 0 || stores.length === 1 || stores.length === 2
          ? "h-screen"
          : "h-full"
      }`}
    >
      <Header title="알바 신청" worker={true} />
      <NavBar mode={"WORKER"} />
      {/* 상단 */}
      <div className="bg-slate-100">
        <div className=" p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold flex ">
            {loc.split(" ").slice(0, 3).join(" ")}
          </h1>
          <p className="rounded-lg font-bold text-xl flex items-center">
            <p className="text-xs text-gray-500 pr-1 pt-2 ">내 주변</p>
            <span className="font-bold text-red-400 text-2xl "> {range}</span>m
          </p>
        </div>
      </div>
      {/* 중반 */}

      <div className={`bg-yellow-400 pt-4 h-full pb-24`}>
        <div className="mx-8 my-4">
          {notFound ? (
            <div className=" text-center font-bold pt-64">
              <p className="animate-pulse text-lg">등록된 가게가 없습니다.</p>
            </div>
          ) : stores && stores.length !== 0 ? (
            stores.map((e) => {
              ref.current += 1;
              console.log(e);
              return (
                <StoreCard
                  key={ref.current}
                  mode={"NEAR"}
                  store={e.name}
                  distance={e.distance}
                  jobs={[]}
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
