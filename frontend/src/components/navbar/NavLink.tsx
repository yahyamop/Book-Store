import { Link } from "react-router-dom";

interface IProps {
  label: string;
  href: string;
}
const NavLink = ({ label, href }: IProps) => {
  return (
    <li className="group mt-4 ">
      <Link className="capitalize text-[#a9c8e0] border-r px-10 group-last:border-none" to={href}>{label}</Link>
    </li>
  );
};

export default NavLink;





