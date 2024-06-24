import SectionHeading from "../SectionHeading";

const ArticlesSection = () => {
  return (
    <section className="py-20 bg-pinkBackgroundColor ">
      <SectionHeading title="OUR ARTICLES" />
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 gap-6 pt-10">
        <article>
          <img src="/images/article1.jpg" alt="article" height={200} />
          <div className="space-y-2">
            <p className="text-[#463c1c] text-sm mt-2"> 2 Aug, 2024</p>
            <h3 className="text-heavyBlueColor font-bold">
              {" "}
              Reading Books Always Makes The Moments Happy
            </h3>
          </div>
        </article>
        <article>
          <img src="/images/article2.jpg" alt="article" height={200} />
          <div className="space-y-2">
            <p className="text-[#463c1c] text-sm mt-2"> 2 Aug, 2024</p>
            <h3 className="text-heavyBlueColor font-bold">
              {" "}
              Reading Books Always Makes The Moments Happy
            </h3>
          </div>
        </article>
        <article>
          <img src="/images/article3.jpg" alt="article" height={200} />
          <div className="space-y-2">
            <p className="text-[#463c1c] text-sm mt-2"> 2 Aug, 2024</p>
            <h3 className="text-heavyBlueColor font-bold">
              {" "}
              Reading Books Always Makes The Moments Happy
            </h3>
          </div>
        </article>
      </div>
    </section>
  );
};

export default ArticlesSection;
