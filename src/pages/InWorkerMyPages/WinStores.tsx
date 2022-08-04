import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Empty from "../../components/Empty";
import NotFound from "../../components/NotFound";
import StoreCard from "../../components/StoreCard";

const WinStores = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    await axios
      .post(`${process.env.REACT_APP_ROUTE_PATH}/worker/mypage/myStore`, {
        worker_id: sessionStorage.getItem("worker_id"),
      })
      .then((res) => {
        setData(res.data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="mx-8 my-4">
      {data.length === 0 ? (
        <Empty text={"합격한 가게를 불러오는 중입니다."} margin={8} />
      ) : (
        // <NotFound title={"아직 합격한 곳이 없어요!"} />
        data.map((e: any, index: number) => {
          return (
            <StoreCard
              key={index}
              mode={"WIN"}
              store={e.name}
              storeImage={`${process.env.REACT_APP_S3_PATH}${e.background_image}`}
              address={e.address}
              jobs={e.types}
              onDateClickEvent={() => {}}
            />
          );
        })
      )}
    </div>
  );
};

export default WinStores;
