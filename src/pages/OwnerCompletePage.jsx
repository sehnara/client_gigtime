import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import dog from '../images/dog.png';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setBackground, setOwnerEmail, setOwnerName } from '../module/slices/owner';
import axios from 'axios';

function OwnerCompletePage() {
    const navigate = useNavigate();
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setOwnerName(state.sign.name));
        dispatch(setOwnerEmail(state.sign.email));
    }, []);

    async function onClickToRecruit() {
        await axios
            .post(`${process.env.REACT_APP_ROUTE_PATH}/owner/signup`, state.owner)
            .then(function (response) {
                console.log('response >>', response.data);
                if (response.data['result'] === 'success') {
                    sessionStorage.setItem('owner_id', response.data['owner_id']);
                    state.owner.background.append(response.data['owner_id']);
                    axios
                        .post(`${process.env.REACT_APP_ROUTE_PATH}/owner/mypage/imageUpload/background`, state.owner.background)
                        .then((res) => {
                            if (res.data.state === 'success') {
                                console.log('가게 전경이 적용되었습니다.');
                                navigate('/owner/recruit');
                            } else {
                                console.log('error');
                            }
                        });
                } else {
                    // console.log(response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    console.log('!!!!@!#', state.owner);

    async function onClickToHome() {
        await axios
            .post(`${process.env.REACT_APP_ROUTE_PATH}/owner/signup`, state.owner)
            .then(function (response) {
                if (response.data['result'] === 'success') {
                    sessionStorage.setItem('owner_id', response.data['owner_id']);
                    navigate('/owner/mypage');
                } else {
                    // console.log(response.data["owner_id"]);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className="h-screen pt-40">
            <div className="m-8">
                <h2 className="text-3xl font-bold">
                    <span className="text-cyan-500">바로알바</span>의
                </h2>
                <h2 className="text-3xl font-bold">가족이 되신것을</h2>
                <h2 className="text-3xl font-bold">환영합니다!</h2>
                <img width={200} className="transform translate-x-36 translate-y-14 " src={dog} />
            </div>
            <div className="ml-8 mr-8 pt-1">
                <Button title="모집공고 작성" onClickEvent={onClickToRecruit} />
                <button className="mt-2 font-bold w-full text-gray-500" onClick={onClickToHome}>
                    홈으로
                </button>
            </div>
        </div>
    );
}

export default OwnerCompletePage;
