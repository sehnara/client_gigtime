import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import StoreCard from "../../components/StoreCard";

const WinStores = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    await axios
      .post("http://localhost:4000/worker/mypage/myStore", {
        worker_id: sessionStorage.getItem("worker_id"),
      })
      .then((res) => setData(res.data));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="mx-8 my-4">
      {data.map((e: any, index) => {
        return (
          <StoreCard
            key={index}
            mode={"OWNER_MYPAGE"}
            store={e.name}
            address={e.address}
            jobs={e.types}
            onDateClickEvent={() => {}}
          />
        );
      })}
    </div>
  );
};

export default WinStores;
