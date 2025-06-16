import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../../features/weather/weatherThunk";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useUserInfo } from "../../context/UserInfoContext";
import {
  AlertTriangle,
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  DoorClosed,
  DoorOpen,
  Haze,
  Home,
  Icon,
  Moon,
  Snowflake,
  Sun,
  Sunrise,
  Sunset,
  Wind,
} from "lucide-react";

const HouseStatus = () => {
  const { name } = useUserInfo();
  const dispatch = useDispatch();
  const [doorOpen, setDoorOpen] = useState(false);
  const { city, condition, humidity, temprature, windSpeed, loading } =
    useSelector((state) => state.weather);

  useEffect(() => {
    dispatch(fetchWeather());
  }, [dispatch]);

  const getWeatherIcon = (condition) => {
    switch (condition?.toLowerCase()) {
      case "clear":
      case "sunny":
        return <Sun className="w-10 h-10 text-yellow-500" />;
      case "clouds":
        return <Cloud className="w-10 h-10 text-gray-500" />;
      case "rain":
        return <CloudRain className="w-10 h-10 text-blue-500" />;
      case "thunderstorm":
        return <CloudLightning className="w-10 h-10 text-amber-600" />;
      case "snow":
        return <Snowflake className="w-10 h-10 text-blue-300" />;
      case "drizzle":
        return <CloudDrizzle className="w-10 h-10 text-cyan-400" />;
      case "haze":
        return <Haze className="w-10 h-10 text-slate-400" />;
      case "mist":
      case "fog":
        return <CloudFog className="w-10 h-10 text-slate-400" />;
      case "night":
        return <Moon className="w-10 h-10 text-indigo-400" />;
      default:
        return <AlertTriangle className="w-10 h-10 text-red-500" />;
    }
  };

  const now = new Date();
  const date = now.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const currentHour = now.getHours();

  let icon = <Sunrise />;
  let greeting = "Hello";
  let suggestion = "";

  if (currentHour >= 5 && currentHour < 12) {
    icon = <Sunrise />;
    greeting = "Good Morning";
    suggestion = "Open the curtains and enjoy some sunlight.";
  } else if (currentHour >= 12 && currentHour < 16) {
    icon = <Sun />;
    greeting = "Good Afternoon";
    suggestion = "Consider watering your plants or checking energy usage.";
  } else if (currentHour >= 16 && currentHour < 20) {
    icon = <Sunset />;
    greeting = "Good Evening";
    suggestion = "Close the windows and check if doors are locked.";
  } else {
    icon = <Moon />;
    greeting = "Good Night";
    suggestion = "Turn off all lights and ensure everything is secured.";
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <CardContent className="space-y-2 h-full flex flex-col items-center justify-center text-center">
            {/* <Icon iconNode={houseRoof} /> */}
            <Home />
            <h2 className="text-lg font-semibold">Welcome Home</h2>
            <p className="text-muted-foreground">
              Turn on assistant lights and set comfort temperature.
            </p>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardContent className="flex gap-2 h-full items-center justify-between">
            <div>
              <div>{doorOpen ? <DoorOpen /> : <DoorClosed />}</div>
              <h3 className="font-semibold">Front Door</h3>
              <span className="text-muted-foreground text-sm">
                {doorOpen ? "Open" : "Closed"}
              </span>
            </div>
            <Switch checked={doorOpen} onCheckedChange={setDoorOpen} />
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardContent className="h-full flex flex-col gap-2 items-center justify-center text-center">
            <div>{icon}</div>
            <h2 className="text-lg font-semibold">
              {greeting}, {name}
            </h2>
            <p className="text-muted-foreground">{suggestion}</p>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardContent className="h-full">
            {loading ? (
              <p>Loading Weather...</p>
            ) : (
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-muted-foreground text-sm mb-2">
                    {date} {city && `- ${city}`}
                  </p>
                  <div className="flex gap-2 items-center">
                    {getWeatherIcon(condition)}
                    <div>
                      <p className="font-semibold text-lg">{condition}</p>
                      <p className="text-xl font-bold">{temprature}° C</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="flex flex-col mb-2 font-[550]">
                    {windSpeed} km/h
                    <span className="text-muted-foreground text-sm font-medium">
                      Wind Speed
                    </span>
                  </p>
                  <p className="flex flex-col font-[550]">
                    {humidity}%
                    <span className="text-muted-foreground text-sm font-medium">
                      Humidity
                    </span>
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default HouseStatus;
