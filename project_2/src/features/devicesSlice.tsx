import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { RootState } from '../store';

interface DeviceData {
  booking: string;
  sove: number;
  ttsd: string[];
  ngaysd: string;
  ngayxv: string;
  checkin: string;
}

interface DevicesState {
  devices: DeviceData[];
  loading: boolean;
  error: string | null;
}

const initialState: DevicesState = {
  devices: [],
  loading: false,
  error: null,
};

export const fetchDevices = createAsyncThunk(
  'devices/fetchDevices',
  async () => {
    try {
      const db = getFirestore();
      const devicesCollection = collection(db, 'devices');

      const querySnapshot = await getDocs(devicesCollection);
      const devicesData: DeviceData[] = [];

      querySnapshot.forEach((doc) => {
        const device = doc.data() as DeviceData;
        devicesData.push(device);
      });

      return devicesData;
    } catch (error) {
      throw new Error('Error fetching device data');
    }
  }
);

const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDevices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDevices.fulfilled, (state, action) => {
        state.devices = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchDevices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error fetching device data';
      });
  },
});

export default devicesSlice.reducer;

export const selectDevices = (state: RootState) => state.devices.devices;
export const selectLoading = (state: RootState) => state.devices.loading;
export const selectError = (state: RootState) => state.devices.error;
