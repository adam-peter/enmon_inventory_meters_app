import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { PopoverClose } from "@radix-ui/react-popover";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const UserPopover = () => {
  const dispatch = useDispatch();
  const { loggedIn, authData } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <Popover onOpenChange={() => setOpen((prev) => !prev)}>
      <PopoverTrigger asChild>
        <Button disabled={!loggedIn} variant="outline" className="h-10 w-10">
          {open ? (
            <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
          ) : (
            <FontAwesomeIcon icon={faUser} className="h-4 w-4" />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="flex w-80 flex-col gap-4">
        <div className="flex w-full gap-4">
          <FontAwesomeIcon
            icon={faUser}
            className="h-4 w-4 rounded border border-slate-800 p-4"
          />
          <div className="flex flex-col">
            <p>{authData?.user.username}</p>
            <p>{authData?.user.email}</p>
          </div>
        </div>

        <PopoverClose asChild>
          <Button
            onClick={() => {
              dispatch(logout());
              navigate("/");
            }}
            size="sm"
            variant="secondary"
          >
            Logout
          </Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
};

export default UserPopover;
