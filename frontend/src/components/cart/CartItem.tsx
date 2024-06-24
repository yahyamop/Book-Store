import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useQueryClient } from "react-query";
import DeleteFromCartButton from "./DeleteFromCartButton";
import { useAuthContext } from "@/contexts/AuthContextProvider";

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  userId: string;
}
const CartItem = ({ data, userId }: IProps) => {
  const { authUser } = useAuthContext();

  const [quantity, setQuantity] = useState<number>(+data.quantity);
  const bookId = data.bookId._id;
  const queryClient = useQueryClient();

  const amountHandler = async (type: string) => {
    // type == "+" ? setQuantity(quantity + 1) : setQuantity(quantity - 1);
    setQuantity((prevValue) => {
      const newQuantity = type === "+" ? prevValue + 1 : prevValue - 1;
      return Math.max(Math.min(newQuantity, 100), 1);
    });
  };

  useEffect(() => {

    if (quantity !== data.quantity) {
      axios
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
          res.data.success && toast.success("Product Updated .");
          queryClient.invalidateQueries({
            queryKey: ["UserCart", userId],
          });
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setQuantity(data.quantity);
        });
    }
  }, [quantity]);

  return (
    <div className="flex items-center justify-between gap-2 border p-2 mt-2 rounded-2xl">
      <img
        src={data?.bookId?.coverImage?.secure_url}
        alt=""
        width={80}
        height={80}
        className="object-contain rounded-md"
      />
      <div>
        <p>{data.bookId.title.split(" ").slice(0, 3).join(" ")}</p>
      </div>

      <div className="flex items-center">
        <Button
          type="button"
          className="h-fit p-2 text-xl font-bold"
          variant={"ghost"}
          onClick={() => amountHandler("-")}
        >
          -
        </Button>
        <p>{quantity}</p>

        <Button
          type="button"
          className="h-fit p-2 text-xl font-bold"
          variant={"ghost"}
          onClick={() => amountHandler("+")}
        >
          +
        </Button>
      </div>

      <DeleteFromCartButton bookId={bookId} />

      <p className="text-xl font-semibold text-nowrap">
        $ {+data.bookId.paymentPrice * +data.quantity}
      </p>
    </div>
  );
};

export default CartItem;
