import { useEffect, useState } from "react";
import { IBook } from "../typings";
import AddAndDeleteButton from "./AddAndDeleteButton";
import { Skeleton } from "./ui/skeleton";
import AddToCartButton from "./cart/AddToCartButton";
import { Link } from "react-router-dom";

interface IProps {
  data: IBook;
  isAddedToWishList?: boolean;
  showButtons?: boolean;
  showPrice?: boolean;
  forEdit?: boolean;
}
const BookCard = ({
  data,
  isAddedToWishList: initialIsAddedToWishList,
  showButtons,
  showPrice,
  forEdit,
}: IProps) => {
  const [isAddedToWishList, setIsAddedToWishList] = useState(
    initialIsAddedToWishList
  );
  useEffect(() => {
    setIsAddedToWishList(initialIsAddedToWishList);
  }, [initialIsAddedToWishList]);

  return (
    <article className="relative flex flex-col justify-center items-center  max-w-[230px] h-[600px] mx-auto">
      <Link
        className="overflow-hidden"
        to={
          forEdit ? `/dashboard/books/edit/${data?._id}` : `/books/${data?._id}`
        }
      >
        <div className="relative p-6 bg-white">
          <img
            src={`${data?.coverImage?.secure_url}`}
            alt="book"
            width={180}
            height={280}
            className="h-[280px]"
          />
        </div>

        <div className="flex flex-col justify-center items-center  mt-4">
          <h3 className="text-[#393280] text-xl font-semibold  break-words max-w-[220px] truncate  ">
            {data?.title}
          </h3>
          <p className="text-[#888888] mt-2 mb-6">{data?.author}</p>
          {showPrice && (
            <div className="flex items-center gap-10">
              <span className="text-[#bd948d] text-xl font-bold line-through">
                ${data.price}
              </span>
              <span className="text-[#ea543a] text-xl font-bold">
                $ {data?.paymentPrice}
              </span>
            </div>
          )}
          {/* : (
            <span className="text-[#ea543a] text-xl font-bold">
              $ {data?.paymentPrice}
            </span>
          ) */}
        </div>
      </Link>
      {showButtons && (
        <div className="flex  bg-lightBlueColor w-fit mt-3">
          <AddToCartButton bookId={data?._id} />
          <AddAndDeleteButton
            bookId={data?._id}
            isAddedToWishList={!!isAddedToWishList}
          />
        </div>
      )}
    </article>
  );
};

BookCard.bookSkeleton = function bookSkeleton() {
  return (
    <article className="flex flex-col justify-center items-center ">
      <div className="">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      </div>

      <div className="flex flex-col justify-center items-center gap-4  mt-4">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[250px]" />
      </div>
    </article>
  );
};

export default BookCard;
