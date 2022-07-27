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
import { AiOutlinePlus } from "react-icons/ai";
import { useCallback } from "react";
import Header from "../components/Header";

const WorkerNearWorkPage = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [stores, setStores] = useState([]);
  const [loc, setLoc] = useState("");
  const [range, setRange] = useState("");
  const [itemIndex, setItemIndex] = useState(0);
  const [items, setItems] = useState(4);
  const [result, setResult] = useState([]);

  const getData = async () => {
    await axios
      .post(`${process.env.REACT_APP_ROUTE_PATH}/worker/show/hourly_orders`, {
        worker_id: sessionStorage.getItem("worker_id"),
      })
      .then((res) => {
        setStores(res.data);
        setResult(res.data.slice(itemIndex, items));
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
      setItemIndex(itemIndex + 4);
      setResult(result.concat(stores.slice(itemIndex + 4, itemIndex + 8)));
    }
  }, [itemIndex, result]);

  useEffect(() => {
    window.addEventListener("scroll", _infiniteScroll, true);
    return () => window.removeEventListener("scroll", _infiniteScroll, true);
  }, [_infiniteScroll]);

  const ref = useRef(1);
  const navigate = useNavigate();
  const nextPage = (data) => {
    dispatch(setCurrentOrder(data.id));
    dispatch(setCurrentDate(data.date));
    dispatch(setCurrentType(data.type));
    navigate("/worker/reserveWork");
  };

  return (
    <div className="h-screen">
      <Header title="알바예약" worker={true} />
      <NavBar mode={"WORKER"} />
      {/* 상단 */}
      <div className=" m-8  flex items-center justify-between ">
        <h1 className="text-xl font-bold w-2/3  overflow-hidden h-16">{loc}</h1>
        <p className="text-xs font-normal text-gray-500 border-2 p-2 py-1 rounded-lg">
          내 주변
          <span className="font-bold text-cyan-500 text-lg"> {range}</span>m
        </p>
      </div>
      {/* 중반 */}
      <div className="bg-yellow-400 pt-4 h-full">
        <div className="mx-8 ">
          {result && result.length !== 0 ? (
            result.map((e) => {
              ref.current += 1;
              return (
                <StoreCard
                  key={ref.current}
                  mode={"NEAR"}
                  store={e.name}
                  distance={e.distance}
                  jobs={["서빙"]}
                  minPay={e.minimum_wage}
                  works={e.key}
                  onDateClickEvent={nextPage}
                />
              );
            })
          ) : (
            <Empty text={"주변일감"} margin={4} />
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkerNearWorkPage;
