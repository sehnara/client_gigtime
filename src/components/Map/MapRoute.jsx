import React, { useEffect } from "react";
const { kakao } = window;
const MapRoute = ({ locations }) => {
  useEffect(() => {
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(37.4999269, 127.0365526),
      level: 5,
    };
    const map = new kakao.maps.Map(container, options);

    for (let i = 0; i < locations.length; i++) {
      var customOverlay = new kakao.maps.CustomOverlay({
        position: new kakao.maps.LatLng(locations[i].lat, locations[i].lnt),
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
  return (
    <div>
      <div id="myMap" className={`w-full h-72 `}></div>
      <div className="mx-2 p-2">
        <p className="font-bold my-1">최단거리! 최고수익! 알바추천</p>
        {locations &&
          locations.map((e, index) => {
            return (
              <div
                key={index}
                className="flex space-x-2 items-center border-2 rounded-xl my-2 p-1"
              >
                <div className="flex-1">
                  <div className=" bg-cyan-400 w-8 h-8 rounded-full flex justify-center items-center ">
                    <p className="text-center bg-white w-5 h-5 rounded-full text-sm font-bold">
                      {index + 1}
                    </p>
                  </div>
                </div>
                <p className="flex-4 text-center font-bold ">{e.store}</p>
                <p className="flex-2 text-center text-sm">
                  {`${e.start}`}
                  <span className="text-xs">{`(${e.duration}h)`}</span>
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MapRoute;
