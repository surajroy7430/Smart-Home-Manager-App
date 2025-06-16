import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import { Button } from "@/components/ui/button";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import {
  addRoom,
  fetchSmartHomeConfig,
  removeRoom,
  setHouseholdName,
  updateRoomDevices,
} from "../features/smarthome/smartHomeSlice";

const AddRoom = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const {
    householdName,
    rooms,
    config: { roomOptions, roomDeviceMap, roomImageMap },
    loading,
  } = useSelector((state) => state.smartHome);

  const [roomName, setRoomName] = useState("");
  const [selectedDevices, setSelectedDevices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSmartHomeConfig());

    const fetchHouseholdName = async () => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          dispatch(setHouseholdName(userSnap.data().householdName || ""));
        }
      }
    };

    fetchHouseholdName();
  }, [dispatch, user]);

  const handleAddRoom = () => {
    const name = roomName.trim();

    if (!name || rooms.some((r) => r.name === name)) return;

    dispatch(
      addRoom({
        name,
        type: roomName.toLowerCase(),
        devices: selectedDevices,
        image: roomImageMap[name] || "",
      })
    );

    setRoomName("");
    setSelectedDevices([]);
  };

  const availableRoomOptions = roomOptions.filter(
    (room) => !rooms.some((r) => r.name === room)
  );

  const availableDevices = roomName ? roomDeviceMap[roomName] || [] : [];

  const handleSubmit = async () => {
    if (rooms.length === 0 || !user) return;

    const roomWriteOps = rooms.map((room) => {
      const roomTypeRef = collection(
        db,
        "users",
        user.uid,
        room.type.split(" ").join("")
      );
      return addDoc(roomTypeRef, {
        ...room,
        createdAt: new Date().toISOString(),
      });
    });

    await Promise.all(roomWriteOps);
    navigate("/dashboard");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-card shadow-lg rounded-xl border space-y-6">
      <h2 className="text-2xl font-bold text-center">Add Rooms to {householdName || "Your Home"}</h2>

      <div>
        <Label className="mb-1">Add Room</Label>
        <div className="flex flex-col items-center gap-2">
          <MultiSelect
            options={availableRoomOptions}
            selected={roomName ? [roomName] : []}
            onChange={(values) => {
              setRoomName(values[0] || "");
              setSelectedDevices([]);
            }}
            placeholder="Select Room"
          />
          <MultiSelect
            options={availableDevices}
            selected={selectedDevices}
            onChange={setSelectedDevices}
            placeholder="Select Devices"
          />
          <Button
            onClick={handleAddRoom}
            disabled={!roomName || selectedDevices.length === 0}
            className="w-full"
          >
            Add
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {rooms.map((room, i) => (
          <div key={i} className="border p-3 rounded-lg bg-muted/50 space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold">{room.name}</h4>
              <button
                onClick={() => dispatch(removeRoom(room.name))}
                className="text-red-500 text-sm"
              >
                &times;
              </button>
            </div>

            <MultiSelect
              options={roomDeviceMap[room.name] || []}
              selected={room.devices}
              onChange={(devices) => {
                if (devices.length === 0) {
                  dispatch(removeRoom(room.name));
                } else {
                  dispatch(updateRoomDevices({ name: room.name, devices }));
                }
              }}
              placeholder="Update Devices"
            />
          </div>
        ))}
      </div>

      <Button
        variant="secondary"
        className="w-full"
        disabled={loading || rooms.length === 0}
        onClick={handleSubmit}
      >
        {loading ? "Saving..." : "Save Rooms"}
      </Button>
    </div>
  );
};

export default AddRoom;
