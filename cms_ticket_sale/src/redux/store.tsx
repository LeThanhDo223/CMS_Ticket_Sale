import { configureStore } from "@reduxjs/toolkit";
import pageSlice from "./dataSlice";
import dataDichVu from "./dataDichVu";
import dataDoiSoat from "./dataDoiSoat";

export const store = configureStore({
  reducer: {
    page: pageSlice,
    dataDV:dataDichVu,
    dataDS:dataDoiSoat,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
