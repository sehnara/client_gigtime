import React, { useEffect, useRef, useState } from "react";
import "tailwindcss/tailwind.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import RootRouter from "./router/rootRouter";

// import io from "socket.io-client";

function App() {
  // const SOCKET_SERVER_URL = `${process.env.REACT_APP_SOCKET_SERVER}`;
  // const socket = io.connect(SOCKET_SERVER_URL);

  return (
    <BrowserRouter>
      <Routes>
        {RootRouter.map((route) => (
          <Route path={route.path} element={<route.element />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
