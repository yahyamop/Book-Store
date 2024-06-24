import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Separator } from "../ui/separator";
import { NavLinks } from "@/constants";
import { Link } from "react-router-dom";
const MobileMenu = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="">
        <SheetHeader>
          <SheetTitle className="text-center">Website Links</SheetTitle>
          <Separator />
        </SheetHeader>
        <ul className="flex flex-col gap-4 py-10">
          {NavLinks.map((link, i) => (
            <Link
              key={i}
              className="capitalize  border-b pb-2 text-center px-10 group-last:border-none"
              to={link.href}
            >
              {link.label}
            </Link>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
