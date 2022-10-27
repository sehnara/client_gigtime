import axios from "axios";
import { useState } from "react";
import Header from "../../../components/Header/view";
import TabBar from "../../../components/Tabbar/view";
import NavBar from "../../../components/Navbar/view";

import WorkerList from "../../Owner/Mypage/WorkerList/view";
import OwnerInterviewTimeTable from "../../InOwnerMypages/OwnerInterviewTimeTable";
import RecruitPage from "../../Owner/Mypage/Recruit/view";

const OwnerMyPage = () => {
  const {id, store, userName, address, jobs, phone, wage, description} = JSON.parse(localStorage.getItem("user")!)
  const [tab, setTab] = useState("면접관리");
  
  return (
    <div className="h-screen overflow-scroll">
      <NavBar mode="OWNER"/>
      <Header title="마이 페이지"/>
      <div className="">
        <div className="px-8 py-4 flex justify-between items-center  bg-slate-100">
          <h1 className="text-lg font-bold">{store}</h1>
          <h1 className="">
            <span className="font-bold text-cyan-600">{userName}</span>님
          </h1>
        </div>

        <TabBar
          tab={tab}
          menu={["모집내역", "면접관리", "나의 알바생"]}
          setTab={setTab}
        />

        {tab === "면접관리" ? (
          <OwnerInterviewTimeTable />
        ) : tab === "모집내역" ? (
          <RecruitPage />
        ) : (
          <WorkerList />
        )}
      </div>
    </div>
  );
};

export default OwnerMyPage;
