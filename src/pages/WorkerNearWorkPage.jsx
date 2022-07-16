import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StoreCard from "../components/StoreCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCurrentDate, setCurrentOrder, setCurrentType } from "../module/slices/order";

const WorkerNearWorkPage = () => {
const state = useSelector((state) => state);
const dispatch = useDispatch();
const [stores, setStores] = useState([]);

useEffect(()=>{
    axios.post("http://localhost:4000/worker/show/hourly_orders", 
    {'worker_id':sessionStorage.getItem('worker_id')}).then((res)=>{
      setStores(res.data) 
    })
  },[])

  const ref = useRef(1);
  const navigate = useNavigate();
  const nextPage = (data) => {
    dispatch(setCurrentOrder(data.id))
    dispatch(setCurrentDate(data.date))
    dispatch(setCurrentType(data.type))
    navigate("/worker/reserveWork");
  };

  return (
    <div>
      {/* 상단 */}
      <div className=" m-8  flex items-center justify-between">
        <h1 className="text-2xl font-bold">{state.sign.location}</h1>
        <p className="text-sm font-normal text-slate-600 mt-2">
          내 주변 <span className="font-extrabold">{state.sign.range}m</span>
        </p>
      </div>
      {/* 중반 */}
      <div className="mx-8">
        {stores && stores.map((e) => {
          ref.current += 1;
          return (
            <StoreCard
              key={ref.current}
              mode={"NEAR"}
              store={e.name}
              distance={e.distance}
              jobs={['서빙']}
              minPay={e.minimum_wage}
              works={e.key}
              onDateClickEvent={nextPage}
            />
          );
        })
        }
      </div>
    </div>
  );
};

export default WorkerNearWorkPage;
