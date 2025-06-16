import { createSlice } from "@reduxjs/toolkit";
import { fetchWeather } from "./weatherThunk";

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    city: "",
    condition: "",
    humidity: 0,
    temprature: 0,
    windSpeed: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        const { city, temprature, condition, humidity, windSpeed } = action.payload;
        state.city = city;
        state.humidity = humidity.toFixed(0);
        state.condition = condition;
        state.windSpeed = (windSpeed * 3.6).toFixed(1);
        state.temprature = temprature.toFixed(0);
        state.loading = false;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default weatherSlice.reducer;
