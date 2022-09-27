import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import InitPage from "./pages/InitPage";
import LoginPage from "./pages/LoginPage";
import OwnerStoreNamePage from "./pages/OwnerStoreNamePage";
import OwnerStoreLocationPage from "./pages/OwnerStoreLocationPage";
import OwnerJobTypePage from "./pages/OwnerJobTypePage";
import OwnerMyPage from "./pages/OwnerMyPage";
import OwnerCompletePage from "./pages/OwnerCompletePage";
import OwnerUploadPage from "./pages/OwnerUploadPage";
import OwnerWagePage from "./pages/OwnerWagePage";
import WorkerLocationPage from "./pages/WorkerLocationPage";
import WorkerDistancePage from "./pages/WorkerDistancePage";
import WorkerHomePage from "./pages/WorkerHomePage";
import WorkerInterviewPage from "./pages/WorkerInterviewPage";
import WorkerNearWorkPage from "./pages/WorkerNearWorkPage.jsx";
import WorkerReserveWorkPage from "./pages/WorkerReserveWorkPage.jsx";
import WorkMyPage from "./pages/WorkMyPage";
import OwnerRecruitNoticePage from "./pages/OwnerRecruitNoticePage";
import WorkerSpeedGetJob from "./pages/WorkerSpeedGetJob";
import WorkerSpeedResultPage from "./pages/WorkerSpeedResultPage";
import CommonInterviewPage from "./pages/CommonInterviewPage";
import { firebaseApp } from "./firebase";
import WorkerQrCode from "./pages/WorkerQrCode";
import OwnerQrCode from "./pages/OwnerQrCode";
import OwnerAngelResult from "./pages/WorkerAngelResult";
import ChatListPage from "./pages/ChatListPage";
import ChatRoomPage from "./pages/ChatRoomPage";
import io from "socket.io-client";
import OwnerAngelPage from "./pages/OwnerAngelPage";

function App() {
  const firebaseMessaging = firebaseApp.messaging();

  firebaseMessaging
    .requestPermission()
    .then(() => {
      return firebaseMessaging.getToken();
    })
    .then(function (token: any) {
      console.log(token);
      sessionStorage.setItem("FCM_TOKEN", token);
    })
    .catch(function (error: any) {
      console.log("FCM Error : ", error);
    });

  firebaseMessaging.onMessage((payload: any) => {
    const { title, body } = payload.data;
    const data = JSON.parse(body);
    console.log("START", title, "DATA", data);

    if (title === "알바천사 콜") {
      if (
        window.confirm(
          title + " : " + data["store_name"] + "에서 알바천사 호출하셨습니다."
        )
      ) {
        sessionStorage.setItem("angel_id", data["angel_id"]);
        window.location.assign(
          `${process.env.REACT_APP_ROUTE_PATH}/worker/AngelResult`
        );
      }
    } else if (title === "알바천사 결과") {
      if (data["result"] === "success") {
        if (
          window.confirm(
            title +
              " : " +
              "알바천사 " +
              data["worker_name"] +
              "님이 수락하셨습니다."
          )
        ) {
          sessionStorage.setItem("angel_id", data["angel_id"]);
          window.location.assign(
            `${process.env.REACT_APP_ROUTE_PATH}/owner/angel`
          );
        }
      }
    } else if (title === "면접 신청") {
      alert(`
        ${data["worker_name"]}님이 면접 신청하셨습니다.
        `);
    } else if (title === "면접 신청결과") {
      alert(
        `${data["store_name"]}에서 면접 신청을 ${
          data["result"] === "accept" ? "수락" : "거절"
        }했습니다.`
      );
    } else if (title === "화상면접 개설") {
      if (
        window.confirm(
          data["store_name"] +
            "와의 화상 면접이 곧 시작합니다. 화상면접에 입장해주세요."
        )
      ) {
        window.location.assign(
          `${process.env.REACT_APP_ROUTE_PATH}/worker/mypage`
        );
      }
    } else if (title === "면접 결과") {
      if (
        window.confirm(
          title + " : " + data["store_name"] + "에서 면접 결과가 왔습니다."
        )
      ) {
        window.location.assign(
          `${process.env.REACT_APP_ROUTE_PATH}/worker/mypage`
        );
      }
    } else if (title === "출석체크") {
      alert(data["worker_name"] + "님이 출근하셨습니다.");
    } else {
    }
  });

  const SOCKET_SERVER_URL = `${process.env.REACT_APP_SOCKET_SERVER}`;
  const socket = io.connect(SOCKET_SERVER_URL);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<InitPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* OWNER */}
        <Route path="/owner/storename" element={<OwnerStoreNamePage />} />
        <Route
          path="/owner/storelocation"
          element={<OwnerStoreLocationPage />}
        />
        <Route path="/owner/jobtype" element={<OwnerJobTypePage />} />
        <Route path="/owner/upload" element={<OwnerUploadPage />} />
        <Route path="/owner/wage" element={<OwnerWagePage />} />
        <Route path="/owner/complete" element={<OwnerCompletePage />} />
        <Route path="/owner/mypage" element={<OwnerMyPage />} />
        <Route path="/owner/recruit" element={<OwnerRecruitNoticePage />} />
        <Route path="/owner/qrCode" element={<OwnerQrCode />} />
        {/* WORKER */}
        <Route path="/worker/distance" element={<WorkerDistancePage />} />
        <Route path="/worker/home" element={<WorkerHomePage />} />
        <Route path="/worker/location" element={<WorkerLocationPage />} />
        <Route path="/worker/interview" element={<WorkerInterviewPage />} />
        <Route path="/worker/nearWork" element={<WorkerNearWorkPage />} />
        <Route path="/worker/reserveWork" element={<WorkerReserveWorkPage />} />
        <Route path="/worker/mypage" element={<WorkMyPage />} />
        <Route path="/worker/speed" element={<WorkerSpeedGetJob />} />
        <Route
          path="/worker/speed/result"
          element={<WorkerSpeedResultPage />}
        />
        <Route path="/worker/qrCode" element={<WorkerQrCode />} />
        <Route path="/worker/AngelResult" element={<OwnerAngelResult />} />
        <Route path="/owner/angel" element={<OwnerAngelPage />} />
        {/* 기타 */}
        <Route
          path="/interview"
          element={<CommonInterviewPage socket={socket} />}
        />
        <Route path="/chatlist" element={<ChatListPage socket={socket} />} />
        <Route path="/chatroom" element={<ChatRoomPage socket={socket} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
