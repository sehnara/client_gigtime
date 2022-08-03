import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { QrReader } from "react-qr-reader";
import { AiOutlineExpand } from "react-icons/ai";
import axios from "axios";
import NavBar from "../components/NavBar";

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
      <NavBar mode="OWNER" />
      <Header title="출근확인" />
      <div className="bg-gray-200 relative">
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              setData(result?.text);
            }

            if (!!error) {
              console.info(error);
            }
          }}
          e
          style={{ width: "100%" }}
        />
        <AiOutlineExpand className="text-6xl text-cyan-400  absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        <p className="w-full text-gray-600 text-center text-xs absolute bottom-4 left-1/2 transfrom -translate-x-1/2">
          QR코드/바코드를 스캔하여 사장님께
          <span className="text-red-500 font-bold">출석</span>을 알리세요!
        </p>
      </div>

      {/* RESULT */}
      {data === "" ? (
        <div></div>
      ) : (
        <div className="text-center mt-24">
          {isSuccess.success === "success" ? (
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
          ) : isSuccess.success === "notFound" ? (
            <>
              <p className="text-2xl mb-4">
                출근 시간
                <span className="text-cyan-500 font-bold"> '30분 전' </span>부터
              </p>
              <p className="text-lg">출석 체크 가능합니다.</p>
            </>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
};

export default OwnerQrCode;
