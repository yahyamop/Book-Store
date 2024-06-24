import BookCard from "@/components/BookCard";
import DashboardBookCard from "@/components/dashboard/DashboardBookCard";
import Pagination from "@/components/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { IBook } from "@/typings";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

interface IResults {
  books: IBook[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metaData: any;
}
const DashboardBookPage = () => {
  const [searchParams] = useSearchParams();
  const [isPending, setIdPending] = useState(false);
  const [results, setResults] = useState<IResults>();

  useEffect(() => {
    const fetchData = async () => {
      setIdPending(true);
      await axios
        .get(`http://localhost:5000/api/book?${searchParams}`, {
          withCredentials: true,
        })
        .then((res) => {
          setResults(res.data.results);
        })
        .catch((error) => {
          console.log(error.message);
        })
        .finally(() => setIdPending(false));
    };

    fetchData();
  }, [searchParams]);
  const books = results?.books;
  const metaData = results?.metaData;

  if (isPending) {
    return (
      <section className="py-20 bg-pinkBackgroundColor">
        <div className="container  grid md:grid-cols2 lg:grid-cols-3 gap-10">
          {[...Array(6)].map((_, i) => {
            return <BookCard.bookSkeleton key={i} />;
          })}
        </div>

        <div className="flex items-center justify-center gap-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="siz-8 rounded-full" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-10">
      <button className="block mx-auto border px-6 py-2 bg-heavyBlueColor text-white rounded-md">
        <Link to={"add"}>add new</Link>
      </button>
      <div className="container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 py-10">
        {books?.map((book: IBook) => (
          <DashboardBookCard data={book} key={book._id}/>
        ))}
      </div>
      {books?.length && (
        <Pagination
          totalPages={metaData?.totalPages}
          page={metaData?.currentPage}
        />
      )}
    </section>
  );
};

export default DashboardBookPage;
