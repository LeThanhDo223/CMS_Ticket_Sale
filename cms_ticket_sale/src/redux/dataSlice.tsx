import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

interface PageData {
  stt: string;
  booking: string;
  sove: string;
  ttsd: string;
  ngaysd: string;
  ngayxv: string;
  checkin: string;
}

export const fetchData = createAsyncThunk("page/fetchData", async () => {
  const pageCollection = collection(firestore, "page");
  const querySnapshot = await getDocs(pageCollection);
  const pageData: PageData[] = [];

  querySnapshot.forEach((doc) => {
    const page = doc.data() as PageData;
    pageData.push(page);
  });

  return pageData;
});

interface PageState {
  data: PageData[];
  loading: boolean;
  error: string | null;
}

const initialState: PageState = {
  data: [],
  loading: false,
  error: null,
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch data";
      });
  },
});

export default pageSlice.reducer;
