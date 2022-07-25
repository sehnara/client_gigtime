import React from "react";
import QRCode from "react-qr-code";
import Header from "../components/Header";
const WorkerQrCode = () => {

  


  return (
    <div>
      <Header title="출근하기" />
      <div className="flex justify-center items-center h-screen transform -translate-y-20">
        <QRCode
          value={`
            worker_id: ${sessionStorage.getItem("worker_id")},
            time: ${new Date()}`}
        />
      </div>
    </div>
  );
};

export default WorkerQrCode;
