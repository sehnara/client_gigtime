import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import StoreCard from "../components/StoreCard";
import { useDispatch, useSelector } from "react-redux";
import man from "../images/worker.png";
import axios from "axios";

const WorkerHomePage = () => {
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const loc = state.sign.location.split(" ")
  const locName = `${loc[0]} ${loc[1]} ${loc[2]}`
  const [stores, setStores] = useState([])

  const onNextPage = () => {
    navigate("/worker/interview");
  };

  const getStoreList = async() => {
    await axios.post("http://localhost:4000/store/list", {"worker_id" : Number(sessionStorage.getItem('worker_id'))}).then(
      res => {
        setStores(res.data)
      }
    )
  }
  useEffect(() => {
    getStoreList()
  }, [])
  

  return (
    <div className="font-sans">
      {/* 상단 */}
      <div className=" m-8  flex items-center justify-between">
        <h1 className="text-2xl font-bold">{locName}</h1>
        <p className="text-sm font-normal text-slate-600 mt-2">
          내 주변 <span className="font-extrabold">{state.sign.range}m</span>
        </p>
      </div>
      {/* 중반 */}
      <div className="flex m-8 mt-10">
        <div className="flex-column">
          <p className="text-2xl mb-0.5 font-medium">이제는</p>
          <p className="text-2xl mb-0.5 font-medium">
            <span className="text-cyan-500  font-extrabold">긱!</span> 하게
          </p>
          <p className="text-2xl mb-0.5 font-medium">일 할 시간!</p>
        </div>
        <img
          src={man}
          alt="walking man"
          width="150"
          className="transform translate-x-12"
        />
      </div>
      {/* 하단 */}
      <div className="border-t-4 "></div>
      <div className="m-8 ">
        <h1 className="text-xl font-bold mb-4">{state.sign.name}님을 기다리고 있어요.</h1>
        {
          stores.map(store => {
            return (
              <StoreCard
                key = {store.store_id} 
                store={store.name}
                distance={store.distance}
                jobs={["카운터", "청소", "음료제조"]}
                minPay={store.minimum_wage}
                ment = {store.description}
                onClickEvent={onNextPage}
              />
            )
          })
        }
        
      </div>
    </div>
  );
};

export default WorkerHomePage;
