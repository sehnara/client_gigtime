import React from "react";
import GigWorker from "../../components/GigWorker";
import { useState, useEffect } from "react";
import axios from "axios";

const MyGigWorker = () => {
  const [workerNum, setWorkerNum] = useState(0);
  const [workers, setWorkers] = useState([]);
  
  useEffect(() => {
    const ownerId = sessionStorage.getItem('owner_id');
    axios.post('http://localhost:4000/owner/mypage/myWorker',
      {
        'owner_id': ownerId,
      }
    )
    .then((res) => {
      console.log(res);
      setWorkerNum(res.data["number"]);
      setWorkers(res.data["workers"]);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])
  
  return (
    <div className="m-8">
      <h1 className="text-lg mb-3">총 <strong>{workers.length}명</strong>의 긱워커</h1>
      <div className="w-full h-full rounded-xl shadow-lg shadow-black-500 mr-2 mb-2 text-center flex flex-col p-4">
        {
          workers && workers.map((el, index) => (
          <GigWorker 
            key={index}
            name={el} 
            bottomBorder="border-b-2"
            />
            
        ))}
        
      </div>
    </div>
  );
};

export default MyGigWorker;
