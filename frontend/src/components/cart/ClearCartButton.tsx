import axios from "axios";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { useAuthContext } from "@/contexts/AuthContextProvider";

const ClearCartButton = () => {
  const { authUser } = useAuthContext();

  const onClickHandler = async () => {
    axios
      .put(
        "/api/car/clear",
        {},
        {
          withCredentials: true,
          headers: {
            authorization: `${authUser}` || "",
          },
        }
      )
      .then((res) => toast.success(res.data.message))
      .catch((error) => toast.error(error.response.data.message));
  };
  return (
    <Button className="" onClick={onClickHandler}>
      <Trash />
    </Button>
  );
};

export default ClearCartButton;
