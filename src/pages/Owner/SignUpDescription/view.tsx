import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Buttons/Normal/view';
import Header from '../../../components/Header/view';
import SignUpForm from '../../../components/Forms/SignUp/view';
import { setDescription, setBackground } from '../../../module/slices/owner';
import { useSelector, useDispatch } from 'react-redux';

function SignUpDescription() {
    const [value, setValue] = useState('');
    const [image, setImage] = useState<any>('');
    const [background, setBackgroundImage] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const state = useSelector((state) => state);

    const encodeFileToBase64 = (fileBlob:any) => {
        const reader = new FileReader();

        reader.readAsDataURL(fileBlob);

        return new Promise((resolve) => {
            reader.onload = () => {
                setImage(reader.result);
                // resolve();
            };
        });
    };

    function onClickToNext() {
        dispatch(setDescription(value));
        dispatch(setBackground(background));
        navigate('/owner/wage');
    }

    const backgroundImageChangedHandler = (event:any) => {
        let imageFile = event.target.files[0];
        console.log(event.target.files);

        if(['image/png', 'image/jpeg', 'image/jpg', 'image/bmp'].includes(imageFile.type)){
            if(imageFile.size < 1024 * 1024 * 10){
                encodeFileToBase64(imageFile);
                setBackgroundImage(imageFile);}
            else{
                alert("10MB보다 큰 이미지는 올릴 수 없습니다.");
            
            }
        }else{
            alert("지원하지 않는 파일 형식입니다. 이미지를 올려주세요.");
        }
    };

    return (
        <>
            <Header title="회원가입" />
            <div id="search" className="m-8 mt-10">
                <p className="text-sm mb-4">매장 소개 및 매장 프로필 사진 입력해주세요</p>
                <SignUpForm title={'매장 소개'}placeholder ={''} value={''} setValue={() => {}} />
            </div>

            <div id="search" className="m-8">
                <div className="mb-4">
                    <p className="text-sm mb-1">매장 프로필 사진</p>
                    <p className="text-xs text-red-500 text-slate-500">*등록하신 사진이 알바 모집공고에 노출됩니다.</p>

                    <div className='mt-4'>
                        <input className="text-xs" type="file" onChange={backgroundImageChangedHandler} />
                        {
                            background === null ? <p></p> : <img width="100vh" height="100vh" alt="logo" src={`${background}`} />
                        }
                        
                    </div>
                </div>
                <img className="object-cover w-full" src={image} />
                <Button onClickEvent={onClickToNext} title="다음" />
            </div>
        </>
    );
}

export default SignUpDescription;
