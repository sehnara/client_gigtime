import axios from "axios";
import { useRef, useState, useEffect } from "react";
import Header from "../../../components/Header/view";
import TabBar from "../../../components/Tabbar/view";
import NavBar from "../../../components/Navbar/view";

import WorkerList from "../../Owner/Mypage/WorkerList/view";
import OwnerInterviewTimeTable from "../../InOwnerMypages/OwnerInterviewTimeTable";
import RecruitPage from "../../Owner/Mypage/Recruit/view";

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

//   const getData = async () => {
//     await axios
//       .post(`${process.env.REACT_APP_ROUTE_PATH}/owner/mypage`, {
//         owner_id: ownerId,
//       })
//       .then(function (res: any) {
//         setStorename(res.data["store"]);
//         setName(res.data["name"]);
//       })
//       .catch(function (err: any) {
//         console.log(err);
//       });
//   };

//   const setMenu = (data: string) => {
//     setTab(data);
//   };
  
//   useEffect(() => {
//     getData();
//   }, []);

  return (
    <div className="h-screen overflow-scroll" ref={boxRef}>
      <NavBar mode="OWNER"/>
      <Header title="마이 페이지"/>
      <div className="">
        <div className="px-8 py-4 flex justify-between items-center  bg-slate-100">
          <h1 className="text-lg font-bold">{storename}</h1>
          <h1 className="">
            <span className="font-bold text-cyan-600">{name}</span>님
          </h1>
        </div>

        <TabBar
          tab={tab}
          menu={["모집내역", "면접관리", "나의 알바생"]}
          setTab={setTab}
          ScrollActive={ScrollActive}
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
