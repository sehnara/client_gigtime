import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import List from "../../components/List";

const WorkTimeTable = () => {
  const keyRef = useRef(1);
  const [datas, setDatas] = useState([[]]);

  const getData = async () => {
    try {
      await axios
        .post(`${process.env.REACT_APP_ROUTE_PATH}/worker/mypage/work`, {
          worker_id: sessionStorage.getItem("worker_id"),
        })
        .then((res) => {
          setDatas(res.data);
          console.log(res.data);
        });
    } catch {
      console.log("axios error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="m-8">
      {datas &&
        datas.map((e) => {
          keyRef.current += 1;
          let hours = new Array();

          for (let i = 4; i < e.length; i++) {
            hours.push(e[i]);
          }

          return (
            <List
              key={keyRef.current}
              date={e[0]}
              store={e[1]}
              type={e[2]}
              mode={"WORKER"}
              address={e[3]}
              // price={e[-1]} 만들면 맨 뒤로 넣어줄게
              datas={hours} // 수정해야함
            />
          );
        })}
    </div>
  );
};

export default WorkTimeTable;
