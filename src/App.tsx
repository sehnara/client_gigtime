import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import InitPage from './pages/InitPage';
import LoginPage from './pages/LoginPage';
import OwnerStoreNamePage from './pages/OwnerStoreNamePage';
import OwnerStoreLocationPage from './pages/OwnerStoreLocationPage';
import OwnerJobTypePage from './pages/OwnerJobTypePage';
import OwnerMyPage from './pages/OwnerMyPage';
import OwnerCompletePage from './pages/OwnerCompletePage';
import OwnerUploadPage from './pages/OwnerUploadPage';
import OwnerWagePage from './pages/OwnerWagePage';
import WorkerLocationPage from './pages/WorkerLocationPage';
import WorkerDistancePage from './pages/WorkerDistancePage';
import WorkerHomePage from './pages/WorkerHomePage';
import WorkerInterviewPage from './pages/WorkerInterviewPage';
import WorkerNearWorkPage from './pages/WorkerNearWorkPage.jsx';
import WorkerReserveWorkPage from './pages/WorkerReserveWorkPage.jsx';
import WorkMyPage from './pages/WorkMyPage';
import OwnerRecruitNoticePage from './pages/OwnerRecruitNoticePage';
import WorkerSpeedGetJob from './pages/WorkerSpeedGetJob';
import WorkerSpeedResultPage from './pages/WorkerSpeedResultPage';
import CommonInterviewPage from './pages/CommonInterviewPage';
import io from 'socket.io-client';
import OwnerImageUploadPage from './pages/InOwnerMypages/OwnerImageUploadPage';

function App() {
    // const onTest = async () => {
    //   await axios
    //     .get(`${process.env.REACT_APP_ROUTE_PATH}` + "/")
    //     .then((res) => console.log(res.data))
    //     .catch();
    // };

    // useEffect(() => {
    //   onTest();
    // }, []);

    //const users = useSelector<ReducerType, User[]>((state) => state.users);
    //const dispatch = useDispatch();

    //useEffect(() => {
    // dispatch(addUser({ id: 3, name: "강세훈" }));
    //}, []);
    const SOCKET_SERVER_URL = `${process.env.REACT_APP_SOCKET_SERVER}`;
    const socket = io.connect(SOCKET_SERVER_URL);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<InitPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/owner/storename" element={<OwnerStoreNamePage />} />
                <Route path="/owner/storelocation" element={<OwnerStoreLocationPage />} />
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
                <Route path="/interview" element={<CommonInterviewPage socket={socket} />} />
                {/* 바로 알바 */}
                <Route path="/worker/speed" element={<WorkerSpeedGetJob />} />
                {/* 바로 알바 결과*/}
                <Route path="/worker/speed/result" element={<WorkerSpeedResultPage />} />
                {/* 주인 로고, 전경 업로드 */}
                <Route path="owner/mypage/imageUpload" element={<OwnerImageUploadPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
