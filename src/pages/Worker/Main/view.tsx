import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import axios from "axios";
import man from "../../../images/man.png";

import StoreCard from "../../../components/StoreCard";
import NavBar from "../../../components/Navbar/view";
import Empty from "../../../components/Empty/view";
import Header from "../../../components/Header/view";


const Home = () => {
  const navigate = useNavigate();
  const {address, distance, userName} = JSON.parse(localStorage.getItem("user")!)
  const [notFound, setIsNotFound] = useState(false);

  const [stores, setStores] = useState([]);
  const [cursor, setCursor] = useState(0);

  const onNextPage = (e:any) => {
    // dispatch(setStoreId(e));
    sessionStorage.setItem("store_id", e);
    navigate("/worker/interview");
  };

 

  // const getStoreList = async () => {
  //   await axios
  //     .post(`${process.env.REACT_APP_ROUTE_PATH}/store/list`, {
  //       worker_id: sessionStorage.getItem("worker_id"),
  //       cursor: "null",
  //     })
  //     .then((res) => {
  //       if (res.data === "error - store/list") {
  //         setStores([]);
  //       } else if (res.data === "notFound") {
  //         setIsNotFound(true);
  //       } else {
  //         setCursor(res.data[res.data.length - 1].store_id);
  //         setStores(res.data);
  //       }
  //     });
  // };

  // const _infiniteScroll = useCallback(() => {
  //   let scrollHeight = Math.max(
  //     document.documentElement.scrollHeight,
  //     document.body.scrollHeight
  //   );
  //   let scrollTop = Math.max(
  //     document.documentElement.scrollTop,
  //     document.body.scrollTop
  //   );
  //   let clientHeight = document.documentElement.clientHeight;

  //   if (scrollTop + clientHeight + 120 >= scrollHeight) {
  //     axios
  //       .post(`${process.env.REACT_APP_ROUTE_PATH}/store/list`, {
  //         worker_id: sessionStorage.getItem("worker_id"),
  //         cursor: cursor,
  //       })
  //       .then((res) => {
  //         if (res.data === "notFound") {
  //           return;
  //         }
  //         setCursor(res.data[res.data.length - 1].store_id);
  //       //   setStores((list) => [...list, ...res.data]);
  //       });
  //   }
  // }, [stores]);

  // useEffect(() => {
  //   window.addEventListener("scroll", _infiniteScroll, true);
  //   return () => window.removeEventListener("scroll", _infiniteScroll, true);
  // }, [_infiniteScroll]);

  // useEffect(() => {
  //   getStoreList();
  // }, []);

  return (
    <div className="font-sans bg-cyan-500 h-screen">
      <Header title="주변 가게" />
      <NavBar mode="WORKER" />
      <div className="bg-slate-100">
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold flex ">{address}</h1>
          <p className="rounded-lg font-bold text-xl flex items-center">
            <p className="text-xs text-gray-500 pr-1 pt-2 ">내 주변</p>
            <span className="font-bold text-red-400 text-2xl "> {distance}</span>m
          </p>
        </div>

        <div className="flex m-4 mb-0 justify-between">
          <div className="flex-column">
            <p className="text-2xl mb-2 font-bold">이제는</p>
            <p className="font-bold ">
              <span className="text-cyan-500  font-extrabold font-jua text-3xl">
                바로 알바
              </span>
            </p>
            <p className="text-2xl mb-0.5 font-bold">갈 시간!</p>
          </div>
          <img src={man} alt="walking man" width="120" className="" />
        </div>
      </div>

      <div className="p-8 py-0 bg-cyan-500 pb-24">
        <h1 className="text-lg font-bold mb-4 text-right pt-4">
          <span className="text-2xl text-white">{userName} </span>님을 기다리고
          있어요.
        </h1>
        <div>
          {stores.length !== 0 
          ? (
            stores.map((store, index) => {
              return (
                <></>
                // <StoreCard
                //   key={index}
                //   store={store.name}
                //   distance={store.distance}
                //   jobs={[]}
                //   storeImage={`${process.env.REACT_APP_S3_PATH}${store.background_image}`}
                //   minPay={store.minimum_wage}
                //   ment={store.description}
                //   onClickEvent={() => {
                //     onNextPage(store.store_id);
                //   }}
                // />
              );
            })
          ) 
          : (
            <Empty text={"주변 일거리를 불러오는 중입니다."} margin={10} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
