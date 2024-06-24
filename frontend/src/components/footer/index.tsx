import Logo from "../Logo";

const Footer = () => {
  return (
    <footer className="bg-lightBlueColor text-white py-10">
      <div className="container">
        <div className=" grid md:grid-cols-3 items-center justify-between">
          <div className="space-y-6 max-w-sm">
            <Logo />
            <p>
              Nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </p>
          </div>

          <div className="flex flex-col gap-y-6">
            <h3 className="text-xl font-bold">Company</h3>
            <div className="flex flex-col gap-2">
              <p>Privacy Policy</p>
              <p>FAQS</p>
              <p>terms of Service</p>
            </div>
          </div>

          <div className="flex flex-col gap-y-6">
            <h3 className="text-xl font-bold">IMPOTENT LINKS</h3>
            <div className="flex flex-col gap-2">
              <p>Privacy Policy</p>
              <p>FAQS</p>
              <p>terms of Service</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-10 max-md:text-[12px] ">
          <p>&copy; 2022 Arihant. All Rights Reserved.</p>
          <p className="capitalize">Privacy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
