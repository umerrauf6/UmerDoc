import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

var user: User | null;
var hostedToken: string | null;

if (typeof window !== "undefined") {
  // Perform localStorage action
  user = localStorage.getItem("user");
  hostedToken = localStorage.getItem("token");
}

interface AppState {
  token: string | undefined;
  user: User | undefined;
  showAlert: boolean;
  isLoading: boolean;
  alertText: string;
  alertType: string;
  doctors: string[];
  hasEffectRun: boolean;
  appointments: string[];
}

interface User {
  // Define the properties of the user object
  // Adjust this based on the actual structure of your user object
  name: string;
  email: string;
  // ... other properties
}
const initialState: AppState = {
  token: hostedToken ? hostedToken : null,
  user: user ? JSON.parse(user) : null,
  showAlert: false,
  isLoading: false,
  alertText: "",
  alertType: "",
  doctors: [],
  appointments: [],
};

function removeUserFromLocalStorage() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
}

export const getAppointment = (createdBy: string) => async (dispatch) => {
  try {
    dispatch(getAppointmentBegin());
    const { data } = await axios.get("/api/getappointment", {
      headers: {
        userId: createdBy,
      },
    });

    dispatch(getAppointmentSuccess(data.data));
  } catch (error) {}
};
export const setAppointments = (appointmentDetails) => async (dispatch) => {
  try {
    // console.log(appointmentDetails);

    dispatch(setAppointmentBegin());
    await axios.post("/api/postappointment", {
      ...appointmentDetails,
    });
    dispatch(setAppointmentSuccess());
    setTimeout(() => {
      dispatch(clearAlert);
    }, 3000);
  } catch (error) {}
};

export const updateUser = (updateDetails: any) => async (dispatch: any) => {
  try {
    dispatch(updateUserBegin());

    await axios.put(
      "/api/updateuser",
      { ...updateDetails },
      {
        headers: {
          authorization: `Bearer ${initialState.token}`,
        },
      }
    );

    dispatch(updateUserSuccess());
    setTimeout(() => {
      dispatch(clearAlert());
    }, 3000);
  } catch (error) {
    console.log(error);

    dispatch(logoutUsertoMenu());
    removeUserFromLocalStorage();
  }
};
export const getDoctors = (preToken: string) => async (dispatch) => {
  try {
    dispatch(setDoctorsBegin());

    const { data } = await axios.get("/api/getdoctors", {
      headers: {
        authorization: `Bearer ${preToken}`,
      },
    });

    const doctorsWithAppointments = await Promise.all(
      data.data.map(async (doctor) => {
        const appointmentsResponse = await axios.get(
          `/api/getappointment/${doctor._id}`
        );
        const appointments = appointmentsResponse.data.data;
        if (appointments.length === 0) {
          return {
            ...doctor,
            appointments: [{ appointmentTime: "No appointment" }],
          };
        }

        return { ...doctor, appointments };
      })
    );
    console.log(doctorsWithAppointments);

    dispatch(setDoctorsSuccess(doctorsWithAppointments));
    setTimeout(() => {
      dispatch(clearAlert());
    }, 3000);
  } catch (error) {}
};

export const registerUser = (memberData) => async (dispatch) => {
  try {
    dispatch(registerUserBegin());

    await axios.post("api/register", {
      name: memberData.name,
      email: memberData.email,
      password: memberData.password,
      description: memberData.description,
      city: memberData.city,
      role: memberData.role,
      phoneNumber: memberData.phoneNumber,
    });

    dispatch(RegisterUserSuccess());
    setTimeout(() => {
      dispatch(clearAlert());
    }, 3000);
  } catch (error) {
    console.log(error);
    setTimeout(() => {
      dispatch(clearAlert());
    }, 3000);
  }
};
export const logoutUser = () => async (dispatch) => {
  setTimeout(() => {
    dispatch(logoutUsertoMenu());
    removeUserFromLocalStorage();
  }, 500);
};
function addUserToLocalStorage({ user, token }: any) {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
}

