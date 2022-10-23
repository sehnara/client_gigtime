import { firebaseApp } from "./firebase";

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
