import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "../module/slices/sign";

function SearchAddress(props) {
  const state = useSelector((state) => state);
  const signData = state.sign;
  const dispatch = useDispatch();

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    dispatch(setLocation(data.jibunAddress)); 
    console.log(data.jibunAddress);
    // console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  };

  const handleSearch = (data) => {
    console.log(data);
  };

  return (
    <DaumPostcode
      onComplete={handleComplete}
      onSearch={handleSearch}
      {...props}
    />
  );
}

export default SearchAddress;
