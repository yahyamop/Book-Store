import { IBook } from "@/typings";
import SectionHeading from "../SectionHeading";
import AddToCartButton from "../cart/AddToCartButton";
import AddAndDeleteButton from "../AddAndDeleteButton";
import { useAuthContext } from "@/contexts/AuthContextProvider";
import { useQuery } from "react-query";
import { fetcher } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

const BestSeller = ({
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

  const checkCondition = authUser !== null ? true : false;
  const isAddedToWishList = checkCondition
    ? wishlist?.find((ele: IBook) => ele._id === bestSeller[0]?._id)
    : false;

  return (
    <section className="bg-pinkBackgroundColor py-10">
      <SectionHeading title="Best Seller" />
      <div className="container py-8 flex flex-col justify-center items-center md:flex-row gap-20 ">
        <div className="p-3 bg-white">
          {isPending ?  (
            <Skeleton className="size-[400px]"/>
          ): (
            <img
            src={bestSeller[0]?.coverImage?.secure_url}
            alt="book"
            width={400}
          />
          )}
        </div>
        <div className="flex flex-col gap-8">
          <h3 className="text-heavyBlueColor text-xl font-semibold">
            {bestSeller[0]?.title}
          </h3>
          <p className="max-w-xl">
            Jump start your book reading by quickly check through the popular
            book categories. 1000+ books are published by different authors
            everyday. Buy your favourite books on TreeBooks Today,
          </p>
          {bestSeller[0]?.onSale ? (
            <div className="flex items-center gap-10">
              <span className="text-[#bd948d] text-xl font-bold line-through">
                ${bestSeller[0]?.price}
              </span>
              <span className="text-[#ea543a] text-xl font-bold">
                $ {bestSeller[0]?.paymentPrice}
              </span>
            </div>
          ) : (
            <span className="text-[#ea543a] text-xl font-bold">
              $ {bestSeller[0]?.paymentPrice}
            </span>
          )}
          <div className="flex  bg-lightBlueColor w-fit rounded-md border border-heavyBlueColor">
            <AddToCartButton
              text="BUY NOW"
              className="p-2 px-8 text-heavyBlueColor uppercase border-r font-bold"
              bookId={bestSeller[0]?._id as string}
            />
            <AddAndDeleteButton
              className="p-3"
              bookId={bestSeller[0]?._id as string}
              isAddedToWishList={!!isAddedToWishList}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSeller;
