import React from "react";
import OwnerPageCard from "../../components/OwnerPageCard";
import { useEffect, useState } from "react";
import axios from "axios";
import NotFound from "../../components/NotFound";

const OwnerInterviewTimeTable = () => {
  const [nowResult, setNowResult] = useState([]);
  const [waitResult, setWaitResult] = useState([]);
  const [willResult, setWillResult] = useState([]);
  const [completeResult, setCompleteResult] = useState([]);
  const [expiredResult, setExpiredResult] = useState([]);
  // 1.
  const [isClick, setIsClick] = useState(false);
  console.log(">>>>>>>", isClick);

  // 2. 버튼 클릭 시 axios 설정 => if(res.data === 'success') setIsClick(true)
  const onClickAllow = async (id) => {
    await axios
      .post(
        `${process.env.REACT_APP_ROUTE_PATH}/owner/mypage/interview/accept`,
        {
          interview_id: id,
          value: true,
        }
      )
      .then((res) => {
        if (res === "success") {
          setIsClick(true);
        } else {
          console.log(res);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  function onClickReject(id) {
    axios
      .post(
        `${process.env.REACT_APP_ROUTE_PATH}/owner/mypage/interview/accept`,
        {
          interview_id: id,
          value: false,
        }
      )
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
      .post(
        `${process.env.REACT_APP_ROUTE_PATH}/owner/mypage/interview/result`,
        {
          owner_id: sessionStorage.getItem("owner_id"),
          interview_id: id,
          value: true,
        }
      )
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
      .post(
        `${process.env.REACT_APP_ROUTE_PATH}/owner/mypage/interview/result`,
        {
          interview_id: id,
          value: false,
        }
      )
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

  useEffect(() => {
    const ownerId = sessionStorage.getItem("owner_id");
    axios
      .post(`${process.env.REACT_APP_ROUTE_PATH}/owner/interview`, {
        owner_id: ownerId,
      })
      .then(function (res) {
<<<<<<< HEAD
        console.log(">>>>>", res.data);
=======
>>>>>>> 0d207291781a956ec879a810cae94c86e4c71390
        setNowResult(res.data["now"]);
        setWaitResult(res.data["wait"]);
        setWillResult(res.data["will"]);
        setCompleteResult(res.data["complete"]);
        setExpiredResult(res.data["expired"]);
      })
      .catch(function (err) {
        console.log(err);
      });
    setIsClick(false);
  }, [isClick]);

  console.log("2222222222", isClick);

  return (
    <div className="px-8">
      <h1 className="text-xl font-bold  my-4">입장대기</h1>
      <div className="h-64 mb-5 rounded-xl overflow-y-scroll">
        {nowResult === undefined ? (
          <NotFound title={"아직 면접시간이 되지 않았어요!"} />
        ) : (
          nowResult.map((el, index) => (
            <OwnerPageCard
              key={index}
              mode="NOW"
              date={el.interview_date}
              name={el.worker_name}
              time={el.interview_time}
              description={el.question}
              id={el.interview_id}
            />
          ))
        )}
      </div>
      <hr className="border-2 " />
      <h1 className="text-xl font-bold my-4">승인대기</h1>
      <div className="h-72 mb-5 rounded-xl overflow-scroll">
        {waitResult === undefined ? (
          <NotFound title={"면접 신청자가 아직 없어요!"} />
        ) : (
          waitResult.map((el, index) => (
            <OwnerPageCard
              key={index}
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
          ))
        )}
      </div>
      <hr className="border-2 " />
      <h1 className="text-xl font-bold my-4">면접예정</h1>
      <div className="h-72 mb-5 rounded-xl overflow-scroll">
        {/* <OwnerPageCard mode="WILL"/> */}
        {willResult === undefined ? (
          <NotFound title={"면접 예정자가 아직 없어요!"} />
        ) : (
          willResult.map((el, index) => (
            <OwnerPageCard
              key={index}
              mode="WILL"
              id={el.interview_id}
              date={el.interview_date}
              name={el.worker_name}
              time={el.interview_time}
              description={el.question}
            />
          ))
        )}
      </div>
      <hr className="border-2 " />
      <h1 className="text-xl font-bold my-4">면접완료</h1>
      <div className="h-72 mb-5 rounded-xl overflow-scroll">
        {/* <OwnerPageCard mode="COMPLETE"/> */}
        {completeResult === undefined ? (
          <NotFound title={"면접 완료된 사람이 아직 없어요!"} />
        ) : (
          completeResult.map((el, index) => (
            <OwnerPageCard
              key={index}
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
          ))
        )}
      </div>
      <hr className="border-2 " />
      <h1 className="text-xl font-bold my-4">만료된 면접</h1>
      <div className="h-72 mb-5 rounded-xl overflow-scroll">
        {expiredResult === undefined ? (
          <NotFound title={"만료된 면접이 없습니다."} />
        ) : (
          expiredResult.map((el, index) => (
            <OwnerPageCard
              key={index}
              mode="EXPIRED"
              id={el.interview_id}
              date={el.interview_date}
              name={el.worker_name}
              time={el.interview_time}
              description={el.question}
              // onClickPass={onClickPass}
              // onClickFail={onClickFail}
              // setIsClick={setIsClick}
            />
          ))
        )}
      </div>
      <div className="h-24"></div>
    </div>
  );
};

export default OwnerInterviewTimeTable;
