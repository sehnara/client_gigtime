import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

function App() {
  const [isTokenFound, setTokenFound] = useState(false);
  const [myToken, setMyToken] = useState("");
  const firebaseMessaging = firebaseApp.messaging();

  firebaseMessaging
    .requestPermission()
    .then(() => {
      return firebaseMessaging.getToken(); // 등록 토큰 받기
    })
    .then(function (token: any) {
      console.log(token); //토큰 출력
      setMyToken(token);
    })
    .catch(function (error: any) {
      console.log("FCM Error : ", error);
    });

  firebaseMessaging.onMessage((payload: any) => {
    // console.log(payload.notification.body);

    const { title, body } = payload.notification;
    alert(
      "알림 ::: " +
        payload.notification.title +
        "//////" +
        payload.notification.body
    );
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<InitPage />} />
        <Route path="/login" element={<LoginPage />} />
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
        <Route path="/worker/location" element={<WorkerLocationPage />} />
        <Route path="/worker/distance" element={<WorkerDistancePage />} />
        <Route path="/worker/home" element={<WorkerHomePage />} />

        {/* 면접 신청 페이지 */}
        <Route path="/worker/interview" element={<WorkerInterviewPage />} />
        {/* 주변 일감 */}
        <Route path="/worker/nearWork" element={<WorkerNearWorkPage />} />
        {/* 알바 예약*/}
        <Route path="/worker/reserveWork" element={<WorkerReserveWorkPage />} />
        {/* 마이 페이지 */}
        <Route path="/worker/mypage" element={<WorkMyPage />} />
        {/* 면접 */}
        <Route path="/interview" element={<CommonInterviewPage />} />
        {/* 바로 알바 */}
        <Route path="/worker/speed" element={<WorkerSpeedGetJob />} />
        {/* 바로 알바 결과*/}
        <Route
          path="/worker/speed/result"
          element={<WorkerSpeedResultPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
