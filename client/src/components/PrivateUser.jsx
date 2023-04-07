import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateUser = ({provider}) => {
  return provider ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateUser;
