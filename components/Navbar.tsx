"use client";
import { logoutUser, selectApp } from "@/app/redux/feature/slice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import docpic1 from "@/public/assets/docpic1.jpg";

import { useRouter } from "next/navigation";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector(selectApp);
  useEffect(() => {
    if (user) return router.push("/");
  }, [user]);
  return (
    <div className="z-[1] sticky top-0 left-0 right-0  ">
      <div className="navbar  bg-base-100 px-[4rem]">
        <div className="navbar-start">
          <Link href={"/"} className="btn btn-ghost normal-case text-xl">
            UmerDoc
          </Link>
        </div>

        <div className="navbar-end ">
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <Image fill alt="user image" src={docpic1} />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                {user.role === "doctor" && (
                  <li>
                    <Link href={"/addappointments"}>Add Appointments</Link>
                  </li>
                )}
                <li>
                  <Link href={"/updateuser"}>Update Details</Link>
                </li>
                <li onClick={() => dispatch(logoutUser())}>
                  <Link href={"/login"}>Logout</Link>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link href={"login"} className="btn mx-1">
                Login
              </Link>
              <Link href={"register"} className="btn mx-1">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
