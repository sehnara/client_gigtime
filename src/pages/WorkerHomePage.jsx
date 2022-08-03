import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StoreCard from "../components/StoreCard";
import { useDispatch, useSelector } from "react-redux";
import man from "../images/worker.png";
import axios from "axios";
import { setCurrentOrder } from "../module/slices/order";
import { setStoreId } from "../module/slices/store";
import NavBar from "../components/NavBar";
import Empty from "../components/Empty";
import { HiOutlineLocationMarker } from "react-icons/hi";
import Header from "../components/Header";

const WorkerHomePage = () => {
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const loc = state.sign.location.split(" ");
  const locName = `${loc[0]} ${loc[1]} ${loc[2]}`;
  const [loca, setLoc] = useState("");
  const [range, setRange] = useState("");
  const [name, setName] = useState("");
  const [notFound, setIsNotFound] = useState(false);

  const [stores, setStores] = useState([]);
  const dispatch = useDispatch();

  const onNextPage = (e) => {
    dispatch(setStoreId(e));
    sessionStorage.setItem("store_id", e);
    navigate("/worker/interview");
  };

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_ROUTE_PATH}/worker/addr/range`, {
        worker_id: sessionStorage.getItem("worker_id"),
      })
      .then((res) => {
        setLoc(res.data[0].location);
        setRange(res.data[0].range);
        setName(res.data[0].name);
      });
  }, []);

  const getStoreList = async () => {
    await axios
      .post(`${process.env.REACT_APP_ROUTE_PATH}/store/list`, {
        worker_id: sessionStorage.getItem("worker_id"),
      })
      .then((res) => {
        if (res.data === "error - store/list") {
          setStores([]);
        } else if (res.data === "notFound") {
          setIsNotFound(true);
        } else {
          setStores(res.data);
        }
      });
  };

  useEffect(() => {
    getStoreList();
  }, []);

  return (
    <div className="font-sans bg-cyan-500 h-screen">
      <Header title="주변 가게" worker={true} isFirst={true} />
      <NavBar mode="WORKER" />
      {/* 상단 */}
      <div className="bg-slate-100">
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold flex ">
            {loca.split(" ").slice(0, 3).join(" ")}
            {/* <HiOutlineLocationMarker className="text-2xl ml-2 text-red-400 font-bold animate-bounce " /> */}
          </h1>
          <p className="rounded-lg font-bold text-xl relative">
            <p className="text-xs absolute -top-3 text-gray-500">내 주변</p>
            <span className="font-bold text-red-400 text-2xl "> {range}</span>m
          </p>
        </div>
        {/* 중반 */}
        <div className="flex m-4 mb-0 justify-between">
          <div className="flex-column">
            <p className="text-2xl mb-0.5 font-bold">이제는</p>
            <p className="text-2xl mb-0.5 font-bold">
              <span className="text-cyan-500  font-extrabold ">바로 알바</span>
            </p>
            <p className="text-2xl mb-0.5 font-bold">갈 시간!</p>
          </div>
          <img src={man} alt="walking man" width="120" className="" />
        </div>
      </div>
      {/* 하단 */}
      <div className="p-8 py-0 bg-cyan-500 pb-24">
        <h1 className="text-lg font-bold mb-4 text-right pt-4">
          <span className="text-2xl text-white">{name}</span>님을 기다리고
          있어요.
        </h1>
        <div>
          {notFound ? (
            <div className=" text-center font-bold pt-28">
              <p className="animate-pulse text-lg">
                면접 가능한 가게가 없습니다
              </p>
            </div>
          ) : stores && stores.length !== 0 ? (
            stores.map((store) => {
              return (
                <StoreCard
                  key={store.store_id}
                  store={store.name}
                  distance={store.distance}
                  jobs={[]}
                  storeImage={`${process.env.REACT_APP_S3_PATH}${store.background_image}`}
                  minPay={store.minimum_wage}
                  ment={store.description}
                  onClickEvent={() => {
                    onNextPage(store.store_id);
                  }}
                />
              );
            })
          ) : (
            <Empty text={"주변 일거리를 불러오는 중입니다."} margin={10} />
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkerHomePage;
