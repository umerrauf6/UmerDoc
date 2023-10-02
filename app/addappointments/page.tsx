"use client";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  getAppointment,
  selectApp,
  setAppointments,
} from "../redux/feature/slice";
import Alert from "@/components/Alert";

interface Appointment {
  appointmentDateTime: string;
}

const Addappointments = () => {
  const { showAlert, user, isLoading, appointments } =
    useAppSelector(selectApp);
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<number>(2);

  const handleTabClick = (tabIndex: number) => {
    dispatch(getAppointment(user.id));
    // console.log(appointments);

    setActiveTab(tabIndex);
  };

  const [appointment, setAppointment] = useState<Appointment>({
    appointmentDateTime: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAppointment({
      ...appointment,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(setAppointments({ ...appointment, doctorId: user.id }));

    setAppointment({
      appointmentDateTime: "",
    });
  };

  return (
    <div className="px-[4rem]">
      <div className="tabs tabs-boxed p-2">
        <a
          className={`tab ${activeTab === 1 ? "tab-active" : ""}`}
          onClick={() => handleTabClick(1)}
        >
          Your Appointments
        </a>
        <a
          className={`tab ${activeTab === 2 ? "tab-active" : ""}`}
          onClick={() => handleTabClick(2)}
        >
          Add Appointments
        </a>
      </div>
      <div className="tab-content">
        {activeTab === 1 && (
          <div>
            {isLoading ? (
              <div className="mt-5 border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                <div className="animate-pulse flex space-x-4">
                  <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                  <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-slate-200 rounded"></div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                      </div>
                      <div className="h-2 bg-slate-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap">
                {appointments.map((app) => (
                  <div key={app.index}>
                    <div className="card w-96 bg-base-100 m-5 shadow-xl">
                      <div className="card-body">
                        Date and Time:{" "}
                        <div className="card-title">
                          {new Date(app.appointmentDate).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {activeTab === 2 && (
          <div className="mt-5">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Add Appointments
            </h1>
            <form onSubmit={handleSubmit}>
              <input
                className="input my-2 input-bordered input-success w-full max-w-xs block"
                type="datetime-local"
                name="appointmentDateTime"
                value={appointment.appointmentDateTime}
                onChange={handleChange}
              />
              <button className="btn" type="submit">
                {showAlert ? <Alert /> : "Add Appointment"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Addappointments;
