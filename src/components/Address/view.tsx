import React from "react";
import AddressProps from "./interface";

import { useRecoilState } from "recoil";
import DaumPostcode from "react-daum-postcode";

const AddressSearch = ({ mode,state } : AddressProps) => {
  const [sign, setSign] = useRecoilState(state)

  const handleComplete = (data:any) => {
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
    setSign({...sign, [mode] : fullAddress})
  };
  
  return (<div>
    <p className="mb-4 border-2 p-1 rounded-4 h-10 overflow-hidden">{
      sign.address.length >= 24 
      ? sign.address.slice(0,25) 
      : sign.address }
    </p>
    <DaumPostcode 
      style={{ width:"100%", height:300 }} 
      autoClose={false} 
      onComplete={handleComplete} 
      {...{mode, state}}
    />
  </div>);
}

export default AddressSearch;
