import LoginPage from "../pages/Login/view";
import SignUpPage from "../pages/Signup/view";
import SignUpStorePage from "../pages/Owner/SignUpStore/view";
import SignUpAddressPage from "../pages/Owner/SignUpAddress/view";
import SignUpJobs from "../pages/Owner/SignUpJobs/view";
import SignUpDescription from "../pages/Owner/SignUpDescription/view";
import SignUpWage from "../pages/Owner/SignUpWage/view";
import SignUpComplete from "../pages/Owner/SignUpComplete/view";
import MyPage from "../pages/Owner/Mypage/view";
import Recruit from "../pages/Owner/Recruit/view";
import OwnerQrCode from "../pages/Owner/QRReader/view";
// import OwnerAngelResult from "../pages/WorkerAngelResult";
// import OwnerAngelPage from "../pages/OwnerAngelPage";

import SignUpLocation from "../pages/Worker/SignUpLocation/view";
import SignUpDistance from "../pages/Worker/SignUpDistance/view";
import MainPage from "../pages/Worker/Main/view";
import WorkerQrCode from "../pages/Worker/QRcode/view";
// import WorkerReserveWorkPage from "../pages/WorkerReserveWorkPage.jsx";
// import WorkMyPage from "../pages/WorkMyPage";
import WorkerRecommend from "../pages/Worker/Recommend/Main/view";
import WorkerRecommendResult from "../pages/Worker/Recommend/Result/view";

// import WorkerInterviewPage from "../pages/WorkerInterviewPage";
// import WorkerNearWorkPage from "../pages/WorkerNearWorkPage.jsx"; // 이 페이지 없애자
// import CommonInterviewPage from "../pages/CommonInterviewPage";
// import ChatListPage from "../pages/ChatListPage";
// import ChatRoomPage from "../pages/ChatRoomPage";

interface RouterInterface {
  path: string;
  element: any;
}

const RootRouter: RouterInterface[] = [
  { path: "/*", element: LoginPage }, 
  { path: "/signUp", element: SignUpPage }, 
  { path: "/owner/storename", element: SignUpStorePage }, 
  { path: "/owner/storelocation", element: SignUpAddressPage }, 
  { path: "/owner/jobtype", element: SignUpJobs }, 
  { path: "/owner/upload", element: SignUpDescription },
  { path: "/owner/wage", element: SignUpWage },
  { path: "/owner/complete", element: SignUpComplete },
  { path: "/owner/mypage", element: MyPage },
  { path: "/owner/recruit", element: Recruit },
  { path: "/owner/qrCode", element: OwnerQrCode },
    // { path: "/owner/angel", element: OwnerAngelPage },

  { path: "/worker/home", element: MainPage },
  { path: "/worker/location", element: SignUpLocation },
  { path: "/worker/distance", element: SignUpDistance },
    // { path: "/worker/interview", element: WorkerInterviewPage },
    // { path: "/worker/nearWork", element: WorkerNearWorkPage },
  //   { path: "/worker/reserveWork", element: WorkerReserveWorkPage },
  //   { path: "/worker/mypage", element: WorkMyPage },
    { path: "/worker/speed", element: WorkerRecommend },
    { path: "/worker/speed/result", element: WorkerRecommendResult },
    { path: "/worker/qrCode", element: WorkerQrCode },
  //   { path: "/worker/AngelResult", element: OwnerAngelResult },
  //    {path : "/interview", element : CommonInterviewPage socket={socket}},
  //    {path : "/chatlist", element : ChatListPage socket={socket}},
  //    {path : "/chatroom", element : ChatRoomPage socket={socket}},
];

export default RootRouter;
