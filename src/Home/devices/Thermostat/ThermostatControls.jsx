import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CircularSlider from "@fseehawer/react-circular-slider";
import Lottie from "lottie-react";
import thermometer from "@/assets/animations/thermometer.json";
import { Thermometer, BatteryFull, AlertTriangle, Fan } from "lucide-react";

const TEMP_MODES = ["Cool", "Heat", "Vent"];
const FAN_MODES = ["Auto", "On"];
const MIN_TEMP = 16;
const MAX_TEMP = 30;

const initialTemp = 22;
const batteryLevel = 95;
let startTime;

const ThermostatControls = ({
  mode = "Cool",
  setMode,
  temp,
  setTemp,
  fanMode,
  setFanMode,
}) => {
  // const lottieRef = useRef();
  const [runningDuration, setRunningDuration] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (startTime) {
        const hoursRunning = Math.floor((Date.now() - startTime) / 3600000);
        setRunningDuration(hoursRunning);
      }
    }, 60000); // every minute
    return () => clearInterval(interval);
  }, [startTime]);

  // useEffect(() => {
  //   if (lottieRef.current) {
  //     lottieRef.current.play();
  //   }
  //   else {
  //     lottieRef.current.stop();
  //   }
  // }, [mode, temp]);

  const handleModeChange = (newMode) => {
    if (setMode) setMode(newMode);
  };

  const handleFanToggle = () => {
    const next = fanMode === "On" ? "Auto" : "On";
    if (setFanMode) setFanMode(next);
  };

  return (
    <Card className="rounded-md shadow-lg col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle className="text-xl text-center">Thermostat</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-4">
        {/* Thermometer */}
        {/* <div className="w-28 h-28">
          <Lottie
            lottieRef={lottieRef}
            animationData={thermometer}
            loop
            autoPlay
            style={{ width: "100%", height: "100%" }}
          />
        </div> */}

        {/* Temperature Slider */}
        <div>
          <CircularSlider
            width={180}
            label="Temperature"
            min={MIN_TEMP}
            max={MAX_TEMP}
            data={Array.from(
              { length: MAX_TEMP - MIN_TEMP + 1 },
              (_, i) => `${i + MIN_TEMP}°C`
            )}
            dataIndex={0}
            onChange={(val) => {
              const numericTemp = parseInt(val);
              if (!isNaN(numericTemp)) setTemp(numericTemp);
            }}
            valueFontSize="35px"
            knobColor="#6366F1"
            progressColorFrom="#A5B4FC"
            progressColorTo="#6366F1"
            labelColor="#6366F1"
          />
        </div>

        {/* Mode Selector */}
        <div className="flex gap-2 mt-2">
          {TEMP_MODES.map((m) => (
            <Button
              key={m}
              variant={m === mode ? "default" : "outline"}
              onClick={() => handleModeChange(m)}
            >
              {m}
            </Button>
          ))}
        </div>

        {/* Fan Toggle */}
        <Button
          onClick={handleFanToggle}
          variant="ghost"
          className={`flex gap-2 items-center border ${
            fanMode === "On"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-700"
          }`}
        >
          <Fan size={18} />
          Fan: {fanMode}
        </Button>

        {/* Battery */}
        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
          <BatteryFull className="text-green-500" size={18} />
          Battery: {batteryLevel}%
        </div>

        {/* Warning */}
        {runningDuration >= 24 && (
          <div className="flex items-center gap-2 text-yellow-600 text-sm mt-2">
            <AlertTriangle size={18} />
            Running continuously for over 24 hours!
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ThermostatControls;
