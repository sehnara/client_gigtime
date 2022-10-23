import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Buttons/Normal/view";
import Header from "../../../components/Header/view";
import { jobType } from ".";
import { setStorejob } from "../../../module/slices/owner";
import { useSelector, useDispatch } from "react-redux";

const OwnerJobTypePage = () => {

  const [pick, setPick] = useState(jobType);
  const [select, setSelect] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  function onClickToNext() {
    // dispatch(setStorejob(select));
    navigate('/owner/upload');
  }
  
  return (
    <>
      <Header title="회원가입"/>
      <div className="m-8 mt-10">
        <p className="text-sm mb-5 ">원하는 알바 유형을 모두 선택해주세요</p>
        <div>
          <div className="flex flex-wrap">
            {pick.map((el) => 
              <button 
                key={el.id} 
                onClick={() => { 
                //   !select.includes(el)
                //     ? setSelect((select) => [...select, el])
                //     : setSelect(select.filter((e) => e !== el));
                }}
                className={
                //   select.includes(el) 
                //   ? "text-xs font-bold bg-cyan-500 text-white px-4 h-7 py-1 rounded-2xl mr-3 mb-3" :
                   "text-xs bg-gray-200 px-4 h-7 py-1 rounded-2xl mr-3 mb-3"
                }
              >{el.name}</button>
            )}
          </div>
        </div>
      <Button title="다음" onClickEvent={onClickToNext}/>
      </div>
    </>
  );
};

export default OwnerJobTypePage;