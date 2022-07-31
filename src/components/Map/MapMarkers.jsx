import React, { useEffect } from "react";
import man from "../../images/man.png";
const { kakao } = window;
const MapContainer = ({ worker, owner }) => {
  useEffect(() => {
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(owner.lat, owner.lng),
      level: 10,
    };
    const map = new kakao.maps.Map(container, options);

    const positions = [
      {
        title: "카카오",
        latlng: new kakao.maps.LatLng(worker.lat, worker.lng),
        image:
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
        imageSize: new kakao.maps.Size(24, 35),
      },
      {
        title: "생태연못",
        latlng: new kakao.maps.LatLng(owner.lat, owner.lng),
        image: man,
        imageSize: new kakao.maps.Size(36, 35),
      },
    ];

    for (var i = 0; i < positions.length; i++) {
      // 마커 이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(
        positions[i].image,
        positions[i].imageSize
      );

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });
    }
  }, []);
  return <div id="myMap" className={`w-72 h-48 m-2`}></div>;
};

export default MapContainer;
