import axios from "axios";
// import { toast } from "sonner";
import { useAuthContext } from "@/contexts/AuthContextProvider";
import { toast } from "sonner";
import { useQueryClient } from "react-query";
import { cn } from "@/lib/utils";

interface IProps {
  bookId: string;
  quantity?: number;
  className?: string;
  showIcon?: boolean;
  text?: string;
}

const AddToCartButton = ({ bookId, quantity = 1, className, text }: IProps) => {
  const useQueryVariable = useQueryClient();
  const { authUser } = useAuthContext();
  const userId = authUser?.id;

  const addToCartHandler = async () => {
    if (!authUser) {
      return toast.error("Please login first to add items ");
    }

    await axios
      .post(
        "http://localhost:5000/api/cart",
        { bookId, quantity },
        {
          withCredentials: true,
          headers: {
            authorization: `${authUser}` || "",
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          toast.success("Product added To Cart .");
          useQueryVariable.invalidateQueries({
            queryKey: ["UserCart", userId],
          });
        }
      })
      .catch((error) => toast.error(error.response.data.message));
  };
  return (
    <button
      onClick={addToCartHandler}
      className={cn(
        "py-1 px-20 text-white uppercase border-r font-bold",
        className
      )}
    >
      {text || "buy"}
    </button>
  );
};

export default AddToCartButton;
