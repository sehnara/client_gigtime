import React, { useEffect, useState } from "react";

const { kakao } = window;

const Map = ({ level, width, height, address, range }) => {
  const [location, setLocation] = useState({
    center: { lat: 33.450701, lng: 126.570667 },
  });
  let circle;

  const drawCircle = () => {
    console.log("location >>>", location);

    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(location.center.lat, location.center.lng),
      isPanto: true,
      level,
    };
    const map = new kakao.maps.Map(container, options);
    // 2. ADDRESS -> COORDS
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setLocation({ center: { lat: result[0].y, lng: result[0].x } });
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        const marker = new kakao.maps.Marker({
          map,
          position: coords,
        });

        circle = new kakao.maps.Circle({
          center: new kakao.maps.LatLng(result[0].y, result[0].x),
          radius: range,
          strokeWeight: 3,
          strokeColor: "#02b8cc",
          strokeOpacity: 0.7,
          strokeStyle: "strict",
          fillColor: "#16effa",
          fillOpacity: 0.4,
        });

        map.setCenter(coords);
        circle.setMap(map);
      }
    });
  };

  useEffect(() => {
    drawCircle();
  }, [range]);

  return <div id="myMap" className={`w-${width} h-${height}`}></div>;
};

export default Map;
