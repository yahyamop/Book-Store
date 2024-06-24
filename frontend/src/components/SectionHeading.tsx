interface IProps {
  title: string;
}
const SectionHeading = ({ title }: IProps) => {
  return (
    <h1 className="bg-lightBlueColor text-pinkBackgroundColor w-64 rounded-r-full px-2 pl-6 py-4  uppercase text-2xl font-semibold">
      {title}
    </h1>
  );
};

export default SectionHeading;
