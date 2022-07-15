import React, { StrictMode, useEffect, useState } from "react";
import Header from "../components/Header";
import InputValue2 from "../components/InputValue2";
import SelectButton from "../components/SelectButton";

const OwnerRecruitNoticePage = () => {
  const [recruitData, setRecruitData] = useState({
    store: "",
    address: "",
    description: "",
    type: "",
  });

  const setValue = (_key, _value) => {
    setRecruitData({ ...recruitData, [_key]: _value });
    console.log(recruitData);
  };

  return (
    <div className="">
      <Header title={"모집공고"} />
      <div className="mx-8">
        <InputValue2
          label={"매장이름"}
          setValue={setValue}
          dict_key={"store"}
          dict_value={recruitData["store"]}
        />
        <InputValue2
          label={"매장주소"}
          setValue={setValue}
          dict_key={"address"}
          dict_value={recruitData["address"]}
        />
        <SelectButton label="알바유형" content="알바유형 선택" />
        <InputValue2
          title="해당 공고에 대한 설명 부탁드려요."
          label={"상세설명"}
          setValue={setValue}
          dict_key={"description"}
          dict_value={recruitData["description"]}
        />
      </div>
    </div>
  );
};

export default OwnerRecruitNoticePage;
