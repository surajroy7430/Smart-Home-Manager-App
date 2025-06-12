import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { Toaster } from "@/components/ui/sonner";
import Dashboard from "./pages/Home/Dashboard";
import LandingPage from "./pages/LandingPage";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

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
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>

      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}

export default App;
