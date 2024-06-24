import SectionHeading from "../SectionHeading";

const OffersSection = () => {
  return (
    <section className="py-10 bg-pinkBackgroundColor grid lg:grid-cols-2">
      <div>
        <SectionHeading title="offers" />
        <div className="container max-w-2xl mt-8">
          <h1 className="text-5xl text-lightBlueColor font-semibold">
            some books are 50% off now! Don't miss such a deal!
          </h1>
          <p className="text-heavyBlueColor max-w-md mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu
            feugiat amet, libero ipsum enim pharetra hac.
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <img
          className="mt-14"
          src="/images/booksjpg-removebg-preview.png"
          alt="books"
          width={400}
          height={400}
        />
      </div>
    </section>
  );
};

export default OffersSection;
