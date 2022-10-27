import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const MyGigWorker = () => {
  const [workerNum, setWorkerNum] = useState(0);
  const [workers, setWorkers] = useState([]);
  const [result, setResult] = useState("");

  useEffect(() => {
    const ownerId = sessionStorage.getItem("owner_id");
    axios
      .post(`${process.env.REACT_APP_ROUTE_PATH}/owner/mypage/myWorker`, {
        owner_id: ownerId,
      })
      .then((res) => {
        // console.log("-----------------", res.data);
        if (res.data === "empty") {
          setResult(res.data);
        } else {
          setWorkerNum(res.data["number"]);
          setWorkers(res.data["workers"]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="m-8">
      {result === "empty" ? (
        // <Empty text={"긱"} margin={0} />
        // <NotFound title={"나의 알바생이 없어요!"} />
        <></>
      ) : (
        <div>
          <h1 className="text-lg mb-3">
            총{" "}
            <strong className="text-lg text-cyan-500">{workers.length}</strong>
            명의 가족들
          </h1>
          <div className="w-full h-full rounded-xl shadow-lg shadow-black-500 mr-2 mb-2 text-center flex flex-col p-4">
            {workers &&
              workers.map((el, index) => (
                <></>
                // <GigWorker key={index} name={el} bottomBorder="border-b-2" />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyGigWorker;
