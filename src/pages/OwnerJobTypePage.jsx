import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BodyTop from "../components/BodyTop";
import Button from "../components/Button";
import Header from "../components/Header";
import { setStorejob } from "../module/slices/owner";
import { useSelector, useDispatch } from "react-redux";

const OwnerJobTypePage = () => {
  const jobType = [
    {
      id: '1',
      name: '설거지',
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
    {
      id: '5',
      name: '전단지',
    },
    {
      id: '6',
      name: '배달',
    },
    {
      id: '7',
      name: '고객관리',
    },
    {
      id: '8',
      name: '홍보',
    },
    {
      id: '9',
      name: '주방보조',
    },
    {
      id: '10',
      name: '포장',
    },
    {
      id: '11',
      name: '판매',
    },
    {
      id: '12',
      name: '심부름',
    },
    {
      id: '13',
      name: '카운터',
    },
    {
      id: '14',
      name: '계산',
    },
    {
      id: '15',
      name: '재료관리',
    },
    {
      id: '16',
      name: '매장관리',
    },
  ];
  
  const [pick, setPick] = useState(jobType);
  const [select, setSelect] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  // console.log(select);

  function onClickToNext() {
    dispatch(setStorejob(select));
    navigate('/owner/upload');
  }
  
  return (
    <>
      <Header title="회원가입"/>
      <BodyTop title="알바유형"/>
      <div className="m-8 mt-10">
        <p className="text-lg mb-5 font-bold">찾으시는 알바 유형을 모두 선택해주세요</p>
        <div>
          <div className="flex flex-wrap">
            {pick.map((el) => 
              <button 
                key={el.id} 
                onClick={() => { 
                  !select.includes(el)
                    ? setSelect((select) => [...select, el])
                    : setSelect(select.filter((e) => e !== el));
                }}
                className={
                  select.includes(el) 
                  ? "text-xs font-bold bg-cyan-500 text-white px-4 h-7 py-1 rounded-2xl mr-3 mb-3" 
                  : "text-xs bg-gray-200 px-4 h-7 py-1 rounded-2xl mr-3 mb-3"
                }
              >{el.name}</button>
            )}
          </div>
        </div>
      <Button title="완료" onClickEvent={onClickToNext}/>
      </div>
    </>
  );
};

export default OwnerJobTypePage;