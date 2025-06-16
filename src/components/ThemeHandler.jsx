import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const ThemeHandler = () => {
  const { user} = useAuth();

  useEffect(() => {
    if(!user) return;

    const now = new Date();
    const hour = now.getHours();

    const html = document.documentElement;

    if (hour >= 6 && hour < 20) {
      // Light Mode
      html.classList.remove("dark");
    } else {
      // Dark Mode
      html.classList.add("dark");
    }
  }, [user]);

  return null; // no visible UI
};

export default ThemeHandler;
