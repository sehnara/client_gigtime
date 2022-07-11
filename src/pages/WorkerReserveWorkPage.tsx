import React from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import { AiOutlineCalendar } from "react-icons/ai";
import SelectBox from "../components/SelectBox";

const WorkerReserveWorkPage = () => {
  return (
    <div>
      <Header title="알바예약" />
      {/* 이미지 */}
      <div className="bg-gray-200 w-full h-48"></div>
      {/* 멘트 */}
      <p className="px-8 py-4">베이커리 카페 카운터 담당 모집합니다!</p>
      <div className="border-t-4 "></div>
      {/* 가게 기본 정보 : 가게명, 담당자, 연락처, 주소 */}
      <div className="mx-8 m-4 text-sm">
        <h3 className="font-bold mb-4 text-base">보리누리</h3>
        <div className="flex items-center mb-3 text-gray-500">
          <p className="flex-1">담당자</p>
          <p className="flex-3">
            김현숙<span className="text-sm">님</span>
          </p>
        </div>
        <div className="flex items-center mb-3 text-gray-500">
          <p className="flex-1">연락처</p>
          <p className="flex-3">010-0000-0000</p>
        </div>
        <div className="flex items-center mb-3 text-gray-500">
          <p className="flex-1">주소</p>
          <p className="flex-3">인천 서구 심곡동 123-4</p>
        </div>
      </div>
      <div className="border-t-4 "></div>
      {/* 알바예약 */}
      <div className="mx-8 m-4 ">
        <h3 className="font-bold mb-4">알바예약</h3>
        <p className="text-sm text-gray-500">
          1시간 단위로 알바 예약이 가능합니다.
        </p>
        <div className="flex items-center w-52 my-4 ">
          <AiOutlineCalendar className="mr-2" />
          <p className="text-xs">2022년 7월 22일 금요일</p>
        </div>
        <SelectBox
          getData={() => {
            console.log("d");
          }}
          data={[
            "11:00~12:00",
            "12:00~13:00",
            "13:00~14:00",
            "14:00~15:00",
            "15:00~16:00",
            "16:00~17:00",
            "17:00~18:00",
            "18:00~19:00",
            "19:00~20:00",
            "20:00~21:00",
            "21:00~22:00",
          ]}
        />
      </div>
      <div className="border-t-4 "></div>
      {/* 예약정보*/}
      <div className="mx-8 m-4 ">
        <h3 className="font-bold mb-4">예약정보</h3>
        <div className="flex items-center mb-3 text-sm text-gray-500">
          <p className="flex-1">근무날짜</p>
          <p className="flex-3">2022년 7월 24일 화요일</p>
        </div>
        <div className="flex items-center mb-3 text-sm text-gray-500">
          <p className="flex-1">근무시간</p>
          <p className="flex-3">2시간</p>
        </div>
        <div className="flex items-center mb-3 text-sm text-gray-500">
          <p className="flex-1">임금</p>
          <p className="flex-3 text-base font-bold">20400원</p>
        </div>
      </div>
      <div className="border-t-4 "></div>
      {/* 안내사항 */}
      <div className="mx-8 m-4">
        <h3 className="font-bold mb-4">안내사항</h3>
        {[
          "- 근로계약서 작성을 위해 신분증을 지참해주세요.",
          " - 알바 48시간 전까지 취소 가능",
          " - 무단 결근 시 서비스 규정에 따라 이용 제한",
        ].map((e) => {
          return (
            <p key={e} className="text-sm mb-2 text-gray-500">
              {e}
            </p>
          );
        })}
        <div className="h-3"></div>

        <Button
          title={"예약하기"}
          onClickEvent={() => {
            console.log("");
          }}
        />
      </div>
    </div>
  );
};

export default WorkerReserveWorkPage;
