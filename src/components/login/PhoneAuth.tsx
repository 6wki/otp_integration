"use client";
import React from "react";
import { useStoreRegister } from "@/utils/store";
import LoginForm from "../loginForm/LoginForm";
import OTPForm from "../otp/Otp";

const Login: React.FC = () => {
  const { hasFilled } = useStoreRegister();

  if (!hasFilled) {
    return (
      <div className="app__container">
        <LoginForm />
        <div id="recaptcha"></div>
      </div>
    );
  } else {
    return (
      <div className="app__container">
        <OTPForm />
        <div id="recaptcha"></div>
      </div>
    );
  }
};

export default Login;
