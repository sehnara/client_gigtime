import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import SelectBox from "../components/SelectBox";

const WorkerInterviewPage = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [question, setQuestion] = useState("");
  const state :any = useSelector((state) => state);
  const [basic, setBasic] = useState<any>({});

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
    console.log(date, time, question);
    navigate("/worker/nearWork");
  };
  const getData = async()=> {
    await axios.post("http://localhost:4000/apply/load_store", {
      "store_id" : Number(state.store.id)
    }).then(res => {
      setBasic(res.data)
    })
  }

  useEffect(()=>{
    getData()
  },[])

  return (
    <div className="my-2">
      {/* 헤더 */}
      <Header title={"면접신청"} />
      {/* 이미지 */}
      <div className="bg-gray-200 w-full h-48"></div>
      {/* 멘트 */}
      <p className="px-8 py-4"></p>
      <div className="border-t-4 "></div>
      {/* 가게 기본 정보 : 가게명, 담당자, 연락처, 주소 */}
      <div className="mx-8 m-4 text-sm">
        <h3 className="font-bold mb-4 text-base">{basic && basic.name}</h3>
        <div className="flex items-center mb-3 text-gray-500">
          <p className="flex-1">담당자</p>
          <p className="flex-3">
          <span className="text-sm">{basic && basic.owner_name}님</span>
          </p>
        </div>
        <div className="flex items-center mb-3 text-gray-500">
          <p className="flex-1">연락처</p>
          <p className="flex-3">{basic && basic.owner_phone}</p>
        </div>
        <div className="flex items-center mb-3 text-gray-500">
          <p className="flex-1">주소</p>
          <p className="flex-3">{basic && basic.address}</p>
        </div>
      </div>
      <div className="border-t-4 "></div>
      {/* 날짜선택 */}
      <div className="mx-8 m-4">
        <h3 className="font-bold mb-4">날짜선택</h3>
        <SelectBox
          mode="NORMAL"
          getData={getDate}
          data={["2022년 7월 9일", "2022년 7월 24일", "2022년 7월 25일"]}
        />
      </div>
      <div className="border-t-4 "></div>
      {/* 시간선택 */}
      <div className="mx-8 m-4">
        <h3 className="font-bold mb-4">시간선택</h3>
        <SelectBox
          mode="NORMAL"
          getData={getTime}
          data={["10:00~11:00", "11:00~12:00", "13:00~14:00"]}
        />
      </div>
      <div className="border-t-4 "></div>
      {/* 유형선택 */}
      <div className="mx-8 m-4">
        <h3 className="font-bold mb-4">유형선택</h3>
        {["카운터", "서빙", "설거지"].map((e) => {
          return (
            <button
              key={e}
              className="bg-gray-200 rounded-2xl p-1 px-4 cursor-pointer mr-2"
            >
              {e}
            </button>
          );
        })}
      </div>
      <div className="border-t-4 "></div>
      {/* 질문하기 */}
      <div className="mx-8 m-4">
        <h3 className="font-bold mb-4">질문하기</h3>
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
      <div className="mx-8 m-4">
        <h3 className="font-bold mb-4">신청정보</h3>
        <div className="flex items-center mb-3 text-gray-500">
          <p className="flex-1">면접일시</p>
          <p className="flex-3">2022년 7월 24일 화요일</p>
        </div>
        <div className="flex items-center mb-3 text-gray-500">
          <p className="flex-1">면접시간</p>
          <p className="flex-3">11:00 ~ 12:00</p>
        </div>
      </div>
      <div className="border-t-4 "></div>
      {/* 안내사항 */}
      <div className="mx-8 m-4">
        <h3 className="font-bold mb-4">안내사항</h3>
        {[
          "- 면접은 화상으로 진행됩니다.",
          " - 접속 링크는 면접대기 탭에서 확인할 수 있습니다.",
          " - 면접 30분 전부터 면접시작 버튼이 활성화됩니다.",
          " - 면접 24시간 전까지 취소가 가능합니다.",
          " - 무단 면접 불참시 서비스 이용이 제한됩니다.",
        ].map((e) => {
          return (
            <p key={e} className="text-sm mb-2 text-gray-500">
              {e}
            </p>
          );
        })}
        <div className="h-3"></div>

        <Button title={"신청하기"} onClickEvent={onComplete} />
      </div>
    </div>
  );
};

export default WorkerInterviewPage;
