import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

interface PageDichVu {
  stt: number;
  gia: string;
  giacombo: string;
  combo:string;
  magoi: string;
  ngayad: string;
  ngayhh: string;
  tengoi: string;
  tt: string;
}

export const fetchPageDichVu = createAsyncThunk("dataDichVu/fetchPageDichVu", async () => {
  const pageCollection = collection(firestore, "dataDichVu");
  const querySnapshot = await getDocs(pageCollection);
  const pageData: PageDichVu[] = [];

  querySnapshot.forEach((doc) => {
    const page = doc.data() as PageDichVu;
    pageData.push(page);
  });

  return pageData;
});

interface PageState {
  dataDV: PageDichVu[];
  loading: boolean;
  error: string | null;
}

const initialState: PageState = {
    dataDV: [],
  loading: false,
  error: null,
};

export const dataDichVu = createSlice({
  name: "dataDichVu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPageDichVu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPageDichVu.fulfilled, (state, action) => {
        state.loading = false;
        state.dataDV = action.payload;
      })
      .addCase(fetchPageDichVu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch data";
      });
  },
});

export default dataDichVu.reducer;
