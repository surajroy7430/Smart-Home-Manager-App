# 🏠 Qubic Home – Smart Home Manager

Qubic Home is a smart home management application that allows users to securely log in, set up their household, and control smart devices across different rooms. It features a dynamic dashboard with day-part routines, live weather, auto dark mode, and intuitive device controls.

---

## 🚀 Features

- 🔐 **Authentication System**
  - Register and login with secure user authentication
  - Smooth transition from onboarding to household setup

- 🏡 **Household Setup**
  - One-time setup after registration
  - Define your smart home with rooms and assign devices

- 📊 **Interactive Dashboard**
  - Displays a time-based greeting and routine (Morning, Afternoon, Evening, Night)
  - Shows **live weather** with:
    - Temperature
    - Weather type (e.g., cloudy, sunny)
    - Geo-location details (latitude & longitude)
  - Visual summary:
    - Total rooms
    - Number of devices per room

- 🛋️ **Smart Room Control**
  - Click a room from dashboard to manage its devices
  - Toggle device status (ON/OFF) interactively
  - Smooth room-specific UI for device management

- 🌘 **Auto Dark Mode**
  - Dark mode is automatically enabled between **8:00 PM to 6:00 AM** based on system time

---

## 🧭 App Flow

1. **Authentication**
   - Users register/login securely.
2. **Household Setup**
   - Users set up rooms and assign devices.
3. **Dashboard Access**
   - Personalized greeting based on time (e.g., *Good Morning!*)
   - Weather details + location info
   - Room summary with device stats
4. **Room View**
   - Interactive control of smart devices in each room
5. **Dark Mode**
   - Auto-enabled after 8 PM till 6 AM to reduce eye strain

---

## 📦 Tech Stack

- **Frontend**: React + ShadCN UI
- **State Management**: Redux Toolkit
- **Animations**: Framer Motion
- **Location & Weather**: OpenWeatherMap API + Geolocation
- **Authentication**: Firebase Auth
- **Data Management**: Firestore (Rooms, Devices, User Profiles)

---

## 🌦 Weather API Integration

- Fetches live weather using **OpenWeatherMap API**
- Auto-detects user location (latitude & longitude)
- Displays real-time weather status on dashboard

---

## 🧠 Smart Design Principles

- Clean and modular UI using ShadCN components
- Mobile-responsive layout
- Seamless navigation between dashboard and room views
- Smooth user experience with auto mode transitions

---

## 📸 Preview



---

## 🛠 Setup Instructions

1. **Clone the repository:**

```
git clone https://github.com/surajroy7430/Smart-Home-Manager-App.git
cd Smart-Home-Manager-App
```

2. **Install dependencies:**

```
npm install
```

3. **Set up Firebase & Environment Variables:**

- Create a .env.local file and add your Firebase & OpenWeather API keys:

```
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_WEATHER_API_KEY=your_openweathermap_key
```

4. **Run the application:**

```
npm run dev
```

---

## 👨‍💻 Contributing
Welcome for any contributions! Feel free to open issues or submit pull requests.
