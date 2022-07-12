import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function KakaoLoginButton() {
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
                console.log(response);
                window.Kakao.API.request({
                    url: '/v2/user/me',
                    success: (res) => {
                        console.log(res);
                        const kakao_account = res.kakao_account;
                        const nickName = kakao_account.profile.nickname
                        const email = kakao_account.email
                        axios.post('/worker/signup', 
                            {
                                email: `${email}`
                            }
                        )
                        .then(function (response) {
                            if (response === 'worker')
                                navigate('/worker/nearWork');
                            else if (response === 'owner')
                                navigate('/owner/mypage')
                            else
                                navigate('/login')
                        })
                        .catch(function (error) {
                            console.log(error);
                            navigate('/login');
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