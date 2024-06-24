import { NavLinks } from "@/constants";
import Logo from "../Logo";
import LoggedInActions from "./LoggedInActions";
import LoggedOutActions from "./LoggedOutActions";
import NavLink from "./NavLink";
import SearchBar from "./SearchBar";
import { useAuthContext } from "@/contexts/AuthContextProvider";
import { MenuIcon } from "lucide-react";
import MobileMenu from "./MobileMenu";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const { authUser } = useAuthContext();

  return (
    <header className="relative bg-heavyBlueColor p-6">
      <nav className="w-full flex flex-col items-center justify-between">
        <div className="w-full flex  items-center justify-between">
          {/* Logo */}
          <Logo />
          {/* SearchBar */}
          <div className={cn("absolute left-1/2 -translate-x-1/2 hidden  md:flex justify-center flex-1 lg:w-[400px]  xl:w-[600px] ",)}>
            <SearchBar />
          </div>
          {/* Action Logged in - logged out */}
          <div className="flex items-center gap-4">
            {authUser && Object.keys(authUser).length ? (
              <LoggedInActions />
            ) : (
              <LoggedOutActions />
            )}
            {/* Mobile Menu */}
            <div className="block md:hidden">
              <MobileMenu>
                <MenuIcon className="size-6 text-white " />
              </MobileMenu>
            </div>
          </div>
        </div>
        {/* Nav Links */}
        <ul className="hidden md:flex items-center justify-center ">
          {NavLinks.map((link, i) => (
            <NavLink key={i} label={link.label} href={link.href} />
          ))}
        </ul>
        <div className="flex justify-center md:hidden w-full mt-5">
          <SearchBar />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
