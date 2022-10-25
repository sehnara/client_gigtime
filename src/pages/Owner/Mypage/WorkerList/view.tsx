import React, { useState, useEffect } from "react";
import List from '../../../../components/List/WorkerList/view'
import axios from "axios";

const WorkerList = () => {
  const [workerNum, setWorkerNum] = useState(0);
  const [workers, setWorkers] = useState([]);
  const [result, setResult] = useState("");

//   useEffect(() => {
//     const ownerId = sessionStorage.getItem("owner_id");
//     axios
//       .post(`${process.env.REACT_APP_ROUTE_PATH}/owner/mypage/myWorker`, {
//         owner_id: ownerId,
//       })
//       .then((res) => {
//         if (res.data === "empty") {
//           setResult(res.data);
//         } else {
//           setWorkerNum(res.data["number"]);
//           setWorkers(res.data["workers"]);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

  return (
    <div className="m-8">
      {result === "empty" 
      ? (
        <p>알바생이 없습니다.</p>
      ) 
      : (
        <div>
          <h1 className="text-lg mb-3">
            총{" "}
            <strong className="text-lg text-cyan-500">{workers.length}</strong>
            명의 가족들
          </h1>
          <div className="w-full h-full rounded-xl shadow-lg shadow-black-500 mr-2 mb-2 text-center flex flex-col p-4">
            <List workers = {workers}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkerList;
