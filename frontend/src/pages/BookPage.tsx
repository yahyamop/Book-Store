/* eslint-disable @typescript-eslint/no-unused-vars */
import AddAndDeleteButton from "@/components/AddAndDeleteButton";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { useAuthContext } from "@/contexts/AuthContextProvider";
import { fetcher } from "@/lib/utils";
import { IBook } from "@/typings";
import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

const BookPage = () => {
  const params = useParams();
  const bookId = params.id;

  const [isPending, setIdPending] = useState(false);
  const [book, setBook] = useState<IBook>();

  const { authUser } = useAuthContext();
  const { data, isLoading } = useQuery({
    queryKey: ["User-Wish-List", authUser?.id],
    queryFn: () =>
      fetcher("http://localhost:5000/api/book/wishlist", `${authUser}`),
    initialData: [],
  });

  const wishlist = Array.isArray(data) ? data : [];

  useEffect(() => {
    const fetchData = async () => {
      setIdPending(true);
      await axios
        .get(`http://localhost:5000/api/book/${bookId}`)
        .then((res) => setBook(res.data.results))
        .catch((error) => {
          console.log(error.message);
        })
        .finally(() => setIdPending(false));
    };

    fetchData();
  }, [bookId]);

  if (isLoading) {
    return <p>Loading</p>;
  }

  const checkCondition = authUser !== null ? true : false;
  const isAddedToWishList = checkCondition
    ? wishlist?.find((ele: IBook) => ele._id === book?._id)
    : false;

  return (
    <section className="bg-pinkBackgroundColor py-10 min-h-[800px]">
      <h3 className="text-heavyBlueColor text-xl font-semibold text-center">
        {book?.title}
      </h3>
      <div className="container py-8 flex flex-col justify-center items-center md:flex-row gap-20 mt-32">
        <div className="p-3 bg-white">
          <img src={book?.coverImage.secure_url} alt="book" width={320} />
        </div>
        <div className="flex flex-col gap-8">
          <p className="max-w-xl">{book?.description}</p>
          <span className="text-[#ea543a] text-xl font-bold">
            $ {book?.paymentPrice}
          </span>
            <div className="flex  bg-lightBlueColor w-fit rounded-md border border-heavyBlueColor">
              <AddToCartButton
              text="BUY NOW"
                className="p-2 px-8 text-heavyBlueColor uppercase border-r font-bold"
                bookId={book?._id as string}
              />
              <AddAndDeleteButton
              
                className="p-3"
                bookId={book?._id as string}
                isAddedToWishList={!!isAddedToWishList}
              />
            </div>
        </div>
      </div>
    </section>
  );
};

export default BookPage;
