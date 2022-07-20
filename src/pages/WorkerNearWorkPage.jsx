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

const WorkerNearWorkPage = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [stores, setStores] = useState([]);
  const [loc, setLoc] = useState("");
  const [range, setRange] = useState("");
  const getData = async () => {
    await axios
      .post("http://localhost:4000/worker/show/hourly_orders", {
        worker_id: sessionStorage.getItem("worker_id"),
      })
      .then((res) => {
        console.log(">>>>>>>>>>>>", res.data);
        setStores(res.data);
      });
  };

  useEffect(() => {
    getData();
    axios
      .post("http://localhost:4000/worker/addr/range", {
        worker_id: sessionStorage.getItem("worker_id"),
      })
      .then((res) => {
        setLoc(res.data[0].location);
        setRange(res.data[0].range);
      });
  }, []);

  const ref = useRef(1);
  const navigate = useNavigate();
  const nextPage = (data) => {
    dispatch(setCurrentOrder(data.id));
    dispatch(setCurrentDate(data.date));
    dispatch(setCurrentType(data.type));
    navigate("/worker/reserveWork");
  };

  return (
    <div>
      <button
        onClick={() => navigate("/worker/speed")}
        className="flex justify-center items-center  bg-cyan-500 text-3xl font-extrabold rounded-full w-16 h-16  text-white fixed bottom-0 right-0 m-4 "
      >
        <AiOutlinePlus />
      </button>
      <NavBar />
      {/* 상단 */}
      <div className=" m-8  flex items-center justify-between">
        <h1 className="text-2xl font-bold w-2/3">{loc}</h1>
        <p className="text-sm font-normal text-slate-600 mt-2">
          내 주변 <span className="font-extrabold">{range}m</span>
        </p>
      </div>
      {/* 중반 */}
      <div className="mx-8">
        {stores && stores.length !== 0 ? (
          stores.map((e) => {
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
  );
};

export default WorkerNearWorkPage;
