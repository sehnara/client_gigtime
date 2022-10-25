import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../components/Buttons/Normal/view";
import Header from "../components/Header";
import SelectBox from "../components/SelectBox";
import NavBar from "../components/NavBar";
import { FaRegUserCircle } from "react-icons/fa";
import { BsPhone } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";

const WorkerInterviewPage = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [question, setQuestion] = useState("");
  const state: any = useSelector((state) => state);
  const [basic, setBasic] = useState<any>({});
  const [times, setTimes] = useState<any>([]);
  const worker_id = sessionStorage.getItem("worker_id");
  const store_id =
    Number(state.store.id) || Number(sessionStorage.getItem("store_id"));

  const getDate = (date: string) => {
    setDate(date);
  };
  const getTime = (time: string) => {
    setTime(time);
  };
  const getQuestion = (e: any) => {
    setQuestion(e.target.value);
  };
  const onComplete = () => {
    onApply();
  };

  const getData = async () => {
    await axios
      .post(`${process.env.REACT_APP_ROUTE_PATH}/apply/load_store`, {
        store_id,
      })
      .then((res) => {
        // console.log("BASIC", res.data);
        setBasic(res.data);
      });
  };

  const getData2 = async () => {
    await axios
      .post(`${process.env.REACT_APP_ROUTE_PATH}/apply/load_interview`, {
        store_id,
      })
      .then((res) => {
        // console.log("TIMES", res.data);
        setTimes(res.data);
      });
  };
  console.log("EEEEEEEE", times);
  const onApply = async () => {
    if (date === null) {
      alert("희망하는 면접 날짜를 알려주세요.");
      return;
    } else if (time === null) {
      alert("희망하시는 면접 시간을 알려주세요.");
      return;
    }
    await axios
      .post(`${process.env.REACT_APP_ROUTE_PATH}/apply/submit`, {
        interview_date: date,
        interview_time: Number(time),
        question: question,
        worker_id: worker_id,
        store_id,
      })
      .then((res) => {
        if (res.data === "안됨. 다른면접있음.") {
          alert("이미 면접이 예약된 시간입니다.");
        } else {
          navigate("/worker/mypage");
        }
      });
  };

  useEffect(() => {
    getData();
    getData2();
    return () => {
      sessionStorage.removeItem("store_id");
    };
  }, []);

  useEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, []);

  return (
    <div className="">
      {/* 헤더 */}
      <NavBar mode={"WORKER"} />
      <Header title={"면접신청"} />
      {/* 이미지 */}
      <img
        className="bg-gray-200 w-full object-cover  h-64"
        src={`${process.env.REACT_APP_S3_PATH}${basic.background_image}`}
      />
      {/* 멘트 */}
      {/* 가게 기본 정보 : 가게명, 담당자, 연락처, 주소 */}
      <div className="m-8 text-sm">
        <h3 className="font-bold mb-4 text-base">{basic && basic.name}</h3>
        <div className="flex items-center mb-3 text-gray-500">
          <FaRegUserCircle className="mr-4 text-lg" />
          <p className="flex-3 text-black">
            <span className="text-sm">{basic && basic.owner_name}님</span>
          </p>
        </div>

        <div className="flex items-center mb-3 text-gray-500">
          <FiMapPin className="mr-4 text-lg" />
          <p className="flex-3 text-black">{basic && basic.address}</p>
        </div>
      </div>
      <div className="border-t-4 "></div>
      {/* 날짜선택 */}
      <div className="m-8  ">
        <h3 className="font-bold mb-4">날짜 선택</h3>
        <SelectBox
          mode="NORMAL"
          getData={getDate}
          data={
            times
              ? times.map((t: any) => {
                  return t.date;
                })
              : []
          }
          selectedDay={date}
        />
      </div>
      <div className="border-t-4 "></div>
      {/* 시간선택 */}
      <div className="m-8">
        <h3 className="font-bold mb-4">시간 선택</h3>
        <SelectBox
          mode="TIME"
          getData={getTime}
          data={
            date === null
              ? [
                  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 19, 20,
                  21, 22, 23,
                ]
              : times.filter((t: any) => t.date === date)[0].time
          }
          selectedTime={time}
        />
      </div>
      <div className="border-t-4 "></div>

      {/* 질문하기 */}
      <div className="m-8">
        <h3 className="font-bold mb-4">질문 하기</h3>
        <p className="text-gray-500 text-sm mb-2">
          사장님께 궁금한 내용을 남겨주세요
        </p>
        <input
          type="text"
          placeholder="내용을 입력해주세요"
          className="bg-gray-100 w-full h-10 pl-2"
          value={question}
          onChange={getQuestion}
        />
      </div>
      <div className="border-t-4 "></div>
      {/* 신청정보*/}
      <div className="m-8 ">
        <h3 className="font-bold mb-4">신청정보 확인</h3>
        <div className="flex items-center mb-3 text-gray-500">
          <p className="flex-1">면접일시</p>
          <p className="flex-3 text-red-500 font-bold">
            {date?.split("-")[0] === undefined
              ? "날짜를 지정해주세요"
              : `${date?.split("-")[0]}년 ${date?.split("-")[1]}월 ${
                  date?.split("-")[2]
                }일 `}
          </p>
        </div>
        <div className="flex items-center mb-3 text-gray-500">
          <p className="flex-1">면접시간</p>
          <p className="flex-3 text-red-500 font-bold">{`${
            time === null ? "00" : time
          }:00 ~ ${time === null ? "00" : Number(time) + 1}:00`}</p>
        </div>
      </div>
      <div className="border-t-4 "></div>
      {/* 안내사항 */}
      <div className="m-8">
        <h3 className="font-bold mb-4">안내사항</h3>
        {[
          "- 면접은 화상으로 진행됩니다.",
          "- 접속 링크는 면접대기 탭에서 확인할 수 있습니다.",
          "- 사장님이 면접 수락 시 알림이 전송됩니다.",
          "- 무단 면접 불참시 서비스 이용이 제한됩니다.",
        ].map((e) => {
          return (
            <p key={e} className="text-sm mb-2 text-gray-500">
              {e}
            </p>
          );
        })}
        <div className="h-3"></div>

        <Button title={"신청하기"} onClickEvent={onComplete} />
        <div className="h-24"></div>
      </div>
    </div>
  );
};

export default WorkerInterviewPage;
