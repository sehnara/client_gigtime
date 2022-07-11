import React from 'react';
import DaumPostcode from "react-daum-postcode";

function PopupPostCode(props) {
    const handlePostCode = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        console.log(data)
        console.log(fullAddress)
        console.log(data.zonecode)
        props.onClose()
    }

    const postCodeStyle = {
        display: "block",
        position: "absolute",
        top: "10%",
        width: "600px",
        height: "600px",
        padding: "7px",
    };

    return(
        <div>
            <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />
            <button type='button' onClick={() => {props.onClose()}} className='postCode_btn'>닫기</button>
        </div>
    );
}


export default PopupPostCode;