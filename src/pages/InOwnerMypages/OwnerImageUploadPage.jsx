import React, { useState } from 'react';
import axios from 'axios';
import Button from '../../components/Button';

const OwnerImageUploadPage = () => {
    const [file, setFile] = useState(null);
    const [logo, setLogo] = useState(null);
    const [background, setBackground] = useState(null);

    const logoImageChangedHandler = (event) => {
        setFile(event.target.files[0]);
        console.log(event.target.files[0]);
    };

    const backgroundImageChangedHandler = (event) => {
        setFile(event.target.files[0]);
    };

    const logoImageUploadHandler = () => {
        if (file) {
            let image = new FormData();
            image.append('logo', file);
            // image.append('id', 1);
            axios.post(`${process.env.REACT_APP_ROUTE_PATH}/owner/mypage/imageUpload/logo`, image).then((res) => {
                if (res.data.state === 'success') {
                    alert('가게 로고가 적용되었습니다.');
                    setLogo(`${process.env.REACT_APP_S3_PATH}${res.data.url}`);
                }
            });
        } else {
            alert('가게의 로고를 선택해주세요.');
        }
    };
    const backgroundImageUploadHandler = () => {
        if (file) {
            let image = new FormData();
            image.append('background', file);
            // image.append('id', 1);
            axios.post(`${process.env.REACT_APP_ROUTE_PATH}/owner/mypage/imageUpload/background`, image).then((res) => {
                if (res.data.state === 'success') {
                    alert('가게 전경이 적용되었습니다.');
                    setBackground(`${process.env.REACT_APP_S3_PATH}${res.data.url}`);
                }
            });
        } else {
            alert('가게의 전경을 선택해주세요.');
        }
    };
    return (
        <>
            <div>
                <h3 style={{ color: '#555', marginLeft: '12px' }}>로고 이미지 업로드</h3>
                <input type="file" onChange={logoImageChangedHandler} />
                <Button title="업로드" width={200} height={50} onClickEvent={logoImageUploadHandler} />
                <img width="100vh" height="200vh" alt="logo" src={`${logo}`} />
            </div>
            <div>
                <h3 style={{ color: '#555', marginLeft: '12px' }}>전경 이미지 업로드</h3>
                <input type="file" onChange={backgroundImageChangedHandler} />
                <Button title="업로드" width={200} height={50} onClickEvent={backgroundImageUploadHandler} />
                <img width="100vh" height="100vh" alt="logo" src={`${background}`} />
            </div>
        </>
    );
};

export default OwnerImageUploadPage;
