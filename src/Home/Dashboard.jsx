import { Button } from "@/components/ui/button";
import { auth } from "../utils/firebaseConfig";
import { useNavigate } from "react-router-dom";
import HouseStatus from "./components/HouseStatus";
import RoomList from "./components/RoomList";
import FanCard from "./devices/Fan/FanCard";
import SmartLightCard from "./devices/LightControls/SmartLightCard";
import LampCard from "./devices/LightControls/LampCard";
import ThermostatCard from "./devices/Thermostat/ThermostatCard";

const Dashboard = () => {
  return (
    <div>
      <HouseStatus />

      <div className="my-10">
        <h1 className="text-3xl font-semibold text-center">Rooms</h1>
        <RoomList />
      </div>
      {/* <FanCard /> */}
      {/* <SmartLightCard /> */}
      {/* <LampCard /> */}
      {/* <ThermostatCard /> */}
    </div>
  );
};

export default Dashboard;
