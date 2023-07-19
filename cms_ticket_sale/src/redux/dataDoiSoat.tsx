import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs,addDoc  } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

export interface PageDoiSoat {
  stt: number;
  sove: string;
  ngaysd: string;
  loaive: string;
  checkin: string;
  tt: string;
}

export const fetchPageDoiSoat = createAsyncThunk("dataDoiSoat/fetchPageDoiSoat", async () => {
  const pageCollection = collection(firestore, "dataDoiSoat");
  const querySnapshot = await getDocs(pageCollection);
  const pageData: PageDoiSoat[] = [];

  querySnapshot.forEach((doc) => {
    const page = doc.data() as PageDoiSoat;
    pageData.push(page);
  });

  return pageData;
});

interface PageState {
  dataDS: PageDoiSoat[];
  loading: boolean;
  error: string | null;
}

const initialState: PageState = {
    dataDS: [],
  loading: false,
  error: null,
};
export const addPageData = createAsyncThunk(
  "dataDoiSoatt/addPageData",
  async (data: PageDoiSoat) => {
    const pageCollection = collection(firestore, "dataDoiSoatt");
    await addDoc(pageCollection, data);
    return data;
  }
);

export const dataDoiSoat = createSlice({
  name: "dataDoiSoat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPageDoiSoat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPageDoiSoat.fulfilled, (state, action) => {
        state.loading = false;
        state.dataDS = action.payload;
      })
      .addCase(fetchPageDoiSoat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch data";
      });
  },
});

export default dataDoiSoat.reducer;
