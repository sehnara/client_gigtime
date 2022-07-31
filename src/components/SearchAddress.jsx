import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "../module/slices/sign";
import { setAddress } from "../module/slices/owner";

function SearchAddress(props) {
  const { mode, setComplete } = props;
  const dispatch = useDispatch();

  const handleComplete = (data) => {
    let fullAddress = data.jibunAddress;
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
    dispatch(
      mode === "OWNER" ? setAddress(fullAddress) : setLocation(fullAddress)
    );
    setComplete(true);
  };

  return <DaumPostcode onComplete={handleComplete} {...props} />;
}

export default SearchAddress;
