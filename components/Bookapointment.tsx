import { bookAppointment, selectApp } from "@/app/redux/feature/slice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import React, { useState } from "react";
import Alert from "./Alert";

const BookAppointment = ({ appDate }) => {
  const { user, showAlert } = useAppSelector(selectApp);
  const dispatch = useAppDispatch();
  const [appointDate, setAppointDate] = useState("Book your Slot");
  const handleChange = (e) => {
    setAppointDate(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(bookAppointment(appointDate, user.name, user.email));
    setAppointDate("Book your Slot");
  };
  return (
    <div className="banner3">
      <div
        className="py-5"
        style={{
          backgroundImage:
            "url(https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/form-banners/banner2/banner-bg.jpg)",
        }}
      >
        <div className="container">
          <div className="flex flex-wrap justify-center items-start">
            <div className="w-full md:w-1/2 lg:w-3/7 py-3">
              <h3 className="my-3 text-white font-medium text-uppercase">
                Book Appointment
              </h3>
              <div className="">
                <select
                  onChange={handleChange}
                  value={appointDate}
                  className="select w-full max-w-xs my-2"
                >
                  <option disabled selected>
                    {appointDate}
                  </option>
                  {appDate.map((app, index) => (
                    <option key={index}>
                      {new Date(app.appointmentDate).toLocaleString()}
                    </option>
                  ))}
                </select>

                <div>
                  <button onClick={handleSubmit} className="btn mb-2">
                    <span>Book Your Appointment Now</span>
                  </button>
                  {showAlert && <Alert />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
