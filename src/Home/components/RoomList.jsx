import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../utils/firebaseConfig";
import { useAuth } from "../../context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ROOM_TYPES = [
  "bedroom",
  "livingroom",
  "homeoffice",
  "kitchen",
  "bathroom",
];

const RoomList = () => {
  const { user } = useAuth();
  const [roomGroups, setRoomGroups] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      const grouped = {};

      for (const type of ROOM_TYPES) {
        const typeRef = collection(db, "users", user.uid, type);
        const roomsSnap = await getDocs(typeRef);
        const rooms = roomsSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (rooms.length > 0) {
          grouped[type] = rooms;
        }
      }

      setRoomGroups(grouped);
      setLoading(false);
    };

    fetchRooms();
  }, []);

  return (
    <>
      {loading ? (
        <p className="text-center mt-10">Loading Rooms...</p>
      ) : (
        <div className="py-4 space-y-8">
          {Object.entries(roomGroups)?.map(([type, rooms]) => (
            <div key={type}>
              <h2  className="text-xl font-semibold mb-3">{rooms[0]?.name} ({rooms.length})</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {rooms.map((room) => (
                  <Card
                    key={room.id}
                    className="p-0 rounded-md cursor-pointer overflow-hidden"
                    onClick={() => navigate(`/room/${room.name}/${room.id}`)}
                  >
                    <CardContent className="p-0">
                      <img
                        src={room.image}
                        alt={room.type}
                        className="w-full h-50 sm:h-48 md:h-56 object-cover rounded-md"
                      />
                      <div className="p-4 flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{room.name}</h3>
                          <p className="text-muted-foreground text-sm">
                            {room.devices?.length || 0} Devices
                          </p>
                        </div>
                        <ChevronRight className="text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default RoomList;
