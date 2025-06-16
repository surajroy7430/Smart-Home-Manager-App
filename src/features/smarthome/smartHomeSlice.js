import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSmartHomeConfig = createAsyncThunk(
  "smarthome/fetchSmartHomeConfig",
  async () => {
    const response = await axios.get("/smart-home-config.json");
    return response.data;
  }
);

const smartHomeSlice = createSlice({
  name: "smartHome",
  initialState: {
    householdName: "",
    rooms: [],
    config: {
      roomOptions: [],
      deviceOptions: [],
      roomDeviceMap: {},
      roomImageMap: {}
    },
    loading: false,
  },
  reducers: {
    setHouseholdName: (state, action) => {
      state.householdName = action.payload;
    },
    addRoom: (state, action) => {
      const exists = state.rooms.find((r) => r.name === action.payload.name);
      if (!exists) state.rooms.push(action.payload);
    },
    removeRoom: (state, action) => {
      state.rooms = state.rooms.filter((r) => r.name !== action.payload);
    },
    updateRoomDevices: (state, action) => {
      const room = state.rooms.find((r) => r.name === action.payload.name);
      if (room) room.devices = action.payload.devices;
    },
    resetSmartHome: (state) => {
      state.householdName = "";
      state.rooms = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSmartHomeConfig.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSmartHomeConfig.fulfilled, (state, action) => {
        state.config = action.payload;
        state.loading = false;
      })
      .addCase(fetchSmartHomeConfig.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  setHouseholdName,
  addRoom,
  removeRoom,
  updateRoomDevices,
  resetSmartHome,
} = smartHomeSlice.actions;

export default smartHomeSlice.reducer;
