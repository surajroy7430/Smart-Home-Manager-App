import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-slate-800 text-white px-4">
      <div className="max-w-xl text-center space-y-6">
        <div className="flex flex-col items-center">
          <img
            src="https://i.ibb.co/DD0pS98p/logo.png"
            alt="qubic-home"
            className="w-32 md:w-40 lg:w-52 h-auto object-contain"
          />
          <span className="text-3xl font-normal">A SmartHome Manager</span>
        </div>
        <p className="text-lg md:text-xl text-slate-300">
          Control your lights, temperature, routines, and more — all in one
          place. Safe, simple, and smart.
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <Link to="/login">
            <Button
              variant="primary"
              className="px-6 py-5 text-base bg-slate-200 text-black hover:bg-slate-300"
            >
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="px-6 py-5 text-base">Signup</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
