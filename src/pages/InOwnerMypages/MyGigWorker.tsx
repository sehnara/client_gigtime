import React from "react";
import GigWorker from "../../components/GigWorker";

const MyGigWorker = () => {
  return (
    <div className="m-8">
      <h1 className="text-lg mb-3">총 <strong>8명</strong>의 긱워커</h1>
      <div className="w-full h-full rounded-xl shadow-lg shadow-black-500 mr-2 mb-2 text-center flex flex-col p-4">
        <GigWorker bottomBorder="border-b-2"/>
        <GigWorker bottomBorder="border-b-2"/>
        <GigWorker bottomBorder="border-b-2"/>
        <GigWorker bottomBorder="border-b-2"/>
        <GigWorker bottomBorder="border-b-2"/>
        <GigWorker bottomBorder="border-b-2"/>
        <GigWorker bottomBorder="border-b-2"/>
        <GigWorker bottomBorder="border-b-2"/>
      </div>
    </div>
  );
};

export default MyGigWorker;
