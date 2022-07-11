import React, { useState } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import SelectBox from "../components/SelectBox";

const WorkerInterviewPage = () => {
  return (
    <div className="my-2">
      {/* 헤더 */}
      <Header title={"면접신청"} />
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
      {/* 날짜선택 */}
      <div className="mx-8 m-4">
        <h3 className="font-bold mb-2">날짜선택</h3>
        <SelectBox
          data={["2022년 7월 9일", "2022년 7월 24일", "2022년 7월 25일"]}
        />
      </div>
      <div className="border-t-4 "></div>
      {/* 시간선택 */}
      <div className="mx-8 m-4">
        <h3 className="font-bold mb-2">시간선택</h3>
        <SelectBox data={["10:00~11:00", "11:00~12:00", "13:00~14:00"]} />
      </div>
      <div className="border-t-4 "></div>
      {/* 유형선택 */}
      <div className="mx-8 m-4">
        <h3 className="font-bold mb-2">유형선택</h3>
      </div>
      <div className="border-t-4 "></div>
      {/* 질문하기 */}
      <div className="mx-8 m-4">
        <h3 className="font-bold mb-2">질문하기</h3>
      </div>
      <div className="border-t-4 "></div>
      {/* 신청정보*/}
      <div className="mx-8 m-4">
        <h3 className="font-bold mb-2">신청정보</h3>
      </div>
      <div className="border-t-4 "></div>
      {/* 안내사항 */}
      <div className="mx-8 m-4">
        <h3 className="font-bold mb-2">안내사항</h3>
        <p className="text-sm mb-1 text-gray-500">
          - 면접은 화상으로 진행됩니다.
        </p>
        <p className="text-sm mb-1 text-gray-500">
          - 접속 링크는 면접대기 탭에서 확인할 수 있습니다.
        </p>
        <p className="text-sm mb-1 text-gray-500">
          - 면접 30분 전부터 면접시작 버튼이 활성화됩니다.
        </p>
        <p className="text-sm mb-1 text-gray-500">
          - 면접 24시간 전까지 취소가 가능합니다.
        </p>
        <p className="text-sm mb-6 text-gray-500">
          - 무단 면접 불참시 서비스 이용이 제한됩니다.
        </p>
        <Button
          title={"신청하기"}
          onClickEvent={() => {
            console.log("e");
          }}
        />
      </div>
    </div>
  );
};

export default WorkerInterviewPage;
