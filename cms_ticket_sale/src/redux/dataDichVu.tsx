import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  setDoc,
  query, // Import hàm query từ firebase/firestore
  where,
} from "firebase/firestore";
import { firestore } from "../firebase/firebase";

export interface PageDichVu {

  stt: string;
  gia: string;
  giacombo: string;
  combo: string;
  magoi: string;
  ngayad: string;
  gioad: string;
  ngayhh: string;
  giohh: string;
  tengoi: string;
  tt: string;
}

// Action cập nhật dữ liệu (Update)
export const updatePageData = createAsyncThunk(
  "dataDichVu/updatePageData",
  async (data: PageDichVu) => {
    // Tạo truy vấn dựa trên trường 'magoi'
    const pageCollection = collection(firestore, "dataDichVu");
    const firestoreQuery = query(pageCollection, where("magoi", "==", data.magoi));

    // Lấy kết quả truy vấn
    const querySnapshot = await getDocs(firestoreQuery);

    // Kiểm tra xem có dữ liệu tồn tại hay không
    if (querySnapshot.empty) {
      throw new Error("Document not found");
    }

    // Lấy document reference
    const pageDocRef = doc(firestore, "dataDichVu", querySnapshot.docs[0].id);

    // Cập nhật dữ liệu vào Firebase
    await setDoc(pageDocRef, data);

    return data;
  }
);

export const fetchPageDichVu = createAsyncThunk(
  "dataDichVu/fetchPageDichVu",
  async () => {
    const pageCollection = collection(firestore, "dataDichVu");
    const querySnapshot = await getDocs(pageCollection);
    const pageData: PageDichVu[] = [];
    querySnapshot.forEach((doc) => {
      const page = doc.data() as PageDichVu;
      pageData.push(page);
    });
    return pageData;
  }
);

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

export const addPageData = createAsyncThunk(
  "dataDichVu/addPageData",
  async (data: PageDichVu) => {
    const pageCollection = collection(firestore, "dataDichVu");

    // Lấy số lượng tài liệu hiện tại trong bộ sưu tập
    const querySnapshot = await getDocs(pageCollection);
    const numberOfDocuments = querySnapshot.size;

    // Tính toán giá trị "stt" tiếp theo bằng cách tăng số lượng tài liệu lên 1
    const nextStt = numberOfDocuments + 1;
    data.stt = nextStt.toString(); // Cập nhật thuộc tính "stt" trong đối tượng data

    // Thêm tài liệu có giá trị "stt" đã được cập nhật vào Firebase
    await addDoc(pageCollection, data);
    return data;
  }
);

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
      })
      .addCase(addPageData.fulfilled, (state, action) => {
        state.dataDV.push(action.payload);
      })
      .addCase(updatePageData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePageData.fulfilled, (state, action) => {
        state.loading = false;
        // Cập nhật dữ liệu đã được thay đổi vào state
     // Trong reducer dataDichVu
console.log("Previous state.dataDV:", state.dataDV);
const updatedDataIndex = state.dataDV.findIndex((item) => item.magoi === action.payload.magoi);
if (updatedDataIndex !== -1) {
  state.dataDV[updatedDataIndex] = action.payload;
}
console.log("Updated state.dataDV:", state.dataDV);

      })
      
      .addCase(updatePageData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update data";
      })
      ;
  },
});

export default dataDichVu.reducer;
