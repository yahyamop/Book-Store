import axios from "axios";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { useAuthContext } from "@/contexts/AuthContextProvider";
import { TiHeart } from "react-icons/ti";

import { useQueryClient } from "react-query";

interface IProps {
  isAddedToWishList: boolean;
  bookId: string;
  className?: string;
}
const AddAndDeleteButton = ({
  isAddedToWishList,
  bookId,
  className,
}: IProps) => {
  const useQuery = useQueryClient();
  const { authUser } = useAuthContext();


  const onClickHandler = async () => {
    if (!authUser) {
      return toast.error("Please login first to add items ");
    }
    if (isAddedToWishList) {
      axios
        .patch(
          `http://localhost:5000/api/book/wishlist/remove/${bookId}`,
          {},
          {
            withCredentials: true,
            headers: {
              authorization: `${authUser}` || "",
            },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          useQuery.invalidateQueries({
            queryKey: ["User-Wish-List", authUser?.id],
          });
        })
        .catch((error) => toast.error(error.response.data.message));
    } else {
      axios
        .patch(
          `http://localhost:5000/api/book/wishlist/add/${bookId}`,
          {},
          {
            withCredentials: true,
            headers: {
              authorization: `${authUser}` || "",
            },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          useQuery.invalidateQueries({
            queryKey: ["User-Wish-List", authUser?.id],
          });
        })
        .catch((error) => toast.error(error.response.data.message));
    }
  };

  return (
    <button
      className={cn("py-1 px-6 text-red-600", className)}
      onClick={onClickHandler}
    >
      <TiHeart
        color={isAddedToWishList ? "red" : "white"}
        className={cn("size-8")}
      />
    </button>
  );
};

export default AddAndDeleteButton;
