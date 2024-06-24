import queryString from "query-string";
import { FormEvent, useState } from "react";
import { BiSearch, BiX } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!query) return;

    const url = queryString.stringifyUrl(
      {
        url: "books/",
        query: { query: query },
      },
      { skipEmptyString: true }
    );

    navigate(url);
  };

  return (
    <form
      className="relative  items-center w-full max-w-xl"
      onSubmit={onSubmitHandler}
    >
      {query && (
        <BiX
          className="absolute right-20 w-5 h-5 text-muted-foreground
            cursor-pointer hover:opacity-75"
          onClick={() => setQuery("")}
        />
      )}
      <input
        className="border-r-none w-full rounded-3xl p-1.5 px-4 outline-none"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="border-l-none" type="submit">
        <BiSearch
          size={16}
          className="absolute right-10 top-1/2 -translate-y-1/2 rotate-90"
        />
      </button>
    </form>
  );
};

export default SearchBar;
