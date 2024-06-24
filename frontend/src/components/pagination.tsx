import { useNavigate, useSearchParams } from "react-router-dom";

import { Button } from "./ui/button";
import { cn, formUrlQuery } from "@/lib/utils";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

interface IProps {
  page: string | number;
  totalPages: string | number;
}

const Pagination = ({ page, totalPages }: IProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams()

  const onClickHandler = (value: string) => {
    const pageValue = value === "prev" ? Number(page) - 1 : Number(page) + 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: pageValue.toString(),
    });
    navigate(newUrl);
  };
  return (
    <div className="flex justify-center items-center gap-x-10 mt-10">
      <Button
        className="rounded-full size-12 bg-transparent border-2 border-lightBlueColor"
        variant={"outline"}
        size={"sm"}
        onClick={() => onClickHandler("prev")}
        disabled={Number(page) <= 1}
      >
        <ArrowLeftIcon />
      </Button>
      <div className="flex gap-2">
        {[...Array(totalPages)].map((_, i) => (
          <span key={i} className={cn("size-10 border-2 border-[#e5e3da] flex justify-center items-center rounded-full",
          page == i+1 && "bg-lightBlueColor text-white"
          )}>
            {i + 1}
          </span>
        ))}
      </div>

      <Button
        className="rounded-full size-12 bg-transparent border-2 border-lightBlueColor"
        variant={"outline"}
        size={"sm"}
        onClick={() => onClickHandler("next")}
        disabled={Number(page) >= Number(totalPages)}
      >
        <ArrowRightIcon />
      </Button>
    </div>
  );
};

export default Pagination;
