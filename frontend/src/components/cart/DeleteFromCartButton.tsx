import axios from "axios";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { BiTrash } from "react-icons/bi";
import { useQueryClient } from "react-query";
import { useAuthContext } from "@/contexts/AuthContextProvider";
interface IProps {
  bookId: string;
}

const DeleteFromCartButton = ({ bookId }: IProps) => {
  console.log("bookId", bookId);
  const { authUser } = useAuthContext();
  const queryClient = useQueryClient();

  const deleteFromCartHandler = () => {
    axios
      .patch(
        `http://localhost:5000/api/cart/${bookId}`,
        {},
        {
          withCredentials: true,
          headers: {
            authorization: `${authUser}` || "",
          },
        }
      )
      .then((res) => {
        res.data.success && toast.success("Book Deleted From Cart .");
        queryClient.invalidateQueries({
          queryKey: ["UserCart", authUser?.id],
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.log(error);
      });
  };
  return (
    <Button
      className="space-x-2 h-auto p-2"
      size={"sm"}
      variant={"ghost"}
      onClick={deleteFromCartHandler}
    >
      <BiTrash size={16} />
    </Button>
  );
};

export default DeleteFromCartButton;
