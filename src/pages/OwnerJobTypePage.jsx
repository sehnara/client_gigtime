import React from "react";
import BodyTop from "../components/BodyTop";
import Button from "../components/Button";
import Header from "../components/Header";

const OwnerJobTypePage = () => {
  const jobType = [
    [
      {
        id: '1',
        name: '음식점',
      },
      {
        id: '2',
        name: '서빙',
      },
      {
        id: '3',
        name: '청소',
      },
      {
        id: '4',
        name: '음료제조',
      },
    ],
    [
      {
        id: '5',
        name: '문서작업',
      },
      {
        id: '6',
        name: '번역',
      },
      {
        id: '7',
        name: '질서유지',
      },
      {
        id: '8',
        name: '경비',
      },
    ],
    [
      {
        id: '9',
        name: '주방보조',
      },
      {
        id: '10',
        name: '운송',
      },
      {
        id: '11',
        name: '판매',
      },
      {
        id: '12',
        name: '이벤트',
      },
    ],
    [
      {
        id: '13',
        name: '편의점',
      },
      {
        id: '14',
        name: '건설용역',
      },
      {
        id: '15',
        name: '베이비시터',
      },
      {
        id: '16',
        name: '술집',
      },
    ],
  ];

  // const jobType1 = [
  //   {
  //     id: '1',
  //     name: '음식점',
  //   },
  //   {
  //     id: '2',
  //     name: '서빙',
  //   },
  //   {
  //     id: '3',
  //     name: '청소',
  //   },
  //   {
  //     id: '4',
  //     name: '음료제조',
  //   },
  // ]

  // const jobType2 = [
  //   {
  //     id: '5',
  //     name: '문서작업',
  //   },
  //   {
  //     id: '6',
  //     name: '번역',
  //   },
  //   {
  //     id: '7',
  //     name: '질서유지',
  //   },
  //   {
  //     id: '8',
  //     name: '경비',
  //   },
  // ]

  // const jobType3 = [
  //   {
  //     id: '9',
  //     name: '주방보조',
  //   },
  //   {
  //     id: '10',
  //     name: '운송',
  //   },
  //   {
  //     id: '11',
  //     name: '판매',
  //   },
  //   {
  //     id: '12',
  //     name: '이벤트',
  //   },
  // ]

  // const jobType4 = [
  //   {
  //     id: '13',
  //     name: '편의점',
  //   },
  //   {
  //     id: '14',
  //     name: '건설용역',
  //   },
  //   {
  //     id: '15',
  //     name: '베이비시터',
  //   },
  //   {
  //     id: '16',
  //     name: '술집',
  //   },
  // ]
  
  return (
    <>
      <Header title="회원가입"/>
      <BodyTop title="알바유형"/>
      <div id="search" className="m-8 mt-10">
        <p className="text-lg mb-5 font-bold">찾으시는 알바 유형을 모두 선택해주세요</p>
        <div>
          {job}
          <div className="flex mb-3 justify-around">
            {jobType1.map((el) => 
              <div key={el.id} className="text-xs bg-gray-200 px-4 py-1 rounded-2xl">{el.name}</div>
            )}
          </div>
          <div className="flex mb-3 justify-around">
            {jobType2.map((el) => 
              <div key={el.id} className="text-xs bg-gray-200 px-4 py-1 rounded-2xl">{el.name}</div>
            )}
          </div>
          <div className="flex mb-3 justify-around">
            {jobType3.map((el) => 
              <div key={el.id} className="text-xs bg-gray-200 px-4 py-1 rounded-2xl">{el.name}</div>
            )}
          </div>
          <div className="flex mb-3 justify-around">
            {jobType4.map((el) => 
              <div key={el.id} className="text-xs bg-gray-200 px-4 py-1 rounded-2xl">{el.name}</div>
            )}
          </div>    
        </div>
        <Button title="완료" />
      </div>
    </>
  );
};

export default OwnerJobTypePage;
