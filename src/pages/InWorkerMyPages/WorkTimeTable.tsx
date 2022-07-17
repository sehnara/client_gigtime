import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import List from "../../components/List";

const mockDict = {
  key: [
    "2022-07-22,보리누리,카운터",
    "2022-07-22,빽다방,음료제조",
    "2022-07-24,보리누리,카운터",
  ],
  address: {
    보리누리: "보리누리의 주소",
    빽다방: "빽다방의 주소",
  },
  "2022-07-22,보리누리,카운터": [
    "10:00,12000",
    "11:00,12000",
    "12:00,12000",
    "13:00,12000",
  ],
  "2022-07-22,빽다방,음료제조": ["20:00,10000", "21:00,10000", "22:00,10000"],
};

const WorkTimeTable = () => {
  const keyRef = useRef(1);
  const [datas, setDatas] = useState()

  const getData = async()=> {
    await axios.post('http://localhost:4000/worker/mypage/work', {"worker_id" : sessionStorage.getItem("worker_id")}).then(res=>{
      setDatas(res.data)
    })
  }
  
  console.log(datas) // -------------------
  useEffect(()=>{
    getData();
  },[])
  
  return (
    <div className="m-8">
      {mockDict.key.map((e) => {
        keyRef.current += 1;
        return (
          <List
            key={keyRef.current}
            date={e.split(",")[0]}
            store={e.split(",")[1]}
            type={e.split(",")[2]}
            mode={"WORKER"}
            address={mockDict.address.보리누리}
            datas={mockDict["2022-07-22,보리누리,카운터"]} // 수정해야함
          />
        );
      })}
    </div>
  );
};

export default WorkTimeTable;

/* 마이페이지 - 알바시간표 */
/* input  { 'email': 'dngp93@gmail.com' }
   output 
   {
    'key': ['2022-07-22,보리누리,카운터', '2022-07-22,빽다방,음료제조', '2022-07-24,보리누리,카운터'],
    'address': {
      '보리누리': '보리누리의 주소',
      '빽다방': '빽다방의 주소'
    },
    '2022-07-22,보리누리,카운터': ['10:00,12000', '11:00,12000', '12:00,12000', '13:00,12000'],
    '2022-07-22,빽다방,음료제조': ['20:00,10000', '21:00,10000', '22:00,10000']
   }/*/
