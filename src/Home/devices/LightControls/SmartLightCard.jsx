import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Power } from "lucide-react";

const SmartLightCard = () => {
  const [color, setColor] = useState("#d1d5db");
  const [isOn, setIsOn] = useState(false);
  const deviceName = "Smart Light";

  const togglePower = () => setIsOn((prev) => !prev);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
      <Card className="rounded-md shadow-lg col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle className="text-xl text-center">{deviceName}</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-4">
          {/* Bulb SVG */}
          <div className="w-24 h-24">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={isOn ? color : "#d1d5db"}
              viewBox="0 0 24 24"
              strokeWidth="1.2"
              stroke="#a3a3a3"
              className="w-full h-full transition-colors duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
              />
            </svg>
          </div>

          {/* Color Picker */}
          <div className={`${!isOn ? "opacity-50 pointer-events-none" : ""}`}>
            <HexColorPicker color={color} onChange={setColor} />
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
    </div>
  );
};

export default SmartLightCard;
