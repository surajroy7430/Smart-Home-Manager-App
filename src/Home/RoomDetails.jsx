import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { Card } from "@/components/ui/card";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { db } from "../utils/firebaseConfig";
import { deviceComponentMap } from "./components/deviceComponentMap";

const ROOM_TYPES = [
  "bedroom",
  "livingroom",
  "homeoffice",
  "kitchen",
  "bathroom",
];

const animationVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};

const RoomDetails = () => {
  const { roomName, roomId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [roomData, setRoomData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoom = async () => {
      if (!user || !roomId) return;

      for (const type of ROOM_TYPES) {
        const typeRef = collection(db, "users", user.uid, type);
        const snapshot = await getDocs(typeRef);

        for (const doc of snapshot.docs) {
          if (doc.id === roomId) {
            const data = doc.data();
            setRoomData({ id: doc.id, ...data });
            setLoading(false);
            return;
          }
        }
      }

      setLoading(false);
    };

    fetchRoom();
  }, [roomId, user]);

  useEffect(() => {
    if (roomData && roomName.toLowerCase() !== roomData.name.toLowerCase()) {
      navigate(`/room/${roomData.name}/${roomData.id}`, { replace: true });
    }
  }, [roomData]);

  if (loading) return <p className="text-center mt-10">Loading Room...</p>;

  if (!roomData) {
    return (
      <div className="text-center mt-10">
        <p>Room not found.</p>
        <Button onClick={() => navigate(-1)} className="mt-4">
          <ArrowLeft className="mr-2" /> Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 space-y-6 px-4">
      <Button variant="outline" onClick={() => navigate(-1)} className="mb-2">
        <ArrowLeft className="mr-2" /> Back
      </Button>

      <Card className="overflow-hidden shadow-md p-0">
        <img
          src={roomData.image}
          alt={roomData.name}
          className="w-full h-100 object-cover"
        />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{roomData.name}</h2>

          <h3 className="text-lg font-semibold mb-1">Devices</h3>
          {roomData.devices && roomData.devices.length > 0 ? (
            <ul className="list-disc pl-5 space-y-1">
              {roomData.devices.map((device, index) => (
                <li key={index}>{device}</li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No devices found.</p>
          )}
        </div>
      </Card>

      <h3 className="text-lg font-semibold mb-1">Devices</h3>
      {roomData.devices && roomData.devices.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {roomData.devices.map((device, index) => {
            const DeviceComponent = deviceComponentMap[device];

            return DeviceComponent ? (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={animationVariants}
              >
                <DeviceComponent />
              </motion.div>
            ) : (
              <motion.div
                key={index}
                className="border p-4 rounded-md text-center text-muted-foreground"
                custom={index}
                initial="hidden"
                animate="visible"
                variants={animationVariants}
              >
                Unknown Device: {device}
              </motion.div>
            );
          })}
        </div>
      ) : (
        <p className="text-muted-foreground">No devices found.</p>
      )}
    </div>
  );
};

export default RoomDetails;
