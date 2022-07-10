import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InitPage from "./pages/InitPage";
import LoginPage from "./pages/LoginPage";
import OwnerPage from "./pages/OwnerPage";
import WorkerLocationPage from "./pages/WorkerLocationPage";
import WorkerDistancePage from "./pages/WorkerDistancePage";
import WorkerHomePage from "./pages/WorkerHomePage";

function App() {
  //GET TEST
  const getTest = async () => {
    const response = await axios("http://localhost:8080/tweets").then((res) => {
      const data = res.data;
      const a = data.name;
      console.log(a);
    });
    return response;
  };

  useEffect(() => {
    getTest();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<InitPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/owner" element={<OwnerPage />} />
        <Route path="/worker/location" element={<WorkerLocationPage />} />
        <Route path="/worker/distance" element={<WorkerDistancePage />} />
        <Route path="/worker/home" element={<WorkerHomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
