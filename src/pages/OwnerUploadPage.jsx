import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BodyTop from '../components/BodyTop';
import Button from '../components/Button';
import Header from '../components/Header';
import InputValue from '../components/InputValue';
import owner from '../images/owner.png';
import { setDescription, setBackground } from '../module/slices/owner';
import { useSelector, useDispatch } from 'react-redux';

function OwnerUploadPage() {
    const [value, setValue] = useState('');
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(owner);
    const [background, setBackgroundImage] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    console.log('>>>>>', state.owner);

    const encodeFileToBase64 = (fileBlob) => {
        const reader = new FileReader();

        reader.readAsDataURL(fileBlob);

        return new Promise((resolve) => {
            reader.onload = () => {
                setImage(reader.result);

                resolve();
            };
        });
    };

    function onClickToNext() {
        dispatch(setDescription(value));
        dispatch(setBackground(background));
        navigate('/owner/wage');
    }

    const backgroundImageChangedHandler = (event) => {
        let imageFile = event.target.files[0];
        encodeFileToBase64(imageFile);

        setFile(imageFile);
        let data = new FormData();
        data.append('background', file);
        setBackgroundImage(data);
    };

    const backgroundImageUploadHandler = () => {
        // 해당 이미지 파일을 리덕스에 담고 CompletePage에서 진행해야할 것 같음.
        console.log(file);
        if (file) {
            let data = new FormData();
            data.append('background', file);

            // data.append('id', 1);
            axios.post(`${process.env.REACT_APP_ROUTE_PATH}/owner/mypage/imageUpload/background`, data).then((res) => {
                if (res.data.state === 'success') {
                    alert('가게 전경이 적용되었습니다.');
                    setBackgroundImage(`${process.env.REACT_APP_S3_PATH}${res.data.url}`);
                }
            });
        } else {
            alert('가게의 전경을 선택해주세요.');
        }
    };

    return (
        <>
            <Header title="회원가입" />
            <BodyTop title="매장정보" />
            <div id="search" className="m-8 mt-10">
                <div className="mb-4">
                    <p className="text-lg font-bold">사장님의 매장을</p>
                    <p className="text-lg font-bold">조금 더 알려주세요.</p>
                </div>
                <div className="flex p-1">
                    <img className="w-20 mr-5" src={image} />
                    <div className="pt-2">
                        <p className="text-lg mb-1 font-bold">{state.owner.store_name}</p>
                        <p className="text-slate-500">{state.owner.location}</p>
                    </div>
                </div>
                <InputValue placeHorder={'한 줄 소개 입력'} value={value} setValue={setValue} />
            </div>
            <div id="search" className="m-8">
                <div className="mb-4">
                    <p className="text-lg font-bold mb-1">매장사진 등록</p>
                    <p className="text-slate-500">등록하신 사진이 알바 모집공고에 노출됩니다.</p>

                    <input type="file" onChange={backgroundImageChangedHandler} />
                    {/* <Button title="업로드" width={300} height={50} onClickEvent={backgroundImageUploadHandler} /> */}
                    {/* <img width="100vh" height="100vh" alt="logo" src={`${background}`} /> */}
                </div>
                <img className="w-full" src={image} />
                <Button onClickEvent={onClickToNext} title="완료" />
            </div>
        </>
    );
}

export default OwnerUploadPage;
