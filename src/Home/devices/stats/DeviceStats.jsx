import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TimeFormat } from "./TimeFormat";

const DeviceStats = ({ deviceName, controls, isOn, powerMap }) => {
  const [runTime, setRunTime] = useState(0);
  const [powerData, setPowerData] = useState([]);
  const [totalEnergy, setTotalEnergy] = useState(0); //kWh
  const intervalRef = useRef(null);

  useEffect(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;

    if (isOn) {
      if (!intervalRef.current) {
        intervalRef.current = setInterval(() => {
          setRunTime((prev) => prev + 1);

          const currentPower = powerMap[controls] || 0;
          const energyThisSec = currentPower / 3600 / 1000;

          setTotalEnergy((prev) => prev + energyThisSec);
          setPowerData((prev) => [
            ...prev.slice(-9),
            {
              name: new Date().toLocaleTimeString().split(" ")[0],
              power: currentPower,
            },
          ]);
        }, 1000);
      }
    }

    return () => clearInterval(intervalRef.current);
  }, [isOn, controls]);

  const watts = isOn ? powerMap[controls] : 0;

  return (
    <Card className="rounded-md shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-lg">
          {deviceName} Stats
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        <div className="text-sm">
          <p>
            Time Running:{" "}
            <span className="text-foreground font-medium">
              {TimeFormat(runTime)}
            </span>
          </p>
          <p>
            Power Draw: <span className="font-medium">{watts}W</span>
          </p>
          <p>
            Energy Used:{" "}
            <span className="text-blue-500">{totalEnergy.toFixed(4)} kWh</span>
          </p>
        </div>

        <div className="h-32">
          {powerData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart key={powerData.length} data={powerData}>
                <XAxis dataKey="name" tick={false} />
                <YAxis
                  width={30}
                  domain={[0, Math.max(...Object.values(powerMap), 100)]}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="power"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-sm text-muted">
              No data yet. Turn on the {deviceName.toLowerCase()} to begin.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DeviceStats;
