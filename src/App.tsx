import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Hello from "./pages/hello";

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
        <Route path="/*" element={<Home />} />
        <Route path="/hello" element={<Hello />} />
        {/* <hr/>/ */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
