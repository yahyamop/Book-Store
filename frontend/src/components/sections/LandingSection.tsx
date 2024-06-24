import { ArrowRightIcon } from "@radix-ui/react-icons";
import SectionHeading from "../SectionHeading";
import { Link } from "react-router-dom";

const LandingSection = () => {
  return (
    <section className="grid lg:grid-cols-2 md:h-[calc(100vh-140px)] ">
      {/* Text Left Part */}
      <div className="relative bg-gradient-to-r from-[#fcecec] to-white  py-10">
        <SectionHeading title="Ipsum Dolor Si" />
        <div className="container mt-40">
          <p className="max-w-sm text-heavyBlueColor font-semibold">
            Lorem ipsum dolor sit amet, consectetur adipiscing elite Sed eu
            feugiat amet, libero ipsum enim pharetra hac. Urna commodo, lacus ut
            magna velit eleifend. Amet, quis urna, a eu.
          </p>
          <Link className="block w-fit" to={"contact-us"}>
            <button className="uppercase flex items-center border border-heavyBlueColor text-heavyBlueColor rounded-md py-2 px-4 text-sm mt-6">
              Read More
              <ArrowRightIcon className="size-3 ml-2" />
            </button>
          </Link>
        </div>
        <div className="absolute right-0 top-0 h-full w-32  " />
      </div>

      {/* Images Right Part */}
      <div className="px-4 flex mb-20 items-center  gap-x-4 bg-[#ffffff]">
        <div>
          <img
            src="images/book0.jpg"
            alt="book"
            width={125}
            height={125}
            className=" shadow-xl rounded-xl "
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <img
            src="images/book1.jpg"
            alt="book"
            width={125}
            height={125}
            className=" shadow-xl rounded-xl "
          />
          <img
            src="images/book2.jpg"
            alt="book"
            width={125}
            height={125}
            className=" shadow-xl rounded-xl "
          />
        </div>
        <div className="flex flex-col gap-y-2 mt-20">
          <img
            src="images/book3.jpg"
            alt="book"
            width={125}
            height={125}
            className=" shadow-xl rounded-xl "
          />
          <img
            src="images/book4.jpg"
            alt="book"
            width={125}
            height={125}
            className=" shadow-xl rounded-xl "
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <img
            src="images/book5.jpg"
            alt="book"
            width={125}
            height={125}
            className=" shadow-xl rounded-xl "
          />
          <img
            src="images/book6.jpg"
            alt="book"
            width={125}
            height={125}
            className=" shadow-xl rounded-xl "
          />
        </div>
        <div>
          <img
            src="images/book0.jpg"
            alt="book"
            width={125}
            height={125}
            className=" shadow-xl rounded-xl "
          />
        </div>
      </div>
    </section>
  );
};

export default LandingSection;
