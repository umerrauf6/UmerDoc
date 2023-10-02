"use client";
import Image from "next/image";
import docpic1 from "@/public/assets/docpic1.jpg";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { getDoctors, selectApp } from "./redux/feature/slice";
import { useRouter } from "next/navigation";
import DateCard from "@/components/DateCard";
import OverlayModel from "@/components/OverlayMode";

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { doctors, token, user, isLoading } = useAppSelector(selectApp);
  const [hasEffectRun, setHasEffectRun] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedDoctorAppointments, setSelectedDoctorAppointments] = useState(
    []
  );

  const toggleModal = (appointments) => {
    setSelectedDoctorAppointments(appointments);
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (!hasEffectRun) {
      if (!user) {
        router.push("/login"); // Redirect to login if user is not available
        return;
      }

      dispatch(getDoctors(token));
      setHasEffectRun(true);
    }
  }, [hasEffectRun, user, token, dispatch, router]);

  if (isLoading) {
    return (
      <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
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
    );
  }
  return (
    <div className=" mx-[4rem]">
      {doctors.map((doc: any, index: number) => (
        <div
          key={index}
          className="mt-[2rem] card lg:card-side bg-base-100 shadow-xl "
        >
          <figure className="max-w-[20%] ">
            <Image
              className="w-full object-fill h-full"
              src={docpic1}
              alt="Album"
            />
          </figure>
          <div className="card-body ">
            <h2 className="card-title">{doc.name}</h2>
            <p>{doc.description}</p>
            <div className="flex w-[40%] divide-x text-center">
              <div className="flex-1">
                <h3 className="font-semibold">Under 15 Min</h3>
                <p>Wait Time</p>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">12 Years</h3>
                <p>Exerience</p>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">100%</h3>
                <p>Satisfied Patients</p>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">City</h3>
                <p>{doc.city}</p>
              </div>
            </div>
            {
              <div className="flex flex-wrap">
                {doc.appointments?.map((appoint, index) => (
                  <div key={index}>
                    {appoint.appointmentTime === "No appointment" ? (
                      <DateCard date={"No appointment"} />
                    ) : (
                      <DateCard
                        date={new Date(
                          appoint.appointmentDate
                        ).toLocaleString()}
                      />
                    )}
                  </div>
                ))}
              </div>
            }
            <div className="card-actions justify-end">
              <button
                onClick={() => toggleModal(doc.appointments)}
                className={`btn btn-primary ${
                  doc.appointments[0].appointmentTime === "No appointment"
                    ? "btn-disabled"
                    : ""
                }`}
              >
                Book Apointments
              </button>
              <OverlayModel
                isOpen={isModalOpen}
                closeModal={toggleModal}
                appDate={selectedDoctorAppointments}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
