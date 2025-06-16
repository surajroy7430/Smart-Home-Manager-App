import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SPEED_MAP, FAN_SPEEDS } from "./fanUtils";
import CircularSlider from "@fseehawer/react-circular-slider";
import fanSpin from "@/assets/animations/fan.json";
import Lottie from "lottie-react";
import { Power } from "lucide-react";

const FanControls = ({ speed, setSpeed, isOn, setIsOn }) => {
  const lottieRef = useRef();

  useEffect(() => {
    if (!lottieRef.current) return;

    if (isOn) {
      lottieRef.current.setSpeed(SPEED_MAP[speed]);
      lottieRef.current.play();
    } else {
      lottieRef.current.stop();
    }
  }, [isOn, speed]);

  const togglePower = () => setIsOn((prev) => !prev);

  return (
    <Card className="rounded-md shadow-lg col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle className="text-xl text-center">Fan</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-4">
        {/* Fan Animation */}
        <div className="w-32 h-32">
          <Lottie
            lottieRef={lottieRef}
            animationData={fanSpin}
            loop
            autoPlay={false}
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* Speed Control */}
        <div className={`${!isOn ? "opacity-50 pointer-events-none" : ""}`}>
          <CircularSlider
            label="Speed"
            data={FAN_SPEEDS}
            width={180}
            labelColor="#1E90FF"
            valueFontSize="35px"
            knobColor="#1E90FF"
            knobSize={isOn ? 32 : 0}
            trackColor="#e0e0e0"
            progressColorFrom="#6EE7B7"
            progressColorTo="#3B82F6"
            onChange={(val) => {
              if (isOn) setSpeed(val);
            }}
            dataIndex={0}
          />
        </div>

        {/* Power Button */}
        <Button
          variant="ghost"
          onClick={togglePower}
          className={`mt-4 p-2 rounded-full font-bold text-white hover:text-white ${
            isOn
              ? "bg-red-500 hover:!bg-red-600"
              : "bg-gray-400 hover:!bg-gray-500"
          }`}
        >
          <Power />
        </Button>
      </CardContent>
    </Card>
  );
};

export default FanControls;
