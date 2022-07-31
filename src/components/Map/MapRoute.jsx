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
      center: new kakao.maps.LatLng(37.4999269, 127.0365526),
      level: 5,
    };
    const map = new kakao.maps.Map(container, options);

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
      customOverlay.setMap(map);
    }
  }, []);
  return <div id="myMap" className={`w-full h-96 m-2`}></div>;
};

export default MapRoute;
