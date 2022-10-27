import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../../components/Buttons/Normal/view";
import Header from "../../../components/Header/view";
import NavBar from "../../../components/Navbar/view";
import InputValue2 from "../../../components/InputValue2";

const Recruitpage = () => {
    const navigate = useNavigate();
    const owner_id = sessionStorage.getItem("owner_id");

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
    owner_id: owner_id,
    store_name: "",
    type: "",
    description: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    price: 0,
  });

  const setValue = (_key, _value) => {
    setRecruitData({ ...recruitData, [_key]: _value });
  };

  const getData = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_ROUTE_PATH}/owner/mypage/employment/button`,
        {
          owner_id: owner_id,
        }
      )
      .then((res) => {
        setRecruitData({
          ...recruitData,
          store_name: res.data.name,
          address: res.data.address,
          types: res.data.types,
        });
      });
  };

  const onEnroll = async () => {
    // if (
    //   postData.type.split(" ")[0] === "기입" ||
    //   postData.type === undefined ||
    //   postData.start_time.split(" ")[0] === "기입" ||
    //   postData.start_time === "" ||
    //   postData.end_time.split(" ")[0] === "기입" ||
    //   postData.end_time === ""
    // ) {
    //   alert("모집 공고 정보 기입을 완료해주세요.");
    //   return;
    // }

    // await axios
    //   .post(`${process.env.REACT_APP_ROUTE_PATH}/owner/employment`, postData)
    //   .then((res) => {
    //     if (res.data === "success") {
    //       alert("모집 공고 완료했습니다.");
    //     }
        navigate("/owner/mypage");
      // });
  };

  useEffect(() => {
    setPostData({
      ...postData,
      store_name: recruitData.store_name,
      type: recruitData.types,
      description: recruitData.description,
      start_date: recruitData.start_date,
      end_date: recruitData.end_date,
      start_time: recruitData.start_time,
      end_time: recruitData.end_time,
      price: recruitData.price,
    });
  }, [recruitData]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="pb-16">
      <Header title={"모집공고"} />
      <NavBar mode="OWNER" />
      <div className="mx-8 ">
        <InputValue2
          mode="SELECT"
          label={"알바유형"}
          title={"알바유형 선택"}
          setValue={setValue}
          dict_key={"type"}
          dict_value={recruitData["types"]}
          options={recruitData["types"]}
        />
        <InputValue2
          title="해당 공고에 대한 설명 부탁드려요."
          label={"상세설명"}
          setValue={setValue}
          dict_key={"description"}
          dict_value={recruitData["description"]}
        />
        <InputValue2
          mode="DATE"
          label={"시작날짜"}
          title={"시작 날짜 선택"}
          setValue={setValue}
          dict_key={"start_date"}
          dict_value={recruitData["start_date"]}
        />
        <InputValue2
          mode="DATE"
          label={"종료날짜"}
          title={"종료 날짜 선택"}
          setValue={setValue}
          dict_key={"end_date"}
          dict_value={recruitData["end_date"]}
        />
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
        <InputValue2
          title="시급을 설정해주세요."
          label={"시급설정"}
          setValue={setValue}
          dict_key={"price"}
          dict_value={recruitData["price"]}
        />
      </div>

      <div className="mx-8 mb-8">
        <Button title="모집공고 보내기" onClickEvent={onEnroll} />
      </div>
    </div>
  );
};

export default Recruitpage;
