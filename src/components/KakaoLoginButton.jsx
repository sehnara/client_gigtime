import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setEmail,
  setLocation,
  setName,
  setRange,
} from "../module/slices/sign";

// 'id': '1',
// 'user_flag': 'w or o',
// 'token': 'token string'

function KakaoLoginButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.Kakao.init(`${process.env.REACT_APP_KAKAO_INIT_KEY}`);
    }
  }, []);

  function kakaoLogin() {
    window.Kakao.Auth.login({
      scope: "profile_nickname, account_email",
      success: function (response) {
        window.Kakao.API.request({
          url: "/v2/user/me",
          success: async (res) => {
            const kakao_account = res.kakao_account;
            dispatch(setName(kakao_account.profile.nickname));
            dispatch(setEmail(kakao_account.email));

            await axios
              .post(`${process.env.REACT_APP_ROUTE_PATH}/check/member`, {
                email: `${kakao_account.email}`,
              })
              .then(function (response) {
                if (response.data["member_type"] === "worker") {
                  sessionStorage.setItem(
                    "worker_id",
                    response.data["worker_id"]
                  );
                  dispatch(setLocation(response.data["address"]));
                  dispatch(setRange(response.data["range"]));
                } else if (response.data["member_type"] === "owner") {
                  sessionStorage.setItem("owner_id", response.data["owner_id"]);
                } else {
                }
                return response;
              })
              .then(async (res) => {
                await axios.post(
                  `${process.env.REACT_APP_ROUTE_PATH}/permission`,
                  {
                    id: sessionStorage.getItem(
                      res.data["member_type"] === "worker"
                        ? "worker_id"
                        : "owner_id"
                    ),
                    user_flag: res.data["member_type"] === "worker" ? "w" : "o",
                    token: sessionStorage.getItem("FCM_TOKEN"),
                  }
                );
                if (res.data["member_type"] === "worker") {
                  navigate("/worker/home");
                } else if (res.data["member_type"] === "owner") {
                  navigate("/owner/mypage");
                } else {
                  navigate("/login");
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          },
        });
      },
      fail: function (error) {
        console.log(error);
      },
    });
  }

  return (
    <div className="mt-10">
      <a id="custom-login-btn" onClick={kakaoLogin}>
        <img
          src="//k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
          width="190"
        />
      </a>
    </div>
  );
}

export default KakaoLoginButton;
