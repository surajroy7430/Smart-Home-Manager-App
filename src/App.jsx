import { Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import LandingPage from "./pages/LandingPage";
import PublicRoute from "./routes/PublicRoute";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import PrivateRoute from "./routes/PrivateRoute";
import Dashboard from "./Home/Dashboard";
import AddRoom from "./Home/AddRoom";
import SetupHousehold from "./Home/SetupHousehold";
import RoomDetails from "./Home/RoomDetails";

function App() {
  return (
    <div className="scrollbar-thin scrollbar-thumb-zinc-500 scrollbar-track-zinc-800 h-screen overflow-y-auto">

      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/setup-household" element={<SetupHousehold />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-room" element={<AddRoom />} />
          <Route path="/room/:roomName/:roomId" element={<RoomDetails />} />
        </Route>
      </Routes>

      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}

export default App;
