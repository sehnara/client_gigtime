import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import AddressProps from "./interface";
// import { useDispatch, useSelector } from "react-redux";
// import { setLocation } from "../module/slices/sign";
// import { setAddress } from "../module/slices/owner";

const AddressSearch = ({ mode } : AddressProps) => {
//   const dispatch = useDispatch();

//   const handleComplete = (data) => {
//     let fullAddress = data.jibunAddress;
//     let extraAddress = "";

//     if (data.addressType === "R") {
//       if (data.bname !== "") {
//         extraAddress += data.bname;
//       }
//       if (data.buildingName !== "") {
//         extraAddress +=
//           extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
//       }
//       fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
//     }
//     dispatch(
//       mode === "OWNER" ? setAddress(fullAddress) : setLocation(fullAddress)
//     );
//     setComplete(true);
//   };

  return (<div>
    <p className="mb-4 border-2 p-1 rounded-4">판교</p>
    <DaumPostcode style={{ width:"100%", height:300 }} autoClose={false} onComplete={()=>{}} {...{mode}} />
  </div>);
}

export default AddressSearch;
