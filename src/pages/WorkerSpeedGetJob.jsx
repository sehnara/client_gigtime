import React, { useState } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import InputValue2 from "../components/InputValue2";

const WorkerSpeedGetJob = () => {
  const [recruitData, setRecruitData] = useState({
    type: "",
    start_date: "",
    start_time: "",
    end_time: "",
    price: 0,
  });

  console.log(recruitData);

  const setValue = (_key, _value) => {
    setRecruitData({ ...recruitData, [_key]: _value });
    console.log(recruitData);
  };

  return (
    <div>
      <Header title="바로알바" />
      <div className="mx-8">
        <InputValue2
          mode="SELECT"
          label={"알바유형"}
          title={"알바유형 선택"}
          setValue={setValue}
          dict_key={"type"}
          dict_value={recruitData["type"]}
          options={["알바유형 선택", "설거지", "각설이", "카운터"]}
        />
        <InputValue2
          mode="DATE"
          label={"알바일시"}
          title={"알바일시 선택"}
          setValue={setValue}
          dict_key={"end_date"}
          dict_value={recruitData["start_date"]}
        />
        {/* 근무 시간 */}
        <InputValue2
          mode="TIME"
          label="근무시간"
          options={[
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
            "19:00",
            "20:00",
            "21:00",
            "22:00",
            "23:00",
          ]}
          options2={[
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
            "19:00",
            "20:00",
            "21:00",
            "22:00",
            "23:00",
          ]}
          setValue={setValue}
        />
        {/* 시급 설정 */}
        <InputValue2
          title="시급을 설정해주세요."
          label={"시급설정"}
          setValue={setValue}
          dict_key={"price"}
          dict_value={recruitData["price"]}
        />
        <Button
          title="등록하기"
          onClickEvent={() => {
            console.log(recruitData);
          }}
        />
      </div>
    </div>
  );
};

export default WorkerSpeedGetJob;
