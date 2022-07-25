import React, { useState } from "react";
import Header from "../components/Header";
import { QrReader } from "react-qr-reader";
import { AiOutlineExpand } from "react-icons/ai";

const OwnerQrCode = () => {
  const [data, setData] = useState("");

  return (
    <div>
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
          <p className="text-2xl mb-4">
            <span className="text-cyan-500 font-bold">'출근' </span>확인
            되었습니다.
          </p>
          <p className="text-lg mb-2">
            <span className="font-bold">{data}</span>님, 오늘도
            <span className="text-cyan-500 font-bold"> 안전</span>하게
            일해주세요!
          </p>
        </div>
      )}
    </div>
  );
};

export default OwnerQrCode;
