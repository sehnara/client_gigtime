import React, { useEffect } from "react";
const { kakao } = window;
const MapRoute = () => {
  useEffect(() => {
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(37.502, 127.026581),
      level: 10,
    };
    const map = new kakao.maps.Map(container, options);

    var content =
      '<div class="overlaybox" >' +
      '    <div class="boxtitle">1</div>' +
      "</div>";

    // 커스텀 오버레이가 표시될 위치입니다
    for (let i = 0; i < [1, 2, 3, 4, 5].length; i++) {
      var customOverlay = new kakao.maps.CustomOverlay({
        position: new kakao.maps.LatLng(37.49887, `12${i}.02658`),
        content: content,
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
