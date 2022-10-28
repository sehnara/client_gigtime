import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import TabBar from "../components/Tabbar/view";
import NavBar from "../components/Navbar/view";
import InterviewTimeTable from "./InWorkerMyPages/InterviewTimeTable";
import WinStores from "./InWorkerMyPages/WinStores";
import WorkTimeTable from "./InWorkerMyPages/WorkTimeTable";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import Header from "../components/Header/view";
import Empty from "../components/Empty/view";

const data = [
  { time: 49, text: "바로알바로 일 한 시간" },
  { time: 3, text: "바로알바에서 합격한 매장 수" },
  { time: 8, text: "바로알바에서 면접 본 횟수" },
  { time: 237, text: "바로알바에서 수익(만 원)" },
  { time: 10, text: "바로알바 가입한지 (일)" },
];

const WorkMyPage = () => {
  const [result, setResult] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const boxRef: any = useRef(null);
  const [ScrollY, setScrollY] = useState(0);
  const [ScrollActive, setScrollActive] = useState(false);

  function logit() {
    setScrollY(boxRef.current.scrollTop);
    if (boxRef.current.scrollTop > 30) {
      setScrollActive(true);
    } else {
      setScrollActive(false);
    }
  }

  useEffect(() => {
    function watchScroll() {
      boxRef.current.addEventListener("scroll", logit);
    }
    // watchScroll();
  });

  useEffect(() => {
    const workerId = sessionStorage.getItem("worker_id");
    axios
      .post(`${process.env.REACT_APP_ROUTE_PATH}/worker/mypage/interview`, {
        worker_id: workerId,
      })
      .then(function (res) {
        console.log(res.data);
        setResult(res.data["result"]);
        setName(res.data["name"]);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [name]);

  const danchooRef = useRef(1);
  const [tab, setTab] = useState("면접시간표");

  const setMenu = (data: string) => {
    setTab(data);
  };

  return (
    <div className="h-screen overflow-scroll" ref={boxRef}>
      <Header title="마이페이지"/>
      {/* TAB BAR  */}
      <NavBar mode="WORKER" />
      <TabBar
        tab={tab}
        menu={["면접시간표", "알바시간표", "합격한 곳"]}
        setTab={setMenu}
        ScrollActive={ScrollActive}
      />
      {tab === "면접시간표" ? (
        <InterviewTimeTable result={result} status={data} />
      ) : tab === "알바시간표" ? (
        <WorkTimeTable />
      ) : (
        <WinStores />
      )}
      <div className="h-24"></div>
    </div>
  );
};

export default WorkMyPage;
 