import { useAuthContext } from "@/contexts/AuthContextProvider";
import { IBook } from "@/typings";
import axios from "axios";
import {  Trash } from "lucide-react"; //Pencil,
// import { Link } from "react-router-dom";
import { toast } from "sonner";
import {  useQueryClient } from "react-query";
// import { Link } from "react-router-dom";

interface IProps {
  data: IBook;
}
const DashboardBookCard = ({ data }: IProps) => {
  const { authUser } = useAuthContext();
  const queryClient = useQueryClient();


  const onDeleteHandler = async (bookId: string) => {
    await axios
      .delete(
        `http://localhost:5000/api/book/${bookId}`,
        {
          withCredentials: true,
          headers: {
            authorization: `${authUser}`,
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message)
        queryClient.invalidateQueries({
          queryKey: "Books",
        });
      })
      .catch((error) => toast.error(error.response.data.message));
  };
  return (
    <article className="relative flex flex-col justify-center items-center border shadow-md rounded-md pb-6">
      {/* <Link to={`/dashboard/books/edit/${data?._id}`}> */}
        <div className="p-6 ">
          <img
            src={`${data?.coverImage?.secure_url}`}
            alt="book"
            height={50}
            className="rounded-md"
          />
        </div>

        <div className="flex flex-col justify-center items-center ">
          <h3 className="text-[#393280] text-xl font-semibold">
            {data?.title}
          </h3>
          <p className="text-[#888888] mt-2 mb-6">{data?.author}</p>
        </div>
      {/* </Link> */}
      <div className="absolute bottom-0 w-full  flex items-center justify-center gap-4 p-2 border">
        <button
          className="flex items-center gap-2"
          onClick={()=>onDeleteHandler(data?._id)}
        >
          <Trash />
          Delete
        </button>
        {/* <button className="">
          <Link
            className="flex items-center gap-2"
            to={`/dashboard/books/edit/${data?._id}`}
          >
            <Pencil />
            Edit
          </Link>
        </button> */}
      </div>
    </article>
  );
};

export default DashboardBookCard;
