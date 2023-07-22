import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

interface PageDataGD {
  stt: string;
  sove: string;
  ngaysd: string;
  tenloai: string;
  checkin: string;
  tt:string;
  tsk: string;
}

interface PageDataSK extends PageDataGD {
  tsk: string;
}

export const fetchPageDataGD = createAsyncThunk("page/fetchPageDataGD", async () => {
  const pageCollection = collection(firestore, "dataDoiSoat");
  const querySnapshot = await getDocs(pageCollection);
  const pageData: PageDataGD[] = [];

  querySnapshot.forEach((doc) => {
    const page = doc.data() as PageDataGD;
    pageData.push(page);
  });

  return pageData;
});

export const fetchPageDataSK = createAsyncThunk("page/fetchPageDataSK", async () => {
  const pageCollection = collection(firestore, "dataDoiSoat");
  const querySnapshot = await getDocs(pageCollection);
  const pageData: PageDataSK[] = [];

  querySnapshot.forEach((doc) => {
    const page = doc.data() as PageDataSK;
    pageData.push(page);
  });

  return pageData;
});

interface PageState {
  dataGD: PageDataGD[];
  dataSK: PageDataSK[];
  loading: boolean;
  error: string | null;
}

const initialState: PageState = {
  dataGD: [],
  dataSK: [],
  loading: false,
  error: null,
};
export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPageDataGD.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPageDataGD.fulfilled, (state, action) => {
        state.loading = false;
        state.dataGD = action.payload;
      })
      .addCase(fetchPageDataGD.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch data";
      })
      .addCase(fetchPageDataSK.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPageDataSK.fulfilled, (state, action) => {
        state.loading = false;
        state.dataSK = action.payload;
      })
      .addCase(fetchPageDataSK.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch data";
      });
  },
});

export default pageSlice.reducer;
