import React, { useEffect } from "react";
const { kakao } = window;
const MapRoute = () => {
  const mock = [
    {
      store: "수수커피 강남N타워점",
      lat: "37.4997777",
      lnt: "127.0324107",
    },
    {
      store: "클로리스 역삼 GFC점",
      lat: "37.4999269",
      lnt: "127.0365526",
    },
    {
      store: "바게트케이",
      lat: "37.5002567",
      lnt: "127.0414329",
    },
    {
      store: "브루커피",
      lat: "37.4967293",
      lnt: "127.0294237",
    },
    {
      store: "커피스니퍼 센터필드점",
      lat: "37.5030426",
      lnt: "127.041588",
    },
  ];

  useEffect(() => {
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(37.502, 127.026581),
      level: 10,
    };
    const map = new kakao.maps.Map(container, options);

    // 커스텀 오버레이가 표시될 위치입니다
    for (let i = 0; i < mock.length; i++) {
      var customOverlay = new kakao.maps.CustomOverlay({
        position: new kakao.maps.LatLng(mock[i].lat, mock[i].lnt),
        content:
          '<div class="overlaybox" >' +
          `    <div class="boxtitle">${i + 1}</div>` +
          "</div>",
        xAnchor: 0.3,
        yAnchor: 0.91,
      });
      // 커스텀 오버레이를 지도에 표시합니다
      customOverlay.setMap(map);
    }
  }, []);
  return <div id="myMap" className={`w-72 h-48 m-2`}></div>;
};

export default MapRoute;

// 클로리스 역삼 GFC점
// 서울 강남구 테헤란로 152 강남파이낸스센터 지하1층
// 37.49992690000000000
// 127.03655260000000000

// 바게트케이
// 서울 강남구 테헤란로34길 21-10
// 37.50025670000000000
// 127.04143290000000000

// 브루커피 강남타워300점
// 서울 강남구 테헤란로2길 21 1
// 37.49672930000000000
// 127.02942370000000000

// 커피스니퍼 센터필드점
// 서울 강남구 테헤란로 231 센터필드 지상 2층 E207호 커피스니퍼
// 37.50304260000000000
// 127.04158800000000000
