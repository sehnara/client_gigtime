import LoginPage from "../pages/Login/view";
import SignUpPage from "../pages/Signup/view";
import SignUpStorePage from "../pages/Owner/SignUpStore/view";
import SignUpAddressPage from "../pages/Owner/SignUpAddress/view";
import OwnerJobTypePage from "../pages/Owner/SignUpJobs/view";
import OwnerUploadPage from "../pages/Owner/SignUpDescription/view";
import OwnerWagePage from "../pages/OwnerWagePage";
// import OwnerCompletePage from "../pages/OwnerCompletePage";

// import OwnerMyPage from "../pages/OwnerMyPage";
// import WorkerLocationPage from "../pages/WorkerLocationPage";
// import WorkerDistancePage from "../pages/WorkerDistancePage";
// import WorkerHomePage from "../pages/WorkerHomePage";
// import WorkerInterviewPage from "../pages/WorkerInterviewPage";
// import WorkerNearWorkPage from "../pages/WorkerNearWorkPage.jsx";
// import WorkerReserveWorkPage from "../pages/WorkerReserveWorkPage.jsx";
// import WorkMyPage from "../pages/WorkMyPage";
// import OwnerRecruitNoticePage from "../pages/OwnerRecruitNoticePage";
// import WorkerSpeedGetJob from "../pages/WorkerSpeedGetJob";
// import WorkerSpeedResultPage from "../pages/WorkerSpeedResultPage";
// import CommonInterviewPage from "../pages/CommonInterviewPage";
// import WorkerQrCode from "../pages/WorkerQrCode";
// import OwnerQrCode from "../pages/OwnerQrCode";
// import OwnerAngelResult from "../pages/WorkerAngelResult";
// import ChatListPage from "../pages/ChatListPage";
// import ChatRoomPage from "../pages/ChatRoomPage";
// import OwnerAngelPage from "../pages/OwnerAngelPage";

interface RouterInterface {
  path: string;
  element: any;
}

const RootRouter: RouterInterface[] = [
  { path: "/*", element: LoginPage },
  { path: "/signUp", element: SignUpPage },
  { path: "/owner/storename", element: SignUpStorePage },
  { path: "/owner/storelocation", element: SignUpAddressPage },
  { path: "/owner/jobtype", element: OwnerJobTypePage },
  { path: "/owner/upload", element: OwnerUploadPage },
  { path: "/owner/wage", element: OwnerWagePage },
  //   { path: "/owner/complete", element: OwnerCompletePage },
  //   { path: "/owner/mypage", element: OwnerMyPage },
  //   { path: "/owner/recruit", element: OwnerRecruitNoticePage },
  //   { path: "/owner/qrCode", element: OwnerQrCode },
  //   { path: "/worker/distance", element: WorkerDistancePage },
  // { path: "/worker/home", element: WorkerHomePage },
    // { path: "/worker/location", element: WorkerLocationPage },
  //   { path: "/worker/interview", element: WorkerInterviewPage },
  //   { path: "/worker/nearWork", element: WorkerNearWorkPage },
  //   { path: "/worker/reserveWork", element: WorkerReserveWorkPage },
  //   { path: "/worker/mypage", element: WorkMyPage },
  //   { path: "/worker/speed", element: WorkerSpeedGetJob },
  //   { path: "/worker/speed/result", element: WorkerSpeedResultPage },
  //   { path: "/worker/qrCode", element: WorkerQrCode },
  //   { path: "/worker/AngelResult", element: OwnerAngelResult },
  //   { path: "/owner/angel", element: OwnerAngelPage },
  //    {path : "/interview", element : CommonInterviewPage socket={socket}},
  //    {path : "/chatlist", element : ChatListPage socket={socket}},
  //    {path : "/chatroom", element : ChatRoomPage socket={socket}},
];

export default RootRouter;