export const bookAppointment =
  (appointDate, userName, userEmail) => async (dispatch) => {
    try {
      dispatch(bookAppointmentBegin());
      const data = await axios.post("/api/sendmail", {
        appointDate,
        userName,
        userEmail,
      });
      dispatch(bookAppointmentSuccess());
      setTimeout(() => {
        dispatch(clearAlert());
      }, 3000);
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        dispatch(clearAlert());
      }, 3000);
    }
  };

export const loginUser = (loginData: any) => async (dispatch: any) => {
  try {
    dispatch(loginUserBegin());
    const { data } = await axios.post("/api/login", {
      email: loginData.email,
      password: loginData.password,
    });

    addUserToLocalStorage(data);
    dispatch(loginUserSuccess(data));
    setTimeout(() => {
      dispatch(clearAlert());
    }, 3000);
  } catch (error) {
    console.log(error);
    setTimeout(() => {
      dispatch(clearAlert());
    }, 3000);
  }
};

export const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    bookAppointmentBegin: (state) => {
      return {
        ...state,
        showAlert: true,
        alertType: "success",
        alertText: "Email going",
      };
    },
    bookAppointmentSuccess: (state) => {
      return {
        ...state,
        alertType: "success",

        alertText: "Email Sent",
      };
    },
    getAppointmentBegin: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    getAppointmentSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        appointments: Array.isArray(action.payload)
          ? action.payload
          : [action.payload],
      };
    },

    setAppointmentBegin: (state) => {
      return {
        ...state,
        isLoading: true,
        showAlert: true,
        alertText: "Loading",
        alertType: "success",
      };
    },
    setAppointmentSuccess: (state) => {
      return {
        ...state,
        isLoading: false,
        alertText: "Appointment Booked",
        alertType: "success",
      };
    },
    setDoctorsBegin: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    setDoctorsSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        doctors: action.payload,
      };
    },
    updateUserBegin: (state) => {
      return {
        ...state,
        showAlert: true,
        alertText: "Update Begin",
        alertType: "success",
        isLoading: true,
      };
    },
    updateUserSuccess: (state) => {
      return {
        ...state,
        showAlert: true,
        alertText: "Update Success",
        alertType: "success",
        isLoading: false,
      };
    },
    loginUserBegin: (state) => {
      return {
        ...state,
        showAlert: true,
        alertText: "Login Begin",
        alertType: "success",
        isLoading: true,
      };
    },
    loginUserSuccess: (state, action) => {
      return {
        ...state,
        showAlert: true,
        alertText: "Login Success",
        alertType: "success",
        isLoading: false,
        token: action.payload.token,
        user: action.payload.user,
      };
    },
    registerUserBegin: (state) => {
      return {
        ...state,
        showAlert: true,
        alertText: "Register Begin",
        alertType: "success",
        isLoading: true,
      };
    },
    RegisterUserSuccess: (state) => {
      return {
        ...state,
        showAlert: true,
        alertText: "Register Success",
        alertType: "success",
        isLoading: false,
      };
    },
    clearAlert: (state) => {
      return {
        ...state,
        showAlert: false,
        alertText: "",
        alertType: "",
      };
    },
    logoutUsertoMenu: (state) => {
      return {
        ...state,
        token: null,
        user: null,
      };
    },
  },
});

export const {
  loginUserBegin,
  loginUserSuccess,
  registerUserBegin,
  RegisterUserSuccess,
  clearAlert,
  logoutUsertoMenu,
  setDoctorsBegin,
  setDoctorsSuccess,
  updateUserBegin,
  updateUserSuccess,
  setAppointmentBegin,
  setAppointmentSuccess,
  getAppointmentBegin,
  getAppointmentSuccess,
  bookAppointmentBegin,
  bookAppointmentSuccess,
} = stateSlice.actions;
export const selectApp = (state: any) => state.stateSlice;
export default stateSlice.reducer;
