import BookCard from "@/components/BookCard";
import Pagination from "@/components/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthContext } from "@/contexts/AuthContextProvider";
import { IBook } from "@/typings";
import axios from "axios";
import { useEffect, useState } from "react";

import { Link, useSearchParams } from "react-router-dom";
import { fetcher } from "@/lib/utils";
import { useQuery } from "react-query";
import { toast } from "sonner";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { MenuIcon } from "lucide-react";

interface IResults {
  books: IBook[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metaData: any;
}
const BooksPage = () => {
  const [isPending, setIdPending] = useState(false);
  const [categories, setCategories] = useState([]);

  // const [wishlist, setWishlist] = useState([]);
  const [results, setResults] = useState<IResults>();
  // const [refetch, setRefetch] = useState(false);

  const [searchParams] = useSearchParams(); //setSearchParams

  // console.log(searchParams.get("sort"));

  const { authUser } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      setIdPending(true);
      await axios
        .get(`http://localhost:5000/api/book?${searchParams}`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);

          setResults(res.data.results);
        })
        .catch((error) => {
          console.log(error.message);
        })
        .finally(() => setIdPending(false));
    };

    fetchData();
  }, [searchParams]);

  useEffect(() => {
    const fetchCategories = async () => {
      await axios
        .get("http://localhost:5000/api/category")
        .then((res) => setCategories(res.data.results))
        .catch((error) => toast.error(error.response.data.message));
    };

    fetchCategories();
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["User-Wish-List", authUser?.id],
    queryFn: () =>
      fetcher("http://localhost:5000/api/book/wishlist", `${authUser}`),
    initialData: [],
  });

  if (!data || isPending || isLoading) {
    return (
      <section className="py-20 bg-pinkBackgroundColor ">
        <div className="flex">
          <div className="hidden md:flex flex-col gap-5 border-r-2 h-full w-64 px-4 group">
            {[...Array(6)].map((_, i) => {
              return <Skeleton className="w-full h-10 " key={i} />;
            })}
          </div>
          <div className="flex flex-col flex-1">
            <div className="container  grid md:grid-cols2 lg:grid-cols-3 gap-10">
              {[...Array(6)].map((_, i) => {
                return <BookCard.bookSkeleton key={i} />;
              })}
            </div>

            <div className="flex items-center justify-center gap-4 mt-10">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="size-8 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }


  const wishlist = Array.isArray(data) ? data : [];

  if (!results?.books.length) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center py-20 bg-pinkBackgroundColor">
        <h1 className="text-2xl md:text-3xl lg:text-4xl ">
          There Is No Results
        </h1>
        <h3 className="text-2xl md:text-3xl lg:text-4xl ">
          Will Add More Soon .
        </h3>

        <Link className="px-2 py-2 border rounded-md" to={"/books"}>
          Go Back
        </Link>
      </div>
    );
  }

  return (
    <section className="py-20 bg-pinkBackgroundColor">
      <div className="flex">
        <div className="hidden md:flex flex-col gap-5 border-r-2 h-full w-64 px-4 group">
          <Link to={"/books"}>
            <h3 className="capitalize border-b-2 group-last:border-none p-2">
              all
            </h3>
          </Link>
          {categories?.map((category: { _id: string; title: string }) => (
            <Link to={`/books?categoryId=${category._id}`} key={category._id}>
              <h3 className="capitalize border-b-2 group-last:border-none p-2">
                {category.title}
              </h3>
            </Link>
          ))}
        </div>
        <div className="absolute block md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <MenuIcon  className="relative -top-16 left-5 size-10 text-black " />
            </SheetTrigger>
            <SheetContent className="bg-pinkBackgroundColor">
              <SheetHeader>
                <SheetTitle className="text-center">Filtering</SheetTitle>
                <Separator />
              </SheetHeader>
              <div className="flex-col gap-5np h-full w-64 px-4 group ">
                <Link to={"/books"}>
                  <h3 className="capitalize border-b-2 group-last:border-none p-2">
                    all
                  </h3>
                </Link>
                {categories?.map((category: { _id: string; title: string }) => (
                  <Link
                    to={`/books?categoryId=${category._id}`}
                    key={category._id}
                  >
                    <h3 className="capitalize border-b-2 group-last:border-none p-2">
                      {category.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex-1">
          <div className="container  grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {results?.books?.map((book) => {
              const checkCondition = authUser !== null ? true : false;
              const isAddedToWishList = checkCondition
                ? wishlist?.find((ele: IBook) => ele._id === book._id)
                : false;

              return (
                <BookCard
                  key={book._id}
                  data={book}
                  isAddedToWishList={!!isAddedToWishList}
                  showButtons
                />
              );
            })}
          </div>

          {/* Pagination */}
          <Pagination
            totalPages={results?.metaData?.totalPages}
            page={results?.metaData?.currentPage}
          />
        </div>
      </div>
    </section>
  );
};

export default BooksPage;
