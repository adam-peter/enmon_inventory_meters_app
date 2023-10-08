import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import UserPopover from "./UserPopover";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array to ensure the effect runs only once on mount

  return (
    <div className="flex justify-between py-5">
      <Button onClick={() => navigate("/")} className="" variant="link">
        <img
          src="./enmon-technologies-logo.svg"
          alt="Enmon Technologies Logo"
        />
      </Button>

      {viewportWidth < 640 ? (
        <div className="flex gap-2">
          <UserPopover />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-10 w-10">
                <FontAwesomeIcon icon={faBars} className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex w-80 flex-col items-center gap-2 p-2">
              <DropdownMenuItem className="w-full p-0">
                <Button
                  variant="link"
                  onClick={() => navigate("/")}
                  className="w-full"
                >
                  Home
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem className="w-full p-0">
                <Button
                  disabled={!loggedIn}
                  variant="link"
                  onClick={() => navigate("/inventory-meters")}
                  className="w-full"
                >
                  Inventory Meters
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="flex gap-8">
          <Button variant="outline" onClick={() => navigate("/")}>
            Home
          </Button>
          <Button
            disabled={!loggedIn}
            variant="outline"
            onClick={() => navigate("/inventory-meters")}
          >
            Inventory Meters
          </Button>
          <UserPopover />
        </div>
      )}
    </div>
  );
};

export default Navbar;
