import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { RecruitState } from "../../../context/recruit";
import { workTime } from "../../../utils/time";

import Button from "../../../components/Buttons/Normal/view";
import Header from "../../../components/Header/view";
import NavBar from "../../../components/Navbar/view";
import InputText from "../../../components/Forms/Text/view";
import InputSelect from "../../../components/Forms/Select/view";
import InputDate from "../../../components/Forms/Date/view";

const Recruitpage = () => {
  const navigate = useNavigate();
  const [recruit, setRecruit] = useRecoilState(RecruitState)
  const {id, store, userName, address, jobs, phone, wage, description} = JSON.parse(localStorage.getItem("user")!)

 const setData = async(key:string, value:string)=> {
    setRecruit({...recruit, [key] : value})
  }

  const onRecruit = () => {
    
  }

  return (
    <div className="pb-16">
      <Header title={"모집공고"} />
      <NavBar mode="OWNER" />
      <div className="mx-8 ">
        <InputSelect
          label = "알바유형 선택"
          _key = "category"
          _value = {recruit.category}
          setValue={setData}
          options={jobs}
        />
        <InputDate
          label = "시작날짜"
          setValue={setData}
          _key="startDate"
        />

        <InputDate
          label = "마감날짜"
          setValue={setData}
          _key="endDate"
        />

        <InputSelect
          label = "시작 시간"
          _key = "startTime"
          _value = {recruit.startTime}
          setValue={setData}
          options={workTime}
        />

        <InputSelect
          label = "마감 시간"
          _key = "endTime"
          _value = {recruit.endTime}
          setValue={setData}
          options={workTime}
        />

        <InputText 
          label="상세설명" 
          _key="description" 
          _value={recruit.description} 
          setValue={setData}
        />

        <InputText 
          label="시급" 
          _key="wage" 
          _value={recruit.wage} 
          setValue={setData}
        />
      </div>

      <div className="mx-8 mb-8">
        <Button title="모집공고 보내기" onClickEvent={()=>{}} />
      </div>
    </div>
  );
};

export default Recruitpage;
