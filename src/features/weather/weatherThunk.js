import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (_, { rejectWithValue }) => {
    try {
      const getPosition = () =>
        new Promise((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject)
        );

      const position = await getPosition();
      const { latitude, longitude } = position.coords;

      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            lat: latitude,
            lon: longitude,
            units: "metric",
            appid: API_KEY,
          },
        }
      );

      return {
        city: res.data.name,
        temprature: res.data.main.temp,
        condition: res.data.weather[0].main,
        humidity: res.data.main.humidity,
        windSpeed: res.data.wind.speed,
      };
    } catch (error) {
      return rejectWithValue(err.message);
    }
  }
);
