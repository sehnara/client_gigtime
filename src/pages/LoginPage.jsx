import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div>
      <div>
        <Link to="/owner">사장님</Link>
      </div>
      <div>
        <Link to="/worker/location">알바생</Link>
      </div>
    </div>
  );
};

export default LoginPage;
