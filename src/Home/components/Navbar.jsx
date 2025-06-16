import { auth } from "../../utils/firebaseConfig";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useUserInfo } from "../../context/UserInfoContext";

const Navbar = () => {
  const { name, email, photoUrl } = useUserInfo();
  const navigate = useNavigate();
  const fallbackName = name?.charAt(0).toUpperCase();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="relative z-50 flex items-center justify-between px-6 py-3 shadow-md bg-background border-b">
      <div className="flex items-center gap-10">
        <Link to="/dashboard">
          <img
            src="https://i.ibb.co/DD0pS98p/logo.png"
            alt="qubic-home"
            className="w-15"
          />
        </Link>
        <div className="flex gap-4">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `font-semibold py-1 transition-colors border-b-3 ${
                isActive
                  ? "border-secondary text-accent-secondary"
                  : "border-transparent hover:border-secondary/60"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/add-room"
            className={({ isActive }) =>
              `font-semibold py-1 transition-colors border-b-3 ${
                isActive
                  ? "border-secondary text-accent-secondary"
                  : "border-transparent hover:border-secondary/60"
              }`
            }
          >
            Add Room
          </NavLink>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src={photoUrl || ""} alt={name} />
            <AvatarFallback>{fallbackName}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-48" align="end">
          <div className="px-2 py-1 text-sm font-normal cursor-default">
            <div className="flex flex-col space-y-1">
              <div className="text-sm font-medium leading-none">{name}</div>
              <div className="text-xs leading-none text-muted-foreground">
                {email}
              </div>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Navbar;
