import { configureStore } from "@reduxjs/toolkit";
import stateSlice from "./feature/slice";

export const store = configureStore({
  reducer: {
    stateSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
