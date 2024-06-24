import { useAuthContext } from "@/contexts/AuthContextProvider";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { BiLogOut } from "react-icons/bi";
import { useQueryClient } from 'react-query';


const LogOutButton = () => {
  const { setAuthUser } = useAuthContext();
  const [isPending, setIsPending] = useState<boolean>(false);
  const navigate = useNavigate();

  const queryClient = useQueryClient();



  const onClickHandler = async () => {
    setIsPending(true);
    await axios
      .post(`http://localhost:5000/api/auth/logout`)
      .then((res) => {
        localStorage.removeItem("Book-Store-Auth-User");
        setAuthUser({});
        queryClient.invalidateQueries(['User-Wish-List'])
        res.data.success &&  navigate("/");
      })
    //   .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsPending(false));
  };
  return (
    <Button
      disabled={isPending}
      variant={"ghost"}
      className="w-full"
      onClick={onClickHandler}
    >
      Log Out <BiLogOut className="w-4 h-4 ml-auto text-muted-foreground" />
    </Button>
  );
};

export default LogOutButton;
