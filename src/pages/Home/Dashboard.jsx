import { Button } from "@/components/ui/button";
import { auth } from "../../utils/firebaseConfig";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      Dashboard
      <Button onClick={handleSignOut}>Logout</Button>
    </div>
  );
};

export default Dashboard;
