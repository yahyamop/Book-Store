import { FiUser } from "react-icons/fi";
import { BsBag } from "react-icons/bs";
import { TiHeart } from "react-icons/ti";
import CartSheet from "../cart/CartSheet";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";

const LoggedInActions = () => {
  return (
    <div className="flex gap-2 capitalize text-[#a9c8e0]">
      <UserMenu>
        <span className="cursor-pointer flex items-center gap-x-1 border-r px-2.5">
          <FiUser />
          <span className="hidden md:block">account</span>
        </span>
      </UserMenu>

      <CartSheet>
        <span className="cursor-pointer  flex items-center gap-x-1 border-r px-2.5">
          <BsBag />
          <span className="hidden md:block">cart:(0$)</span>
        </span>
      </CartSheet>
      <span className="cursor-pointer ">
        <Link className=" flex items-center gap-x-1 px-1 " to={"/wishlist"}>
          <TiHeart />
          <span className="hidden md:block">wishlist</span>
        </Link>
      </span>
    </div>
  );
};

export default LoggedInActions;
