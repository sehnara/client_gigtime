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
import { useCallback } from "react";

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
  const [cursor, setCursor] = useState(0);
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
        cursor: "null",
      })
      .then((res) => {
        if (res.data === "error - store/list") {
          setStores([]);
        } else if (res.data === "notFound") {
          setIsNotFound(true);
        } else {
          console.log(res.data);
          setCursor(res.data[res.data.length - 1].store_id);
          setStores(res.data);
        }
      });
  };

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
        .post(`${process.env.REACT_APP_ROUTE_PATH}/store/list`, {
          worker_id: sessionStorage.getItem("worker_id"),
          cursor: cursor,
        })
        .then((res) => {
          if (res.data === "notFound") {
            return;
          }
          setCursor(res.data[res.data.length - 1].store_id);
          setStores((list) => [...list, ...res.data]);
        });
    }
  }, [stores]);

  useEffect(() => {
    window.addEventListener("scroll", _infiniteScroll, true);
    return () => window.removeEventListener("scroll", _infiniteScroll, true);
  }, [_infiniteScroll]);

  useEffect(() => {
    getStoreList();
  }, []);

  return (
    <div className="font-sans bg-cyan-500 h-screen">
      <Header title="면접신청" worker={true} />
      <NavBar mode="WORKER" />
      {/* 상단 */}
      <div className="bg-white">
        <div className=" mx-4 py-4 ">
          <h1 className="text-lg font-bold flex ">
            <HiOutlineLocationMarker className="text-7xl mr-3 text-red-400 font-bold animate-bounce " />
            {loca}
          </h1>
          <p className="text-right p-2 py-1 rounded-lg font-bold">
            내 주변
            <span className="font-bold text-red-400 text-4xl "> {range}</span>m
          </p>
        </div>
        {/* 중반 */}
        <div className="flex m-8 mt-4 ">
          <div className="flex-column">
            <p className="text-3xl mb-0.5 font-medium">이제는</p>
            <p className="text-3xl mb-0.5 font-medium">
              <span className="text-cyan-500  font-extrabold animate-pulse">
                바로 알바
              </span>
            </p>
            <p className="text-3xl mb-0.5 font-medium">갈 시간!</p>
          </div>
          <img
            src={man}
            alt="walking man"
            width="150"
            className="transform translate-x-16 translate-y-1"
          />
        </div>
      </div>
      {/* 하단 */}
      <div className="p-8 py-2 bg-cyan-500 pb-24">
        <h1 className="text-xl font-bold mb-4">
          <span className="text-2xl text-white">{name} </span>님을 기다리고
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
                  jobs={["카운터", "서빙"]}
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
