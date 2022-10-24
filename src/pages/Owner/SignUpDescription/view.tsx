import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Button from '../../../components/Buttons/Normal/view';
import Header from '../../../components/Header/view';
import SignUpForm from '../../../components/Forms/SignUp/view';
import {backgroundImageChangedHandler, encodeFileToBase64} from '../../../services/file'
import { useRecoilState } from 'recoil';
import { SignUpState } from '../../../context/signUp';

function SignUpDescription() {
    const navigate = useNavigate();
    const [sign, setSign] = useRecoilState(SignUpState)
    return (
        <>
            <Header title="회원가입" />
            <div id="search" className="m-8 mt-10">
                <p className="text-sm mb-4">매장 소개 및 매장 프로필 사진 입력해주세요</p>
                <SignUpForm title={'매장 소개'} mode={'description'} state={SignUpState}/>
            </div>

            <div id="search" className="m-8">
                <div className="mb-4">
                    <p className="text-sm mb-1">매장 프로필 사진</p>
                    <p className="text-xs text-red-500 text-slate-500">*등록하신 사진이 알바 모집공고에 노출됩니다.</p>
                    
                    <div className='mt-4'>
                        <input className="text-xs" type="file" 
                            onChange={(e) => {
                                const img = backgroundImageChangedHandler(e)
                                encodeFileToBase64(img, (e)=>{setSign({...sign, profile: e})})
                                setSign({...sign, 
                                    background : img, 
                                })
                            }} 
                        />
                    </div>
                </div>
                <img className="object-cover w-full" src={sign.profile} />
                <Button onClickEvent={()=>{navigate('/owner/wage')}} title="다음" />
            </div>
        </>
    );
}

export default SignUpDescription;
