import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";
import { useAuthContext } from "../../contexts/AuthContextProvider";
import LogOutButton from "./LogOutButton";

const UserMenu = ({ children }: { children: React.ReactNode }) => {
  const { isAdmin } = useAuthContext();
  
  const [isAdminState, setISAdminState] = useState(false || isAdmin);

  useEffect(() => {
    setISAdminState(isAdmin);
  }, [isAdmin]);

  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <p></p>

        {isAdminState ? (
          <Link className="text-md font-semibold" to={"/dashboard"}>
            Dashboard
          </Link>
        ) : (
          <Link className="text-md font-semibold" to={"/profile"}>
            profile
          </Link>
        )}
        <Separator className="my-4" />
        <p>Link 1</p>
        <Separator className="my-4" />
        <p>Link 2</p>

        <Separator className="my-4" />

        <LogOutButton />
      </PopoverContent>
    </Popover>
  );
};

export default UserMenu;
