import React from "react";
import QRCode from "react-qr-code";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
const WorkerQrCode = () => {
  // let today = new Date();
  // let year = today.getFullYear(); // 년도
  // let month = today.getMonth() + 1; // 월
  // let date = today.getDate(); // 날짜
  // let day = today.getDay(); // 요일

  // const [hours, setHours] = ("0" + today.getHours()).slice(-2);
  // const [minutes, setMinutes] = ("0" + today.getMinutes()).slice(-2);
  // const [seconds, setSeconds] = ("0" + today.getSeconds()).slice(-2);

  // setInterval(() => {
  //   setHours(("0" + today.getHours()).slice(-2));
  //   setMinutes(("0" + today.getMinutes()).slice(-2));
  //   setSeconds(("0" + today.getSeconds()).slice(-2));
  // }, 1000);

  return (
    <div className="h-screen">
      <NavBar mode={"WORKER"} />
      <Header title="QR출근" worker={true} />
      <div className="flex justify-center items-center mt-52">
        <QRCode value={`worker_id: ${sessionStorage.getItem("worker_id")}`} />
      </div>
      <div>
        {/* <p className="text-center ">
          {year}년 {month}월 {date}일 {day}요일
        </p>
        <p className="text-center">
          {hours}시 {minutes}분 {seconds}초
        </p> */}
      </div>
    </div>
  );
};

export default WorkerQrCode;
