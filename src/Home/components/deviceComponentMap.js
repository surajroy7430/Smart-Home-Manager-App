import FanCard from "../devices/Fan/FanCard";
import SmartLightCard from "../devices/LightControls/SmartLightCard";
import LampCard from "../devices/LightControls/LampCard";
import ThermostatCard from "../devices/Thermostat/ThermostatCard";
import AirConditioner from "../devices/AirConditioner";
import Computer from "../devices/Computer";
import Fridge from "../devices/Fridge";
import OvenCard from "../devices/OvenCard";
import Speaker from "../devices/Speaker";
import MirrorDisplay from "../devices/MirrorDisplay";
import LeakSensor from "../devices/LeakSensor";
import SmartTV from "../devices/SmartTV";

export const deviceComponentMap = {
  "Smart TV": SmartTV,
  "Smart Light": SmartLightCard,
  Thermostat: ThermostatCard,
  Fan: FanCard,
  Lamp: LampCard,
  Speaker,
  AC: AirConditioner,
  Computer,
  Oven: OvenCard,
  Fridge,
  "Leak Sensor": LeakSensor,
  "Mirror Display": MirrorDisplay,
};
