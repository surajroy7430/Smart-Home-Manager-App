import React, { useState } from "react";
import ThermostatControls from "./ThermostatControls";

const ThermostatCard = () => {
  const [isOn, setIsOn] = useState(false);
  const [mode, setMode] = useState("Cool");
  const [temp, setTemp] = useState(0);
  const [fanMode, setFanMode] = useState("Auto");

  const props = {
    isOn,
    setIsOn,
    mode,
    setMode,
    temp,
    setTemp,
    fanMode,
    setFanMode,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
      <ThermostatControls {...props} />
    </div>
  );
};

export default ThermostatCard;
