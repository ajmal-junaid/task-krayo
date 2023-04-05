import React from "react";
import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";
import { CLIENT_KEY } from "../constants";

const LoginPage = () => {
  const handleLogin = (provider, data) => {
    console.log(data, "provider");
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
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="space-y-4 border border-black">
          <LoginSocialGoogle
            client_id={CLIENT_KEY}
            scope="openid profile email"
            discoveryDocs="claims_supported"
            access_type="offline"
            onResolve={({ provider, data }) => {
              // console.log(provider, "porvedfd+", data);
              handleLogin(provider, data);
            }}
            onReject={(err) => {
              console.log(err);
            }}
          >
            <GoogleLoginButton />
          </LoginSocialGoogle>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
