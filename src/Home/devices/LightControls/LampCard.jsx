import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Power } from "lucide-react";

const LampCard = () => {
  const [isOn, setIsOn] = useState(false);
  const deviceName = "Lamp";

  const togglePower = () => setIsOn((prev) => !prev);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
      <Card className="rounded-md shadow-lg col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle className="text-xl text-center">{deviceName}</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-4">
          {/* Lamp Image */}
          <div className="w-32 h-32">
            <img
              src={
                isOn
                  ? "https://i.ibb.co/DHWhHt5g/lamp-onn.png"
                  : "https://i.ibb.co/5xTd2mcf/lamp-off.png"
              }
              alt={isOn ? "lamp-on" : "lamp-off"}
              className="w-full h-full object-contain transition-opacity duration-300"
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
    </div>
  );
};

export default LampCard;
