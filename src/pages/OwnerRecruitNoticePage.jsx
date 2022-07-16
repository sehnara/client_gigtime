import React, { useState } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import InputValue2 from "../components/InputValue2";

const OwnerRecruitNoticePage = () => {
  const [recruitData, setRecruitData] = useState({
    store_name: "",
    address: "",
    description: "",
    type: "",
    start_date: "",
    end_date: "",
    start_dime: "",
    end_dime: "",
    price: 0,
  });

  console.log(recruitData);

  const setValue = (_key, _value) => {
    setRecruitData({ ...recruitData, [_key]: _value });
    console.log(recruitData);
  };

  return (
    <div className="">
      <Header title={"모집공고"} />
      <div className="mx-8">
        {/* 매장이름 */}
        <InputValue2
          label={"매장이름"}
          setValue={setValue}
          dict_key={"store_name"}
          dict_value={recruitData["store_name"]}
        />
        {/* 매장주소 */}
        <InputValue2
          label={"매장주소"}
          setValue={setValue}
          dict_key={"address"}
          dict_value={recruitData["address"]}
        />
        {/* 알바유형 */}
        <InputValue2
          mode="SELECT"
          label={"알바유형"}
          title={"알바유형 선택"}
          setValue={setValue}
          dict_key={"type"}
          dict_value={recruitData["type"]}
          options={["알바유형 선택", "설거지", "각설이", "카운터"]}
        />
        {/* 상세설명 */}
        <InputValue2
          title="해당 공고에 대한 설명 부탁드려요."
          label={"상세설명"}
          setValue={setValue}
          dict_key={"description"}
          dict_value={recruitData["description"]}
        />
      </div>
      <div className="border-t-4 mt-8 mb-4"></div>
      {/* --------------------------------------------- */}

      <div className="mx-8">
        {/* 시작날짜 */}
        <InputValue2
          mode="DATE"
          label={"시작날짜"}
          title={"시작 날짜 선택"}
          setValue={setValue}
          dict_key={"start_date"}
          dict_value={recruitData["start_date"]}
        />
        {/* 종료날짜 */}
        <InputValue2
          mode="DATE"
          label={"종료날짜"}
          title={"종료 날짜 선택"}
          setValue={setValue}
          dict_key={"end_date"}
          dict_value={recruitData["end_date"]}
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
      </div>

      <div className="mx-8">
        <Button title="등록하기" onClickEvent={() => {}} />
      </div>
    </div>
  );
};

// {
// 	'store_name': '보리누리',
//   'type': '설거지',
//   'description': '설거지 알바 모집합니다',
//   'start_date': '2022-08-20',
//   'end_date': '2022-08-22',
//   'start_time': '10:00',
//   'end_time': '14:00',
//   'price': 10000
// }

export default OwnerRecruitNoticePage;
