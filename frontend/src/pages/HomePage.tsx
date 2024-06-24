// import ArticlesSection from "@/components/sections/ArticlesSection";
import BestBooksSection from "@/components/sections/BestBooksSection";
import BestSeller from "@/components/sections/BestSeller";
import ComingSection from "@/components/sections/ComingSection";
import ComingSoonSection from "@/components/sections/ComingSoonSection";
import LandingSection from "@/components/sections/LandingSection";
import NewBooksSection from "@/components/sections/NewBooksSection";
import OffersSection from "@/components/sections/OffersSection";
import axios from "axios";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [isPending, setIsPending] = useState(false);
  const [bestSeller, setBestSeller] = useState([]);
  const [newBooks, setNewBooks] = useState([]);

  const bestSellerPromise = axios.get(
    "http://localhost:5000/api/book?sort=soldItemsNumber&order=desc"
  );
  const newBooksPromise = axios.get(
    "http://localhost:5000/api/book?sort=createdAt&order=desc"
  );

  useEffect(() => {
    setIsPending(true)
    async function fetchData() {
      const [bestSellerData, newBooksData] = await Promise.all([
        bestSellerPromise,
        newBooksPromise,
      ])
      setBestSeller(bestSellerData.data.results.books);
      setNewBooks(newBooksData.data.results.books);
      setIsPending(false)
    }

    fetchData();
  }, []);

  return (
    <>
      <LandingSection />
      <OffersSection />
      <BestSeller bestSeller={bestSeller} isPending={isPending}/>
      <BestBooksSection bestSeller={bestSeller} isPending={isPending}/>
      <ComingSoonSection newBooks={newBooks} isPending={isPending} />
      <NewBooksSection newBooks={newBooks} isPending={isPending}/>
      {/* <ArticlesSection /> */}
      <ComingSection />
    </>
  );
};

export default HomePage;
