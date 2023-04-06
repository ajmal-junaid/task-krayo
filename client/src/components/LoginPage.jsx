import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import Swal from "sweetalert2";
import instance from "../utils/axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate()
  const handleLogin = (provider) => {
    instance.post("/signin", provider).then((res) => {
      navigate('/home')
    })
      .catch((err)=>{
      console.log("err",err);
    })
  };
  return (
    <>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900 text-center">
            Login
          </h1>
        </div>
      </header>
      <div className="flex flex-col items-center pt-32 h-screen bg-gray-100">
        <div className="space-y-4 border border-black">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              handleLogin(credentialResponse);
              new Swal("success", "login success", "success");
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
