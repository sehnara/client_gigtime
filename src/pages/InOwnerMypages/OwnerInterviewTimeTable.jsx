import React from "react";
import OwnerPageCard from "../../components/OwnerPageCard";
import { useEffect, useState } from "react";
import axios from "axios";

const OwnerInterviewTimeTable = () => {
  const [nowResult, setNowResult] = useState([]);
  const [waitResult, setWaitResult] = useState([]);
  const [willResult, setWillResult] = useState([]);
  const [completeResult, setCompleteResult] = useState([]);
  // 1.
  const [isClick, setIsClick] = useState(false);

  // 2. 버튼 클릭 시 axios 설정 => if(res.data === 'success') setIsClick(true)
  const onClickAllow = async (id) => {
    await axios
      .post("/owner/mypage/interview/accept", {
        interview_id: id,
        value: true,
      })
      .then((res) => {
        if (res === "success") {
          setIsClick(true);
        } else {
          console.log(res);
        }
      })
      .catch(function (err) {
        // console.log(err);
      });
  };

  function onClickReject(id) {
    axios
      .post("/owner/mypage/interview/accept", {
        interview_id: id,
        value: false,
      })
      .then(function (res) {
        if (res === "success") {
          setIsClick(true);
        } else {
          console.log(res);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  function onClickPass(id) {
    axios
      .post("/owner/mypage/interview/result", {
        interview_id: id,
        value: true,
      })
      .then(function (res) {
        if (res === "success") {
          setIsClick(true);
        } else {
          console.log(res);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  function onClickFail(id) {
    axios
      .post("/owner/mypage/interview/result", {
        interview_id: id,
        value: false,
      })
      .then(function (res) {
        if (res === "success") {
          setIsClick(true);
        } else {
          console.log(res);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  // 3. isClick을 useEffect [] 안에 넣어줌
  // 4. useEffect 끝에 false로 바꿔 줌

  useEffect(() => {
    const ownerId = sessionStorage.getItem("owner_id");
    axios
      .post("/owner/interview", {
        owner_id: ownerId,
      })
      .then(function (res) {
        // console.log(">>>>>", res.data);
        setNowResult(res.data["now"]);
        setWaitResult(res.data["wait"]);
        setWillResult(res.data["will"]);
        setCompleteResult(res.data["complete"]);
      })
      .catch(function (err) {
        console.log(err);
      });
    setIsClick(false);
  }, [isClick]);

  return (
    <div className="m-8">
      <h1 className="text-lg font-bold mb-3">입장대기</h1>
      <div className="h-72 mb-5 rounded-xl overflow-scroll">
        {/* <OwnerPageCard mode="NOW"/> */}
        {nowResult &&
          nowResult.map((el) => (
            <OwnerPageCard
              mode="NOW"
              date={el.interview_date}
              name={el.worker_name}
              time={el.interview_time}
              description={el.question}
              id={el.interview_id}
            />
          ))}
      </div>
      <h1 className="text-lg font-bold mb-3">승인대기</h1>
      <div className="h-72 mb-5 rounded-xl overflow-scroll">
        {/* <OwnerPageCard mode="WAIT"/> */}
        {waitResult &&
          waitResult.map((el) => (
            <OwnerPageCard
              mode="WAIT"
              id={el.interview_id}
              date={el.interview_date}
              name={el.worker_name}
              time={el.interview_time}
              description={el.question}
              onClickAllow={onClickAllow}
              onClickReject={onClickReject}
              setIsClick={setIsClick}
            />
          ))}
      </div>
      <h1 className="text-lg font-bold mb-3">면접예정</h1>
      <div className="h-72 mb-5 rounded-xl overflow-scroll">
        {/* <OwnerPageCard mode="WILL"/> */}
        {willResult &&
          willResult.map((el) => (
            <OwnerPageCard
              mode="WILL"
              id={el.interview_id}
              date={el.interview_date}
              name={el.worker_name}
              time={el.interview_time}
              description={el.question}
            />
          ))}
      </div>
      <h1 className="text-lg font-bold mb-3">면접완료</h1>
      <div className="h-72 mb-5 rounded-xl overflow-scroll">
        {/* <OwnerPageCard mode="COMPLETE"/> */}
        {completeResult &&
          completeResult.map((el) => (
            <OwnerPageCard
              mode="COMPLETE"
              id={el.interview_id}
              date={el.interview_date}
              name={el.worker_name}
              time={el.interview_time}
              description={el.question}
              onClickPass={onClickPass}
              onClickFail={onClickFail}
              setIsClick={setIsClick}
            />
          ))}
      </div>
    </div>
  );
};

export default OwnerInterviewTimeTable;
