import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import InputValue2 from "../components/InputValue2";

// {
//   'owner_id': 60,
//   'store_name': '보리누리',
  // 'type': '설거지',
  // 'description': '설거지 알바 모집합니다',
  // 'start_date': '2022-08-20',
  // 'end_date': '2022-08-22',
  // 'start_time': '10:00',
  // 'end_time': '14:00',
  // 'price': 10000 
// }

// '/owner/mypage/employment/button'
// {
//   'name': '보리누리',
//   'address': '인천 서구 심곡동 123-4',
//   'type': ['서빙', '뭐시기', ...]
// }

const OwnerRecruitNoticePage = () => {
  const [recruitData, setRecruitData] = useState({
    store_name: "",
    address: "",
    types: "",
    description: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    price: 0,
  });

const [postData, setPostData] = useState({
  'owner_id': sessionStorage.getItem("owner_id"),
  'store_name': '',
  'type': '',
  'description': '',
  'start_date': '',
  'end_date': '',
  'start_time': '',
  'end_time': '',
  'price': 0 
})  
const owner_id = sessionStorage.getItem('owner_id');
const setValue = (_key, _value) => {
  setRecruitData({ ...recruitData, [_key]: _value });
  console.log(recruitData);
};

const getData = async() => {
  await axios.post('http://localhost:4000/owner/mypage/employment/button', {'owner_id' : owner_id}).then(res => {
    console.log("!!!!!!!",res.data)
    setRecruitData({...recruitData, 'store_name': res.data.name,'address': res.data.address, 'types': res.data.types })
  })
}

const onEnroll = async()=>{
  await axios.post('http://localhost:4000/owner/employment',postData).thrn(res => {
    console.log(res.data)
  })
}

useEffect(()=>{
  setPostData({...postData, 'store_name': recruitData.store_name, 'type': recruitData.types[0], 'description': recruitData.description,
  'start_date': recruitData.start_date,
  'end_date': recruitData.end_date,
  'start_time': recruitData.start_time,
  'end_time': recruitData.end_time,
  'price': recruitData.price, })
},[recruitData])

  useEffect(()=>{
    getData()
  },[])


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
          dict_key={"types"}
          dict_value={recruitData["types"]}
          options={recruitData['types']}
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
        <Button title="모집공고" onClickEvent={onEnroll} />
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
