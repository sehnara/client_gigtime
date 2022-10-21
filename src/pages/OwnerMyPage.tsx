import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import Header from "../components/Header";
import TabBar from "../components/TabBar";
import OwnerInterviewTimeTable from "./InOwnerMypages/OwnerInterviewTimeTable";
import MyGigWorker from "./InOwnerMypages/MyGigWorker";
import RecruitTable from "./InOwnerMypages/RecruitTable";
import NavBar from "../components/NavBar";

export type ANGEL_STATE = "NONE" | "POSTING" | "SEARCHING" | "RESULT";

const OwnerMyPage = () => {
  const [storename, setStorename] = useState("");
  const [name, setName] = useState("");
  const [tab, setTab] = useState("면접관리");
  const boxRef: any = useRef(null);
  const [ScrollY, setScrollY] = useState(0);
  const [ScrollActive, setScrollActive] = useState(false);
  const ownerId = sessionStorage.getItem("owner_id");

  function logit() {
    setScrollY(boxRef.current.scrollTop);
    if (boxRef.current.scrollTop > 30) {
      setScrollActive(true);
    } else {
      setScrollActive(false);
    }
  }

  // useEffect(() => {
  //   function watchScroll() {
  //     boxRef.current.addEventListener("scroll", logit);
  //   }
  //   watchScroll();
  // }, []);

  const getData = async () => {
    await axios
      .post(`${process.env.REACT_APP_ROUTE_PATH}/owner/mypage`, {
        owner_id: ownerId,
      })
      .then(function (res: any) {
        setStorename(res.data["store"]);
        setName(res.data["name"]);
      })
      .catch(function (err: any) {
        console.log(err);
      });
  };
  const setMenu = (data: string) => {
    setTab(data);
  };
  // [처음 데이터 받아올 때, 1]
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="h-screen overflow-scroll" ref={boxRef}>
      <NavBar mode="OWNER" />
      <Header title="마이 페이지" worker={false} />
      <div className="">
        <div className="px-8 py-4 flex justify-between items-center  bg-slate-100">
          <h1 className="text-lg font-bold">{storename}</h1>
          <h1 className="">
            <span className="font-bold text-cyan-600">{name}</span>님
          </h1>
        </div>
        {/* TAB BAR  */}
        <TabBar
          tab={tab}
          menu={["모집내역", "면접관리", "나의 알바생"]}
          setTab={setMenu}
          ScrollActive={ScrollActive}
        />
        {tab === "면접관리" ? (
          <OwnerInterviewTimeTable />
        ) : tab === "모집내역" ? (
          <RecruitTable />
        ) : (
          <MyGigWorker />
        )}
      </div>
    </div>
  );
};

export default OwnerMyPage;
