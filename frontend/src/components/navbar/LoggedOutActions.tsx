import { Link } from "react-router-dom";

const LoggedOutActions = () => {
  return (
    <div className="flex items-center gap-x-2">
      <Link
        className="uppercase flex items-center border rounded-md py-2 px-4 text-sm text-white"
        to={"/register"}
      >
        register
      </Link>

      <Link
        className="uppercase flex items-center border rounded-md py-2 px-4 text-sm text-white"
        to={"/login"}
      >
        login
      </Link>
    </div>
  );
};

export default LoggedOutActions;
