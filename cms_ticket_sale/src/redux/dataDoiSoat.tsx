import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

interface DataGD {
  stt: string;
  sove: string;
  ngaysd: string;
  tenloai: string;
  checkin: string;
  ttds:string;
  tsk: string;
}

interface DataSK extends DataGD {
  tsk: string;
}

export const fetchDataGD = createAsyncThunk("dataDS/fetchPageDataGD", async () => {
  const pageCollection = collection(firestore, "dataDS");
  const querySnapshot = await getDocs(pageCollection);
  const pageData: DataGD[] = [];

  querySnapshot.forEach((doc) => {
    const dataDS = doc.data() as DataGD;
    pageData.push(dataDS);
  });

  return pageData;
});

export const fetchDataSK = createAsyncThunk("dataDS/fetchPageDataSK", async () => {
  const pageCollection = collection(firestore, "dataDS");
  const querySnapshot = await getDocs(pageCollection);
  const pageData: DataSK[] = [];

  querySnapshot.forEach((doc) => {
    const dataDS = doc.data() as DataSK;
    pageData.push(dataDS);
  });

  return pageData;
});

interface PageState {
  dataGD: DataGD[];
  dataSK: DataSK[];
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
  name: "dataDS",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataGD.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataGD.fulfilled, (state, action) => {
        state.loading = false;
        state.dataGD = action.payload;
      })
      .addCase(fetchDataGD.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch data";
      })
      .addCase(fetchDataSK.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataSK.fulfilled, (state, action) => {
        state.loading = false;
        state.dataSK = action.payload;
      })
      .addCase(fetchDataSK.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch data";
      });
  },
});

export default pageSlice.reducer;
