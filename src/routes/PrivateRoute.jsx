import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import ThemeHandler from "@/components/ThemeHandler";
import Navbar from "../Home/components/Navbar";
import { UserInfoProvider } from "../context/UserInfoContext";

const PrivateRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return null;
  return user ? (
    <>
      <ThemeHandler />
      <UserInfoProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          
          <div className="flex-1 px-6 py-4">
            <Outlet />
          </div>
        </div>
      </UserInfoProvider>
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
