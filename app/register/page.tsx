"use client";

import React, { useState } from "react";
import styles from "./Register.module.css";
import { registerData } from "@/public/assets/formData";
import Form from "@/components/Form";
import Alert from "@/components/Alert";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { registerUser, selectApp } from "../redux/feature/slice";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    description: "",
    role: "Role",
    city: "City",
  });
  const containerStyle = {
    backgroundImage: `url(assets/doctorCover.avif)`,
  };
  const dispatch = useAppDispatch();

  const { showAlert } = useAppSelector(selectApp);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      console.log(formData);
      dispatch(registerUser(formData));
    } catch (error) {}
  };
  return (
    <div
      className={`relative h-full  ${styles.container}`}
      style={containerStyle}
    >
      <div className="min-h-screen  sm:flex sm:flex-row mx-0 justify-center">
        <div className="flex justify-center self-center  z-10">
          <div className="p-12 bg-white mx-auto rounded-2xl w-100 ">
            <div className="mb-4">
              <h3 className="font-semibold text-2xl text-gray-800">
                Register{" "}
              </h3>
              <p className="text-gray-500">Please Register your account.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-2">
              {showAlert && <Alert />}
              {registerData.map((data, index) => (
                <div key={index} className="space-y-1">
                  <Form
                    key={index}
                    title={data.title}
                    placeholder={data.placeholder}
                    pattern={data.pattern}
                    icon={data.icon}
                    type={data.type}
                    handleChange={handleChange}
                    value={formData}
                    options={data.options}
                  />
                </div>
              ))}

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                >
                  Register
                </button>
              </div>
            </form>
            <div className="pt-5 text-center text-gray-400 text-xs">
              <span>Copyright © UmerDoc</span>
            </div>
          </div>
        </div>
        <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
          <div
            className={`${styles.gradientText} self-start hidden lg:flex flex-col  text-white`}
          >
            {/* <Image src={doctorCover} className="mb-3" alt="doctor image" /> */}
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
      </div>
    </div>
  );
};

export default Register;
