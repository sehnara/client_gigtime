import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import RecruitList from "../../../../components/List/RecruitList/view";

const RecruitPage = () => {
  const keyRef = useRef(1);
  const [data, setData] = useState([[]]);

//   const getData = async () => {
//     await axios
//       .post(`${process.env.REACT_APP_ROUTE_PATH}/owner/mypage/work`, {
//         owner_id: Number(sessionStorage.getItem("owner_id")),
//       })
//       .then((res) => {
//         setData(res.data);
//       });
//   };
  
//   useEffect(() => {
//     getData();
//   }, []);

  return (
    <div className="m-8 mb-36">
      {data === undefined 
      ? (
        "모집내역이 없습니다."
      ) 
      : (
        data.map((e) => {
          keyRef.current += 1;
          return (
            <RecruitList
              key={keyRef.current}
              date={e[0]}
              type={e[1]}
              datas={e.slice(5)}
              mode={"OWNER"}
            />
          );
        })
      )}
    </div>
  );
};

export default RecruitPage;
