import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../features/weather/weatherSlice";
import smartHomeReducer from "../features/smarthome/smartHomeSlice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    smartHome: smartHomeReducer
  },
});
