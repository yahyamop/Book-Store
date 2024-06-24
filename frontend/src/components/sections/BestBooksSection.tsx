import BookCard from "@/components/BookCard";
import SectionHeading from "../SectionHeading";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { IBook } from "@/typings";
import { useAuthContext } from "@/contexts/AuthContextProvider";
import { useQuery } from "react-query";
import { fetcher } from "@/lib/utils";

const BestBooksSection = ({
  bestSeller,
  isPending,
}: {
  bestSeller: IBook[];
  isPending: boolean;
}) => {
  const { authUser } = useAuthContext();
  const { data, isLoading } = useQuery({
    queryKey: ["User-Wish-List", authUser?.id],
    queryFn: () =>
      fetcher("http://localhost:5000/api/book/wishlist", `${authUser}`),
    initialData: [],
  });

  const wishlist = Array.isArray(data) ? data : [];
  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <section className="py-10 bg-pinkBackgroundColor ">
      <SectionHeading title="Best Books" />
      <button className="flex items-center ml-auto mr-10 text-[#ea543a] font-bold mt-4">
        <Link to={"/books"}>View All Products</Link>
        <ArrowRightIcon className="ml-2" />
      </button>
      <div className="container grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-4 gap-4">
        {isPending
          ? [...Array(4).map((_, i) => <BookCard.bookSkeleton key={i} />)]
          : bestSeller.slice(0, 4).map((book) => {
              const checkCondition = authUser !== null ? true : false;
              const isAddedToWishList = checkCondition
                ? wishlist?.find((ele: IBook) => ele._id === book?._id)
                : false;
              return (
                <BookCard
                  data={book}
                  key={book._id}
                  showButtons
                  isAddedToWishList={isAddedToWishList}
                />
              );
            })}
      </div>
    </section>
  );
};

export default BestBooksSection;
