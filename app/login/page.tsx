"use client";
import React, { useState } from "react";
import styles from "./Login.module.css";
import { signinForm } from "@/public/assets/formData";
import Form from "@/components/Form";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { loginUser, selectApp } from "../redux/feature/slice";
import Alert from "@/components/Alert";

const Login = () => {
  const { showAlert } = useAppSelector(selectApp);
  const dispatch = useAppDispatch();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    dispatch(loginUser(loginData));
    setLoginData({
      email: "",
      password: "",
    });
  };
  const handleChange = (e: any) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };
  const containerStyle = {
    backgroundImage: `url(assets/doctorCover.avif)`,
  };
  return (
    <div
      className={`relative h-full ${styles.container}`}
      style={containerStyle}
    >
      <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
        <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
          <div
            className={`${styles.gradientText} self-start hidden lg:flex flex-col  text-white`}
          >
            <h1 className="mb-3 font-bold text-5xl">
              Hi ? Welcome to UmerDoc{" "}
            </h1>
            <p className="pr-3">
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries for previewing layouts and visual
              mockups
            </p>
          </div>
        </div>
        <div className="flex justify-center self-center  z-10">
          <div className="p-12 bg-white mx-auto rounded-2xl w-100 ">
            <div className="mb-4">
              <h3 className="font-semibold text-2xl text-gray-800">Login </h3>
              <p className="text-gray-500">Please sign in to your account.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              {showAlert && <Alert />}
              {signinForm.map((data, index) => (
                <div key={index} className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 tracking-wide">
                    {data.placeholder}
                  </label>
                  <Form
                    key={index}
                    title={data.title}
                    placeholder={data.placeholder}
                    type={data.type}
                    handleChange={handleChange}
                    value={loginData}
                  />
                </div>
              ))}

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                >
                  Sign in
                </button>
              </div>
            </form>
            <div className="pt-5 text-center text-gray-400 text-xs">
              <span>Copyright © UmerDoc</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
