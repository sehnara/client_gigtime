import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setEmail, setLocation, setName, setRange } from "../module/slices/sign";
import { setOwnerName, setOwnerEmail } from "../module/slices/owner";

function KakaoLoginButton( {mode} ) {    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.Kakao.init(`${process.env.REACT_APP_KAKAO_INIT_KEY}`);
        }
    }, []);


    function kakaoLogin() {
        window.Kakao.Auth.login({
            scope: 'profile_nickname, account_email',
            success: function(response) {
                window.Kakao.API.request({
                    url: '/v2/user/me',
                    success: async (res) => {
                        const kakao_account = res.kakao_account;
                        dispatch(setName(kakao_account.profile.nickname));
                        dispatch(setEmail(kakao_account.email));
                        
                        await axios.post('http://localhost:4000/check/member', 
                            {
                                email: `${kakao_account.email}`
                            }
                        )
                        .then(function (response) {
                            console.log(">>>>>>", 2)
                            console.log(">>>>>>", response)
                            if (response.data['member_type'] === 'worker'){
                                sessionStorage.setItem("worker_id", response.data['worker_id'])
                                dispatch(setLocation(response.data['address']));
                                dispatch(setRange(response.data['range']));
                                navigate('/worker/nearWork');}
                            else if (response.data['member_type'] === 'owner'){
                                console.log(response.data);
                                sessionStorage.setItem("owner_id", response.data['owner_id']);
                                navigate('/owner/mypage');
                            }
                            else{
                                navigate('/login');
                                console.log(response);
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                            // navigate('/login');
                        })
                    }
                });
            },
            fail: function(error) {
                console.log(error);
            }
        });
    }

    return (
        <div className="mt-10">
            <a id="custom-login-btn" onClick={kakaoLogin}>
                <img src="//k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
                width="190"/>
            </a>
        </div>
    );
}

export default KakaoLoginButton;