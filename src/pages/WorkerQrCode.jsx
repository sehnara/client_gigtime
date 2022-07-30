import React from "react";
import QRCode from "react-qr-code";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
const WorkerQrCode = () => {
  return (
    <div className="">
      <NavBar mode={"WORKER"} />
      <Header title="출근하기" worker={true} />
      <div className="flex justify-center items-center bg-cyan-500 h-96">
        <QRCode value={`worker_id: ${sessionStorage.getItem("worker_id")}`} />
      </div>
    </div>
  );
};

export default WorkerQrCode;
