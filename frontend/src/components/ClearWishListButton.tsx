import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";

const ClearWishListButton = () => {
  const onClickHandler = async () => {
    axios
      .patch("/api/book/wishlist/clear/")
      .then((res) => toast.success(res.data.message))
      .catch((error) => toast.error(error.response.data.message));
  };
  return <Button onClick={onClickHandler}>Clear Wish List</Button>;
};

export default ClearWishListButton;
