const ComingSection = () => {
  return (
    <section className="bg-[#cbcdcf]">
      <div className=" container flex flex-col gap-y-6 lg:gap-0 md:flex-row items-center justify-around ">
        <img
          src="/images/girl.png"
          alt="girl"
          width={250}
          height={250}
          className="relative lg:-bottom-6 "
        />
        <div className="max-w-lg text-center">
          <h3 className="text-2xl text-heavyBlueColor font-bold mb-4">
            Coming Soon
          </h3>
          <p className="text-xl text-heavyBlueColor font-semibold">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu
            feugiat ametj libero ipsum enim pharetra hac.
          </p>
        </div>
        <img
          src="/images/comingsoonbook.png"
          alt="book"
          width={250}
          height={250}
        />
      </div>
    </section>
  );
};

export default ComingSection;
