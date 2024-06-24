/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetcher } from "@/lib/utils";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

const DashboardCategoryPage = () => {
  const { data } = useQuery({
    queryKey: "Categories",
    queryFn: () => fetcher("http://localhost:5000/api/category"),
  });

  if (!data) {
    return <p>Loading</p>;
  }

  console.log(data);

  return (
    <section className="py-10">
      <button className="block mx-auto border px-6 py-2 mb-10 bg-heavyBlueColor text-white rounded-md">
        <Link to={"add"}>add new</Link>
      </button>
      <div className="container grid md:grid-col-3 lg:grid-cols-4 gap-10">
        {data.map((category: any) => (
          <article className="border p-4 ">
            <Link to={`/dashboard/categories/edit/${category._id}`}>
              <h3>{category.title}</h3>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default DashboardCategoryPage;
