import { configureStore } from "@reduxjs/toolkit";
import pageSlice from "./dataSlice";
import dataDichVu from "./dataDichVu";

export const store = configureStore({
  reducer: {
    page: pageSlice,
    dataDV:dataDichVu,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
