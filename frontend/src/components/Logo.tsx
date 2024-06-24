import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={"/"}>
      <div className="flex items-center gap-2">
        <img
          src="/images/logo-removebg-preview.png"
          alt="logo"
          width={70}
          height={70}
        />
        <h1 className="font-bold text-xl capitalize text-white">
          book <br /> store
        </h1>
      </div>
    </Link>
  );
};

export default Logo;
