import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { RiCreativeCommonsZeroLine } from "react-icons/ri";
import List from "../../components/List";

const mockDict = [
  [
    "2022-08-20",
    "커피커피",
    "서빙",
    "대전 유성구 전민로 38",
    "10:00,10255",
    "11:00,10255",
  ],
  [
    "2022-08-20",
    "광세족발",
    "설거지",
    "대전 유성구 전민로22번길 51",
    "16:00,10250",
  ],
];

const WorkTimeTable = () => {
  const keyRef = useRef(1);
  const [datas, setDatas] = useState([[]]);

  const getData = async () => {
    try {
      await axios
        .post("http://localhost:4000/worker/mypage/work", {
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

          /* for문 안쓰고 어떻게 하나.. */
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
