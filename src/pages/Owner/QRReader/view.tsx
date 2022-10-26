import { useEffect, useState } from "react";
import axios from "axios";
import { QrReader } from "react-qr-reader";
import { AiOutlineExpand } from "react-icons/ai";

import NavBar from "../../../components/Navbar/view";
import Header from "../../../components/Header/view";

const OwnerQrCode = () => {
  const [data, setData] = useState("");
  const [isSuccess, setSuccess] = useState({});

  const postData = async () => {
    const worker_id = Number(data.split(":")[1]);
    await axios
      .post("/owner/qrCode", {
        owner_id: sessionStorage.getItem("owner_id"),
        worker_id,
        time: new Date().toISOString(),
      })
      .then((res) => {
        setSuccess(res.data);
      });
  };

  useEffect(() => {
    if (data === "") return;
    postData();
  }, [data]);

  return (
    <div>
      <Header title="출근 확인" />
      <NavBar mode="OWNER" />
      <div className="relative">
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              setData(result?.text);
            }
            if (!!error) {
              console.info(error);
            }
          }}
          style={{ width: "100%" }}
        />
        <AiOutlineExpand className="text-7xl text-cyan-400  absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        <p className="w-full text-gray-600 text-center text-sm absolute bottom-4 left-1/2 transfrom -translate-x-1/2">
          QR코드/바코드를 스캔하여
          <span className="text-red-500 font-bold"> 출근</span> 체크하세요!
        </p>
      </div>

      {data === "" ? (
        <div></div>
      ) : (
        <div className="text-center mt-32">
          <>
            <p className="text-2xl mb-4">
              <span className="text-cyan-500 font-bold">'출근' </span>확인
              되었습니다.
            </p>
            <p className="text-lg mb-2">
              <span className="font-bold">{isSuccess.name}</span>님, 오늘도
              <span className="text-cyan-500 font-bold"> 안전</span>하게
              일해주세요!
            </p>
          </>
        </div>
      )}
    </div>
  );
};

export default OwnerQrCode;