import { useState } from "react";
import FanControls from "./FanControls";
import DeviceStats from "../stats/DeviceStats";
import { POWER_MAP } from "./fanUtils";

const FanCard = () => {
  const [speed, setSpeed] = useState("Low");
  const [isOn, setIsOn] = useState(false);

  const props = {
    speed,
    setSpeed,
    isOn,
    setIsOn,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
      <FanControls {...props} />
      {/* <DeviceStats
        deviceName="Fan"
        controls={speed}
        isOn={isOn}
        powerMap={POWER_MAP}
      /> */}
    </div>
  );
};

export default FanCard;
