import BookCard from "@/components/BookCard";
import { useAuthContext } from "@/contexts/AuthContextProvider";
import { fetcher } from "@/lib/utils";
import { IBook } from "@/typings";
import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useQueryClient } from "react-query";

const WishListPage = () => {
  const { authUser } = useAuthContext();
  const useQueryVariable = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["User-Wish-List", authUser?.id],
    queryFn: () =>
      fetcher("http://localhost:5000/api/book/wishlist", `${authUser}`),
    initialData: [],
    // refetchOnWindowFocus: false,
  });

  if (isLoading || !data) return <p>Loading ....</p>;

  const wishlist = Array.isArray(data) ? data : [];

  const onClearHandler = async () => {
    await axios
      .patch("http://localhost:5000/api/book/wishlist/clear",{},{
        headers:{
          authorization:`${authUser}`
        }
      })
      .then(() => {
        toast.success("Wishlist is empty now")
        useQueryVariable.invalidateQueries({
          queryKey: ["User-Wish-List", authUser?.id],
        });
      })
      .catch(() => toast.error("Something went wrong"));
  };

  return (
    <section className="bg-pinkBackgroundColor py-10">
      <div className="container">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
          Wish List
        </h1>

        {wishlist?.length > 0 ? (
          <div className="relative container py-10 grid md:grid-cols-3 lg:grid-cols-4 gap-10">
            <button
              onClick={onClearHandler}
              className="absolute border p-2 top-0 right-10 bg-heavyBlueColor text-white rounded-md"
            >
              Clear Wishlist
            </button>
            {wishlist?.map((item: IBook) => {
              const checkCondition =
                authUser !== null || !wishlist.length ? true : false;
              const isAddedToWishList = checkCondition
                ? wishlist?.find((ele: IBook) => ele._id === item._id)
                : false;
              return (
                <BookCard
                  data={item}
                  key={item._id}
                  isAddedToWishList={isAddedToWishList}
                />
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col gap-4 justify-center items-center">
            <h1 className="text-2xl md:text-3xl lg:text-4xl ">
              Your Wish List Empty
            </h1>
            <h3 className="text-2xl md:text-3xl lg:text-4xl ">Don't Worry</h3>
            <button>
              <Link to={"/books"}>Discover Books</Link>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default WishListPage;
